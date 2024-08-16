'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';
import { useUser } from '@/src/shared/states';
import { useAuth } from '@/src/shared/lib/hooks';

function PostList() {
  const user = useUser();
  const { handleSignOut } = useAuth();
  return (
    <ul className="w-full flex flex-col lg:gap-y-5">
      {user && <button onClick={handleSignOut}>로그아웃</button>}
      <PostCard />
      <PostCard />
    </ul>
  );
}

export default PostList;
