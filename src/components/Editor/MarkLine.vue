<template lang="">
  <div v-show="lineShow && markline.top" class="lineX" :style="{ top: markline.top + 'px' }"></div>
  <div v-show="lineShow && markline.left" class="lineY" :style="{ left: markline.left + 'px' }"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import mitter from "@/utils/mitter";
import { findIndex } from "@/utils/utils";
import { getComponentRotatedStyle } from "@/utils/style.js";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();
const diff = ref(5);
const lineShow = ref(false);

const markline = ref({
  x: null,
  top: null,
});
onMounted(() => {
  mitter.on("move", (component) => {
    lineShow.value = true;
    showLine(component);
  });
  mitter.on("up", () => {
    lineShow.value = false;
  });
});
onUnmounted(() => {
  mitter.off("move");
  mitter.off("up");
});
const showLine = (markLineComponent) => {
  const { newLeft, newWidth, newHeight, newTop } = getComponentRotatedStyle(markLineComponent.style);
  let y = null;
  let x = null;
  compnentsStore.unCurComponentData.forEach((it) => {
    const styleObj = getComponentRotatedStyle(it.style);
    it = { ...it, ...styleObj };
    let conditions = {
      top: [
        {
          line: "xt",
          dragShift: it.newTop - newHeight,
          lineTop: it.newTop,
        },
        {
          line: "xt",
          dragShift: it.newTop,
          lineTop: it.newTop,
        },
        {
          line: "xc",
          dragShift: it.newTop + it.newHeight / 2 - newHeight / 2,
          lineTop: it.newTop + it.newHeight / 2,
        },
        {
          line: "xb",
          dragShift: it.newTop + it.newHeight - newHeight,
          lineTop: it.newTop + it.newHeight,
        },
        {
          line: "xb",
          dragShift: it.newTop + it.newHeight,
          lineTop: it.newTop + it.newHeight,
        },
      ],
      left: [
        {
          line: "yl",
          dragShift: it.newLeft - newWidth,
          lineTop: it.newLeft,
        },
        {
          line: "yl",
          dragShift: it.newLeft,
          lineTop: it.newLeft,
        },
        {
          line: "yc",
          dragShift: it.newLeft + it.newWidth / 2 - newWidth / 2,
          lineTop: it.newLeft + it.newWidth / 2,
        },
        {
          line: "yr",
          dragShift: it.newLeft + it.newWidth - newWidth,
          lineTop: it.newLeft + it.newWidth,
        },
        {
          line: "yr",
          dragShift: it.newLeft + it.newWidth,
          lineTop: it.newLeft + it.newWidth,
        },
      ],
    };
    for (let i = 0; i < conditions.top.length; i++) {
      let { dragShift, lineTop } = conditions.top[i];
      if (isNearly(dragShift, newTop)) {
        compnentsStore.curComponentData.forEach((it) => {
          let i = findIndex(it.id, compnentsStore.componentData);
          compnentsStore.setShapeStyle(i, { top: it.style.top + dragShift - newTop });
        });
        y = lineTop;
        break;
      }
    }
    for (let i = 0; i < conditions.left.length; i++) {
      let { dragShift, lineTop } = conditions.left[i];
      if (isNearly(dragShift, newLeft)) {
        compnentsStore.curComponentData.forEach((it) => {
          let i = findIndex(it.id, compnentsStore.componentData);
          compnentsStore.setShapeStyle(i, { left: it.style.left + dragShift - newLeft });
        });
        x = lineTop;
        break;
      }
    }
    markline.value.top = y;
    markline.value.left = x;
  });
};

const isNearly = (dragValue, targetValue) => {
  return Math.abs(dragValue - targetValue) <= diff.value;
};
</script>
<style lang="scss" scoped>
.lineY {
  position: absolute;
  height: 100%;
  width: 1px;
  z-index: 99;
  top: 0;
  background-color: red;
}

.lineX {
  position: absolute;
  height: 1px;
  width: 100%;
  z-index: 99;
  top: 0;
  background-color: red;
}
</style>
