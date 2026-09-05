"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function useClientValue<T>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, read, () => serverValue);
}

export function useOrigin() {
  return useClientValue(() => window.location.origin, "");
}
