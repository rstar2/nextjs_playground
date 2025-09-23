"use client";

import { useState } from "react";
import { Reorder } from "motion/react";
import { h2 } from "motion/react-client";

export default function DragReordering() {
  const [items, setItems] = useState([0, 1, 2, 3]);

  return (
    <>
      <h2 className="underline">Reorder</h2>
      <Reorder.Group axis="y" values={items} onReorder={setItems}>
        {items.map((item) => (
          <Reorder.Item key={item} value={item}>
            <div className="my-4 cursor-pointer bg-red-400">Item {item}</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}
