// // 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
};

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  collapseName: "style", // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
  linkage: {
    duration: 0, // 过渡持续时间
    targetId: "",
    data: [
      // 组件联动
      {
        id: "", // 联动的组件 id
        label: "", // 联动的组件名称
        event: "", // 监听事件
        style: [{ key: "", value: "" }], // 监听的事件触发时，需要改变的属性
      },
    ],
  },
};

// 编辑器左侧组件列表
const list = [
  {
    component: "VInput",
    label: "输入框",
    propValue: "双击编辑文字",
    icon: "wenben",
    style: {
      width: 200,
      height: 28,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "",
      color: "",
      padding: 4,
    },
  },
  {
    component: "VButton",
    label: "按钮",
    propValue: "按钮",
    icon: "button",
    style: {
      width: 100,
      height: 34,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 0,
      borderStyle: "solid",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 100,
      letterSpacing: 0,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#000",
    },
  },
  {
    component: "VImages",
    label: "图片",
    icon: "tupian",
    isPreview: false,
    propValue: {
      url: require("@/assets/title.jpg"),
      placeholder: require("@/assets/title.jpg"),
      // srcList: [require("@/assets/title.jpg"), require("@/assets/title.jpg")],
      flip: {
        horizontal: false,
        vertical: false,
      },
    },
    style: {
      width: 300,
      height: 200,
      borderRadius: "",
    },
  },

  {
    component: "VTable",
    label: "表格",
    icon: "biaoge",
    propValue: {
      tableHeader: {
        columns: [
          { prop: "", label: "", width: "100", align: "center", type: "selection", fixed: "left", isShow: true, reserveSelection: true },
          { prop: "date", label: "日期", align: "left", type: "", fixed: false, width: "180" },
          { prop: "name", label: "名字", align: "left", type: "", fixed: false, width: "180" },
          { prop: "address", label: "英文名字", align: "left", type: "", fixed: false, width: "180" },
        ],
        // pageSizeOpt: ['10', '30', '50', '100', '200'],
        // pageNum: 1,
        // pageSize: 10,
      },
      data: [
        {
          date: "2016-05-04",
          name: "Aleyna Kutzner",
          address: "Lohrbergstr. 86c, Süd Lilli, Saarland",
        },
        {
          date: "2016-05-03",
          name: "Helen Jacobi",
          address: "760 A Street, South Frankfield, Illinois",
        },
        {
          date: "2016-05-02",
          name: "Brandon Deckert",
          address: "Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen",
        },
        {
          date: "2016-05-01",
          name: "Margie Smith",
          address: "23618 Windsor Drive, West Ricardoview, Idaho",
        },
      ],
      stripe: true,
      border: true,
    },
    request: {
      method: "GET",
      data: [],
      url: "",
      series: false,
      time: 1000,
      paramType: "", // string object array
      requestCount: 0, // 请求次数限制，0 为无限
    },
    style: {
      width: 600,
      height: 200,
      fontWeight: 400,
      color: "",
      backgroundColor: "rgba(255, 255, 255, 1)",
      transition: "all 0s",
    },
  },
  {
    component: "VChart",
    label: "图表",
    icon: "el-icon-data-analysis",
    propValue: {
      chart: "VChart",
      option: {
        title: {
          text: "柱状图",
          show: true,
        },
        legend: {
          show: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        xAxis: {
          show: true,
          data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            name: "销量",
            data: [23, 61, 35, 77, 35],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#73c0de",
              shadowColor: "#5470c6",
              shadowBlur: 3,
            },
          },
          {
            type: "line",
            name: "销量1",
            data: [20, 6, 31, 77, 35],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#73c0de",
              shadowColor: "#5470c6",
              shadowBlur: 3,
            },
          },
        ],
      },
    },
    style: {
      width: 800,
      height: 500,
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
