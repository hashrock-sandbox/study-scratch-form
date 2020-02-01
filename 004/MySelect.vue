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
  return Math.max(a, Math.min(b, x))
}
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
      active: false,
      positionBottom: true
    }
  },
  computed: {
    selected() {
      return this.options[this.selectedIndex]
    }
  },
  methods: {
    toggleOption() {
      this.apply()
      this.open = !this.open
    },
    moveSelect(offset) {
      if (this.active) {
        this.open = true
        this.selectedIndex += offset
        this.clamp()
      }
    },
    closeOption(apply) {
      if (apply) {
        this.apply()
      }
      this.open = false
    },
    clamp() {
      this.selectedIndex = clamp(this.selectedIndex, 0, this.options.length - 1)
    },
    setSelection(value) {
      this.selectedIndex = this.options.indexOf(value)
    },
    apply() {
      if (this.open) {
        this.$emit('input', this.selected.value)
      }
    },
    onBlur() {
      this.open = false
      this.active = false
    },
    onSelect(value) {
      this.setSelection(value)
      this.apply()
      this.open = false
    },
    onFocus() {
      this.active = true
    }
  },
  mounted() {
    this.selectedIndex = this.options.length > 0 ? 0 : -1
    this.apply()
  }
}
</script>

<style scoped>
.select {
  /* absoluteの基準地点 */
  position: relative;
  /* 見た目関連 */
  border: 1px solid #999;
  padding: 0.25em 0.5em;
  line-height: 0.9em;
  border-radius: 4px;
  cursor: default;
  /* アウトラインは消去（必ず代替アウトラインを設定すること） */
  outline: 0px;
}
.select:focus {
  /* 代替アウトライン */
  box-shadow: 0 0 0px 2px dodgerblue;
}
.options {
  /* 絶対配置 */
  position: absolute;
  /* 親要素の高さ分縦方向に移動 */
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #999;
  white-space: nowrap;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;  
}
</style>