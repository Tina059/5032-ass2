<template>
  <div class="home-container">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
    
    <div class="welcome-container">
      <img src="@/assets/home-background.jpg" alt="Welcome Background" class="background-img" />
      <div class="welcome-text">
        <h1>Welcome to your Health Care</h1>
        <p>Start your health exploration</p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: auto;
}

.welcome-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.background-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.welcome-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.welcome-text h1 {
  font-size: 3rem;
  margin: 0;
}

.welcome-text p {
  font-size: 1.5rem;
  margin: 10px 0 0;
}
</style>
