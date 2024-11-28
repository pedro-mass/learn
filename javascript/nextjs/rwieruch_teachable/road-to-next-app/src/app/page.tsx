import Link from "next/link";
import { ticketsPath } from "@/paths";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Home</h2>
        <p className="text-sm text-muted-foreground">
          Your home place to start
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="text-sm underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}

// doing it this way, allows you to have a named component
// does it matter though? You'll only see one Page component per page, right?

// const HomePage = () => {
//   return <h2 className="text-lg">Home Page</h2>;
// };

// export default HomePage;

/**
 * this gives both: a named component and a default export
 * But does it matter?
 */
// export default function HomePage() {
//   return <h2 className="text-lg">Home Page</h2>;
// }
