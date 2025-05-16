<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="通用样式" name="style">
      <el-form>
        <el-form-item v-for="({ key, label }, index) in styleKeys" :key="index" :label="label">
          <el-color-picker v-if="isIncludesColor(key)" v-model="curComponent.style[key]" show-alpha></el-color-picker>
          <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
            <el-option v-for="item in optionMap[key]" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input
            v-else-if="key == 'fontSize' && curComponent.component == 'VText'"
            v-model.number="curComponent.style[key]"
            type="number"
            @input="setFontSize(curComponent)"
          />
          <el-input v-else v-model.number="curComponent.style[key]" type="number" />
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap } from "@/utils/attr";
import { ref, computed } from "vue";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();
const activeName = ref("style");

const styleKeys = computed(() => {
  const curComponentStyleKeys = Object.keys(curComponent.value.style);
  return styleData.filter((item) => curComponentStyleKeys.includes(item.key));
});

const curComponent = computed(() => {
  if (compnentsStore.curComponentData.length > 0) {
    return compnentsStore.curComponentData[0];
  }
});

const isIncludesColor = (str) => {
  return str.toLowerCase().includes("color");
};
</script>

<style lang="scss">
.v-common-attr {
  .el-input-group__prepend {
    padding: 0 10px;
  }
}
</style>
