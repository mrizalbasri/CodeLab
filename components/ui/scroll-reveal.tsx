"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import React from "react";

export type ScrollDirection = "up" | "down" | "left" | "right" | "fade" | "scale";

export interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: ScrollDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number;
  className?: string;
  viewportMargin?: string;
  amount?: number | "some" | "all";
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 24,
  blur = 0,
  className,
  viewportMargin = "-50px",
  amount,
  once = true,
  ...props
}: ScrollRevealProps) {
  const blurValue = blur > 0 ? `blur(${blur}px)` : "blur(0px)";
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, filter: blurValue };
      case "down":
        return { opacity: 0, y: -distance, filter: blurValue };
      case "left":
        return { opacity: 0, x: distance, filter: blurValue };
      case "right":
        return { opacity: 0, x: -distance, filter: blurValue };
      case "scale":
        return { opacity: 0, scale: 0.95, filter: blurValue };
      case "fade":
      default:
        return { opacity: 0, filter: blurValue };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0, filter: "blur(0px)" };
      case "left":
      case "right":
        return { opacity: 1, x: 0, filter: "blur(0px)" };
      case "scale":
        return { opacity: 1, scale: 1, filter: "blur(0px)" };
      case "fade":
      default:
        return { opacity: 1, filter: "blur(0px)" };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: viewportMargin, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollStaggerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export function ScrollStagger({
  children,
  staggerDelay = 0.08,
  className,
  viewportMargin = "-50px",
  once = true,
  ...props
}: ScrollStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = 0.45,
  blur = 6,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  direction?: ScrollDirection;
  distance?: number;
  duration?: number;
  blur?: number;
} & HTMLMotionProps<"div">) {
  const hiddenTransform =
    direction === "left"
      ? { x: distance }
      : direction === "right"
        ? { x: -distance }
        : direction === "down"
          ? { y: -distance }
          : direction === "scale"
            ? { scale: 0.96 }
            : direction === "fade"
              ? {}
              : { y: distance };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, filter: `blur(${blur}px)`, ...hiddenTransform },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
