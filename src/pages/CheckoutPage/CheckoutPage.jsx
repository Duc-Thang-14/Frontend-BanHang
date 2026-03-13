import React, { useState } from "react";
import { Input, Radio, Button, message } from "antd";
import { useSelector } from "react-redux";
import * as OrderAPI from "../../services/OrderService";
import { useLocation, useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.items || [];

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    address: user?.address || "",
    city: user?.city || "",
    phone: user?.phone || "",
  });

  const itemsPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.amount,
    0,
  );

  const shippingPrice = 30000;

  const totalPrice = itemsPrice + shippingPrice;

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleOrder = async () => {
    try {
      const orderItems = selectedItems.map((item) => ({
        name: item.name,
        amount: item.amount,
        image: item.image,
        price: item.price,
        product: item.product,
      }));
      console.log(orderItems);
      const data = {
        orderItems,
        shippingAddress,
        paymentMethod,
        note: "",
      };
      console.log("DATA SEND:", data);
      const res = await OrderAPI.createOrder(data, user.accessToken);

      if (res.status === "OK") {
        message.success("Đặt hàng thành công");
        navigate("/order-success", {
          state: { order: res.data },
        });
      }
    } catch (error) {
      message.error("Đặt hàng thất bại");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Checkout</h2>

      <Input
        placeholder="Họ tên"
        value={shippingAddress.fullName}
        onChange={(e) =>
          setShippingAddress({
            ...shippingAddress,
            fullName: e.target.value,
          })
        }
      />

      <Input
        placeholder="Địa chỉ"
        value={shippingAddress.address}
        onChange={(e) =>
          setShippingAddress({
            ...shippingAddress,
            address: e.target.value,
          })
        }
      />

      <Input
        placeholder="Thành phố"
        value={shippingAddress.city}
        onChange={(e) =>
          setShippingAddress({
            ...shippingAddress,
            city: e.target.value,
          })
        }
      />

      <Input
        placeholder="Số điện thoại"
        value={shippingAddress.phone}
        onChange={(e) =>
          setShippingAddress({
            ...shippingAddress,
            phone: e.target.value,
          })
        }
      />

      <h3>Sản phẩm</h3>

      {selectedItems.map((item) => (
        <div
          key={item.product}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            borderBottom: "1px solid #eee",
            padding: "10px 0",
          }}
        >
          <img
            src={`http://localhost:3000${item.image}`}
            width="60"
            alt={item.name}
          />

          <div style={{ flex: 1 }}>
            <p>{item.name}</p>
            <p>Số lượng: {item.amount}</p>
          </div>

          <p>{(item.price * item.amount).toLocaleString()} đ</p>
        </div>
      ))}

      <Radio.Group
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
      >
        <Radio value="COD">Thanh toán khi nhận hàng</Radio>
        <Radio value="VNPAY">VNPay</Radio>
        <Radio value="MOMO">Momo</Radio>
      </Radio.Group>
      <h3>Tổng tiền: {totalPrice.toLocaleString()} đ</h3>
      <Button type="primary" onClick={handleOrder}>
        Đặt hàng
      </Button>
    </div>
  );
};

export default CheckoutPage;
