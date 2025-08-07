import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullname", `${dataProfile?.fullname}` || "");
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">User Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this account
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
            <Input
              label="Username"
              variant="flat"
              disabled
              labelPlacement="outside"
              value={dataProfile?.username}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Input
              label="Email"
              variant="flat"
              disabled
              labelPlacement="outside"
              value={dataProfile?.email}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Input
              label="Role"
              variant="flat"
              disabled
              labelPlacement="outside"
              value={dataProfile?.role}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.fullname} className="rounded-lg">
            <Controller
              name="fullname"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Fullname"
                  placeholder="Input your fullname"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.fullname !== undefined}
                  errorMessage={errorsUpdateInfo.fullname?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataProfile?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
