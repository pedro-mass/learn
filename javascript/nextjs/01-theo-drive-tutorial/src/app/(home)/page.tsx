import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function HomePage() {
  return (
    <div>
      <div>{"please subscribe you're two hours in you nerd"}</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
