import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTIcketTab = () => {
  const { query, isReady } = useRouter();

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(`${query.id}`);
    return data.data;
  };

  const {
    data: dataTicket,
    refetch: refetchTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Ticket"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
  };
};

export default useTIcketTab;
