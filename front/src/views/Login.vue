<template>
  <div class="login">
    <form class="form" @submit="loginForm" action="index.html" method="post">
      <FormItem>
        <template #title>Connexion</template>
        <template #fields>
          <label class="form__label">
            Adresse email
            <input
              class="form__input"
              type="email"
              name="email"
              v-model="email"
            />
          </label>
          <label class="form__label">
            Mot de passe
            <input
              class="form__input"
              type="password"
              name="password"
              v-model="password"
            />
          </label>
        </template>
        <template #button>Se connecter</template>
      </FormItem>
    </form>
    <router-link to="/signup">
      S'inscrire
    </router-link>
  </div>
</template>

<script>
import FormItem from "@/components/FormItem.vue";

export default {
  name: "Login",
  components: {
    FormItem
  },
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
