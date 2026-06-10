import { ArrowRight } from "lucide-react";
import type { systems } from "@/lib/content";

type System = (typeof systems)[number];

export function SystemBrief({ system }: { system: System }) {
  return (
    <article className="system-brief">
      <div>
        <p className="system-kicker">System brief</p>
        <h3>{system.title}</h3>
        <p>{system.summary}</p>
      </div>
      <dl>
        <div>
          <dt>Role</dt>
          <dd>{system.role}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>
            {system.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </dd>
        </div>
        <div>
          <dt>Impact</dt>
          <dd>{system.impact}</dd>
        </div>
      </dl>
      <span className="text-link text-link-muted">
        Case study coming later <ArrowRight size={16} aria-hidden="true" />
      </span>
    </article>
  );
}
