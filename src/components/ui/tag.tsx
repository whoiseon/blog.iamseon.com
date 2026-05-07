import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted dark:bg-neutral-800/80",
        active: "bg-foreground text-app-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type TagVariantProps = VariantProps<typeof tagVariants>;

type TagBaseProps = TagVariantProps & {
  className?: string;
  children?: React.ReactNode;
};

type TagAsButtonProps = TagBaseProps &
  Omit<React.ComponentProps<"button">, keyof TagBaseProps | "type"> & {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };

type TagAsSpanProps = TagBaseProps &
  Omit<React.ComponentProps<"span">, keyof TagBaseProps> & {
    onClick?: undefined;
  };

type TagProps = TagAsButtonProps | TagAsSpanProps;

function Tag({ className, variant, onClick, children, ...props }: TagProps) {
  const classes = cn(
    tagVariants({ variant }),
    onClick && "cursor-pointer",
    onClick && variant !== "active" && "hover:bg-secondary-accent dark:hover:bg-neutral-700/80",
    onClick && variant === "active" && "hover:bg-foreground/90",
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        {...(props as Omit<React.ComponentProps<"button">, "onClick" | "className">)}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={classes} {...(props as React.ComponentProps<"span">)}>
      {children}
    </span>
  );
}

export { Tag, tagVariants };
