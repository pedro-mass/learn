"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq, inArray } from "drizzle-orm";
import { cookies } from "next/headers";
import { UTApi } from "uploadthing/server";
import { db } from "./db";
import * as QUERIES from "./db/queries";
import { files_table, folders_table } from "./db/schema";

const utApi = new UTApi();

// NOTE: Any actions created here become like public endpoints that can be called by anyone
// so you need to be careful, and you need to validate the user is who they say they are

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }

  // todo: update the schema to store the file key instead of doing this hack with the url
  const utAPIResult = await utApi.deleteFiles([
    file.url.replace("https://82u57ffrls.ufs.sh/f/", ""),
  ]);
  console.log({
    fn: "deleteFile:uploadThing:deleteFiles",
    utAPIResult,
  });

  const dbDeleteResult = await db
    .delete(files_table)
    .where(eq(files_table.id, fileId));

  console.log({
    fn: "deleteFile:db:deleteFile",
    dbDeleteResult,
  });

  // hack to force a refresh
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function deleteFolder(folderId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  // get files and folder within this folder
  const { files, folders } = await QUERIES.getFilesAndFolders(folderId);

  await Promise.all([
    db
      .delete(folders_table)
      .where(
        inArray(folders_table.id, [...folders.map((f) => f.id), folderId]),
      ),
    db.delete(files_table).where(
      inArray(
        files_table.id,
        files.map((f) => f.id),
      ),
    ),
    utApi.deleteFiles(
      files
        .map((f) => f.uploadthingKey)
        .filter((k): k is string => typeof k === "string"),
    ),
  ]);

  // hack to force a refresh
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
