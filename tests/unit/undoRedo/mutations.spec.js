import { cloneDeep } from "lodash";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import todoStore from "@/store/todo";
import undoRedoStore from "@/store/undoRedo";
import * as todoMutations from "@/store/todo/mutation_types";
import * as undoRedoMutations from "@/store/undoRedo/mutation_types";

import { prefixTodoMutation } from "../todo/mutations.spec";

function prefixUndoRedoMutation(mutation) {
  return `undoRedo/${mutation}`;
}

let store;
beforeEach(() => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  store = new Vuex.Store({
    mutations: {
      resetState(state) {
        state.todo.todoList = [];
      }
    },
    modules: {
      todo: cloneDeep(todoStore),
      undoRedo: cloneDeep(undoRedoStore)
    }
  });

  store.subscribe(mutation => {
    if (
      mutation.type !==
      prefixUndoRedoMutation(undoRedoMutations.ADD_GLOBAL_MUTATION)
    ) {
      store.commit(
        prefixUndoRedoMutation(undoRedoMutations.ADD_GLOBAL_MUTATION),
        mutation
      );
    }
  });
});

const tasks = [
  {
    title: "UndoRedo Test #0",
    complete: false
  },
  {
    title: "UndoRedo Test #1",
    complete: false
  },
  {
    title: "UndoRedo Test #2",
    complete: false
  }
];

describe("UndoRedoMutations", () => {
  describe("Undo", () => {
    test("Removes items", () => {
      tasks.forEach(task => {
        store.commit(prefixTodoMutation(todoMutations.ADD_TODO), task);
      });

      tasks.forEach(() => {
        store.commit(prefixUndoRedoMutation(undoRedoMutations.UNDO));
      });

      expect(store.state.todo.todoList.length).toBe(0);
    });

    test("Restores items", () => {
      tasks.forEach(task => {
        store.commit(prefixTodoMutation(todoMutations.ADD_TODO), task);
      });

      tasks.forEach((task, index) => {
        store.commit(prefixTodoMutation(todoMutations.REMOVE_TODO), index);
      });

      tasks.forEach(() => {
        store.commit(prefixUndoRedoMutation(undoRedoMutations.UNDO));
      });

      expect(store.state.todo.todoList.length).toBe(tasks.length);
    });

    test("Reverts 'complete' status", () => {
      store.commit(prefixTodoMutation(todoMutations.ADD_TODO), tasks[2]);
      store.commit(prefixTodoMutation(todoMutations.SET_STATE), {
        index: 0,
        complete: true
      });
      store.commit(prefixTodoMutation(todoMutations.SET_STATE), {
        index: 0,
        complete: false
      });

      store.commit(prefixUndoRedoMutation(undoRedoMutations.UNDO));

      expect(store.state.todo.todoList[0].complete).toBe(true);

      store.commit(prefixUndoRedoMutation(undoRedoMutations.UNDO));

      expect(store.state.todo.todoList[0].complete).toBe(false);
    });
  });

  describe("Redo", () => {
    test("Replays 3 last undone changes ", () => {
      const numberOfChanges = 3;
      store.commit(prefixTodoMutation(todoMutations.ADD_TODO), tasks[1]);
      store.commit(prefixTodoMutation(todoMutations.SET_STATE), {
        index: 0,
        complete: true
      });
      store.commit(prefixTodoMutation(todoMutations.REMOVE_TODO), 0);

      Array(numberOfChanges)
        .fill("")
        .forEach(() => {
          store.commit(prefixUndoRedoMutation(undoRedoMutations.UNDO));
        });

      store.commit(prefixUndoRedoMutation(undoRedoMutations.REDO));

      expect(store.state.todo.todoList.length).toBe(1);
      expect(store.state.todo.todoList[0].complete).toBe(false);

      store.commit(prefixUndoRedoMutation(undoRedoMutations.REDO));

      expect(store.state.todo.todoList[0].complete).toBe(true);

      store.commit(prefixUndoRedoMutation(undoRedoMutations.REDO));

      expect(store.state.todo.todoList.length).toBe(0);
    });
  });
});
