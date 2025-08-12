// src/app/f/[folderId]/create-folder-row.tsx
"use client";

import { PlusIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function PendingRow({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <div
      className={cn(
        "grid grid-cols-12 items-center gap-4",
        pending && "pointer-events-none opacity-50",
      )}
      aria-busy={pending}
    >
      {children}
    </div>
  );
}

export function CreateFolderRow({
  createFolderAction,
  parentId,
}: {
  createFolderAction: (formData: FormData) => Promise<void>;
  parentId: number;
}) {
  return (
    <li className="border-t border-gray-700 px-6 py-4">
      <form action={createFolderAction}>
        <PendingRow>
          <div className="col-span-6 flex items-center">
            <Input
              name="name"
              placeholder="New folder name"
              className="max-w-xs"
              required
              autoComplete="off"
            />
            <input type="hidden" name="parent" value={parentId} />
          </div>
          <div className="col-span-2 text-gray-400">folder</div>
          <div className="col-span-3 text-gray-400">—</div>
          <div className="col-span-1 text-gray-400">
            <Button type="submit" variant="ghost" aria-label="Create folder">
              <PlusIcon size={20} />
            </Button>
          </div>
        </PendingRow>
      </form>
    </li>
  );
}
