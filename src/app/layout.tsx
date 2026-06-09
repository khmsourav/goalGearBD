import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoalGear BD - Play Hard. Gear Up.",
  description: "Shop authentic cricket bats, footballs, badminton rackets, gym equipment, and more. Fast delivery across Bangladesh. bKash, Nagad, Cash on Delivery accepted.",
  keywords: "cricket bat bangladesh, football buy online, sports equipment bd, gym equipment dhaka, badminton racket price",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
