import { useEffect, useRef } from "react";
import * as echarts from "echarts";

// 有坐标系的option设置
const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
};
// 无坐标系的option设置
const normalOption = {
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
};

export default function MyEcharts({ style, chartData, isAxisChart = true }) {
  const echartRef = useRef();
  const echartObj = useRef(null);
  // React先更新DOM，然后执行useEffect回调，所以把echarts初始化代码放在useEffect中
  useEffect(() => {
    // 初始化echarts实例
    echartObj.current = echarts.init(echartRef.current);
    // 设置option
    let options;
    if (isAxisChart) {
      axisOption.xAxis.data = chartData.xData;
      axisOption.series = chartData.series;
      options = axisOption;
    } else {
      normalOption.series = chartData.series;
      options = normalOption;
    }
    // 绘制图表
    echartObj.current.setOption(options);

    // 新增：监听窗口大小变化
    const handleResize = () => {
      echartObj.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      if (echartObj.current) {
        echartObj.current.dispose();
        echartObj.current = null;
      }
    };
  }, [chartData, isAxisChart]);
  return <div style={style} ref={echartRef}></div>;
}
