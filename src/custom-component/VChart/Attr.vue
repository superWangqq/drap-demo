<template>
  <div class="attr-list">
    <CommonAttr></CommonAttr>
    <el-form>
      <el-form-item v-for="(it, index) in component.propValue.option.series" :key="index" :label="it.name">
        <el-select v-model="component.propValue.option.series[index].type" class="m-2" placeholder="请选择" size="large" @change="selectChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import CommonAttr from "@/custom-component/common/CommonAttr.vue";
import { findIndex } from "@/utils/utils";
import mitter from "@/utils/mitter";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();

const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});

const options = [
  {
    label: "柱状图",
    value: "bar",
  },
  {
    label: "折线图",
    value: "line",
  },
  {
    label: "饼图",
    value: "pie",
  },
  {
    label: "散点图",
    value: "scatter",
  },
];
const selectChange = (e) => {
  mitter.emit("initChart");
};
</script>
