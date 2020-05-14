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
      state.todoList[index].complete = complete;
    },
    [types.REMOVE_TODO](state, index) {
      Vue.delete(state.todoList, index);
    }
  },
  actions: {}
};

export default todo;
