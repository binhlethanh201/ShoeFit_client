import axiosClient from "./axiosClient";

const shoeCollectService = {
  getShoeCollect: (pageNumber = 1, pageSize = 10) => {
    return axiosClient.get(`/api/v1/shoe-collect`, {
      params: { PageNumber: pageNumber, PageSize: pageSize },
    });
  },

  deleteShoeCollect: (id) => {
    return axiosClient.delete(`/api/v1/shoe-collect/${id}`);
  },
};

export default shoeCollectService;
