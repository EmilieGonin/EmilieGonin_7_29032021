<template>
  <div class="comment-item" v-if="isLoggedIn">
    <!--Header-->
    <div class="comment-item__header">
      <!--Avatar-->
      <UserAvatar :user="User"></UserAvatar>
      <!--Name-->
      <router-link class="comment-item__name" :to="'/user/' + User.id">
        {{ User.firstName }} {{ User.lastName }}
      </router-link>
      <!--Menu-->
      <div class="comment-item__menu" v-if="User.id == user.id || user.isAdmin">
        <div class="comment-item__menu-button" @click="toggle = !toggle">
          <i class="fal fa-ellipsis-h fa-fw"></i>
        </div>
        <ul v-show="!toggle" class="comment-item__menu-links">
          <!--Delete button-->
          <li
            class="comment-item__menu-link comment-item__menu-link--delete"
            @click="deleteComment(id, User.id)"
          >
            <i class="far fa-trash-alt fa-fw"></i> Supprimer
          </li>
          <!--Edit button-->
          <li
            class="comment-item__menu-link"
            @click="editComment(id, User.id)"
            v-if="User.id == user.id"
          >
            <i class="far fa-pen fa-fw"></i> Modifier
          </li>
        </ul>
      </div>
    </div>
    <!--Message-->
    <div class="comment-item__message">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "CommentItem",
  components: {
    UserAvatar
  },
  data() {
    return {
      toggle: true
    };
  },
  props: {
    id: Number,
    text: String,
    User: Object
  },
  computed: mapGetters(["user", "isLoggedIn"]),
  methods: {
    deleteComment(commentId, userId) {
      const comment = {
        id: commentId,
        userId: userId
      };
      this.$store
        .dispatch("deleteComment", comment)
        .then(() =>
          this.$store.dispatch("getPost", { postId: this.$route.params.id })
        )
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la suppression du commentaire."
          )
        );
    },
    editComment(commentId, userId) {
      const comment = {
        id: commentId,
        UserId: userId
      };
      this.$store
        .dispatch("editComment", comment)
        .then(() =>
          this.$store.dispatch("getPost", { postId: this.$route.params.id })
        )
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la modification du commentaire."
          )
        );
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.comment-item {
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
}
</style>
