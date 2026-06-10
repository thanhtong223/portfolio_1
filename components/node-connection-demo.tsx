"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  Database,
  FileCode2,
  Globe2,
  Link2,
  Megaphone,
  UserCheck,
} from "lucide-react";

type Anchor = "top" | "right" | "bottom" | "left" | "center";

type DemoNode = {
  id: string;
  label: string;
  detail?: string;
  zone: string;
  tone?: "input" | "output" | "system" | "human" | "meta";
  icon: typeof Globe2;
};

type DemoLink = {
  id: string;
  from: string;
  to: string;
  fromAnchor?: Anchor;
  toAnchor?: Anchor;
  label?: string;
  variant?: "primary" | "secondary" | "feedback";
  twoWay?: boolean;
};

type Point = {
  x: number;
  y: number;
};

type MeasuredLink = DemoLink & {
  d: string;
  labelPoint?: Point;
};

const demoNodes: DemoNode[] = [
  {
    id: "utm",
    label: "UTM link",
    zone: "utm",
    tone: "meta",
    icon: Link2,
  },
  {
    id: "website",
    label: "Website",
    zone: "website",
    tone: "system",
    icon: Globe2,
  },
  {
    id: "ga4",
    label: "Google Analytics",
    detail: "GA4",
    zone: "ga4",
    tone: "input",
    icon: Database,
  },
  {
    id: "gsc",
    label: "Search Console",
    zone: "gsc",
    tone: "input",
    icon: Database,
  },
  {
    id: "crm",
    label: "CRM",
    detail: "HubSpot, Zoho",
    zone: "crm",
    tone: "input",
    icon: Database,
  },
  {
    id: "cms",
    label: "Website CMS",
    detail: "WordPress, Ghost",
    zone: "cms",
    tone: "output",
    icon: Globe2,
  },
  {
    id: "social",
    label: "Social Media",
    zone: "social",
    tone: "output",
    icon: Megaphone,
  },
  {
    id: "mcp-ga4",
    label: "MCP",
    detail: "analytics access",
    zone: "mcp-ga4",
    tone: "meta",
    icon: FileCode2,
  },
  {
    id: "mcp-gsc",
    label: "MCP",
    detail: "search access",
    zone: "mcp-gsc",
    tone: "meta",
    icon: FileCode2,
  },
  {
    id: "mcp-crm",
    label: "MCP",
    detail: "crm access",
    zone: "mcp-crm",
    tone: "meta",
    icon: FileCode2,
  },
  {
    id: "mcp-cms",
    label: "MCP",
    detail: "cms access",
    zone: "mcp-cms",
    tone: "meta",
    icon: FileCode2,
  },
  {
    id: "agent",
    label: "Agents / LLM",
    detail: "Antigravity, Claude Desktop",
    zone: "agent",
    tone: "system",
    icon: Bot,
  },
  {
    id: "skills",
    label: "skills.md",
    zone: "skills",
    tone: "meta",
    icon: FileCode2,
  },
  {
    id: "knowledge",
    label: "knowledge base",
    zone: "knowledge",
    tone: "meta",
    icon: Database,
  },
  {
    id: "user",
    label: "User",
    zone: "user",
    tone: "human",
    icon: UserCheck,
  },
];

