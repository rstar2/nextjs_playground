import React from "react";
import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "React19",
  };
}

export default async function TesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader header="React19 Demo" />
      {children}
    </>
  );
}
