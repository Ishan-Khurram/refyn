// allows isOpen/open/close/toggle to be used anywhere within app
// error given asap if app is not wrapped within provider.

import { useContext } from "react";
import { LogFabContext } from "./LogFabContext";

export function useLogFab() {
  const ctx = useContext(LogFabContext);
  if (!ctx) {
    throw new Error("useLogFab must be used within a logfabprovider.");
  }
  return ctx;
}
