"use client";

import { Box, Heading, Text, Flex } from "@radix-ui/themes";
import { useRef, useState } from "react";

interface BentoGridProps {
  children: React.ReactNode;
}

export const BentoGrid = ({ children }: BentoGridProps) => {
  return <div className="bento-grid">{children}</div>;
};

interface BentoCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  href?: string;
}

export const BentoCard = ({
  title,
  desc,
  icon,
  color,
  colSpan = 1,
  rowSpan = 1,
}: BentoCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`bento-card spotlight-card ${
        colSpan === 2 ? "bento-span-2" : ""
      } ${rowSpan === 2 ? "bento-row-span-2" : ""}`}
      style={
        {
          "--mouse-x": `${position.x}px`,
          "--mouse-y": `${position.y}px`,
        } as React.CSSProperties
      }
    >
      <Flex direction="column" height="100%" justify="between">
        <Box>
          <Box
            className="icon-container-sm"
            style={{ backgroundColor: `var(--${color}-3)`, marginBottom: "1rem" }}
          >
            {icon}
          </Box>
          <Heading size="4" mb="2" weight="bold">
            {title}
          </Heading>
          <Text as="p" color="gray" size="2" style={{ lineHeight: 1.6 }}>
            {desc}
          </Text>
        </Box>
        
        {/* Subtle decorative element */}
        <Box
          style={{
            marginTop: "1rem",
            height: "4px",
            width: "40px",
            borderRadius: "2px",
            background: `linear-gradient(to right, var(--${color}-9), transparent)`,
            opacity: 0.5,
          }}
        />
      </Flex>
    </div>
  );
};
