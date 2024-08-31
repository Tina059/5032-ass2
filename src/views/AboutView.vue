<template>
  <div class="about">
    <h1>Community Activities</h1>
    <p>Welcome to the health activity interface. You can choose your favorite activities and score them.</p>
    

    <RatingComponent activityTitle="Yoga Class" />
    <RatingComponent activityTitle="Healthy Cooking Workshop" />
    <RatingComponent activityTitle="Mental Health Seminar" />
  </div>
</template>

<script setup>
import RatingComponent from '@/components/RatingComponent.vue';
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
