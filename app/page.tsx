import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { ProjectBackgroundVideo } from "@/components/project-background-video";
import { ProjectMediaPreview } from "@/components/project-media-preview";
import { ScrollToProjectsButton } from "@/components/scroll-to-projects-button";
import { SignalVideoPanel } from "@/components/signal-video-panel";
import { StackGroup } from "@/components/stack-group";
import { stackGroups } from "@/lib/content";

const signalPanels = [
  {
    label: "track user behavior",
    code: "capture_event()",
    detail: "Clicks, scrolls, forms, and search intent become usable signals.",
    theme: "behavior",
    media: "/hero-signals/phone-1.mp4",
    ascii: "/hero-signals/phone-1-ascii.mp4",
  },
  {
    label: "shape data signals",
    code: "normalize_signal()",
    detail: "Raw behavior is shaped into analytics, CRM, and content context.",
    theme: "data",
    media: "/hero-signals/laptop.mp4",
    ascii: "/hero-signals/laptop-ascii.mp4",
  },
  {
    label: "surface clearer insights",
    code: "recommend_action()",
    detail: "The system suggests the next campaign move for human review.",
    theme: "insight",
    media: "/hero-signals/phone-2.mp4",
    ascii: "/hero-signals/phone-2-ascii.mp4",
  },
];

const projectHighlights = [
  {
    eyebrow: "Website building",
    title: "Product website building",
    description: "Built and improved a product website for search, forms, and buyer education.",
    work: "Website structure, Ghost CMS customization, product messaging, SEO setup, tracking, and conversion-focused sections.",
    metrics: [
      { value: "110k+", label: "impressions within 5 months" },
      { value: "Top 3", label: "Google rankings for core product keywords" },
      { value: "14%", label: "traffic from AI referrals" },
      { value: "60%", label: "engagement rate from organic search" },
    ],
    status: "Full case study coming later",
    media: {
      src: "/project-media/opollo-full-page.png",
      alt: "Full-page screenshot of the Opollo omni-channel order management website",
      address: "opollo.onpoint.vn",
      backgroundVideo: "/project-media/main-white.mp4",
    },
  },
  {
    eyebrow: "Inbound automation",
    title: "Inbound performance automation",
    description: "Used MCP to pull GSC and GA4 data faster and turn reports into usable insights.",
    work: "Found which blogs, pages, and keywords were performing well or underperforming, then used those signals to improve content and SEO actions.",
    metrics: [
      { value: "+30%", label: "organic impressions" },
      { value: "+1pp", label: "CTR improvement" },
      { value: "+40%", label: "form information collected" },
      { value: "5-8h", label: "saved weekly" },
    ],
    status: "Full case study coming later",
    media: {
      src: "/project-media/inbound-automation-system-map.png",
      alt: "System map showing how analytics, search, CRM, AI agents, CMS, social media, and human review connect in the inbound automation workflow",
      address: "inbound-automation-system.map",
      backgroundVideo: "/project-media/main-white.mp4",
    },
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-inner section-shell">
          <div className="hero-copy">
            <h1>hi i&apos;m thanh</h1>
            <p className="hero-title">
              I build ai marketing systems that turn scattered signals into clearer
              campaign decisions.
            </p>
            <p className="hero-body">
              I connect analytics, crm, cms, and publishing workflows so marketing
              work becomes easier to inspect and repeat.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <Link className="button button-primary" href="/about">
                <Workflow size={18} aria-hidden="true" />
                About me
              </Link>
              <ScrollToProjectsButton />
            </div>
          </div>
          <aside className="signal-hero" aria-label="Signal to insight concept">
            {signalPanels.map((panel) => (
              <SignalVideoPanel
                ascii={panel.ascii}
                code={panel.code}
                detail={panel.detail}
                key={panel.label}
                label={panel.label}
                media={panel.media}
                theme={panel.theme}
              />
            ))}
          </aside>
        </div>
      </section>

      <section className="section-shell project-highlight-section" aria-labelledby="project-highlights">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="project-highlights">Two projects, built from real marketing problems.</h2>
        </div>
        <div className="project-highlight-grid">
          {projectHighlights.map((project) => (
            <article className="project-highlight-card" key={project.title}>
              <div className="project-highlight-main">
                <div className="project-highlight-summary">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-highlight-detail">
                    <span>What I did</span>
                    <p>{project.work}</p>
                  </div>
                  <span className="text-link text-link-muted">
                    {project.status} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
                <div className="project-highlight-media">
                  {project.media ? (
                    <>
                      <ProjectBackgroundVideo src={project.media.backgroundVideo} />
                      {project.media.src && project.media.alt ? (
                        <ProjectMediaPreview
                          address={project.media.address}
                          alt={project.media.alt}
                          src={project.media.src}
                        />
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
              <dl className="project-highlight-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell stack-section" aria-labelledby="stack">
        <div className="section-heading">
          <p className="eyebrow">Tools I use</p>
          <h2 id="stack">Tools grouped by responsibility.</h2>
          <p>
            I care less about tool names as trophies and more about what each
            tool is responsible for inside the workflow.
          </p>
        </div>
        <div className="stack-grid">
          {stackGroups.map((group) => (
            <StackGroup key={group.title} group={group} />
          ))}
        </div>
      </section>

      <section className="section-shell closing-cta" aria-labelledby="closing">
        <p className="eyebrow">Next step</p>
        <h2 id="closing">I build practical systems that connect marketing data, content, and action.</h2>
        <p>
          I am keeping the public MVP focused for now. Detailed case studies
          will come later when the work page is ready.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/about">
            <Workflow size={18} aria-hidden="true" />
            About me
          </Link>
        </div>
      </section>
    </>
  );
}
