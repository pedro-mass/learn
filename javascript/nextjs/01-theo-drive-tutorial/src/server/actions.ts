"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

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
