"use client";

import { Box, Button, Card, Container, Flex, Heading, Text, TextField, Link as RadixLink } from "@radix-ui/themes";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ backgroundColor: "var(--gray-2)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} p="4">
      <Container size="1" style={{ maxWidth: "420px", width: "100%" }}>
        <Box mb="4">
          <RadixLink asChild size="2" color="gray" className="inline-flex items-center gap-1.5 hover:underline">
            <Link href="/">
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
          </RadixLink>
        </Box>

        <Card size={{ initial: "2", sm: "3" }} style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}>
          <Heading align="center" size={{ initial: "5", sm: "6" }} mb="4">Admin Login</Heading>
          
          {error && (
             <Box mb="4" p="3" style={{ backgroundColor: "var(--red-3)", color: "var(--red-11)", borderRadius: "var(--radius-2)" }}>
                 <Text size="2">{error}</Text>
             </Box>
          )}

          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="4">
              <Box>
                <Text as="label" size="2" weight="bold">Email</Text>
                <TextField.Root 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Box>
              
              <Box>
                <Text as="label" size="2" weight="bold">Password</Text>
                <TextField.Root 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </Box>

              <Button type="submit" disabled={loading} size="3" style={{ cursor: "pointer", minHeight: "44px", backgroundColor: "#0047BA" }}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
}
