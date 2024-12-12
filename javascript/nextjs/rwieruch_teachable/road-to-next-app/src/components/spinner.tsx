import { LucideLoaderCircle } from "lucide-react";

export function Spinner() {
  return (
    <div
      role="status"
      className="flex-1 flex flex-col justify-center items-center"
    >
      <LucideLoaderCircle className="h-16 w-16 animate-spin" />
    </div>
  );
}
