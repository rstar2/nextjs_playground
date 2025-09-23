import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";
import Simple from "./Simple";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "UI | AnimeJS",
  };
}

export default async function AnimeJSPage() {
  return (
    <>
      <PageHeader header="AnimeJS" />
      <Simple />
    </>
  );
}
