import {
  FileIcon,
  Folder as FolderIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { deleteFile, deleteFolder } from "~/server/actions";
import type { files_table, folders_table } from "~/server/db/schema";

export function FileRow({ file }: { file: typeof files_table.$inferSelect }) {
  const [status, setStatus] = useState<"ready" | "deleting">("ready");

  const isDisabled = status === "deleting";

  return (
    <li
      key={file.id}
      className={cn("hover:bg-gray-750 border-b border-gray-700 px-6 py-4", {
        "opacity-50": isDisabled,
      })}
    >
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
          <Button
            variant="ghost"
            onClick={() => {
              setStatus("deleting");
              deleteFile(file.id)
                .then((success) => console.log({ success }))
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                .catch((error) => console.log({ error }));
            }}
            aria-label="Delete file"
            disabled={isDisabled}
          >
            {isDisabled ? (
              <Loader2Icon size={20} className="animate-spin" />
            ) : (
              <Trash2Icon size={20} />
            )}
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow({
  folder,
}: {
  folder: typeof folders_table.$inferSelect;
}) {
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
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
          <Button
            variant="ghost"
            onClick={() => deleteFolder(folder.id)}
            aria-label="Delete file"
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}
