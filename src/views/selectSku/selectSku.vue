<script setup lang="ts">
import { useAppStoreHook } from "@/store/app";
import router from "@/router";
import { requestSkuData, Colleges } from "./hooks";
import collectionCell from "@/components/collection/collectionCell.vue";
import collectionGroup from "@/components/collection/collectionGroup.vue";
import leftCell from "./leftCell.vue";

// const selectSku = () => {
//   useAppStoreHook().changeCurrentSku(8);
//   router.push({ path: "/8" });
// };

const vnodesRef = Array<Ref<typeof leftCell | null>>();

const collegesArr = ref(Array<Colleges>());
async function requestData() {
  try {
    const { colleges } = await requestSkuData();
    collegesArr.value = colleges;
    colleges.forEach(() => {
      const childRef = ref<typeof leftCell | null>(null);
      vnodesRef.push(childRef);
    });
  } catch (error: any) {
    console.log(error);
  }
}

const selectIndex = ref(0);

requestData();

const leftClick = (index: number) => {
  const leftItems = document.getElementsByClassName("left-cell");
  const preItem = leftItems[selectIndex.value];
  // preItem.changeBackground(true, true);

  const El = document.getElementsByClassName("collegeTitle")[index];
  El.scrollIntoView({ behavior: "smooth" });

  console.log(typeof vnodesRef[index].value);
  vnodesRef[index].value?.changeBackground(true, true);
};

function getTopVisibleElement(): Element | null {
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

function handleScroll() {
  const topVisibleElement = getTopVisibleElement();
  let attrs = selectIndex.value;
  if (typeof topVisibleElement?.getAttribute("index") === "string") {
    attrs = parseInt(topVisibleElement?.getAttribute("index")!);
  }

  if (selectIndex.value !== attrs) {
    selectIndex.value = attrs;
  }
}

window.addEventListener("scroll", handleScroll);
</script>

<template>
  <div class="select">
    <van-nav-bar title="对啊课堂 分类" class="top" />
    <div class="left">
      <template v-for="(college, index) in collegesArr" :key="college.id">
        <left-cell
          :title="college.name"
          :selected="selectIndex === index"
          :show-cor="selectIndex > 1 && selectIndex - 1 === index"
          :index="index"
          @click="leftClick(index)"
          :ref="vnodesRef[index]"
        >
        </left-cell>
      </template>
    </div>

    <div class="container">
      <div class="list">
        <template v-for="(college, index) in collegesArr" :key="college.id">
          <collection-group
            :title="college.name"
            :index="index"
            class="collegeTitle"
          >
            <template v-for="sku in college.skus" :key="sku.id">
              <collection-cell
                :title="sku.name"
                :image-url="sku.unchecked_sku_img_url"
              ></collection-cell>
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
.top {
  position: fixed;
  width: 100vw;
  height: 60px;
}
.left {
  position: fixed;
  margin-top: 60px;
  width: 78px;

  .left-cell {
    padding: 0;
    height: 60px;
  }
}

.container {
  position: relative;
  padding: 60px 0 0 78px;
  width: calc(100vw - 78px);
}
.list {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgb(246, 246, 246);
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
