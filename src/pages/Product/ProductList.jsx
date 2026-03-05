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

  const queryParams = useMemo(() => ({
    q: searchParams.get("q") || "",
    cat: searchParams.get("cat") || null,
    mat: searchParams.get("mat") || null,
    style: searchParams.get("style") || null,
    page: parseInt(pageNumber) || 1,
  }), [searchParams, pageNumber]);

  const [searchTerm, setSearchTerm] = useState(queryParams.q);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (isMounted) => {
    setLoading(true);
    const filters = {
      categoryId: queryParams.cat,
      materialId: queryParams.mat,
      styleId: queryParams.style,
    };

    const res = await productService.getProducts(
      queryParams.q, 
      filters, 
      queryParams.page, 
      9
    );

    if (isMounted) {
      setProducts(res.items);
      setTotalProducts(res.total);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [queryParams]);

  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);
    return () => { isMounted = false; };
  }, [fetchData]);

  const updateURL = useCallback((newParams) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) nextParams.set(key, newParams[key]);
      else nextParams.delete(key);
    });
    const targetPage = newParams.page || (newParams.page === undefined && (newParams.q !== undefined || newParams.cat !== undefined || newParams.mat !== undefined || newParams.style !== undefined) ? 1 : queryParams.page);
    navigate(`/collection/page/${targetPage}?${nextParams.toString()}`);
  }, [navigate, searchParams, queryParams.page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== queryParams.q) updateURL({ q: searchTerm });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, queryParams.q, updateURL]);

  useEffect(() => { setSearchTerm(queryParams.q); }, [queryParams.q]);

  const handleFilterChange = (newFilter) => {
    const mapping = { categoryId: "cat", materialId: "mat", styleId: "style" };
    const key = Object.keys(newFilter)[0];
    updateURL({ [mapping[key]]: newFilter[key] });
  };

  return (
    <div className="container" style={{ minHeight: "80vh", paddingBottom: "120px" }}>
      <div className="search-layout">
        <SearchFilter
          onFilterChange={handleFilterChange}
          filters={{ categoryId: queryParams.cat, materialId: queryParams.mat, styleId: queryParams.style }}
          onClear={() => { setSearchTerm(""); navigate("/collection/page/1"); }}
        />
        <div style={{ flex: 1 }}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control rounded-pill px-4"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ height: "50px", border: "1px solid var(--border-color)" }}
            />
          </div>
          <SearchResults
            loading={loading}
            products={products}
            totalProducts={totalProducts}
            productsPerPage={9}
            currentPage={queryParams.page}
            paginate={(num) => updateURL({ page: num })}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;