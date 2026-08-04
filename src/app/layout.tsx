import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grand Express — A Rail Fortune Game",
  description: "A rail fortune game · learn as you ride",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
