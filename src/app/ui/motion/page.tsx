import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";
import Animate from "./Animate";
import Hover from "./Hover";
import ScrollTriggered from "./ScrollTriggered";
import Layout from "./Layout";
import Reorder from "./Reorder";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "UI | Motion",
  };
}

export default async function MotionPage() {
  return (
    <>
      <PageHeader header="Motion" />
      <Animate />
      <Hover />
      <Layout />
      <ScrollTriggered />
      <Reorder />
    </>
  );
}
