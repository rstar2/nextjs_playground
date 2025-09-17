"use client";

import { useState, useOptimistic, startTransition } from "react";

import { sleep } from "@/lib/sleep";
import { Button } from "@/components/ui/button";

type LikeButtonProps = {
  text: string;
  initialCount?: number;
  sendLike: () => Promise<unknown>;
};
function LikeButton({ text, initialCount = 0, sendLike }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);

  // The update function adds the optimistic delta to the count
  const [optimisticCount, addOptimisticLike] = useOptimistic(count, (current, delta: number) => current + delta);

  function handleLike() {
    // An optimistic state update SHOULD occur ALWAYS inside a transition (e.g. wrapped with startTransition)
    // or action.
    startTransition(() => {
      // Optimistically increment the count
      addOptimisticLike(1);

      // Actually send to the server using the provided async function
      startTransition(async () => {
        await sendLike();

        startTransition(() => {
          setCount((c) => c + 1);
        });
      });
    });
  }

  return (
    <Button onClick={handleLike}>
      {text}: {optimisticCount} 👍
    </Button>
  );
}

export default function App({ title }: { title: string }) {
  const sendLikeSuccess = async () => sleep(2000);
  const sendLikeFail = async () => {
    await sleep(2000);
    throw new Error("Failed to send like");
  };

  let count = 0;
  return (
    <>
      <h3>{title}</h3>

      <LikeButton sendLike={sendLikeSuccess} text="AlwaysSuccess" />
      <br />

      <LikeButton sendLike={sendLikeFail} text="AlwaysFail" />
      <br />

      <LikeButton
        sendLike={async () => {
          count++;
          return count <= 3 ? sendLikeSuccess() : sendLikeFail();
        }}
        text="No more than 3"
      />
    </>
  );
}
