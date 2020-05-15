import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation_types";

Vue.use(Vuex);

const todo = {
  namespaced: true,
  state: {
    todoList: []
  },
  getters: {},
  mutations: {
    [types.ADD_TODO](state, todo) {
      state.todoList.push(todo);
    },
    [types.SET_STATE](state, { index, complete }) {
      state.todoList = state.todoList.map((todo, idx) => {
        return index === idx ? { ...todo, complete } : todo;
      });
    },
    [types.REMOVE_TODO](state, index) {
      Vue.delete(state.todoList, index);
    }
  },
  actions: {}
};

export default todo;
