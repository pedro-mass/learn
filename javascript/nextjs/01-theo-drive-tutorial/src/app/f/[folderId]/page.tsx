import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import z from "zod";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0].parent;
  }

  return parents;
}

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

  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, safeParams.folderId));

  const foldersPromise = db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, safeParams.folderId));

  const parentsPromise = getAllParents(safeParams.folderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
