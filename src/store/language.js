import {defineStore} from 'pinia';

export const useLanguageStore=defineStore({
    id:'language',
    state:()=>{
      return {
        language:'zh-cn'
      }
    },
    actions:{
      setLanguage(type){
        this.language=type
      }
    },
    getters:{
      
    }   
  })