import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";

const AdminDtailEventPage = () => {
  return (
    <DashboardLayout
      title="Detail Event"
      type="admin"
      description="Manage information of this event"
    >
      <DetailEvent/>
    </DashboardLayout>
  );
};

export default AdminDtailEventPage;
