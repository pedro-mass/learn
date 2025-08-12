import z from "zod";
import * as QUERIES from "~/server/db/queries";
import * as MUTATIONS from "~/server/db/mutations";
import DriveContents from "./drive-contents";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CenteredLayout } from "~/components/centered-layout";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { AuthActions } from "~/components/auth-actions";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params; // this informs NextJS that this is a dynamic route, and not a static route

  const parsedParams = z
    .object({
      folderId: z.coerce.number(),
    })
    .safeParse(params);

  if (!parsedParams.success) {
    return <div>Invalid folder ID</div>;
  }

  const safeParams = parsedParams.data;

  const { userId } = await auth();
  if (!userId) {
    return <UnauthorizedFolderView />;
  }

  const isOwner = await QUERIES.isFolderOwner(safeParams.folderId, userId);
  if (!isOwner) {
    return <UnauthorizedFolderView />;
  }

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(safeParams.folderId),
    QUERIES.getFolders(safeParams.folderId),
    QUERIES.getAllParentsForFolder(safeParams.folderId),
  ]);

  async function createFolderAction(formData: FormData) {
    "use server";

    const rawName = formData.get("name");
    if (typeof rawName !== "string") throw new Error("Invalid name");
    const name = rawName.trim();

    const parent = Number(formData.get("parent"));
    if (isNaN(parent)) throw new Error("Invalid parent");

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await MUTATIONS.createFolder({
      folder: { name, parent },
      userId,
    });
    revalidatePath(`/f/${parent}`);
  }

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={safeParams.folderId}
      createFolderAction={createFolderAction}
    />
  );
}

function UnauthorizedFolderView() {
  return (
    <CenteredLayout>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
        <div className="flex items-center justify-center gap-2">
          <AuthActions />
          <Button variant="secondary" asChild>
            <Link href="/drive">Go to your Drive</Link>
          </Button>
        </div>
      </div>
    </CenteredLayout>
  );
}
