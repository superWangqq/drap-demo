<template>
  <div class="attr-container">
    <p class="title">画布属性</p>
    <el-form style="padding: 20px">
      <el-form-item v-for="(key, index) in Object.keys(options)" :key="index" :label="options[key]">
        <el-color-picker v-if="isIncludesColor(key)" v-model="compnentsStore.canvasStyleData[key]" show-alpha></el-color-picker>
        <el-input v-else v-model.number="compnentsStore.canvasStyleData[key]" type="number" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useCompnentsStore } from "@/store/componentStore.js";
import { onMounted } from "vue";
let compnentsStore = useCompnentsStore();
import { isIncludesColor, changeComponentsSizeWithScale } from "@/utils/style.js";

const options = {
  width: "宽度",
  height: "高度",
  backgroundColor: "背景色",
  scale: "缩放比例",
};
onMounted(() => {
  compnentsStore.setlastScale(compnentsStore.canvasStyleData.scale);
});

const changeScale = (e) => {
  if (e === compnentsStore.lastScale) return;
  changeComponentsSizeWithScale(e);
  compnentsStore.setlastScale(e);
};
</script>

<style lang="scss">
.attr-container {
  .title {
    text-align: center;
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #e4e7ed;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
  }
}
</style>
