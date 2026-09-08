"use client";

import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
  Badge,
} from "@radix-ui/themes";

import NextImage from "next/image";
import { TechStackBeam } from "@/components/TechStackBeam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundLines } from "@/components/ui/background-lines";
import { MemberSection } from "@/components/MemberSection";

import { getMembers, Member } from "@/app/actions";
import { initialMembers } from "@/lib/data/members";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMembers();
        if (data && data.length > 0) {
          setMembers(data);
        }
      } catch (err) {
        console.warn("Supabase members unavailable, using static fallback:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      {/* Header Section */}
      <Box
        style={{
          backgroundColor: "var(--gray-2)",
          borderBottom: "1px solid var(--gray-4)",
          paddingTop: "140px",
          paddingBottom: "var(--space-6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box className="bg-grid absolute inset-0 z-0 pointer-events-none" />
        <Container size="4" px="4" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex direction="column" align="center" gap="4" py="6">
              <Heading size={{ initial: "7", md: "9" }} align="center">
                {t.about.headerTitle}
              </Heading>
              <Text
                align="center"
                size={{ initial: "3", sm: "4", md: "5" }}
                color="gray"
                style={{ maxWidth: 700, lineHeight: 1.6 }}
              >
                {t.about.headerSubtitle}{" "}
                <LinkPreview
                  url="https://pekanbaru.president.ac.id/"
                  className="font-bold text-[#0047BA] dark:text-blue-400 hover:underline"
                >
                  President University Pekanbaru
                </LinkPreview>
                .
              </Text>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      {/* Content Section */}
      <Container size="4" py="6" px="4">
        <Flex direction="column" gap="9">
          {/* About Section with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid columns={{ initial: "1", md: "2" }} gap="9" align="center">
              <Box>
                <Heading size={{ initial: "6", md: "8" }} mb="4" color="indigo">
                  {t.about.aboutPupcl}
                </Heading>
                <Text
                  as="p"
                  size="4"
                  color="gray"
                  style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}
                >
                  {t.about.aboutP1}
                </Text>
                <Text
                  as="p"
                  size="4"
                  color="gray"
                  style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}
                >
                  {t.about.aboutP2}
                </Text>
              </Box>

              {/* Logo Section */}
              <Flex justify="center" align="center">
                <Box
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    aspectRatio: "1/1",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--gray-alpha-4)",
                    background: "var(--color-panel-solid)",
                    boxShadow: "0 8px 24px -6px rgba(0,0,0,0.15)",
                    position: "relative",
                  }}
                >
                  <NextImage
                    src="/logo.jpeg"
                    alt="PUPCL Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 350px"
                    priority
                  />
                </Box>
              </Flex>
            </Grid>
          </motion.div>

          {/* Visi & Misi */}
          <Box mt="9">
            <Grid columns={{ initial: "1", md: "2" }} gap="6">
              {/* Visi Card */}
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:p-3 bg-gray-100 dark:bg-gray-900/40">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-white dark:bg-black/80">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-gray-600/10 p-2">
                      <Heading size="6" color="indigo">
                        {t.about.visionTitle}
                      </Heading>
                    </div>
                    <div className="space-y-3">
                      <Heading
                        size="3"
                        className="font-bold text-gray-800 dark:text-gray-100"
                      >
                        {t.about.visionHeading}
                      </Heading>
                      <Text
                        as="p"
                        size="3"
                        color="gray"
                        style={{ lineHeight: 1.6 }}
                      >
                        {t.about.visionDesc}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Misi Card */}
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:p-3 bg-gray-100 dark:bg-gray-900/40">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-white dark:bg-black/80">
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-gray-600/10 p-2">
                      <Heading size="6" color="plum">
                        {t.about.missionTitle}
                      </Heading>
                    </div>
                    <Flex direction="column" gap="2">
                      {t.about.missionItems.map((item, i) => (
                        <Text
                          key={i}
                          as="p"
                          size="2"
                          color="gray"
                          style={{
                            lineHeight: 1.5,
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "var(--plum-9)",
                            }}
                          >
                            {i + 1}.
                          </span>{" "}
                          {item}
                        </Text>
                      ))}
                    </Flex>
                  </div>
                </div>
              </div>
            </Grid>
          </Box>

          {/* Tujuan & Sasaran */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box mt="4">
              <Heading size="7" mb="4">
                {t.about.goalsTitle}
              </Heading>
              <Grid columns={{ initial: "1", md: "2" }} gap="6">
                <Box>
                  <Heading size="4" color="teal" mb="2">
                    {t.about.objectivesTitle}
                  </Heading>
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingLeft: "20px",
                      color: "var(--gray-11)",
                      lineHeight: "1.6",
                    }}
                  >
                    {t.about.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </Box>
                <Box>
                  <Heading size="4" color="orange" mb="2">
                    {t.about.targetTitle}
                  </Heading>
                  <Text as="p" color="gray" style={{ lineHeight: 1.6 }}>
                    {t.about.targetDesc}
                  </Text>
                </Box>
              </Grid>
            </Box>
          </motion.div>

          {/* Tech Stack Section */}
          <Box mt="9">
            <Grid columns={{ initial: "1", md: "2" }} gap="9" align="center">
              <Box>
                <Badge
                  color="cyan"
                  size="2"
                  radius="full"
                  variant="soft"
                  mb="2"
                >
                  {t.about.techBadge}
                </Badge>
                <Heading
                  size={{ initial: "6", md: "8" }}
                  mb="4"
                  color="gray"
                  highContrast
                >
                  {t.about.techTitle}
                </Heading>
                <Text
                  as="p"
                  size="4"
                  color="gray"
                  style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}
                >
                  {t.about.techDesc}
                </Text>

                <Grid columns="2" gap="4">
                  <Box>
                    <Heading size="3" mb="2" color="indigo">
                      Core
                    </Heading>
                    <Text size="2" color="gray">
                      HTML, CSS, JavaScript, TypeScript, Java, Python
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="3" mb="2" color="blue">
                      Frameworks
                    </Heading>
                    <Text size="2" color="gray">
                      React, Next.js, Laravel, Flutter, Tailwind
                    </Text>
                  </Box>
                </Grid>
              </Box>

              <Box style={{ position: "relative" }}>
                <Card
                  size="3"
                  style={{
                    background: "var(--gray-2)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1/1",
                    position: "relative",
                    padding: 0,
                  }}
                >
                  <TechStackBeam />
                </Card>
              </Box>
            </Grid>
          </Box>

          {/* ─── Team Section ─────────────────────────────────────────────────────── */}
          <Section>
            <Flex direction="column" align="center" gap="3" mb="8">
              <Badge color="orange" size="2" radius="full" variant="soft">
                {t.about.teamBadge}
              </Badge>
              <Heading size={{ initial: "6", md: "8" }} align="center">
                {t.about.teamTitle}
              </Heading>
              <Text
                align="center"
                color="gray"
                size="3"
                style={{ maxWidth: 600 }}
              >
                {t.about.teamDesc}
              </Text>
            </Flex>

            <Flex
              direction="column"
              gap="9"
              align="center"
              style={{ marginTop: "2rem" }}
            >
              {/* Helper filters — didefinisikan sekali, dipakai ulang untuk catch-all */}
              {(() => {
                const isLeadership = (m: Member) => {
                  const r = m.role.toLowerCase();
                  return (
                    r.includes("ketua") ||
                    r.includes("president") ||
                    r.includes("leader") ||
                    r.includes("chairman") ||
                    r.includes("chief") ||
                    r.includes("head of club") ||
                    r === "head"
                  );
                };
                const isCoreTeam = (m: Member) => {
                  const r = m.role.toLowerCase();
                  return (
                    r.includes("bendahara") ||
                    r.includes("sekretaris") ||
                    r.includes("treasurer") ||
                    r.includes("secretary")
                  );
                };
                const isMedia = (m: Member) =>
                  m.role.toLowerCase().includes("media");
                const isOutreach = (m: Member) => {
                  const r = m.role.toLowerCase();
                  return (
                    r.includes("outreach") || r.includes("public relation")
                  );
                };
                const isResearch = (m: Member) =>
                  m.role.toLowerCase().includes("research");

                // Anggota yang tidak masuk section manapun
                const unmatched = members.filter(
                  (m) =>
                    !isLeadership(m) &&
                    !isCoreTeam(m) &&
                    !isMedia(m) &&
                    !isOutreach(m) &&
                    !isResearch(m),
                );

                return (
                  <>
                    {/* Ketua / Leadership */}
                    <MemberSection
                      label={t.about.leadershipLabel}
                      color="indigo"
                      isLoading={isLoading}
                      members={members.filter(isLeadership)}
                      variant="large"
                      animateOnView={false}
                      centered
                    />

                    {/* Bendahara & Sekretaris */}
                    <MemberSection
                      label={t.about.coreTeamLabel}
                      color="teal"
                      isLoading={isLoading}
                      members={members.filter(isCoreTeam)}
                    />

                    {/* Divisi Media & Creative */}
                    <MemberSection
                      label={t.about.mediaLabel}
                      color="pink"
                      isLoading={isLoading}
                      description={t.about.mediaDesc}
                      members={members.filter(isMedia)}
                    />

                    {/* Divisi Outreach & Influence */}
                    <MemberSection
                      label={t.about.outreachLabel}
                      color="orange"
                      isLoading={isLoading}
                      description={t.about.outreachDesc}
                      members={members.filter(isOutreach)}
                      minCardWidth="300px"
                    />

                    {/* Divisi Research & Development */}
                    <MemberSection
                      label={t.about.researchLabel}
                      color="blue"
                      isLoading={isLoading}
                      description={t.about.researchDesc}
                      members={members.filter(isResearch)}
                      minCardWidth="300px"
                    />

                    {/* Catch-all: anggota yang role-nya belum masuk divisi manapun */}
                    {!isLoading && unmatched.length > 0 && (
                      <MemberSection
                        label={t.about.unmatchedLabel}
                        color="gray"
                        isLoading={false}
                        members={unmatched}
                      />
                    )}
                  </>
                );
              })()}
            </Flex>
          </Section>
        </Flex>
      </Container>

      {/* Full Width CTA Section with Background Lines */}
      <BackgroundLines className="w-full py-16 sm:py-20">
        <Container size="3" px="4">
          <Flex direction="column" align="center" gap={{ initial: "4", sm: "6" }}>
            <Heading
              size={{ initial: "6", sm: "8", md: "9" }}
              align="center"
              highContrast
              className="text-[#0047BA] dark:text-blue-400 font-extrabold text-center tracking-tight"
            >
              {t.about.ctaTitle}
            </Heading>
            <Text
              align="center"
              size={{ initial: "3", sm: "4", md: "5" }}
              className="max-w-2xl text-neutral-700 dark:text-neutral-300"
              style={{ lineHeight: 1.6 }}
            >
              {t.about.ctaDesc}
            </Text>
            {/* CTA button navigates to /contact */}
            <InteractiveHoverButton
              className="mt-2 sm:mt-4 bg-[#0047BA] text-white hover:bg-[#00358a] border-none px-8 py-3"
              onClick={() => router.push("/contact")}
            >
              {t.about.ctaBtn}
            </InteractiveHoverButton>
          </Flex>
        </Container>
      </BackgroundLines>
    </Box>
  );
}
