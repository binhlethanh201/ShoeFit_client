import axiosClient from "./axiosClient";

const checkOutService = {
  getServices: () => {
    return axiosClient.get(`/api/v1/services`);
  },

  createPayment: (serviceType) => {
    return axiosClient.post(`/api/v1/services/payment`, { serviceType });
  },

  checkPaymentStatus: (orderCode) => {
    return axiosClient.get(`/api/v1/services/payment/${orderCode}`);
  },
};

export default checkOutService;