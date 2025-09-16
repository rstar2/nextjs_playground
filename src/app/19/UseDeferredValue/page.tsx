import OptimizeSlowParts from "./OptimizeSlowParts";
import ShowStaleData from "./ShowStaleData";

export default function UseDeferredValue() {
  return (
    <div className="space-y-2">
      <h2 className="mt-2 text-center text-lg font-semibold">useDeferredValue() hook</h2>
      <h3 className="mt-2 text-center text-lg font-semibold">It lets you defer updating a part of the UI</h3>

      <OptimizeSlowParts title='1. Use case: Deferring re-rendering for a "slow" part of the UI' />

      <hr className="py-2" />

      <ShowStaleData title="2. Use case: Showing stale content while fresh content is loading" />
    </div>
  );
}
