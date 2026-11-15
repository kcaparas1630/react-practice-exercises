// EDIT THIS FILE. The instructions are in README.md, in this folder.

import { configureStore } from "@reduxjs/toolkit";

// TODO:
//   1. createApi from "@reduxjs/toolkit/query/react" with baseUrl "/api" and one query:
//      getFires(region) -> `fires?region=${region}`
//   2. makeStore() adds the API's reducer and middleware.
//   3. FireFeed uses the generated hook with pollingInterval of 10 minutes.
//
// The demo calls makeStore() and renders <FireFeed region={...} /> inside a <Provider>.

export function makeStore() {
  return configureStore({ reducer: (state: object = {}) => state });
}

export default function FireFeed({ region }: { region: string }) {
  return <p>Not built yet. Region: {region}</p>;
}
