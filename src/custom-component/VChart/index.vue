<template>
  <!-- 图表容器：设置宽度和高度 -->
  <div ref="chartRef" :style="{ width: component.style.width + 'px', height: component.style.height + 'px' }"></div>
</template>

<script setup>
// 引入 Vue 的 Composition API
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import mitter from "@/utils/mitter.js";

const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});
watch(
  () => [props.component.style.height, props.component.style.width],
  ([newHeight, newWidth]) => {
    chartInstance?.resize();
  },
);

// 引入 echarts 库
import * as echarts from "echarts";

// 获取 DOM 元素的引用（用于初始化图表）
const chartRef = ref(null);
// 存储 ECharts 实例
let chartInstance = null;

// 初始化图表的方法
const initChart = () => {
  if (chartRef.value) {
    // 初始化 echarts 实例
    chartInstance = echarts.init(chartRef.value);

    // 配置项
    const option = props.component.propValue.option;
    // 使用配置项渲染图表
    chartInstance.setOption(option);
  }
};

// 窗口大小变化时调整图表尺寸
const resizeChart = () => {
  chartInstance?.resize();
};

// 组件挂载后执行初始化
onMounted(() => {
  mitter.on("initChart", () => {
    initChart();
  });
  initChart();
  // 监听窗口大小变化事件以支持响应式
  window.addEventListener("resize", resizeChart);
});

// 组件卸载前清理资源，防止内存泄漏
onBeforeUnmount(() => {
  mitter.off("initChart");
  window.removeEventListener("resize", resizeChart);
  chartInstance?.dispose(); // 销毁 echarts 实例
});
</script>
