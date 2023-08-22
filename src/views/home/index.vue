<script setup lang="ts">

import { requestLiveData } from './hooks';

 requestLiveData();

</script>

<template>
  <div class="common-layout">
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </div>
</template>

<style scoped></style>
