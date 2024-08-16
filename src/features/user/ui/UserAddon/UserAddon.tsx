'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/src/shared/ui/controls/DropdownMenu';
import { Button } from '@/src/shared/ui';
import Image from 'next/image';
import { useUser } from '@/src/shared/states';
import { useAuth } from '@/src/shared/lib/hooks';
import Link from 'next/link';

function UserAddon() {
  const user = useUser();
  const { handleSignOut } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="icon" size="icon">
          <div className="relative overflow-hidden rounded-full">
            <Image
              src={user.user_metadata.avatar_url}
              alt="admin avatar"
              width={24}
              height={24}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/write" className="font-medium">
            새 글 작성
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/saves" className="font-medium">
            임시 글
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <span className="font-medium">로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAddon;
