import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "thanh tong van | Marketing career portfolio",
  description:
    "A technical growth marketing portfolio about practical ai automation systems for inbound workflows, lead generation, and saas go-to-market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
