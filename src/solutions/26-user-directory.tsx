import { useEffect, useState } from "react";
import { searchUsers, type User } from "../exercises/26-user-directory/given";

type Result = { status: "loading" } | { status: "error" } | { status: "success"; users: User[] };

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    // Wait until typing stops for 300 ms. The cleanup cancels the timer on the next keystroke.
    const timer = setTimeout(() => {
      searchUsers(query)
        .then(users => {
          if (!ignore) setResult({ status: "success", users });
        })
        .catch(() => {
          if (!ignore) setResult({ status: "error" });
        });
    }, 300);
    return () => {
      ignore = true; // an answer for old text is dropped
      clearTimeout(timer);
    };
  }, [query]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setResult({ status: "loading" });
  }

  return (
    <div>
      <input aria-label="Search users" value={query} onChange={onChange} placeholder="Search name or email" />
      {result.status === "loading" && <p>Searching...</p>}
      {result.status === "error" && <p>Search failed. Try again.</p>}
      {result.status === "success" &&
        (result.users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <>
            <p>{result.users.length} users found</p>
            <ul>
              {result.users.map(u => (
                <li key={u.id}>{u.name}, {u.email}, {u.role}</li>
              ))}
            </ul>
          </>
        ))}
    </div>
  );
}
