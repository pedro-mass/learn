import "server-only";

import { and, eq, isNull } from "drizzle-orm";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
  type DB_FileType,
  type DB_FolderType,
} from "~/server/db/schema";

export async function getAllParentsForFolder(folderId: number) {
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

export function getFolders(folderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, folderId))
    .orderBy(foldersSchema.name);
}

export function getFiles(folderId: number) {
  return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, folderId))
    .orderBy(filesSchema.id);
}

export async function getFolderById(folderId: number) {
  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, folderId));

  return folders[0];
}

export async function getRootFolderForUser(userId: string) {
  const folders = await db
    .select()
    .from(foldersSchema)
    .where(
      and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
    );

  return folders[0];
}

export async function getFilesAndFolders(folderId: number) {
  const ids = {
    files: [] as DB_FileType[],
    folders: [] as DB_FolderType[],
  };
  const [files, folders] = await Promise.all([
    db.select().from(filesSchema).where(eq(filesSchema.parent, folderId)),
    db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId)),
  ]);

  ids.files.push(...files);
  ids.folders.push(...folders);

  // get all the files and folders from within those folders recursively
  const nested = await Promise.all(
    folders.map(async (folder) => getFilesAndFolders(folder.id)),
  );
  ids.files.push(...nested.flatMap((thing) => thing.files));
  ids.folders.push(...nested.flatMap((thing) => thing.folders));

  return ids;
}

export async function isFolderOwner(folderId: number, userId: string) {
  const folder = await getFolderById(folderId);
  return folder?.ownerId === userId;
}
