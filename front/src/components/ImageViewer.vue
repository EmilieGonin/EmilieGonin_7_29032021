<template>
  <div class="image-viewer" v-if="image">
    <div
      class="image-viewer__container"
      :style="setSize"
      @click="$emit('closeViewer')"
    ></div>
    <div class="image-viewer__content" :style="setSize">
      <div class="image-viewer__button" @click="$emit('closeViewer')">
        <i class="fas fa-times fa-fw"></i>
      </div>
      <img :src="image" :style="setSize" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageViewer",
  data() {
    return {
      windowHeight: "",
      windowWidth: ""
    };
  },
  mounted() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  },
  props: {
    image: String
  },
  computed: {
    setSize() {
      return {
        maxHeight: this.windowHeight + "px",
        maxWidth: this.windowWidth + "px"
      };
    }
  },
  methods: {
    checkSize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.image-viewer {
  &__container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 98;
    width: 100%;
    height: 100%;
    background: fade-out($block-color, 0.3);
    text-align: center;
  }
  &__content {
    position: fixed;
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
