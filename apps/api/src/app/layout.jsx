import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yo‘lchi",
  description: "Yo‘lchi — hozir taxi kerakmi? Yo'lchi bor!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
