<template>
  <transition name="fade">
    <div class="error" v-if="error">{{ error }}</div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ErrorMessage",
  computed: mapGetters(["error"])
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.error {
  position: absolute;
  width: 100%;
  font-size: $font-default;
  background: $error-color;
  box-shadow: 0 0 5px $block-color inset;
  padding: 10px;
  text-align: center;
}
.fade-enter-active {
  transform: translateY(0px);
  transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
