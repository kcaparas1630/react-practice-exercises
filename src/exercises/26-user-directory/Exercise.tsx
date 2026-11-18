// EDIT THIS FILE. The instructions are in README.md, in this folder.
/**
 * ## Requirements

1. [x] A text box. Its value is kept in React state (a controlled input).
2. When the page opens, show all users (call `searchUsers("")`).
3. When I type, call `searchUsers` with the text, but **wait until I stop typing for 300 ms**. Typing "maya" quickly should make one call, not four.
4. While waiting for an answer, show "Searching...".
5. Show the results as a list: name, email and role. Above the list, show "3 users found" (with the real number).
6. If nothing matches, show "No users found." instead of an empty list.
7. If `searchUsers` throws, show "Search failed. Try again."
8. **Never show results for old text.** If I type `m`, wait a moment, then type `a` (so the box says `ma`), the slow answer for `m` must not replace the answer for `ma`.
 */
import { useState, useEffect } from "react";
import { searchUsers, type User } from "./given";

export default function UserSearch() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const trimmedQuery = query.trim().toLowerCase();

  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(trimmedQuery) || user.name.toLowerCase().includes(trimmedQuery));

  useEffect(() => {
    let ignore = false;
    const fetchUser = async() => {
      try {
        setLoading(true);
        setError(false);
        const fetchUserData  = await searchUsers(query);
        if (!fetchUserData) throw new Error("Something went wrong");
        if (!ignore) setUsers(fetchUserData);
        setLoading(false);
      } catch (error: unknown) {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    const handler = setTimeout(() => {
      fetchUser();
    }, 300)
    return () => {
      ignore = true;
      clearTimeout(handler);
    }
  }, [query])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        />
      {loading ? <p>Searching...</p>
        : error ? <p>Search failed. Try again.</p>
        : users.length === 0 ? <p>No users found.</p>
        : (<>
            <p>{users.length} users found</p>
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>{user.name}, {user.email}, {user.role}</li>
              ))}
            </ul>
      </>)}      
    </div>
  )
}
