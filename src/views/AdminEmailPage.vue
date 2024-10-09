<template>
    <div class="email-container">
      <h1>Send Bulk Email to Users</h1>
      <form @submit.prevent="sendBulkEmail">
        <div>
          <label for="recipient">Select Users:</label>
          <multiselect v-model="selectedUsers" :options="users" :multiple="true" label="username" track-by="email" placeholder="Select users..." />
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
  import db from '@/fire/init.js';
  import Multiselect from 'vue-multiselect';
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  
  const emailData = ref({
    subject: '',
    text: ''
  });
  const selectedUsers = ref([]);
  const responseMessage = ref('');
  const users = ref([]);
  
  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      users.value.push({ ...doc.data(), id: doc.id });
    });
  });
  
  const sendBulkEmail = async () => {
    if (selectedUsers.value.length === 0) {
      responseMessage.value = 'Please select at least one user.';
      return;
    }
  
    const emailAddresses = selectedUsers.value.map(user => user.email);
  
    const emailPayload = {
      to: emailAddresses,
      subject: emailData.value.subject,
      text: emailData.value.text,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/send-email', emailPayload);
      responseMessage.value = 'Email sent successfully!';
    } catch (error) {
      responseMessage.value = `Error: ${error.response?.data || error.message}`;
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
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
  
  textarea {
    resize: vertical;
    height: 100px;
  }
  
  button {
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
  
  button:hover {
    background-color: #45a049;
  }
  
  .response-message {
    text-align: center;
    margin-top: 15px;
    color: #4caf50;
    font-weight: bold;
  }
  </style>
  