import { defineStore } from 'pinia';
import { getItem, setItem } from '@/utils/storage.js'

export const useTagsStore = defineStore({
    id: 'tagsView',
    state: () => {
        return {
            tagsViewList: getItem('tagsView') || []
        }
    },
    actions: {
        /**
   * 添加 tags
   */
        addTagsViewList(tag) {
            const isFind = this.tagsViewList.find(item => {
                return item.path === tag.path
            })
            // 处理重复
            if (!isFind) {
                this.tagsViewList.push(tag)
                setItem('tagsView', this.tagsViewList)
            }
        },

        // 删除 tag
        removeTagsView(payload) {
            if (payload.type === 'index') {
                this.tagsViewList.splice(payload.index, 1)
            } else if (payload.type === 'other') {
                this.tagsViewList.splice(
                    payload.index + 1,
                    this.tagsViewList.length - payload.index + 1
                )
                this.tagsViewList.splice(0, payload.index)
                if (payload.index != 0) {
                    //list第一位加入删除了的首页tag
                    this.tagsViewList.unshift({
                        fullPath: '/home/index',
                        meta: { title: '首页', affix: true },
                        name: 'index',
                        params: {},
                        path: '/home/index',
                        query: {},
                        title: "首页"
                    })
                }
            } else if (payload.type === 'right') {
                this.tagsViewList.splice(
                    payload.index + 1,
                    this.tagsViewList.length - payload.index + 1
                )
            } else if (payload.type === 'all') {
                this.tagsViewList = []
            }
            setItem('tagsView', this.tagsViewList)
        },

    },
    getters: {

    }
})