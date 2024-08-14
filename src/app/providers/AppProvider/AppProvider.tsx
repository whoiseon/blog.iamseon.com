'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import ReactQueryProvider from '@/src/app/providers/AppProvider/ReactQueryProvider';

function AppProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <ProgressBar
          height="4px"
          color="#4ade80"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default AppProvider;
