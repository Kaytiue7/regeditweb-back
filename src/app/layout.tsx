import "./globals.css";

import { poppins } from "@/app/ui/fonts";
 

import ClientLayoutWrapper from "./ClientLayout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RegeditPos",
  description: "RegeditPos HomePage",
  icons: "/regedit_logo.ico",  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${poppins.className} antialiased bg-white text-black`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}