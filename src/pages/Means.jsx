import React, { useEffect, useState } from "react";
import "./less/Means.less";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { GetUserDataApi, ChangeUserDataApi } from "../request/api";

// 限制图片大小
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
  if (!isLt2M) {
    message.error("请上传小于200kb的图!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function Means(props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    GetUserDataApi().then((res) => {
      if (res.errCode === 0) {
        message.success(res.message);
        sessionStorage.setItem("username", res.data.username);
      }
    });
  }, []);

  // 表单提交
  const onFinish = (values) => {
    // 表单拥有username值并且与表单拿到的值不等 密码非空
    if (
      values.username &&
      values.username !== sessionStorage.getItem("username") &&
      values.password.trim() !== ""
    ) {
      // 提交表单
      ChangeUserDataApi({
        username: values.username,
        password: values.password,
      }).then((res) => {
        if (res.errCode === 0) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    }
  };

  // 点击上传图片
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
        // 存储图片名称
        localStorage.setItem("avatar", info.file.response.data.filePath);
        // 触发Header组件更新
        props.setMykey(props.mykey + 1);
      });
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="means">
      <Form
        name="basic"
        style={{ width: "400px" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="修改用户名" name="username">
          <Input placeholder="请输入新用户名" />
        </Form.Item>

        <Form.Item label="修 改 密 码" name="password">
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 19,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            提 交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像:</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ "cms-token": localStorage.getItem("cms-token") }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}
