"use client";

import { Box, Button, Card, Container, Flex, Grid, Heading, Text, TextField, TextArea } from "@radix-ui/themes";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box style={{ minHeight: "100vh" }} pb="9">
                {/* Header */}
                <Box
                    style={{
                        background: "radial-gradient(circle at top center, var(--indigo-4), var(--color-background) 80%)", // Sedikit dipertegas (indigo-4)
                        borderBottom: "1px solid var(--gray-4)",
                        paddingTop: "140px",
                        paddingBottom: "var(--space-9)",
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box className="bg-grid" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
                    <Container size="3" style={{ position: 'relative', zIndex: 1 }}>
                        <Heading size="9" align="center" mb="4">Get in Touch</Heading>
                        <Text align="center" size="5" color="gray" style={{ display: "block" }}>
                            Have questions? We'd love to hear from you.
                        </Text>
                    </Container>
                </Box>

                <Container size="4" style={{ marginTop: "-60px" }}>
                    <Grid columns={{ initial: "1", md: "2" }} gap="8">
                        {/* Contact Form */}
                        <Card size="4" style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}>
                            <form>
                                <Flex direction="column" gap="4">
                                    <Heading size="5" mb="2">Send us a message</Heading>
                                    <Grid columns="2" gap="4">
                                        <Box>
                                            <Text as="div" size="2" mb="1" weight="bold">Name</Text>
                                            <TextField.Root placeholder="Your name" />
                                        </Box>
                                        <Box>
                                            <Text as="div" size="2" mb="1" weight="bold">Email</Text>
                                            <TextField.Root placeholder="hello@example.com" />
                                        </Box>
                                    </Grid>
                                    <Box>
                                        <Text as="div" size="2" mb="1" weight="bold">Topic</Text>
                                        <TextField.Root placeholder="Membership / Partnership" />
                                    </Box>
                                    <Box>
                                        <Text as="div" size="2" mb="1" weight="bold">Message</Text>
                                        <TextArea placeholder="Tell us what you need..." style={{ height: 120 }} />
                                    </Box>
                                    <Button size="3" variant="solid" style={{ cursor: 'pointer' }}>
                                        Send Message <Send size={16} />
                                    </Button>
                                </Flex>
                            </form>
                        </Card>

                        {/* Contact Info & Map */}
                        <Flex direction="column" gap="6">
                            <Card size="3">
                                <Flex gap="4" align="center">
                                    <Box p="3" style={{ background: "var(--indigo-3)", borderRadius: "50%" }}>
                                        <Mail size={24} color="var(--indigo-11)" />
                                    </Box>
                                    <Box>
                                        <Heading size="3">Email Us</Heading>
                                        <Text color="gray">contact@pupcl.org</Text>
                                    </Box>
                                </Flex>
                            </Card>

                            <Card size="3">
                                <Flex gap="4" align="center">
                                    <Box p="3" style={{ background: "var(--green-3)", borderRadius: "50%" }}>
                                        <MessageCircle size={24} color="var(--green-11)" />
                                    </Box>
                                    <Box>
                                        <Heading size="3">WhatsApp Community</Heading>
                                        <Text color="gray">+62 812-3456-7890</Text>
                                    </Box>
                                </Flex>
                            </Card>

                            <Card size="3">
                                <Flex gap="4" align="start">
                                    <Box p="3" style={{ background: "var(--teal-3)", borderRadius: "50%" }}>
                                        <MapPin size={24} color="var(--teal-11)" />
                                    </Box>
                                    <Box>
                                        <Heading size="3" mb="1">Visit Us</Heading>
                                        <Text color="gray" as="p" style={{ lineHeight: 1.5 }}>
                                            Jl. Jend. Ahmad Yani No.42a,<br />
                                            Padang Bulan, Kec. Senapelan,<br />
                                            Kota Pekanbaru, Riau 28155
                                        </Text>
                                        <Box mt="4" style={{ borderRadius: 8, overflow: 'hidden', height: 200 }}>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.626639659039!2d101.44040937583792!3d0.5516743639611314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ab00676b0cb5%3A0xe5a3c983a54d6f8a!2sJl.%20Jend.%20Ahmad%20Yani%20No.42a%2C%20Padang%20Bulan%2C%20Kec.%20Senapelan%2C%20Kota%20Pekanbaru%2C%20Riau%2028155!5e0!3m2!1sen!2sid!4v1703670000000!5m2!1sen!2sid"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </Box>
                                    </Box>
                                </Flex>
                            </Card>
                        </Flex>
                    </Grid>
                </Container>
            </Box>
        </motion.div>
    );
}
