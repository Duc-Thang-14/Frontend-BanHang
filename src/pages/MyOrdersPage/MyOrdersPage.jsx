import { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { getMyOrders } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getMyOrders(accessToken);
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (date) => {
        const d = new Date(date);
        return d.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (price) => price.toLocaleString() + " VND",
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
    },
    {
      title: "Trạng thái",
      dataIndex: "isPaid",
      render: (paid) => (paid ? "Đã thanh toán" : "Chưa thanh toán"),
    },
    {
      title: "Chi tiết",
      render: (_, record) => (
        <a onClick={() => navigate(`/get-detail/${record._id}`)}>Xem</a>
      ),
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <h2>Đơn hàng của tôi</h2>

      <Table columns={columns} dataSource={orders} rowKey="_id" />
    </div>
  );
};

export default MyOrdersPage;
