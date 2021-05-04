<template>
  <div>
    <form class="newpost" @submit="newpost" action="index.html" method="post">
      <div class="newpost__post">
        <img
          class="newpost__avatar"
          :src="user.avatar"
          alt=""
          v-if="isLoggedIn && user.avatar != null"
        />
        <img class="newpost__avatar" src="@/assets/default.jpg" alt="" v-else />
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
      <div class="newpost__buttons">
        <input type="file" id="upload" class="hidden" />
        <label for="upload" class="newpost__upload-button">
          <i class="far fa-image-polaroid fa-fw"></i>
        </label>
        <button class="newpost__button" type="submit">Envoyer</button>
      </div>
    </form>
    <PostItem v-for="post in posts" v-bind="post" :key="post.id" />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      text: ""
    };
  },
  computed: mapState(["user", "posts"]),
  mounted() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    newpost(e) {
      e.preventDefault();
      const post = {
        text: this.text,
        UserId: this.$store.getters.user.id
      };
      if (post.text == "") {
        throw "Le post ne peut être vide.";
      }
      this.$store
        .dispatch("newpost", post)
        .then(() => this.$store.dispatch("getPosts"))
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
  padding: 10px;
  &__post {
    display: flex;
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
