<script setup lang="ts">
const props = defineProps({
  imageUrl: String,
  title: String,
  isSelected: Boolean,
  imageTop: Boolean,
  imageLeft: Boolean,
  imageRight: Boolean,
  imageWidth: String,
  imageHeight: String,
  fontSize: Number,
  fontColor: String,
})

const imageStr = computed(() => {
  if (props.imageUrl.startWith('/src')) {
    return props.imageUrl;
  } else {
    return '/image' + props.imageUrl;
  }
})

</script>

<template>
  <div class="re-button" :class="{ 'image-top': imageTop, 'image-left': imageLeft, 'image-right': imageRight }">
    <van-image :width="props.imageWidth" :height="props.imageHeight ? props.imageHeight : props.imageWidth" fit="contain"
      position="center" :src="imageStr"></van-image>
    <div class="text">{{ title }}</div>
  </div>
</template>

<style scoped>
.re-button {
  display: inline-flex;
}

.image-top {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.image-left {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.image-right {
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}
</style>
