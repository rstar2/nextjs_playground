import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";
import DevUIHoldButtonPageClient from "./page-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "UI | Hold-Button",
  };
}

export default async function HoldButtonPage() {
  return (
    <>
      <PageHeader header="Hold-Button" />

      <DevUIHoldButtonPageClient />
    </>
  );
}
