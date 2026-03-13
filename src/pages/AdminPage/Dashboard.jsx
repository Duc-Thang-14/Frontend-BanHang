import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Table, Tag } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  SafetyOutlined,
  WarningOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";
import * as OrderService from "../../services/OrderService";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalProducts: 0,
    lowStock: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await UserService.getUsers({
        page: 1,
        limit: 1000,
      });

      const productRes = await ProductService.getAllProduct(1, 1000);
      const orderRes = await OrderService.getAllOrders();

      const userData = userRes.data.data;
      const productData = productRes.data;
      const orderData = orderRes.data;
      console.log("orders:", orderRes);
      setUsers(userData);
      setProducts(productData);
      setOrders(orderData);
      setStats({
        totalUsers: userData.length,
        totalAdmins: userData.filter((u) => u.isAdmin).length,
        totalProducts: productData.length,
        lowStock: productData.filter((p) => p.countInStock < 5).length,
        totalOrders: orderData.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Top bán chạy
  const topSelling = [...products]
    .sort((a, b) => b.selled - a.selled)
    .slice(0, 5);

  // ⚠️ Tồn kho thấp
  const lowStockProducts = products.filter((p) => p.countInStock < 5);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>📊 Dashboard Overview</h2>

      {/* ===== STATISTICS ===== */}
      <Row gutter={16}>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Statistic
              title="Total Admins"
              value={stats.totalAdmins}
              prefix={<SafetyOutlined />}
            />
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Statistic
              title="Total Products"
              value={stats.totalProducts}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Statistic
              title="Low Stock (<5)"
              value={stats.lowStock}
              prefix={<WarningOutlined />}
              styles={{
                content: {
                  color: stats.lowStock > 0 ? "red" : "green",
                },
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* ===== TABLE SECTION ===== */}
      <Row gutter={16} style={{ marginTop: 30 }}>
        <Col span={12}>
          <Card title="🔥 Top 5 Best Selling">
            <Table
              dataSource={topSelling}
              rowKey="_id"
              pagination={false}
              columns={[
                { title: "Name", dataIndex: "name" },
                { title: "Sold", dataIndex: "selled" },
                {
                  title: "Stock",
                  dataIndex: "countInStock",
                  render: (stock) =>
                    stock < 5 ? (
                      <Tag color="red">{stock}</Tag>
                    ) : (
                      <Tag color="green">{stock}</Tag>
                    ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="⚠️ Low Stock Products">
            <Table
              dataSource={lowStockProducts}
              rowKey="_id"
              pagination={false}
              columns={[
                { title: "Name", dataIndex: "name" },
                { title: "Stock", dataIndex: "countInStock" },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
