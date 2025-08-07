import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const MemberDetailTransactionPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      type="member"
      description="Informaction for this transaction"
    >
        <DetailTransaction/>
    </DashboardLayout>
  );
};

export default MemberDetailTransactionPage;
