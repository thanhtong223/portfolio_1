import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "UTM Typeform Test | Tong Van Thanh",
};

export default function UtmTestPage() {
  return (
    <section className="section-shell page-hero">
      <div className="section-heading">
        <p className="eyebrow">UTM test</p>
        <h1>Typeform attribution test.</h1>
        <p>
          This page loads the Typeform embed with transitive search parameters so
          stored UTM values can pass into the form as hidden fields.
        </p>
      </div>

      <div
        data-tf-widget="Pz7GGLhO"
        data-tf-transitive-search-params
        style={{ width: "100%", height: "600px" }}
      />

      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </section>
  );
}