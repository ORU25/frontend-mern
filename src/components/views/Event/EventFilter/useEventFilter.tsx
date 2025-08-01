import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useEventFIlter = () => {
  const schema = yup.object().shape({
    category: yup.string(),
    isOnline: yup.string(),
    isFeatured: yup.string(),
  });

  const router = useRouter();

  const { control, reset, watch, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return {
    dataCategory,
    control,
    reset,
    watch,
    getValues,
    setValue,
    isSuccessGetCategory,
  };
};

export default useEventFIlter;
