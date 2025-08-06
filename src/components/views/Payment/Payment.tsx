import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();

  const { status, order_id } = router.query;

  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/ilustrations/success.svg"
              : "/images/ilustrations/pending.svg"
          }
          alt=""
          className=""
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center ">
        <h1 className="text-3xl font-bold text-danger-500 capitalize">
          Transaction {status}
        </h1>

        <Button
          className="mt-4 w-fit"
          color="danger"
          variant="bordered"
          onPress={() => router.push(`/member/transaction/${order_id}`)}
        >
          Check your transaction here
        </Button>
      </div>
    </div>
  );
};

export default Payment;
