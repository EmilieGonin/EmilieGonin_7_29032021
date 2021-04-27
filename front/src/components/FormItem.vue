<template>
  <h1><slot name="title"></slot></h1>
  <slot name="fields"></slot>
  <button type="submit"><slot name="button">Envoyer</slot></button>
</template>

<script>
export default {
  name: "FormItem"
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
