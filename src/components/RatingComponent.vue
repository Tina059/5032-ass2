<template>
  <div class="rating-container">
    <h3>{{ activityTitle }}</h3>
    <div class="star-rating">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ filled: star <= currentRating }"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
    <p>Current score: {{ currentRating }} / 5</p>
    <p>Average score: {{ averageRating.toFixed(1) }} / 5 ({{ totalRatings }} )</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  activityTitle: String,
});

const localStorageKey = `rating_${props.activityTitle.replace(/\s+/g, '_')}`;

const currentRating = ref(0);
const totalRatings = ref(0);
const sumOfRatings = ref(0);

const averageRating = computed(() => (totalRatings.value > 0 ? sumOfRatings.value / totalRatings.value : 0));

const setRating = (rating) => {
  currentRating.value = rating;
  sumOfRatings.value += rating;
  totalRatings.value += 1;
  saveRatingData();
};

const saveRatingData = () => {
  const ratingData = {
    totalRatings: totalRatings.value,
    sumOfRatings: sumOfRatings.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(ratingData));
};

const loadRatingData = () => {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    totalRatings.value = parsedData.totalRatings;
    sumOfRatings.value = parsedData.sumOfRatings;
  }
};

onMounted(() => {
  loadRatingData();
});
</script>

<style scoped>
.rating-container {
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
}

.star-rating {
  margin-bottom: 10px;
}

.star {
  font-size: 24px;
  cursor: pointer;
}

.star.filled {
  color: gold;
}
</style>
