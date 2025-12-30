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
import { Plus, Trash, LayoutDashboard, Image as ImageIcon } from "lucide-react";
import {
  addMember,
  deleteMember,
  getMembers,
  Member,
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
  GalleryItem,
  addProgram,
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

  const refreshData = async () => {
    const mData = await getMembers();
    setMembers(mData);
    const gData = await getGalleryItems();
    setGalleryItems(gData);
    const pData = await getPrograms();
    setPrograms(pData);
  };

  useEffect(() => {
    refreshData();
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
                {/* Form Tambah Anggota */}
                <Card>
                  <Heading size="4" mb="4">
                    Add New Member
                  </Heading>
                  <form
                    action={async (formData) => {
                      await addMember(formData);
                      await refreshData();
                      alert("Member added!");
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
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Photo URL
                        </Text>
                        <TextField.Root
                          name="image"
                          placeholder="https://..."
                        />
                        <Text size="1" color="gray">
                          Leave empty for default avatar
                        </Text>
                      </Box>

                      <Box>
                        <Text size="2" weight="bold" mb="1" as="div">
                          Theme Color
                        </Text>
                        <Select.Root name="color" defaultValue="indigo">
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

                      <Button
                        type="submit"
                        size="3"
                        variant="solid"
                        style={{ cursor: "pointer" }}
                      >
                        <Plus size={16} /> Add Member
                      </Button>
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
                            <IconButton
                              color="red"
                              variant="soft"
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
                {/* Form Tambah Galeri */}
                <Card>
                  <Heading size="4" mb="4">
                    Add Gallery Item
                  </Heading>
                  <form
                    action={async (formData) => {
                      await addGalleryItem(formData);
                      await refreshData();
                      alert("Photo added!");
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
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Date
                        </Text>
                        <TextField.Root
                          name="date"
                          placeholder="e.g. Feb 2024"
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Image URL
                        </Text>
                        <TextField.Root
                          name="src"
                          placeholder="https://..."
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold" mb="1" as="div">
                          Category
                        </Text>
                        <Select.Root name="category" defaultValue="kegiatan">
                          <Select.Trigger />
                          <Select.Content>
                            <Select.Item value="kegiatan">Kegiatan</Select.Item>
                            <Select.Item value="proyek">Proyek</Select.Item>
                            <Select.Item value="prestasi">Prestasi</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Box>

                      <Button
                        type="submit"
                        size="3"
                        variant="solid"
                        color="plum"
                        style={{ cursor: "pointer" }}
                      >
                        <ImageIcon size={16} /> Add Photo
                      </Button>
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
                              <img
                                src={item.src}
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
                            <IconButton
                              color="red"
                              variant="soft"
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
                {/* Form Tambah Program */}
                <Card>
                  <Heading size="4" mb="4">
                    Add New Program
                  </Heading>
                  <form
                    action={async (formData) => {
                      await addProgram(formData);
                      await refreshData();
                      alert("Program added!");
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
                          required
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold" mb="1" as="div">
                          Category
                        </Text>
                        <Select.Root name="category" defaultValue="Workshop">
                          <Select.Trigger />
                          <Select.Content>
                            <Select.Item value="Webinar">Webinar</Select.Item>
                            <Select.Item value="Workshop">Workshop</Select.Item>
                            <Select.Item value="Meetup">Meetup</Select.Item>
                            <Select.Item value="Hackathon">
                              Hackathon
                            </Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Description
                        </Text>
                        <TextField.Root
                          name="description"
                          placeholder="Program description..."
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Date
                        </Text>
                        <TextField.Root
                          name="date"
                          placeholder="e.g. 2024-02-15"
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Time
                        </Text>
                        <TextField.Root name="time" placeholder="e.g. 14:00" />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Location
                        </Text>
                        <TextField.Root
                          name="location"
                          placeholder="e.g. Lab Komputer Lantai 3"
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Speaker
                        </Text>
                        <TextField.Root
                          name="speaker"
                          placeholder="e.g. Rizal Basri"
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold">
                          Image URL
                        </Text>
                        <TextField.Root
                          name="image_url"
                          placeholder="https://..."
                        />
                      </Box>

                      <Box>
                        <Text size="2" weight="bold" mb="1" as="div">
                          Status
                        </Text>
                        <Select.Root name="status" defaultValue="Upcoming">
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

                      <Button
                        type="submit"
                        size="3"
                        variant="solid"
                        style={{ cursor: "pointer" }}
                      >
                        <Plus size={16} /> Add Program
                      </Button>
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
                            <IconButton
                              variant="ghost"
                              color="red"
                              onClick={async () => {
                                if (confirm("Delete this program?")) {
                                  await deleteProgram(program.id);
                                  await refreshData();
                                }
                              }}
                            >
                              <Trash size={16} />
                            </IconButton>
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
