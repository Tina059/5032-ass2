<template>
    <div class="email-container">
      <h1>Send Email to User</h1>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="recipient">Select User:</label>
          <select v-model="selectedUser" required>
            <option v-for="user in users" :key="user.id" :value="user.email">
              {{ user.username }} ({{ user.email }})
            </option>
          </select>
        </div>
        <div>
          <label for="subject">Subject:</label>
          <input v-model="emailData.subject" type="text" required />
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea v-model="emailData.text" required></textarea>
        </div>
        <button type="submit">Send Email</button>
      </form>
      <p>{{ responseMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { collection, getDocs } from 'firebase/firestore';
  import db from '@/firebase/init.js';
  
  const emailData = ref({
    subject: '',
    text: ''
  });
  const selectedUser = ref(null);
  const responseMessage = ref('');
  const users = ref([]);
  
  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      users.value.push({ ...doc.data(), id: doc.id });
    });
  });
  
  const sendEmail = async () => {
    if (!selectedUser.value) {
      responseMessage.value = 'Please select a user.';
      return;
    }
  
    const emailPayload = {
      to: selectedUser.value,
      subject: emailData.value.subject,
      text: emailData.value.text,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/send-email', emailPayload);
      responseMessage.value = 'Email sent successfully!';
    } catch (error) {
      responseMessage.value = `Error: ${error.response.data}`;
    }
  };
  </script>
  
  <style scoped>
.email-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

textarea.form-control {
  resize: vertical;
  height: 100px;
}

.btn {
  display: block;
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}

.response-message {
  text-align: center;
  margin-top: 15px;
  color: #4caf50;
  font-weight: bold;
}

select.form-control {
  appearance: none;
  padding-right: 30px;
  background: url('data:image/svg+xml;base64,...') no-repeat right center / 10px 10px;
}
</style>