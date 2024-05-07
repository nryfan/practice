<template>
  <div class="common-layout">
    <el-container class="container_outer">
      <el-aside width="240px" class="container_aside">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          expand-close-icon
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/" class="title_text">
            <template #title>XXX管理系统</template>
          </el-menu-item>
          <el-scrollbar :max-height="computedHeight">
            <el-menu-item index="/home/index">
              <el-icon><House /></el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <el-sub-menu index="/home/demo/one" class="el-sub1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>父菜单</span>
              </template>
              <el-menu-item index="/home/demo/one">子菜单1</el-menu-item>
              <el-menu-item index="/home/demo/two">子菜单2</el-menu-item>
              <el-menu-item index="/home/demo/three">子菜单3</el-menu-item>
              <el-menu-item index="/home/demo/four">子菜单4</el-menu-item>
              <el-menu-item index="/home/demo/five">子菜单5</el-menu-item>
              <el-menu-item index="/home/demo/six">子菜单6</el-menu-item>
              <el-menu-item index="/home/demo/seven">子菜单7</el-menu-item>
              <el-menu-item index="/home/demo/eight">子菜单8</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/home/other">
              <el-icon><Setting /></el-icon>
              <template #title>其他</template>
            </el-menu-item>
            <el-menu-item index="/home/menu-1">
              <el-icon><Setting /></el-icon>
              <template #title>菜单1</template>
            </el-menu-item>
            <el-menu-item index="/home/menu-2">
              <el-icon><Setting /></el-icon>
              <template #title>菜单2</template>
            </el-menu-item>
          </el-scrollbar>
        </el-menu>
      </el-aside>
      <el-container class="container_inner">
        <el-header class="header">
          <div class="header-left">
            <el-radio-group v-model="isCollapse">
              <el-radio-button :label="false" v-if="isCollapse"
                ><el-icon><Expand /></el-icon
              ></el-radio-button>
              <el-radio-button :label="true" v-else
                ><el-icon><Fold /></el-icon
              ></el-radio-button>
            </el-radio-group>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="item in routers"
                :key="item.path"
                :to="{
                  path: item?.path == '/home' ? '/home/index' : item?.path,
                }"
                >{{ item.meta.title }}</el-breadcrumb-item
              >
              <!-- <el-breadcrumb-item>首页</el-breadcrumb-item> -->
            </el-breadcrumb>
          </div>

          <div class="header_right">
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="bottom"
            >
            <template #content>
              {{ isFullscreen?'退出全屏':'全屏' }}
            </template>
            <div class="header-btn" @click="onToggle">
            <el-icon><FullScreen /></el-icon>
            </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="bottom"
            >
              <template #content>
                {{ isShowIcon ? "暗黑模式" : "明亮模式" }}
              </template>
              <div class="header-btn" v-if="isShowIcon" @click="changeTheme">
                <el-icon><Moon /></el-icon>
              </div>
              <div class="header-btn" v-else @click="changeTheme">
                <el-icon><Sunny /></el-icon>
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="刷新"
              placement="bottom"
            >
              <div class="header-btn">
                <el-icon @click="refrush"><RefreshRight /></el-icon>
              </div>
            </el-tooltip>
            <el-dropdown>
              <el-button type="primary">
                管理员<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item> -->
                  <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <div class="header-tags">
          <TagsView />
        </div>
        <el-main>
          <!-- <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="name" label="名称" width="200" />
                        <el-table-column prop="type" label="型号" width="200" />
                        <el-table-column prop="lastTime" label="最后返回时间" width="200"/>
                        <el-table-column prop="status" label="状态" width="200"/>
                        <el-table-column prop="look" label="操作" > 
                            <template #default="scope">
                                <el-button type="primary" size="small" @click="look(scope.$index, scope.row)">
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted,onUnmounted, computed, ref, watch } from "vue";
import { House, Setting, ArrowLeft } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useTagsStore } from "@/store/tagsview.js";
import { useRouter, useRoute } from "vue-router";
import TagsView from "@/components/TagsView/index.vue";
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)
// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

const router = useRouter();
const route = useRoute();

const tagsStore = useTagsStore();
// console.log(useStore);
const isCollapse = ref(false);
let title = ref("");
const routers = ref([]);
// console.log(router.currentRoute.value.matched);

