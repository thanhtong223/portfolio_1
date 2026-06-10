import {
  BarChart3,
  Bot,
  CheckCircle2,
  Database,
  FileCode2,
  Globe2,
  Image,
  Link2,
  PenTool,
  Share2,
  UserCheck,
} from "lucide-react";

export const metrics = [
  {
    value: "+30%",
    label: "Organic impressions",
    detail: "First month of implementation",
  },
  {
    value: "+1pp",
    label: "Organic ctr",
    detail: "First month improvement",
  },
  {
    value: "+40%",
    label: "Form information collection",
    detail: "Improved lead context quality",
  },
  {
    value: "5-8h",
    label: "Weekly time saved (estimated)",
    detail: "Across reporting, SEO analysis, ideation, metadata, and tool switching",
  },
];

export const systems = [
  {
    title: "Inbound performance automation",
    summary:
      "Mcp workflow for pulling gsc and ga4 data faster, finding content performance gaps, and turning reports into usable inbound insights.",
    role:
      "Workflow design, report automation, insight generation, and content optimization support.",
    stack: ["Claude Desktop", "Antigravity", "mcp", "ga4", "gsc", "Ghost"],
    impact: "+30% impressions, +1pp ctr, 5-8h saved weekly",
  },
  {
    title: "Product website building",
    summary:
      "A product website built with Ghost CMS customization, product messaging, tracking, SEO metadata, and responsive styling.",
    role:
      "Page structure, cms customization, bilingual workaround, brand styling, forms, tracking, and seo setup.",
    stack: ["Ghost", "cms customization", "seo metadata", "Tracking", "ai-assisted coding"],
    impact: "Solo ownership across product marketing and implementation",
  },
];

export const stackGroups = [
  {
    title: "AI agents",
    items: [
      { label: "Claude Desktop", mark: "C", tone: "claude", logo: "/tool-logos/claude.svg" },
      { label: "Codex", mark: "C", tone: "technical", logo: "/tool-logos/codex.svg" },
      { label: "Google Antigravity", mark: "G", tone: "google", logo: "/tool-logos/google-antigravity.svg" },
    ],
  },
  {
    title: "Data + CRM",
    items: [
      { label: "Google Analytics 4", mark: "G", tone: "google", logo: "/tool-logos/google-analytics.svg" },
      { label: "Google Search Console", mark: "G", tone: "google", logo: "/tool-logos/google-search-console.svg" },
      { label: "HubSpot CRM", mark: "H", tone: "hubspot", logo: "/tool-logos/hubspot.svg" },
    ],
  },
  {
    title: "Content + publishing",
    items: [
      { label: "Ghost CMS", mark: "G", tone: "ghost", logo: "/tool-logos/ghost.svg" },
      { label: "LinkedIn", mark: "in", tone: "linkedin", logo: "/tool-logos/linkedin.svg" },
      { label: "Facebook", mark: "f", tone: "facebook", logo: "/tool-logos/facebook.svg" },
    ],
  },
  {
    title: "System layer",
    items: [
      { label: "MCP servers", mark: "M", tone: "technical" },
      { label: "API integrations", mark: "API", tone: "technical" },
    ],
  },
];

export const architectureNodes = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Pulls search and behavior signals before campaign decisions.",
    icon: BarChart3,
    actions: [
      ["Pull search queries", "get_search_queries()"],
      ["Pull page metrics", "get_page_metrics()"],
      ["Compare ctr baseline", "compare_ctr_baseline()"],
    ],
  },
  {
    id: "crm",
    title: "Crm",
    description: "Adds lead and form context so content work connects to pipeline signals.",
    icon: Database,
    actions: [
      ["Fetch contact segments", "get_contact_segments()"],
      ["Summarize lead quality", "summarize_lead_quality()"],
      ["Find missing form fields", "audit_form_context()"],
    ],
  },
  {
    id: "mcp",
    title: "Mcp layer",
    description: "Structured actions let the agent inspect tools without manual exports.",
    icon: FileCode2,
    actions: [
      ["Route tool request", "call_tool_action()"],
      ["Normalize response", "map_tool_result()"],
      ["Log recommendation", "log_recommendation()"],
    ],
  },
  {
    id: "agent",
    title: "Agent Layer",
    description: "Llm agents combine business context, skills, and retrieved tool data.",
    icon: Bot,
    actions: [
      ["Apply seo skill", "run_seo_skill()"],
      ["Draft recommendations", "draft_recommendations()"],
      ["Summarize next actions", "summarize_next_steps()"],
    ],
  },
  {
    id: "review",
    title: "Human Review",
    description: "A required checkpoint for brand accuracy, facts, tone, and business context.",
    icon: UserCheck,
    actions: [
      ["Check brand accuracy", "review_brand_fit()"],
      ["Check factual claims", "review_claims()"],
      ["Approve next step", "approve_for_publishing()"],
    ],
  },
  {
    id: "publishing",
    title: "Cms / Social",
    description: "Turns reviewed recommendations into drafts for Ghost and social channels.",
    icon: Share2,
    actions: [
      ["Fetch cms post", "get_cms_post()"],
      ["Create draft update", "create_metadata_draft()"],
      ["Draft social post", "create_social_post()"],
    ],
  },
  {
    id: "tracking",
    title: "Tracking Loop",
    description: "Connects published outputs back to attribution and performance review.",
    icon: Link2,
    actions: [
      ["Generate tracking link", "generate_utm()"],
      ["Log experiment", "log_experiment_utm()"],
      ["Review result", "review_performance_delta()"],
    ],
  },
];

