<template>
  <div class="home-container">
    <div class="welcome-container">
      <img src="@/assets/home-background.jpg" alt="Welcome Background" class="background-img" />
      <div class="welcome-text">
        <h1>Welcome to your Health Care</h1>
        <p>Start your health exploration</p>
        
      </div>
    </div>
    <div class="card-links">
      <div class="card" @click="goToMapView">
        <img src="@/assets/hospital.png" alt="Hospital Map" class="card-image" />
        <div class="card-content">
          <h3>Find a Nearby Hospital</h3>
          <p>Locate nearby hospitals quickly and easily using our map feature.</p>
        </div>
      </div>

      <div class="card" @click="goToAboutView">
        <img src="@/assets/activity.png" alt="Activity Info" class="card-image" />
        <div class="card-content">
          <h3>Healthy Activities</h3>
          <p>Explore various healthy activities to enhance your well-being.</p>
        </div>
      </div>
    </div>


    <div class="image-container">
      <img src="@/assets/home-background.jpg" alt="Background Image" class="background-img" />
    </div>

    <div class="news-table-container">
      <h2>Health News Table</h2>
      <vue-good-table
        :columns="newsColumns"
        :rows="news"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 10 }"
      />
      <!-- 朗读按钮 -->
      <button @click="readNews">Read News</button>
    </div>

    <div class="users-table-container">
      <h2>Doctor's Liste</h2>
      <vue-good-table
        :columns="userColumns"
        :rows="mockUsers"
        :search-options="{ enabled: true }"
        :pagination-options="{ enabled: true, perPage: 10 }"
      />
    </div>

    <div>
      <h1>My Application</h1>
      <SendEmail />
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
import SendEmail from '@/components/SendEmail.vue';
import { ref } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { useRouter } from 'vue-router';
const router = useRouter();

const news = ref([
  { title: 'Health Awareness Month', content: 'This month is dedicated to raising awareness about various health issues...' },
  { title: 'New Health Policies Announced', content: 'The government has announced new health policies aimed at improving...' }
]);

const newsColumns = [
  { label: 'Title', field: 'title', sortable: true },
  { label: 'Content', field: 'content', sortable: true }
];

const goToMapView = () => {
  router.push({ name: 'MapView' }); 
};


const goToAboutView = () => {
  router.push({ name: 'About' }); 
};
const mockUsers = ref([
  { id: 1, name: 'John Doe', specialty: 'Cardiology', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', specialty: 'Dermatology', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', specialty: 'Pediatrics', email: 'alice@example.com' },
  { id: 4, name: 'Sarah Lee', specialty: 'Dermatology', email: 'Lee@example.com' },
  { id: 5, name: 'Tian Wang', specialty: 'Neurology', email: 'tWang@example.com' },
  { id: 6, name: 'David Martinez', specialty: 'Psychology', email: 'david6@example.com' },
  { id: 7, name: 'Anna Gile', specialty: 'Orthopedics', email: 'anna12@example.com' },
  { id: 8, name: 'Benjamin Scott', specialty: 'Dermatology', email: 'scott15@example.com' },
  { id: 9, name: 'Grace Hall', specialty: 'Cardiology', email: 'hall367@example.com' },
  { id: 10, name: 'Mia Walke', specialty: 'Psychiatry', email: 'mwalke@example.com' },
  { id: 11, name: 'Laura Wilson', specialty: 'Pulmonology', email: 'laura@example.com' },
  { id: 12, name: 'Michael Smith', specialty: 'Immunology', email: 'michel@example.com' },
  { id: 13, name: 'Wendy Lu', specialty: 'Dermatology', email: 'wendy@example.com' },
]);

const userColumns = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Name', field: 'name', sortable: true },
  { label: 'Specialty', field: 'specialty', sortable: true },
  { label: 'Email', field: 'email', sortable: true }
];


const readNews = () => {
  if (!window.speechSynthesis) {
    alert('Your browser does not support speech synthesis.');
    return;
  }

  
  const utterance = new SpeechSynthesisUtterance();
  let newsText = '';

  news.value.forEach(item => {
    newsText += `${item.title}: ${item.content}. `;
  });

  utterance.text = newsText;
  utterance.lang = 'en-US'; 

  
  window.speechSynthesis.speak(utterance);
};
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
.image-links {
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 20px;
}

.card-links {
  display: flex;
  justify-content: center; 
  gap: 40px; 
  margin-top: 30px;
  flex-wrap: wrap; 
}

.card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 200px;
  text-align: center;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-content {
  padding: 15px;
}

.card-content h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.card-content p {
  font-size: 0.9rem;
  color: #555;
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