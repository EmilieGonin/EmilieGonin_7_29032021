<template>
  <!--Nav-->
  <NavItem></NavItem>
  <!--Error & Confirmation Messages-->
  <ErrorMessage></ErrorMessage>
  <ConfirmationMessage></ConfirmationMessage>
  <!--View-->
  <router-view class="view" :class="{ slide: error || confirmation }" />
</template>

<script>
import { mapGetters } from "vuex";
import ErrorMessage from "@/components/ErrorMessage.vue";
import ConfirmationMessage from "@/components/ConfirmationMessage.vue";
import NavItem from "@/components/NavItem.vue";

export default {
  components: {
    ErrorMessage,
    ConfirmationMessage,
    NavItem
  },
  watch: {
    confirmation() {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  },
  computed: mapGetters(["error", "confirmation"])
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.view {
  width: 100%;
  max-width: 700px;
  margin: auto;
  transition: transform 0.5s;
}
</style>
