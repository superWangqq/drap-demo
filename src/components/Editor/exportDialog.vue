<template lang="">
  <el-dialog
    :title="compnentsStore.dialogVisibleTitle === 'import' ? '导入数据' : '导出数据'"
    :model-value="compnentsStore.dialogVisible"
    width="50%"
    @close="close"
  >
    <div>
      <el-input v-model="value" type="textarea" :rows="20" placeholder="请输入 JSON 数据"></el-input>
    </div>
    <div class="footer">
      <el-button @click.stop="close">取 消</el-button>
      <el-button v-show="compnentsStore.dialogVisibleTitle === 'import'" type="primary" @click.stop="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { useCompnentsStore } from "@/store/componentStore.js";
const compnentsStore = useCompnentsStore();
const value = ref("");
watch(
  () => compnentsStore.dialogVisible,
  (newval) => {
    if (newval) {
      if (compnentsStore.dialogVisibleTitle === "import") {
        value.value = "";
      } else {
        value.value = JSON.stringify(compnentsStore.componentData, null, 4);
      }
    }
  },
);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  title: {
    type: String,
    default: () => "",
  },
});
const close = () => {
  compnentsStore.setDialogVisible(false, "");
};

const confirm = () => {
  compnentsStore.setComponentData(value.value);
  compnentsStore.createSnapShot();
  compnentsStore.setDialogVisible(false, "");
};
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 30px;
  display: flex;
  justify-content: end;
}
</style>
