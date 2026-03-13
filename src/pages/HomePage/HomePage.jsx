import React, { useEffect, useState } from "react";
import { Select, Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import * as ProductAPI from "../../services/ProductService";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperTypeProduct, WrapperProducts } from "./style";

const { Option } = Select;

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchKeyword = query.get("search") || "";

  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);

  const [typeFilter, setTypeFilter] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 8;

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await ProductAPI.getAllProduct(
        currentPage,
        limit,
        "price",
        sortOrder,
        typeFilter,
        searchKeyword,
      );

      setProducts(res.data);
      setTotal(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH TYPES =================
  const fetchTypes = async () => {
    const res = await ProductAPI.getAllType();
    setTypes(res.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOrder, typeFilter, searchKeyword]);

  return (
    <div style={{ padding: "0px 80px", minHeight: "100vh" }}>
      {/* ================= TYPE MENU ================= */}
      <WrapperTypeProduct>
        <TypeProduct
          name="All Product"
          onClick={() => {
            setTypeFilter(undefined);
            setCurrentPage(1);
          }}
        />
        {types?.map((item) => (
          <TypeProduct
            key={item}
            name={item}
            onClick={() => {
              setTypeFilter(item);
              setCurrentPage(1);
            }}
          />
        ))}
      </WrapperTypeProduct>

      {/* ================= FILTER BAR ================= */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 20,
          alignItems: "center",
          background: "#fff",
          padding: "16px 20px",
          borderRadius: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Select
          placeholder="Sắp xếp theo giá"
          style={{ width: 200 }}
          onChange={(value) => setSortOrder(value)}
          allowClear
        >
          <Option value="asc">Giá thấp → cao</Option>
          <Option value="desc">Giá cao → thấp</Option>
        </Select>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <WrapperProducts>
        {products?.map((product) => (
          <CardComponent
            key={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            rating={product.rating}
            selled={product.selled}
            onClick={() => navigate(`/product-detail/${product._id}`)}
          />
        ))}
      </WrapperProducts>

      {/* ================= PAGINATION ================= */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <Pagination
          current={currentPage}
          total={total}
          pageSize={limit}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default HomePage;
