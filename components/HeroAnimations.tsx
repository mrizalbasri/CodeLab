"use client";

import { Box, Text } from "@radix-ui/themes";
import { motion, MotionProps } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import { RadixColor } from "@/lib/types";
import { TypingAnimation } from "@/components/ui/typing-animation";

// Animated wrapper for motion effects
interface WrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MotionWrapper({
  children,
  className,
  style,
  ...props
}: WrapperProps) {
  return (
    <motion.div className={className} style={style} {...props}>
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
    { text: "// Code your future...", indent: 0, color: "green" },
  ];

  const [key, setKey] = useState(0);
  const TYPE_SPEED = 30; // Faster typing for code
  const LINE_PAUSE = 150;

  // Reset loop every ~8 seconds (duration + pause)
  useEffect(() => {
    let totalChars = 0;
    lines.forEach(l => totalChars += l.text.length);
    const duration = (totalChars * TYPE_SPEED) + (lines.length * LINE_PAUSE) + 3000;
    
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  let cumulativeDelay = 0;

  return (
    <Box className="code-content" key={key}>
      {lines.map((line, i) => {
        const thisDelay = cumulativeDelay;
        const thisDuration = line.text.length * TYPE_SPEED;
        cumulativeDelay += thisDuration + LINE_PAUSE;

        return (
          <div key={i} style={{ paddingLeft: line.indent * 8, minHeight: '1.5em' }}>
            <Text color={line.color} style={{ fontFamily: "monospace" }}>
              <TypingAnimation
                duration={TYPE_SPEED}
                delay={thisDelay}
                startOnView={false}
                showCursor={false}
                className="leading-normal tracking-normal"
              >
                {line.text}
              </TypingAnimation>
            </Text>
          </div>
        );
      })}
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
