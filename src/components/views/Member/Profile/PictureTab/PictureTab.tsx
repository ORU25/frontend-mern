import InputFile from "@/components/ui/InputFIle";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import usePictureTab from "./usePictureTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,

    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/3">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="text-small text-default-400 w-full">
          Manage picture for your profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2 ">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-full rounded-lg mb-2"
            >
              <Avatar
                src={currentPicture}
                alt="Picture"
                showFallback
                className="aspect-square  w-full h-full"
              />
            </Skeleton>
            <Controller
              name="profilePicture"
              control={controlUpdatePicture}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeletePicture(onChange)}
                  onUpload={(files) => handleUploadPicture(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                  isDeleting={isPendingMutateDeleteFile}
                  errorMessage={errorsUpdatePicture.profilePicture?.message}
                  isDropable
                  label={
                    <p className="text-sm font-medium text-default-700 mb-2">
                      Upload New Picture
                    </p>
                  }
                  preview={typeof preview === "string" ? preview : ""}
                />
              )}
            />
          </div>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
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

export default PictureTab;
