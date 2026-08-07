import type { Metadata } from "next";
import { ReleaseNotesScreen } from "../../presentation/components/release-notes-screen";

export const metadata: Metadata = {
  title: "What's new — Altiplano Express",
  description: "Release notes for Altiplano Express",
};

export default function ReleaseNotesPage() {
  return <ReleaseNotesScreen />;
}
