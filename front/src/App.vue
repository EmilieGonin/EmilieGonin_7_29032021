<template>
  <div class="nav">
    <router-link to="/">
      <img class="nav__logo" src="./assets/logo.png" />
    </router-link>
    <div class="nav__links">
      <router-link class="nav__link" :to="'/user/' + user.id" v-if="isLoggedIn">
        {{ user.firstName }} {{ user.lastName }}
      </router-link>
      <router-link class="nav__link" to="/login" v-else>
        <div>Se connecter</div>
        <i class="fad fa-sign-in-alt"></i>
      </router-link>
      <router-link
        class="nav__link nav__link--icon"
        to="/account"
        v-if="isLoggedIn"
      >
        <i class="fas fa-cog"></i>
      </router-link>
      <a @click="logout" class="nav__link nav__link--icon" v-if="isLoggedIn">
        <i class="fad fa-sign-out-alt"></i>
      </a>
    </div>
  </div>
  <ErrorMessage></ErrorMessage>
  <ConfirmationMessage></ConfirmationMessage>
  <router-view class="view" :class="{ slide: error || confirmation }" />
</template>

<script>
import { mapGetters } from "vuex";
import ErrorMessage from "@/components/ErrorMessage.vue";
import ConfirmationMessage from "@/components/ConfirmationMessage.vue";

export default {
  components: {
    ErrorMessage,
    ConfirmationMessage
  },
  computed: mapGetters(["user", "isLoggedIn", "error", "confirmation"]),
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  height: $nav-size;
  border-bottom: 4px $primary-color solid;
  &__logo {
    height: $nav-size - 5;
  }
  &__links {
    display: flex;
  }
  &__link {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px 20px;
    color: white;
    background-color: $primary-color;
    &:hover {
      background-color: lighten($primary-color, 5%);
    }
    &--icon {
      cursor: pointer;
      padding: 10px;
      background-color: lighten($primary-color, 15%);
    }
  }
}
.view {
  width: 100%;
  max-width: 700px;
  margin: auto;
  transition: transform 0.5s;
}
</style>
