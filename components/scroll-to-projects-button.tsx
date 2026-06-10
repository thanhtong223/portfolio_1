"use client";

import { ArrowRight } from "lucide-react";

export function ScrollToProjectsButton() {
  function scrollToProjects() {
    document
      .getElementById("project-highlights")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button className="button button-ghost" type="button" onClick={scrollToProjects}>
      <ArrowRight size={18} aria-hidden="true" />
      See projects
    </button>
  );
}
