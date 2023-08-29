<script setup lang="ts">
import { useAppStoreHook } from "./store/app";
const active = ref(0);
const computedSelect = () => {
  return useAppStoreHook().getCurrentSku !== 0;
};


</script>

<template>
  <RouterView />
  <template v-if="computedSelect()">
    <van-tabbar fixed route v-model="active">
      <van-tabbar-item replace to="/:skuId" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/class" icon="tv-o">班级</van-tabbar-item>
      <van-tabbar-item replace to="/exerciseLib" icon="records">题库</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </template>
</template>

<style scoped></style>
