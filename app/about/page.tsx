"use client";

import { Box, Container, Flex, Heading, Text, Grid, Card, Avatar, Badge, Separator, IconButton } from "@radix-ui/themes";
import { Target, Lightbulb, Users, CalendarCheck, CheckCircle2, Linkedin, Github, Mail } from "lucide-react";

export default function AboutPage() {

    // DATA PENGURUS
    const teamMembers = [
        {
            name: "M. Rizal Basri",
            role: "Chairperson",
            src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&q=80",
            fallback: "RB",
            color: "indigo" as const,
            gradient: "linear-gradient(135deg, var(--indigo-9), var(--purple-9))",
            banner: "linear-gradient(135deg, var(--indigo-5), var(--purple-5))"
        },
        {
            name: "Tiarma Ronauli D.",
            role: "Secretary 1",
            src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
            fallback: "TD",
            color: "pink" as const,
            gradient: "linear-gradient(135deg, var(--pink-9), var(--red-9))",
            banner: "linear-gradient(135deg, var(--pink-5), var(--red-5))"
        },
        {
            name: "Rika Enjery Effendy",
            role: "Secretary 2",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
            fallback: "RE",
            color: "pink" as const,
            gradient: "linear-gradient(135deg, var(--pink-9), var(--red-9))",
            banner: "linear-gradient(135deg, var(--pink-5), var(--red-5))"
        },
        {
            name: "Bunga Amelya Zulferi",
            role: "Treasurer 1",
            src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
            fallback: "BZ",
            color: "teal" as const,
            gradient: "linear-gradient(135deg, var(--teal-9), var(--green-9))",
            banner: "linear-gradient(135deg, var(--teal-5), var(--green-5))"
        },
        {
            name: "Margareth Talita O. S.",
            role: "Treasurer 2",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
            fallback: "MS",
            color: "teal" as const,
            gradient: "linear-gradient(135deg, var(--teal-9), var(--green-9))",
            banner: "linear-gradient(135deg, var(--teal-5), var(--green-5))"
        },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box
                py="9"
                style={{
                    background: "linear-gradient(135deg, var(--indigo-3), var(--color-background))",
                    borderBottom: "1px solid var(--gray-4)"
                }}
            >
                <Container size="3">
                    <Flex direction="column" align="center" gap="5" py="6">
                        <Badge size="2" color="indigo" variant="soft" radius="full">
                            PU PEKANBARU CODE LAB
                        </Badge>
                        <Heading size="9" align="center" style={{ maxWidth: 800 }}>
                            About Us
                        </Heading>
                        <Text align="center" size="5" color="gray" style={{ maxWidth: 700 }}>
                            An initiative by President University Pekanbaru students to create a collaborative, creative, and innovative environment in technology.
                        </Text>
                    </Flex>
                </Container>
            </Box>

            {/* Background Section */}
            <Container size="3" py="9">
                <Grid columns={{ initial: "1", md: "2" }} gap="9" align="center">
                    <Box>
                        <Heading size="7" mb="4">Background</Heading>
                        <Text as="p" size="4" color="gray" style={{ lineHeight: 1.6 }} mb="4">
                            PU PEKANBARU CODE LAB (PUPCL) was established to address the growing need for programming skills in the digital era.
                            We believe that coding competence is essential for careers, digital entrepreneurship, and future professional opportunities.
                        </Text>
                        <Text as="p" size="4" color="gray" style={{ lineHeight: 1.6 }}>
                            This club serves not just as a learning hub, but as a place where students can develop independent skills,
                            work in teams, and contribute to building useful digital solutions for society.
                        </Text>
                    </Box>
                    <Box style={{
                        height: "300px",
                        backgroundColor: "var(--gray-3)",
                        borderRadius: "24px",
                        backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.8
                    }} />
                </Grid>
            </Container>

            {/* Vision & Mission */}
            <Box py="9" style={{ backgroundColor: "var(--gray-2)" }}>
                <Container size="4">
                    <Grid columns={{ initial: "1", md: "2" }} gap="6">
                        <Card size="3" style={{ background: "var(--color-panel-solid)" }}>
                            <Flex gap="4" align="start">
                                <Box p="2" style={{ backgroundColor: "var(--purple-3)", borderRadius: 8 }}>
                                    <Lightbulb size={24} color="var(--purple-11)" />
                                </Box>
                                <Box>
                                    <Heading size="5" mb="3">Our Vision</Heading>
                                    <Text as="p" color="gray">
                                        To become a programming learning community at President University Pekanbaru that inspires and supports students
                                        to grow together, hone coding skills, and innovate in the technology field.
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>

                        <Card size="3" style={{ background: "var(--color-panel-solid)" }}>
                            <Flex gap="4" align="start">
                                <Box p="2" style={{ backgroundColor: "var(--teal-3)", borderRadius: 8 }}>
                                    <Target size={24} color="var(--teal-11)" />
                                </Box>
                                <Box>
                                    <Heading size="5" mb="3">Our Mission</Heading>
                                    <Flex direction="column" gap="3">
                                        {[
                                            "Conduct routine coding training for various languages & tech.",
                                            "Build members into tough problem solvers.",
                                            "Encourage active portfolio building.",
                                            "Foster collaboration and teamwork.",
                                            "Participate in coding competitions."
                                        ].map((item, i) => (
                                            <Flex key={i} gap="2" align="start">
                                                <CheckCircle2 size={16} style={{ marginTop: 4, flexShrink: 0 }} color="var(--teal-9)" />
                                                <Text size="2" color="gray">{item}</Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>
                            </Flex>
                        </Card>
                    </Grid>
                </Container>
            </Box>

            {/* Program Kerja (Work Programs) */}
            <Container size="3" py="9">
                <Heading size="7" align="center" mb="2">Work Programs</Heading>
                <Text align="center" color="gray" mb="8">Our roadmap to success.</Text>

                <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="5">
                    {[
                        { title: "Weekly Learning", desc: "Study sessions at least once a week." },
                        { title: "Monthly Projects", desc: "Complete one coding project every month." },
                        { title: "Tech Sharing", desc: "Discussions on the programming world." },
                        { title: "Fundamentals", desc: "Learning basics tailored to skill levels." },
                        { title: "Project Demo", desc: "Presenting finished projects to the club." }
                    ].map((prog, i) => (
                        <Card key={i}>
                            <Flex gap="3" align="center">
                                <CalendarCheck size={20} color="var(--indigo-9)" />
                                <Box>
                                    <Text weight="bold" size="3" as="div">{prog.title}</Text>
                                    <Text size="2" color="gray">{prog.desc}</Text>
                                </Box>
                            </Flex>
                        </Card>
                    ))}
                </Grid>
            </Container>


            {/* Organizational Structure */}
            <Box py="9" style={{ borderTop: "1px solid var(--gray-4)", position: 'relative' }}>
                <Container size="4">
                    <Flex direction="column" align="center" mb="9" gap="2">
                        <Badge variant="outline" highContrast color="gray" radius="full">Leadership</Badge>
                        <Heading size="8" align="center">Meet the Team</Heading>
                        <Text color="gray" align="center">The dedicated students behind PUPCL.</Text>
                    </Flex>

                    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6" width="auto" justify="center">
                        {teamMembers.map((member, index) => (
                            <Box
                                key={index}
                                style={{
                                    position: 'relative',
                                    borderRadius: "16px",
                                    overflow: 'hidden',
                                    backgroundColor: "var(--color-panel-solid)",
                                    boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)",
                                    border: "1px solid var(--gray-a4)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                                }}
                                className="hover:-translate-y-2 hover:shadow-xl group"
                            >
                                {/* Top Banner */}
                                <Box style={{ height: "100px", background: member.banner }} />

                                {/* Content */}
                                <Flex direction="column" align="center" pb="5" px="4">
                                    {/* Floating Avatar */}
                                    <Box
                                        style={{
                                            marginTop: "-50px",
                                            borderRadius: "50%",
                                            padding: "4px",
                                            backgroundColor: "var(--color-panel-solid)"
                                        }}
                                    >
                                        <Avatar
                                            src={member.src}
                                            fallback={member.fallback}
                                            size="7"
                                            radius="full"
                                        />
                                    </Box>

                                    <Box mt="3" style={{ textAlign: 'center' }}>
                                        <Heading size="4" mb="1" weight="bold">{member.name}</Heading>
                                        <Badge color={member.color} variant="soft" radius="full">{member.role}</Badge>
                                    </Box>

                                    {/* Social Icons (Optional Placeholder) */}
                                    <Flex gap="3" mt="4" style={{ opacity: 0.6 }}>
                                        <IconButton size="1" variant="ghost" color="gray"><Github size={16} /></IconButton>
                                        <IconButton size="1" variant="ghost" color="gray"><Linkedin size={16} /></IconButton>
                                        <IconButton size="1" variant="ghost" color="gray"><Mail size={16} /></IconButton>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
