<script setup lang="ts">

const props = defineProps({
  title: String,
  selected: Boolean,
  showCor: Boolean
})

const changeBackground = (select: Boolean, showCor: Boolean) => {
  if (select) {
    const El = document.getElementsByClassName("shot-line")
    // El
  }
}

</script>

<template>
  <div class="left-cell">
    <div class="left-cell-title">{{ props.title }}</div>
    <div class="shot-line"></div>
  </div>
</template>

<style lang="scss" scoped></style>
