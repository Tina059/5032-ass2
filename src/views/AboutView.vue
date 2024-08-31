<template>
  <div class="about">
    <h1>Community Activities</h1>
    <p>Welcome to the health activity interface. You can choose your favorite activities and score them.</p>

    <div v-if="userRole === 'admin'" class="admin-panel">
      <h2>Add a New Activity</h2>
      <form @submit.prevent="addActivity">
        <input v-model="newActivityTitle" placeholder="Activity Title" required />
        <button type="submit">Add Activity</button>
      </form>
    </div>
    
    <div v-for="(activity, index) in activities" :key="index" class="activity">
      <RatingComponent :activityTitle="activity.title" />
    </div>


    <RatingComponent activityTitle="Yoga Class" />
    <RatingComponent activityTitle="Healthy Cooking Workshop" />
    <RatingComponent activityTitle="Mental Health Seminar" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChange } from '@/router/change';
import RatingComponent from '@/components/RatingComponent.vue';

const { userRole } = useChange();

const newActivityTitle = ref('');
const activities = ref([]);

const addActivity = () => {
  if (newActivityTitle.value) {
    const newActivity = { title: newActivityTitle.value };
    activities.value.push(newActivity);
    saveActivities();
    newActivityTitle.value = ''; // 清空输入框
  }
};

const saveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities.value));
};

const loadActivities = () => {
  const storedActivities = localStorage.getItem('activities');
  if (storedActivities) {
    activities.value = JSON.parse(storedActivities);
  }
};

onMounted(() => {
  loadActivities();
});
</script>

<style scoped>
.about {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.about p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}
</style>
