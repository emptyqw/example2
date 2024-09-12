import React, { useEffect, useState } from "react";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Modal, Form, Input, message } from "antd";
import moment from "moment/moment";
import E from "wangeditor";
import {
  ArticleAddApi,
  ArticleSearchApi,
  ArticleUpdateApi,
} from "../request/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";

let editor = null;
export default function Edit() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 处理数据
  const dealData = (errCode, msg) => {
    if (errCode === 0) {
      setIsModalOpen(false); //关闭对话框
      message.success(msg);
      // 调回list页面
      setTimeout(() => {
        navigate("/list");
      }, 1000);
    } else {
      message.error(msg);
    }
  };

  // 对话框点击提交
  const handleOk = () => {
    form
      .validateFields() //校验字段
      .then((values) => {
        // form.resetFields();
        console.log("Received values of form: ", values);
        // 请求数据
        let { title, subTitle } = values;
        // 地址栏有id就更新文章
        if (params.id) {
          // 更新文章请求
          ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(
            (res) => {
              dealData(res.errCode, res.message);
            }
          );
        } else {
          // 添加文章请求
          ArticleAddApi({ title, subTitle, content }).then((res) => {
            dealData(res.errCode, res.message);
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  useEffect(() => {
    editor = new E("#div1");
    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    };
    editor.create();

    // 根据地址栏id做请求
    if (params.id) {
      ArticleSearchApi({ id: params.id }).then((res) => {
        if (res.errCode === 0) {
          editor.txt.html(res.data.content); //重新设置编辑器的内容
          setTitle(res.data.title);
          setSubTitle(res.data.subTitle);
        }
      });
    }
    return () => {
      editor.destroy();
    };
  }, [location.pathname]);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={[
          <Button key="1" type="primary" onClick={() => setIsModalOpen(true)}>
            提交文章
          </Button>,
        ]}
      ></PageHeader>
      <div id="div1" style={{ padding: "0 20px" }}></div>
      <>
        <Modal
          zIndex={99999}
          title="填写文章标题"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          okText="提交"
          cancelText="取消"
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
            autoComplete="off"
            initialValues={{ title, subTitle }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请填写标题!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="副标题" name="subTitle">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
}
