"use client";

import { Box, Card, Flex, Heading, Avatar, Text } from "@radix-ui/themes";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "motion/react";
import { Member } from "@/app/actions";

function getRoleColor(color: Member["color"]) {
  switch (color) {
    case "indigo":
      return "#0047BA";
    case "blue":
      return "#0284c7";
    case "red":
      return "#E31B23";
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

function getRoleSoftColor(color: Member["color"]) {
  switch (color) {
    case "indigo":
      return "rgba(0, 71, 186, 0.12)";
    case "blue":
      return "rgba(2, 132, 199, 0.12)";
    case "red":
      return "rgba(227, 27, 35, 0.12)";
    case "pink":
      return "rgba(219, 39, 119, 0.12)";
    case "teal":
      return "rgba(13, 148, 136, 0.12)";
    case "orange":
      return "rgba(234, 88, 12, 0.12)";
    default:
      return "rgba(75, 85, 99, 0.1)";
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
  const accent = getRoleColor(member.color);
  const accentSoft = getRoleSoftColor(member.color);

  const headerHeight = isLarge ? 132 : 118;
  const avatarBottom = isLarge ? -58 : -52;
  const avatarSize: "8" | "9" = isLarge ? "9" : "8";
  const marginTop = isLarge ? 18 : 14;
  const meteorsCount = isLarge ? 14 : 10;

  const animationProps = animateOnView
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: {
          delay: 0.2 + index * 0.1,
          duration: 0.5,
          type: "spring" as const,
          stiffness: 110,
        },
      }
    : {
        initial: { opacity: 0, y: isLarge ? -30 : 30 },
        animate: { opacity: 1, y: 0 },
        transition: {
          delay: 0.2 + index * 0.15,
          duration: 0.6,
          type: "spring" as const,
          stiffness: 110,
        },
      };

  return (
    <motion.div {...animationProps}>
      <Card
        style={{
          padding: 0,
          overflow: "hidden",
          height: "100%",
          border: `1px solid ${accentSoft}`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96))",
          boxShadow: "0 18px 44px -28px rgba(15, 23, 42, 0.32)",
          borderRadius: "30px",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        }}
        className="group member-card rounded-[30px] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.42)]"
      >
        <Box
          style={{
            height: headerHeight,
            background: `linear-gradient(135deg, ${accent} 0%, rgba(15,23,42,0.96) 100%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top left, rgba(255,255,255,0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(255,255,255,0.1), transparent 32%)",
            }}
          />
          <Meteors number={meteorsCount} />
          <Box
            style={{
              position: "absolute",
              inset: "auto auto 12px 16px",
              zIndex: 2,
            }}
          >
            <Box
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              PUPCL
            </Box>
          </Box>
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
                border: "5px solid rgba(255,255,255,0.9)",
                backgroundColor: "var(--gray-4)",
                boxShadow: "0 18px 36px rgba(15, 23, 42, 0.2)",
              }}
            />
          </Box>
        </Box>

        <Box p="5" pt="7" pb="5">
          <Flex direction="column" align="center" gap="2" style={{ marginTop }}>
            <Text
              size="1"
              align="center"
              style={{
                color: accent,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {member.role}
            </Text>
            <Heading size={isLarge ? "6" : "5"} align="center" style={{ lineHeight: 1.2 }}>
              {member.name}
            </Heading>
          </Flex>
        </Box>
      </Card>
    </motion.div>
  );
}
