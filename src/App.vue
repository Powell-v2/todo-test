<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as undoRedoTypes from "@/store/undoRedo/mutation_types";

export default {
  created() {
    this.$store.subscribe(mutation => {
      if (mutation.type !== `undoRedo/${undoRedoTypes.ADD_GLOBAL_MUTATION}`) {
        this.$store.commit(
          `undoRedo/${undoRedoTypes.ADD_GLOBAL_MUTATION}`,
          mutation
        );
      }
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
