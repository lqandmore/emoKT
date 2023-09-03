<script setup lang="ts">


const props = defineProps({
  title: String,
  selected: Boolean,
  showCor: Boolean,
});


const changeBackground = (select: Boolean, showCor: Boolean) => {
  // if (select) {
  //   const El = document.getElementsByClassName("shot-line")[0];
  //   El.style.opacity = 0;
  // }
    console.log(111111);

};

defineExpose({
  changeBackground,
})


const image = ref(
  props.selected
    ? "/src/assets/sku-select.png"
    : props.showCor
    ? "/src/assets/sku-select-2.png"
    : ""
);

</script>

<template>
  <div class="left-cell" :style="{ 'background-image': 'url(' + image + ')' }" >
    <div class="left-cell-title">{{ props.title }}</div>
    <div class="shot-line" :hidden="!selected"></div>
  </div>
</template>

<style lang="scss" scoped>
.left-cell {
  background: url("@/assets/sku-select.png");
  background-size: 78px 60px;
}
</style>
