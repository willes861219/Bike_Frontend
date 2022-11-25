<template src="./template.html" />

<script type="text/javascript">
export default {
  name: "NavBar",
  data() {
    return {
      LinkList: [
        ["新增採購單", "AddPurchase"],
        ["查詢採購", "SearchPurchase"],
        ["查詢腳踏車", "SearchBike"],
        ["回主頁", "Home"],
        ["設定", "Setting"],
        ["Open API", "API"],
      ], //導覽列顯示
    };
  },
  watch: {},
  methods: {
    LinkTo(LinkName) {
      switch (LinkName[0]) {
        case "Open API":
          window.location.href =
            "https://bikebackend.azurewebsites.net/swagger/index.html";
          break;
        // if (this.$store.state.UserName === "管理者威延") {
        //   window.location.href =
        //     "https://bikebackend.azurewebsites.net/swagger/index.html";
        // } else {
        //   alert("您並非相關人員");
        // }
        // break;
        default:
          this.$router.push(LinkName[1]);
          break;
      }
    },
    LogOut() {
      this.$store.state.isLogin = false;
      this.$router.push("/");
    }, //登出回首頁
  },
};
</script>
<style>
.navbar {
  font-family: "Ink free", "標楷體";
  font-size: 24px;
}
.navbar-item img {
  max-height: 3.75rem !important;
}
.navbar-burger {
  height: auto !important;
}
</style>
