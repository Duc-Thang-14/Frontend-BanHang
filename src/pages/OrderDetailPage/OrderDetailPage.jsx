import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Card, Row, Col, Tag, Image } from "antd";
import { getOrderDetail } from "../../services/OrderService";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderDetail(id);
      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  }

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image width={50} src={record.image} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => price.toLocaleString() + " VND",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
    },
    {
      title: "Tổng",
      render: (_, record) =>
        (record.price * record.amount).toLocaleString() + " VND",
    },
  ];

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 1200,
        margin: "auto",
      }}
    >
      <h2 style={{ marginBottom: 30 }}>Chi tiết đơn hàng</h2>

      <Row gutter={20}>
        {/* Thông tin giao hàng */}
        <Col span={12}>
          <Card title="Thông tin giao hàng">
            <p>
              <b>Họ tên:</b> {order.shippingAddress.fullName}
            </p>
            <p>
              <b>Số điện thoại:</b> {order.shippingAddress.phone}
            </p>
            <p>
              <b>Địa chỉ:</b> {order.shippingAddress.address}
            </p>
            <p>
              <b>Thành phố:</b> {order.shippingAddress.city}
            </p>
          </Card>
        </Col>

        {/* Thanh toán */}
        <Col span={12}>
          <Card title="Thanh toán">
            <p>
              <b>Phương thức:</b> {order.paymentMethod}
            </p>

            <p>
              <b>Trạng thái:</b>{" "}
              {order.isPaid ? (
                <Tag color="green">Đã thanh toán</Tag>
              ) : (
                <Tag color="red">Chưa thanh toán</Tag>
              )}
            </p>

            <p style={{ fontSize: 18 }}>
              <b>Tổng tiền:</b>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {order.totalPrice.toLocaleString()} VND
              </span>
            </p>
          </Card>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Card title="Danh sách sản phẩm" style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={order.orderItems}
          rowKey="product"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default OrderDetailPage;
