<template>
  <div class="date">{{ getDate }} ({{ getTimeAgo }})</div>
</template>

<script>
export default {
  name: "DateItem",
  props: {
    date: String
  },
  computed: {
    getDate() {
      const date = new Date(this.date);
      return date.toLocaleDateString("fr", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
    },
    getTimeAgo() {
      const date = new Date(this.date);
      const today = new Date(Date.now());

      const dayInterval = date.getDate() - today.getDate();
      const minutesInterval = date.getMinutes() - today.getMinutes();
      const secondsInterval = date.getSeconds() - today.getSeconds();

      if (dayInterval == 0 && minutesInterval != 0) {
        return new Intl.RelativeTimeFormat("fr").format(
          minutesInterval,
          "minutes"
        );
      } else if (dayInterval == 0 && minutesInterval == 0) {
        if (secondsInterval == 0) {
          return "à l'instant";
        } else {
          return new Intl.RelativeTimeFormat("fr").format(
            secondsInterval,
            "seconds"
          );
        }
      } else {
        return new Intl.RelativeTimeFormat("fr").format(dayInterval, "day");
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
