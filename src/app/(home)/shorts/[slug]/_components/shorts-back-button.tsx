"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPreviousPath } from "@/components/layouts/route-history-tracker";

export function ShortsBackButton() {
  const router = useRouter();

  const goBack = () => {
    const previousPath = getPreviousPath();

    if (previousPath === "/shorts" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/shorts");
    }
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
