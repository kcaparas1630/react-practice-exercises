// Reference solution for exercise 19. Open it only after your own attempt.

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type Cursor = { lat: number; lng: number };
type Zoom = { zoom: number; setZoom: (z: number) => void };
type CursorState = { cursor: Cursor; setCursor: (c: Cursor) => void };

// Two contexts. A component re-renders only when the context
// it actually reads gets a new value.
const ZoomContext = createContext<Zoom | null>(null);
const CursorContext = createContext<CursorState | null>(null);

export function MapProvider({ children }: { children: ReactNode }) {
  const [zoom, setZoom] = useState(8);
  const [cursor, setCursor] = useState<Cursor>({ lat: 0, lng: 0 });

  // Memoised, so the zoom value keeps its identity while the cursor moves.
  const zoomValue = useMemo(() => ({ zoom, setZoom }), [zoom]);
  const cursorValue = useMemo(() => ({ cursor, setCursor }), [cursor]);

  return (
    <ZoomContext.Provider value={zoomValue}>
      <CursorContext.Provider value={cursorValue}>{children}</CursorContext.Provider>
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  const value = useContext(ZoomContext);
  if (!value) throw new Error("useZoom must be used inside MapProvider");
  return value;
}

export function useCursor() {
  const value = useContext(CursorContext);
  if (!value) throw new Error("useCursor must be used inside MapProvider");
  return value;
}

export function ZoomButtons() {
  const { zoom, setZoom } = useZoom(); // not affected by cursor changes
  // Debug counter, as in the starter.
  const renders = useRef(0);
  renders.current += 1;
  return (
    <div>
      <button onClick={() => setZoom(zoom - 1)}>Zoom out</button>
      <span> Zoom {zoom} </span>
      <button onClick={() => setZoom(zoom + 1)}>Zoom in</button>
      <p>ZoomButtons rendered {renders.current} times</p>
    </div>
  );
}

export function CursorReadout() {
  const { cursor } = useCursor();
  return (
    <p>
      {cursor.lat.toFixed(2)}, {cursor.lng.toFixed(2)}
    </p>
  );
}

export function MapSurface() {
  const { setCursor } = useCursor();
  return (
    <div
      className="map-surface"
      data-testid="map"
      onMouseMove={e => setCursor({ lat: e.clientY / 10, lng: e.clientX / 10 })}
    >
      Move the mouse here
    </div>
  );
}
