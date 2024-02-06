// nextjs file
// renders while waiting for the ENTIRE page to load
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
