import DashboardLayout from "@/components/admin/DashboardLayout";
import StatsCards from "@/components/admin/StatsCards";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <StatsCards />
    </DashboardLayout>
  );
}