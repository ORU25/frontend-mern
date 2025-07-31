import { Skeleton } from "@heroui/react";
import HomeSlider from "./HomeSLider";
import useHome from "./useHome";
import Image from "next/image";
import HomeEventList from "./HomeEventList";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,
    dataFeturedEvent,
    isLoadingFeturedEvent,
    dataLatestEvent,
    isLoadingLatestEvent,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanner?.data}
        isLoadingBannes={isLoadingBanner}
      />
      <HomeEventList
        title="Featured Events"
        events={dataFeturedEvent?.data}
        isLoading={isLoadingFeturedEvent}
      />
      <Skeleton
        isLoaded={!isLoadingBanner}
        className="mb-16 px-6 lg:px-0 h-[20vw] w-full rounded-2xl"
      >
        <Image
          src={dataBanner && `${dataBanner?.data[0]?.image}`}
          alt="banner"
          width={1920}
          height={800}
          className="h-[20vw] w-full rounded-2xl object-center object-cover"
        />
      </Skeleton>
      <HomeEventList
        title="Latest Events"
        events={dataLatestEvent?.data}
        isLoading={isLoadingLatestEvent}
      />

      <HomeCategoryList categories={dataCategories?.data} isLoading={isLoadingCategories}/>
    </div>
  );
};

export default Home;
