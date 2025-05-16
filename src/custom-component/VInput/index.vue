<template lang="">
  <el-input v-model="component.propValue" :input-style="componentStyle" placeholder="请输入" class="input" @input="inputChange" />
</template>
<script setup>
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();

import { deepCopy, findIndex } from "@/utils/utils";
import { computed } from "vue";
import { styleSplit } from "@/utils/style.js";

const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});
const inputChange = (e) => {
  let i = findIndex(props.component.id, compnentsStore.componentData);
  compnentsStore.setPropValue(i, e);
};
const componentStyle = computed(() => {
  return { ...styleSplit(props.component.style).componentStyle };
});
</script>
<style lang="scss" scoped>
.input {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
