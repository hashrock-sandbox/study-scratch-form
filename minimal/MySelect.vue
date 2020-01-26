<template>
  <div
    role="combobox"
    class="select"
    @mousedown="open = true"
    @blur="onBlur"
    @focus="onFocus"
    tabindex="0"
    @keydown.space.prevent="toggleOption"
    @keydown.up.prevent="moveSelect(-1)"
    @keydown.down.prevent="moveSelect(1)"
    @keydown.enter="closeOption(true)"
    @keydown.esc="closeOption(false)"
    :aria-expanded="open ? 'true' : 'false'"
    aria-haspopup="listbox"
    :aria-activedescendant="selected ? selected.id : null"
  >
    <div class="select__label">
      {{value}}
      <span aria-hidden="true">▼</span>
    </div>
    <ul class="options" v-if="open" role="listbox">
      <my-option
        v-for="(option, idx) in options"
        :key="idx"
        @select="onSelect"
        :selected="selected === option"
        :option="option"
      ></my-option>
    </ul>
  </div>
</template>

<script>
function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}
import MyOption from "./MyOption.vue";

export default {
  props: ["options", "value"],
  components: {
    MyOption
  },
  data() {
    return {
      open: false,
      selectedIndex: -1,
      active: false,
      positionBottom: true
    };
  },
  computed: {
    selected() {
      return this.options[this.selectedIndex];
    }
  },
  methods: {
    toggleOption() {
      this.apply();
      this.open = !this.open;
    },
    moveSelect(offset) {
      if (this.active) {
        this.open = true;
        this.selectedIndex += offset;
        this.clamp();
      }
    },
    closeOption(apply) {
      if (apply) {
        this.apply();
      }
      this.open = false;
    },
    clamp() {
      this.selectedIndex = clamp(
        this.selectedIndex,
        0,
        this.options.length - 1
      );
    },
    setSelection(value) {
      this.selectedIndex = this.options.indexOf(value);
    },
    apply() {
      if (this.open) {
        this.$emit("input", this.selected.value);
      }
    },
    onBlur() {
      this.open = false;
      this.active = false;
    },
    onSelect(value) {
      this.setSelection(value);
      this.apply();
      this.open = false;
    },
    onFocus() {
      this.active = true;
    }
  },
  mounted() {
    this.selectedIndex = this.options.length > 0 ? 0 : -1;
    this.apply();
  }
};
</script>

<style scoped>
.select {
  outline: 0px;
  position: relative;
  font-family: system-ui;
  border: 1px solid #999;
  padding: 0.25em 0.5em;
  line-height: 0.9em;
  border-radius: 4px;
  cursor: default;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.select:focus {
  border: 3px solid rgb(158, 189, 255);
}
.options {
  position: absolute;
  left: 0;
  background: white;
  border: 1px solid #999;
  white-space: nowrap;
  border-radius: 4px;
  top: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>