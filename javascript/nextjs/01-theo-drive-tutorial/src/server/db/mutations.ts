import { db } from "~/server/db";
import {
  files_table,
  folders_table,
  type DB_FileType,
  type DB_FolderType,
} from "~/server/db/schema";

export async function createFile(input: {
  file: Pick<
    DB_FileType,
    "name" | "size" | "url" | "parent" | "uploadthingKey"
  >;
  userId: string;
}) {
  if (!input.userId) {
    throw new Error("User ID is required");
  }

  return await db
    .insert(files_table)
    .values({ ...input.file, ownerId: input.userId });
}

export async function createFolder(input: {
  folder: Pick<DB_FolderType, "name" | "parent">;
  userId: string;
}) {
  if (!input.userId) {
    throw new Error("User ID is required");
  }

  return await db
    .insert(folders_table)
    .values({ ...input.folder, ownerId: input.userId });
}

export async function onboardUser(userId: string) {
  // todo: do this in a transaction
  // verify that the user doesn't already have a root folder
  // if they do, we can return it's id

  const rootFolder = await db
    .insert(folders_table)
    .values({
      name: "My Drive",
      parent: null,
      ownerId: userId,
    })
    .$returningId();

  const rootFolderId = rootFolder[0]!.id;

  await db.insert(folders_table).values(
    ["Trash", "Shared", "Starred"].map((name) => ({
      name,
      parent: rootFolderId,
      ownerId: userId,
    })),
  );

  return rootFolderId;
}
