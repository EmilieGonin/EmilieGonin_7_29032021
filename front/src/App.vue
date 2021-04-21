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
        Se connecter
      </router-link>
      <router-link class="nav__link" to="/login">
        <i class="fad fa-sign-out-alt"></i>
      </router-link>
    </div>
  </div>
  <router-view class="view" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["user", "isLoggedIn"])
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
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  height: $nav-size;
  border-bottom: 4px $primary-color solid;
  &__logo {
    height: $nav-size - 5;
  }
  &__link {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: black;
    color: white;
    &:hover {
      background-color: $primary-color;
    }
  }
}
.view {
  width: 700px;
  margin: auto;
}
</style>
