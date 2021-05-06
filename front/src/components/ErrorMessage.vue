<template>
  <div class="error" v-if="error">{{ error }}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ErrorMessage",
  computed: mapGetters(["error"])
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

.error {
  font-size: $font-default;
  background: $error-color;
  box-shadow: 0 0 5px $block-color inset;
  padding: 10px;
  text-align: center;
}
</style>
