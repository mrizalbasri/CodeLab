"use client";

import { Box, Button, Container, Flex, Heading, Text, Tabs } from "@radix-ui/themes";
import { LayoutDashboard, LogOut } from "lucide-react";
import {
  getMembers,
  Member,
  getGalleryItems,
  GalleryItem,
  getPrograms,
  Program,
} from "../actions";
import { useEffect, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MembersTab } from "@/components/admin/MembersTab";
import { GalleryTab } from "@/components/admin/GalleryTab";
import { ProgramsTab } from "@/components/admin/ProgramsTab";

export default function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // This hook is used for all child components to show loading states
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const refreshData = async () => {
    try {
      const [membersData, galleryData, programsData] = await Promise.all([
        getMembers(),
        getGalleryItems(),
        getPrograms(),
      ]);
      setMembers(membersData);
      setGalleryItems(galleryData);
      setPrograms(programsData);
    } catch (error) {
      console.error("Failed to refresh data", error);
      toast.error("Gagal memuat data terbaru.");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        await refreshData();
      } finally {
        setInitialLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <Box
      style={{ backgroundColor: "var(--gray-2)", minHeight: "100vh" }}
      pb="9"
    >
      {/* Header */}
      <Box
        py="6"
        style={{
          backgroundColor: "var(--color-panel-solid)",
          borderBottom: "1px solid var(--gray-4)",
        }}
      >
        <Container size="4">
          <Flex align="center" justify="between">
            <Flex align="center" gap="3">
              <LayoutDashboard color="var(--indigo-9)" />
              <Heading size="6">PUPCL Team Manager</Heading>
            </Flex>
            <Button
              color="red"
              variant="soft"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </Flex>
        </Container>
      </Box>

      <Container size="4" py="6">
        {initialLoading ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text color="gray">Memuat data dashboard...</Text>
          </Flex>
        ) : (
          <Tabs.Root defaultValue="team">
            <Tabs.List>
              <Tabs.Trigger value="team">Team Members</Tabs.Trigger>
              <Tabs.Trigger value="gallery">Gallery</Tabs.Trigger>
              <Tabs.Trigger value="programs">Programs</Tabs.Trigger>
            </Tabs.List>

            <Box pt="5">
              <Tabs.Content value="team">
                <MembersTab 
                    members={members} 
                    onRefresh={refreshData} 
                    startTransition={startTransition}
                />
              </Tabs.Content>

              <Tabs.Content value="gallery">
                <GalleryTab 
                    galleryItems={galleryItems}
                    onRefresh={refreshData}
                    startTransition={startTransition}
                />
              </Tabs.Content>

              <Tabs.Content value="programs">
                <ProgramsTab 
                    programs={programs}
                    onRefresh={refreshData}
                    startTransition={startTransition}
                />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        )}
      </Container>
    </Box>
  );
}
