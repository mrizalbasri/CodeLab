"use client";

import { Box, Flex, Text, Badge } from "@radix-ui/themes";
import { MemberCard } from "@/components/MemberCard";
import { Member } from "@/app/actions";
import { RadixColor } from "@/lib/types";

interface MemberSectionProps {
  label: string;
  color: RadixColor;
  description?: string;
  members: Member[];
  isLoading?: boolean;
  /** "large" untuk leadership/ketua, "default" untuk anggota biasa */
  variant?: "large" | "default";
  /** Jika false, animasi langsung diputar (tidak tunggu scroll) */
  animateOnView?: boolean;
  /** Jika true, card dirender dengan Flex justify="center" (untuk single leader card) */
  centered?: boolean;
  /** Lebar minimum tiap card di grid (default: "280px") */
  minCardWidth?: string;
}

/** Skeleton placeholder card saat data sedang loading */
function SkeletonCard({ isLarge = false }: { isLarge?: boolean }) {
  return (
    <Box
      style={{
        borderRadius: "var(--radius-3)",
        overflow: "hidden",
        height: isLarge ? 320 : 290,
        backgroundColor: "var(--gray-3)",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      {/* Header gradient placeholder */}
      <Box
        style={{
          height: isLarge ? 120 : 110,
          backgroundColor: "var(--gray-4)",
        }}
      />
      {/* Avatar placeholder */}
      <Flex justify="center" style={{ marginTop: isLarge ? -55 : -50 }}>
        <Box
          style={{
            width: isLarge ? 80 : 64,
            height: isLarge ? 80 : 64,
            borderRadius: "50%",
            backgroundColor: "var(--gray-5)",
            border: "5px solid var(--gray-3)",
          }}
        />
      </Flex>
      {/* Text placeholders */}
      <Flex direction="column" align="center" gap="2" mt="6" px="4">
        <Box
          style={{
            height: 16,
            width: "60%",
            borderRadius: 8,
            backgroundColor: "var(--gray-4)",
          }}
        />
        <Box
          style={{
            height: 12,
            width: "40%",
            borderRadius: 8,
            backgroundColor: "var(--gray-4)",
          }}
        />
      </Flex>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
}

export function MemberSection({
  label,
  color,
  description,
  members,
  isLoading = false,
  variant = "default",
  animateOnView = true,
  centered = false,
  minCardWidth = "280px",
}: MemberSectionProps) {
  // Sort: anggota dengan "head" di role-nya tampil paling depan
  const sorted = [...members].sort((a, b) => {
    const aIsHead = a.role.toLowerCase().includes("head");
    const bIsHead = b.role.toLowerCase().includes("head");
    return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
  });

  // Jumlah skeleton yang ditampilkan saat loading
  const skeletonCount = centered ? 1 : variant === "large" ? 1 : 3;

  return (
    <Box style={{ width: "100%", maxWidth: "1200px", marginBottom: "3rem" }}>
      {/* Section Header — selalu ditampilkan */}
      <Flex
        direction="column"
        align="center"
        mb={description ? "8" : "6"}
        gap="3"
      >
        <Badge color={color} size="3" radius="full" variant="soft">
          {label}
        </Badge>
        {description && (
          <Text align="center" color="gray" style={{ maxWidth: 600 }}>
            {description}
          </Text>
        )}
      </Flex>

      {/* Loading State: tampilkan skeleton cards */}
      {isLoading && (
        <>
          {centered ? (
            <Flex justify="center" style={{ width: "100%" }}>
              <Box style={{ maxWidth: "360px", width: "100%" }}>
                <SkeletonCard isLarge={variant === "large"} />
              </Box>
            </Flex>
          ) : (
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
                gap: "32px",
              }}
            >
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonCard key={i} isLarge={variant === "large"} />
              ))}
            </Box>
          )}
        </>
      )}

      {/* Empty State: tidak ada member yang cocok dengan filter */}
      {!isLoading && members.length === 0 && (
        <Flex justify="center" py="6">
          <Text size="2" color="gray">
            Belum ada anggota di divisi ini.
          </Text>
        </Flex>
      )}

      {/* Member Cards */}
      {!isLoading && members.length > 0 && (
        <>
          {centered ? (
            <Flex justify="center" style={{ width: "100%" }}>
              {sorted.map((member, index) => (
                <Box
                  key={member.id}
                  style={{ maxWidth: "360px", width: "100%" }}
                >
                  <MemberCard
                    member={member}
                    index={index}
                    variant={variant}
                    animateOnView={animateOnView}
                  />
                </Box>
              ))}
            </Flex>
          ) : (
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
                gap: "32px",
              }}
            >
              {sorted.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  variant={variant}
                  animateOnView={animateOnView}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
