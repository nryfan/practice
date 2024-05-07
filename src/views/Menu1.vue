<template>
    <div>
      <el-pagination :total="100" />
    </div>
  </template>
  
  <script setup>
  import {ref,reactive, onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  
  const router=useRouter()
  
  onMounted(()=>{
  
  })
  </script>
  
  <style >
  
  </style>