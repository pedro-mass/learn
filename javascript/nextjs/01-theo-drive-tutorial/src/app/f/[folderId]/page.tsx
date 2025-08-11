import z from "zod";
import * as QUERIES from "~/server/db/queries";
import * as MUTATIONS from "~/server/db/mutations";
import DriveContents from "./drive-contents";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(safeParams.folderId),
    QUERIES.getFolders(safeParams.folderId),
    QUERIES.getAllParentsForFolder(safeParams.folderId),
  ]);

  async function createFolderAction(formData: FormData) {
    "use server";

    console.log({ fn: "createFolderAction:start" });
    const rawName = formData.get("name");
    if (typeof rawName !== "string") throw new Error("Invalid name");
    const name = rawName.trim();
    console.log({ fn: "createFolderAction:got name" });

    const parent = Number(formData.get("parent"));
    if (isNaN(parent)) throw new Error("Invalid parent");
    console.log({ fn: "createFolderAction:got parent" });

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    console.log({ fn: "createFolderAction:got user" });

    await MUTATIONS.createFolder({
      folder: { name, parent },
      userId,
    });
    console.log({ fn: "createFolderAction:created folder" });
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
