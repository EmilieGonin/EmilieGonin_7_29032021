<template>
  <div class="signup">
    <form class="form" @submit="signupForm" action="index.html" method="post">
      <FormItem>
        <template #title>Inscription</template>
        <template #fields>
          <label class="form__label">
            Prénom
            <input
              class="form__input"
              type="text"
              name="firstName"
              v-model="firstName"
            />
          </label>
          <label class="form__label">
            Nom
            <input
              class="form__input"
              type="text"
              name="lastName"
              v-model="lastName"
            />
          </label>
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
  </div>
</template>

<script>
import FormItem from "@/components/FormItem.vue";

export default {
  name: "Signup",
  components: {
    FormItem
  },
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
