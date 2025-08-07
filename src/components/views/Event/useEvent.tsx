import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentIsOnline, currentIsFeatured, currentCategory } = useChangeUrl();

    const getEvents = async () => {
      let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}&isOnline=${currentIsOnline}&isFeatured=${currentIsFeatured}&isPublish=true`;
      const res = await eventServices.getEvents(params);
      const { data } = res;
      return data;
    };

    const {
      data: dataEvents,
      isLoading: isLoadingEvents,
      isRefetching: isRefetchingEvents,
      refetch: refetchEvents,
    } = useQuery({
      queryKey: ["Events", currentLimit, currentPage, currentCategory, currentIsOnline, currentIsFeatured],
      queryFn: () => getEvents(),
      enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    return {
      dataEvents,
      isLoadingEvents,
      isRefetchingEvents,
      refetchEvents,
    };
};

export default useEvent;