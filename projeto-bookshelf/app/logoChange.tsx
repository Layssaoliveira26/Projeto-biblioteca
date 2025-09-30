"use client";

import { useEffect } from "react";

export default function FaviconSystem() {
  useEffect(() => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;

    const setFavicon = () => {
      if (!favicon) return;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      favicon.href = isDark ? "/logo-2.png" : "/logo.png";
    };

    setFavicon();

    const listener = (e: MediaQueryListEvent) => {
      favicon.href = e.matches ? "/logo-2.png" : "/logo.png";
    };

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", listener);

    return () => mql.removeEventListener("change", listener);
  }, []);

  return null;
}
