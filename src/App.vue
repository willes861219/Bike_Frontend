<template>
  <div id="app">
    <NavBar></NavBar>
    <Background></Background>
    <keep-alive>
      <router-view class="router-view" />
    </keep-alive>
  </div>
</template>

<script>
import NavBar from "./components/Parts/NavBar/template.vue";
import Background from "./components/Parts/Background/template.vue";
export default {
  name: "app",
  components: { NavBar, Background },
  created() {
    document.title = "腳踏車庫存平台";
    this.axios.defaults.baseURL = "https://bikebackend.azurewebsites.net/api/";
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    this.timer = setInterval(this.checkStatus, 25000);
  },
  watch: {
    $route(to, from) {
      if (to.fullPath == from.fullPath) {
        console.log("一樣 跳過");
        return;
      } else if (!this.$store.state.isLogin && to.fullPath !== "/") {
        alert("請先登入!");
        this.$router.push("/");
      } else if (this.$store.state.isLogin && to.fullPath == "/") {
        this.$router.push("/Home");
      }
    }, //防止無登入跳轉路由
  },
  methods: {
    async checkStatus() {
      if (
        this.$store.state.isLogin === false &&
        this.$router.currentRoute.path === "/"
      ) {
        console.log("登入頁面pass");
        return;
      }

      await this.axios
        .get("Status", {
          headers: {
            Authorization: `bearer ${this.$store.state.APIToken}`,
          },
        })
        .then(() => {
          console.log("pass");
        })
        .catch((e) => {
          if (e.response.status == "401") {
            this.$store.state.isLogin = false;
            this.$router.push("/");
          }
        });
    }, //檢查Token是否過期
  },
};
</script>

<style>
.icon svg {
  width: 25px !important;
  height: 25px !important;
}
.router-view {
  height: 98%;
}

/* #app {
  width: 100%;
  height: 100%;
  background: url("http://unsplash.it/1200x800") center center no-repeat;
  background-size: cover;

  position: absolute;
  background-image: linear-gradient(to bottom right, #002f4b, #dc4225);
  opacity: 0.6;
} */
</style>
