import CardEvent from "@/components/ui/CardEvent";
import useEvent from "./useEvent";
import { IEvent } from "@/types/Event";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import EventFooter from "./EventFooter";

const Event = () => {
  const router = useRouter();

  const { dataEvents, isLoadingEvents, isRefetchingEvents, refetchEvents } = useEvent();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (router.isReady) {
      setUrl();
    }
  }, [router.isReady]);

  return (
    <div className="flex flex-col justify-center w-full gap-6 px-4 lg:flex-row lg:px-0">
      <div className="w-full lg:w-80">Filter</div>
      <div className="min-h-[70vh] w-fit flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingEvents && !isRefetchingEvents
            ? dataEvents?.data?.map((event: IEvent) => (
                <CardEvent event={event} key={`card-event-${event._id}`} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <CardEvent
                  key={`card-event-loading-${index}`}
                  isLoading={true}
                  className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                />
              ))}
        </div>
        {!isLoadingEvents && dataEvents?.data.length > 0  && (
            <EventFooter totalPages={dataEvents?.pagination?.totalPages}/>
        )}
      </div>
    </div>
  );
};

export default Event;
