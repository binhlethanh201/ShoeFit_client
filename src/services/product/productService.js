import { productsData, styleData } from "../../data/mockData";

const productService = {
  getProducts: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query || query.trim() === "") {
          resolve(productsData);
          return;
        }
        const lowerQuery = query.toLowerCase();

        const filtered = productsData.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            (p.description &&
              p.description.toLowerCase().includes(lowerQuery)) ||
            (p.ai_description &&
              p.ai_description.toLowerCase().includes(lowerQuery))
        );

        resolve(filtered);
      }, 300);
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = productsData.find((p) => p.id === id);

        if (product) {
          let foundStyles = [];
          ["MEN", "WOMEN"].forEach((gender) => {
            if (styleData[gender]) {
              Object.values(styleData[gender]).forEach((categoryArray) => {
                const matches = categoryArray.filter(
                  (item) => item.shoeId === id
                );
                foundStyles = [...foundStyles, ...matches];
              });
            }
          });
          if (foundStyles.length === 0) {
            foundStyles = styleData.MEN.everyday.slice(0, 5);
          }
          const enrichedProduct = {
            ...product,
            images: [
              product.image,
              product.image,
              product.image,
              product.image,
            ],
            colors: ["#fff", "#000"],
            sizes: [38, 39, 40, 41, 42, 43],
            specs: [
              { label: "Thương hiệu", value: "Nike / Adidas / Generic" },
              { label: "Thiết kế", value: "Nike" },
              { label: "Mã sản phẩm", value: `SKU-${id.toUpperCase()}` },
              { label: "Xuất xứ", value: "Việt Nam" },
            ],
            reviews_count: Math.floor(Math.random() * 200) + 50,
            rating: (Math.random() * (5 - 4) + 4).toFixed(1),
            styleHints: foundStyles,
          };
          resolve(enrichedProduct);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  getRelated: (currentId) => {
    const otherProducts = productsData.filter((p) => p.id !== currentId);
    const shuffled = otherProducts.sort(() => 0.5 - Math.random());
    return Promise.resolve(shuffled.slice(0, 5));
  },
};

export default productService;
