<template>
  <h1 class="form__title"><slot name="title"></slot></h1>
  <slot name="fields"></slot>
  <button class="form__button" type="submit">
    <slot name="button">Envoyer</slot>
  </button>
  <slot name="text"></slot>
</template>

<script>
export default {
  name: "FormItem"
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background: white;
  margin-top: 20px;
  padding: 30px;
  border-radius: 10px;
  border: 5px solid $block-color;
  box-shadow: 0 0 5px black;
  &__title {
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 5px;
    text-align: center;
    color: $dark-theme;
    margin: 5px;
  }
  &__field {
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__label {
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 5px;
    border-bottom: 2px solid $primary-color;
    color: $dark-theme;
  }
  &__input {
    width: 100%;
    background: darken(white, 5%);
    border: none;
    border-bottom: 2px solid darken(white, 8%);
    padding: 5px 5px 5px 10px;
    //border-radius: 0 0 10px 5px;
    &:focus {
      background: darken(white, 10%);
      border-bottom: 2px solid darken(white, 13%);
    }
  }
  &__button {
    cursor: pointer;
    width: 70%;
    max-width: 500px;
    background: $primary-color;
    color: white;
    padding: 10px;
    border: none;
    margin-top: 15px;
  }
  &__text {
    position: relative;
    top: -10px;
    width: 100%;
    text-align: center;
    color: $dark-theme;
    font-size: $font-mini;
  }
  &__link {
    color: $primary-color;
    &:hover {
      color: lighten($primary-color, 15%);
      text-decoration: underline;
    }
  }
}
</style>
