<template>
  <div class="home-container">
    
    
    <div class="welcome-container">
      <img src="@/assets/home-background.jpg" alt="Welcome Background" class="background-img" />
      <div class="welcome-text">
        <h1>Welcome to your Health Care</h1>
        <p>Start your health exploration</p>
      </div>
    </div>

    <div class="image-container">
      <img src="@/assets/home-background.jpg" alt="Background Image" class="background-img" />
    </div>

    <div class="news-container">
      <h2>Health News</h2>
      <ul>
        <li v-for="(newsItem, index) in news" :key="index" class="news-item">
          <h3>{{ newsItem.title }}</h3>
          <p>{{ newsItem.content }}</p>
        </li>
      </ul>
    </div>
  </div>
  <footer class="footer">
      <div class="contact-info">
        <h3>24 hour health advice you can count on</h3>
        <p>📞 1800 000 000</p>
      </div>
      <div class="social-media">
        <img src="@/assets/facebook-icon.png" alt="Facebook" class="social-icon" />
        <img src="@/assets/twitter-icon.png" alt="Twitter" class="social-icon" />
        <img src="@/assets/instagram-icon.png" alt="Instagram" class="social-icon" />
      </div>
      
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import newsData from '@/assets/news.json';

const news = ref([]);

news.value = newsData;

</script>

<style scoped>
.home-container {
  display: flex;
  background-color: #d3efe9;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.logo {
  width: 120px;
  height: auto;
}
.welcome-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}


.background-img {
  width: 1200px;  
  height: 200px;  
  border-radius: 10px; 
}


.welcome-text {
  position: absolute;
  top: 40%; 
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(28, 81, 5);
  text-shadow: 2px 2px 4px rgba(11, 9, 89, 0.7);
}

.welcome-text h1 {
  font-size: 3rem;
  margin: 0;
}

.welcome-text p {
  font-size: 1.5rem;
  margin: 10px 0 0;
}

.news-container {
  margin-top: -10px; 
  padding: 20px;
  background: rgba(67, 197, 200, 0.9);
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: left;
}

.news-container h2 {
  margin-bottom: 20px;
  color: #333;
}

.news-container ul {
  list-style-type: none;
  padding: 0;
}

.news-item {
  margin-bottom: 15px;
}

.news-item h3 {
  margin-top: 0;
  color: #333;
}

.news-item p {
  margin-bottom: 0;
  color: #555;
}
.footer {
  background-color: #bcdcaa;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid #ccc;
}

.contact-info h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.contact-info p {
  font-size: 1.2rem;
  margin: 5px 0;
}

.social-media {
  margin: 20px 0;
}

.social-icon {
  width: 40px;
  height: 40px;
  margin: 0 10px;
}

.partners {
  margin-top: 20px;
}

.partner-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.partner-logo {
  width: 80px;
  height: auto;
}
</style>