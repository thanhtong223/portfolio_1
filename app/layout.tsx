import type { Metadata } from "next";
import Script from "next/script";
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
      <Script id="utm-attribution-tracking" strategy="beforeInteractive">
        {`
          (function () {
            const trackedParams = [
              "utm_source",
              "utm_medium",
              "utm_campaign",
              "utm_content",
              "utm_term"
            ];

            const prefix = "tf_attr_";
            const currentUrl = new URL(window.location.href);
            const params = currentUrl.searchParams;

            // Store first landing page
            if (!localStorage.getItem(prefix + "first_landing_page")) {
              localStorage.setItem(prefix + "first_landing_page", window.location.href);
            }

            // Store first referrer
            if (!localStorage.getItem(prefix + "first_referrer")) {
              localStorage.setItem(prefix + "first_referrer", document.referrer || "direct");
            }

            // Store first-touch and latest-touch UTM values
            trackedParams.forEach(function (key) {
              const value = params.get(key);

              if (value) {
                if (!localStorage.getItem(prefix + "first_" + key)) {
                  localStorage.setItem(prefix + "first_" + key, value);
                }

                localStorage.setItem(prefix + "latest_" + key, value);
              }
            });
          })();
        `}
      </Script>
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
