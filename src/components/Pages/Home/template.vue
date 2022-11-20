<template src="./template.html" />

<script>
export default {
  components: {},
  data() {
    return {
      datalist: [],
    };
  },
  created() {
    this.axios.defaults.baseURL = "https://bikebackend.azurewebsites.net";
  },
  methods: {},
};
</script>
