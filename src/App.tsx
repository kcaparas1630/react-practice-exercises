// DO NOT EDIT. The practice shell: lists the exercises and runs the one you pick.
// Your work goes in src/exercises/<number>-<name>/Exercise.tsx

import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";
import { CATALOG } from "./lib/catalog";

type Mod = Record<string, unknown>;
type DemoModule = { default: ComponentType<{ mod: never }> };
type Mode = "mine" | "reference";
type Loaded = { key: string; Demo: ComponentType<{ mod: never }> | null; mod: Mod | null; error: string | null };

const demoLoaders = import.meta.glob<DemoModule>("./exercises/*/demo.tsx");
const mineLoaders = import.meta.glob<Mod>("./exercises/*/Exercise.{ts,tsx}");
const referenceLoaders = import.meta.glob<Mod>("./solutions/*.{ts,tsx}");

function find<T>(loaders: Record<string, () => Promise<T>>, folder: string) {
  const key = Object.keys(loaders).find(k => k.includes(`/${folder}/`) || k.includes(`/${folder}.`));
  return key ? loaders[key] : undefined;
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="crash">
          This exercise crashed while rendering:{"\n\n"}
          {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

function folderFromHash() {
  const hash = window.location.hash.slice(1);
  return CATALOG.some(e => e.folder === hash) ? hash : CATALOG[0]!.folder;
}

export default function App() {
  const [folder, setFolder] = useState(folderFromHash);
  const [mode, setMode] = useState<Mode>("mine");
  const [loaded, setLoaded] = useState<Loaded | null>(null);

  useEffect(() => {
    function onHashChange() {
      setFolder(folderFromHash());
      setMode("mine");
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const key = `${folder}:${mode}`;

  useEffect(() => {
    let ignore = false;
    const loadDemo = find(demoLoaders, folder);
    const loadMod = find(mode === "mine" ? mineLoaders : referenceLoaders, folder);

    if (!loadDemo || !loadMod) {
      setLoaded({ key, Demo: null, mod: null, error: "The files for this exercise were not found." });
      return;
    }

    Promise.all([loadDemo(), loadMod()])
      .then(([demo, mod]) => {
        if (!ignore) setLoaded({ key, Demo: demo.default, mod, error: null });
      })
      .catch((err: unknown) => {
        if (!ignore) setLoaded({ key, Demo: null, mod: null, error: err instanceof Error ? err.message : String(err) });
      });

    return () => {
      ignore = true;
    };
  }, [folder, mode, key]);

  const entry = CATALOG.find(e => e.folder === folder) ?? CATALOG[0]!;
  const current = loaded && loaded.key === key ? loaded : null;
  const groups = [...new Set(CATALOG.map(e => e.group))];

  return (
    <div className="shell">
      <nav className="side" aria-label="Exercises">
        <h1>React practice</h1>
        {groups.map(group => (
          <div key={group}>
            <h2>{group}</h2>
            {CATALOG.filter(e => e.group === group).map(e => (
              <a key={e.folder} href={`#${e.folder}`} aria-current={e.folder === folder ? "page" : undefined}>
                {e.number}. {e.title}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <main className="main">
        <h2>
          {entry.number}. {entry.title}
        </h2>
        <p className="meta">
          {entry.kind}, about {entry.minutes} minutes
        </p>
        <p className="files">
          Instructions: <code>src/exercises/{entry.folder}/README.md</code>
          <br />
          Edit: <code>src/exercises/{entry.folder}/{entry.file}</code>
        </p>

        <div className="modes">
          <button type="button" aria-pressed={mode === "mine"} onClick={() => setMode("mine")}>
            My code
          </button>
          <button type="button" aria-pressed={mode === "reference"} onClick={() => setMode("reference")}>
            Reference solution
          </button>
        </div>

        <div className="stage">
          {!current && <p>Loading…</p>}
          {current?.error && (
            <div role="alert" className="crash">
              {current.error}
            </div>
          )}
          {current?.Demo && current.mod && (
            <ErrorBoundary key={key}>
              <current.Demo mod={current.mod as never} />
            </ErrorBoundary>
          )}
        </div>
      </main>
    </div>
  );
}
