<template>
  <div class="signup">
    <form class="form" @submit="signupForm" action="index.html" method="post">
      <input type="text" name="firstName" id="firstName" v-model="firstName" />
      <input type="text" name="lastName" id="lastName" v-model="lastName" />
      <input type="email" name="email" id="email" v-model="email" />
      <input type="password" name="password" id="password" v-model="password" />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  methods: {
    signupForm(e) {
      const user = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      };
      this.$store.dispatch("signup", user);
      e.preventDefault();
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
