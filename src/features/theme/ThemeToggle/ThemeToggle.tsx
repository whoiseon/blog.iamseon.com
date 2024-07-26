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
          <Icons.Moon width={24} height={24} className="text-inherit" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <span>Light</span>
          <Icons.Sun width={20} height={20} className="text-inherit" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <span>Dark</span>
          <Icons.Moon width={20} height={20} className="text-inherit" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <span>System</span>
          <Icons.Computer width={20} height={20} className="text-inherit" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
