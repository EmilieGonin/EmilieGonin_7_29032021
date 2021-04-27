<template>
  <div class="login">
    <form class="form" @submit="loginForm" action="index.html" method="post">
      <label>
        Adresse email
        <input type="email" name="email" v-model="email" />
      </label>
      <label>
        Mot de passe
        <input type="password" name="password" v-model="password" />
      </label>
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
  data() {
    return {
      email: "",
      password: ""
    };
  },
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
        .catch(() =>
          console.error("Une erreur s'est produite dans la connexion.")
        );
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
