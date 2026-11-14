"use client";

import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  TextField,
  TextArea,
  Badge,
} from "@radix-ui/themes";
import { Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { siteConfig } from "@/lib/data/site-config";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Pertanyaan Umum");
  const { t, language } = useLanguage();

  const topics = language === "en"
    ? ["General Inquiry", "Membership / Recruitment", "Partnership / Event"]
    : ["Pertanyaan Umum", "Keanggotaan / Recruitment", "Kemitraan / Kerjasama"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !message) {
      toast.error(
        language === "en"
          ? "Please fill in your name and message."
          : "Mohon lengkapi nama dan pesan Anda."
      );
      setIsSubmitting(false);
      return;
    }

    const lines = [
      `*Pesan Baru dari Website PUPCL*`,
      `*Nama:* ${name}`,
      email ? `*Email:* ${email}` : null,
      `*Topik:* ${selectedTopic}`,
      `*Pesan:*\n${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(lines)}`;

    toast.success(
      language === "en"
        ? "Opening WhatsApp chat..."
        : "Membuka obrolan WhatsApp..."
    );
    window.open(waUrl, "_blank");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Box className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* =========================================================================
          HEADER SECTION (Clean, Minimalist, Matching Home)
          ========================================================================= */}
      <Box className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,71,186,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(96,165,250,0.06),rgba(10,10,10,0))]" />

        <Container size="3" className="relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <Badge size="2" color="indigo" radius="full" className="px-3.5 py-1 font-bold">
              {t.nav.contact}
            </Badge>
            <Heading
              size={{ initial: "7", sm: "8", md: "9" }}
              weight="bold"
              className="text-neutral-900 dark:text-white tracking-tight"
            >
              {t.contact.headerTitle}
            </Heading>
            <Text
              size={{ initial: "3", sm: "4" }}
              color="gray"
              className="max-w-xl font-normal leading-relaxed"
            >
              {t.contact.headerSubtitle}
            </Text>
          </motion.div>
        </Container>
      </Box>

      {/* =========================================================================
          CONTENT SECTION
          ========================================================================= */}
      <Container size="4" py="8" px="4">
        <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "6", md: "8" }} align="start">
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-xs">
              <Heading size="5" weight="bold" mb="1" className="text-neutral-900 dark:text-white">
                {language === "en" ? "Send Us a Direct Message" : "Kirim Pesan Langsung"}
              </Heading>
              <Text size="2" color="gray" mb="5" as="p">
                {language === "en"
                  ? "Fill in the details below and we will connect you directly to our WhatsApp admin."
                  : "Isi formulir di bawah ini dan pesan akan langsung terhubung ke WhatsApp admin kami."}
              </Text>

              <form onSubmit={handleSubmit} id="contact-form" className="space-y-4">
                {/* Topic Selector Pills */}
                <div>
                  <Text as="label" size="2" weight="bold" mb="2" className="block text-neutral-800 dark:text-neutral-200">
                    {language === "en" ? "Topic / Purpose" : "Topik / Keperluan"}
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => {
                      const isSelected = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#0047BA] text-white shadow-xs"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Text as="label" size="2" weight="bold" mb="1" className="block text-neutral-800 dark:text-neutral-200">
                      {t.contact.nameLabel} <span className="text-red-500">*</span>
                    </Text>
                    <TextField.Root
                      placeholder={language === "en" ? "Your full name" : "Nama lengkap Anda"}
                      name="name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Text as="label" size="2" weight="bold" mb="1" className="block text-neutral-800 dark:text-neutral-200">
                      {t.contact.emailLabel}
                    </Text>
                    <TextField.Root
                      placeholder="hello@example.com"
                      name="email"
                      type="email"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <Text as="label" size="2" weight="bold" mb="1" className="block text-neutral-800 dark:text-neutral-200">
                    {t.contact.messageLabel} <span className="text-red-500">*</span>
                  </Text>
                  <TextArea
                    placeholder={
                      language === "en"
                        ? "Tell us what you want to ask or discuss..."
                        : "Tuliskan apa yang ingin Anda tanyakan atau diskusikan..."
                    }
                    name="message"
                    required
                    style={{ height: 130 }}
                    className="rounded-xl"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold bg-[#0047BA] hover:bg-[#003894] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60"
                >
                  <MessageCircle size={18} />
                  <span>
                    {isSubmitting
                      ? language === "en"
                        ? "Opening WhatsApp..."
                        : "Membuka WhatsApp..."
                      : language === "en"
                      ? "Send via WhatsApp"
                      : "Kirim via WhatsApp"}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* WhatsApp Admin Card */}
            <a
              href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                "Halo Admin PUPCL, saya ingin bertanya seputar kegiatan dan pendaftaran komunitas PUPCL."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                        WhatsApp Admin PUPCL
                      </h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {siteConfig.links.whatsappDisplay}
                    </p>
                  </div>
                </div>
                <Send size={16} className="text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="block group"
            >
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-[#0047BA] dark:hover:border-[#60a5fa] transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center text-[#0047BA] dark:text-[#60a5fa]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white group-hover:text-[#0047BA] dark:group-hover:text-[#60a5fa] transition-colors">
                      Email Komunitas
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {siteConfig.links.email}
                    </p>
                  </div>
                </div>
                <Send size={16} className="text-neutral-400 group-hover:text-[#0047BA] group-hover:translate-x-1 transition-all" />
              </div>
            </a>

            {/* Campus Location & Map Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-center justify-center text-[#E31B23] dark:text-[#ff5c5c] shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    Sekretariat Kampus
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    President University Pekanbaru<br />
                    Jl. Jend. Ahmad Yani No.42a, Padang Bulan, Kec. Senapelan, Kota Pekanbaru, Riau 28155
                  </p>
                </div>
              </div>

              {/* Google Maps Clean Embed */}
              <div className="w-full h-44 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.626639659039!2d101.44040937583792!3d0.5516743639611314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ab00676b0cb5%3A0xe5a3c983a54d6f8a!2sJl.%20Jend.%20Ahmad%20Yani%20No.42a%2C%20Padang%20Bulan%2C%20Kec.%20Senapelan%2C%20Kota%20Pekanbaru%2C%20Riau%2028155!5e0!3m2!1sen!2sid!4v1703670000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </Grid>
      </Container>
    </Box>
  );
}
