<template>
  <div class="select" @mousedown="open = true" @blur="onBlur" tabindex="0">
    <div class="select__label">
      {{value}}
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
    apply() {
      if (this.open) {
        this.$emit('input', this.selected.value)
      }
    },
    onBlur() {
      this.open = false
    },
    onSelect(value) {
      this.setSelection(value)
      this.apply()
      this.open = false
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