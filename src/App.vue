<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
.icon svg {
  width: 25px !important;
  height: 25px !important;
}
</style>
