<template src="./template.html" />

<script>
export default {
  data() {
    return {
      UserName: "",
      Pwd: "",
      Logining: false,
    };
  },
  methods: {
    getin() {
      // this.axios.defaults.baseURL = "https://bikebackend.azurewebsites.net/";
      if (this.UserName == "" && this.Pwd == "") {
        alert("請輸入帳號密碼!");
        return;
      }

      this.Logining = true;
      this.axios
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
            alert("帳號密碼錯誤，請查驗!");
          } else {
            alert(`${e}`);
          }
        });
      this.Logining = false;
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
