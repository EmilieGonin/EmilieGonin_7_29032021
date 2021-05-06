<template>
  <div class="login">
    <!--Login Form-->
    <form class="form" @submit="loginForm" action="index.html" method="post">
      <FormItem>
        <!--Title-->
        <template #title>Connexion</template>
        <!--Fields-->
        <template #fields>
          <!--Email-->
          <div class="form__field">
            <label class="form__label" for="email">Adresse email</label>
            <input
              class="form__input"
              type="email"
              name="email"
              v-model="email"
            />
          </div>
          <!--Password-->
          <div class="form__field">
            <label class="form__label" for="password">Mot de passe</label>
            <input
              class="form__input"
              type="password"
              name="password"
              v-model="password"
            />
          </div>
        </template>
        <!--Submit Button-->
        <template #button>
          Se connecter <i class="fad fa-sign-in-alt"></i>
        </template>
        <!--Additionnal Text-->
        <template #text>
          <span class="form__text">
            Vous n'avez pas de compte ?
            <router-link class="form__link" to="/signup">
              Inscrivez-vous
            </router-link>
            dès maintenant !
          </span>
        </template>
      </FormItem>
    </form>
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
      if (!this.email) {
        const error = "Veuillez renseigner une adresse email.";
        this.$store.dispatch("newError", error);
        throw error;
      } else if (!this.password) {
        const error = "Veuillez renseigner un mot de passe.";
        this.$store.dispatch("newError", error);
        throw error;
      }
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
