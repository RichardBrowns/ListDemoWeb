// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; // 假设你的单页面组件是Home.vue
import AddUser from '@/views/AddUser.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', // 这是默认路由
      redirect: '/home', // 设置重定向到/home
    },
    {
      path: '/home',
      component: HomePage,
    },
    {
      path: '/adduser',
      component: AddUser,
    },
  ],
});