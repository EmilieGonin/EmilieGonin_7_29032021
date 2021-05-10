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
    position: relative;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__field-text {
    color: $dark-theme;
    font-size: $font-mini;
    padding: 10px;
  }
  &__label {
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 5px;
    color: $dark-theme;
  }
  &__label-file {
    width: 80%;
    background: darken(white, 5%);
    color: black;
    font-size: $font-medium;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background: darken(white, 10%);
    }
  }
  &__input {
    width: 100%;
    background: darken(white, 5%);
    border: none;
    border-bottom: 2px solid darken(white, 8%);
    border-top: 2px solid grey;
    padding: 5px 5px 5px 10px;
    &[type="file"] {
      background: none;
      color: black;
      width: 80%;
    }
    &:focus:read-write {
      background: darken(white, 10%);
      border-bottom: 2px solid darken(white, 13%);
    }
    &:read-only {
      color: grey;
      background: darken(white, 10%);
      border-bottom: 2px solid darken(white, 13%);
      border-top: 2px solid darken(white, 13%);
      cursor: default;
    }
    &:focus:valid {
      border-top: 2px solid $valid-color;
    }
    &:focus:invalid {
      border-top: 2px solid $error-color;
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
    &--mini {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 29px;
      height: 29px;
      padding: 0;
    }
    &:hover {
      background: lighten($primary-color, 5%);
    }
    &--delete {
      margin-top: -15px;
      background: $error-color;
      &:hover {
        background: lighten($error-color, 5%);
      }
    }
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
