"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Ports the IntersectionObserver reveal behaviour from the approved preview.
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".rv, .doc").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
