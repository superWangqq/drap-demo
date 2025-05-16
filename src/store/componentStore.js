import { defineStore } from "pinia";
import { deepCopy } from "@/utils/utils";
export const useCompnentsStore = defineStore(
  "user",
  {
    state: () => ({
      componentData: [],
      curComponentIds: [],
      snapShot: [], // 快照
      snapShotIndex: -1,
      dialogVisible: false,
      dialogVisibleTitle: "",
      lastScale: 1,
      canvasStyleData: {
        // 页面全局数据
        width: 1200,
        height: 740,
        scale: 1,
        opacity: 1,
        backgroundColor: "#ccc",
      },
    }),
    getters: {
      unCurComponentData(state) {
        return state.componentData.filter((it) => {
          return !state.curComponentIds.includes(it.id);
        });
      },
      curComponentData(state) {
        return state.componentData.filter((it) => {
          return state.curComponentIds.includes(it.id);
        });
      },
    },
    actions: {
      addComponent(component, index) {
        if (index !== undefined) {
          this.componentData.splice(index, 0, component);
        } else {
          this.componentData.push(component);
        }
      },
      setCurComponent(components, type) {
        if (type === "radio") {
          this.curComponentIds = [];
          this.curComponentIds[0] = components.id;
        } else {
          if (!this.curComponentIds.includes(components.id)) {
            this.curComponentIds.push(components.id);
          }
        }
      },
      setComponentData(json) {
        this.componentData = JSON.parse(json);
      },
      setShapeStyle(index, curSyule) {
        let style = this.componentData[index].style;
        this.componentData[index].style = { ...style, ...curSyule };
      },

      clearCurComponent() {
        this.curComponentIds = [];
      },
      // 撤销
      undo() {
        if (this.snapShotIndex < 0) return;
        this.snapShotIndex--;
        this.componentData = deepCopy(this.snapShot[this.snapShotIndex]) || [];
      },
      // 重做
      redo() {
        if (this.snapShotIndex >= this.snapShot.length - 1) return;
        this.snapShotIndex++;
        this.componentData = deepCopy(this.snapShot[this.snapShotIndex]) || [];
      },
      // 生成快照
      createSnapShot() {
        if (this.snapShotIndex < this.snapShot.length - 1) {
          this.snapShot = this.snapShot.slice(0, this.snapShotIndex + 1);
        }
        this.snapShotIndex++;
        this.snapShot.push(deepCopy(this.componentData));
      },
      setPropValue(index, value) {
        this.componentData[index].propValue = value;
      },
      setDialogVisible(flag, title) {
        this.dialogVisible = flag;
        this.dialogVisibleTitle = title;
      },
      // 表格添加行
      addRow(index, prop) {
        this.componentData[index].propValue.data.push(prop);
      },
      // 表格删除行
      deleteRow(index) {
        this.componentData[index].propValue.data.splice(this.componentData[index].propValue.data.length - 1, 1);
      },
      setlastScale(scale) {
        this.lastScale = scale;
      },
      setCanvasStyle(style) {
        this.canvasStyleData = style;
      },
    },
  },
  {
    persist: true,
  },
);
