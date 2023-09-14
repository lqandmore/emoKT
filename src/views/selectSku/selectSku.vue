<script setup lang="ts">
import { requestSkuData, Colleges, Sku } from "./hooks";
import collectionCell from "@/components/collection/collectionCell.vue";
import collectionGroup from "@/components/collection/collectionGroup.vue";
import leftCell from "./leftCell.vue";
import router from "@/router";
import { useAppStoreHook } from "@/store/app";

const props = defineProps({
  needClose: Boolean
});

const emit = defineEmits<{
  (event: 'dismiss', changed: boolean): void
  (event: 'skuChanged'): void
}>()

const collegesArr = ref(Array<Colleges>());
let scrollEndTimer: any;
const selectIndex = ref(0);
let isClick = false;
let bannerRef = ref("");
const back = () => {
  emit("dismiss", false);
};

async function requestData () {
  try {
    const { banner, colleges } = await requestSkuData();
    collegesArr.value = colleges;
    bannerRef.value = "http://tu.test.duia.com/" + banner;
  } catch (error: any) {
    console.log(error);
  }
}

onMounted(() => {
  requestData();
});

const leftClick = (index: number) => {
  isClick = true;
  setTimeout(callback, 100);
  selectIndex.value = index;
  const El = document.getElementsByClassName("collegeTitle")[index];
  El.scrollIntoView({ behavior: "smooth" });
};

function getTopVisibleElement (): Element | null {
  const boxes = document.querySelectorAll(".collegeTitle");

  let topElement = null;
  let minDistance = Infinity;

  boxes.forEach(box => {
    const rect = box.getBoundingClientRect();
    const distance = Math.abs(rect.top);
    if (distance < minDistance) {
      minDistance = distance;
      topElement = box;
    }
  });

  return topElement;
}

const callback = () => {
  isClick = false;
};


const onscroll = () => {

  const topVisibleElement = getTopVisibleElement();
  let attrs = selectIndex.value;
  if (typeof topVisibleElement?.getAttribute("index") === "string") {
    attrs = parseInt(topVisibleElement?.getAttribute("index")!);
  }
  if (!isClick) {
    if (selectIndex.value !== attrs) {
      selectIndex.value = attrs;
    }
  }

  clearTimeout(scrollEndTimer);
  scrollEndTimer = setTimeout(callback, 100);
};

const bannerClick = () => {
  console.log("选择分类页banner");
};

const collectionCellClick = (sku: Sku, index: number, skuIndex: number) => {
  useAppStoreHook().setSku(sku);
  useAppStoreHook().savePosition(index, skuIndex)

  if (props.needClose) {
    emit("dismiss", false);
    emit("skuChanged");
  } else {
    router.push({ path: `/${sku.skuId}` });
  }
};

const skuSelect = (x: number, y: number) => {
  return (
    useAppStoreHook().collageIndex === x && useAppStoreHook().skuIndex === y
  );
};
</script>

<template>
  <div class="select-sku">
    <van-nav-bar title="对啊课堂 分类" class="top" :left-arrow="props.needClose" fixed @click-left="back" />
    <div class="left">
      <template v-for="(college, index) in collegesArr" :key="college.id">
        <left-cell :title="college.name" :select="selectIndex === index"
          :previous="selectIndex > 0 && selectIndex - 1 === index" :index="index" @click="leftClick(index)">
        </left-cell>
      </template>
    </div>

    <div class="container" @scroll="onscroll">
      <van-image class="banner" :src="bannerRef" @click="bannerClick()"></van-image>
      <div class="list">
        <template v-for="(college, index) in collegesArr" :key="college.id">
          <collection-group class="collegeTitle" :title="college.name" :index="index">
            <template v-for="(sku, skuIndex) in college.skus" :key="sku.id">
              <collection-cell :title="sku.name" :image-url="sku.unchecked_sku_img_url"
                :is-selected="skuSelect(index, skuIndex)"
                @click="collectionCellClick(sku, index, skuIndex)"></collection-cell>
            </template>
          </collection-group>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .select {
  display: flex;
  flex-direction: column;
  height: 100vh;
} */
.select-sku {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: 100vw 100vh;
  background-color: #fff;
}

.top {
  position: fixed;
  width: 100vw;
  height: 60px;
}

.left {
  position: fixed;
  margin-top: 60px;
  width: 78px;
  z-index: 2;

  .left-cell {
    padding: 0;
    height: 60px;
  }
}

.container {
  position: absolute;
  left: 78px;
  top: 68px;
  width: calc(100vw - 78px);
  height: calc(100vh - 60px);
  /* overflow: hidden; */
  overflow-y: scroll;
}

.banner {
  width: calc(100vw - 88px);
  height: 100px;
}

.list {
  display: flex;
  flex-direction: column;
  background-color: rgb(246, 246, 246);
}

.list::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}

.right {
  flex-grow: 1;
}

.collegeTitle {
  /* text-align: left; */
  display: flex;
  flex-direction: column;
  background-color: transparent;
  opacity: 1;
  margin-left: 0.8rem;
}

.skucell {
  width: 100px;
  height: 100px;
}
</style>
