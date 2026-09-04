import type { Metadata } from "next";
import { AtlasScreen } from "../../presentation/components/atlas/atlas-screen";
/**
 * 地図帳の見た目。**ここで読むと、この経路を開いた人にだけ配られる**
 * (`globals.css` に `@import` すると、遊びの画面にも付いて回る)。
 * 他の追加分は `globals.css` からまとめて読んでいるので、置き場所だけ揃えてある。
 */
import "../styles/atlas.css";

export const metadata: Metadata = {
  title: "World atlas — World Express",
  description: "One map of the whole world: the boards you can play, and the towns on them",
};

export default function AtlasPage() {
  return <AtlasScreen />;
}
