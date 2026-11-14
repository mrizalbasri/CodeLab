"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { UserRoundPen } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/app/actions";
import { useLanguage } from "@/context/LanguageContext";
import { Profile } from "@/lib/types";

interface ProfileEditFormProps {
  profile: Profile;
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile.avatar_url || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <Card size="2">
      <Flex align="center" gap="2" mb="1">
        <UserRoundPen size={18} />
        <Heading size="4">{t.dashboard.editProfileTitle}</Heading>
      </Flex>
      <Text as="p" size="2" color="gray" mb="4">
        {t.dashboard.editProfileBody}
      </Text>
      <form
        action={(formData) => {
          startTransition(async () => {
            try {
              await updateProfile(formData);
              toast.success(t.dashboard.profileUpdatedToast);
              router.refresh();
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : t.dashboard.profileUpdateErrorToast,
              );
            }
          });
        }}
      >
        <Flex direction="column" gap="4">
          <Flex align="center" gap="4">
            <Image
              src={avatarPreview || "/club-pixel-mascot.svg"}
              alt={profile.full_name}
              width={64}
              height={64}
              unoptimized={avatarPreview?.startsWith("blob:") ?? false}
              className="h-16 w-16 rounded-full border-2 border-[var(--gray-6)] object-cover"
            />
            <Box>
              <Text as="label" size="2" weight="bold">
                {t.dashboard.avatarLabel}
              </Text>
              <input
                ref={fileInputRef}
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-1 block w-full text-sm"
              />
            </Box>
          </Flex>
          <Box>
            <Text as="label" size="2" weight="bold">
              {t.dashboard.fullNameLabel}
            </Text>
            <TextField.Root
              name="fullName"
              defaultValue={profile.full_name}
              required
            />
          </Box>
          <Box>
            <Text as="label" size="2" weight="bold">
              {t.dashboard.skillsLabel}
            </Text>
            <TextField.Root
              name="skills"
              defaultValue={profile.skills?.join(", ")}
              placeholder={t.dashboard.skillsPlaceholder}
            />
          </Box>
          <Button
            type="submit"
            disabled={isPending}
            style={{ cursor: "pointer", backgroundColor: "#0047BA" }}
          >
            {isPending ? t.dashboard.savingProfile : t.dashboard.saveProfile}
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
