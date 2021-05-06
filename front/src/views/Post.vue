<template>
  <!--Loading Needed-->
  <div v-if="!loading">
    <!--Post-->
    <PostItem v-bind="post"></PostItem>
    <!--New Comment Form-->
    <form
      class="newcomment"
      @submit="newcomment"
      action="index.html"
      method="post"
    >
      <div class="newcomment__post">
        <!--Avatar-->
        <UserAvatar :user="user"></UserAvatar>
        <!--ResizeAuto Message Input-->
        <ResizeAuto>
          <template v-slot:default="{ resize }">
            <textarea
              class="newcomment__text"
              @input="resize"
              v-model="text"
              placeholder="Postez un nouveau commentaire !"
            ></textarea>
          </template>
        </ResizeAuto>
      </div>
      <!--Submit Button-->
      <button class="newcomment__button" type="submit">Envoyer</button>
    </form>
    <!--Comments-->
    <CommentItem
      v-for="comment in post.Comments"
      v-bind="comment"
      :key="comment.id"
    ></CommentItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from "@/components/PostItem.vue";
import CommentItem from "@/components/CommentItem.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import ResizeAuto from "@/components/ResizeAuto.vue";

export default {
  name: "Post",
  components: {
    PostItem,
    CommentItem,
    UserAvatar,
    ResizeAuto
  },
  data() {
    return {
      text: ""
    };
  },
  computed: mapGetters(["user", "post", "loading", "isLoggedIn"]),
  mounted() {
    this.$store.dispatch("getPost", { postId: this.$route.params.id });
  },
  methods: {
    newcomment(e) {
      e.preventDefault();
      const comment = {
        text: this.text,
        postId: this.$store.getters.post.id,
        userId: this.$store.getters.user.id
      };
      if (comment.text == "") {
        throw "Le commentaire ne peut être vide.";
      }
      this.$store
        .dispatch("newcomment", comment)
        .then(() => {
          this.$store.dispatch("getPost", { postId: this.$route.params.id });
          this.text = "";
        })
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant l'envoi du commentaire."
          )
        );
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.newcomment {
  display: flex;
  flex-direction: column;
  background: $block-color;
  margin: 15px;
  border-radius: 5px;
  &__post {
    display: flex;
    padding: 10px;
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
  &__button {
    cursor: pointer;
    width: 15%;
    max-width: 100px;
    background: $primary-color;
    color: white;
    padding: 10px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    align-self: flex-end;
    &:hover {
      background: lighten($primary-color, 5%);
    }
  }
}
</style>
