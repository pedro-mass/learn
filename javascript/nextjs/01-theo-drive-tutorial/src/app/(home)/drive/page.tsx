import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { onboardUser } from "~/server/db/mutations";
import { getRootFolderForUser } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          "use server";

          const session = await auth();
          if (!session.userId) {
            return redirect("/sign-in");
          }

          const rootFolderId = await onboardUser(session.userId);

          return redirect(`/f/${rootFolderId}`);
        }}
      >
        <Button type="submit">Create new Drive</Button>
      </form>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
