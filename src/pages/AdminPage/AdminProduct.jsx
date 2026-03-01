import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import * as ProductAPI from "../../services/ProductService";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [types, setTypes] = useState([]);

  const [form] = Form.useForm();

  // ================= FETCH =================
  const fetchProducts = async (
    page = 1,
    limit = 5,
    field = sortField,
    order = sortOrder,
    type = filterType,
  ) => {
    setLoading(true);
    try {
      const res = await ProductAPI.getAllProduct(
        page,
        limit,
        field,
        order,
        type,
      );

      setProducts(res.data);
      setTotal(res.total);
      setCurrent(res.currentPage);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch products");
    }
    setLoading(false);
  };
  const fetchType = async () => {
    const res = await ProductAPI.getAllType();
    setTypes(res.data);
  };
  useEffect(() => {
    fetchType();
    fetchProducts(current);
  }, [sortField, sortOrder, filterType]);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async () => {
    const values = await form.validateFields();

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("countInStock", values.countInStock);

    // 👇 CHỈ append image nếu là file mới
    if (values.image && values.image[0]?.originFileObj) {
      formData.append("image", values.image[0].originFileObj);
    }

    try {
      if (editingProduct) {
        await ProductAPI.updateProduct(editingProduct._id, formData);
        message.success("Updated successfully");
      } else {
        await ProductAPI.createProduct(formData);
        message.success("Created successfully");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      form.resetFields();
      fetchProducts(current);
    } catch (error) {
      console.log(error);
      message.error("Operation failed");
    }
  };

  // ================= DELETE ONE =================
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This product will be permanently deleted!",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await ProductAPI.deleteProduct(id);
          message.success("Deleted successfully");
          fetchProducts(current);
        } catch (error) {
          console.log(error);
          message.error("Delete failed");
        }
      },
    });
  };

  // ================= DELETE MANY =================
  const handleDeleteMany = () => {
    Modal.confirm({
      title: "Delete selected products?",
      content: `You are about to delete ${selectedRowKeys.length} products.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await ProductAPI.deleteManyProduct(selectedRowKeys);
          message.success("Deleted selected products");
          setSelectedRowKeys([]);
          fetchProducts(current);
        } catch (error) {
          console.log(error);
          message.error("Delete multiple failed");
        }
      },
    });
  };

  // ================= TABLE COLUMNS =================
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={`http://localhost:3000${image}`}
          alt="product"
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Type", dataIndex: "type" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "countInStock" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingProduct(record);

              form.setFieldsValue({
                ...record,
                image: record.image
                  ? [
                      {
                        uid: "-1",
                        name: "image.jpg",
                        status: "done",
                        url: `http://localhost:3000${record.image}`,
                      },
                    ]
                  : [],
              });

              setIsModalOpen(true);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // ================= ROW SELECTION =================
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Product</h2>

      <Space style={{ marginBottom: 16 }} wrap>
        <Button
          type="primary"
          onClick={() => {
            setEditingProduct(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Add Product
        </Button>

        <Button
          danger
          disabled={!selectedRowKeys.length}
          onClick={handleDeleteMany}
        >
          Delete Selected
        </Button>

        <Select
          placeholder="Sort Field"
          style={{ width: 150 }}
          allowClear
          onChange={(value) => setSortField(value)}
          options={[
            { label: "Name", value: "name" },
            { label: "Price", value: "price" },
          ]}
        />

        <Select
          placeholder="Sort Order"
          style={{ width: 150 }}
          allowClear
          onChange={(value) => setSortOrder(value)}
          options={[
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
          ]}
        />

        <Select
          placeholder="Filter by Type"
          style={{ width: 160 }}
          allowClear
          onChange={(value) => setFilterType(value)}
          options={types.map((type) => ({
            label: type,
            value: type,
          }))}
        />
      </Space>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
        pagination={{
          current,
          pageSize: 5,
          total,
          onChange: (page, pageSize) => {
            fetchProducts(page, pageSize);
          },
        }}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            rules={[{ required: true, message: "Please upload image" }]}
          >
            <Upload
              beforeUpload={() => false} // ngăn upload tự động
              maxCount={1}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="countInStock"
            label="Stock"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
