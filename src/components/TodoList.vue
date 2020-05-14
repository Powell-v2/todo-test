<template>
  <ul class="list">
    <TodoItem
      v-for="(todo, index) in todos"
      :key="todo.title"
      :title="todo.title"
      :complete="todo.complete"
      :index="index"
    />
  </ul>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  props: {
    todos: Array
  }
};
</script>

<style lang="scss">
.list {
  margin: 2rem auto;
  padding-left: 0;
  width: 80%;
}
</style>
