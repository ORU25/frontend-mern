import { Skeleton } from "@heroui/react";
import HomeList from "./HomeList";
import HomeSlider from "./HomeSLider";
import useHome from "./useHome";
import Image from "next/image";

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,
    dataFeturedEvent,
    isLoadingFeturedEvent,
    dataLatestEvent,
    isLoadingLatestEvent,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanner?.data}
        isLoadingBannes={isLoadingBanner}
      />
      <HomeList
        title="Featured Events"
        events={dataFeturedEvent?.data}
        isLoading={isLoadingFeturedEvent}
      />
      <Skeleton
        isLoaded={!isLoadingBanner}
        className="mb-16 h-[20vw] w-full rounded-2xl"
      >
        <Image
          src={dataBanner && `${dataBanner?.data[0]?.image}`}
          alt="banner"
          width={1920}
          height={800}
          className="h-[20vw] w-full rounded-2xl object-center object-cover"
        />
      </Skeleton>
      <HomeList
        title="Latest Events"
        events={dataLatestEvent?.data}
        isLoading={isLoadingLatestEvent}
      />
    </div>
  );
};

export default Home;
