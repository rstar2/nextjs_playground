"use client";

import { Suspense, use, useState, useDeferredValue } from "react";
import { fetchData } from "./data";

export default function App({ title }: { title: string }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  console.log("Show stale data - render", query, deferredQuery, isStale);

  return (
    <>
      <h3>{title}</h3>
      <input className="border" value={query} onChange={(e) => setQuery(e.target.value)} />
      <label className="ml-2">
        {query} - {deferredQuery}
      </label>

      <Suspense fallback={<div>Searching...</div>}>
        {/* without showing stale results - it will show the 'fallback' component on each search */}
        {/* <SearchResults query={query} /> */}

        {/* showing the previous stale results and allow for faster UI input typing,
        useDeferredValue is integrated with Suspense and the 'fallback' component will not be shown */}
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}

function SearchResults({ query }: { query: string }) {
  // NOTE: Even though useMemo appears to cache the promise,
  // React treats promises from use() as unstable unless
  // they’re cached at the module level or via a stable cache mechanism.
  // This means the component suspends again, gets restarted,
  // triggers useMemo again (even with same query), and so on — leading to an infinite loop.
  //   this will not work - cannot cache it here - has to be on module level or in server like Next.js
  //   const fetchDataCached: ReturnType<typeof fetchData> = useMemo(() => {
  //     return fetchData(query);
  //   }, [query]);
  //   const albums = use(fetchDataCached);

  const albums = use(fetchData(query));

  if (albums.length === 0) {
    return (
      <p>
        No matches for <i>&quot;{query}&quot;</i>
      </p>
    );
  }
  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>{album.title}</li>
      ))}
    </ul>
  );
}
