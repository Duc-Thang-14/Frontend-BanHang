import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
} from "antd";
import * as UserService from "../../services/UserService";

const { Option } = Select;
const { confirm } = Modal;

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    sort: null,
    role: null,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const [form] = Form.useForm();

  // ================= FETCH USERS =================
  const fetchUsers = async (customParams) => {
    setLoading(true);
    try {
      const res = await UserService.getUsers(customParams);

      setUsers(res.data.data);

      setPagination({
        current: res.data.page,
        pageSize: res.data.limit,
        total: res.data.total,
      });
    } catch (error) {
      message.error("Lỗi tải danh sách user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(params);
  }, [params]);

  // ================= TABLE CHANGE =================
  const handleTableChange = (pagination, filters, sorter) => {
    let sortValue = null;

    if (sorter.order === "ascend") sortValue = "email_asc";
    if (sorter.order === "descend") sortValue = "email_desc";

    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sortValue,
    });
  };

  // ================= FILTER ROLE =================
  const handleRoleFilter = (value) => {
    let roleValue = null;

    if (value === true) roleValue = "admin";
    if (value === false) roleValue = "user";

    setParams({
      ...params,
      page: 1,
      role: roleValue,
    });
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    console.log("ID cần xóa:", id);
    confirm({
      title: "Bạn có chắc muốn xóa user này?",
      okType: "danger",
      async onOk() {
        await UserService.deleteUser(id);
        message.success("Đã xóa user");
        fetchUsers(params);
      },
    });
  };

  const handleDeleteMultiple = () => {
    if (!selectedRowKeys.length) {
      return message.warning("Vui lòng chọn ít nhất 1 user");
    }

    confirm({
      title: `Bạn có chắc muốn xóa ${selectedRowKeys.length} user?`,
      okType: "danger",
      async onOk() {
        await UserService.deleteManyUsers(selectedRowKeys);
        message.success("Đã xóa các user đã chọn");
        setSelectedRowKeys([]);
        fetchUsers(params);
      },
    });
  };

  // ================= TABLE COLUMNS =================
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      render: (_, record) => (record.isAdmin ? "Admin" : "User"),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue({
                email: record.email,
                isAdmin: record.isAdmin,
              });
              setOpen(true);
            }}
          >
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          ➕ Thêm User
        </Button>

        <Button
          danger
          disabled={!selectedRowKeys.length}
          onClick={handleDeleteMultiple}
        >
          🗑 Xóa đã chọn ({selectedRowKeys.length})
        </Button>

        <Select
          placeholder="Lọc theo Role"
          style={{ width: 160 }}
          allowClear
          onChange={handleRoleFilter}
        >
          <Option value={true}>Admin</Option>
          <Option value={false}>User</Option>
        </Select>
        <Button
          onClick={() =>
            setParams((prev) => ({
              ...prev,
              sort: "email_asc",
              page: 1,
            }))
          }
        >
          🔼 Email A-Z
        </Button>

        <Button
          onClick={() =>
            setParams((prev) => ({
              ...prev,
              sort: "email_desc",
              page: 1,
            }))
          }
        >
          🔽 Email Z-A
        </Button>
      </Space>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        title={editingUser ? "Sửa User" : "Thêm User"}
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              if (editingUser) {
                // UPDATE USER
                await UserService.updateUser(editingUser._id, {
                  isAdmin: values.isAdmin,
                });

                message.success("Cập nhật user thành công");
              } else {
                // CREATE USER
                await UserService.createUser(values);
                message.success("Thêm user thành công");
              }

              setOpen(false);
              form.resetFields();
              fetchUsers(params);
            } catch (error) {
              message.error("Có lỗi xảy ra");
            }
          }}
        >
          {/* EMAIL */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          {/* PASSWORD */}
          {!editingUser && (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Vui lòng nhập password" },
                  { min: 2, message: "Tối thiểu 2 ký tự" },
                ]}
              >
                <Input.Password placeholder="Nhập password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại password" />
              </Form.Item>
            </>
          )}

          {/* ROLE */}
          <Form.Item
            name="isAdmin"
            label="Role"
            initialValue={false}
            rules={[{ required: true }]}
          >
            <Select>
              <Option value={true}>Admin</Option>
              <Option value={false}>User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUser;
