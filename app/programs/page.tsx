"use client";

import { Box, Container, Flex, Heading, Text, Grid, Card, Badge, Button, Separator, Avatar } from "@radix-ui/themes";
import { Laptop, Calendar, Users, Zap, Video, MapPin, ArrowRight, MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgramsPage() {

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <Box>
            {/* Hero Header */}
            <Box
                style={{
                    background: "radial-gradient(circle at top center, var(--indigo-4), var(--color-background) 80%)",
                    borderBottom: "1px solid var(--gray-4)",
                    paddingTop: "140px",
                    paddingBottom: "var(--space-9)",
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box className="bg-grid" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
                <Container size="3" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
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
                    </motion.div>
                </Container>
            </Box>

            {/* Categories */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <Box py="6" style={{ borderBottom: "1px solid var(--gray-4)", backgroundColor: "var(--gray-2)" }}>
                    <Container size="4">
                        <Flex justify="center" gap="4" wrap="wrap">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="soft" radius="full" highContrast style={{ cursor: 'pointer' }}>Semua</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="outline" radius="full" color="gray" style={{ cursor: 'pointer' }}>Webinar</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="outline" radius="full" color="gray" style={{ cursor: 'pointer' }}>Workshop</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="outline" radius="full" color="gray" style={{ cursor: 'pointer' }}>Meetup</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="outline" radius="full" color="gray" style={{ cursor: 'pointer' }}>Hackathon</Button>
                            </motion.div>
                        </Flex>
                    </Container>
                </Box>
            </motion.div>

            {/* Events Grid */}
            <Container size="4" py="9">
                <motion.div
                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Event Item 1 */}
                    <motion.div variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
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
                    </motion.div>

                    {/* Event Item 2 */}
                    <motion.div variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
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
                    </motion.div>

                    {/* Event Item 3 */}
                    <motion.div variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
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
                    </motion.div>
                </motion.div>
            </Container>

            {/* Community Activities Section */}
            <Box py="9" style={{ backgroundColor: "var(--gray-2)" }}>
                <Container size="3">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Flex direction="column" align="center" gap="6">
                            <Box p="3" style={{ borderRadius: "50%", backgroundColor: "var(--indigo-3)" }}>
                                <Users size={40} color="var(--indigo-11)" />
                            </Box>
                            <Heading size="7" align="center">Aktivitas Komunitas</Heading>
                            <Text align="center" color="gray" style={{ maxWidth: 600 }}>
                                Selain acara formal, kami juga rutin mengadakan kegiatan komunitas untuk mempererat tali persaudaraan.
                            </Text>

                            <Grid columns={{ initial: "1", sm: "2" }} gap="5" width="100%">
                                <motion.div whileHover={{ translateX: 10 }}>
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
                                </motion.div>
                                <motion.div whileHover={{ translateX: 10 }}>
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
                                </motion.div>
                            </Grid>
                        </Flex>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}
