<script setup lang="ts">
import { CourseModel } from "../hooks/types";
import playGrayIcon from "@/assets/home/play-gray.png";

const props = defineProps({
  model: Object
});

const model = props.model as CourseModel;
//:src="'https://tu.test.duia.com/' + model.officialCoverUrl"
</script>

<template>
  <div class="course-item">
    <van-image
      fit="scale-down"
      radius="15px"
      src="https://tu.duia.com/contentPic/20230324/36600127-86de-4d83-b5e4-2e59961fd847.jpg"
    ></van-image>
    <div class="container">
      <div class="title">{{ model.title }}</div>
      <div class="detail">
        {{ `共${model.chapterNum}章${model.partNum}节` }}
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <van-icon :name="playGrayIcon" size="15px"></van-icon>
          <div>还未开始学习</div>
        </div>
        <div>{{ `${model.studentsNum}人学习` }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-item {
  position: relative;
  display: flex;
  width: 100%;
}

.van-image {
  position: absolute;
  left: 10px;
  width: calc(100% - 20px);
  height: 194px;
  z-index: 2;
}

.container {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  padding: 200px 10px 0 10px;
  .title {
    text-align: left;
  }
  .detail {
    font-size: 9px;
    margin: 10px 0;
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  margin-bottom: 20px;
  .bottom-left {
    display: flex;
    justify-content: space-between;
    .van-icon {
      margin-right: 5px;
    }
  }
}

.course-item::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}
</style>
