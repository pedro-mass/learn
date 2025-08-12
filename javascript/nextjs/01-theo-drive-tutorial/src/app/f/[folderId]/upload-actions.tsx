"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function UploadActions({
  currentFolderId,
}: {
  currentFolderId: number;
}) {
  const router = useRouter();
  return (
    <UploadButton
      endpoint="driveUploader"
      onClientUploadComplete={() => router.refresh()}
      input={{ folderId: currentFolderId }}
    />
  );
}