const demoLinks: DemoLink[] = [
  {
    id: "utm-website",
    from: "utm",
    to: "website",
    fromAnchor: "bottom",
    toAnchor: "top",
    variant: "feedback",
  },
  {
    id: "website-ga4",
    from: "website",
    to: "ga4",
    fromAnchor: "left",
    toAnchor: "top",
  },
  {
    id: "website-gsc",
    from: "website",
    to: "gsc",
    fromAnchor: "bottom",
    toAnchor: "top",
  },
  {
    id: "website-crm",
    from: "website",
    to: "crm",
    fromAnchor: "bottom",
    toAnchor: "top",
  },
  {
    id: "cms-website",
    from: "cms",
    to: "website",
    fromAnchor: "top",
    toAnchor: "right",
    variant: "secondary",
  },
  {
    id: "ga4-mcp",
    from: "ga4",
    to: "mcp-ga4",
    fromAnchor: "bottom",
    toAnchor: "top",
    twoWay: true,
  },
  {
    id: "gsc-mcp",
    from: "gsc",
    to: "mcp-gsc",
    fromAnchor: "bottom",
    toAnchor: "top",
    twoWay: true,
  },
  {
    id: "crm-mcp",
    from: "crm",
    to: "mcp-crm",
    fromAnchor: "bottom",
    toAnchor: "top",
    twoWay: true,
  },
  {
    id: "cms-mcp",
    from: "cms",
    to: "mcp-cms",
    fromAnchor: "bottom",
    toAnchor: "top",
    twoWay: true,
  },
  {
    id: "mcp-ga4-agent",
    from: "mcp-ga4",
    to: "agent",
    fromAnchor: "bottom",
    toAnchor: "left",
    variant: "secondary",
  },
  {
    id: "mcp-gsc-agent",
    from: "mcp-gsc",
    to: "agent",
    fromAnchor: "bottom",
    toAnchor: "top",
    twoWay: true,
    variant: "secondary",
  },
  {
    id: "mcp-crm-agent",
    from: "mcp-crm",
    to: "agent",
    fromAnchor: "bottom",
    toAnchor: "top",
    twoWay: true,
    variant: "secondary",
  },
  {
    id: "mcp-cms-agent",
    from: "mcp-cms",
    to: "agent",
    fromAnchor: "bottom",
    toAnchor: "right",
    variant: "secondary",
  },
  {
    id: "skills-agent",
    from: "skills",
    to: "agent",
    fromAnchor: "top",
    toAnchor: "bottom",
    variant: "secondary",
  },
  {
    id: "knowledge-agent",
    from: "knowledge",
    to: "agent",
    fromAnchor: "top",
    toAnchor: "bottom",
    variant: "secondary",
  },
  {
    id: "user-agent",
    from: "user",
    to: "agent",
    fromAnchor: "top",
    toAnchor: "bottom",
    label: "Requests",
    twoWay: true,
  },
  {
    id: "user-social",
    from: "user",
    to: "social",
    fromAnchor: "right",
    toAnchor: "bottom",
    label: "Draft social posts",
    variant: "feedback",
  },
  {
    id: "social-utm",
    from: "social",
    to: "utm",
    fromAnchor: "top",
    toAnchor: "right",
    variant: "feedback",
  },
];

function anchorPoint(rect: DOMRect, container: DOMRect, anchor: Anchor = "center"): Point {
  const left = rect.left - container.left;
  const top = rect.top - container.top;
  const points: Record<Anchor, Point> = {
    top: { x: left + rect.width / 2, y: top },
    right: { x: left + rect.width, y: top + rect.height / 2 },
    bottom: { x: left + rect.width / 2, y: top + rect.height },
    left: { x: left, y: top + rect.height / 2 },
    center: { x: left + rect.width / 2, y: top + rect.height / 2 },
  };

  return points[anchor];
}

function elbowPath(from: Point, to: Point) {
  const midY = from.y + (to.y - from.y) * 0.52;
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
}

function softPath(from: Point, to: Point) {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);

  if (dx < 18 || dy < 18) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  return elbowPath(from, to);
}

