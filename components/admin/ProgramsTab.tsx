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
  Table,
  IconButton,
} from "@radix-ui/themes";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Program,
  addProgram,
  updateProgram,
  deleteProgram,
} from "@/app/actions";

interface ProgramsTabProps {
  programs: Program[];
  onRefresh: () => Promise<void>;
  startTransition: (callback: () => void) => void;
}

export function ProgramsTab({
  programs,
  onRefresh,
  startTransition,
}: ProgramsTabProps) {
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programStatus, setProgramStatus] = useState<string>("Upcoming");

  return (
    <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="6">
      {/* Form Tambah/Update Program */}
      <Card>
        <Heading size="4" mb="4">
          {editingProgram ? "Edit Program" : "Add New Program"}
        </Heading>
        <form
          key={editingProgram?.id ?? "program-new"}
          action={async (formData) => {
            startTransition(async () => {
              try {
                if (editingProgram) {
                  formData.append("id", editingProgram.id);
                  await updateProgram(formData);
                  setEditingProgram(null);
                  setProgramStatus("Upcoming");
                  toast.success("Program berhasil diperbarui!");
                } else {
                  await addProgram(formData);
                  setProgramStatus("Upcoming");
                  toast.success("Program berhasil ditambahkan!");
                }
                await onRefresh();
              } catch (e) {
                toast.error("Gagal menyimpan program.");
              }
            });
          }}
        >
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="bold">
                Title
              </Text>
              <TextField.Root
                name="title"
                placeholder="e.g. Workshop React JS"
                defaultValue={editingProgram?.title || ""}
                required
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Category
              </Text>
              <TextField.Root
                name="category"
                placeholder="e.g. Workshop / Seminar / Bootcamp"
                defaultValue={editingProgram?.category || ""}
                required
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Description
              </Text>
              <TextField.Root
                name="description"
                placeholder="Program description..."
                defaultValue={editingProgram?.description || ""}
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Date
              </Text>
              <TextField.Root
                name="date"
                type="date"
                defaultValue={editingProgram?.date || ""}
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Time
              </Text>
              <TextField.Root
                name="time"
                type="time"
                defaultValue={editingProgram?.time || ""}
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Location
              </Text>
              <TextField.Root
                name="location"
                placeholder="e.g. Lab Komputer Lantai 3"
                defaultValue={editingProgram?.location || ""}
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Speaker
              </Text>
              <TextField.Root
                name="speaker"
                placeholder="e.g. Rizal Basri"
                defaultValue={editingProgram?.speaker || ""}
              />
            </Box>

            <Box>
              <Text size="2" weight="bold">
                Image
              </Text>
              <input
                name="image_url"
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
                  display: "block",
                }}
              />
              <Text size="1" color="gray">
                {editingProgram
                  ? "Upload new image (optional)"
                  : "Upload JPG, PNG, HEIC, WebP (optional)"}
              </Text>
            </Box>

            <Box>
              <Text size="2" weight="bold" mb="1" as="div">
                Status
              </Text>
              <Select.Root
                key={editingProgram?.id ?? "program-status"}
                name="status"
                value={programStatus}
                onValueChange={(val) => setProgramStatus(val)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="Upcoming">Upcoming</Select.Item>
                  <Select.Item value="Registration Open">
                    Registration Open
                  </Select.Item>
                  <Select.Item value="Ongoing">Ongoing</Select.Item>
                  <Select.Item value="Completed">Completed</Select.Item>
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
                {editingProgram ? "Update Program" : "Add Program"}
              </Button>
              {editingProgram && (
                <Button
                  type="button"
                  size="3"
                  variant="soft"
                  color="gray"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditingProgram(null);
                    setProgramStatus("Upcoming");
                  }}
                >
                  Cancel
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </Card>

      {/* List Programs */}
      <Card>
        <Heading size="4" mb="4">
          Current Programs ({programs.length})
        </Heading>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {programs.map((program) => (
              <Table.Row key={program.id}>
                <Table.Cell>
                  <Text size="2">{program.title}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge>{program.category}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text size="1" color="gray">
                    {program.date}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge color="cyan">{program.status}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2" align="center" justify="center">
                    <IconButton
                      variant="solid"
                      color="blue"
                      size="2"
                      onClick={() => {
                        setEditingProgram(program);
                        setProgramStatus(program.status || "Upcoming");
                      }}
                    >
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton
                      variant="solid"
                      color="red"
                      size="2"
                      onClick={async () => {
                        if (confirm("Delete this program?")) {
                          startTransition(async () => {
                            try {
                              await deleteProgram(program.id);
                              await onRefresh();
                              toast.success("Program dihapus");
                            } catch (e) {
                              toast.error("Gagal menghapus program");
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
