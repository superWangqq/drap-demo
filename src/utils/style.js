import { sin, cos } from "./translate";
// import { useCompnentsStore } from "@/store/componentStore.js";
// import { deepCopy } from "@/utils/utils";

export const isIncludesColor = (str) => {
  if (!str) return;
  return str.toLowerCase().includes("color");
};
const unUnit = ["borderColor", "opacity", "borderStyle", "fontWeight", "textAlign", "verticalAlign", "transition"];
let boxStyleProps = [
  "borderColor",
  "borderRadius",
  "borderWidth",
  "height",
  "left",
  "opacity",
  "rotate",
  "top",
  "width",
  "borderStyle",
  "transition",
];

export function styleSplit(style) {
  let boxStyle = {};
  let componentStyle = {};
  for (const key in style) {
    if (boxStyleProps.includes(key)) {
      if (isIncludesColor(key) || unUnit.includes(key)) {
        boxStyle[key] = style[key];
      } else if (key !== "rotate") {
        boxStyle[key] = style[key] + "px";
      } else {
        boxStyle["transform"] = `rotate(${style[key] + "deg"})`;
      }
    } else {
      if (isIncludesColor(key) || unUnit.includes(key)) {
        componentStyle[key] = style[key];
      } else {
        componentStyle[key] = style[key] + "px";
      }
    }
  }

  return {
    boxStyle,
    componentStyle,
  };
}
// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
  style = { ...style };
  if (style.rotate !== 0) {
    const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate);
    const diffX = (style.width - newWidth) / 2; // 旋转后范围变小是正值，变大是负值
    let newLeft = style.left + diffX;

    let newRight = style.left + newWidth;
    const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate);
    const diffY = (newHeight - style.height) / 2; // 始终是正
    const newTop = style.top - diffY;
    const newBottom = style.top + newHeight;

    return {
      newLeft,
      newRight,
      newWidth,
      newHeight,
      newTop,
      newBottom,
    };
  } else {
    return {
      newLeft: style.left,
      newRight: style.right,
      newWidth: style.width,
      newHeight: style.height,
      newTop: style.top,
      newBottom: style.bottom,
    };
  }
}

// // 如果组件之前已经被缩放过（例如用户多次放大/缩小画布），直接使用 值 * 比例 会导致错误的缩放累积。
// const needToChangeAttrs = ["top", "left", "width", "height", "fontSize", "padding"];
// export const changeComponentsSizeWithScale = (scale, snapshotData = null) => {
//   const componentsStore = useCompnentsStore(); // 调用函数
//   const componentData = snapshotData || deepCopy(componentsStore.componentData);
//   componentData.forEach((component) => {
//     Object.keys(component.style).forEach((key) => {
//       if (needToChangeAttrs.includes(key)) {
//         // 根据比例计算新的属性值
//         let newKey = ((component.style[key] / componentsStore.lastScale) * scale).toFixed(4) - 0;
//         component.style[key] = newKey;
//         // if (key === "top" || key === "left") {
//         //   component.style[key] = newKey;
//         // } else {
//         //   component.style[key] = newKey === 0 ? 1 : newKey;
//         // }
//       }
//     });
//   });
//   if (snapshotData) {
//     return componentData;
//   }

//   componentsStore.setComponentData(JSON.stringify(componentData));

//   // componentsStore.setCanvasStyle({});
// };
