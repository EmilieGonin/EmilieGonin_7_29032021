<template>
  <div>
    <!--New Post Form-->
    <form
      class="newpost"
      @submit="newpost"
      enctype="multipart/form-data"
      action="index.html"
      method="post"
    >
      <div class="newpost__post">
        <!--Avatar-->
        <img
          class="newpost__avatar"
          :src="user.avatar"
          alt=""
          v-if="isLoggedIn && user.avatar != null"
        />
        <img class="newpost__avatar" src="@/assets/default.jpg" alt="" v-else />
        <!--ResizeAuto Message Input-->
        <ResizeAuto>
          <template v-slot:default="{ resize }">
            <textarea
              class="newpost__text"
              @input="resize"
              v-model="text"
              placeholder="Postez un nouveau message !"
            ></textarea>
          </template>
        </ResizeAuto>
      </div>
      <!--Uploaded File Preview-->
      <div class="newpost__preview-container" v-if="preview">
        <div class="newpost__delete-preview" @click="removeFile()">
          <i class="fas fa-times fa-fw"></i>
        </div>
        <img class="newpost__preview" :src="preview" />
      </div>
      <!--Buttons-->
      <div class="newpost__buttons">
        <!--File Upload-->
        <input
          type="file"
          id="file"
          ref="file"
          @change="handleFile()"
          class="hidden"
        />
        <label for="file" class="newpost__upload-button">
          <i class="far fa-image-polaroid fa-fw"></i>
        </label>
        <!--Submit Button-->
        <button class="newpost__button" type="submit">Envoyer</button>
      </div>
    </form>
    <!--Posts-->
    <PostItem v-for="post in posts" v-bind="post" :key="post.id"></PostItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from "@/components/PostItem.vue";
import ResizeAuto from "@/components/ResizeAuto.vue";

export default {
  name: "Home",
  components: {
    PostItem,
    ResizeAuto
  },
  data() {
    return {
      text: "",
      file: "",
      preview: ""
    };
  },
  computed: mapGetters(["user", "posts", "isLoggedIn"]),
  mounted() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    handleFile() {
      this.file = this.$refs.file.files[0];
      this.preview = URL.createObjectURL(this.file);
    },
    removeFile() {
      this.file = "";
      this.preview = "";
    },
    newpost(e) {
      e.preventDefault();
      const post = {
        text: this.text,
        userId: this.$store.getters.user.id
      };
      if (post.text == "") {
        throw "Le post ne peut être vide.";
      }
      const formData = new FormData();
      if (this.file != "") {
        formData.append("file", this.file);
      }
      formData.append("post", JSON.stringify(post));
      this.$store
        .dispatch("newpost", formData)
        .then(() => {
          this.$store.dispatch("getPosts");
          this.file = "";
          this.preview = "";
        })
        .catch(() =>
          console.error("Une erreur s'est produite pendant l'envoi du post.")
        );
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.newpost {
  display: flex;
  flex-direction: column;
  background: $block-color;
  margin: 15px;
  border-radius: 5px;
  &__post {
    display: flex;
    padding: 10px;
  }
  &__avatar {
    width: $post-avatar;
    height: $post-avatar;
    border-radius: $post-avatar;
    object-fit: cover;
  }
  &__text {
    color: $font-color;
    width: 100%;
    background: $block-color;
    border: none;
    padding: 10px;
    resize: none;
    overflow: hidden;
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    padding: 10px;
  }
  &__preview-container {
    position: relative;
  }
  &__preview {
    width: 100%;
    max-height: 350px;
    object-fit: cover;
  }
  &__delete-preview {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
    background: $primary-color;
  }
  &__upload-button {
    font-size: 20px;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
    color: $primary-color;
    &:hover {
      background: fade-out($primary-color, 0.9);
    }
  }
  &__button {
    cursor: pointer;
    width: 15%;
    max-width: 100px;
    background: $primary-color;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    align-self: flex-end;
    &:hover {
      background: lighten($primary-color, 5%);
    }
  }
}
</style>
