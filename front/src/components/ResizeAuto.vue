<script>
export default {
  name: "ResizeAuto",
  methods: {
    resize() {
      this.$el.nextSibling.style.height = "auto";
      this.$el.nextSibling.style.height = `${this.$el.nextSibling.scrollHeight}px`;
    }
  },
  mounted() {
    this.resize();
  },
  updated() {
    this.resize();
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
  margin-bottom: 10px;
  resize: none;
  overflow: hidden;
}
</style>
