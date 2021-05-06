<template>
  <img
    class="avatar"
    :src="user.avatar"
    :alt="user.firstName + ' ' + user.lastName"
    v-if="user.avatar"
  />
  <img
    class="avatar"
    src="@/assets/default.png"
    :alt="user.firstName + ' ' + user.lastName"
    v-else
  />
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    user: Object
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.avatar {
  width: $post-avatar;
  height: $post-avatar;
  border-radius: $post-avatar;
  object-fit: cover;
}
</style>
