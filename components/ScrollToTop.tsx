"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@radix-ui/themes";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 50,
          }}
        >
          <IconButton
            size="3"
            radius="full"
            onClick={scrollToTop}
            style={{
              padding: "12px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              backdropFilter: "blur(12px)",
              backgroundColor: "var(--indigo-9)",
              color: "white",
              cursor: "pointer",
            }}
            className="hover:scale-110 transition-transform"
          >
            <ArrowUp size={20} fontWeight="bold" />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
