import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/src/shared/lib/styles';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md outline-none text-sm transition-all  disabled:pointer-events-none disabled-opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        default:
          'bg-white text-neutral-900 hover:bg-neutral-200 active:bg-neutral-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-700 dark:bg-black dark:text-neutral-100',
        ghost:
          'bg-white text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200 active:bg-neutral-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-700 dark:bg-black dark:text-neutral-400 dark:hover:text-neutral-200',
        primary:
          'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-neutral-900 dark:hover:bg-green-300 dark:active:bg-green-400',
        primaryGhost:
          'bg-white text-green-500 hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-700 dark:bg-black dark:text-green-400',
        reverse:
          'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700 dark:hover:bg-neutral-200 dark:active:bg-neutral-100 dark:bg-neutral-100 dark:text-neutral-900',
        icon: 'bg-white text-neutral-600 hover:bg-neutral-200 hover:text-neutral-700 active:bg-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:active:bg-neutral-700 dark:bg-black dark:text-neutral-400',
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-md px-4 py-1.5',
        lg: 'text-lg px-5 py-2',
        icon: 'p-1.5',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      weight = 'medium',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  target: React.HTMLAttributeAnchorTarget;
}

const LinkButton = ({
  className,
  variant = 'default',
  size = 'md',
  weight = 'medium',
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, weight, className }))}
      {...props}
    />
  );
};

export { Button, LinkButton, buttonVariants };
