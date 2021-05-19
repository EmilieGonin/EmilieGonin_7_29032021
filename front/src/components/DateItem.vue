<template>
  <div class="date">{{ getDate }} ({{ getTimeAgo }})</div>
</template>

<script>
import { format, formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";

export default {
  name: "DateItem",
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
