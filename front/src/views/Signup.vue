<template>
  <div class="signup">
    <form class="form" @submit="signupForm" action="index.html" method="post">
      <label>
        Prénom
        <input type="text" name="firstName" v-model="firstName" />
      </label>
      <label>
        Nom
        <input type="text" name="lastName" v-model="lastName" />
      </label>
      <label>
        Adresse email
        <input type="email" name="email" v-model="email" />
      </label>
      <label>
        Mot de passe
        <input type="password" name="password" v-model="password" />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  },
  methods: {
    signupForm(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      };
      this.$store
        .dispatch("signup", user)
        .then(() => this.$router.push("/"))
        .catch(() =>
          console.error("Une erreur s'est produite pendant l'inscription.")
        );
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
