
import Navbar from "@/components/Navbar";
import React from "react";
import { headers } from "next/headers"
import Footer from "@/components/Footer";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PhysioMedix",
  description: "PhysioPure is dedicated to exploring the science of physiology, offering readers in-depth insights into how the human body functions"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = await headers()
  const pathname = heads.get("x-current-path")


  return (
    <html lang="en" dir="LTR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
      >
        <>
          {!pathname?.startsWith("/admin") && (
            <Navbar />
          )}

          {children}
        </>
      </body>
    </html>
  );
}
