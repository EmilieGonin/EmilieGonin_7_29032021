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
      <!--Comment Menu-->
      <ul v-if="User.id == user.id || user.isAdmin" class="comment-item__menu">
        <!--Comment Edit button-->
        <li
          class="comment-item__menu-link"
          @click="edit()"
          v-if="User.id == user.id"
        >
          <i class="far fa-pen fa-fw"></i>
        </li>
        <!--Comment Delete button-->
        <li
          class="comment-item__menu-link comment-item__menu-link--delete"
          @click="deleteComment(id, User.id)"
        >
          <i class="far fa-trash-alt fa-fw"></i>
        </li>
      </ul>
    </div>
    <!--Comment Form-->
    <form
      class="comment-item__edit-form"
      @submit.prevent="editComment()"
      action="index.html"
      method="post"
    >
      <!--Message-->
      <ResizeAuto>
        <template v-slot:default="{ resize }">
          <textarea
            class="resize-text"
            :class="{ 'comment-item__editable': editable }"
            @input="resize"
            v-model="commentText"
            :ref="'comment-' + id"
            rows="1"
            readonly
          >
          </textarea>
        </template>
      </ResizeAuto>
      <!--Edit Comment Buttons-->
      <div class="comment-item__edit-buttons" v-if="editable">
        <!--Confirm Edit Button-->
        <button
          class="comment-item__button comment-item__button--valid"
          type="submit"
        >
          <i class="fas fa-check fa-fw"></i> Valider les modifications
        </button>
        <!--Cancel Edit Button-->
        <button
          class="comment-item__button comment-item__button--cancel"
          @click="cancelEdit()"
          type="button"
        >
          <i class="fas fa-times fa-fw"></i> Annuler les modifications
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";
import ResizeAuto from "@/components/ResizeAuto.vue";

export default {
  name: "CommentItem",
  components: {
    UserAvatar,
    ResizeAuto
  },
  data() {
    return {
      toggle: false,
      editable: false,
      commentText: this.text
    };
  },
  props: {
    id: Number,
    text: String,
    User: Object
  },
  computed: mapGetters(["user", "isLoggedIn"]),
  methods: {
    edit() {
      this.$refs["comment-" + this.id].removeAttribute("readonly");
      this.$refs["comment-" + this.id].focus();
      this.toggle = false;
      this.editable = true;
    },
    cancelEdit() {
      this.$refs["comment-" + this.id].setAttribute("readonly", true);
      this.editable = false;
      this.commentText = this.text;
    },
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
    editComment() {
      const comment = {
        text: this.commentText
      };
      this.$store
        .dispatch("editComment", [comment, this.id])
        .then(() => {
          this.$store.dispatch("getPost", { postId: this.$route.params.id });
        })
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
    position: relative;
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
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    border: 3px dashed $dark-theme;
    border-radius: 10px;
    padding: 5px;
  }
  &__menu-link {
    padding: 6px;
    align-items: center;
    cursor: pointer;
    font-size: $font-mini;
    border-radius: 24px;
    &:hover {
      background: fade-out(white, 0.9);
    }
    &--delete {
      color: mix($primary-color, red, 50%);
    }
  }
  &__edit-form {
    position: relative;
  }
  &__editable {
    background: $tertiary-color;
    color: black;
  }
  &__edit-buttons {
    display: flex;
    padding: 5px;
    justify-content: center;
    gap: 5px;
  }
  &__button {
    display: inline-block;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
    background: $primary-color;
    color: white;
    border: none;
    &--valid {
      padding: 5px 10px;
      background: $valid-color;
      &:hover {
        background: darken($valid-color, 5%);
      }
    }
    &--cancel {
      padding: 5px 10px;
      background: $error-color;
      &:hover {
        background: darken($error-color, 5%);
      }
    }
  }
  &__message {
    display: block;
    padding: 5px 15px 15px 15px;
    font-size: $font-default;
  }
}
</style>
