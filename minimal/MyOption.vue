<template>
  <li
    @mousedown="select($event)"
    :class="{selected: selected === option}"
    class="option"
  >{{option}}</li>
</template>

<script>
export default {
  props: ["selected", "option"],
  methods: {
    select() {
      this.$emit("select", this.option);
    }
  }
};
</script>

<style scoped>
.option {
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
}
.option:hover {
  background: #eee;
}
.selected {
  background: #ddd;
}
</style>