<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Form from './components/Form.vue'
</script>

<template>
  <Form />
  <form @submit.prevent="submitForm">
    <input v-model="email" placeholder="Enter your email" />
    <span v-if="!isEmailValid">Invalid email</span>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  computed: {
    isEmailValid() {
      return /^\S+@\S+\.\S+$/.test(this.email);
    },
  },
  methods: {
    submitForm() {
      if (this.isEmailValid) {
      }
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
