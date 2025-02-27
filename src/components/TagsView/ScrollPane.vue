<template>
    <div class="scroll-container">
      <el-icon class="arrow left" @click="scrollTo('left')">
        <ArrowLeft />
      </el-icon>
      <el-scrollbar ref="scrollbarRef" @wheel.passive="wheelScroll" @scroll="scroll">
        <div ref="scrollbarContentRef" class="scrollbar-content">
          <slot />
        </div>
      </el-scrollbar>
      <el-icon class="arrow right" @click="scrollTo('right')">
        <ArrowRight />
      </el-icon>
    </div>
      
    <!-- <div style="position: absolute;">{{ tagRefs }}</div> -->
  </template>

  <script setup>
  import {nextTick, onMounted, ref,watch} from 'vue'
  import { useRouter, useRoute } from "vue-router";

  const route=useRoute()
  const props=defineProps({
    tagRefs:Array
  })
  /** 滚动条组件元素的引用 */
const scrollbarRef = ref()
/** 滚动条内容元素的引用 */
const scrollbarContentRef = ref()

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0
/** 每次滚动距离 */
const translateDistance = 200

/** 滚动时触发 */
const scroll = ({ scrollLeft }) => {
  currentScrollLeft = scrollLeft
}
/** 鼠标滚轮滚动时触发 */
const wheelScroll = ({ deltaY }) => {
  if (/^-/.test(deltaY.toString())) {
    scrollTo("left")
  } else {
    scrollTo("right")
  }
}
/** 获取可能需要的宽度 */
const getWidth = () => {
  /** 可滚动内容的长度 */
  const scrollbarContentRefWidth = scrollbarContentRef.value.clientWidth
  /** 滚动可视区宽度 wrapRef滚动条包装元素 */
  const scrollbarRefWidth = scrollbarRef.value.wrapRef.clientWidth
  /** 最后剩余可滚动的宽度 */
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft

  return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance }
}
/** 左右滚动 */
const scrollTo = (direction, distance = translateDistance) => {
  let scrollLeft = 0
  const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } = getWidth()
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - distance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value.setScrollLeft(scrollLeft)
}

/** 移动到目标位置 */
const moveTo = () => {
  const tagRefs = props.tagRefs
  for (let i = 0; i < tagRefs.length; i++) {
    if (route.path === tagRefs[i].to.path) {
      const el = tagRefs[i].$el
      const offsetWidth = el.offsetWidth
      const offsetLeft = el.offsetLeft
      const { scrollbarRefWidth } = getWidth()
      // 当前 tag 在可视区域左边时
      if (offsetLeft < currentScrollLeft) {
        const distance = currentScrollLeft - offsetLeft
        scrollTo("left", distance)
        return
      }
      // 当前 tag 在可视区域右边时
      const width = scrollbarRefWidth + currentScrollLeft - offsetWidth
      if (offsetLeft > width) {
        const distance = offsetLeft - width
        scrollTo("right", distance)
        return
      }
    }
  }
}

watch(route,(newVal)=>{
    nextTick(()=>{
        moveTo()
    })
})
onMounted(()=>{
})
</script>
  
  <style lang="scss" scoped>
  .scroll-container {
    height: 100%;
    user-select: none;
    display: flex;
    justify-content: space-between;
    .arrow {
      width: 40px;
      height: 100%;
      cursor: pointer;
      &.left {
        box-shadow: 5px 0 5px -6px #ccc;
      }
      &.right {
        box-shadow: -5px 0 5px -6px #ccc;
      }
    }
    .el-scrollbar {
      flex: 1;
      // 防止换行（超出宽度时，显示滚动条）
      white-space: nowrap;
      .scrollbar-content {
        display: inline-block;
      }
    }
    .screenfull {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  </style>
  