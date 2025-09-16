import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";
import DevUIHoldButtonPageClient from "./page-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dev UI | Hold-Button",
  };
}

export default async function DevUIHoldButtonPage() {
  return (
    <>
      <PageHeader header="Hold-Button" />

      <DevUIHoldButtonPageClient />
    </>
  );
}
