// EDIT THIS FILE. The instructions are in README.md, in this folder.

import type { Fire } from "./given";

export function usePolling<T>(load: () => Promise<T>, intervalMs: number) {
  // TODO: call load now and then every intervalMs. Keep the last good data when a refresh fails.
  void load;
  void intervalMs;
  const data: T | null = null;
  const error: string | null = null;
  const updatedAt: Date | null = null;
  return { data, error, updatedAt };
}

export default function LiveFireCount({ loadFires }: { loadFires: () => Promise<Fire[]> }) {
  // TODO: use usePolling(loadFires, 3000) and show the count, the last update time and any warning
  const { data } = usePolling(loadFires, 3000);
  return <p>Not built yet. data is {String(data)}.</p>;
}
