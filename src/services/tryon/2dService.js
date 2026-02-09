import axiosClient from "../axiosClient";

const tryOn2DService = {
  getShoes: (pageNumber = 1, pageSize = 100) => {
    return axiosClient.get(
      `/api/v1/shoes?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    );
  },
  getShoeDetail: (id) => {
    return axiosClient.get(`/api/v1/shoes/${id}`);
  },
  generateTryOn: (shoeId, shoeImageId, userImage, name, description) => {
    const formData = new FormData();
    formData.append("ShoeId", shoeId);
    formData.append("ShoeImageId", shoeImageId);
    formData.append("UserImage", userImage);
    formData.append("Name", name);
    formData.append("Description", description);

    return axiosClient.post("/api/v1/ai", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default tryOn2DService;
