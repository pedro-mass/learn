import { Separator } from "./ui/separator";

export function Heading(props: { title: string; description?: string }) {
  return (
    <>
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{props.title}</h2>
        {props.description && (
          <p className="text-sm text-muted-foreground">{props.description}</p>
        )}
      </div>

      <Separator />
    </>
  );
}
