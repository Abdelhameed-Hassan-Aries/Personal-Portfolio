"use client";

import dynamic from "next/dynamic";

const BackgroundCanvas = dynamic(
  () => import("@/components/three/BackgroundCanvas"),
  { ssr: false }
);

export default function DynamicBackgroundCanvas() {
  return <BackgroundCanvas />;
}
