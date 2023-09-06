<script setup lang="ts">
const props = defineProps({
  title: String
});

const emit = defineEmits<{
  (event: "moreClick", title: string): void;
}>();
const btnClick = () => {
  emit("moreClick", props.title!);
};
</script>

<template>
  <div class="group-header">
    <span class="title">{{ props.title }}</span>
    <div class="more" @click="btnClick()">更多 ></div>
  </div>
</template>

<style scoped>
.title {
  font-size: 14px;
  font-weight: 900;
  line-height: 30px;
}
.more {
  height: 30px;
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;
  color: #999;
}

.group-header {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
</style>
