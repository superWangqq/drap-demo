<template lang="">
  <div v-show="compnentsStore.previewDialog" class="mask">
    <el-button class="close" @click="close">关闭</el-button>
    <div class="preview">
      <div class="canvas" :style="canvasStyleData">
        <div v-for="(item, index) in componentData" :key="index" :style="itemStyle(item.style)" class="item">
          <component :is="item.component" :component="item" @click="onClick(item)" @mouseenter="onMouseEnter(item)"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCompnentsStore } from "@/store/componentStore.js";
import { styleSplit } from "@/utils/style.js";
import { ref, computed, watch, nextTick } from "vue";
const compnentsStore = useCompnentsStore();
import { deepCopy, findIndex } from "@/utils/utils";
import request from "@/utils/request.js";

const componentData = ref([]);
watch(
  () => compnentsStore.previewDialog,
  (newval) => {
    if (newval) {
      componentData.value = deepCopy(compnentsStore.componentData);
    } else {
      componentData.value = [];
    }
  },
);

const itemStyle = (style) => {
  return { position: "absolute", ...styleSplit(style).boxStyle };
};

const canvasStyleData = computed(() => {
  return {
    height: compnentsStore.canvasStyleData.height + "px",
    width: compnentsStore.canvasStyleData.width + "px",
    opacity: compnentsStore.canvasStyleData.opacity,
    backgroundColor: compnentsStore.canvasStyleData.backgroundColor,
  };
});

const close = () => {
  compnentsStore.setPreviewDialog(false);
};
const onClick = (component) => {
  componentData.value.forEach((it) => {
    if (it.linkage.data.length > 0) {
      const data = it.linkage.data.filter((item) => item.id === component.id && item.event === "v-click");
      if (data.length > 0) {
        changeStyle(data, it.linkage.targetId, it.linkage.duration);
      }
    }
  });
};
const onMouseEnter = (component) => {
  componentData.value.forEach((it) => {
    if (it.linkage.data.length > 0) {
      const data = it.linkage.data.filter((item) => item.id === component.id && item.event === "v-hover");
      if (data.length > 0) {
        changeStyle(data, it.linkage.targetId, it.linkage.duration);
      }
    }
  });
};

const changeStyle = (data, targetId, duration) => {
  data.forEach((item) => {
    let i = findIndex(targetId, componentData.value);
    componentData.value[i].style.transition = `all ${duration}s`;
    item.style.forEach((e) => {
      if (e.key) {
        componentData.value[i].style[e.key] = e.value;
      }
    });
  });
};
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
  right: 0;
  overscroll-behavior: contain;
  /* 阻止蒙层滚动到底部后影响页面 */
  background-color: rgba(0, 0, 0, 0.7);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.preview {
  max-width: 80%;
  overflow: auto;
  margin: 0 auto;
  max-height: 90%;
  top: 60px;
  margin-top: 80px;
}

.canvas {
  position: relative;
}
</style>
