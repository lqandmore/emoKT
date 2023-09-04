<script setup lang="ts">
const props = defineProps({
  title: String,
  showType: Number,
  selected: Boolean,
  showCor: Boolean,
  index: Number
});

const image = ref("");

watch(
  () => props.showType,
  showType => {
    if (showType === 1) {
      image.value = "/src/assets/sku-select.png";
    } else if (showType === 2) {
      image.value = "/src/assets/sku-select-2.png";
    } else {
      image.value = "";
    }
  },
  { immediate: true }
);

const changeBackground = (select: Boolean, showLine: Boolean) => {
  // const leftEl = document.getElementsByClassName("left-cell")[props.index!];
  // const El = document.getElementsByClassName("shot-line")[0];
  // if (select) {
  //   El.style.opacity = 1;
  //   leftEl.style.background = `url(${image})`
  // } else if (showLine) {
  //   El.style.opacity = 0;
  //   leftEl.style.background = `url(${image})`
  // } else {
  //   El.style.opacity = 0;
  //   leftEl.style.background = ''
  // }
};

defineExpose({
  changeBackground,
  image
});
</script>

<template>
  <div class="left-cell" :style="{ 'background-image': 'url(' + image + ')' }">
    <div class="left-cell-title">{{ props.title }}</div>
    <div class="shot-line" :hidden="props.showType !== 1"></div>
  </div>
</template>

<style lang="scss" scoped>
.left-cell {
  background: url("@/assets/sku-select.png");
  background-size: 78px 60px;
}
</style>
