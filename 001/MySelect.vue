<template>
  <div class="select" @mousedown="open = true" @blur="onBlur" tabindex="0">
    <div class="select__label">
      {{selected ? selected.value : ""}}
      ▼
    </div>
    <ul class="options" v-if="open">
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
import MyOption from './MyOption.vue'

export default {
  props: ['options', 'value'],
  components: {
    MyOption
  },
  data() {
    return {
      open: false,
      selectedIndex: -1,
      positionBottom: true
    }
  },
  computed: {
    selected() {
      return this.options[this.selectedIndex]
    }
  },
  methods: {
    setSelection(value) {
      this.selectedIndex = this.options.indexOf(value)
    },
    onBlur() {
      this.open = false
    },
    onSelect(value) {
      this.setSelection(value)
      this.open = false
    }
  },
  mounted() {
    this.selectedIndex = this.options.length > 0 ? 0 : -1
  }
}
</script>

<style scoped>
.select {
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