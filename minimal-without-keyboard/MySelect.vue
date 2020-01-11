<template>
  <div
    class="select"
    @mousedown="open = true"
    @blur="onBlur"
    @focus="onFocus"
    tabindex="0"
  >
    <div class="select__label">{{value}} ▼</div>
    <div class="options" v-if="open">
      <my-option
        v-for="(option, idx) in options"
        :key="idx"
        @select="onSelect"
        :selected="selected"
        :option="option"
      ></my-option>
    </div>
  </div>
</template>

<script>
import MyOption from "./MyOption.vue"

export default {
  props: ["options"],
  components :{
    MyOption
  },
  data() {
    return {
      open: false,
      value: "",
      selectedIndex: 0,
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
    onBlur() {
      this.open = false;
      this.active = false;
    },
    onSelect(value) {
      this.selectedIndex = this.options.indexOf(value);
        this.value = this.selected;
      this.open = false;
    },
    onFocus() {
      this.active = true;
    }
  },
  mounted() {
    this.value = this.selected;
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
.select:focus{
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
}
</style>