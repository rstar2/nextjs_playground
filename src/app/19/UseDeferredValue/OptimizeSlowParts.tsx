"use client";

import { memo, useState, useDeferredValue } from "react";

export default function App({ title }: { title: string }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  console.log("OptimizeSlowParts - render", query, deferredQuery);

  return (
    <>
      <h3>{title}</h3>
      <input className="border" value={query} onChange={(e) => setQuery(e.target.value)} />
      <label className="ml-2">
        {query} - {deferredQuery}
      </label>
      <div className="max-h-40 overflow-auto">
        {/* UN-optimized version */}
        {/* <SlowList query={query} /> */}

        {/* optimized version - requires SlowList to be wrapped in React.memo()*/}
        <SlowList query={deferredQuery} />
      </div>
    </>
  );
}

// NOTE: This optimization requires SlowList to be wrapped in React.memo().
// This is because whenever the 'query' changes, React needs to be able to re-render the parent component quickly.
// During that re-render, 'deferredQuery' still has its previous value,
// so SlowList is able to skip re-rendering (its props have not changed).
// Without memo, it would have to re-render anyway, defeating the point of the optimization.
const SlowList = memo(function SlowList({ query }: { query: string }) {
  console.log("SlowList - render", query);

  const items = [];
  for (let i = 0; i < 25; i++) {
    items.push(<SlowItem key={i} query={query} />);
  }
  return <ul className="items">{items}</ul>;
});

function SlowItem({ query }: { query: string }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // Do nothing for 10 ms per item to emulate extremely slow code
  }

  return <li className="item">Query: {query}</li>;
}
