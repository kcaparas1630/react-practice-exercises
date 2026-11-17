// DO NOT EDIT. Types, user data and the searchUsers function for this exercise.

export type Role = "pilot" | "analyst" | "admin";

export type User = { id: string; name: string; email: string; role: Role };

const USERS: User[] = [
  { id: "u1", name: "Maya Thompson", email: "maya@nova.test", role: "pilot" },
  { id: "u2", name: "Liam Chen", email: "liam@nova.test", role: "analyst" },
  { id: "u3", name: "Sofia Reyes", email: "sofia@nova.test", role: "pilot" },
  { id: "u4", name: "Noah Williams", email: "noah@nova.test", role: "admin" },
  { id: "u5", name: "Ava Patel", email: "ava@nova.test", role: "pilot" },
  { id: "u6", name: "Ethan Brown", email: "ethan@nova.test", role: "analyst" },
  { id: "u7", name: "Chloe Martin", email: "chloe@nova.test", role: "pilot" },
  { id: "u8", name: "Lucas Nguyen", email: "lucas@nova.test", role: "analyst" },
];

// Pretends to ask a server for users whose name or email contains `query`.
// Capital letters do not matter. An empty query returns all 8 users.
//
// How long it takes:
//   a ONE-letter query takes 1.5 seconds (slow)
//   anything else takes 0.3 seconds
// So if you search "m" and then "ma", the "m" answer can arrive AFTER the "ma" answer.
//
// If the query is "fail", it throws an error (the promise rejects).
export function searchUsers(query: string): Promise<User[]> {
  const q = query.trim().toLowerCase();
  const delayMs = q.length === 1 ? 1500 : 300;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (q === "fail") {
        reject(new Error("Server error"));
        return;
      }
      resolve(USERS.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
    }, delayMs);
  });
}
