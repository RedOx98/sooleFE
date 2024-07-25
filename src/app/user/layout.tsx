import type { Metadata } from "next";
import { Navigation } from "../../components";
import Footer from "../../components/Footer";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Kiti | user",
  description: "Kiti bus management user section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="english">
      <head>
        <meta name="viewport" />
      </head>
      <body className="font-Inter-Regular flex flex-col min-h-screen">

        {/* Top Loader */}
        <div className="z-[99999]">
          <NextTopLoader showSpinner={false} color="#b1dc30" />
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Children */}
        <div className="py-5 flex-1">{children}</div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
