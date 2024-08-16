'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/src/shared/ui/controls/DropdownMenu';
import { useTheme } from 'next-themes';
import { Button } from '@/src/shared/ui';
import { Icons } from '@/src/shared/assets';

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="icon" size="icon">
          <Icons.Sun
            width={24}
            height={24}
            className="text-inherit rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90"
          />
          <Icons.Moon
            width={24}
            height={24}
            className="absolute text-inherit rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <span className="font-medium">Light</span>
          <Icons.Sun width={20} height={20} className="text-inherit" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <span className="font-medium">Dark</span>
          <Icons.Moon width={20} height={20} className="text-inherit" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <span className="font-medium">System</span>
          <Icons.Computer width={20} height={20} className="text-inherit" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
