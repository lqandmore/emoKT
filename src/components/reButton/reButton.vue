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
  imageRedius: String,
  fontSize: String,
  fontColor: String
});

const imageStr = computed(() => {
  if (props.imageUrl?.startsWith("/src")) {
    return props.imageUrl;
  } else {
    return "https://tu.test.duia.com/" + props.imageUrl;
  }
});
</script>

<template>
  <div
    class="re-button"
    :class="{
      'image-top': imageTop,
      'image-left': imageLeft,
      'image-right': imageRight
    }"
  >
    <van-image
      :width="props.imageWidth"
      :height="props.imageHeight ? props.imageHeight : props.imageWidth"
      fit="contain"
      position="center"
      :src="imageStr"
      :radius="imageRedius"
    ></van-image>
    <div class="text" :style="{ 'font-size': fontSize, color: fontColor }">
      {{ title }}
    </div>
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
.text {
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-align: center;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>
