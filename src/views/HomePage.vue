<template>
  <div class="home">
    <!-- 搜索表单 -->
    <div class="search-form">
      <!-- 筛选条件 -->
      <el-select v-model="selectedFilter" placeholder='Select Gender' style="width: 240px;">
        <el-option label="Male" value="Male"></el-option>
        <el-option label="Female" value="Female"></el-option>
        <el-option label="All" value="All"></el-option>
      </el-select>
      <!-- 搜索框 -->
      <el-input v-model="searchText" placeholder="Enter Username" style="width: 240px" />
      <!-- 搜索按钮 -->
      <el-button @click="handleSearch" type="primary">查询</el-button>
      <el-button @click="handleAdd" type="primary">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="username" />
      <el-table-column prop="firstName" label="firstName" />
      <el-table-column prop="lastName" label="lastName" />
      <el-table-column prop="email" label="email" width="250" />
      <el-table-column prop="birthDate" label="birthDate" />
      <el-table-column prop="gender" label="gender" />

      <!-- 编辑按钮 -->
      <el-table-column width="100">
        <template v-slot:default="{ row }">
          <el-button @click="handleEdit(row.id)" type="primary">编辑</el-button>
        </template>
      </el-table-column>
      <!-- 删除按钮 -->
      <el-table-column width="100">
        <template v-slot:default="{ row }">
          <el-button @click="handleDelete(row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分页组件 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    // 数据定义为 ref
    const tableData = ref([]);
    const selectedFilter = ref('');
    const searchText = ref('');
    const totalItems = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(10);

    const fetchTableData = async (newCurrentPage, newPageSize) => {
      if(selectedFilter.value || searchText.value){
        handleSearch();
        return
      }
      try {
        const responseData = await axios.get(`/api/user/list?page=${newCurrentPage}&size=${newPageSize}`);
        if (responseData.data && responseData.data.code === 200) {
          tableData.value = responseData.data.data;

          // 获取所有数据的总数
          const totalResponse = await axios.get('/api/user/total');
          if (totalResponse.data && totalResponse.data.code === 200) {
            totalItems.value = totalResponse.data.data || 0;
          } else {
            console.error(`获取总条目数失败，状态码：${totalResponse.data.code}`);
          }
        } else {
          console.error(`请求失败，状态码：${responseData.data.code}`);
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    };

    const handleSearch = async () => {
       try {
        let gender;
        if (selectedFilter.value == 'Male') {
          gender = 'M';
        } else if (selectedFilter.value == 'Female') {
          gender = 'F';
        } else {
          gender = '';
        }
        const responseData = await axios.get(`/api/user/conditionQuery?gender=${gender}&username=${searchText.value}&page=${currentPage.value}&size=${pageSize.value}`);
        if (responseData.data && responseData.data.code === 200) {
          tableData.value = responseData.data.data;

          // 获取所有数据的总数
          const totalResponse = await axios.get('/api/user/total');
          if (totalResponse.data && totalResponse.data.code === 200) {
            totalItems.value = totalResponse.data.data || 0;
          } else {
            console.error(`获取总条目数失败，状态码：${totalResponse.data.code}`);
          }
        } else {
          console.error(`请求失败，状态码：${responseData.data.code}`);
        }
      }catch(error){
        console.error('获取用户信息失败:', error);
      }
    };

    const handleAdd = () => {
      console.log('新增用户');
    };

    const handleEdit = (id) => {
      console.log(`编辑用户 ${id}`);
    };

    const handleDelete = (id) => {
      console.log(`删除用户 ${id}`);
    };

    const handleSizeChange = (newPageSize) => {
      pageSize.value = newPageSize;
      currentPage.value = 1; // 更改页面大小时重置到第一页
      fetchTableData(currentPage.value, pageSize.value);
    };

    const handleCurrentChange = (newCurrentPage) => {
      currentPage.value = newCurrentPage;
      fetchTableData(currentPage.value, pageSize.value);
    };

    

    onMounted(() => {
      fetchTableData(currentPage.value, pageSize.value);
    });

    return {
      tableData,
      selectedFilter,
      searchText,
      totalItems,
      currentPage,
      pageSize,
      handleSearch,
      handleAdd,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.search-form {
  display: flex;
  align-items: center;
}
</style>