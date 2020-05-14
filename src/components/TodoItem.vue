<template>
  <article class="wrapper">
    <div :class="{ done: complete }" class="title">
      {{ title }}
    </div>
    <input type="checkbox" @change="handleOnChange" class="checkbox" />
    <button @click="handleRemove" class="remove">
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
      this.$store.commit(types.SET_STATE, {
        index: this.index,
        complete: checked
      });
    },
    handleRemove() {
      this.$store.commit(types.REMOVE_TODO, this.index);
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
