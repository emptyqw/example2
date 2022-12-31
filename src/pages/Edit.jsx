import React, { useEffect, useState } from "react";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Modal, Form, Input } from "antd";
import moment from "moment/moment";
import E from "wangeditor";
import { ArticleAddApi } from "../request/api";
import { useParams } from "react-router-dom";

let editor = null;
export default function Edit() {
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const params = useParams();

  // 对话框点击提交
  const handleOk = () => {
    setIsModalOpen(false); //关闭对话框
    form
      .validateFields() //校验字段
      .then((values) => {
        // form.resetFields();
        console.log("Received values of form: ", values);
        // 请求数据
        let { title, subTitle } = values;
        ArticleAddApi({ title, subTitle, content }).then((res) => {
          console.log(res);
        });
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
    return () => {
      editor.destroy();
    };
  }, []);

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
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
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
