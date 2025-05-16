<template lang="">
  <div class="editor">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div ref="canvas" class="canvas" :style="canvasStyleData" @dragover="handleDragOver" @drop="handleDrop" @click.stop="clearCurComponent">
        <div
          v-for="(item, index) in compnentsStore.componentData"
          :key="index"
          :style="itemStyle(item.style)"
          :class="{ active: compnentsStore.curComponentData.map((it) => it.id).includes(item.id), mark: hasMove && markLineComponent.id === item.id }"
          class="item"
          @click.stop="onClick(item)"
          @mousedown="
            (e) => {
              handmounseDown(e, item);
            }
          "
        >
          <component :is="item.component" :component="item"></component>
          <div class="xuanzhuan" @mousedown="(e) => handleRotate(e, item)"></div>
          <div
            v-for="it in pointList"
            :key="it"
            class="shape-point"
            :style="getPointStyle(it, item)"
            @mousedown="
              (e) => {
                pointMounseDown(e, it, item);
              }
            "
          ></div>
        </div>
        <MarkLine></MarkLine>
        <exportDialog></exportDialog>
      </div>
    </div>
  </div>
</template>
<script setup>
import { styleSplit } from "@/utils/style.js";
import { calculateRight } from "@/utils/calculateComponentPositonAndSize.js";
import { ref, watch, computed } from "vue";
import { deepCopy, findIndex } from "@/utils/utils";
import { useCompnentsStore } from "@/store/componentStore.js";
import componentList from "@/custom-component/component-list.js";
import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";
import generateID from "@/utils/generateID";
import exportDialog from "@/components/Editor/exportDialog.vue";
import MarkLine from "./MarkLine.vue";
import mitter from "@/utils/mitter";
const compnentsStore = useCompnentsStore();
let pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
let cursors = {
  lt: "nw-resize",
  t: "n-resize",
  rt: "ne-resize",
  r: "e-resize",
  rb: "se-resize",
  b: "s-resize",
  lb: "sw-resize",
  l: "w-resize",
};
const canvas = ref(null);
const activeArr = ref([]);
const keydown = ref(false);
const markLineComponent = ref({});
let hasMove = ref(false);
const canvasStyleData = computed(() => {
  return {
    height: compnentsStore.canvasStyleData.height + "px",
    width: compnentsStore.canvasStyleData.width + "px",
    opacity: compnentsStore.canvasStyleData.opacity,
    backgroundColor: compnentsStore.canvasStyleData.backgroundColor,
  };
});

// 阻止 dragover 的默认行为，允许后续 drop 事件触发。
const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};
// 处理拖拽结束后的逻辑，如读取 dataTransfer 数据并添加新组件。
const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const index = e.dataTransfer.getData("index");
  const rectInfo = canvas.value.getBoundingClientRect();
  if (index) {
    const component = deepCopy(componentList[index]);
    component.style.top = e.clientY - rectInfo.y - component.style.height / 2;
    component.style.left = e.clientX - rectInfo.x - component.style.width / 2;
    component.id = generateID();
    compnentsStore.addComponent(component);
    compnentsStore.createSnapShot();
  }
};
const onClick = (component) => {
  if (keydown.value) {
    compnentsStore.setCurComponent(component, "check");
  }
};

// 监听整个文档的 keydown 事件
document.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    keydown.value = true;
  }
});
const clearCurComponent = () => {
  compnentsStore.clearCurComponent();
};

document.addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    keydown.value = false;
  }
});

const itemStyle = (style) => {
  return { position: "absolute", ...styleSplit(style).boxStyle };
};

const getPointStyle = (point, item) => {
  const { width, height } = item.style;
  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);
  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width;
    newTop = hasT ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2;
      newTop = hasT ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }

  const style = {
    marginLeft: "-4px",
    marginTop: "-4px",
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors[point],
  };

  return style;
};

const handmounseDown = (e, item) => {
  if (!keydown.value) {
    compnentsStore.setCurComponent(item, "radio");
  }
  markLineComponent.value = item;

  const startY = e.clientY;
  const startX = e.clientX;
  e.stopPropagation();

  // 记录每个元素的初始位置
  const initialPositions = compnentsStore.curComponentData.map((it) => {
    const pos = it.style;
    return {
      top: Number(pos.top),
      left: Number(pos.left),
    };
  });

  const move = (moveEvent) => {
    hasMove.value = true;
    const curX = moveEvent.clientX;
    const curY = moveEvent.clientY;

    compnentsStore.curComponentData.forEach((it, index) => {
      const { top: startTop, left: startLeft } = initialPositions[index];
      const newTop = curY - startY + startTop;
      const newLeft = curX - startX + startLeft;
      let i = findIndex(it.id, compnentsStore.componentData);
      compnentsStore.setShapeStyle(i, { top: newTop, left: newLeft });
    });
    mitter.emit("move", markLineComponent.value);
  };

  const up = () => {
    hasMove.value && compnentsStore.createSnapShot();
    hasMove.value = false;
    mitter.emit("up");
    markLineComponent.value = {};
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const pointMounseDown = (e, point, item) => {
  e.stopPropagation();
  const startY = e.clientY;
  const startX = e.clientX;
  let style = item.style;
  // 组件中心点
  const center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  };
  // 获取画布位移信息
  const editorRectInfo = canvas.value.getBoundingClientRect();

  // 获取拖动点击的原点位置信息
  const pointRect = e.target.getBoundingClientRect();
  // 当前点击圆点相对于画布的中心坐标
  const curPoint = {
    x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
    y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
  };
  // 获取对称点的 x,y坐标
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  };
  const move = (moveEvent) => {
    hasMove.value = true;

    const curPositon = {
      x: moveEvent.clientX - Math.round(editorRectInfo.left),
      y: moveEvent.clientY - Math.round(editorRectInfo.top),
    };
    calculateComponentPositonAndSize(point, style, curPositon, {
      center,
      curPoint,
      symmetricPoint,
    });
  };

  const up = () => {
    hasMove.value && compnentsStore.createSnapShot();
    hasMove.value = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

function handleRotate(e, item) {
  e.stopPropagation();
  e.preventDefault();
  const startY = e.clientY;
  const startX = e.clientX;
  const { rotate } = { ...item.style };
  // 获取元素中心点位置
  const rect = e.currentTarget.parentElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);
  let i = findIndex(item.id, compnentsStore.componentData);
  const move = (moveEvent) => {
    hasMove.value = true;
    const curX = moveEvent.clientX;
    const curY = moveEvent.clientY;
    const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
    let curRotate = rotate + rotateDegreeAfter - rotateDegreeBefore;

    compnentsStore.setShapeStyle(i, { rotate: curRotate });
  };
  const up = () => {
    hasMove.value && compnentsStore.createSnapShot();
    hasMove.value = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
</script>

<style lang="scss" scoped>
.editor {
  margin-left: 200px;
  padding: 20px;
  margin-right: 340px;
  height: 100%;
  position: relative;

  .canvas {
    position: relative;
  }

  .item {
    position: relative;
  }
}

.active {
  user-select: none;

  .shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
    display: block;
  }

  .xuanzhuan {
    position: absolute;
    background: #fff;
    width: 18px;
    height: 18px;
    display: block;
    transform: translate(-9px, 0);
    z-index: 1;
    background-color: red;
    top: -20px;
    left: 50%;
    border-radius: 50%;
  }
}

.mark::after {
  content: "";
  top: 0;
  right: 0;
  left: 0;
  position: absolute;
  bottom: 0;
  z-index: 99;
}

.shape-point,
.xuanzhuan {
  display: none;
}
</style>
