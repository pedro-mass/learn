import { db } from "~/server/db";
import { files_table, type DB_FileType } from "~/server/db/schema";

export async function createFile(input: {
  file: Pick<DB_FileType, "name" | "size" | "url" | "parent">;
  userId: string;
}) {
  if (!input.userId) {
    throw new Error("User ID is required");
  }

  return await db
    .insert(files_table)
    .values({ ...input.file, ownerId: input.userId });
}

// export function createFolder(folder: DB_FolderType) {
//   return db.insert(folders_table).values(folder);
// }
