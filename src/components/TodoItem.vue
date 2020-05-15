<template>
  <article class="wrapper" data-cy="todo_item">
    <div :class="{ done: complete }" class="title" data-cy="todo_title">
      <router-link :to="'todo/' + index">
        {{ title }}
      </router-link>
    </div>
    <input
      type="checkbox"
      :checked="complete"
      @change="handleOnChange"
      class="checkbox"
    />
    <button @click="handleRemove" class="remove" data-cy="remove_button">
      X
    </button>
  </article>
</template>

<script>
import * as types from "@/store/todo/mutation_types";

export default {
  name: "TodoItem",
  props: {
    title: String,
    index: Number,
    complete: Boolean
  },
  methods: {
    handleOnChange({ target: { checked } }) {
      this.$store.commit(`todo/${types.SET_STATE}`, {
        index: this.index,
        complete: checked
      });
    },
    handleRemove() {
      this.$store.commit(`todo/${types.REMOVE_TODO}`, this.index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 80% 1fr 1fr;
  place-items: center;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  &:first-of-type {
    margin-top: 0;
  }

  a {
    text-align: left;
  }
}

.title {
  justify-self: left;
}

.remove {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.title,
.checkbox,
.remove {
  &:hover {
    cursor: pointer;
  }
}

.done {
  text-decoration: line-through;
}
</style>
