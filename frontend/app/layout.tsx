import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SelfSphere Insights",
  description: "Find the answer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

        <body className={inter.className}>
        <div className="bg-gradient-to-b from-gray-50 to-white" style={{height: "100%"}}>
            <header className="site-header relative">
            <link rel="icon" href="/favicon.ico"/>
                <div className="container flex flex-row justify-center">
                  <Image src={"/header/logo.webp"} alt="" width={32} height={32} className="mr-2"/>
                  <h1 className="header-h1">SelfSphere Insights</h1>
                </div>
            </header>
            <div className="relative isolate px-8 pt-14 sm:px-16 md:px-20 lg:px-48 ">
                <div className="text-center">
                {children}
                </div>
            </div>
        </div>
        </body>
        </html>
  );
}
