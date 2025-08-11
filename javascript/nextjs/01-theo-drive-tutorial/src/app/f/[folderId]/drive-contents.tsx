"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronRight, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition, useOptimistic } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type DB_FileType, type DB_FolderType } from "~/server/db/schema";
import { UploadButton } from "~/utils/uploadthing";
import { FileRow, FolderRow } from "./file-row";
import { useFormStatus } from "react-dom";

export default function DriveContents(props: {
  files: DB_FileType[];
  folders: DB_FolderType[];
  parents: DB_FolderType[];
  currentFolderId: number;
  createFolderAction?: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  const [optimisticFolders, addOptimisticFolder] = useOptimistic<
    DB_FolderType[],
    { name: string; parent: number }
  >(props.folders, (state, update) => {
    const temp: DB_FolderType = {
      id: -Date.now(),
      ownerId: "optimistic",
      name: update.name,
      parent: update.parent,
      createdAt: new Date(),
    };
    return [...state, temp];
  });

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
            {optimisticFolders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}

            <RowActionsHolder
              createFolderAction={props.createFolderAction}
              parentId={props.currentFolderId}
              onOptimisticFolder={addOptimisticFolder}
            />
          </ul>
        </div>
        <div data-testid="page-actions" className="mt-4">
          <UploadButton
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
            input={{
              folderId: props.currentFolderId,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function RowActionsHolder(props: {
  createFolderAction?: (formData: FormData) => Promise<void>;
  parentId: number;
  onOptimisticFolder: (action: { name: string; parent: number }) => void;
}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  if (isOpen) {
    return (
      <FolderForm
        action={props.createFolderAction}
        parentId={props.parentId}
        onOptimisticFolder={props.onOptimisticFolder}
      />
    );
  }

  return <RowActions onClick={() => setIsOpen(true)} />;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </Button>
  );
}

function FolderForm(props: {
  action?: (formData: FormData) => Promise<void>;
  parentId: number;
  onOptimisticFolder: (action: { name: string; parent: number }) => void;
}) {
  // Important: do NOT preventDefault, to the server action runs.
  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const rawName = fd.get("name");
    const name = typeof rawName === "string" ? rawName.trim() : undefined;
    if (name)
      startTransition(() =>
        props.onOptimisticFolder({ name, parent: props.parentId }),
      );
  };

  return (
    <li className="hover:bg-gray-750 px-6 py-4">
      <form action={props.action} onSubmit={handleClientSubmit}>
        <Input placeholder="Folder name" name="name" />
        <input type="hidden" name="parent" value={props.parentId} />
        <SubmitButton />
      </form>
    </li>
  );
}

function RowActions(props: { onClick: () => void }) {
  return (
    <li className="hover:bg-gray-750 px-6 py-4">
      <Button variant="ghost" asChild onClick={props.onClick}>
        <div>
          <PlusIcon />
          <span>Create Folder</span>
        </div>
      </Button>
    </li>
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

function AuthActions() {
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

function Breadcrumbs(props: {
  files: DB_FileType[];
  folders: DB_FolderType[];
  parents: DB_FolderType[];
  currentFolderId: number;
}) {
  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        className="mr-2 text-gray-300 hover:text-white"
        asChild
      >
        <Link href="/f/1">My Drive</Link>
      </Button>
      {props.parents.map((folder) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className="mx-2 text-gray-500" size={16} />
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white"
            asChild
          >
            <Link href={`/f/${folder.id}`}>{folder.name}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
