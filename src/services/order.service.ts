import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/TIcket";

const orderServices = {
  createOrder: (payload: ICart) => instance.post(`${endpoint.ORDER}`, payload),
  updateOrderStatus: (id: string, status: string) => instance.put(`${endpoint.ORDER}/${id}/${status}`),
};

export default orderServices;
