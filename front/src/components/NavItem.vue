<template>
  <div class="nav">
    <!--Home-->
    <router-link to="/">
      <img class="nav__logo" src="@/assets/logo.png" />
    </router-link>
    <!--Nav Links-->
    <div class="nav__links">
      <!--If user isn't logged in-->
      <router-link class="nav__link" to="/login" v-if="!isLoggedIn">
        <div>Se connecter</div>
        <i class="fad fa-sign-in-alt"></i>
      </router-link>
      <!--If user is logged in-->
      <!--User Profile-->
      <router-link class="nav__link" :to="'/user/' + user.id" v-else>
        <span v-if="showIcon"><i class="fas fa-user"></i></span>
        <span v-else>{{ user.firstName }} {{ user.lastName }}</span>
      </router-link>
      <!--User Account-->
      <router-link
        class="nav__link nav__link--icon"
        to="/account"
        v-if="isLoggedIn"
      >
        <i class="fas fa-cog"></i>
      </router-link>
      <!--User Logout-->
      <a @click="logout" class="nav__link nav__link--icon" v-if="isLoggedIn">
        <i class="fad fa-sign-out-alt"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavItem",
  data() {
    return {
      showIcon: false
    };
  },
  computed: mapGetters(["user", "isLoggedIn"]),
  mounted() {
    this.checkWidth();
    window.addEventListener("resize", this.checkWidth);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    },
    checkWidth() {
      this.showIcon = window.innerWidth < 510;
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

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
</style>
