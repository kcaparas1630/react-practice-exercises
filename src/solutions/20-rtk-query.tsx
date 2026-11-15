// Reference solution for exercise 20. Open it only after your own attempt.

import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Fire = { id: string; name: string; sizeHa: number };

export const firesApi = createApi({
  reducerPath: "firesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: build => ({
    // Fire[] is what comes back. string is the argument, here the region.
    getFires: build.query<Fire[], string>({
      query: region => `fires?region=${region}`,
    }),
  }),
});

export const { useGetFiresQuery } = firesApi;

export function makeStore() {
  return configureStore({
    reducer: { [firesApi.reducerPath]: firesApi.reducer },
    // The middleware runs caching, polling and refetching.
    middleware: getDefault => getDefault().concat(firesApi.middleware),
  });
}

const TEN_MINUTES = 10 * 60 * 1000;

export function FireFeed({ region }: { region: string }) {
  const { data, isLoading, isError, isFetching, refetch } = useGetFiresQuery(region, {
    pollingInterval: TEN_MINUTES,
  });

  // isLoading: first load, nothing to show yet.
  // isFetching: any request in flight, including background refreshes.
  if (isLoading) return <p>Loading fires…</p>;

  if (isError && !data) {
    return (
      <div role="alert">
        <p>Could not load fires.</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  const fires = data ?? [];

  return (
    <div>
      {isFetching && <p>Refreshing…</p>}
      {isError && <p role="alert">Refresh failed. Showing the last good data.</p>}
      {fires.length === 0 ? (
        <p>No active fires in this region.</p>
      ) : (
        <ul>
          {fires.map(f => (
            <li key={f.id}>
              {f.name}, {f.sizeHa} ha
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FireFeed;
