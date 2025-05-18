<template lang="">
  <div class="main">
    <leftBox></leftBox>
    <Editor></Editor>
    <rightBox></rightBox>
    <previewDialog></previewDialog>
  </div>
</template>
<script setup>
import leftBox from "./left-box.vue";
import rightBox from "./right-box.vue";
import Editor from "./Editor/index.vue";
import previewDialog from "./previewDialog";
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  height: calc(100vh - 66px);
}
</style>
