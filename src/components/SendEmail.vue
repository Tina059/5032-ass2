<template>
    <div class="email-container">
      <h1>Send Email with Attachment</h1>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="to">Recipient:</label>
          <input v-model="emailData.to" type="email" required />
        </div>
        <div>
          <label for="subject">Subject:</label>
          <input v-model="emailData.subject" type="text" required />
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea v-model="emailData.text"></textarea>
        </div>
        <div>
          <label for="attachment">Attachment:</label>
          <input type="file" @change="handleFileUpload" />
        </div>
        <button type="submit">Send Email</button>
      </form>
      <p>{{ responseMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const emailData = ref({
    to: '',
    subject: '',
    text: '',
    attachment: null
  });
  
  const responseMessage = ref('');
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      emailData.value.attachment = {
        content: btoa(reader.result), // 将文件转换为base64
        filename: file.name,
        type: file.type
      };
    };
  
    reader.readAsBinaryString(file);
  };
  
  const sendEmail = async () => {
    try {
      const response = await axios.post('https://5032-ass2.pages.dev/', emailData.value);
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
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  