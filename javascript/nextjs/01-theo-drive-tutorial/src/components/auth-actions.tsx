import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export function AuthActions() {
  return (
    <div className="flex items-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
