import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import * as CartAPI from "../../services/CartService";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchCart = async () => {
    const res = await CartAPI.getCart();
    setCartItems(res.items || []);
  };
  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.product),
    );

    navigate("/checkout", {
      state: { items: selectedProducts },
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // chọn sản phẩm
  const handleSelectItem = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // tăng số lượng
  const increase = async (productId, amount) => {
    await CartAPI.updateAmount(productId, amount + 1);
    fetchCart();
  };

  // giảm số lượng
  const decrease = async (productId, amount) => {
    if (amount === 1) {
      await CartAPI.removeItem(productId);
    } else {
      await CartAPI.updateAmount(productId, amount - 1);
    }

    fetchCart();
  };

  // xóa sản phẩm
  const handleRemove = async (productId) => {
    await CartAPI.removeItem(productId);
    fetchCart();
  };

  // tổng tiền
  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.product))
    .reduce((total, item) => total + item.price * item.amount, 0);

  return (
    <div style={{ padding: "40px 80px", paddingBottom: 120 }}>
      <h1>Giỏ hàng</h1>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: "20px 0",
              }}
            >
              <Checkbox
                checked={selectedItems.includes(item.product)}
                onChange={() => handleSelectItem(item.product)}
              />

              <img
                src={`http://localhost:3000${item.image}`}
                alt={item.name}
                width="80"
              />

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 18 }}>{item.name}</p>
                <p>{item.price.toLocaleString()} đ</p>
              </div>

              {/* tăng giảm số lượng */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Button onClick={() => decrease(item.product, item.amount)}>
                  -
                </Button>

                <span>{item.amount}</span>

                <Button onClick={() => increase(item.product, item.amount)}>
                  +
                </Button>
              </div>

              <Button danger onClick={() => handleRemove(item.product)}>
                Xóa
              </Button>
            </div>
          ))}
        </>
      )}

      {/* thanh tổng tiền */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px",
          background: "#fff",
          borderTop: "1px solid #ddd",
          padding: "0 80px",
          boxSizing: "border-box",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          zIndex: 999,
        }}
      >
        <h2>Tổng tiền: {totalPrice.toLocaleString()} đ</h2>

        <Button type="primary" onClick={handleCheckout} size="large">
          Mua hàng
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
