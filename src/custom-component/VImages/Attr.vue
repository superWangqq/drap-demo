<template>
  <div class="attr-list">
    <CommonAttr></CommonAttr>
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="component.propValue.url" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import CommonAttr from "@/custom-component/common/CommonAttr.vue";
const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
});
</script>
