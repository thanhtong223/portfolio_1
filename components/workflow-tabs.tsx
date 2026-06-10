"use client";

import { useState } from "react";
import { workflowPaths } from "@/lib/content";

export function WorkflowTabs() {
  const [activeId, setActiveId] = useState(workflowPaths[0].id);
  const active = workflowPaths.find((workflow) => workflow.id === activeId) ?? workflowPaths[0];

  return (
    <div className="workflow-tabs">
      <div className="tab-list" role="tablist" aria-label="Workflow paths">
        {workflowPaths.map((workflow) => (
          <button
            key={workflow.id}
            type="button"
            role="tab"
            aria-selected={workflow.id === activeId}
            onClick={() => setActiveId(workflow.id)}
          >
            {workflow.label}
          </button>
        ))}
      </div>
      <div className="workflow-panel" role="tabpanel">
        <p>{active.summary}</p>
        <ol>
          {active.path.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
