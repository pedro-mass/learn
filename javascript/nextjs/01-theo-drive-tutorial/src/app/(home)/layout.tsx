import { CenteredLayout } from "~/components/centered-layout";

export default function HomeLayout(props: { children: React.ReactNode }) {
  return <CenteredLayout {...props} />;
}