const isShowIcon = ref(false);
const handleOpen = (key, keyPath) => {
  console.log("🚀 ~ file: Home.vue:108 ~ handleOpen ~ key:", key);

  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const quit = () => {
  //     ElMessageBox.alert('确定退出?', '提示', {
  //     confirmButtonText: 'OK',
  //     center: true,
  //     callback: (action) => {
  //       ElMessage({
  //         type: 'info',
  //         message: `action: ${action}`,
  //       })
  //       localStorage.clear();
  //     router.replace("/login");
  //     },
  //   })

  ElMessageBox.confirm("确定退出?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    //   type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "退出成功",
      });
      localStorage.clear();
      router.replace("/login");
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
};

const computedHeight = computed(() => {
  return `calc(100vh - 50px)`;
});
/**
 * 生成 title
 */
const getTitle = (route) => {
  let title = "";
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split("/");
    title = pathArr[pathArr.length - 1];
  } else {
    title = route.meta.title;
  }
  return title;
};

const getBreadcrumbData = () => {
  routers.value = route.matched.filter((item) => item.meta && item.meta.title);
};

watch(
  route,
  (to) => {
    getBreadcrumbData();
    const { fullPath, meta, name, params, path, query } = to;
    tagsStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  }
);

const activeMenu = computed(() => {
  const { path } = route;
  return path;
});

const changeTheme = () => {
  isShowIcon.value = !isShowIcon.value;
  const body = document.documentElement;
  if (isShowIcon.value) body.setAttribute("class", "dark");
  else body.setAttribute("class", "");
};
onMounted(() => {
  screenfull.on('change', change)
});
// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
const refrush = () => {
  router.go(0);
};
computed(() => {});
</script>


<style lang="less" scoped>
.left-header {
  text-align: center;
  height: 55px;
  line-height: 55px;
  font-size: 24px;
}
.fold {
  font-size: 25px;
}
.common-layout {
  height: 100%;
}
.header {
  height: 50px;
}
.header_right,
.header-left {
  display: flex;
  align-items: center;
  .header-btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
      color: #62a5e8;
    }
  }
}
:deep(.el-sub-menu__title) {
  color: white;
}
:deep(.el-sub-menu__title:hover) {
  background: rgb(33, 34, 35);
}
:deep(.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title) {
  color: #a0cfff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
ul.el-menu.el-menu--vertical.el-menu-vertical-demo,
.el-menu-item {
  background: rgb(44, 43, 43);
}
li.el-menu-item,
.el-sub-menu__title {
  color: white;
}
li.el-menu-item:hover,
.el-sub-menu__title:hover {
  background: rgb(33, 34, 35);
}
.title_text {
  justify-content: center;
  cursor: auto;
  font-size: 22px;
  height: 56px;
  line-height: 56px;
}
.title_text:hover {
  background: black !important;
}
.el-radio-button:first-child:last-child .el-radio-button__inner {
  border: 0;
}
span.el-radio-button__inner {
  font-size: 25px;
}
.el-dropdown {
  margin-left: 8px;
}
.header_right .el-button--primary {
  background: white;
  color: black;
  border: 0;
}
.el-page-header__header {
  margin-bottom: 10px;
}
.el-breadcrumb {
  margin-left: 12px;
}
.el-menu-item.is-active {
  color: #a0cfff !important;
}
</style>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  /* padding:0 22px; */
  background: rgb(44, 43, 43);
  color: white;
  width: auto;
  overflow: hidden;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gainsboro;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
ul.el-menu.el-menu--vertical.el-menu-vertical-demo,
.el-menu-item {
  background: rgb(44, 43, 43);
}
li.el-menu-item,
.el-sub-menu__title {
  color: white;
}
li.el-menu-item:hover,
.el-sub-menu__title:hover {
  background: rgb(33, 34, 35);
}
.title_text {
  justify-content: center;
  cursor: auto;
  font-size: 22px;
  height: 56px;
  line-height: 56px;
}
.title_text:hover {
  background: black !important;
}
.el-radio-button:first-child:last-child .el-radio-button__inner {
  border: 0;
}
span.el-radio-button__inner {
  font-size: 25px;
}
.el-dropdown {
  margin-left: 8px;
}
.header_right .el-icon {
  cursor: pointer;
}
.header_right .el-button--primary {
  background: white;
  color: black;
  border: 0;
}
.el-page-header__header {
  margin-bottom: 10px;
}
.el-breadcrumb {
  margin-left: 12px;
}
.el-menu-item.is-active {
  color: #a0cfff !important;
}
</style>
<style lang="scss" scoped>
.el-menu--collapse .el-menu-item span,
.el-menu--collapse .el-sub-menu .el-sub-menu__title span,
.el-menu--collapse
  .el-menu-item-group
  ul
  .el-sub-menu
  .el-sub-menu__title
  span {
  width: 0;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>

<style lang="scss">
.el-menu--collapse {
  .el-sub1 {
    .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }
}
</style>
