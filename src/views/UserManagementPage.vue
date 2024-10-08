<template>
    <div class="manage-users-container">
      <h1>Manage Users</h1>
      <div v-if="loading" class="loading">Loading users...</div>
      <div v-else>
        <vue-good-table
          :columns="userColumns"
          :rows="users"
          :search-options="{ enabled: true }"
          :pagination-options="{ enabled: true, perPage: 10 }"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { VueGoodTable } from 'vue-good-table-next'; // Ensure this is imported
  import 'vue-good-table-next/dist/vue-good-table-next.css';
  
  const users = ref([]);
  const loading = ref(true);
  
  // Define the table columns
  const userColumns = [
    { label: 'ID', field: 'id', sortable: true },
    { label: 'Name', field: 'username', sortable: true },
    { label: 'Email', field: 'email', sortable: true },
    { label: 'Role', field: 'role', sortable: true },
    { label: 'Actions', field: 'actions' }
  ];

  // Load the users data from Firebase Cloud Function
  onMounted(async () => {
    try {
      const response = await axios.get('https://manageusers-geiziwgfdq-uc.a.run.app');
      users.value = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .manage-users-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  .loading {
    font-size: 1.5rem;
    color: #888;
  }
  </style>