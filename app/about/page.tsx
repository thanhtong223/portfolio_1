import { FlaskConical, Mail, SquareArrowOutUpRight } from "lucide-react";

export const metadata = {
  title: "About Me | Tong Van Thanh",
};

export default function AboutPage() {
  return (
    <section className="section-shell page-hero about-page">
      <div className="section-heading">
        <p className="eyebrow">About me</p>
        <h1>
          I&apos;m Thanh, a technical growth marketer building practical AI
          marketing systems.
        </h1>
        <p>
          I work across marketing, sales, and partnerships for SaaS solutions.
          Because I often sit between functions, I build systems that reduce
          manual reporting, speed up content workflows, and connect data to
          campaign decisions.
        </p>
      </div>

      <div className="about-grid">
        <article>
          <span>What I do</span>
          <p>
            I connect analytics, CRM, CMS, publishing, and AI-assisted workflows
            so marketing teams can move from scattered signals to clearer action.
          </p>
        </article>
        <article>
          <span>How I work</span>
          <p>
            I care about human review, clear system logic, public-safe examples,
            and workflows people can inspect before trusting.
          </p>
        </article>
        <article>
          <span>Open to</span>
          <p>
            Technical growth, product marketing, SaaS go-to-market, lead
            generation, and AI-assisted marketing automation conversations.
          </p>
        </article>
      </div>

      <div className="contact-links" aria-label="Contact links">
        <a
          className="button button-primary"
          href="https://linkedin.com/in/thanhtongvan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SquareArrowOutUpRight size={18} aria-hidden="true" />
          LinkedIn
        </a>
        <a
          className="button button-secondary"
          href="mailto:thanhtv021203.forwork@gmail.com"
        >
          <Mail size={18} aria-hidden="true" />
          Email
        </a>
        <a className="button button-secondary button-compact" href="/utm/">
          <FlaskConical size={16} aria-hidden="true" />
          Typeform test
        </a>
      </div>
    </section>
  );
}