export const workflowPaths = [
  {
    id: "seo",
    label: "Seo workflow",
    path: ["gsc / ga4", "mcp actions", "Agent analysis", "Metadata suggestions", "Human review", "Ghost update", "Performance tracking"],
    summary:
      "Find low-ctr pages, inspect cms context, suggest metadata updates, and track the result after review.",
  },
  {
    id: "social",
    label: "Social Workflow",
    path: ["cms post", "Agent repurpose skill", "Image prompt", "Social draft", "Human review", "LinkedIn / Facebook"],
    summary:
      "Repurpose a product or blog message into channel-specific posts and image prompts with brand review.",
  },
  {
    id: "crm",
    label: "Crm workflow",
    path: ["HubSpot context", "Lead segment", "Agent summary", "Campaign angle", "Human review", "Outbound / inbound action"],
    summary:
      "Use lead context to improve campaign angles without exposing private crm records publicly.",
  },
  {
    id: "publishing",
    label: "Publishing Loop",
    path: ["Reviewed draft", "Ghost / social", "utm", "ga4 / gsc feedback", "Recommendation log"],
    summary:
      "Keep content action connected to attribution so the system learns from performance signals.",
  },
];

export const actionGroups = [
  {
    title: "Analytics actions",
    icon: BarChart3,
    actions: [
      ["Pull search query data", "get_search_queries()"],
      ["Pull page performance", "get_page_metrics()"],
      ["Compare against baseline", "compare_ctr_baseline()"],
    ],
  },
  {
    title: "Cms actions",
    icon: Globe2,
    actions: [
      ["Fetch cms post", "get_cms_post()"],
      ["Create draft update", "create_metadata_draft()"],
      ["Update metadata", "update_metadata()"],
    ],
  },
  {
    title: "Creative actions",
    icon: Image,
    actions: [
      ["Draft image prompt", "create_image_prompt()"],
      ["Apply channel format", "format_social_asset()"],
      ["Prepare review note", "create_visual_review_note()"],
    ],
  },
  {
    title: "Review actions",
    icon: CheckCircle2,
    actions: [
      ["Check brand accuracy", "review_brand_fit()"],
      ["Check content claims", "review_claims()"],
      ["Approve next step", "approve_for_publishing()"],
    ],
  },
];

export const simulatorScenarios = [
  {
    id: "low-ctr",
    label: "Low ctr blog page",
    page: "/blog/b2b-marketplace-growth",
    impressions: "12,400",
    clicks: "186",
    ctr: "1.5%",
    position: "8.7",
    intent: "Searchers are comparing growth channels and need a clearer practical angle before clicking.",
    title: "B2B Marketplace Growth: Practical Channels, Metrics, and Automation Ideas",
    meta:
      "Learn how b2b marketplace teams can connect seo, crm, and automation workflows to improve lead generation and campaign execution.",
    fixes: [
      "Move the practical automation angle into the title.",
      "Add a comparison section for inbound vs outbound growth motions.",
      "Clarify the call-to-action near the first third of the page.",
    ],
  },
  {
    id: "declining",
    label: "Declining impressions",
    page: "/resources/saas-lead-generation",
    impressions: "8,920",
    clicks: "214",
    ctr: "2.4%",
    position: "11.2",
    intent: "Searchers want a current lead generation workflow, not a generic list of tactics.",
    title: "Saas lead generation workflow: From search intent to crm follow-up",
    meta:
      "A practical saas lead generation workflow covering search intent, content fixes, crm context, and follow-up actions.",
    fixes: [
      "Refresh the introduction with current workflow language.",
      "Add crm handoff examples to make the page more specific.",
      "Consolidate overlapping sections that dilute search intent.",
    ],
  },
  {
    id: "metadata",
    label: "Metadata refresh",
    page: "/insights/technical-marketing",
    impressions: "5,680",
    clicks: "91",
    ctr: "1.6%",
    position: "7.9",
    intent: "Searchers are trying to understand what technical marketing means in practical work.",
    title: "Technical Marketing in Practice: Systems, Data, Content, and Automation",
    meta:
      "See how technical marketing connects analytics, cms, crm, and automation into practical growth workflows.",
    fixes: [
      "Rewrite title around practical work instead of abstract definition.",
      "Add examples of tool connections and human review points.",
      "Improve internal links to case-study style pages.",
    ],
  },
];

export const simulatorSteps = [
  ["Pull search queries", "get_search_queries()"],
  ["Compare ctr baseline", "compare_ctr_baseline()"],
  ["Inspect cms context", "get_cms_post()"],
  ["Suggest metadata updates", "suggest_title_meta()"],
  ["Prepare human review checklist", "review_for_brand_accuracy()"],
];

export const reviewChecklist = [
  "Title matches search intent without overpromising.",
  "Meta description is specific and readable in search results.",
  "Content fixes preserve brand accuracy and factual claims.",
  "Recommendation is logged before publishing.",
];

export const iconMap = { PenTool };
