// DO NOT EDIT. Imported once in main.tsx.
// Answers GET /api/fires?region=... in the browser, so the exercises need no backend.
// Regions: kamloops (two fires), cariboo (slow), coastal (none), northwest (fails once, then works).
// Also answers /api/users and /api/users/:id (see the bottom of this file).

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
  if (url.pathname.startsWith("/api/users")) return usersApi(url.pathname, init);
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

// ---- Users API (exercise 28) ----
// GET /api/users       -> all users. Takes 0.6 s. Fails with 500 the first time, works when asked again.
// GET /api/users/:id   -> one user's details. u1 takes 2 s, the rest take 0.4 s. u9 does not exist (404).

type User = { id: string; name: string; email: string; role: "pilot" | "analyst" | "admin" };
type UserDetails = User & { flightCount: number; lastFlight: string | null };

const USERS: UserDetails[] = [
  { id: "u1", name: "Maya Thompson", email: "maya@mapnova.test", role: "pilot", flightCount: 42, lastFlight: "2026-11-10" },
  { id: "u2", name: "Liam Chen", email: "liam@mapnova.test", role: "analyst", flightCount: 0, lastFlight: null },
  { id: "u3", name: "Sofia Reyes", email: "sofia@mapnova.test", role: "pilot", flightCount: 17, lastFlight: "2026-11-02" },
  { id: "u4", name: "Noah Williams", email: "noah@mapnova.test", role: "admin", flightCount: 0, lastFlight: null },
  { id: "u5", name: "Ava Patel", email: "ava@mapnova.test", role: "pilot", flightCount: 63, lastFlight: "2026-11-14" },
  { id: "u6", name: "Ethan Brown", email: "ethan@mapnova.test", role: "analyst", flightCount: 0, lastFlight: null },
  { id: "u7", name: "Chloe Martin", email: "chloe@mapnova.test", role: "pilot", flightCount: 8, lastFlight: "2026-10-28" },
  { id: "u8", name: "Lucas Nguyen", email: "lucas@mapnova.test", role: "analyst", flightCount: 0, lastFlight: null },
];

let usersListCalls = 0;

function usersApi(pathname: string, init?: RequestInit): Promise<Response> {
  const id = pathname.split("/")[3]; // "/api/users/u1" -> "u1"
  const delayMs = !id ? 600 : id === "u1" ? 2000 : 400;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (!id) {
        if (usersListCalls++ === 0) {
          resolve(new Response("Server error", { status: 500 }));
          return;
        }
        const list: User[] = USERS.map(({ id, name, email, role }) => ({ id, name, email, role }));
        resolve(json(list));
        return;
      }
      const user = USERS.find(u => u.id === id);
      resolve(user ? json(user) : new Response("Not found", { status: 404 }));
    }, delayMs);

    init?.signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
}

export {};
