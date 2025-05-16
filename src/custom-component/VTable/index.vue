<template>
  <el-table
    :data="component.propValue.data"
    class="elTable"
    :show-overflow-tooltip="true"
    :border="component.propValue.border"
    :cell-style="componentStyle"
  >
    <template v-for="(item, index) in component.propValue.tableHeader.columns" :key="index">
      <el-table-column v-if="item.type === 'index'" type="index" :width="item.width" />
      <el-table-column v-if="item.type === 'selection'" type="selection" :width="item.width" />
      <el-table-column v-else :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
    </template>
  </el-table>
</template>

<script setup>
import { computed } from "vue";
import { styleSplit } from "@/utils/style.js";
const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});
const componentStyle = computed(() => {
  return { ...styleSplit(props.component.style).componentStyle };
});
</script>

<style lang="scss" scoped>
.elTable {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
