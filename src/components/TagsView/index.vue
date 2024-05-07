<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper" :tag-refs="tagRefs">
      <router-link
        ref="tagRefs"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :style="{
          backgroundColor: isActive(tag) ? '#409eff' : '',
          borderColor: isActive(tag) ? '#fff' : '',
        }"
        v-for="(tag, index) in tagsStore.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}
        <template v-if="!isAffiix(tag)">
          <Close
            @click.prevent.stop="onCloseClick(index, tag)"
            class="el-icon-close"
          />
        </template>
      </router-link>
    </ScrollPane>
    <ContextMenu 
    v-show="visible"
        :style="menuStyle"
        :index="selectIndex"/>
  </div>
</template>

  <script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTagsStore } from "@/store/tagsview.js";
import ScrollPane from "./ScrollPane.vue";
import ContextMenu from './ContextMenu.vue'
const tagsStore = useTagsStore();

const router = useRouter();
const route = useRoute();

const tagRefs = ref([])
/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path;
};
const isAffiix = (tag) => {
  return tag.meta && tag.meta.affix;
};
// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})
/**
 * 展示 menu
 */
 const openMenu = (e, index) => {
    console.log(e,111);
  const {x, y} = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

const onCloseClick = (index, tag) => {
    tagsStore.removeTagsView( {
  type: 'index',
  index: index
})

//如果删除的是当前页面，自动定位到上一个页面
if (isActive(tag)) {
  let tagsViewList = tagsStore.tagsViewList
  if (index == 0 && tagsViewList.length >= 1) {
    let pre_index = 0
    let pre_page = tagsViewList[pre_index]
    router.push(pre_page.fullPath)
  } else if (tagsViewList.length == 0) {//如果是最后一个，定位到首页
    router.push('/')
  } else {
    let pre_index = index - 1
    let pre_page = tagsViewList[pre_index]
    router.push(pre_page.fullPath)
  }


}
}

/**
 * 关闭 menu
 */
 const closeMenu = () => {
  visible.value = false
}
/**
 * 监听变化
 */
 watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
},
    {
      immediate: true
    })
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  a {
    text-decoration: none;
  }
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius: 3px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      color: #fff;

      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    // close 按钮
    .el-icon-close {
      height: 1em;
      width: 1em;
      line-height: 10px;
      vertical-align: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #979799a4;
        color: #fff;
      }
    }
  }
}
</style>

