import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import Sidebar from "@/components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="flex min-h-screen">
          <main className="flex-1 overflow-y-auto bg-white p-2 lg:p-4 text-black">
            <h1 className="text-4xl font-semibold mb-4 text-center md:text-left">Anasayfa</h1>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
