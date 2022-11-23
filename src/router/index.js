import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Pages/Login/template.vue";
import Home from "../components/Pages/Home/template.vue";
import SearchBike from "../components/Pages/SearchBike/template.vue";
import SearchPurchase from "../components/Pages/SearchPurchase/template.vue";
import Add from "../components/Pages/Add/template.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", name: "Login", component: Login },
    { path: "/Home", name: "Home", component: Home },
    {
      path: "/SearchBike",
      name: "SearchBike",
      component: SearchBike,
    },
    {
      path: "/SearchPurchase",
      name: "SearchPurchase",
      component: SearchPurchase,
    },
    { path: "/Add", name: "Add", component: Add },
  ],
});

export default router;
