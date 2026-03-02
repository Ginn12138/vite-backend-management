import "./home.css";
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import * as Icon from "@ant-design/icons";
import { getData } from "../../api";
import MyEcharts from "../../components/echarts";
import defaultAvatar from "../../assets/images/user-default.png";
// 表格第一行数据，固定数据
const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];
// 订单数据，固定数据
const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];
//  根据名字获取icon图标
const iconToElement = (name) => React.createElement(Icon[name]);

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [echartData, setEchartData] = useState({});

  useEffect(() => {
    getData().then((res) => {
      // console.log(res);
      const { tableData, orderData, userData, videoData } = res.data.data;
      setTableData(tableData);

      // 按照echarts所需要的数据格式，组装数据
      // 第一条数据格式为key:value，获取其key值（即品牌）
      // Object.keys()就是提取对象所有的key
      const keyArray = Object.keys(orderData.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key, //品牌
          // 数组：使用数字索引 array[0]；对象：使用字符串键名 object["苹果"]
          data: orderData.data.map((item) => item[key]), //品牌销售额
          type: "line", //折线图
        });
      });
      setEchartData({
        order: {
          xData: orderData.date,
          series,
        },
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: "新增用户",
              data: userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        },
        video: { series: [{ data: videoData, type: "pie" }] },
      });
    });
  }, []);

  return (
    <Row className="home-container">
      <Col span={8}>
        <Card hoverable>
          <div className="user-info">
            {/* <img src={require("../../assets/images/user-default.png")} /> */}
            <img src={defaultAvatar} />
            <div>
              <p className="name">Admin</p>
              <p className="access">管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              上次登陆时间:<span>2026-1-14</span>
            </p>
            <p>
              上次登陆地点:<span>武汉</span>
            </p>
          </div>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            // 这里犯过错误,tableData是数组,没有tableData.name这种写法
            // 这样写Table内部会自动处理：遍历时取每条数据的.name值
            rowKey={"name"}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="order">
          {countData.map((item, index) => {
            return (
              <Card key={index}>
                <div
                  className="icon-box"
                  style={{ backgroundColor: item.color }}
                >
                  {iconToElement(item.icon)}
                </div>
                <div className="detail">
                  <p className="num">{item.value}</p>
                  <p className="text">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
        {/* 折线图 */}
        {echartData.order && (
          <MyEcharts
            chartData={echartData.order}
            style={{ height: "280px", width: "100%" }}
          />
        )}
        <div className="graph">
          {/* 柱状图 */}
          {echartData.user && (
            <MyEcharts
              chartData={echartData.user}
              style={{ height: "240px", width: "50%" }}
            />
          )}
          {/* 饼状图 */}
          {echartData.video && (
            <MyEcharts
              chartData={echartData.video}
              style={{ height: "240px", width: "50%" }}
              isAxisChart={false}
            />
          )}
        </div>
      </Col>
    </Row>
  );
}
