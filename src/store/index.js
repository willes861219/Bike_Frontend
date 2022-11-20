import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isEdit: false,
    isdark: false,
    isOpen: true,
    pickWType: false,
    APIToken: "",
    UserName: "",
    UserCode: "",
    isInputPage: false,
    isDeletePage: false,
    selectedData: [],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
