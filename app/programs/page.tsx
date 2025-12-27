"use client";

import { Box, Container, Flex, Heading, Text, Grid, Card, Badge, Button, Separator, Avatar } from "@radix-ui/themes";
import { Laptop, Calendar, Users, Zap, Video, MapPin, ArrowRight, MonitorPlay } from "lucide-react";

export default function ProgramsPage() {
    return (
        <Box>
            {/* Hero Header */}
            <Box
                py="9"
                style={{
                    background: "linear-gradient(135deg, var(--indigo-3), var(--color-background))",
                    borderBottom: "1px solid var(--gray-4)"
                }}
            >
                <Container size="3">
                    <Flex direction="column" align="center" gap="5" py="6">
                        <Badge size="2" color="indigo" variant="soft" radius="full">Program Unggulan</Badge>
                        <Heading size="9" align="center" style={{ lineHeight: 1.1 }}>
                            Tingkatkan Skill, <br />
                            <span style={{ color: "var(--accent-9)" }}>Bangun Masa Depan.</span>
                        </Heading>
                        <Text align="center" size="5" color="gray" style={{ maxWidth: 700 }}>
                            Beragam kegiatan edukatif mulai dari workshop teknis, webinar industri, hingga kompetisi coding menantimu.
                        </Text>
                    </Flex>
                </Container>
            </Box>

            {/* Categories */}
            <Box py="6" style={{ borderBottom: "1px solid var(--gray-4)", backgroundColor: "var(--gray-2)" }}>
                <Container size="4">
                    <Flex justify="center" gap="4" wrap="wrap">
                        <Button variant="soft" radius="full" highContrast>Semua</Button>
                        <Button variant="outline" radius="full" color="gray">Webinar</Button>
                        <Button variant="outline" radius="full" color="gray">Workshop</Button>
                        <Button variant="outline" radius="full" color="gray">Meetup</Button>
                        <Button variant="outline" radius="full" color="gray">Hackathon</Button>
                    </Flex>
                </Container>
            </Box>

            {/* Events Grid */}
            <Container size="4" py="9">
                <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="6">
                    {/* Event Item 1 */}
                    <Card size="3" style={{ padding: 0, overflow: "hidden" }}>
                        <Box height="200px" style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1542831371-d531d513ef56?auto=format&fit=crop&w=800&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} />
                        <Box p="4">
                            <Flex gap="2" mb="3">
                                <Badge color="blue">Workshop</Badge>
                                <Badge color="green">Offline</Badge>
                            </Flex>
                            <Heading size="5" mb="2">React.js Advanced Patterns</Heading>
                            <Text as="p" size="2" color="gray" mb="4">
                                Pelajari design pattern tingkat lanjut dalam pengembangan aplikasi web modern menggunakan React.
                            </Text>

                            <Flex direction="column" gap="2" mb="4">
                                <Flex gap="2" align="center">
                                    <Calendar size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">Sabtu, 12 Feb 2024</Text>
                                </Flex>
                                <Flex gap="2" align="center">
                                    <MapPin size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">Lab Komputer A2</Text>
                                </Flex>
                            </Flex>

                            <Button variant="solid" style={{ width: "100%", cursor: "pointer" }}>
                                Daftar Sekarang
                            </Button>
                        </Box>
                    </Card>

                    {/* Event Item 2 */}
                    <Card size="3" style={{ padding: 0, overflow: "hidden" }}>
                        <Box height="200px" style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&w=800&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} />
                        <Box p="4">
                            <Flex gap="2" mb="3">
                                <Badge color="purple">Webinar</Badge>
                                <Badge color="orange">Online</Badge>
                            </Flex>
                            <Heading size="5" mb="2">Intro to AI & Machine Learning</Heading>
                            <Text as="p" size="2" color="gray" mb="4">
                                Mengenal dasar-dasar kecerdasan buatan dan bagaimana memulainya sebagai pemula.
                            </Text>

                            <Flex direction="column" gap="2" mb="4">
                                <Flex gap="2" align="center">
                                    <Calendar size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">Minggu, 20 Feb 2024</Text>
                                </Flex>
                                <Flex gap="2" align="center">
                                    <Video size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">Zoom Meeting</Text>
                                </Flex>
                            </Flex>

                            <Button variant="solid" style={{ width: "100%", cursor: "pointer" }}>
                                Daftar Sekarang
                            </Button>
                        </Box>
                    </Card>

                    {/* Event Item 3 */}
                    <Card size="3" style={{ padding: 0, overflow: "hidden" }}>
                        <Box height="200px" style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} />
                        <Box p="4">
                            <Flex gap="2" mb="3">
                                <Badge color="crimson">Meetup</Badge>
                                <Badge color="green">Offline</Badge>
                            </Flex>
                            <Heading size="5" mb="2">Tech Talk: Career in Tech</Heading>
                            <Text as="p" size="2" color="gray" mb="4">
                                Diskusi santai bersama alumni yang telah sukses berkarir di perusahaan teknologi ternama.
                            </Text>

                            <Flex direction="column" gap="2" mb="4">
                                <Flex gap="2" align="center">
                                    <Calendar size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">Jumat, 25 Feb 2024</Text>
                                </Flex>
                                <Flex gap="2" align="center">
                                    <MapPin size={16} color="var(--gray-9)" />
                                    <Text size="2" color="gray">Auditorium Kampus</Text>
                                </Flex>
                            </Flex>

                            <Button variant="solid" style={{ width: "100%", cursor: "pointer" }}>
                                Daftar Sekarang
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Container>

            {/* Community Activities Section */}
            <Box py="9" style={{ backgroundColor: "var(--gray-2)" }}>
                <Container size="3">
                    <Flex direction="column" align="center" gap="6">
                        <Box p="3" style={{ borderRadius: "50%", backgroundColor: "var(--indigo-3)" }}>
                            <Users size={40} color="var(--indigo-11)" />
                        </Box>
                        <Heading size="7" align="center">Aktivitas Komunitas</Heading>
                        <Text align="center" color="gray" style={{ maxWidth: 600 }}>
                            Selain acara formal, kami juga rutin mengadakan kegiatan komunitas untuk mempererat tali persaudaraan.
                        </Text>

                        <Grid columns={{ initial: "1", sm: "2" }} gap="5" width="100%">
                            <Card>
                                <Flex gap="4" align="center">
                                    <Box p="2" style={{ backgroundColor: "var(--green-3)", borderRadius: 8 }}>
                                        <MonitorPlay color="var(--green-11)" />
                                    </Box>
                                    <Box>
                                        <Heading size="4">Weekly Code Review</Heading>
                                        <Text size="2" color="gray">Bedah kode bersama setiap Kamis malam.</Text>
                                    </Box>
                                </Flex>
                            </Card>
                            <Card>
                                <Flex gap="4" align="center">
                                    <Box p="2" style={{ backgroundColor: "var(--orange-3)", borderRadius: 8 }}>
                                        <Zap color="var(--orange-11)" />
                                    </Box>
                                    <Box>
                                        <Heading size="4">Lightning Talks</Heading>
                                        <Text size="2" color="gray">Sesi berbagi ilmu singkat 5 menit.</Text>
                                    </Box>
                                </Flex>
                            </Card>
                        </Grid>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
}
