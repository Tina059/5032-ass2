<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <!-- 管理员功能块 -->
    <div class="admin-functions">
      <h2>Email Users</h2>
      <p>Send an email to any registered user.</p>
      <button @click="goToEmailPage">Send Email</button>

      <!-- 你可以在这里添加其他管理员功能 -->
      <h2>Manage Users</h2>
      <p>View and manage all registered users.</p>
      <button @click="goToUserManagement">Manage Users</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 导航到发送邮件的页面
const goToEmailPage = () => {
  router.push({ name: 'AdminEmailPage' }); // 假设有一个 AdminEmailPage.vue
};

// 导航到用户管理页面
const goToUserManagement = () => {
  router.push({ name: 'UserManagementPage' }); // 假设有一个 UserManagementPage.vue
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.admin-functions {
  margin-top: 30px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
