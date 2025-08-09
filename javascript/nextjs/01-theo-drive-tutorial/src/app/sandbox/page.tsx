import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

export default async function Page() {
  const user = await auth();
  if (!user.userId) {
    return (
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    );
  }

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));

  console.log({
    folders,
  });

  return (
    <div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <form
        action={async () => {
          "use server";

          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found");
          }

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: null,
            })
            .$returningId();

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));

          await db.insert(folders_table).values(insertableFolders);
        }}
      >
        <button type="submit">Seed DB</button>
      </form>
    </div>
  );
}
