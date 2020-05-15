import Vue from "vue";
import Vuex from "vuex";
import todo from "./todo";
import undoRedo from "./undoRedo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    resetState(state) {
      state.todo.todoList = [];
    }
  },
  actions: {},
  modules: {
    todo,
    undoRedo
  }
});
