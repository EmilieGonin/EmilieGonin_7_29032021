<template>
  <div class="signup">
    <!--Signup Form-->
    <form class="form" @submit="signupForm" action="index.html" method="post">
      <FormItem>
        <!--Title-->
        <template #title>Inscription</template>
        <!--Fields-->
        <template #fields>
          <!--First Name-->
          <div class="form__field">
            <label class="form__label">Prénom</label>
            <input
              class="form__input"
              type="text"
              name="firstName"
              v-model="firstName"
              required
            />
          </div>
          <!--Last Name-->
          <div class="form__field">
            <label class="form__label">Nom</label>
            <input
              class="form__input"
              type="text"
              name="lastName"
              v-model="lastName"
              required
            />
          </div>
          <!--Email-->
          <div class="form__field">
            <label class="form__label">Adresse email</label>
            <input
              class="form__input"
              type="email"
              name="email"
              v-model="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
          </div>
          <!--Password-->
          <div class="form__field">
            <label class="form__label">Mot de passe</label>
            <input
              class="form__input"
              type="password"
              name="password"
              v-model="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
            />
            <span class="form__field-text">
              Le mot de passe doit contenir un minimum de 8 caractères dont au
              moins une minuscule, une majuscule et un chiffre.
            </span>
          </div>
        </template>
        <!--Submit Button-->
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
      try {
        e.preventDefault();
        const user = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        };
        if (
          !this.email ||
          !this.password ||
          !this.firstName ||
          !this.lastName
        ) {
          const error = "Veuillez renseigner tous les champs du formulaire.";
          this.$store.dispatch("newError", error);
          throw error;
        }
        this.$store
          .dispatch("signup", user)
          .then(() => this.$router.push("/"))
          .catch(() =>
            console.error("Une erreur s'est produite pendant l'inscription.")
          );
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
