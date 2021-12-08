import moment from "moment";

export default {
  moment(date) {
    return moment(date).format("HH:mm:ss DD/MM/YYYY");
  },

  dateDiff(date1) {
    const now = moment(new Date());
    const past = moment(date1);
    const duration = moment.duration(now.diff(past));

    return parseInt(duration.asDays());
  },

  nowFormat(date) {
    return moment(date).format("YYYY-MM-DD");
  },
};
