<script setup lang="ts">
import "@/style/index.scss"
const props = defineProps({
  title: String,
  select: Boolean,
  previous: Boolean,
  index: Number
});


</script>

<template>
  <div class="left-cell" :class="{ 'left-cell-select': select, 'previous-select': previous }">
    <div class="left-cell-title">{{ props.title }}</div>
    <div class="shot-line" :class="{ 'bg-active': select }"></div>
  </div>
</template>

<style lang="scss" scoped>
.left-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: left bottom;
}

.left-cell-select {
  background-image: url("@/assets/sku-select.png");
  background-size: 100% 100%;
}

.previous-select {
  background-image: url("@/assets/sku-select-2.png");
  background-size: 4.04rem 0.81rem;
}

.left-cell-title {
  width: 100%;
  text-align: center;
  font-size: 14px;
}

.shot-line {
  width: 20px;
  height: 2px;
  background: #fff;
}

.bg-active {
  background: #47c88a;
}
</style>
