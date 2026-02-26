import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance.js";
import { updateUser } from "../../redux/slices/authSlice.js";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);
  console.log(userData);
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");

  // set preview khi user thay đổi
  useEffect(() => {
    if (userData?.avatar) {
      setPreview(userData.avatar);
    }
  }, [userData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("city", values.city);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await api.put(`/users/update-user/${userData._id}`, formData);

      dispatch(updateUser(res.data.data));

      message.success("Cập nhật thành công!");
      navigate("/");
    } catch (error) {
      message.error("Cập nhật thất bại");
    }
  };

  // 🛑 Nếu chưa có user thì loading
  if (!userData) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <h2>Cập nhật thông tin</h2>

      <Form
        key={userData._id} // 🔥 QUAN TRỌNG
        layout="vertical"
        initialValues={{
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Tên" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Thành phố" name="city">
          <Input />
        </Form.Item>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: 10 }}
        />

        {preview && (
          <div style={{ marginTop: 15 }}>
            <img
              src={preview}
              alt="avatar"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <Button
          type="primary"
          htmlType="submit"
          block
          style={{ marginTop: 20 }}
        >
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
