<script setup lang="ts">
import logo from "@/components/logo.vue";

import { datas } from "./hooks"

</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header class="header">
        <logo class="logo" />
        <div class="menu">
          <template v-for="(item) in datas" :key="item.id">
            <el-link :to="item.path">{{ item.name }}</el-link>
          </template>
        </div>

        <div class="rightModule">
          <el-link class="hehuoren"></el-link>
          <el-link>登录</el-link>
          <el-link>注册</el-link>
        </div>

      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-color: #fff;
  color: #fff;
}

.container {
  height: 100vh;
  width: 100vw;
}

.logo {
  margin-left: 25px;
  width: 215px;
  height: 60px;
}

.hehuoren {
  width: 70px;
  height: 60px;
  background-image: url(assets/hehuoren.png);
  background-size: 70px 60px;
}
</style>
