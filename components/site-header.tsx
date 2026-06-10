"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const headerSurfaceClass =
    pathname === "/"
      ? ""
      : pathname.startsWith("/about")
        ? " site-header-static-dark"
        : " site-header-static-light";

  useEffect(() => {
    const anchor = anchorRef.current;

    if (pathname !== "/") {
      anchor?.style.removeProperty("--brand-highlight-clip-bottom");
      anchor?.style.removeProperty("--brand-dark-clip-top");
      return;
    }

    let frame = 0;

    const syncSurface = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.querySelector(".hero-section");
        const anchor = anchorRef.current;
        const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
        const anchorRect = anchor?.getBoundingClientRect();

        if (!anchor || !anchorRect) {
          return;
        }

        const darkSurfaceCoverage = Math.min(
          1,
          Math.max(0, (heroBottom - anchorRect.top) / anchorRect.height),
        );
        const clipBottom = (1 - darkSurfaceCoverage) * 100;
        const clipTop = darkSurfaceCoverage * 100;

        anchor.style.setProperty(
          "--brand-highlight-clip-bottom",
          `${clipBottom}%`,
        );
        anchor.style.setProperty("--brand-dark-clip-top", `${clipTop}%`);
      });
    };

    syncSurface();
    window.addEventListener("scroll", syncSurface, { passive: true });
    window.addEventListener("resize", syncSurface);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncSurface);
      window.removeEventListener("resize", syncSurface);
    };
  }, [pathname]);

  return (
    <header className={`site-header${headerSurfaceClass}`}>
      <Link className="brand-mark" href="/" aria-label="Tong Van Thanh home">
        <span className="brand-name">
          <span
            className="brand-name-anchor"
            data-text="thanh"
            ref={anchorRef}
          >
            thanh
          </span>
          <span className="brand-name-rest">tong van</span>
        </span>
        <span className="brand-subtitle">Marketing career portfolio</span>
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
