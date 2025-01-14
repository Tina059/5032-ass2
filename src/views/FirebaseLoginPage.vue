<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useChange } from '../router/change';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth
import { getFirestore, doc, getDoc} from 'firebase/firestore';
import db from '../fire/init.js';

const formData = ref({
  email: localStorage.getItem('loginEmail') || '',  
  password: localStorage.getItem('loginPassword') || '',
});

const message = ref('');
const warningMessage = ref(''); 
const router = useRouter();
const { login } = useChange();

const sanitizeInput = (input) => {
  const tagPattern = /<[^>]*>?/gm;
  if (tagPattern.test(input)) {
    warningMessage.value = "Your input contains invalid characters or scripts and has been rejected.";
    return input.replace(tagPattern, ''); 
  } else {
    warningMessage.value = ''; 
    return input;
  }
};

const validatePassword = (blur) => {
  const password = sanitizeInput(formData.value.password);
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

const submitForm = async () => {
  const auth = getAuth();
  const sanitizedEmail = sanitizeInput(formData.value.email);
  const sanitizedPassword = sanitizeInput(formData.value.password);

  if (warningMessage.value) {
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      login(userData.role);  

      if (userData.role === 'admin') {
        router.push({ name: 'AdminDashboard' });
      } else if (userData.role === 'user') {
        router.push({ name: 'About' });
      }
    } else {
      message.value = 'No such user data!';
    }
  } catch (error) {
    message.value = `Login failed: ${error.message}`;
  }
};


watch(() => formData.value.email, (newEmail) => {
  localStorage.setItem('loginEmail', newEmail);
});

watch(() => formData.value.password, (newPassword) => {
  localStorage.setItem('loginPassword', newPassword);
});

const goToRegisterPage = () => {
  router.push({ name: 'Register' }); 
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Firebase Login</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <!-- Email -->
      <div class="row mb-3">
        <div class="col-md-12 col-sm-12">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="formData.email"
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

      <div v-if="warningMessage" class="alert alert-warning">
        {{ warningMessage }}
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>

    <!-- Register Button -->
    <div class="text-center mt-4">
      <p>Don't have an account? <button @click="goToRegisterPage" class="btn btn-link">Firebase Register here</button></p>
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