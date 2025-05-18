<template>
  <el-collapse-item title="组件联动（预览生效" name="linkage" class="linkage-container">
    <el-form>
      <div v-for="(item, index) in linkage.data" :key="index" class="linkage-component">
        <div class="div-guanbi" @click="deleteLinkageData(index)">
          <el-icon>
            <CloseBold />
          </el-icon>
        </div>
        <el-select v-model="item.id" placeholder="请选择联动组件" class="testtest">
          <el-option v-for="(component, i) in componentData" :key="component.id" :value="component.id" :label="component.label">
            <div @mouseenter="onEnter(i)" @mouseout="onOut(i)">{{ component.label }}</div>
          </el-option>
        </el-select>
        <el-select v-model="item.event" placeholder="请选择监听事件">
          <el-option v-for="e in eventOptions" :key="e.value" :value="e.value" :label="e.label"></el-option>
        </el-select>
        <p>事件触发时，当前组件要修改的属性</p>
        <div v-for="(e, i) in item.style" :key="i" class="attr-container">
          <el-select v-model="e.key" @change="e.value = ''">
            <el-option v-for="attr in Object.keys(curComponent.style)" :key="attr" :value="attr" :label="styleMap[attr]"></el-option>
          </el-select>
          <el-color-picker v-if="isIncludesColor(e.key)" v-model="e.value" show-alpha></el-color-picker>
          <el-select v-else-if="selectKey.includes(e.key)" v-model="e.value">
            <el-option v-for="option in optionMap[e.key]" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
          <el-input v-else v-model.number="e.value" type="number" placeholder="请输入" />
          <el-icon @click="deleteData(index, i)">
            <CloseBold />
          </el-icon>
        </div>
        <el-button @click.stop="addAttr(index)">添加属性</el-button>
      </div>
      <el-button style="margin-bottom: 10px" @click="addComponent">添加组件</el-button>
      <p>过渡时间（秒）</p>
      <el-input v-model="linkage.duration" class="input-duration" placeholder="请输入"></el-input>
    </el-form>
  </el-collapse-item>
</template>

<script setup>
import { useCompnentsStore } from "@/store/componentStore.js";
import { isIncludesColor } from "@/utils/style.js";
import { findIndex } from "@/utils/utils";

import { styleMap, optionMap, selectKey } from "@/utils/attr";
import { ref, computed, onMounted } from "vue";
const eventOptions = [
  { label: "点击", value: "v-click" },
  { label: "悬浮", value: "v-hover" },
];
onMounted(() => {
  compnentsStore.curComponentData[0].linkage.targetId = compnentsStore.curComponentData[0].id;
});
const compnentsStore = useCompnentsStore();
const linkage = computed(() => {
  return compnentsStore.curComponentData[0].linkage;
});
const curComponent = computed(() => {
  return compnentsStore.curComponentData[0];
});

const componentData = computed(() => {
  return compnentsStore.componentData;
});

const oldOpacity = ref("");
const oldBackgroundColor = ref("");
const onEnter = (index) => {
  oldOpacity.value = componentData.value[index].style.opacity;
  oldBackgroundColor.value = componentData.value[index].style.backgroundColor;
  componentData.value[index].style.opacity = ".3";
  componentData.value[index].style.backgroundColor = "#409EFF";
};
const onOut = (index) => {
  componentData.value[index].style.opacity = oldOpacity.value;
  componentData.value[index].style.backgroundColor = oldBackgroundColor.value;
  oldOpacity.value = "";
  oldBackgroundColor.value = "";
};
const deleteLinkageData = (i) => {
  linkage.value.data.splice(i, 1);
};

const deleteData = (index, i) => {
  linkage.value.data[index].style.splice(i, 1);
};
const addAttr = (index) => {
  linkage.value.data[index].style.push({ key: "", value: "" });
};
const addComponent = () => {
  linkage.value.data.push({
    id: "", // 联动的组件 id
    label: "", // 联动的组件名称
    event: "", // 监听事件
    style: [{ key: "", value: "" }], // 监听的事件触发时，需要改变的属性
  });
};
</script>

<style lang="scss" scoped>
.linkage-container {
  .linkage-component {
    margin: 10px 0;
    border: 1px solid #ddd;
    padding: 10px;
    position: relative;
    padding-top: 24px;

    .div-guanbi {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 3px;
      color: #888;
      border: 1px solid #ddd;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 12px;
      }
    }
  }

  .el-select {
    margin-bottom: 10px;
  }

  .attr-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;

    .el-select {
      margin-bottom: 0;
    }

    & > div {
      width: 97px;
    }

    .icon-shanchu {
      cursor: pointer;
    }
  }
}
</style>
