import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFIlter from "./useEventFilter";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";

const EventFilter = () => {
  const {
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();
  const {
    control,
    reset,
    watch,
    getValues,
    setValue,
    dataCategory,
    isSuccessGetCategory,
  } = useEventFIlter();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [isSuccessGetCategory]);

  return (
    <div className="lg:sticky top-20 h-fit w-full rounded-xl border p-4 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  variant="bordered"
                  labelPlacement="outside"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                  placeholder="Search category here..."
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="isOnline"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Select online / offline"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeIsOnline(e.target.value)}
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Featured"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Select featured event"
                  defaultSelectedKeys={[`${currentIsFeatured}`]}
                  onChange={(e) => handleChangeIsFeatured(e.target.value)}
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="w-full h-14 rounded-lg"></Skeleton>
            <Skeleton className="w-full h-14 rounded-lg"></Skeleton>
            <Skeleton className="w-full h-14 rounded-lg"></Skeleton>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
