import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constans/list.constant";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanner, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["Banners"],
    queryFn: () => getBanners(),
    enabled: true,
  });

  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;

  const { data: dataFeturedEvent, isLoading: isLoadingFeturedEvent } = useQuery(
    {
      queryKey: ["FeaturedEvents"],
      queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
      enabled: true,
    },
  );

  const { data: dataLatestEvent, isLoading: isLoadingLatestEvent } = useQuery({
    queryKey: ["LatestEvents"],
    queryFn: () => getEvents(`${currentEventQuery}`),
    enabled: true,
  });


    const getCategories = async () => {
      let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;

      const res = await categoryServices.getCategories(params);
      const { data } = res;
      return data;
    };

    const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
      queryKey: ["Categories"],
      queryFn: () => getCategories(),
      enabled: true,
    });

  return {
    dataBanner,
    isLoadingBanner,
    dataFeturedEvent,
    isLoadingFeturedEvent,
    dataLatestEvent,
    isLoadingLatestEvent,
    dataCategories,
    isLoadingCategories
  };
};

export default useHome;
