import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import { library } from "@fortawesome/fontawesome-svg-core";
// internal icons
import { faCheck, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, fas);
Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(VueAxios, axios);
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

// axios.defaults.baseURL = "https://bikebackend.azurewebsites.net/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
