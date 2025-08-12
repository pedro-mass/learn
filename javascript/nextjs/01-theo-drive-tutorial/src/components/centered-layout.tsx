import { cn } from "~/lib/utils";

export function CenteredLayout({
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-4 text-white",
        className,
      )}
    >
      <main className="text-center">{props.children}</main>
    </div>
  );
}
