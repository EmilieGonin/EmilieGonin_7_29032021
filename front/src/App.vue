<template>
  <div class="nav">
    <router-link to="/"
      ><img class="nav__logo" src="./assets/logo.png"
    /></router-link>
    <router-link class="nav__link" to="/about">Prénom Nom</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
// Importing the global css file
@import "./assets/global.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  height: 50px;
  border-bottom: 4px $secondary-color solid;
  &__logo {
    height: 45px;
  }
  &__link {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    text-decoration: none;
    background-color: black;
    color: white;
    &:hover {
      background-color: $secondary-color;
    }
  }
}
</style>
