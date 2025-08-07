import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const AdminDetailTransactionPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      type="admin"
      description="Informaction for this transaction"
    >
        <DetailTransaction/>
    </DashboardLayout>
  );
};

export default AdminDetailTransactionPage;
