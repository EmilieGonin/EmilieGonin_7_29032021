<template>
  <div class="signup">
    <form class="form" @submit="signupForm" action="index.html" method="post">
      <FormItem>
        <template #title>Inscription</template>
        <template #fields>
          <div class="form__field">
            <label class="form__label">Prénom</label>
            <input
              class="form__input"
              type="text"
              name="firstName"
              v-model="firstName"
            />
          </div>
          <div class="form__field">
            <label class="form__label">Nom</label>
            <input
              class="form__input"
              type="text"
              name="lastName"
              v-model="lastName"
            />
          </div>
          <div class="form__field">
            <label class="form__label">Adresse email</label>
            <input
              class="form__input"
              type="email"
              name="email"
              v-model="email"
            />
          </div>
          <div class="form__field">
            <label class="form__label">Mot de passe</label>
            <input
              class="form__input"
              type="password"
              name="password"
              v-model="password"
            />
          </div>
        </template>
        <template #button>
          S'inscrire <i class="fad fa-sign-in-alt"></i>
        </template>
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
