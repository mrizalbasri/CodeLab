"use client";

import { Box, Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
    <Box style={{ backgroundColor: "var(--gray-2)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container size="1" px="4">
        <Card size="4">
          <Heading align="center" mb="4">Admin Login</Heading>
          
          {error && (
             <Box mb="4" p="3" style={{ backgroundColor: "var(--red-3)", color: "var(--red-11)", borderRadius: "var(--radius-2)" }}>
                 <Text size="2">{error}</Text>
             </Box>
          )}

          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="3">
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

              <Button type="submit" disabled={loading} style={{ cursor: "pointer" }}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
}
