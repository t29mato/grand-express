import type { Metadata } from "next";
import { FeedbackScreen } from "../../presentation/components/feedback-screen";

export const metadata: Metadata = {
  title: "Send feedback — Altiplano Express",
  description: "Tell us what is broken or what the game should do next",
};

export default function FeedbackPage() {
  return <FeedbackScreen />;
}
