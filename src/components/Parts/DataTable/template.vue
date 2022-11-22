<template src="./template.html" />

<script>
export default {
  name: "DataTable",
  props: ["dataList", "columnList", "selected", "isLoading", "perPage"],
  data() {
    return {
      sortIcon: "chevron-up", //icon樣式
      Selected: this.selected, //所選取列
      isEmpty: false, //判斷資料是否為空
      PerPage: this.perPage, //Get props自訂列數
    };
  },
  watch: {
    Selected(newVal) {
      if (newVal) {
        this.$emit("update:selected", this.Selected);
      } //傳遞回父元件
    },
  },
  methods: {},
};
</script>
<style>
.is-selected {
  /* background-color: #343243 !important; */
}
</style>
