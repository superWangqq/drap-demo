<template>
  <div class="attr-list">
    <CommonAttr></CommonAttr>
    <Request></Request>

    <div class="table_map">
      <el-table
        :data="component.propValue.data"
        class="elTable"
        :show-overflow-tooltip="true"
        :stripe="component.propValue.stripe"
        :border="component.propValue.border"
      >
        <template v-for="(item, index) in component.propValue.tableHeader.columns" :key="item.prop">
          <el-table-column v-if="item.type === 'index'" type="index" :width="50" />
          <el-table-column v-if="item.type === 'selection'" type="selection" :width="50" />
          <el-table-column v-else :prop="item.prop" :label="item.label" :width="100">
            <template #default="scope">
              <el-input v-model="scope.row[item.prop]" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div>
      <el-button type="primary" @click="addRow">添加新行</el-button>
      <el-button type="primary" @click="deleteRow">删除新行</el-button>
      <el-form>
        <el-form-item label="边框">
          <el-switch v-model="component.propValue.border"></el-switch>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { deepCopy, findIndex } from "@/utils/utils";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();
import Request from "@/custom-component/common/Request.vue";

import CommonAttr from "@/custom-component/common/CommonAttr.vue";
const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});
const addRow = () => {
  let i = findIndex(props.component.id, compnentsStore.componentData);
  compnentsStore.addRow(i, {});
};
const deleteRow = () => {
  let i = findIndex(props.component.id, compnentsStore.componentData);
  compnentsStore.deleteRow(i);
};
</script>
<style lang="scss" scoped></style>
