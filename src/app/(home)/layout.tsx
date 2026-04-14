import { Suspense } from "react";

import { Header } from "@/components/layouts/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
    </>
  );
}
