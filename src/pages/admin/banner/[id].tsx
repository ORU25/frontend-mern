import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/DetailBanner";

const AdminDtailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Banner"
      type="admin"
      description="Manage information of this category"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminDtailCategoryPage;
