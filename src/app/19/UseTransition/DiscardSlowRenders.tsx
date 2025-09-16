"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";

export default function App({ title }: { title: string }) {
  const [tab, setTab] = useState("about");
  return (
    <>
      <h3>{title}</h3>
      <>
        <TabButton isActive={tab === "about"} action={() => setTab("about")}>
          About
        </TabButton>
        <TabButton isActive={tab === "posts"} action={() => setTab("posts")}>
          Posts (slow)
        </TabButton>
        <TabButton isActive={tab === "contact"} action={() => setTab("contact")}>
          Contact
        </TabButton>
        <hr />
        {tab === "about" && <AboutTab />}
        {tab === "posts" && <PostsTab />}
        {tab === "contact" && <ContactTab />}
      </>
    </>
  );
}

function TabButton({
  action,
  children,
  isActive,
}: {
  isActive: boolean;
  action: () => void | Promise<void>;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  if (isPending)
    return (
      <Button className="mx-2">
        {children} <LoaderCircleIcon className="animate-spin" />
      </Button>
    );

  return (
    <Button
      className="mx-2"
      variant={isActive ? "outline" : "default"}
      onClick={
        isActive
          ? undefined
          : // NOTE: startTransition is used to mark the action as non-blocking,and will be discarded if new setXXX happens
            () => {
              startTransition(async () => {
                // await the action that's passed in.
                // This allows it to be either sync or async.
                await action();
              });
            }

        // NOTE: without startTransition - it will block the UI
        // : async () => {
        //   await action();
        // }
      }
    >
      {children}
    </Button>
  );
}

function AboutTab() {
  return <p>Welcome to my profile!</p>;
}

function ContactTab() {
  return <p>Address: Sofia</p>;
}

// NOTE: Simulate a slow component
function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log("[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />");

  const items = [];
  for (let i = 0; i < 200; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="items">{items}</ul>;
}

function SlowPost({ index }: { index: number }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // Do nothing for 10 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{index + 1}</li>;
}
