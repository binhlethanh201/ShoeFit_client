import { productsData } from "../../data/mockData";
const initialWishlistIds = [
  "adidasgazelle",
  "birkenstock",
  "nikeairjordan1lowog",
];

let currentWishlist = productsData
  .filter((product) => initialWishlistIds.includes(product.id))
  .map((product) => ({
    ...product,
    name: product.title,
    color: "Trắng/Đen",
    size: "42",
  }));

const wishlistService = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...currentWishlist]);
      }, 300);
    });
  },
  removeItem: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentWishlist = currentWishlist.filter((item) => item.id !== id);
        resolve({ success: true, message: "Deleted successfully" });
      }, 300);
    });
  },

  addToWishlist: (product) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exists = currentWishlist.find((item) => item.id === product.id);
        if (!exists) {
          currentWishlist.push({
            ...product,
            name: product.title,
            color: "Mặc định",
            size: "42",
          });
        }
        resolve({ success: true, message: "Added successfully" });
      }, 200);
    });
  },
};

export default wishlistService;
