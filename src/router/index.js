import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Pages/Login/template.vue";
import Home from "../components/Pages/Home/template.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", name: "Login", component: Login },
    { path: "/Home", name: "Home", component: Home },
  ],
});

export default router;
