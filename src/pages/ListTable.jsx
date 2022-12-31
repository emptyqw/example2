import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import { ArticleListApi } from "../request/api";
import moment from "moment";
import "./less/ListTable.less";

// 标题组件MyTitle
function MyTitle(props) {
  return (
    <div>
      <a
        href={"http://codesohigh.com:8765/article/" + props.id}
        className="table_title"
        target="_blank"
        rel="noreferrer"
      >
        {props.title}
      </a>
      <p style={{ color: "#999" }}>{props.subTitle}</p>
    </div>
  );
}

// 从后端拿的数据要替换这个data数组
export default function ListTable() {
  // 列表数组
  const [arr, setArr] = useState([]);
  // 分页
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  // 提取请求的代码
  const getArticleList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize,
    }).then((res) => {
      if (res.errCode === 0) {
        // 更改pagination
        let { num, count, total } = res.data;
        setPagination({
          current: num,
          pageSize: count,
          total,
        });
        // 深拷贝获取数组
        let newArr = JSON.parse(JSON.stringify(res.data.arr));
        let myarr = [];
        // 给每个数组加key等于其id
        // 需要有标签结构赋予属性
        newArr.map((item) => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:s"),
            mytitle: (
              <MyTitle
                title={item.title}
                id={item.id}
                subTitle={item.subTitle}
              />
            ),
          };
          myarr.push(obj);
          return obj;
        });
        setArr(myarr);
      }
    });
  };

  //   请求文章列表
  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize);
  }, [pagination]);

  // 分页函数
  const pageChange = (arg) => {
    getArticleList(arg.current, arg.pageSize);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "mytitle",
      width: "50%",
      key: "mytitle",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "date",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => console.log(record.key)}>
            编辑
          </Button>
          <Button type="primary" danger onClick={() => console.log(record.key)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="list_table">
      <Table
        columns={columns}
        dataSource={arr}
        onChange={pageChange}
        pagination={pagination}
      />
      ;
    </div>
  );
}
