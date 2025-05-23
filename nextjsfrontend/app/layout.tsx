import type { Metadata } from "next";
import "./globals.css";
import { VideoProvider } from "@/context/VideoContext";
import NavbarWrapper from "@/components/NavbarWrapper";


export const metadata: Metadata = {
  title: "VidVerse",
  description: "Generated by create next app",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <VideoProvider>{children}</VideoProvider>
      </body>
    </html>
  );
}
