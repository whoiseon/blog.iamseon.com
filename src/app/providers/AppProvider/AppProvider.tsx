'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <ProgressBar
        height="4px"
        color="#4ade80"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ThemeProvider>
  );
}

export default AppProvider;
