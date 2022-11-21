<template src="./template.html" />

<script>
export default {
  data() {
    return {
      data: "",
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      hasInput: false,
      paginationOrder: "",
      inputPosition: "",
      inputDebounce: "",
    };
  },
};
</script>
