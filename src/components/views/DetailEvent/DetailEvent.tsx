import { BreadcrumbItem, Breadcrumbs, Skeleton, Tab, Tabs } from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/TIcket";
import DetailEventTicket from "./DetailEventTicket";

const DetailEvent = () => {
  const { dataEvent, isLoadingEvent, dataTicket, isLoadingTicket } =
    useDetailEvent();

  return (
    <div className="px-8 md:px-0">
      <Skeleton isLoaded={!!dataEvent?.name} className="h-6 w-1/4 rounded-lg">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataEvent?.name}
            className="h-10 rounded-lg mb-2"
          >
            <h1 className="text-2xl font-semibold text-danger ">
              {dataEvent?.name}
            </h1>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.startDate || !!dataEvent?.endDate}
            className="h-6 rounded-lg w-1/2 mb-2"
          >
            <div className="flex items-center gap-2 text-foreground-500 ">
              <FaClock width={16} />
              <p>
                {convertTime(dataEvent?.startDate)} -{" "}
                {convertTime(dataEvent?.endDate)}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.isOnline || !!dataEvent?.location}
            className="h-6 rounded-lg w-1/2 mb-2"
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaLocationDot width={16} />
              <p>
                {dataEvent?.isOnline ? "Online" : "Offline"}{" "}
                {dataEvent?.isOnline
                  ? ""
                  : ` - ${dataEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-4 w-full aspect-video"
            isLoaded={!!dataEvent?.banner}
          >
            <Image
              src={dataEvent?.banner && `${dataEvent?.banner}`}
              alt="cover"
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>

          <Tabs aria-label="Tab detail event" fullWidth>
            <Tab key="description" title="Description">
              <h2 className="text-xl font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton isLoaded={!!dataEvent?.description} className="h-32 w-full rounded-lg mt-2">
                <p className="text-foreground-500">{dataEvent?.description}</p>
              </Skeleton>
            </Tab>
            <Tab key="ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-4 flex flex-col gap-8">
                {dataTicket?.map((ticket: ITicket) => <DetailEventTicket key={`${ticket._id}`} ticket={ticket}/>)}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6"></div>
      </section>
    </div>
  );
};

export default DetailEvent;
