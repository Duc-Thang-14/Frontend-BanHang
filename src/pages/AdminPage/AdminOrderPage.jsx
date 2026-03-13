import { useEffect, useState } from "react";
import { Table, Select, Tag } from "antd";
import * as OrderAPI from "../../services/OrderService";

const { Option } = Select;

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await OrderAPI.getAllOrders();
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await OrderAPI.updateOrderStatus(id, status);
    fetchOrders();
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
    },
    {
      title: "Khách hàng",
      render: (_, record) => record.user?.name,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (price) => (price ? price.toLocaleString() : 0) + " VND",
    },
    {
      title: "Thanh toán",
      render: (_, record) =>
        record.isPaid ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="red">Chưa thanh toán</Tag>
        ),
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <Tag
          color={
            record.status === "pending"
              ? "orange"
              : record.status === "shipping"
                ? "blue"
                : record.status === "delivered"
                  ? "green"
                  : "default"
          }
        >
          {record.status}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>Quản lý đơn hàng</h2>

      <Table columns={columns} dataSource={orders} rowKey="_id" />
    </div>
  );
};

export default AdminOrderPage;
