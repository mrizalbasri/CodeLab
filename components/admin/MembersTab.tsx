"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
  Select,
  Badge,
  Avatar,
  Table,
  IconButton,
} from "@radix-ui/themes";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Member, addMember, updateMember, deleteMember } from "@/app/actions";

interface MembersTabProps {
  members: Member[];
  onRefresh: () => Promise<void>;
  startTransition: (callback: () => void) => void;
}

export function MembersTab({ members, onRefresh, startTransition }: MembersTabProps) {
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("indigo");

  return (
    <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="6">
      {/* Form Tambah/Edit Anggota */}
      <Card>
        <Heading size="4" mb="4">
          {editingMember ? "Edit Member" : "Add New Member"}
        </Heading>
        <form
          key={editingMember?.id ?? "member-new"}
          action={async (formData) => {
            startTransition(async () => {
              try {
                if (editingMember) {
                  formData.append("id", editingMember.id);
                  await updateMember(formData);
                  setEditingMember(null);
                  setSelectedColor("indigo");
                  toast.success("Member berhasil diperbarui!");
                } else {
                  await addMember(formData);
                  setSelectedColor("indigo");
                  toast.success("Member berhasil ditambahkan!");
                }
                await onRefresh();
              } catch (e) {
                toast.error("Gagal menyimpan data member.");
              }
            });
          }}
        >
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="bold">
                Full Name
              </Text>
              <TextField.Root
                name="name"
                placeholder="e.g. John Doe"
                defaultValue={editingMember?.name || ""}
                required
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Role / Position
              </Text>
              <TextField.Root
                name="role"
                placeholder="e.g. Event Coordinator"
                defaultValue={editingMember?.role || ""}
                required
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Photo
              </Text>
              <input
                name="image"
                type="file"
                accept="image/*"
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-7)",
                  backgroundColor: "var(--gray-3)",
                  fontSize: "12px",
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              />
              <Text size="1" color="gray">
                {editingMember
                  ? "Upload new JPG, PNG, HEIC, WebP (optional)"
                  : "Upload JPG, PNG, HEIC, WebP"}
              </Text>
            </Box>

            <Box>
              <Text size="2" weight="bold" mb="1" as="div">
                Theme Color
              </Text>
              <Select.Root
                name="color"
                value={selectedColor}
                onValueChange={(val) => setSelectedColor(val)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="indigo">Indigo (Chairperson)</Select.Item>
                  <Select.Item value="pink">Pink (Secretary)</Select.Item>
                  <Select.Item value="teal">Teal (Treasurer)</Select.Item>
                  <Select.Item value="orange">Orange (Events)</Select.Item>
                  <Select.Item value="blue">Blue (Tech)</Select.Item>
                  <Select.Item value="red">Red (General)</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>

            <Flex gap="2">
              <Button
                type="submit"
                size="3"
                variant="solid"
                style={{ cursor: "pointer" }}
              >
                <Plus size={16} />
                {editingMember ? "Update Member" : "Add Member"}
              </Button>
              {editingMember && (
                <Button
                  type="button"
                  size="3"
                  variant="soft"
                  color="gray"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditingMember(null);
                    setSelectedColor("indigo");
                  }}
                >
                  Cancel
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </Card>

      {/* List Anggota */}
      <Card>
        <Heading size="4" mb="4">
          Current Team ({members.length})
        </Heading>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Avatar</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name & Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Color</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {members.map((member) => (
              <Table.Row key={member.id}>
                <Table.Cell>
                  <Avatar
                    src={member.image}
                    fallback={member.name[0]}
                    radius="full"
                    size="2"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Flex direction="column">
                    <Text weight="bold" size="2">
                      {member.name}
                    </Text>
                    <Text size="1" color="gray">
                      {member.role}
                    </Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={member.color}>{member.color}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2" align="center" justify="center">
                    <IconButton
                      color="blue"
                      variant="solid"
                      size="2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEditingMember(member);
                        setSelectedColor(member.color);
                      }}
                    >
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton
                      color="red"
                      variant="solid"
                      size="2"
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        if (confirm("Delete this member?")) {
                          startTransition(async () => {
                            try {
                              await deleteMember(member.id);
                              await onRefresh();
                              toast.success("Member dihapus");
                            } catch (e) {
                              toast.error("Gagal menghapus member");
                            }
                          });
                        }
                      }}
                    >
                      <Trash size={16} />
                    </IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Grid>
  );
}