export function NodeConnectionDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const [measuredLinks, setMeasuredLinks] = useState<MeasuredLink[]>([]);
  const [activeNode, setActiveNode] = useState<string>("website");

  const nodeById = useMemo(() => {
    return new Map(demoNodes.map((node) => [node.id, node]));
  }, []);

  const activeNodeData = nodeById.get(activeNode) ?? demoNodes[0];

  const activeLinks = useMemo(() => {
    return demoLinks.filter((link) => link.from === activeNode || link.to === activeNode);
  }, [activeNode]);

  const connectedIds = useMemo(() => {
    const ids = new Set<string>([activeNode]);
    demoLinks.forEach((link) => {
      if (link.from === activeNode) ids.add(link.to);
      if (link.to === activeNode) ids.add(link.from);
    });
    return ids;
  }, [activeNode]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const nextLinks = demoLinks.flatMap((link) => {
      const fromNode = nodeRefs.current.get(link.from);
      const toNode = nodeRefs.current.get(link.to);
      if (!fromNode || !toNode) return [];

      const from = anchorPoint(fromNode.getBoundingClientRect(), containerRect, link.fromAnchor);
      const to = anchorPoint(toNode.getBoundingClientRect(), containerRect, link.toAnchor);
      return [
        {
          ...link,
          d: softPath(from, to),
          labelPoint: link.label
            ? {
                x: from.x + (to.x - from.x) * 0.5,
                y: from.y + (to.y - from.y) * 0.5,
              }
            : undefined,
        },
      ];
    });

    setMeasuredLinks(nextLinks);
  }, []);

  const setNodeRef = useCallback((id: string) => {
    return (node: HTMLButtonElement | null) => {
      if (node) {
        nodeRefs.current.set(id, node);
      } else {
        nodeRefs.current.delete(id);
      }
    };
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(measure);
    });
    observer.observe(container);
    nodeRefs.current.forEach((node) => observer.observe(node));
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section className="node-demo-section" aria-labelledby="node-demo-title">
      <div className="node-demo-heading">
        <div>
          <p className="eyebrow">Connection graph demo</p>
          <h1 id="node-demo-title">AI marketing system map</h1>
          <p>
            I mapped the same workflow as an inspectable field diagram: data
            sources, MCP access, agent context, human review, publishing, and
            tracking feedback.
          </p>
        </div>
        <dl className="node-demo-summary" aria-label="Demo properties">
          <div>
            <dt>Surface</dt>
            <dd>Custom SVG map</dd>
          </div>
          <div>
            <dt>Interaction</dt>
            <dd>Hover, focus, click</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>/node-demo</dd>
          </div>
        </dl>
      </div>

      <div className="node-demo-workbench">
        <div
          className="node-demo-canvas"
          ref={containerRef}
          onMouseLeave={() => setActiveNode("website")}
        >
          <div className="node-demo-zone node-demo-zone-input" aria-hidden="true">
            <span>Input</span>
          </div>
          <div className="node-demo-zone node-demo-zone-output" aria-hidden="true">
            <span>Output</span>
          </div>
          <div className="node-demo-zone node-demo-zone-agent" aria-hidden="true">
            <span>Working context</span>
          </div>

          <svg className="node-demo-lines" aria-hidden="true">
            <defs>
              <marker
                id="node-demo-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
                viewBox="0 0 8 8"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" />
              </marker>
              <marker
                id="node-demo-arrow-start"
                markerHeight="8"
                markerWidth="8"
                orient="auto-start-reverse"
                refX="1"
                refY="4"
                viewBox="0 0 8 8"
              >
                <path d="M 8 0 L 0 4 L 8 8 z" />
              </marker>
            </defs>
            {measuredLinks.map((link) => {
              const active = link.from === activeNode || link.to === activeNode;
              const muted =
                !active && activeNode && !connectedIds.has(link.from) && !connectedIds.has(link.to);
              return (
                <g
                  className={`node-demo-link-group ${active ? "is-active" : ""} ${
                    muted ? "is-muted" : ""
                  }`}
                  key={link.id}
                >
                  <path
                    className={`node-demo-link node-demo-link-${link.variant ?? "primary"}`}
                    d={link.d}
                    markerEnd="url(#node-demo-arrow)"
                    markerStart={link.twoWay ? "url(#node-demo-arrow-start)" : undefined}
                  />
                  {link.labelPoint ? (
                    <text
                      className="node-demo-link-label"
                      x={link.labelPoint.x}
                      y={link.labelPoint.y - 10}
                      textAnchor="middle"
                    >
                      {link.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          {demoNodes.map((node) => {
            const Icon = node.icon;
            const active = node.id === activeNode;
            const related = connectedIds.has(node.id);

            return (
              <button
                className={`node-demo-node node-demo-node-${node.tone ?? "system"} ${
                  active ? "is-active" : ""
                } ${related ? "is-related" : "is-dimmed"}`}
                key={node.id}
                ref={setNodeRef(node.id)}
                style={{ gridArea: node.zone }}
                type="button"
                onClick={() => setActiveNode(node.id)}
                onFocus={() => setActiveNode(node.id)}
                onMouseEnter={() => setActiveNode(node.id)}
                aria-pressed={active}
              >
                <span className="node-demo-icon">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span>
                  <strong>{node.label}</strong>
                  {node.detail ? <small>{node.detail}</small> : null}
                </span>
              </button>
            );
          })}
        </div>

        <aside className="node-demo-inspector" aria-live="polite">
          <p className="eyebrow">Selected node</p>
          <h2>{activeNodeData.label}</h2>
          <p>
            {activeNodeData.detail
              ? activeNodeData.detail
              : "Core workflow checkpoint in the system map."}
          </p>
          <div className="node-demo-relation-list" aria-label="Direct relationships">
            {activeLinks.map((link) => {
              const connectedId = link.from === activeNode ? link.to : link.from;
              const connectedNode = nodeById.get(connectedId);
              return (
                <span key={link.id}>
                  {connectedNode?.label ?? connectedId}
                  {link.twoWay ? " <->" : ""}
                </span>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
