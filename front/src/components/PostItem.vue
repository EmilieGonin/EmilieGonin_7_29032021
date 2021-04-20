<template>
  <div class="post-item">
    <div class="post-item__header">
      <img class="post-item__avatar" src="@/assets/default.jpg" alt="" />
      <span>Prénom Nom</span>
    </div>
    <div class="post-item__message">
      Cat ipsum dolor sit amet, doloremque, eum laborum. Deserunt inventore for
      vel. Irure occaecat. Suscipit aliquam incididunt. Inventore iste,
      exercitation ullam. Culpa est yet proident for officia esse aliquam or
      totam. Eum aperiam vel or consequat. Natus magnam qui so beatae. Vel
      pariatur doloremque quaerat so inventore. Beatae ullamco for tempora non
      so exercitationem. Aliquid magna culpa. Non eaque quae but voluptatem
      beatae aspernatur. Aute culpa aute. Do magni and dolor enim for veritatis.
      Aliqua esse. Sed iste or qui iure for adipisicing but illum vel. Culpa
      aperiam. Vel quasi adipisci. Aut ipsum nihil quo.
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem"
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

.post-item {
  background: $post-color;
  margin: 15px;
  border-radius: 5px;
  &__header {
    display: flex;
    align-items: center;
    gap: 5px;
    height: $post-avatar + 10;
    padding: 5px;
    color: $primary-color;
    font-weight: bold;
  }
  &__avatar {
    width: $post-avatar;
    height: $post-avatar;
    border-radius: $post-avatar;
    object-fit: cover;
  }
  &__message {
    padding: 15px;
    font-size: $font-default;
  }
}
</style>
