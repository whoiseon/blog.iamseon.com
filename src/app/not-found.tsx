"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function RootNotFound() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <Image src="/image/not-found-image.png" alt="404 image" width={270} height={122} />
      </div>
      <h1 className="mt-8 text-[1.5rem] text-neutral-950 md:text-[2rem] dark:text-neutral-50">
        페이지를 찾을 수 없습니다!
      </h1>
      <Button size="lg" className="mt-8" asChild>
        <Link href="/" className="text-base font-bold">
          홈으로
        </Link>
      </Button>
    </div>
  );
}

export default RootNotFound;
