<template>
  <div class="date">
    {{ getDate }} <span v-if="!onMobile">({{ getTimeAgo }})</span>
  </div>
</template>

<script>
import { format, formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";

export default {
  name: "DateItem",
  data() {
    return {
      onMobile: false
    };
  },
  props: {
    date: String
  },
  computed: {
    getDate() {
      return format(new Date(this.date), "dd MMMM yyyy, HH'h'mm", {
        locale: fr
      });
    },
    getTimeAgo() {
      return formatDistanceToNow(new Date(this.date), {
        addSuffix: true,
        includeSeconds: true,
        locale: fr
      });
    }
  },
  mounted() {
    this.checkDevice();
    window.addEventListener("resize", this.checkDevice);
  },
  methods: {
    checkDevice() {
      this.onMobile = window.innerWidth < 450;
    }
  }
};
</script>

<style lang="scss" scoped>
// Importing the global css file
@import "@/assets/global.scss";

.date {
  font-size: $font-mini;
  margin-top: 3px;
}
</style>
