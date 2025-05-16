<template lang="">
  <el-button :style="componentStyle">{{ component.propValue }}</el-button>
</template>
<script setup>
import { styleSplit } from "@/utils/style.js";
import { onMounted, computed } from "vue";
const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});

const componentStyle = computed(() => {
  return { ...styleSplit(props.component.style).componentStyle, width: "100%", height: "100%", padding: 0, margin: 0 };
});
</script>
<style lang="scss" scoped></style>
