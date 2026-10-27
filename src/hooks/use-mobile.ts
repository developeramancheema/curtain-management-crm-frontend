import * as React from 'react';

export function useBreakpoint(maxWidth: number) {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };
    mql.addEventListener('change', onChange);
    onChange(mql);
    return () => mql.removeEventListener('change', onChange);
  }, [maxWidth]);

  return matches === true;
}

export function useIsMobile() {
  return useBreakpoint(768);
}

export function useIsBelowLg() {
  return useBreakpoint(1024);
}
