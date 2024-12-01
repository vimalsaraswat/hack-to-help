import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Hack4Change",
  description:
    "A platform for hackers to hack4good and for organisers to organise hackathons",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} min-h-screen bg-gradient-to-b from-[#006868eb] to-[#2e154d] text-white`}
    >
      <body>
        <TRPCReactProvider>
          <main className="container mx-auto h-full w-full p-2 md:p-3 lg:p-4">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
