import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
  Badge,
} from "@radix-ui/themes";
import {
  ArrowRight,
  Code,
  Terminal,
  Globe,
  Zap,
  Users,
  Trophy,
  HandHeart,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  MotionWrapper,
  CodeBlock,
  FloatingCodeWindow,
  AnimatedCard,
} from "@/components/HeroAnimations";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { cn } from "@/lib/utils";

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge
                size="3"
                variant="surface"
                color="indigo"
                radius="full"
                style={{
                  backdropFilter: "blur(10px)",
                  border: "1px solid var(--indigo-a5)",
                  marginBottom: "1rem",
                }}
              >
                🚀 The Future of Tech in Riau starts here.
              </Badge>
            </MotionWrapper>

            <MotionWrapper
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ textAlign: "center" }}
            >
              <Heading size="9" align="center" className="text-heading">
                <Text className="gradient-text">
                  PU PEKANBARU CODE LAB
                </Text>
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
                  <Button
                    size="4"
                    variant="solid"
                    highContrast
                    radius="full"
                    className="btn-primary"
                  >
                    Explore Events <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="4"
                    variant="outline"
                    highContrast
                    radius="full"
                    className="btn-outline-dark"
                  >
                    Learn More
                  </Button>
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
                  <Box className="icon-container" style={{ backgroundColor: "var(--indigo-3)" }}>
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
                  <Box className="icon-container" style={{ backgroundColor: "var(--plum-3)" }}>
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
                  <Box className="icon-container" style={{ backgroundColor: "var(--teal-3)" }}>
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
            <Text color="gray" size="4" align="center" className="max-w-content">
              We provide the ecosystem you need to go from zero to hero in the
              tech industry.
            </Text>
          </Flex>

          <BentoGrid>
            <BentoCard
              title="Networking"
              desc="Connect with mentors, alumni, and peers to build lifelong professional relationships."
              icon={<Users size={28} color="var(--indigo-11)" />}
              color="indigo"
              colSpan={2}
            />
            <BentoCard
              title="Mentorship"
              desc="Get guidance from experienced seniors."
              icon={<HandHeart size={28} color="var(--pink-11)" />}
              color="pink"
            />
            <BentoCard
              title="Real Projects"
              desc="Build apps for real clients and add them to your portfolio."
              icon={<Globe size={28} color="var(--blue-11)" />}
              color="blue"
              colSpan={2}
            />
            <BentoCard
              title="Job Connect"
              desc="Exclusive internship opportunities."
              icon={<Zap size={28} color="var(--yellow-11)" />}
              color="yellow"
            />
            <BentoCard
              title="Weekly Events"
              desc="Workshops and tech talks every week."
              icon={<Calendar size={28} color="var(--orange-11)" />}
              color="orange"
            />
            <BentoCard
              title="Hackathons"
              desc="Compete in national hackathons and win cash prizes together."
              icon={<Terminal size={28} color="var(--green-11)" />}
              color="green"
              colSpan={2}
            />
          </BentoGrid>
        </Container>
      </Section>
    </Box>
  );
}
