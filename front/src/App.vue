<template>
  <!--Nav-->
  <NavItem></NavItem>
  <!--Error & Confirmation Messages-->
  <ErrorMessage :absolute="slideEnabled"></ErrorMessage>
  <ConfirmationMessage></ConfirmationMessage>
  <!--View-->
  <router-view
    class="view"
    :class="{ slide: (error || confirmation) && slideEnabled }"
  />
</template>

<script>
import { mapGetters } from "vuex";
import ErrorMessage from "@/components/ErrorMessage.vue";
import ConfirmationMessage from "@/components/ConfirmationMessage.vue";
import NavItem from "@/components/NavItem.vue";

export default {
  data() {
    return {
      slideEnabled: true
    };
  },
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
  computed: mapGetters(["error", "confirmation"]),
  mounted() {
    this.checkWidth();
    window.addEventListener("resize", this.checkWidth);
  },
  methods: {
    checkWidth() {
      if (window.innerWidth < 510) {
        this.slideEnabled = false;
      }
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
.view {
  width: 100%;
  max-width: 700px;
  margin: auto;
  transition: transform 0.5s;
}
.slide {
  transform: translateY(35px);
}
</style>
