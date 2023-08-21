<script setup lang="ts">
import { RouterLink } from "vue-router";
const url = 'https://common.duia.com/resource/img/common/t-logo.svg'
const fit = 'fill'

</script>

<template>
  <div class="logo">
    <RouterLink to="/home">
      <el-image style="width: 215; height: 60px" :src="url" :fit="fit" />
    </RouterLink>
  </div>
</template>

<style scoped></style>
