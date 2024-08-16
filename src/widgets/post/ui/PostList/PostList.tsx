'use client';

import PostCard from '@/src/widgets/post/ui/PostCard';
import { useAuth } from '@/src/shared/lib/hooks';
import { useUserStore } from '@/src/shared/states';

function PostList() {
  const { user } = useUserStore();
  const { signInWithGoogle } = useAuth();

  return (
    <ul className="w-full flex flex-col lg:gap-y-5">
      <li>
        <button onClick={signInWithGoogle}>로그인</button>
      </li>
      <PostCard />
      <PostCard />
    </ul>
  );
}

export default PostList;
