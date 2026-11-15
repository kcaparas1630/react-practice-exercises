// Reference solution for exercise 14. Open it only after your own attempt.

import { useReducer } from "react";

type Layer = { id: string; label: string; visible: boolean; opacity: number };

type Action =
  | { type: "toggled"; id: string }
  | { type: "opacityChanged"; id: string; opacity: number }
  | { type: "reset" };

const INITIAL: Layer[] = [
  { id: "hotspots", label: "Hotspots", visible: true, opacity: 100 },
  { id: "perimeter", label: "Fire perimeter", visible: true, opacity: 100 },
  { id: "ortho", label: "Orthomosaic", visible: false, opacity: 80 },
];

function reducer(layers: Layer[], action: Action): Layer[] {
  switch (action.type) {
    case "toggled":
      return layers.map(l => (l.id === action.id ? { ...l, visible: !l.visible } : l));
    case "opacityChanged":
      return layers.map(l => (l.id === action.id ? { ...l, opacity: action.opacity } : l));
    case "reset":
      return INITIAL;
    default: {
      // Compile error here if a new action type is added and not handled.
      const unhandled: never = action;
      return unhandled;
    }
  }
}

export function LayerControls() {
  const [layers, dispatch] = useReducer(reducer, INITIAL);
  const visibleCount = layers.filter(l => l.visible).length;

  return (
    <div>
      <p>
        {visibleCount} of {layers.length} layers visible
      </p>
      {layers.map(layer => (
        <div key={layer.id}>
          <label>
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => dispatch({ type: "toggled", id: layer.id })}
            />
            {layer.label}
          </label>
          <input
            type="range"
            min={0}
            max={100}
            aria-label={`${layer.label} opacity`}
            value={layer.opacity}
            disabled={!layer.visible}
            onChange={e =>
              dispatch({
                type: "opacityChanged",
                id: layer.id,
                opacity: Number(e.target.value),
              })
            }
          />
        </div>
      ))}
      <button onClick={() => dispatch({ type: "reset" })}>Reset layers</button>
    </div>
  );
}

export default LayerControls;
