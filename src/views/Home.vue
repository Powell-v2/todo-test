<template>
  <div class="home">
    <h1>Too Doo</h1>
    <section class="panel">
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
          :disabled="isButtonDisabled"
          type="button"
          class="submit_button"
        >
          Add
        </button>
      </form>
      <TodoList :todos="todos" />
    </section>
  </div>
</template>

<script>
import * as types from "@/store/todo/mutation_types";

import TodoList from "@/components/TodoList.vue";

export default {
  name: "Home",
  components: {
    TodoList
  },
  data() {
    return {
      newTodoTitle: "",
      isButtonDisabled: true
    };
  },
  watch: {
    newTodoTitle() {
      if (this.newTodoTitle) {
        if (this.isButtonDisabled) {
          this.isButtonDisabled = false;
        }
      } else {
        this.isButtonDisabled = true;
      }
    }
  },
  computed: {
    todos() {
      return this.$store.state.todo.todoList;
    }
  },
  methods: {
    submitTodo() {
      this.$store.commit(types.ADD_TODO, {
        title: this.newTodoTitle,
        complete: false
      });

      this.newTodoTitle = "";
      this.$refs.input.focus();
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

.panel {
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
</style>
