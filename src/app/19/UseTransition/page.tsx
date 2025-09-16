import NonBlockingUpdates from "./NonBlockingUpdates";
import DiscardSlowRenders from "./DiscardSlowRenders";

export default function UseTransition() {
  return (
    <div className="space-y-2">
      <h2 className="mt-2 text-center text-lg font-semibold">useTransition() hook</h2>
      <h3 className="mt-2 text-center text-lg font-semibold">
        Functions called in startTransition are called “Actions”.
      </h3>

      <NonBlockingUpdates title="1. Use case: Perform non-blocking updates with Actions" />

      <hr className="py-2" />

      <DiscardSlowRenders title="2. Use case: Discard/Interrupt slow renders" />
    </div>
  );
}
