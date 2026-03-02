import "./user.css";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import { addUser, delUser, editUser, getUser } from "../../api";
import dayjs from "dayjs";

export default function User() {
  // searchParams存储的是筛选条件，tableData存储的是根据条件筛选后的数据
  const [searchParams, setSearchParams] = useState({ name: "" });
  const [tableData, setTableData] = useState([]);
  // 默认是新增状态
  const [modalType, setModalType] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: "姓名", dataIndex: "name" },
    { title: "年龄", dataIndex: "age" },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        return val ? "女" : "男";
      },
    },
    { title: "出生日期", dataIndex: "birth" },
    { title: "地址", dataIndex: "addr" },
    {
      title: "编辑",
      // render可以拿到当前数据，如果有dataIndex拿到当前字段，如果没有dataIndex拿到一行的数据
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit", rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除该用户，确认吗"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // 添加或编辑函数，添加或编辑用户信息
  const handleClick = (type, rowData) => {
    setIsModalOpen(true);
    if (type === "add") {
      setModalType(false);
    }
    if (type === "edit") {
      setModalType(true);
      // 深拷贝，实现表单数据回填
      const cloneData = JSON.parse(JSON.stringify(rowData));
      cloneData.birth = dayjs(cloneData.birth);
      form.setFieldsValue(cloneData);
    }
  };
  // 提交搜索框函数
  const handleFinsh = (e) => {
    console.log(e);
    setSearchParams({ name: e.keyword });
    // 如果在这里直接调用getTableData()，由于异步操作不会立刻更新，使用的还是旧的searchParams
  };
  useEffect(() => {
    getTableData();
  }, [searchParams]);
  // 删除函数，删除用户信息，从rowData解构出id
  const handleDelete = ({ id }) => {
    delUser({ id }).then(getTableData());
  };

  // 弹窗确认
  const handleOk = () => {
    // 表单校验
    form
      .validateFields()
      .then((val) => {
        val.birth = dayjs(val.birth).format("YYYY-MM-DD");
        // console.log(val);
        if (modalType) {
          editUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        } else {
          addUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        }
      })
      .catch((error) => console.log(error));
  };
  // 弹窗取消
  const handleCancel = () => {
    setIsModalOpen(false);
    // 清空表单数据
    form.resetFields();
  };

  // 根据条件获取表格数据
  const getTableData = () => {
    // 一开始没有搜索条件，获取全部用户数据
    getUser(searchParams).then(({ data }) => {
      // console.log(data);
      setTableData(data.list);
    });
  };
  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="user-container">
      <div className="flex-box space-between ">
        <Button type="primary" onClick={() => handleClick("add")}>
          新增
        </Button>
        <Form layout="inline" onFinish={handleFinsh}>
          {/*必须加name，否则无法获取提交Form的值*/}
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={"id"}
        style={{ marginTop: "10px" }}
      />
      <Modal
        title={modalType ? "编辑用户" : "新增用户"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          {/* 编辑时，需要告诉后端编辑哪条数据，告诉后端id */}
          {/* 这样提交表单数据时可以一起提交id */}
          {modalType && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <InputNumber placeholder="年龄" min={1} />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { value: 0, label: "男" },
                { value: 1, label: "女" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: "请选择出生日期" }]}
          >
            <DatePicker placeholder="请选择出生日期" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
