"use client";

import { Box, Card, Flex, Heading, Avatar, Badge } from "@radix-ui/themes";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import { Member } from "@/app/actions";

function getRoleColor(color: Member["color"]) {
  switch (color) {
    case "indigo":
      return "#0047BA"; // President University Blue
    case "blue":
      return "#0284c7";
    case "red":
      return "#E31B23"; // President University Crimson Red
    case "pink":
      return "#db2777";
    case "teal":
      return "#0d9488";
    case "orange":
      return "#ea580c";
    default:
      return "#4b5563";
  }
}

function getRoleLightColor(color: Member["color"]) {
  switch (color) {
    case "indigo":
      return "var(--indigo-3)";
    case "pink":
      return "var(--pink-3)";
    case "teal":
      return "var(--teal-3)";
    case "orange":
      return "var(--orange-3)";
    case "blue":
      return "var(--blue-3)";
    default:
      return "var(--gray-3)";
  }
}

interface MemberCardProps {
  member: Member;
  index: number;
  /** "large" untuk Ketua/Leadership, "default" untuk anggota biasa */
  variant?: "large" | "default";
  /** Jika false, animasi langsung diputar (animate). Jika true, animasi dipicu saat scroll ke view (whileInView). */
  animateOnView?: boolean;
}

export function MemberCard({
  member,
  index,
  variant = "default",
  animateOnView = true,
}: MemberCardProps) {
  const isLarge = variant === "large";

  // Ukuran visual berbeda antara leadership dan anggota biasa
  const headerHeight = isLarge ? 120 : 110;
  const avatarBottom = isLarge ? -55 : -50;
  const avatarSize: "8" | "9" = isLarge ? "9" : "8";
  const marginTop = isLarge ? 20 : 16;
  const meteorsCount = isLarge ? 20 : 15;

  // Props animasi: whileInView untuk section anggota, animate langsung untuk leadership
  const animationProps = animateOnView
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: {
          delay: 0.2 + index * 0.1,
          duration: 0.5,
          type: "spring" as const,
          stiffness: 100,
        },
      }
    : {
        initial: { opacity: 0, y: isLarge ? -30 : 30 },
        animate: { opacity: 1, y: 0 },
        transition: {
          delay: 0.2 + index * 0.15,
          duration: 0.6,
          type: "spring" as const,
          stiffness: 100,
        },
      };

  return (
    <motion.div {...animationProps}>
      <Card
        style={{
          padding: 0,
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          height: "100%",
        }}
        className="member-card"
      >
        {/* Solid Header with Meteors */}
        <Box
          style={{
            height: headerHeight,
            backgroundColor: getRoleColor(member.color),
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Meteors number={meteorsCount} />
          {/* Avatar overlapping the header */}
          <Box
            style={{
              position: "absolute",
              bottom: avatarBottom,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <Avatar
              size={avatarSize}
              src={member.image || ""}
              fallback={member.name[0]}
              radius="full"
              style={{
                border: "5px solid var(--color-card-background)",
                backgroundColor: "var(--gray-4)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Box>

        {/* Card Body */}
        <Box p="5" pt="8" pb="6">
          <Flex
            direction="column"
            align="center"
            gap="3"
            style={{ marginTop }}
          >
            <Heading size="5" align="center">
              {member.name}
            </Heading>
            <Badge color={member.color} size="2" variant="soft" radius="full">
              {member.role}
            </Badge>
          </Flex>
        </Box>
      </Card>
    </motion.div>
  );
}
