<template lang="">
  <div class="left-box" @dragstart="handleDragStart">
    <div class="left-content">
      <div v-for="(item, index) in componentList" :key="index" class="list" :draggable="true" :data-index="index">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script setup>
import componentList from "@/custom-component/component-list.js";
const handleDragStart = (e) => {
  e.dataTransfer.setData("index", e.target.dataset.index);
  // e.dataTransfer.effectAllowed = 'move'; // 允许移动
};
</script>
<style lang="scss" scoped>
.left-box {
  width: 200px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #ccc;
}

.left-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}

.list {
  width: 80px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 60px;
  text-align: center;
  cursor: grabbing;
  margin-top: 20px;
}
</style>
