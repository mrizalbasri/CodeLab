"use client";

import { Box, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import { RadixColor } from "@/lib/types";

// Animated wrapper for motion effects
export function MotionWrapper({
  children,
  initial,
  animate,
  transition,
  whileHover,
  whileTap,
  className,
  style,
}: {
  children: ReactNode;
  initial?: object;
  animate?: object;
  transition?: object;
  whileHover?: object;
  whileTap?: object;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Komponen simulasi mengetik kode (Looping)
export function CodeBlock() {
  const lines: Array<{ text: string; indent: number; color: RadixColor }> = [
    { text: "function PUPCL_Welcome() {", indent: 0, color: "pink" },
    { text: "  return (", indent: 2, color: "gray" },
    { text: '    <div className="future-leaders">', indent: 4, color: "plum" },
    { text: "      <h1>Hello, World!</h1>", indent: 6, color: "indigo" },
    { text: "      <p>Join the Revolution 🚀</p>", indent: 6, color: "indigo" },
    { text: "    </div>", indent: 4, color: "plum" },
    { text: "  );", indent: 2, color: "gray" },
    { text: "}", indent: 0, color: "pink" },
  ];

  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (visibleLines < lines.length) {
      timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 400);
    } else {
      timeout = setTimeout(() => {
        setVisibleLines(0);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [visibleLines, lines.length]);

  return (
    <Box className="code-content">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: i < visibleLines ? 1 : 0,
            x: i < visibleLines ? 0 : -10,
          }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ paddingLeft: line.indent * 8 }}>
            <Text color={line.color} style={{ fontFamily: "monospace" }}>
              {line.text}
            </Text>
          </div>
        </motion.div>
      ))}
      {visibleLines >= lines.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ paddingLeft: 16, marginTop: 4 }}
        >
          <Text color="green" style={{ fontFamily: "monospace" }}>
            // Code your future...
          </Text>
          <span className="animate-pulse-cursor" />
        </motion.div>
      )}
    </Box>
  );
}

// Floating animation wrapper for code window
export function FloatingCodeWindow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: [0, -15, 0], opacity: 1 }}
      transition={{
        y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        opacity: { duration: 1, delay: 0.5 },
      }}
      className="full-width max-w-content-lg"
    >
      {children}
    </motion.div>
  );
}

// Animated stat card
export function AnimatedCard({ children }: { children: ReactNode }) {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      {children}
    </motion.div>
  );
}

// Animated feature card
export function AnimatedFeatureCard({ children }: { children: ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.div>
  );
}
