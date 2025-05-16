<template lang="">
  <div class="main">
    <leftBox></leftBox>
    <Editor></Editor>
    <rightBox></rightBox>
  </div>
</template>
<script setup>
import leftBox from "./left-box.vue";
import rightBox from "./right-box.vue";
import Editor from "./Editor/index.vue";
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  height: calc(100vh - 66px);
}
</style>
