"use client";

import { useState } from "react";
import {
  Bot,
  Database,
  FileCode2,
  Globe2,
  Link2,
  Share2,
  UserCheck,
} from "lucide-react";
import { architectureNodes } from "@/lib/content";
import { ActionRow } from "@/components/action-row";

type ArchitectureMapProps = {
  mode: "overview" | "inspection";
};

type DiagramNode = {
  id: string;
  label: string;
  detail: string;
  selectId: string;
  icon: typeof Bot;
};

const websiteNode: DiagramNode = {
  id: "website",
  label: "Website",
  detail: "Pages, forms, and campaign touchpoints",
  selectId: "tracking",
  icon: Globe2,
};

const inputNodes: DiagramNode[] = [
  {
    id: "analytics",
    label: "Google Analytics",
    detail: "GA4 behavior signals",
    selectId: "analytics",
    icon: Database,
  },
  {
    id: "search",
    label: "Search Console",
    detail: "Queries and page performance",
    selectId: "analytics",
    icon: Database,
  },
  {
    id: "crm",
    label: "Crm",
    detail: "HubSpot, Zoho, lead context",
    selectId: "crm",
    icon: Database,
  },
];

const outputNodes: DiagramNode[] = [
  {
    id: "cms",
    label: "Website cms",
    detail: "Ghost, WordPress, drafts",
    selectId: "publishing",
    icon: Globe2,
  },
  {
    id: "social",
    label: "Social Media",
    detail: "LinkedIn and Facebook",
    selectId: "publishing",
    icon: Share2,
  },
];

const mcpNodes: DiagramNode[] = [
  {
    id: "mcp-analytics",
    label: "Mcp",
    detail: "ga4 access",
    selectId: "mcp",
    icon: FileCode2,
  },
  {
    id: "mcp-search",
    label: "Mcp",
    detail: "gsc access",
    selectId: "mcp",
    icon: FileCode2,
  },
  {
    id: "mcp-crm",
    label: "Mcp",
    detail: "crm access",
    selectId: "mcp",
    icon: FileCode2,
  },
  {
    id: "mcp-cms",
    label: "Mcp",
    detail: "cms access",
    selectId: "mcp",
    icon: FileCode2,
  },
];

const agentNode: DiagramNode = {
  id: "agent",
  label: "Agents / llm",
  detail: "Antigravity, Claude Desktop, reusable skills",
  selectId: "agent",
  icon: Bot,
};

const reviewNode: DiagramNode = {
  id: "review",
  label: "User Review",
  detail: "Brand, claims, tone, business context",
  selectId: "review",
  icon: UserCheck,
};

const trackingNode: DiagramNode = {
  id: "tracking",
  label: "Utm link",
  detail: "Attribution and feedback",
  selectId: "tracking",
  icon: Link2,
};

function FlowButton({
  node,
  selectedId,
  setSelectedId,
}: {
  node: DiagramNode;
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  const Icon = node.icon;
  const active = selectedId === node.selectId;

  return (
    <button
      className={`flow-node flow-node-${node.id} ${active ? "active" : ""}`}
      type="button"
      onClick={() => setSelectedId(node.selectId)}
      onFocus={() => setSelectedId(node.selectId)}
      aria-pressed={active}
    >
      <span className="node-icon">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="node-text">
        <strong>{node.label}</strong>
        <small>{node.detail}</small>
      </span>
    </button>
  );
}

export function ArchitectureMap({ mode }: ArchitectureMapProps) {
  const [selectedId, setSelectedId] = useState("mcp");
  const selected =
    architectureNodes.find((node) => node.id === selectedId) ?? architectureNodes[0];

  return (
    <div className={`architecture-shell architecture-${mode}`}>
      <div className="architecture-map" aria-label="Marketing automation architecture map">
        <div className="flow-rail flow-rail-top" aria-hidden="true">
          <span>Utm link</span>
        </div>

        <div className="flow-row flow-row-website">
          <FlowButton
            node={websiteNode}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>

        <div className="flow-zone-row">
          <section className="flow-group flow-group-input" aria-label="Input systems">
            <p>Input</p>
            <div>
              {inputNodes.map((node) => (
                <FlowButton
                  key={node.id}
                  node={node}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              ))}
            </div>
          </section>
          <section className="flow-group flow-group-output" aria-label="Output systems">
            <p>Output</p>
            <div>
              {outputNodes.map((node) => (
                <FlowButton
                  key={node.id}
                  node={node}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="flow-row flow-row-mcp">
          {mcpNodes.map((node) => (
            <FlowButton
              key={node.id}
              node={node}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>

        <div className="flow-row flow-row-agent">
          <FlowButton
            node={agentNode}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
          <div className="agent-support" aria-hidden="true">
            <span>skills.md</span>
            <span>knowledge base</span>
          </div>
        </div>

        <div className="flow-row flow-row-review">
          <FlowButton
            node={reviewNode}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
          <FlowButton
            node={trackingNode}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>
      </div>

      <aside className="inspector-panel" aria-live="polite">
        <p className="eyebrow">Inspector</p>
        <h3>{selected.title}</h3>
        <p>{selected.description}</p>
        <div className="action-list">
          {selected.actions.map(([label, action]) => (
            <ActionRow key={action} label={label} action={action} />
          ))}
        </div>
      </aside>
    </div>
  );
}
