// EDIT THIS FILE. The instructions are in README.md, in this folder.

// This works, but ZoomButtons re-renders every time the mouse moves over the grey area.
// Explain why, then fix it. Keep the four exported components and the render counter.

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

type Cursor = { lat: number; lng: number };
type MapState = {
  zoom: number;
  setZoom: (zoom: number) => void;
  cursor: Cursor;
  setCursor: (cursor: Cursor) => void;
};

const MapContext = createContext<MapState | null>(null);

function useMap() {
  const value = useContext(MapContext);
  if (!value) throw new Error("useMap must be used inside MapProvider");
  return value;
}

export function MapProvider({ children }: { children: ReactNode }) {
  const [zoom, setZoom] = useState(8);
  const [cursor, setCursor] = useState<Cursor>({ lat: 0, lng: 0 });
  return (
    <MapContext.Provider value={{ zoom, setZoom, cursor, setCursor }}>{children}</MapContext.Provider>
  );
}

export function ZoomButtons() {
  const { zoom, setZoom } = useMap();
  // Debug counter. Keep it: it shows how often this component renders.
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
  const { cursor } = useMap();
  return (
    <p>
      {cursor.lat.toFixed(2)}, {cursor.lng.toFixed(2)}
    </p>
  );
}

export function MapSurface() {
  const { setCursor } = useMap();
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
