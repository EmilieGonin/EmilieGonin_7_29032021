<template>
  <div v-if="!loading">
    <PostItem v-bind="post"></PostItem>
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

export default {
  name: "Post",
  components: {
    PostItem,
    CommentItem
  },
  computed: mapGetters(["post", "loading"]),
  mounted() {
    this.$store.dispatch("getPost", { postId: this.$route.params.id });
  }
};
</script>
