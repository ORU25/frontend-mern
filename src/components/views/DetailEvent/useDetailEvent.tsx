import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { data } from "framer-motion/client";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent,  isLoading: isLoadingEvent } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady
  });


  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(`${dataEvent?._id}`);
    return data.data;
  };

  const { data: dataTicket,  isLoading: isLoadingTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsByEventId,
    enabled: !!dataEvent?._id
  });

  return {
    dataEvent,
    isLoadingEvent,
    dataTicket,
    isLoadingTicket
  };
};

export default useDetailEvent;
