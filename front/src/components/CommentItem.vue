<template>
  <div>{{ User.firstName }} {{ User.lastName }}: {{ text }}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CommentItem",
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
        .then(() => this.$store.dispatch("getComments"))
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
        .then(() => this.$store.dispatch("getComments"))
        .catch(() =>
          console.error(
            "Une erreur s'est produite pendant la modification du commentaire."
          )
        );
    }
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";
</style>
