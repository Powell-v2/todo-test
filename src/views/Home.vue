<template>
  <div class="home">
    <h1>Too Doo</h1>
    <section class="todo_panel">
      <form class="input_form">
        <input
          v-model="newTodoTitle"
          class="input_field"
          type="text"
          ref="input"
          placeholder="What has to be accomplished?"
        />
        <button
          @click="submitTodo"
          :disabled="isSubmitTodoButtonDisabled"
          type="button"
          class="submit_button"
        >
          Add
        </button>
      </form>
      <TodoList :todos="todos" />
    </section>
    <section class="undo_redo_panel">
      <button class="undo" @click="undo" :disabled="isUndoButtonDisabled">
        Undo
      </button>
      <button class="redo" @click="redo" :disabled="isRedoButtonDisabled">
        Redo
      </button>
    </section>
  </div>
</template>

<script>
import * as todoTypes from "@/store/todo/mutation_types";
import * as undoRedoTypes from "@/store/undoRedo/mutation_types";

import TodoList from "@/components/TodoList.vue";

export default {
  name: "Home",
  components: {
    TodoList
  },
  data() {
    return {
      newTodoTitle: "",
      isSubmitTodoButtonDisabled: true
    };
  },
  watch: {
    newTodoTitle() {
      if (this.newTodoTitle) {
        if (this.isSubmitTodoButtonDisabled) {
          this.isSubmitTodoButtonDisabled = false;
        }
      } else {
        this.isSubmitTodoButtonDisabled = true;
      }
    }
  },
  computed: {
    todos() {
      return this.$store.state.todo.todoList;
    },
    isUndoButtonDisabled() {
      return !this.$store.getters["undoRedo/canUndo"];
    },
    isRedoButtonDisabled() {
      return !this.$store.getters["undoRedo/canRedo"];
    }
  },
  methods: {
    submitTodo() {
      this.$store.commit(`todo/${todoTypes.ADD_TODO}`, {
        title: this.newTodoTitle,
        complete: false
      });

      this.newTodoTitle = "";
      this.$refs.input.focus();
    },
    undo() {
      this.$store.commit(`undoRedo/${undoRedoTypes.UNDO}`);
    },
    redo() {
      this.$store.commit(`undoRedo/${undoRedoTypes.REDO}`);
    }
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-rows: max-content 1fr;
  place-items: center;
  height: 100vh;
}

.todo_panel {
  display: grid;
  grid-template-rows: max-content 1fr;
  justify-items: center;
  min-height: 75vh;
  min-width: 50vw;
  border: 1px solid #aaa;
  border-radius: 6px;
}

.input_form {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 80% 20%;
  height: 1.5rem;
  width: 80%;
  margin-top: 2rem;

  .input_field,
  .submit_button {
    padding: 0.5rem;
    font-size: 1rem;
  }
}

.undo_redo_panel {
  position: absolute;
  top: 2rem;
  right: 2rem;

  .undo,
  .redo {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
}
</style>
