import SimpleUseCase from "./SimpleUseCase";
import RollbackState from "./RollbackAfterActionComplete";

export default function UseOptimistic() {
  return (
    <div className="space-y-2">
      <h2 className="mt-2 text-center text-lg font-semibold">useOptimistic() hook</h2>

      <SimpleUseCase title="1. Use case: Simple use case for better UX so that the app seems fast and snappy " />

      <hr className="py-2" />

      <RollbackState title="2. Use case: Rollback to last state on failure" />
    </div>
  );
}
