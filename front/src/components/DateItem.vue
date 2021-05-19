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

      const yearInterval = date.getYear() - today.getYear();
      const monthInterval = date.getMonth() - today.getMonth();
      const dayInterval = date.getDate() - today.getDate();
      const hourInterval = date.getHours() - today.getHours();
      const minutesInterval = date.getMinutes() - today.getMinutes();
      const secondsInterval = date.getSeconds() - today.getSeconds();

      //Year
      if (yearInterval == -1) {
        return "l'année dernière";
      } else if (yearInterval == 1) {
        return new Intl.RelativeTimeFormat("fr").format(yearInterval, "year");
      } else {
        //Month
        if (monthInterval == -1) {
          return "le mois dernier";
        } else if (monthInterval != 0) {
          return new Intl.RelativeTimeFormat("fr").format(
            monthInterval,
            "month"
          );
        } else {
          //Day
          if (dayInterval == -1) {
            return "hier";
          } else if (dayInterval != 0) {
            return new Intl.RelativeTimeFormat("fr").format(dayInterval, "day");
          } else {
            //Hours
            if (hourInterval != 0) {
              return new Intl.RelativeTimeFormat("fr").format(
                hourInterval,
                "hours"
              );
            } else {
              //Minutes
              if (minutesInterval != 0) {
                return new Intl.RelativeTimeFormat("fr").format(
                  minutesInterval,
                  "minutes"
                );
              } else {
                //Seconds
                if (secondsInterval == 0) {
                  return "à l'instant";
                } else {
                  return new Intl.RelativeTimeFormat("fr").format(
                    secondsInterval,
                    "seconds"
                  );
                }
              }
            }
          }
        }
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
