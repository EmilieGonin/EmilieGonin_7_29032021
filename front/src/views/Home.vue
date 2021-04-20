<template>
  <div class="home">
    <PostItem />
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  name: "Home",
  components: {
    PostItem
  }
};
</script>

<style lang="scss">
.home {
  width: 700px;
  margin: auto;
}
</style>
