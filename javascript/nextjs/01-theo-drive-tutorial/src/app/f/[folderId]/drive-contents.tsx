import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AuthActions } from "~/components/auth-actions";
import { type DB_FileType, type DB_FolderType } from "~/server/db/schema";
import { CreateFolderRow } from "./create-folder-row"; // client island
import { FileRow, FolderRow } from "./file-row";
import { UploadActions } from "./upload-actions"; // client island

export default function DriveContents(props: {
  files: DB_FileType[];
  folders: DB_FolderType[];
  parents: DB_FolderType[];
  currentFolderId: number;
  createFolderAction?: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div
          data-testid="top-bar"
          className="mb-6 flex items-center justify-between"
        >
          <Breadcrumbs {...props} />
          <AuthActions />
        </div>

        <div data-testid="table" className="rounded-lg bg-gray-800 shadow-xl">
          <TableHeader />
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
            {props.createFolderAction && (
              <CreateFolderRow
                createFolderAction={props.createFolderAction}
                parentId={props.currentFolderId}
              />
            )}
          </ul>
        </div>

        <div data-testid="page-actions" className="mt-4">
          <UploadActions currentFolderId={props.currentFolderId} />
        </div>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="border-b border-gray-700 px-6 py-4">
      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-3">Size</div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

function Breadcrumbs(props: {
  parents: DB_FolderType[];
  currentFolderId: number;
}) {
  // const all = [
  //   ...props.parents,
  //   {
  //     id: props.currentFolderId,
  //     name: "Current",
  //     parent: 0,
  //     ownerId: "",
  //     createdAt: new Date(),
  //   } as DB_FolderType,
  // ];
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-300">
      {props.parents.map((f, i) => (
        <span key={f.id} className="flex items-center gap-2">
          <Link href={`/f/${f.id}`} className="hover:text-blue-400">
            {f.name}
          </Link>
          {i < props.parents.length - 1 && (
            <ChevronRight size={16} className="text-gray-500" />
          )}
        </span>
      ))}
    </nav>
  );
}
