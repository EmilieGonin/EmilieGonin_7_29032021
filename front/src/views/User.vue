<template>
  <div v-if="!loading && isLoggedIn">
    <div class="user">
      <UserAvatar
        class="user__avatar"
        :user="profileUser"
        :size="'150px'"
        v-if="profileUser"
      ></UserAvatar>
      <span class="user__name"
        >{{ profileUser.firstName }} {{ profileUser.lastName }}</span
      >
    </div>
    <div v-if="posts.length > 0">
      <PostItem v-for="post in posts" v-bind="post" :key="post.id"></PostItem>
    </div>
    <div class="user__empty-posts" v-else>
      <span v-if="isOwnProfile()">Vous ne possédez aucun post.</span>
      <span v-else>Cet utilisateur ne possède aucun post.</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from "@/components/PostItem.vue";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "User",
  components: {
    PostItem,
    UserAvatar
  },
  computed: mapGetters([
    "loading",
    "isLoggedIn",
    "error",
    "user",
    "posts",
    "profileUser"
  ]),
  created() {
    this.$store.dispatch("getUserPosts", this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.$store.dispatch("getUserPosts", this.$route.params.id);
      }
    }
  },
  methods: {
    isOwnProfile() {
      if (this.profileUser.id == this.user.id) {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.user {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 15px;
  &__avatar {
    border: 5px solid $block-color;
  }
  &__name {
    position: absolute;
    bottom: 0;
    padding: 5px 15px;
    border-radius: 5px;
    background: $block-color;
    color: $primary-color;
    font-weight: bold;
  }
  &__empty-posts {
    background: $block-color;
    margin: 15px;
    padding: 15px;
    border-radius: 5px;
    font-size: $font-default;
    text-align: center;
  }
}
</style>
