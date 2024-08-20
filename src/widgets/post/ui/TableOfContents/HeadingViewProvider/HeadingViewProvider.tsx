import { ReactNode, createContext, useState, useMemo, useContext } from 'react';

type ContextProp = {
  headingId: string;
  setHeadingId: (id: string) => void;
};

const HeadingViewContext = createContext<ContextProp>({
  headingId: '',
  setHeadingId: () => {},
});

interface Props {
  children: ReactNode;
}

function HeadingViewProvider({ children }: Props) {
  const [headingId, setHeadingId] = useState<string>('');

  const value = useMemo(
    () => ({
      headingId,
      setHeadingId,
    }),
    [headingId],
  );

  return (
    <HeadingViewContext.Provider value={value}>
      {children}
    </HeadingViewContext.Provider>
  );
}

export function useHeadingView() {
  const context = useContext(HeadingViewContext);

  if (!context) {
    throw new Error('useHeadingView must be used within a HeadingViewProvider');
  }

  return context;
}

export default HeadingViewProvider;
