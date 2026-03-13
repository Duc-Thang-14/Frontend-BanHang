import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return <h2>Không tìm thấy thông tin đơn hàng</h2>;
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎉 Đặt hàng thành công!</h1>

      <p>Mã đơn hàng: {order._id}</p>

      <p>Tổng tiền: {order.totalPrice?.toLocaleString()} VND</p>

      <p>Phương thức thanh toán: {order.paymentMethod}</p>

      <div style={{ marginTop: 20 }}>
        <Button type="primary" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>

        <Button
          style={{ marginLeft: 10 }}
          onClick={() => navigate("/my-orders")}
        >
          Xem đơn hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
