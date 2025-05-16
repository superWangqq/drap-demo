<template lang="">
  <div class="right-box" @click.stop>
    <section>
      <el-tabs v-if="compnentsStore.curComponentData.length > 0" v-model="activeName">
        <el-tab-pane label="属性" name="attr">
          <component :is="compnentsStore.curComponentData[0].component + 'Attr'" v-model:component="compnentsStore.curComponentData[0]" />
        </el-tab-pane>
        <!-- <el-tab-pane label="事件" name="events" style="padding-top: 20px">
        </el-tab-pane> -->
      </el-tabs>
      <CanvasAttr v-else></CanvasAttr>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import VButtonAttr from "../custom-component/VButton/Attr.vue";
import CanvasAttr from "./CanvasAttr.vue";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();
const activeName = ref("attr");
</script>
<style lang="scss" scoped>
.right-box {
  width: 300px;
  height: 100%;
  position: absolute;
  right: 0;
  padding-right: 20px;
  padding-left: 20px;
  top: 0;
}
</style>
