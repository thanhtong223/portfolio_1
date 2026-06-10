import { ChevronDown } from "lucide-react";
import { ActionRow } from "@/components/action-row";
import type { actionGroups } from "@/lib/content";

type Group = (typeof actionGroups)[number];

export function TechnicalDisclosure({ group }: { group: Group }) {
  const Icon = group.icon;

  return (
    <details className="technical-disclosure">
      <summary>
        <span>
          <Icon size={18} aria-hidden="true" />
          {group.title}
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <div className="action-list">
        {group.actions.map(([label, action]) => (
          <ActionRow key={action} label={label} action={action} />
        ))}
      </div>
    </details>
  );
}
