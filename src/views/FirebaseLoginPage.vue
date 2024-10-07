<script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // 引入 Firestore 相关库
import db from '@/firebase/init.js'; // 导入 Firestore 实例

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  role: 'user',
});

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  email: null,
});

const message = ref('');

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.';
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.';
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.';
  } else {
    errors.value.password = null;
  }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.';
  } else {
    errors.value.confirmPassword = null;
  }
};

const validateEmail = (blur) => {
  const email = formData.value.email;
  const minLength = 4;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length < minLength) {
    if (blur) errors.value.email = `Email must be at least ${minLength} characters long.`;
  } else if (!emailPattern.test(email)) {
    if (blur) errors.value.email = 'Invalid email format. Please use a correct email format, such as example@example.com';
  } else {
    errors.value.email = null;
  }
};

const submitForm = async () => {
  // Firestore 中的 'users' 集合
  const usersCollection = collection(db, 'users');

  try {
    // 添加用户数据到 Firestore
    await addDoc(usersCollection, {
      username: formData.value.username,
      password: formData.value.password,
      email: formData.value.email,
      role: formData.value.role,
    });

    message.value = 'Registration successful!';
    formData.value = { username: '', password: '', confirmPassword: '', email: '', role: 'user' };
  } catch (e) {
    message.value = 'Registration failed: ' + e.message;
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="submitForm" class="mt-4">
 
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
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            @blur="() => validateEmail(true)"
            @input="() => validateEmail(true)"
            v-model="formData.email"
            required
          />
          <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
        </div>
      </div>

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
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            @blur="() => validateConfirmPassword(true)"
            @input="() => validateConfirmPassword(true)"
            v-model="formData.confirmPassword"
            required
          />
          <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="role" class="form-label">Role</label>
          <select v-model="formData.role" class="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>

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
