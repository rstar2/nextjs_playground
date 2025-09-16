"use client";

import { sleep } from "@/lib/sleep";
import { useState, useTransition } from "react";

// NOTE: removing the startTransition() wraps will show the "bad" version, where
export default function App({ title }: { title: string }) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async (newQuantity: number) => {
    // To access the pending state of a transition call startTransition at the start,
    // otherwise the setQuantity() is mainly needed to be a transition.
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <>
      <h3>{title}</h3>
      <div>
        <h1>Checkout</h1>
        <Item action={updateQuantityAction} />
        <hr />
        <Total quantity={quantity} isPending={isPending} />
      </div>
    </>
  );
}

// NOTE: By convention the async functions passed to `startTransition()` are called "actions",
// and should be named as `actionXXX`
function Item({ action }: { action: (value: number) => Promise<unknown> }) {
  const [, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // To expose an action prop, await the callback in startTransition.
    startTransition(async () => {
      await action(event.target.valueAsNumber);
    });

    // here we could also just call the action directly,
    // action(event.target.valueAsNumber);
  }
  return (
    <div className="item">
      <label htmlFor="quantity" className="mr-2">
        Eras Tour Tickets Quantity:{" "}
      </label>
      <input type="number" id="quantity" onChange={handleChange} defaultValue={1} min={1} />
    </div>
  );
}

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Total({ quantity, isPending }: { quantity: number; isPending: boolean }) {
  return (
    <div>
      <span className="mr-2">Total:</span>
      <span>{isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}</span>
    </div>
  );
}

async function updateQuantity(newQuantity: number, delay = 2000): Promise<number> {
  await sleep(delay);
  return newQuantity;
}
