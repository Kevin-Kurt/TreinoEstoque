import Utils from "../../../../../Utils/FormatDate";

export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
    store: String,
  },

  created() {
    this.createFormatedDate = Utils.moment(this.service.created_at);
    this.updateFormatedDate = Utils.moment(this.service.updated_at);
  },

  data: () => ({
    createFormatedDate: null,
    updateFormatedDate: null,
  }),

  methods: {
    formatDate(date) {
      return Utils.moment(date);
    },
  },
};
