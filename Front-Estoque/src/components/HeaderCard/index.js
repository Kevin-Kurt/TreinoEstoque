export default {
  name: "HeaderCard",

  props: {
    title: String,
    text: String,
    actionTitle: String,
    haveAction: Boolean,
  },

  methods: {
    action() {
      this.$emit("action");
    },
  },
};
