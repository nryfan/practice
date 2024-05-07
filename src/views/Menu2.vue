<template>
    <div>
      <el-button type="primary" @click="showDiag">Primary</el-button>
     <!-- <textarea ref="textarea">11</textarea> -->
    </div>

    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.name" autocomplete="off" /> -->
        <textarea ref="textarea">11</textarea>
      </el-form-item>
      
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
  </template>
  
  <script setup>
  import { nextTick } from 'process';
import {ref,reactive, onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  
  const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
  const router=useRouter()
  const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
  let textarea=ref(null)

  const showDiag=()=>{
    dialogFormVisible.value=true
    nextTick(()=>{
    console.log(textarea.value);
      textarea.value.addEventListener('input', (e) => {
        textarea.value.style.height = '20px';
        textarea.value.style.height = e.target.scrollHeight + 'px';
    });
    })
    
  }
  onMounted(async()=>{
    
  })
  </script>
  
  <style >
   textarea {
            width: 200px;
            /* min-height: 20px; */
            padding: 0;
            resize:none;
            word-break: break-all;
        }
  </style>