import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Pages/Login/template.vue";
import Home from "../components/Pages/Home/template.vue";
import Setting from "../components/Pages/Setting/template.vue";
import SearchBike from "../components/Pages/SearchBike/template.vue";
import SearchPurchase from "../components/Pages/SearchPurchase/template.vue";
import AddPurchase from "../components/Pages/AddPurchase/template.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", name: "Login", component: Login },
    { path: "/Home", name: "Home", component: Home },
    { path: "/Setting", name: "Setting", component: Setting },
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
    { path: "/AddPurchase", name: "AddPurchase", component: AddPurchase },
  ],
});

export default router;
