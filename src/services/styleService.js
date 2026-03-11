import axiosClient from "./axiosClient";

const shoeService = {
  getShoeById: (id) => {
    return axiosClient.get(`/api/v1/shoes/${id}`);
  },
};

export default shoeService;
