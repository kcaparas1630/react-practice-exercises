// EDIT THIS FILE. The instructions are in README.md, in this folder.

/**
[x]1. A text box. Its value is kept in React state (a controlled input).
2. When the page opens, show all users (call `searchUsers("")`).
3. When I type, call `searchUsers` with the text, but **wait until I stop typing for 300 ms**. Typing "maya" quickly should make one call, not four.
4. While waiting for an answer, show "Searching...".
5. Show the results as a list: name, email and role. Above the list, show "3 users found" (with the real number).
6. If nothing matches, show "No users found." instead of an empty list.
7. If `searchUsers` throws, show "Search failed. Try again."
8. **Never show results for old text.** If I type `m`, wait a moment, then type `a` (so the box says `ma`), the slow answer for `m` must not replace the answer for `ma`.
 */

import { useEffect, useState } from "react";
import { searchUsers, type User } from "./given";

const useDeboucedValue = (value: T, delayMs: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      
    })
  })

}

export default function UserSearch() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  
  const trimmedQuery = query.trim().toLowerCase();
  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(trimmedQuery) || user.name.toLowerCase().includes(trimmedQuery));

  useEffect(() => {
    let ignore = false;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await searchUsers(query)
        if(!data) throw new Error("Search failed. Try again");
        if(!ignore)setUsers(data);
        setLoading(false);
      } catch(error: unknown) {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchUsers();
    return () => {
      ignore = true;
    }
  }, [query])
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <p>{users.length} users found</p>
      {loading && <p>Searching...</p>}
      {!loading && error && <p>Search failed. Try again</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}, {user.email}, {user.role}</li>
          ))}
      </ul>
      )}
      
    </div>
  )
}
