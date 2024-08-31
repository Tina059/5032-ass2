<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useChange } from '../router/change';

const formData = ref({
  username: '',
  password: '',
  role: 'user', 
});

const message = ref('');
const router = useRouter();
const { login } = useChange();

const sanitizeInput = (input) => {
  // Detect XSS
  return input.replace(/<[^>]*>?/gm, '');
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) message.value = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) message.value = 'Password must contain at least one uppercase letter.';
  } else if (!hasLowercase) {
    if (blur) message.value = 'Password must contain at least one lowercase letter.';
  } else if (!hasSpecialChar) {
    if (blur) message.value = 'Password must contain at least one special character.';
  } else {
    message.value = '';
  }
};

const submitForm = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const sanitizedUsername = sanitizeInput(formData.value.username);
  const sanitizedPassword = sanitizeInput(formData.value.password);

  const user = users.find(u => u.username === sanitizedUsername && u.password === sanitizedPassword);

  if (user) {
    login(user.role);  
    router.push({ name: 'About' });
  } else {
    message.value = 'Invalid username or password';
  }
};

const goToRegisterPage = () => {
  router.push({ name: 'Register' }); 
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <!-- Username -->
      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="formData.username"
            required
          />
        </div>
      </div>

      <!-- Password -->
      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(true)"
            v-model="formData.password"
            required
          />
          <div v-if="message" class="text-danger">{{ message }}</div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>

    <!-- Register Button -->
    <div class="text-center mt-4">
      <p>Don't have an account? <button @click="goToRegisterPage" class="btn btn-link">Register here</button></p>
    </div>

    <!-- Message -->
    <p v-if="message" class="text-center mt-4">{{ message }}</p>
  </div>
</template>

<style scoped>
.btn-link {
  padding: 0;
  border: none;
  background: none;
  color: #3550b1;
  text-decoration: underline;
  cursor: pointer;
}

.btn-link:hover {
  color: #1f277d;
  text-decoration: none;
}
</style>
