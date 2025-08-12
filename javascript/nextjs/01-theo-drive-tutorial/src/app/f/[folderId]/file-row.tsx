import { FileIcon } from "lucide-react";
import { deleteFile } from "~/server/actions";
import type { files_table } from "~/server/db/schema";
import { DeleteSubmitButton } from "./delete-submit-button";
import { FormPending } from "./form-pending";

export function FileRow({ file }: { file: typeof files_table.$inferSelect }) {
  const deleteFileWithId = async (_formData: FormData) => {
    "use server";
    await deleteFile(file.id);
  };

  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <form action={deleteFileWithId}>
        <FormPending>
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-6 flex items-center">
              {/* don't need to use <Link> because these files are external of our app */}
              <a
                href={file.url}
                className="flex items-center text-gray-100 hover:text-blue-400"
                target="_blank"
              >
                <FileIcon className="mr-3" size={20} />
                {file.name}
              </a>
            </div>
            <div className="col-span-2 text-gray-400">{"file"}</div>
            <div className="col-span-3 text-gray-400">{file.size}</div>
            <div className="col-span-1 text-gray-400">
              <DeleteSubmitButton aria-label="Delete file" />
            </div>
          </div>
        </FormPending>
      </form>
    </li>
  );
}
