<script setup lang="ts">
import { requestOpenLives } from "./hooks";
import { useRoute } from "vue-router";
import { useAppStoreHook } from "@/store/app";

async function requestDatas() {
  try {
    const data = await requestOpenLives();
    console.log(data);
  } catch (error: any) {
    console.log(error);
  }
}

onMounted(() => {
  requestDatas();
});
</script>

<template>
  <van-nav-bar
    :title="useAppStoreHook().currentSkuName"
    left-text="分类"
    right-text="咨询"
    class="top"
  />
</template>

<style scoped>
.van-nav-bar {
  --van-nav-bar-text-color: var(--primary-theme-color);
}
</style>
