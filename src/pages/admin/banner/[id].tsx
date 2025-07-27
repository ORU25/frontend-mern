import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const AdminDtailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      type="admin"
      description="Manage information of this category"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDtailCategoryPage;
