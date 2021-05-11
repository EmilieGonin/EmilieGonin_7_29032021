<template>
  <div class="image-viewer" v-if="image">
    <div
      class="image-viewer__container"
      :style="setHeight"
      @click="$emit('closeViewer')"
    ></div>
    <div class="image-viewer__content" :style="setHeight">
      <div class="image-viewer__button" @click="$emit('closeViewer')">
        <i class="fas fa-times fa-fw"></i>
      </div>
      <img :src="image" :style="setHeight" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageViewer",
  data() {
    return {
      setHeight: {
        maxHeight: window.innerHeight + "px"
      }
    };
  },
  props: {
    image: String
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.image-viewer {
  &__container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 98;
    width: 100%;
    height: 100%;
    background: fade-out($block-color, 0.3);
    text-align: center;
  }
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  &__button {
    position: absolute;
    top: 3px;
    right: 3px;
    cursor: pointer;
    background: $primary-color;
    padding: 5px;
    border-radius: 20px;
  }
}
</style>
