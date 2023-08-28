<script setup lang="ts">
import { ref } from "vue";
const active = ref(0);
</script>

<template>
  <div>
    <router-view />
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/class" icon="tv-o">班级</van-tabbar-item>
      <van-tabbar-item replace to="/exerciseLib" icon="records"
        >题库</van-tabbar-item
      >
      <van-tabbar-item replace to="/mine" icon="manager-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<style scoped></style>
