<script setup lang="ts">
import { LiveModel } from '../hooks/types'

const props = defineProps({
  model: Object,
})

const livemodel = props.model as LiveModel
const timeStr = computed(() => {
  return livemodel.startTime + "-" + livemodel.endTime
})

const isPlayBack = computed(() => {
  return livemodel.status === 2
})
</script>

<template>
  <div class="live-item">
    <div class="left">
      <div class="tag-time">
        <span class="tag" :class="isPlayBack ? 'playback' : 'live'"></span>
        <span class="time">{{ timeStr }}</span>
      </div>
      <div class="title">{{ livemodel.title }}</div>
      <div class="subscribe">{{ `${livemodel.subscribeNum}预约` }}</div>
    </div>
    <div class="right">
      <van-image class="mask-image" src="/src/assets/home/live-mengceng.png"></van-image>
      <van-image class="teacher" :src="'/image' + livemodel.teacherUrl"></van-image>
      <van-image class="status-button" src="/src/assets/home/subscribe.png"></van-image>
    </div>
  </div>
</template>

<style scoped>
.live-item {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: baseline;

  .tag-time {
    margin-top: 15px;
    display: flex;
    justify-content: center;

    .time {
      padding: 0 5px;
      font-size: 12px;
      line-height: 20px;
    }

    .tag {
      display: inline-block;
      width: 40px;
      height: 20px;
      background-size: 40px 20px;
      border-bottom-right-radius: 10px;
      border-top-left-radius: 10px;

    }
  }

  .title {
    display: -webkit-box;
    margin: 15px 10px;
    font-size: 16px;
    font-weight: 900;
    width: 200px;
    overflow: hidden;
    text-align: left;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;

    -webkit-box-orient: vertical;
  }

  .subscribe {
    font-size: 12px;
    margin-bottom: 15px;
  }
}


.live {
  background-image: url('/src/assets/home/tag-live.png');
}

.playback {
  background-image: url('/src/assets/home/tag-playback.png');
}

.right {
  position: relative;
  width: 107px;
  height: 133px;
}


.mask-image {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 31px;
  height: 133px;
}

.teacher {
  float: left;
  width: 107px;
  height: 133px;
}

.status-button {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 99px;
  height: 30px;
  z-index: 3;
}
</style>
