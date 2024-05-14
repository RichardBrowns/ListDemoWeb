<template>
  <div class="home">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="username" />
      <el-table-column prop="firstName" label="firstName" />
      <el-table-column prop="lastName" label="lastName" />
      <el-table-column prop="email" label="email" />
      <el-table-column prop="birthDate" label="birthDate" />
      <el-table-column prop="gender" label="gender" />
    </el-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    // 定义响应式数据tableData，初始值为一个空数组
    const tableData = ref([]);

    // 定义fetchTableData方法
    const fetchTableData = async () => {
      try {
        const response = await axios.get('/api/user/list');
        if (response.data && response.data.code === 200) {
          tableData.value = response.data.data; // 从ResultData的data属性中提取数据
        } else {
          console.error(`请求失败，状态码：${response.data.code}`);
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    };

    // 在组件挂载后调用fetchTableData
    onMounted(() => {
      fetchTableData();
    });

    return {
      // 只返回响应式的tableData
      tableData,
    };
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
</style>