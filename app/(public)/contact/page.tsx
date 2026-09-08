"use client";

import { Box, Button, Card, Container, Flex, Grid, Heading, Text, TextField, TextArea } from "@radix-ui/themes";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "@/lib/data/site-config";
import { toast } from "sonner";

import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t, language } = useLanguage();

    // ponytail: client-side WhatsApp redirect provides instant response and zero cost without third-party email issues
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = (formData.get("name") as string)?.trim();
        const email = (formData.get("email") as string)?.trim();
        const topic = (formData.get("topic") as string)?.trim() || "Membership / Partnership";
        const message = (formData.get("message") as string)?.trim();

        if (!name || !message) {
            toast.error(language === "en" ? "Please fill in your name and message." : "Mohon lengkapi nama dan pesan Anda.");
            setIsSubmitting(false);
            return;
        }

        const lines = [
            `*Pesan Baru dari Website PUPCL*`,
            `*Nama:* ${name}`,
            email ? `*Email:* ${email}` : null,
            topic ? `*Topik:* ${topic}` : null,
            `*Pesan:*\n${message}`,
        ].filter(Boolean).join("\n");

        const waUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(lines)}`;

        toast.success(language === "en" ? "Redirecting to WhatsApp..." : "Mengarahkan ke WhatsApp...");
        window.open(waUrl, "_blank");
        form.reset();
        setIsSubmitting(false);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box style={{ minHeight: "100vh" }} pb="9">
                {/* Header */}
                <Box
                    style={{
                        backgroundColor: "var(--gray-2)",
                        borderBottom: "1px solid var(--gray-4)",
                        paddingTop: "140px",
                        paddingBottom: "var(--space-9)",
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box className="bg-grid" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
                    <Container size="3" px="4" style={{ position: 'relative', zIndex: 1 }}>
                        <Heading size={{ initial: "7", md: "9" }} align="center" mb="3">
                            {t.contact.headerTitle}
                        </Heading>
                        <Text align="center" size={{ initial: "3", sm: "4", md: "5" }} color="gray" style={{ display: "block", lineHeight: 1.6 }}>
                            {t.contact.headerSubtitle}
                        </Text>
                    </Container>
                </Box>

                <Container size="4" px="4" style={{ marginTop: "calc(var(--space-6) * -1)" }}>
                    <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "5", md: "8" }}>
                        {/* Contact Form */}
                        <Card size={{ initial: "2", sm: "3", md: "4" }} style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}>
                            <form onSubmit={handleSubmit} id="contact-form">
                                <Flex direction="column" gap="4">
                                    <Heading size="5" mb="1">
                                        {language === "en" ? "Send us a message" : "Kirim pesan kepada kami"}
                                    </Heading>
                                    <Grid columns={{ initial: "1", sm: "2" }} gap="4">
                                        <Box>
                                            <Text as="div" size="2" mb="1" weight="bold">{t.contact.nameLabel}</Text>
                                            <TextField.Root placeholder={language === "en" ? "Your full name" : "Nama lengkap Anda"} name="name" required />
                                        </Box>
                                        <Box>
                                            <Text as="div" size="2" mb="1" weight="bold">{t.contact.emailLabel}</Text>
                                            <TextField.Root placeholder="hello@example.com" name="email" type="email" />
                                        </Box>
                                    </Grid>
                                    <Box>
                                        <Text as="div" size="2" mb="1" weight="bold">{t.contact.subjectLabel}</Text>
                                        <TextField.Root placeholder={language === "en" ? "Membership / Partnership" : "Pendaftaran / Kemitraan"} name="topic" />
                                    </Box>
                                    <Box>
                                        <Text as="div" size="2" mb="1" weight="bold">{t.contact.messageLabel}</Text>
                                        <TextArea placeholder={language === "en" ? "Tell us what you need..." : "Tuliskan apa yang ingin Anda sampaikan..."} style={{ height: 120 }} name="message" required />
                                    </Box>
                                    <Button size="3" variant="solid" style={{ cursor: 'pointer', backgroundColor: "#0047BA", minHeight: "44px" }} disabled={isSubmitting}>
                                        {isSubmitting
                                          ? (language === "en" ? "Opening WhatsApp..." : "Membuka WhatsApp...")
                                          : (language === "en" ? "Send via WhatsApp" : "Kirim via WhatsApp")} <Send size={16} />
                                    </Button>
                                </Flex>
                            </form>
                        </Card>

                        {/* Contact Info & Map */}
                        <Flex direction="column" gap="6">
                            <Card size="3" asChild style={{ cursor: 'pointer' }}>
                                <a href={`mailto:${siteConfig.links.email}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                                    <Flex gap="4" align="center">
                                        <Box p="3" style={{ background: "var(--indigo-3)", borderRadius: "50%" }}>
                                            <Mail size={24} color="var(--indigo-11)" />
                                        </Box>
                                        <Box>
                                            <Heading size="3">Email Us</Heading>
                                            <Text color="gray">{siteConfig.links.email}</Text>
                                        </Box>
                                    </Flex>
                                </a>
                            </Card>

                            <Card size="3" asChild style={{ cursor: 'pointer' }}>
                                <a
                                    href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent("Halo Admin PUPCL, saya ingin bertanya seputar komunitas PUPCL.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                                >
                                    <Flex gap="4" align="center">
                                        <Box p="3" style={{ background: "var(--green-3)", borderRadius: "50%" }}>
                                            <MessageCircle size={24} color="var(--green-11)" />
                                        </Box>
                                        <Box>
                                            <Flex align="center" gap="2">
                                                <Heading size="3">WhatsApp Admin</Heading>
                                                <Text size="1" color="green" weight="bold">Online</Text>
                                            </Flex>
                                            <Text color="gray">{siteConfig.links.whatsappDisplay}</Text>
                                        </Box>
                                    </Flex>
                                </a>
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
