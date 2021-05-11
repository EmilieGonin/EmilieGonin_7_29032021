<template>
  <img
    class="avatar"
    :src="user.avatar"
    :alt="user.firstName + ' ' + user.lastName"
    :style="setSize"
    v-if="user.avatar && !defaultAvatar"
  />
  <img
    class="avatar"
    src="@/assets/default.png"
    :alt="user.firstName + ' ' + user.lastName"
    :style="setSize"
    v-else
  />
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    user: Object,
    size: String,
    defaultAvatar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setSize() {
      return {
        width: this.size,
        height: this.size,
        borderRadius: this.size
      };
    }
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
