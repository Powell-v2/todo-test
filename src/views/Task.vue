<template>
  <div class="wrapper">
    <h1>Too doo called {{ title }}</h1>
    <p>Marked as {{ isDone ? "'done'" : "'undone'" }}</p>
    <router-link to="/">Go back</router-link>
  </div>
</template>

<script>
export default {
  name: "Task",
  computed: {
    title() {
      return this.$store.state.todo.todoList[this.$route.params.id].title;
    },
    isDone() {
      return this.$store.state.todo.todoList[this.$route.params.id].complete;
    }
  }
};
</script>
