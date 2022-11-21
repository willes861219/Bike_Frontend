<template src="./template.html" />

<script>
export default {
  data() {
    return {
      UserName: "",
      Pwd: "",
      isLoading: false,
      isFullPage: true,
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
          this.$router.push("/Home");
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

<style>
.Login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-btn {
  text-align: center;
}
</style>
