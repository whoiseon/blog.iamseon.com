"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "previousPath";

export function RouteHistoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const current = sessionStorage.getItem("currentPath");
    if (current && current !== pathname) {
      sessionStorage.setItem(STORAGE_KEY, current);
    }
    sessionStorage.setItem("currentPath", pathname);
  }, [pathname]);

  return null;
}

export function getPreviousPath(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}
