import { Folder as FolderIcon } from "lucide-react";
import Link from "next/link";
import { deleteFolder } from "~/server/actions";
import type { folders_table } from "~/server/db/schema";
import { DeleteSubmitButton } from "./delete-submit-button";
import { FormPending } from "./form-pending";

export function FolderRow({
  folder,
}: {
  folder: typeof folders_table.$inferSelect;
}) {
  const deleteFolderWithId = async (_formData: FormData) => {
    "use server";
    await deleteFolder(folder.id);
  };

  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <form action={deleteFolderWithId}>
        <FormPending>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-6 flex items-center">
              <Link
                href={`/f/${folder.id}`}
                className="flex items-center text-gray-100 hover:text-blue-400"
              >
                <FolderIcon className="mr-3" size={20} />
                {folder.name}
              </Link>
            </div>
            <div className="col-span-2 text-gray-400"></div>
            <div className="col-span-3 text-gray-400"></div>
            <div className="col-span-1 text-gray-400">
              <DeleteSubmitButton aria-label="Delete folder" />
            </div>
          </div>
        </FormPending>
      </form>
    </li>
  );
}
