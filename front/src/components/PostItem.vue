<template>
  <div class="post-item" v-if="isLoggedIn && !loading">
    <!--Fullscreen Image Viewer-->
    <ImageViewer
      :image="file"
      v-if="file && viewer"
      @close-viewer="viewer = false"
    ></ImageViewer>
    <!--Header-->
    <div class="post-item__header">
      <!--Avatar-->
      <UserAvatar :user="User"></UserAvatar>
      <!--Name-->
      <router-link class="post-item__name" :to="'/user/' + User.id">
        {{ User.firstName }} {{ User.lastName }}
      </router-link>
      <!--Menu-->
      <div class="post-item__menu" v-if="User.id == user.id || user.isAdmin">
        <div class="post-item__menu-button" @click="toggle = !toggle">
          <i class="fal fa-ellipsis-h fa-fw"></i>
        </div>
        <ul v-show="toggle" class="post-item__menu-links">
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
            @click="edit()"
            v-if="User.id == user.id"
          >
            <i class="far fa-pen fa-fw"></i> Modifier
          </li>
        </ul>
      </div>
    </div>
    <!--Message-->
    <form
      class="post-item__edit-form"
      @submit.prevent="editPost()"
      enctype="multipart/form-data"
      action="index.html"
      method="post"
    >
      <ResizeAuto>
        <template v-slot:default="{ resize }">
          <textarea
            class="resize-text"
            :class="{ 'post-item__editable': editable }"
            @input="resize"
            @click="redirect()"
            :style="!isPostPage() && !editable ? 'cursor: pointer' : ''"
            v-model="postText"
            :ref="'post-' + id"
            rows="1"
            readonly
          >
          </textarea>
        </template>
      </ResizeAuto>
      <!--File-->
      <div
        class="post-item__file-container"
        v-if="(file || postFile) && !deleteFile"
      >
        <div class="post-item__file-buttons" v-if="editable">
          <!--Upload File Hidden Input-->
          <input
            type="file"
            id="postFile"
            ref="postFile"
            @change="handlePostFile()"
            class="hidden"
          />
          <!--Upload File Button-->
          <label for="postFile" class="post-item__button">
            <i class="fas fa-sync fa-fw"></i>
          </label>
          <!--Undo Upload File Button-->
          <div
            class="post-item__button"
            @click="removePostPreview()"
            v-if="postPreview && file"
          >
            <i class="fas fa-undo-alt fa-fw"></i>
          </div>
          <!--Delete File Button-->
          <div class="post-item__button" @click="removePostFile()">
            <i class="fas fa-times fa-fw"></i>
          </div>
        </div>
        <!--File Preview-->
        <img class="post-item__file" :src="postPreview" v-if="postPreview" />
        <!--Post File-->
        <img
          class="post-item__file"
          :src="file"
          @click="viewer = true"
          v-else-if="file && !deleteFile"
        />
      </div>
      <!--Empty File Block-->
      <div class="post-item__empty-file" v-else-if="editable">
        <input
          type="file"
          id="postFile"
          ref="postFile"
          @change="handlePostFile()"
          class="hidden"
        />
        <label for="postFile" class="post-item__button post-item__button--add">
          <i class="fas fa-plus fa-fw"></i>
        </label>
      </div>
      <!--Edit Buttons-->
      <div class="post-item__edit-buttons" v-if="editable">
        <!--Confirm Edit Button-->
        <button
          class="post-item__button post-item__button--valid"
          type="submit"
        >
          <i class="fas fa-check fa-fw"></i> Valider les modifications
        </button>
        <!--Cancel Edit Button-->
        <button
          class="post-item__button post-item__button--cancel"
          @click="cancelEdit()"
          type="button"
        >
          <i class="fas fa-times fa-fw"></i> Annuler les modifications
        </button>
      </div>
    </form>
    <!--Comments-->
    <div class="post-item__comments" v-if="!isPostPage()">
      <router-link :to="'/post/' + id" class="fas fa-comments"></router-link>
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
import UserAvatar from "@/components/UserAvatar.vue";
import ResizeAuto from "@/components/ResizeAuto.vue";
import ImageViewer from "@/components/ImageViewer.vue";

export default {
  name: "PostItem",
  components: {
    UserAvatar,
    ResizeAuto,
    ImageViewer
  },
  data() {
    return {
      toggle: false,
      editable: false,
      postText: this.text,
      deleteFile: false,
      postFile: "",
      postPreview: "",
      viewer: false
    };
  },
  props: {
    id: Number,
    text: String,
    file: String,
    User: Object,
    Comments: Array
  },
  computed: mapGetters(["user", "isLoggedIn", "loading"]),
  methods: {
    redirect() {
      if (!this.isPostPage() && !this.editable) {
        this.$router.push("/post/" + this.id);
      }
    },
    isPostPage() {
      if (this.$route.params.id) {
        return true;
      }
    },
    deletePost(postId, userId) {
      const post = {
        id: postId,
        userId: userId
      };
      this.$store
        .dispatch("deletePost", post)
        .then(() => {
          if (this.isPostPage()) {
            this.$router.push("/");
          } else {
            this.$store.dispatch("getPosts");
          }
        })
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la suppression du post."
          )
        );
    },
    edit() {
      this.$refs["post-" + this.id].removeAttribute("readonly");
      this.$refs["post-" + this.id].focus();
      this.toggle = false;
      this.editable = true;
    },
    cancelEdit() {
      this.$refs["post-" + this.id].setAttribute("readonly", true);
      this.editable = false;
      this.postText = this.text;
      this.deleteFile = false;
    },
    handlePostFile() {
      this.postFile = this.$refs.postFile.files[0];
      this.postPreview = URL.createObjectURL(this.postFile);
      event.target.value = "";
      this.deleteFile = false;
    },
    removePostPreview() {
      this.postFile = "";
      this.postPreview = "";
    },
    removePostFile() {
      this.postFile = "";
      this.postPreview = "";
      this.deleteFile = true;
    },
    editPost() {
      const post = {
        text: this.postText
      };
      const formData = new FormData();
      if (this.deleteFile) {
        post.deletefile = true;
        post.file = "";
      } else if (this.postFile) {
        formData.append("file", this.postFile);
      }
      formData.append("post", JSON.stringify(post));
      this.$store
        .dispatch("editPost", [formData, this.id])
        .then(() => {
          if (this.isPostPage()) {
            this.$store.dispatch("getPost", { postId: this.$route.params.id });
          } else {
            this.$store.dispatch("getPosts");
          }
        })
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
  &__menu {
    z-index: 2;
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
  &__file-container {
    position: relative;
  }
  &__file-buttons {
    display: flex;
    gap: 5px;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  &__button {
    display: inline-block;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
    background: $primary-color;
    color: white;
    font-size: $font-large;
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
    &--add {
      // padding: 5px 10px;
      background: $tertiary-color;
      &:hover {
        background: darken($tertiary-color, 5%);
      }
    }
  }
  &__empty-file {
    display: flex;
    justify-content: center;
    align-items: center;
    background: fade-out(white, 0.5);
    height: 80px;
    margin-bottom: 10px;
  }
  &__file {
    width: 100%;
    max-height: 350px;
    object-fit: cover;
  }
  &__comments {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: $font-mini;
    padding: 15px;
  }
}
</style>
