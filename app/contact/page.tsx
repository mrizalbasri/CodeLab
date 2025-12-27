"use client";

import { Box, Button, Card, Container, Flex, Grid, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <Box>
            {/* Header */}
            <Box
                py="9"
                style={{
                    background: "linear-gradient(135deg, var(--teal-3), var(--color-background))",
                    borderBottom: "1px solid var(--gray-4)"
                }}
            >
                <Container size="3">
                    <Flex direction="column" align="center" gap="4" py="6">
                        <Heading size="9" align="center">Get in Touch</Heading>
                        <Text align="center" size="5" color="gray" style={{ maxWidth: 600 }}>
                            Have questions about PUPCL? Want to collaborate? We'd love to hear from you.
                        </Text>
                    </Flex>
                </Container>
            </Box>

            <Container size="4" py="9">
                <Grid columns={{ initial: "1", md: "2" }} gap="8">

                    {/* Left Column: Contact Info & Map */}
                    <Flex direction="column" gap="6">
                        <Box>
                            <Heading size="6" mb="4">Contact Information</Heading>
                            <Flex direction="column" gap="4">
                                <Card size="2">
                                    <Flex gap="3" align="center">
                                        <Box p="2" style={{ backgroundColor: "var(--indigo-3)", borderRadius: "8px" }}>
                                            <Mail size={20} color="var(--indigo-11)" />
                                        </Box>
                                        <Box>
                                            <Text size="2" color="gray" weight="bold">Email Us</Text>
                                            <Text size="3" as="div">pupcl@president.ac.id</Text>
                                        </Box>
                                    </Flex>
                                </Card>

                                <Card size="2">
                                    <Flex gap="3" align="center">
                                        <Box p="2" style={{ backgroundColor: "var(--green-3)", borderRadius: "8px" }}>
                                            <MessageCircle size={20} color="var(--green-11)" />
                                        </Box>
                                        <Box>
                                            <Text size="2" color="gray" weight="bold">WhatsApp Community</Text>
                                            <Text size="3" as="div">+62 812-3456-7890</Text>
                                        </Box>
                                    </Flex>
                                </Card>

                                <Card size="2">
                                    <Flex gap="3" align="start">
                                        <Box p="2" style={{ backgroundColor: "var(--orange-3)", borderRadius: "8px" }}>
                                            <MapPin size={20} color="var(--orange-11)" />
                                        </Box>
                                        <Box>
                                            <Text size="2" color="gray" weight="bold">Visit Us</Text>
                                            <Text size="3" as="div">
                                                Jl. Jend. Ahmad Yani No.42a,<br />
                                                Padang Bulan, Kec. Senapelan,<br />
                                                Kota Pekanbaru, Riau.
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Flex>
                        </Box>

                        {/* Map Placeholder */}
                        <Box style={{
                            height: "300px",
                            backgroundColor: "var(--gray-3)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            position: "relative"
                        }}>
                            <iframe
                                src="https://maps.google.com/maps?q=Jl.+Jend.+Ahmad+Yani+No.42a,+Padang+Bulan,+Kec.+Senapelan,+Kota+Pekanbaru,+Riau&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(10%)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            {/* Text overlay if map fails or just style */}
                            <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'var(--color-panel-solid)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                Pekanbaru Area
                            </div>
                        </Box>
                    </Flex>

                    {/* Right Column: Message Form */}
                    <Card size="4" style={{ height: "fit-content" }}>
                        <Heading size="6" mb="2">Send us a Message</Heading>
                        <Text size="2" color="gray" mb="5">
                            Questions about joining? Project collaboration ideas? Fill fully the form below.
                        </Text>

                        <Flex direction="column" gap="4">
                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">Your Name</Text>
                                <TextField.Root placeholder="John Doe" size="3">
                                    <TextField.Slot>
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>

                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">Email Address</Text>
                                <TextField.Root placeholder="john@example.com" size="3" />
                            </Box>

                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">Topic</Text>
                                <TextField.Root placeholder="Membership / Partnership" size="3" />
                            </Box>

                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">Message</Text>
                                <TextArea placeholder="Tell us more..." size="3" style={{ height: 120 }} />
                            </Box>

                            <Button size="3" variant="solid" highContrast style={{ cursor: "pointer", marginTop: "10px" }}>
                                Send Message <Send size={16} />
                            </Button>
                        </Flex>
                    </Card>

                </Grid>
            </Container>
        </Box>
    );
}
