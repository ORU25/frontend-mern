import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileUrRL } from "@/types/File";

const formDataHeader = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const uploadServices = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/upload-single`, payload, formDataHeader),

  deleteFile: (payload: IFileUrRL) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;