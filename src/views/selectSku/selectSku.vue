<script setup lang="ts">
import { useAppStoreHook } from "@/store/app";
import router from "@/router";

const selectSku = () => {
  useAppStoreHook().changeCurrentSku(8);
  router.push({ path: "/" });
};
</script>

<template>
  <div>
    <van-button type="primary" @click="selectSku()">主要按钮</van-button>
  </div>
</template>

<style scoped></style>
