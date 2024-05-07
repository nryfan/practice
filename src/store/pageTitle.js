import {defineStore} from 'pinia';
import { useRouter } from "vue-router";

const router = useRouter();
// export const useTitleStore=defineStore({
//     id:'title',
//     state:()=>{
//       return {
//         // title:router.currentRoute.value.matched[router.currentRoute.value.matched.length-1].meta.title
//       }
//     },
//     actions:{
      
//     },
//     getters:{
      
//     }   
//   })