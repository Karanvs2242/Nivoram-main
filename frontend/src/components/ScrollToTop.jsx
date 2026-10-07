import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/lenis";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    scrollToTop(true);
  }, [pathname]);
  return null;
}