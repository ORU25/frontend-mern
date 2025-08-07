import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import {  useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please input your old password"),
  password: yup.string().required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Please input your password confirmation"),
});

const useSecurityTab = () => {
  const {setToaster} = useContext(ToasterContext)
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({ resolver: yupResolver(schemaUpdatePassword) });

  const updatePassword = async (payload: IUpdatePassword) => {
    const {data} = await authServices.updatePassword(payload);

    return data
  }

  const {mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword} = useMutation({
    mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
    onError: (error : any) => {
      setToaster({
        type: "error",
        message: error.response.data.meta.message
      })
    },
    onSuccess: () => {
      resetUpdatePassword()
      setValueUpdatePassword("oldPassword", "")
      setValueUpdatePassword("password", "")
      setValueUpdatePassword("confirmPassword", "")
      setToaster({
        type: "success",
        message: "Success update password"
      })
    }
  })

  const handleUpdatePassword = (payload: IUpdatePassword) => mutateUpdatePassword(payload)

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleUpdatePassword,
    isPendingUpdatePassword
  };
};

export default useSecurityTab;
