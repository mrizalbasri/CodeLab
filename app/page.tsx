"use client";

import { Box, Button, Container, Flex, Grid, Heading, Section, Text, Card } from "@radix-ui/themes";
import { ArrowRight, Code, Users, Trophy, HandHeart, Calendar, Rocket } from "lucide-react";

export default function Home() {
  return (
    <Box>
      {/* Dynamic Hero Section */}
      <Box
        style={{
          position: 'relative',
          overflow: 'hidden',
          // Deep refined gradient for dark mode vibrancy
          background: "radial-gradient(circle at 50% 0%, var(--indigo-5) 0%, var(--color-background) 60%)",
        }}
        pt="9" pb="9"
      >
        {/* Animated/Glowing Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute top-[10%] right-[20%] w-[250px] h-[250px] rounded-full bg-blue-500/20 blur-[100px]" />

        <Container size="3" style={{ position: 'relative', zIndex: 1 }}>
          <Flex direction="column" align="center" gap="6" py="9">
            <Flex
              align="center"
              gap="2"
              px="4" py="2"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "9999px",
                border: "1px solid var(--gray-a4)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
              }}
            >
              <Rocket size={16} color="var(--accent-9)" />
              <Text size="2" weight="medium" style={{ color: "var(--gray-11)" }}>PU PEKANBARU CODE LAB</Text>
            </Flex>

            <Heading size="9" align="center" style={{ maxWidth: 900, lineHeight: 1.1, fontWeight: 800 }}>
              Ignite Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Tech Journey</span> <br />
              with Our Community.
            </Heading>

            <Text size="5" align="center" style={{ maxWidth: 680, color: "var(--gray-10)", lineHeight: 1.6 }}>
              Join the most active student tech community. Build real-world projects, connect with industry mentors, and accelerate your career.
            </Text>

            <Flex gap="4" mt="4" wrap="wrap" justify="center">
              <Button size="4" variant="solid" highContrast style={{ cursor: "pointer", borderRadius: "12px", paddingLeft: 32, paddingRight: 32 }}>
                Explore Events <ArrowRight size={18} />
              </Button>
              <Button size="4" variant="outline" color="gray" style={{ cursor: "pointer", borderRadius: "12px", backdropFilter: "blur(5px)" }}>
                Learn More
              </Button>
            </Flex>

            {/* Visual Code/Tech Element Mockup */}
            <Box mt="8" style={{
              width: '100%',
              maxWidth: '800px',
              height: '300px', // Placeholder height
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '24px 24px 0 0',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 -20px 60px -10px rgba(99, 102, 241, 0.1)'
            }}>
              <Flex p="4" gap="2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </Flex>
              <Flex justify="center" align="center" height="100%">
                <Code size={48} color="rgba(255,255,255,0.1)" />
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Modern Stats Grid */}
      <Box style={{ backgroundColor: "var(--gray-1)" }} py="8">
        <Container size="4">
          <Grid columns={{ initial: "1", md: "3" }} gap="6">
            <Card style={{ backgroundColor: "var(--gray-2)", border: "none" }}>
              <Flex align="center" gap="4" p="2">
                <Box p="3" style={{ backgroundColor: "var(--indigo-3)", borderRadius: "12px" }}>
                  <Users size={24} color="var(--indigo-11)" />
                </Box>
                <Box>
                  <Heading size="6" weight="bold">500+</Heading>
                  <Text size="2" color="gray">Active Members</Text>
                </Box>
              </Flex>
            </Card>
            <Card style={{ backgroundColor: "var(--gray-2)", border: "none" }}>
              <Flex align="center" gap="4" p="2">
                <Box p="3" style={{ backgroundColor: "var(--plum-3)", borderRadius: "12px" }}>
                  <Code size={24} color="var(--plum-11)" />
                </Box>
                <Box>
                  <Heading size="6" weight="bold">50+</Heading>
                  <Text size="2" color="gray">Shipped Projects</Text>
                </Box>
              </Flex>
            </Card>
            <Card style={{ backgroundColor: "var(--gray-2)", border: "none" }}>
              <Flex align="center" gap="4" p="2">
                <Box p="3" style={{ backgroundColor: "var(--teal-3)", borderRadius: "12px" }}>
                  <Trophy size={24} color="var(--teal-11)" />
                </Box>
                <Box>
                  <Heading size="6" weight="bold">12</Heading>
                  <Text size="2" color="gray">National Awards</Text>
                </Box>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Box>

      {/* Feature Section with Glass Cards */}
      <Section size="3">
        <Container size="4">
          <Flex direction="column" align="center" mb="9" gap="4">
            <Heading size="8" align="center" weight="bold">Why Join TechClub?</Heading>
            <Text color="gray" size="4" align="center" style={{ maxWidth: 600 }}>We provide the ecosystem you need to go from zero to hero in the tech industry.</Text>
          </Flex>

          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
            {[
              { icon: Users, color: "indigo", title: "Networking", desc: "Connect with mentors, alumni, and peers." },
              { icon: HandHeart, color: "pink", title: "Mentorship", desc: "Get guidance from experienced seniors." },
              { icon: Calendar, color: "orange", title: "Events", desc: "Weekly workshops and tech talks." },
            ].map((feature, i) => (
              <Card key={i} size="3" style={{
                background: "var(--gray-2)",
                transition: "all 0.3s ease",
                cursor: "default"
              }} className="hover:shadow-lg hover:-translate-y-1">
                <Flex gap="4" direction="column">
                  <Box p="3" width="max-content" style={{ borderRadius: 12, backgroundColor: `var(--${feature.color}-3)` }}>
                    <feature.icon size={28} color={`var(--${feature.color}-11)`} />
                  </Box>
                  <Box>
                    <Heading size="4" mb="2">{feature.title}</Heading>
                    <Text as="p" color="gray" size="2" style={{ lineHeight: 1.6 }}>
                      {feature.desc}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  );
}
