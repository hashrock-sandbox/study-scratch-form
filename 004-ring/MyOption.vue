<template>
  <g
    @mousedown="select($event)"
    :class="{selected: selected}"
    :aria-selected="selected"
    class="option"
    role="option"
    :id="option.id"
  >
    <text
      font-size="70"
      x="0"
      y="0"
      text-anchor="middle"
      dominant-baseline="central"
    >{{option.value}}</text>
  </g>
</template>

<script>
export default {
  props: { selected: Boolean, option: Object },
  methods: {
    select() {
      this.$emit('select', this.option)
    }
  }
}
</script>

<style scoped>
.option {
  position: absolute;
  top: -50%;
  left: -50%;
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
  transition: all 0.5s ease-in-out;
  opacity: 0.2;
}
.option:hover {
  background: #ddd;
}
.selected {
  background: #aaa;
  opacity: 1;
}
</style>