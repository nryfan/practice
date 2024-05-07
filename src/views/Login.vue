<template>
    <div class="login_page">
        <div class="common-layout">
            <el-container>
                <el-aside width="240px">
                    <div class="img">
                        <img src="../assets/bg.jpg" alt="">
                    </div>
                    <p class="text">后台管理系统</p>
                </el-aside>
                <el-main>
                    <h2>欢迎登录</h2>
                    <el-form
                    ref="formRef"
                    :model="numberValidateForm"
                    label-width="0px"
                    class="demo-ruleForm">
                    <el-form-item
                    prop="username"
                    :rules="[
                        { required: true, message: '用户名必填' },
                    ]"
                    >
                        <el-input
                            v-model="numberValidateForm.username"
                            type="text"
                            autocomplete="off"
                            :prefix-icon="User"
                            placeholder="请输入用户名"
                        />
                    </el-form-item>
                    <el-form-item
                    prop="password"
                    :rules="[
                        { required: true, message: '密码必填' },
                    ]"
                    >
                        <el-input
                            v-model="numberValidateForm.password"
                            type="password"
                            autocomplete="off"
                            show-password
                            :prefix-icon="Lock"
                            placeholder="请输入密码"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
                        <el-button @click="resetForm(formRef)">重置</el-button>
                    </el-form-item>
                </el-form>
                    
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import { User,Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
import { reactive, ref } from 'vue'
import axios from '../api/axios.js'

const router=useRouter()
const formRef = ref()
const numberValidateForm = reactive({
  password: '',
  username:''
})
const submitForm = async(formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
  console.log(numberValidateForm.username,numberValidateForm.password);
  const res=await axios.post('login',{
    username:numberValidateForm.username,
    password:numberValidateForm.password
  })
  console.log(res,res.data.data.token);
  if(res.data.code=='20000'){
    ElMessage({
        message:'登录成功!',
        type:'success'
    })
    localStorage.setItem('token',res.data.data.token)
    setTimeout(()=>{
        router.push('/home/table')
    localStorage.setItem("flag",true)
        // router.go(0)
    },1000)
    // setTimeout(()=>{
    //     router.go(0)
    // },1010)
    
  }else{
    ElMessage.error('用户名或密码错误')
    return
  }

}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.login_page{
    // background-image: url('@/assets/bg.jpg');
    // background-size: 100% 100%;
    background:rgb(100, 170, 249);
    height: 100%;
    overflow: hidden;
}
.common-layout{
    width: 58%;
    height: 290px;
    // position: absolute;
    // margin-left: 50%;
    // margin-top: 50%;
    // transform: translate(-50%,-50%);
    margin: 172px auto;
}
.img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
    }
}
.text{
    font-size: 15px;
    margin-top: 8px;
}
h2{
    text-align: center;
    font-size: 22px;
    margin-bottom: 15px;
}
</style>
<style scoped>
.el-container{
    height: 100%;
    box-shadow: 0 0 4px rgb(92, 91, 91);
}
aside.el-aside{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* background: white; */
    background: url('@/assets/1.jpg');
    background-size: 100% 100%;
    border-right:1px solid beige;
    border-radius: 5px 0 0 5px;
}
.el-main{
    background:white;
    border-radius: 0 5px 5px 0;
}
form.el-form.el-form--default.el-form--label-right.demo-ruleForm{
    margin-top: 8px;
    margin-right: 10px;
}
button.el-button.el-button--primary,button.el-button{
    width: 100%;
    border-radius: 10px;
}
.el-button+.el-button{
    margin-left: 0;
    margin-top: 12px;
}
</style>
