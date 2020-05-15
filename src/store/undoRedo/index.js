import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation_types";

Vue.use(Vuex);

const undo = {
  namespaced: true,
  state: {
    globalMutations: [],
    mutationsForRedoing: []
  },
  getters: {
    canUndo(state) {
      return state.globalMutations.length > 0;
    },
    canRedo(state) {
      return state.mutationsForRedoing.length > 0;
    }
  },
  mutations: {
    [types.REDO](state) {
      const { type, payload } = state.mutationsForRedoing.pop();

      this.commit(type, payload);
    },
    [types.UNDO](state) {
      state.mutationsForRedoing.push(state.globalMutations.pop());

      this.commit(`resetState`);

      state.globalMutations.forEach(({ type, payload }) => {
        this.commit(type, payload);

        state.globalMutations.pop();
      });
    },
    [types.ADD_GLOBAL_MUTATION](state, mutation) {
      if (
        mutation.type === `undoRedo/${types.UNDO}` ||
        mutation.type === `undoRedo/${types.REDO}` ||
        mutation.type === `resetState`
      ) {
        return;
      }

      state.globalMutations.push(mutation);
    }
  },
  actions: {}
};

export default undo;
