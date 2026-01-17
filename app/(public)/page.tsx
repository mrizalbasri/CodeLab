import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Users, Code, Trophy, Calendar } from "lucide-react";
import Link from "next/link";
import {
  MotionWrapper,
  CodeBlock,
  FloatingCodeWindow,
  AnimatedCard,
} from "@/components/HeroAnimations";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { WobbleCard } from "@/components/ui/wobble-card";
import { RippleButton } from "@/components/ui/ripple-button";

import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box className="radial-gradient-bg hero-container relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="var(--indigo-9)"
        />

        <BackgroundBeamsWithCollision className="!h-auto min-h-[800px] w-full bg-transparent">
          <Container size="3" className="relative z-1">
            <Flex direction="column" align="center" gap="6">
              <MotionWrapper
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ textAlign: "center" }}
              >
                <Heading size="9" align="center" className="text-heading">
                  <Text className="gradient-text">PU PEKANBARU CODE LAB</Text>
                </Heading>
                <Heading
                  size="9"
                  align="center"
                  className="text-heading"
                  style={{ marginTop: "-10px" }}
                >
                  (PUPCL)
                </Heading>
              </MotionWrapper>

              <MotionWrapper
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Text
                  size="5"
                  align="center"
                  color="gray"
                  className="max-w-content text-body"
                  style={{ marginTop: "20px" }}
                >
                  Join the most active student tech community. Build real-world
                  projects, connect with industry mentors, and accelerate your
                  career.
                </Text>
              </MotionWrapper>

              <MotionWrapper
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Flex gap="4" mt="6" mb="8">
                  <Link href="/about">
                    <RippleButton
                      rippleColor="#ADD8E6"
                      className="w-40 bg-indigo-600 dark:bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-700 border-none"
                    >
                      Explore Events
                    </RippleButton>
                  </Link>
                  <Link href="/contact">
                    <RippleButton
                      rippleColor="#ffffff"
                      className="w-40 bg-transparent dark:bg-indigo-500/20 border border-indigo-500/50 dark:border-indigo-300/80 text-indigo-600 dark:text-white hover:bg-indigo-500/10 dark:hover:bg-indigo-500/30"
                    >
                      Learn More
                    </RippleButton>
                  </Link>
                </Flex>
              </MotionWrapper>

              {/* Visual Content (Code Mockup) */}
              <FloatingCodeWindow>
                <Box mt="8" mb="9" className="code-window">
                  {/* Window Controls */}
                  <Flex gap="2" className="code-window-header">
                    <Box className="window-control window-control-red" />
                    <Box className="window-control window-control-yellow" />
                    <Box className="window-control window-control-green" />
                  </Flex>

                  {/* Animated Code Content */}
                  <CodeBlock />
                </Box>
              </FloatingCodeWindow>
            </Flex>
          </Container>
        </BackgroundBeamsWithCollision>
      </Box>

      {/* Modern Stats Grid */}
      <Box className="section-bg-gray" py="9">
        <Container size="4">
          <Grid columns={{ initial: "1", md: "3" }} gap="6">
            <AnimatedCard>
              <Card className="card-elevated">
                <Flex align="center" gap="4" p="2">
                  <Box
                    className="icon-container"
                    style={{ backgroundColor: "var(--indigo-3)" }}
                  >
                    <Users size={24} color="var(--indigo-11)" />
                  </Box>
                  <Box>
                    <Heading size="6" weight="bold">
                      500+
                    </Heading>
                    <Text size="2" color="gray">
                      Active Members
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </AnimatedCard>

            <AnimatedCard>
              <Card className="card-elevated">
                <Flex align="center" gap="4" p="2">
                  <Box
                    className="icon-container"
                    style={{ backgroundColor: "var(--plum-3)" }}
                  >
                    <Code size={24} color="var(--plum-11)" />
                  </Box>
                  <Box>
                    <Heading size="6" weight="bold">
                      50+
                    </Heading>
                    <Text size="2" color="gray">
                      Shipped Projects
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </AnimatedCard>

            <AnimatedCard>
              <Card className="card-elevated">
                <Flex align="center" gap="4" p="2">
                  <Box
                    className="icon-container"
                    style={{ backgroundColor: "var(--teal-3)" }}
                  >
                    <Trophy size={24} color="var(--teal-11)" />
                  </Box>
                  <Box>
                    <Heading size="6" weight="bold">
                      12
                    </Heading>
                    <Text size="2" color="gray">
                      National Awards
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </AnimatedCard>
          </Grid>
        </Container>
      </Box>

      {/* Feature Section with Glass Cards */}
      <Section size="3">
        <Container size="4">
          <Flex direction="column" align="center" mb="9" gap="4">
            <Heading size="8" align="center" weight="bold">
              Why Join PUPCL?
            </Heading>
            <Text
              color="gray"
              size="4"
              align="center"
              className="max-w-content"
            >
              We provide the ecosystem you need to go from zero to hero in the
              tech industry.
            </Text>
          </Flex>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-indigo-800 min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Networking & Mentorship
                </h2>
                <p className="mt-4 text-left text-base/6 text-neutral-200">
                  Connect with alumni, industry mentors, and peers. Build
                  lifelong professional relationships and get guidance from
                  experienced seniors.
                </p>
              </div>
              <Box className="absolute -right-4 lg:-right-[10%] -bottom-10 object-contain rounded-2xl">
                <Users size={200} className="text-indigo-400 opacity-50" />
              </Box>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-pink-800">
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Weekly Workshops
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Sharpen your skills with regular tech talks and hands-on coding
                sessions.
              </p>
              <Box className="absolute -right-2 -bottom-2">
                <Calendar size={120} className="text-pink-400 opacity-50" />
              </Box>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Build Real-World Projects
                </h2>
                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  Don&apos;t just learn theory. Build apps for real clients,
                  compete in national hackathons, and launch your career with
                  exclusive internship opportunities.
                </p>
              </div>
              <Box className="absolute -right-10 md:-right-[10%] lg:-right-[5%] -bottom-10 object-contain rounded-2xl">
                <Trophy size={300} className="text-blue-400 opacity-30" />
              </Box>
            </WobbleCard>
          </div>
        </Container>
      </Section>
    </Box>
  );
}
