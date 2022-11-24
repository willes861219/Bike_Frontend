<template src="./template.html" />

<script>
export default {
  data() {
    return {
      UserName: "", //輸入帳號
      Pwd: "", //輸入密碼
      isLoading: false, //Loading
    };
  },
  methods: {
    async getin() {
      this.axios.defaults.baseURL = "https://bikebackend.azurewebsites.net/";
      if (this.UserName == "" && this.Pwd == "") {
        this.$buefy.toast.open({
          duration: 1000,
          message: `帳號、密碼未輸入`,
          position: "is-bottom",
          type: "is-danger",
        });
        return;
      }

      this.isLoading = true;
      await this.axios
        .post("/signin", {
          UserName: this.UserName,
          Password: this.Pwd,
        })
        .then((res) => {
          this.$store.state.APIToken = `${res.data["jwtToken"]}`;
          this.$store.state.UserName = `${res.data["name"]}`;
          this.$store.state.isLogin = true;
          this.$router.push("/AddPurchase");
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status == "400") {
            this.$buefy.toast.open({
              duration: 3000,
              message: `帳號、密碼有誤！請重新輸入`,
              position: "is-bottom",
              type: "is-danger",
            });
          } else {
            this.$buefy.dialog.alert({
              title: "Error",
              message: `${e}`,
              type: "is-danger",
              hasIcon: true,
              icon: "times-circle",
              iconPack: "fa",
              ariaRole: "alertdialog",
              ariaModal: true,
            });
          }
        });
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Ink free", "標楷體";

  .titleSection {
    font-size: 10vmin;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loginSection {
    flex: 1.5;

    .login-btn {
      text-align: center;
    }

    .test-msg {
      padding-top: 20px;
      font-family: "微軟正黑體";
    }
  }
}
</style>
