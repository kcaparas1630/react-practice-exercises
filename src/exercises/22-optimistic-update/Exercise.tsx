// EDIT THIS FILE. The instructions are in README.md, in this folder.

import type { Hotspot } from "./given";

type Props = {
  initial: Hotspot[];
  // Resolves when the server has saved, rejects when it has not.
  saveConfirmed: (id: string, confirmed: boolean) => Promise<void>;
};

export default function HotspotReview({ initial, saveConfirmed }: Props) {
  // TODO: tick at once, save in the background, undo the tick if the save fails
  return (
    <p>
      Not built yet. {initial.length} hotspots, and saveConfirmed is a {typeof saveConfirmed}.
    </p>
  );
}
