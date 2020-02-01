<template>
  <li @mousedown="select($event)" :class="{selected: selected}" class="option">{{option.value}}</li>
</template>

<script>
export default {
  props: { selected: Boolean, option: Object },
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
  background: #ddd;
}
.selected {
  background: #aaa;
}
</style>