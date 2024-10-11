<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <!-- 管理员功能块 -->
    <div class="admin-functions">
      <h2>Email Users</h2>
      <p>Send an email to any registered user.</p>
      <button @click="goToEmailPage">Send Email</button>


      <h2>Manage Users</h2>
      <p>View and manage all registered users.</p>
      <button @click="goToUserManagement">Manage Users</button>
    </div>


    <div class="user-growth-chart">
      <h2>User Growth Trend</h2>
      <canvas id="userGrowthChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase/init.js';
import Chart from 'chart.js/auto';

const router = useRouter();


const goToEmailPage = () => {
  router.push({ name: 'AdminEmailPage' }); // 假设有一个 AdminEmailPage.vue
};


const goToUserManagement = () => {
  router.push({ name: 'UserManagementPage' }); // 假设有一个 UserManagementPage.vue
};


const userGrowthData = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  userGrowthData.value = users;
  drawUserGrowthChart(users);
});

const drawUserGrowthChart = (users) => {
  const ctx = document.getElementById('userGrowthChart').getContext('2d');


  const growthCounts = {};
  users.forEach(user => {
    if (user.createdAt && user.createdAt.seconds) {
      const date = new Date(user.createdAt.seconds * 1000).toISOString().split('T')[0];
      growthCounts[date] = (growthCounts[date] || 0) + 1;
    }
  });

  const labels = Object.keys(growthCounts).sort();
  const data = labels.map(label => growthCounts[label]);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'User Growth Over Time',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Number of Users'
          },
          beginAtZero: true
        }
      }
    }
  });
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

.user-growth-chart {
  margin-top: 40px;
}

canvas {
  max-width: 100%;
  height: 400px;
}
</style>