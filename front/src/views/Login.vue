<template>
  <div class="login">
    <form class="form" @submit="loginForm" action="index.html" method="post">
      <input type="email" name="email" id="email" v-model="email" />
      <input type="password" name="password" id="password" v-model="password" />
      <button type="submit">Se connecter</button>
    </form>
    <router-link to="/signup">
      S'inscrire
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    loginForm(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(() => this.$router.push("/"))
        .catch(() => console.error("error"));
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
