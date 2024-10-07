<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/init';  // 引入已初始化的 Firestore 实例

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

// Firestore 和 Firebase 注册功能
const submitForm = async () => {
  const auth = getAuth();
  
  try {
    // 注册用户
    const userCredential = await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password);
    const user = userCredential.user;

    // 将用户数据添加到 Firestore 的 'users' 集合中
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      username: formData.value.username,
      email: formData.value.email,
      role: formData.value.role
    });

    message.value = 'Registration successful!';
    formData.value = { username: '', password: '', confirmPassword: '', email: '', role: 'user' };
    console.log('Registered user:', user);
  } catch (error) {
    const errorMessage = error.message;
    message.value = `Error: ${errorMessage}`;
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Register</h1>
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
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>
      </div>

      <!-- Email -->
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
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
      </div>

      <!-- Confirm Password -->
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

      <!-- Role -->
      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="role" class="form-label">Role</label>
          <select v-model="formData.role" class="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>

    <!-- Message -->
    <p v-if="message" class="text-center mt-4">{{ message }}</p>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}
</style>
