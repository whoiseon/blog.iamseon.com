"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ShortsBackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground -ml-3 gap-x-2"
      onClick={goBack}
    >
      <ArrowLeft />
      목록으로
    </Button>
  );
}
