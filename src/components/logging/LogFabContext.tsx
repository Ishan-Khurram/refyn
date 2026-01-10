// truth source for isOpen
// open close and toggle are the only ways to change it
// useMemo prevents new functions on rerender. Keeps cleaner and more efficicent.

import React, { createContext, useMemo, useState } from "react";
import { LogFab } from "./LogFab";

export type LogFabContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const LogFabContext = createContext<LogFabContextValue | null>(null);

export function LogFabProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<LogFabContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen]
  );

  return (
    <LogFabContext.Provider value={value}>
      {children}
      <LogFab />
    </LogFabContext.Provider>
  );
}
