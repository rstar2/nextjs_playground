import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";

// pure CSS
import PathFollower from "./PathFollowerCSS";
// using Motion
import PathFollowerMotionSingle from "./PathFollowerMotion/single";
import PathFollowerMotionMulti from "./PathFollowerMotion/multi";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "UI | Marquee - SVG path",
  };
}

const path = "M0 186.219C138.5 186.219 305.5 194.719 305.5 49.7188C305.5 -113.652 -75 186.219 484.5 186.219H587.5";

export default async function MarqueeSVGPathPage() {
  return (
    <>
      <PageHeader header="Marquee over SVG path" />

      <h2 className="my-2 text-center text-lg font-semibold">Simple CSS solution</h2>
      <PathFollower svgPath={path} />

      <h2 className="my-2 text-center text-lg font-semibold">Motion (velocity, scroll-animation)</h2>
      <PathFollowerMotionSingle path={path} baseVelocity={30} />
      <PathFollowerMotionMulti path={path} baseVelocity={5} hoverVelocity={2} repeat={30} pathHidden>
        Item
      </PathFollowerMotionMulti>
    </>
  );
}
