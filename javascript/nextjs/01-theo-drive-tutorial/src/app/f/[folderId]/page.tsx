import z from "zod";
import * as QUERIES from "~/server/db/queries";
import DriveContents from "./drive-contents";

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

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={safeParams.folderId}
    />
  );
}
