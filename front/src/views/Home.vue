<template>
  <div class="home">
    <PostItem v-for="post in posts" v-bind="post" :key="post.id" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostItem from "@/components/PostItem.vue";

export default {
  name: "Home",
  components: {
    PostItem
  },
  computed: mapState(["posts"]),
  mounted() {
    this.$store.dispatch("getPosts");
  }
};
</script>

<style lang="scss">
.home {
  width: 700px;
  margin: auto;
}
</style>
