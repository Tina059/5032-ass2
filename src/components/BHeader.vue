<template>

  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="Logo" />
        </router-link>
      </div>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home Page</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About Activity</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active"> Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <button class="nav-link btn-logout" @click="logout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useChange } from '@/router/change';
const { isChange } = useChange();

const logout = () => {
  isChange.value = false;
  alert("Logout !");
};
</script>

<style scoped>

header {
  background-color: #b4dcd3;
  border-radius: 8px;
  padding: 20px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #512424;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover, .nav-link.active {
  background-color: #0e8923;
  color: #fff;
}

.nav-item + .nav-item {
  margin-left: 15px;
}


.btn-logout {
  background-color: transparent;
  border: none;
  color: #b95b5b;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.btn-logout:hover {
  background-color: #d9534f;
  color: #fff;
}


.logo img {
  width: 100px;
  height: auto;
}

</style>
