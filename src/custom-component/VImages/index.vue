<template lang="">
  <el-image
    class="elImg"
    :src="component.propValue.url"
    :draggable="false"
    :style="componentStyle"
    :preview-src-list="component.propValue.srcList"
    fit="cover"
  >
    <template #placeholder>
      <el-image :src="component.propValue.placeholder" :fit="fit"></el-image>
    </template>
    <template #progress="{ activeIndex, total }">
      <span>{{ activeIndex + 1 + "-" + total }}</span>
    </template>
  </el-image>
</template>
<script setup>
import { styleSplit } from "@/utils/style.js";
import { computed } from "vue";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();
import { deepCopy, findIndex } from "@/utils/utils";
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
  return { borderRadius: styleSplit(props.component.style).boxStyle.borderRadius };
});
</script>
<style lang="scss" scoped>
.elImg {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
