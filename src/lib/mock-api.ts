// DO NOT EDIT. Imported once in main.tsx.
// Answers GET /api/fires?region=... in the browser, so the exercises need no backend.
// Regions: kamloops (two fires), cariboo (slow), coastal (none), northwest (fails once, then works).

type Fire = { id: string; name: string; sizeHa: number };

const DATA: Record<string, Fire[]> = {
  kamloops: [
    { id: "K1", name: "Shetland Creek", sizeHa: 28000 },
    { id: "K2", name: "Ross Moore Lake", sizeHa: 120 },
  ],
  cariboo: [{ id: "C1", name: "Dogtooth", sizeHa: 5500 }],
  coastal: [], // no fires: tests the empty state
  northwest: [{ id: "N1", name: "Little Blue River", sizeHa: 900 }],
};

let northwestCalls = 0;
const realFetch = globalThis.fetch;

globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const raw = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const url = new URL(raw, "http://localhost");
  if (url.pathname !== "/api/fires") return realFetch(input, init);

  const region = url.searchParams.get("region") ?? "";
  // cariboo is slow, so you can test the race: pick cariboo, then quickly pick kamloops.
  const delayMs = region === "cariboo" ? 2000 : 500;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // northwest fails on its first call and works on the retry.
      if (region === "northwest" && northwestCalls++ === 0) {
        resolve(new Response("Server error", { status: 500 }));
        return;
      }
      resolve(
        new Response(JSON.stringify(DATA[region] ?? []), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    }, delayMs);

    init?.signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};

export {};
