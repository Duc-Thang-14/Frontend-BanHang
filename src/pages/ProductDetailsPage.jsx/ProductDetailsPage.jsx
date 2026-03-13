import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as ProductAPI from "../../services/ProductService";

import * as CartAPI from "../../services/CartService";
import { message } from "antd";
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await CartAPI.addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        amount: 1,
      });

      message.success("Đã thêm sản phẩm vào giỏ hàng 🛒");
    } catch (error) {
      message.error("Thêm vào giỏ hàng thất bại ❌");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await ProductAPI.getDetailProduct(id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div
      style={{
        padding: "40px 100px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: 20,
          padding: "10px 20px",
          fontSize: 16,
          borderRadius: 6,
          border: "none",
          background: "#333",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Quay lại trang chủ
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "450px 1fr",
          gap: 40,
          background: "#fff",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* IMAGE */}
        <div>
          <img
            src={`http://localhost:3000${product.image}`}
            alt={product.name}
            style={{
              width: "100%",
              height: 420,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        </div>

        {/* INFO */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Name */}
          <div style={{ fontSize: 32, fontWeight: 600 }}>{product.name}</div>

          {/* Price */}
          <div
            style={{
              fontSize: 28,
              color: "#ff4d4f",
              fontWeight: "bold",
            }}
          >
            {product.price.toLocaleString()} đ
          </div>

          <hr />

          {/* Rating */}
          <div style={{ fontSize: 18 }}>
            ⭐ Rating: <b>{product.rating}</b>
          </div>

          {/* Sold */}
          <div style={{ fontSize: 18 }}>
            🛒 Đã bán: <b>{product.selled}</b>
          </div>

          {/* Stock */}
          <div style={{ fontSize: 18 }}>
            📦 Tồn kho: <b>{product.countInStock}</b>
          </div>

          <hr />

          {/* Description */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
              Mô tả sản phẩm
            </div>
            <div style={{ fontSize: 16, color: "#555" }}>
              {product.description || "Chưa có mô tả"}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            <button
              style={{
                padding: "14px 30px",
                fontSize: 18,
                background: "#ff4d4f",
                border: "none",
                color: "#fff",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Mua ngay
            </button>

            <button
              onClick={handleAddToCart}
              disabled={loading}
              style={{
                padding: "14px 30px",
                fontSize: 18,
                background: "#1890ff",
                border: "none",
                color: "#fff",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {loading ? "Đang thêm..." : "Thêm vào giỏ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
