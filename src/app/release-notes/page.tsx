import type { Metadata } from "next";
import { ReleaseNotesScreen } from "../../presentation/components/release-notes-screen";

export const metadata: Metadata = {
  title: "What's new — World Express",
  description: "Release notes for World Express",
};

export default function ReleaseNotesPage() {
  return <ReleaseNotesScreen />;
}
