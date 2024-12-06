import BackgroundAnimated from "@/components/BackgroundAnimated/index";
import { Header } from "@/components/Header/index";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <BackgroundAnimated />
      <Header />
      <Scene />
    </main>
  );
}
