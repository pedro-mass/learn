import z from "zod";
import {
  getAllParentsForFolder,
  getFiles,
  getFolders,
} from "~/server/db/queries";
import DriveContents from "../../drive-contents";

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
    getFiles(safeParams.folderId),
    getFolders(safeParams.folderId),
    getAllParentsForFolder(safeParams.folderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
