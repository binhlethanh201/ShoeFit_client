import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import productService from "../../services/product/productService";
import "../../assets/css/product/ProductList.css";
import SearchFilter from "../../components/product/productList/ProductFilter";
import SearchResults from "../../components/product/productList/ProductResults";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => ({
      q: searchParams.get("q") || "",
      cat: searchParams.get("cat") || null,
      mat: searchParams.get("mat") || null,
      style: searchParams.get("style") || null,
      page: parseInt(pageNumber) || 1,
    }),
    [searchParams, pageNumber],
  );

  const [searchTerm, setSearchTerm] = useState(queryParams.q);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    const items = await productService.getProducts(queryParams.q);
    setAllProducts(items);
    setLoading(false);
  }, [queryParams.q]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        !queryParams.cat ||
        product.categories?.some(
          (c) => String(c.id) === String(queryParams.cat),
        );
      const matchesStyle =
        !queryParams.style ||
        product.attributes?.some(
          (attr) => String(attr.styleId) === String(queryParams.style),
        );
      const matchesMaterial =
        !queryParams.mat ||
        product.attributes?.some(
          (attr) => String(attr.materialId) === String(queryParams.mat),
        );

      return matchesCategory && matchesStyle && matchesMaterial;
    });
  }, [allProducts, queryParams.cat, queryParams.style, queryParams.mat]);

  const productsPerPage = 9;
  const currentProductsForDisplay = useMemo(() => {
    const startIndex = (queryParams.page - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, queryParams.page]);

  const updateURL = useCallback(
    (newParams) => {
      const nextParams = new URLSearchParams(searchParams);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key]) nextParams.set(key, newParams[key]);
        else nextParams.delete(key);
      });

      const targetPage =
        newParams.page || (newParams.page === undefined ? 1 : queryParams.page);
      navigate(`/collection/page/${targetPage}?${nextParams.toString()}`);
    },
    [navigate, searchParams, queryParams.page],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== queryParams.q) updateURL({ q: searchTerm });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, queryParams.q, updateURL]);

  useEffect(() => {
    setSearchTerm(queryParams.q);
  }, [queryParams.q]);

  const handleFilterChange = (newFilter) => {
    const mapping = { categoryId: "cat", materialId: "mat", styleId: "style" };
    const key = Object.keys(newFilter)[0];
    updateURL({ [mapping[key]]: newFilter[key] });
  };

  return (
    <div
      className="container"
      style={{ minHeight: "80vh", paddingBottom: "50px" }}
    >
      <div className="search-layout">
        <SearchFilter
          onFilterChange={handleFilterChange}
          filters={{
            categoryId: queryParams.cat,
            materialId: queryParams.mat,
            styleId: queryParams.style,
          }}
          onClear={() => {
            setSearchTerm("");
            navigate("/collection/page/1");
          }}
        />
        <div style={{ flex: 1 }}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control rounded-pill px-4"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                height: "50px",
                border: "1px solid var(--border-color)",
              }}
            />
          </div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-secondary"></div>
            </div>
          ) : (
            <SearchResults
              products={currentProductsForDisplay}
              totalProducts={filteredProducts.length}
              productsPerPage={productsPerPage}
              currentPage={queryParams.page}
              paginate={(num) => updateURL({ page: num })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
