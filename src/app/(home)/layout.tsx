import { Suspense } from "react";

import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { RouteHistoryTracker } from "@/components/layouts/route-history-tracker";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteHistoryTracker />
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
