<template>
    <el-config-provider :locale="locale">
    <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
</el-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import {useLanguageStore} from '@/store/language.js'
import {useTagsStore} from '@/store/tagsview.js'

const tagsStore=useTagsStore()
const uselanguage=useLanguageStore()
const locale = computed(() => (uselanguage.language === 'zh-cn' ? zhCn : en))
const cachedViews = computed(() => {
    // console.log(tagsStore.tagsViewList.map((x) => x.name),224)
    return  tagsStore.tagsViewList.map((x) => x.name)
  })
</script>

<style >
#app{
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
}
</style>
