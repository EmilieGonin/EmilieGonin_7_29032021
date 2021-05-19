<template>
  <div class="date" :style="setMaxWidth">{{ getDate }} ({{ getTimeAgo }})</div>
</template>

<script>
import { format, formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";

export default {
  name: "DateItem",
  data() {
    return {
      maxWidth: ""
    };
  },
  props: {
    date: String
  },
  computed: {
    getDate() {
      return format(new Date(this.date), "dd MMMM yyyy", {
        locale: fr
      });
    },
    getTimeAgo() {
      return formatDistanceToNow(new Date(this.date), {
        addSuffix: true,
        includeSeconds: true,
        locale: fr
      });
    },
    setMaxWidth() {
      return {
        maxWidth: this.maxWidth
      };
    }
  },
  mounted() {
    this.checkDeviceWidth();
    window.addEventListener("resize", this.checkDeviceWidth);
  },
  methods: {
    checkDeviceWidth() {
      if (window.innerWidth < 450) {
        this.maxWidth = window.innerWidth - 165 + "px";
      } else {
        this.maxWidth = "none";
      }
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
