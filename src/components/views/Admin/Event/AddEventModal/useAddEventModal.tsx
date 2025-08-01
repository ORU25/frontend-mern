import { DELAY } from "@/constans/list.constant";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue | any>().required("Please input start date"),
  endDate: yup.mixed<DateValue | any>().required("Please input end date"),
  description: yup.string().required("Please input description"),
  isPublish: yup.string().required("Please select publish status"),
  isFeatured: yup.string().required("Please select featured status"),
  isOnline: yup.string().required("Please select online status"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  banner: yup
    .mixed<FileList | string>()
    .required("Please input banner of category"),
  address: yup.string().required("Please input address"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const router = useRouter();

  const debounce = useDebounce();

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLoactionByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchregion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add category",
      });
      reset();
    },
  });

  const parseBool = (val: any) => val === true || val === "true";

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: parseBool(data.isFeatured),
      isPublish: parseBool(data.isPublish),
      isOnline: parseBool(data.isOnline),
      startDate: data.startDate ? toDateStandard(data.startDate) : "",
      endDate: data.endDate ? toDateStandard(data.endDate) : "",
      location: {
        address: `${data.address}`,
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    setValue,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,

    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchregion,
  };
};

export default useAddEventModal;
