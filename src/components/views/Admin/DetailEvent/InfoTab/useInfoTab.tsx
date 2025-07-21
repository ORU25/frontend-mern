import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useInfoTab = () => {
  const router = useRouter();

  const schemaUpdateInfo = yup.object().shape({
    name: yup.string().required("Please input name"),
    slug: yup.string().required("Please input slug"),
    category: yup.string().required("Please select category"),
    startDate: yup.mixed<DateValue | any>().required("Please input start date"),
    endDate: yup.mixed<DateValue | any>().required("Please input end date"),
    description: yup.string().required("Please input description"),
    isPublish: yup.string().required("Please select publish status"),
    isFeatured: yup.string().required("Please select featured status"),
  });

  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({ resolver: yupResolver(schemaUpdateInfo) });

  const { data: dataCategory, isPending: isPendingCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return {
    isPendingCategory,
    dataCategory,
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
