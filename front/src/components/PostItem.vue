<template>
  <div class="post-item">
    <div class="post-item__header">
      <img
        class="post-item__avatar"
        v-bind:src="User.avatar"
        alt=""
        v-if="User.avatar != null"
      />
      <img class="post-item__avatar" src="@/assets/default.jpg" alt="" v-else />
      <router-link class="post-item__name" :to="'/user/' + user.id">
        {{ User.firstName }} {{ User.lastName }}
      </router-link>
    </div>
    <div class="post-item__message">
      {{ text }}
    </div>
    <div class="post-item__comments">
      <router-link :to="'/post/' + id">2 commentaires</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PostItem",
  props: {
    id: Number,
    text: String,
    User: Object
  },
  computed: mapGetters(["user"])
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

.post-item {
  background: $block-color;
  margin: 15px;
  border-radius: 5px;
  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    height: $post-avatar + 15;
    padding: 5px 15px;
  }
  &__name {
    color: $primary-color;
    font-weight: bold;
  }
  &__avatar {
    width: $post-avatar;
    height: $post-avatar;
    border-radius: $post-avatar;
    object-fit: cover;
  }
  &__message {
    padding: 5px 15px;
    font-size: $font-default;
  }
  &__comments {
    font-size: $font-mini;
    padding: 15px;
  }
}
</style>
