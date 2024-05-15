<template>
    <div id="app">
        <el-form :model="form" label-width="auto" style="max-width: 500px;">
            <el-form-item label="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item label="firstName">
                <el-input v-model="form.firstName" />
            </el-form-item>
            <el-form-item label="lastName">
                <el-input v-model="form.lastName" />
            </el-form-item>
            <el-form-item label="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="birthDate">
                <el-input v-model="form.birthDate" placeholder="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item label="gender">
                <el-select v-model="form.gender" placeholder="please select your gender">
                    <el-option label="Female" value="F" />
                    <el-option label="Male" value="M" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click=addUser() type="primary">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {reactive, defineExpose, inject } from 'vue';
import axios from 'axios';

const form = reactive({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    gender: '',
})

const router = inject('$router');

async function addUser() {
    try {
        //将响应式对象转换为普通JSON对象
        const formDataToSend = { ...form };

        const response = await axios.post('api/user', formDataToSend);
        if (response.data && response.data.code === 200) {
            router.go(-1);
        }
    } catch (error) {
        console.log("增加用户信息失败", error);
    }
}

defineExpose({ addUser  });

</script>

<style scoped>
#app {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}
</style>