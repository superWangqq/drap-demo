<template lang="">
  <div class="header">
    <el-button type="primary" @click.stop="cexiao">撤销</el-button>
    <el-button type="primary" @click.stop="chongzuo">重做</el-button>
    <el-button type="primary" @click.stop="daoru">导入</el-button>
    <el-button type="primary" @click.stop="daochu">导出</el-button>
    <el-button type="primary" @click.stop="clear">清空</el-button>
  </div>
</template>
<script setup>
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();

const cexiao = () => {
  compnentsStore.undo();
};
const chongzuo = () => {
  compnentsStore.redo();
};

const daoru = () => {
  compnentsStore.setDialogVisible(true, "import");
};
const daochu = () => {
  compnentsStore.setDialogVisible(true, "export");
};
const clear = () => {
  compnentsStore.setComponentData(JSON.stringify([]));
};
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 66px;
}
</style>
