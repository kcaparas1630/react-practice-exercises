// DO NOT EDIT. Renders your code inside the practice app.

import type * as Exercise from "./Exercise";

export default function Demo({ mod }: { mod: typeof Exercise }) {
  const { MapProvider, ZoomButtons, CursorReadout, MapSurface } = mod;
  return (
    <MapProvider>
      <ZoomButtons />
      <CursorReadout />
      <MapSurface />
    </MapProvider>
  );
}
