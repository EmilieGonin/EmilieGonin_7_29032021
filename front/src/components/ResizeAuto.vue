<script>
export default {
  name: "ResizeAuto",
  methods: {
    resize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  },
  render() {
    return this.$slots.default({
      resize: this.resize
    });
  }
};
</script>

<style lang="scss">
// Importing the global css file
@import "@/assets/global.scss";

.resize-text {
  color: $font-color;
  width: 100%;
  background: $block-color;
  border: none;
  padding: 5px 15px;
  resize: none;
  overflow: hidden;
}
</style>
