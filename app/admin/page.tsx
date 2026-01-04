"use client";

import {
  Box,
  Button,
  Card,
  Container,
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
  Tabs,
} from "@radix-ui/themes";
import Image from "next/image";
import {
  Plus,
  Trash,
  LayoutDashboard,
  Pencil,
  Image as ImageIcon,
} from "lucide-react";
import {
  addMember,
  deleteMember,
  updateMember,
  getMembers,
  Member,
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  GalleryItem,
  addProgram,
  updateProgram,
  deleteProgram,
  getPrograms,
  Program,
} from "../actions";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("indigo");
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(
    null
  );
  const [galleryCategory, setGalleryCategory] =
    useState<GalleryItem["category"]>("kegiatan");
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programStatus, setProgramStatus] = useState<string>("Upcoming");

  const refreshData = async () => {
    const mData = await getMembers();
    setMembers(mData);
    const gData = await getGalleryItems();
    setGalleryItems(gData);
    const pData = await getPrograms();
    setPrograms(pData);
  };

  useEffect(() => {
    const load = async () => {
      await refreshData();
    };
    void load();
  }, []);

  // Simple client-side protection
  const handleLogin = () => {
    if (password === "pupcl2024") {
      setIsAuthenticated(true);
    } else {
      alert("Password salah!");
    }
  };

  if (!isAuthenticated) {
    return (
      <Container
        size="1"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card size="4" style={{ width: "100%" }}>
          <Heading align="center" mb="4">
            Admin Login
          </Heading>
          <Flex direction="column" gap="3">
            <TextField.Root
              placeholder="Enter Password (pupcl2024)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} style={{ cursor: "pointer" }}>
              Login Dashboard
            </Button>
          </Flex>
        </Card>
      </Container>
    );
  }

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
          <Flex align="center" gap="3">
            <LayoutDashboard color="var(--indigo-9)" />
            <Heading size="6">PUPCL Team Manager</Heading>
          </Flex>
        </Container>
      </Box>

      <Container size="4" py="6">
        <Tabs.Root defaultValue="team">
          <Tabs.List>
            <Tabs.Trigger value="team">Team Members</Tabs.Trigger>
            <Tabs.Trigger value="gallery">Gallery</Tabs.Trigger>
            <Tabs.Trigger value="programs">Programs</Tabs.Trigger>
          </Tabs.List>

          <Box pt="5">
            <Tabs.Content value="team">
              <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="6">
                {/* Form Tambah/Edit Anggota */}
                <Card>
                  <Heading size="4" mb="4">
                    {editingMember ? "Edit Member" : "Add New Member"}
                  </Heading>
                  <form
                    key={editingMember?.id ?? "member-new"}
                    action={async (formData) => {
                      if (editingMember) {
                        formData.append("id", editingMember.id);
                        await updateMember(formData);
                        setEditingMember(null);
                        setSelectedColor("indigo");
                        alert("Member updated!");
                      } else {
                        await addMember(formData);
                        setSelectedColor("indigo");
                        alert("Member added!");
                      }
                      await refreshData();
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
                            <Select.Item value="indigo">
                              Indigo (Chairperson)
                            </Select.Item>
                            <Select.Item value="pink">
                              Pink (Secretary)
                            </Select.Item>
                            <Select.Item value="teal">
                              Teal (Treasurer)
                            </Select.Item>
                            <Select.Item value="orange">
                              Orange (Events)
                            </Select.Item>
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
                        <Table.ColumnHeaderCell>
                          Name & Role
                        </Table.ColumnHeaderCell>
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
                                    await deleteMember(member.id);
                                    await refreshData();
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
            </Tabs.Content>

            <Tabs.Content value="gallery">
              <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="6">
                {/* Form Tambah/Update Galeri */}
                <Card>
                  <Heading size="4" mb="4">
                    {editingGallery ? "Edit Gallery Item" : "Add Gallery Item"}
                  </Heading>
                  <form
                    key={editingGallery?.id ?? "gallery-new"}
                    action={async (formData) => {
                      if (editingGallery) {
                        formData.append("id", editingGallery.id);
                        await updateGalleryItem(formData);
                        setEditingGallery(null);
                        setGalleryCategory("kegiatan");
                        alert("Photo updated!");
                      } else {
                        await addGalleryItem(formData);
                        setGalleryCategory("kegiatan");
                        alert("Photo added!");
                      }
                      await refreshData();
                    }}
                  >
                    <Flex direction="column" gap="4">
                      <Box>
                        <Text size="2" weight="bold">
                          Activity Title
                        </Text>
                        <TextField.Root
                          name="title"
                          placeholder="e.g. Workshop React JS"
                          defaultValue={editingGallery?.title || ""}
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Date
                        </Text>
                        <TextField.Root
                          name="date"
                          type="date"
                          defaultValue={editingGallery?.date || ""}
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Image
                        </Text>
                        <input
                          name="src"
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
                          {editingGallery
                            ? "Upload new image (optional)"
                            : "Upload JPG, PNG, HEIC, WebP"}
                        </Text>
                      </Box>

                      <Box>
                        <Text size="2" weight="bold" mb="1" as="div">
                          Category
                        </Text>
                        <Select.Root
                          key={editingGallery?.id ?? "gallery-select"}
                          name="category"
                          value={galleryCategory}
                          onValueChange={(val) =>
                            setGalleryCategory(val as GalleryItem["category"])
                          }
                        >
                          <Select.Trigger />
                          <Select.Content>
                            <Select.Item value="kegiatan">Kegiatan</Select.Item>
                            <Select.Item value="proyek">Proyek</Select.Item>
                            <Select.Item value="prestasi">Prestasi</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Box>

                      <Flex gap="2">
                        <Button
                          type="submit"
                          size="3"
                          variant="solid"
                          color="plum"
                          style={{ cursor: "pointer" }}
                        >
                          <ImageIcon size={16} />
                          {editingGallery ? "Update Photo" : "Add Photo"}
                        </Button>
                        {editingGallery && (
                          <Button
                            type="button"
                            size="3"
                            variant="soft"
                            color="gray"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setEditingGallery(null);
                              setGalleryCategory("kegiatan");
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </Flex>
                    </Flex>
                  </form>
                </Card>

                {/* List Galeri */}
                <Card>
                  <Heading size="4" mb="4">
                    Gallery Items ({galleryItems.length})
                  </Heading>
                  <Table.Root variant="surface">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                          Title & Date
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                          Category
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {galleryItems.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>
                            <Box
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: 8,
                                overflow: "hidden",
                              }}
                            >
                              <Image
                                src={item.src}
                                alt={item.title}
                                width={48}
                                height={48}
                                loader={({ src }) => src}
                                unoptimized
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </Table.Cell>
                          <Table.Cell>
                            <Flex direction="column">
                              <Text weight="bold" size="2">
                                {item.title}
                              </Text>
                              <Text size="1" color="gray">
                                {item.date}
                              </Text>
                            </Flex>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge color="plum" variant="soft">
                              {item.category}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            <Flex gap="2" align="center" justify="center">
                              <IconButton
                                color="blue"
                                variant="solid"
                                size="2"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setEditingGallery(item);
                                  setGalleryCategory(item.category);
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
                                  if (confirm("Delete this photo?")) {
                                    await deleteGalleryItem(item.id);
                                    await refreshData();
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
            </Tabs.Content>

            <Tabs.Content value="programs">
              <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="6">
                {/* Form Tambah/Update Program */}
                <Card>
                  <Heading size="4" mb="4">
                    {editingProgram ? "Edit Program" : "Add New Program"}
                  </Heading>
                  <form
                    key={editingProgram?.id ?? "program-new"}
                    action={async (formData) => {
                      if (editingProgram) {
                        formData.append("id", editingProgram.id);
                        await updateProgram(formData);
                        setEditingProgram(null);
                        setProgramStatus("Upcoming");
                        alert("Program updated!");
                      } else {
                        await addProgram(formData);
                        setProgramStatus("Upcoming");
                        alert("Program added!");
                      }
                      await refreshData();
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
                            <Select.Item value="Completed">
                              Completed
                            </Select.Item>
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
                        <Table.ColumnHeaderCell>
                          Category
                        </Table.ColumnHeaderCell>
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
                                  setProgramStatus(
                                    program.status || "Upcoming"
                                  );
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
                                    await deleteProgram(program.id);
                                    await refreshData();
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
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Container>
    </Box>
  );
}
