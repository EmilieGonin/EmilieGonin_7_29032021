<template>
  <div class="post-item" v-if="isLoggedIn">
    <!--Header-->
    <div class="post-item__header">
      <!--Avatar-->
      <img
        v-if="User.avatar != null"
        class="post-item__avatar"
        v-bind:src="User.avatar"
        alt=""
      />
      <img class="post-item__avatar" src="@/assets/default.jpg" alt="" v-else />
      <!--Name-->
      <router-link class="post-item__name" :to="'/user/' + User.id">
        {{ User.firstName }} {{ User.lastName }}
      </router-link>
      <!--Menu-->
      <div class="post-item__menu" v-if="User.id == user.id || user.isAdmin">
        <div class="post-item__menu-button" @click="toggle = !toggle">
          <i class="fal fa-ellipsis-h fa-fw"></i>
        </div>
        <ul v-show="!toggle" class="post-item__menu-links">
          <!--Delete button-->
          <li
            class="post-item__menu-link post-item__menu-link--delete"
            @click="deletePost(id, User.id)"
          >
            <i class="far fa-trash-alt fa-fw"></i> Supprimer
          </li>
          <!--Edit button-->
          <li
            class="post-item__menu-link"
            @click="editPost(id, User.id)"
            v-if="User.id == user.id"
          >
            <i class="far fa-pen fa-fw"></i> Modifier
          </li>
        </ul>
      </div>
    </div>
    <!--Message-->
    <router-link class="post-item__message" :to="'/post/' + id">
      {{ text }}
    </router-link>
    <!--File-->
    <img class="post-item__file" :src="file" v-if="file != null" />
    <!--Comments-->
    <div class="post-item__comments">
      <router-link :to="'/post/' + id" v-if="Comments.length > 0">
        {{ Comments.length }}
        <span v-if="Comments.length > 1">commentaires</span>
        <span v-else>commentaire</span>
      </router-link>
      <router-link :to="'/post/' + id" v-else>Aucun commentaire</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PostItem",
  data() {
    return {
      toggle: true
    };
  },
  props: {
    id: Number,
    text: String,
    file: String,
    User: Object,
    Comments: Array
  },
  computed: mapGetters(["user", "isLoggedIn"]),
  methods: {
    deletePost(postId, userId) {
      const post = {
        id: postId,
        userId: userId
      };
      this.$store
        .dispatch("deletePost", post)
        .then(() => this.$store.dispatch("getPosts"))
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la suppression du post."
          )
        );
    },
    editPost(postId, userId) {
      const post = {
        id: postId,
        UserId: userId
      };
      this.$store
        .dispatch("editPost", post)
        .then(() => this.$store.dispatch("getPosts"))
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la modification du post."
          )
        );
    }
  }
};
</script>

<style lang="scss" scoped>
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
  &__menu {
    position: relative;
    margin-left: auto;
  }
  &__menu-button {
    font-size: 20px;
    padding: 2px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      color: $primary-color;
      background: fade-out($primary-color, 0.9);
    }
  }
  &__menu-links {
    position: absolute;
    left: -10px;
    margin-top: 10px;
    padding: 10px;
    background: $block-color;
    border-radius: 10px;
    border: 2px solid $dark-theme;
    box-shadow: 0 0 3px black;
    &::before {
      content: "";
      position: absolute;
      top: -12px;
      left: 11px;
      border-style: solid;
      border-width: 0 12px 12px;
      border-color: $dark-theme transparent;
    }
    &::after {
      content: "";
      position: absolute;
      top: -10px;
      left: 13px;
      border-style: solid;
      border-width: 0 10px 10px;
      border-color: $block-color transparent;
    }
  }
  &__menu-link {
    display: flex;
    gap: 10px;
    padding: 5px;
    align-items: center;
    cursor: pointer;
    font-size: $font-default;
    border-radius: 5px;
    &:hover {
      background: fade-out(white, 0.9);
    }
    &--delete {
      color: mix($primary-color, red, 50%);
    }
  }
  &__message {
    display: block;
    padding: 5px 15px 15px 15px;
    font-size: $font-default;
  }
  &__file {
    width: 100%;
    max-height: 350px;
    object-fit: cover;
  }
  &__comments {
    font-size: $font-mini;
    padding: 15px;
  }
}
</style>
