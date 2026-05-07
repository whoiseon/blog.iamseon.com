"use client";

import { useEffect, useEffectEvent, useMemo, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "next/dist/client/components/navigation";
import Link from "next/link";
import { ChevronDown, CommandIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { searchPosts, type SearchResult } from "@/app/(home)/_actions/search-posts";
import { NAV_MAP } from "@/app/(home)/_constants/nav.constants";

export function Header() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const outSideClickRef = useOutsideClick(() => {
    setIsMobileMenuOpen(false);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header ref={outSideClickRef} className="sticky top-0 z-40 h-14">
      <div
        className={cn(
          "bg-app-background/80 border-border border-b backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--app-layout-width)",
          isMobileMenuOpen && "border-none"
        )}
      >
        <div className="flex h-14 w-full items-center gap-6 px-5">
          <Logo className="text-foreground -translate-y-[0.5px]" />
          <nav className="text-muted-foreground flex items-center gap-6 max-md:hidden">
            {NAV_MAP.map(({ href, title }) => (
              <Link
                key={title}
                href={href}
                className={cn(
                  "text-muted-foreground hover:text-foreground text-sm font-normal transition-colors",
                  pathname.startsWith(href) && "text-primary hover:text-primary"
                )}
              >
                {title}
              </Link>
            ))}
          </nav>
          <div className="-mr-2 flex flex-1 items-center justify-end gap-2 max-md:gap-1">
            <SearchTrigger />
            <ThemeToggle className="max-md:hidden" />
            <Button variant="ghost" size="icon" className="size-8 max-md:hidden">
              <Icon.Github className="size-4.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("hidden size-8 max-md:flex", isMobileMenuOpen && "rotate-180")}
              onClick={toggleMobileMenu}
            >
              <ChevronDown className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <MobileMenu visible={isMobileMenuOpen} setVisible={setIsMobileMenuOpen} />
    </header>
  );
}

const SEARCH_DEBOUNCE_MS = 200;

function SearchTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const clearCommandEffectEvent = useEffectEvent(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  });

  useEffect(() => {
    clearCommandEffectEvent();
  }, [open]);

  const clearResultEffectEvent = useEffectEvent(() => {
    setResults([]);
  });

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      clearResultEffectEvent();
      return;
    }

    const timeoutId = setTimeout(() => {
      startTransition(async () => {
        const next = await searchPosts(trimmed);
        setResults(next);
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const { posts, shorts } = useMemo(
    () => ({
      posts: results.filter((r) => r.type === "post"),
      shorts: results.filter((r) => r.type === "short"),
    }),
    [results]
  );

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const showEmpty = hasQuery && !isPending && results.length === 0;

  const handleSelect = (result: SearchResult) => {
    const path = result.type === "post" ? "posts" : "shorts";
    router.push(`/${path}/${result.slug}`);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="secondary"
        className="h-8 min-w-3xs items-center justify-between rounded-sm pr-1.5 pl-2 max-md:hidden"
        onClick={handleOpen}
      >
        <div className="flex items-center gap-2">
          <SearchIcon className="text-muted-foreground size-4" />
          <span className="text-muted-foreground text-sm font-normal">Search posts...</span>
        </div>
        <kbd className="text-muted-foreground bg-background dark:bg-background/50 shadow- ml-4 inline-flex h-5 items-center rounded-sm px-1 font-sans text-xs leading-5 font-medium select-none">
          <CommandIcon className="mr-0.5 size-3" /> + K
        </kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden size-8 rounded-sm max-md:flex"
        onClick={handleOpen}
      >
        <SearchIcon className="size-4.5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="p-0" shouldFilter={false}>
          <CommandInput placeholder="Search posts..." value={query} onValueChange={setQuery} />
          {hasQuery && (
            <CommandList>
              {isPending && (
                <div className="text-muted-foreground py-6 text-center text-sm">검색중..</div>
              )}
              {showEmpty && <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>}
              {posts.length > 0 && (
                <CommandGroup heading="Posts">
                  {posts.map((result) => (
                    <SearchResultItem
                      key={result.id}
                      result={result}
                      query={trimmedQuery}
                      onSelect={handleSelect}
                    />
                  ))}
                </CommandGroup>
              )}
              {shorts.length > 0 && (
                <CommandGroup heading="Shorts">
                  {shorts.map((result) => (
                    <SearchResultItem
                      key={result.id}
                      result={result}
                      query={trimmedQuery}
                      onSelect={handleSelect}
                    />
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          )}
        </Command>
      </CommandDialog>
    </>
  );
}

function SearchResultItem({
  result,
  query,
  onSelect,
}: {
  result: SearchResult;
  query: string;
  onSelect: (result: SearchResult) => void;
}) {
  return (
    <CommandItem
      value={result.id}
      onSelect={() => onSelect(result)}
      className="dark:hover:bg-accent flex cursor-pointer flex-col items-start gap-0.5 py-2 hover:bg-neutral-200"
    >
      <span className="text-foreground line-clamp-1 text-sm font-medium">
        {highlightMatch(result.title, query)}
      </span>
      {result.snippet && (
        <span className="text-muted-foreground line-clamp-2 text-xs">
          {highlightMatch(result.snippet, query)}
        </span>
      )}
    </CommandItem>
  );
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (
    let idx = lowerText.indexOf(lowerQuery, cursor);
    idx !== -1;
    idx = lowerText.indexOf(lowerQuery, cursor)
  ) {
    if (idx > cursor) nodes.push(text.slice(cursor, idx));
    nodes.push(
      <span key={key++} className="text-foreground underline">
        {text.slice(idx, idx + query.length)}
      </span>
    );
    cursor = idx + query.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return nodes;
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const onToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={onToggle}
      className={cn(
        "border-border relative inline-flex cursor-pointer items-center rounded-sm border p-1 *:rounded-[3px]",
        className
      )}
    >
      <div className="flex size-5.5 items-center justify-center">
        <SunIcon className="text-foreground/80 fill-foreground/80 dark:text-muted-foreground dark:fill-muted-foreground size-3.5 transition-colors" />
      </div>
      <div className="flex size-5.5 items-center justify-center">
        <MoonIcon className="text-muted-foreground fill-muted-foreground dark:text-foreground/80 dark:fill-foreground/80 size-3.5 transition-colors" />
      </div>
      <div className="bg-muted absolute -z-1 size-5.5 translate-x-0 transition-transform duration-300 ease-in-out dark:translate-x-5.5 dark:bg-neutral-800" />
    </button>
  );
}

function MobileMenu({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    setVisible(false);
  }, [pathname, setVisible]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <div
      className={cn(
        "bg-app-background/80 border-border absolute top-14 right-0 left-0 grid rounded-b-2xl backdrop-blur-lg transition-[grid-template-rows,opacity] duration-300 ease-in-out",
        "hidden max-md:grid",
        visible ? "grid-rows-[1fr] border-b opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div className="mx-auto flex max-w-(--app-layout-width) flex-col gap-3 px-4 pb-3">
          <nav className="flex flex-col gap-1">
            {NAV_MAP.map(({ href, title }) => (
              <Link
                key={title}
                href={href}
                className={cn(
                  "text-muted-foreground hover:text-foreground py-2 text-sm font-normal transition-colors",
                  pathname.startsWith(href) && "text-primary hover:text-primary"
                )}
              >
                {title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between gap-2 pt-3">
            <Button variant="ghost" size="icon" className="size-8">
              <Icon.Github className="size-4.5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
