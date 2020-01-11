<template>
  <div
    @mousedown="select($event)"
    :class="{selected: selected === option}"
    class="e-option"
  >{{option}}</div>
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

<style>

.e-options {
  position: absolute;
  left: 0;
  background: white;
  border: 1px solid #999;
  white-space: nowrap;
  border-radius: 4px;
  top: 100%;
}
.e-options.positionTop {
  top: auto;
  bottom: 100%;
}
.e-option {
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
}
.e-option:hover {
  background: #eee;
}

.selected {
  background: #ddd;
}

</style>