<template>
  <svg
    width="400"
    height="400"
    role="combobox"
    class="select"
    @mousedown="toggleOption"
    @blur="onBlur"
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
    <g>
      <text
        style="transition: all 0.3s;"
        x="200"
        y="200"
        text-anchor="middle"
        dominant-baseline="central"
        :font-size="open ? 20 : 80"
      >{{value}}</text>
    </g>
    <g class="options" role="listbox" :aria-hidden="!open" transform="translate(200, 200)">
      <my-option
        v-for="(option, idx) in options"
        :key="idx"
        :transform="pie(idx)"
        @select="onSelect"
        :selected="selected === option"
        :option="option"
      />
    </g>
  </svg>
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
      positionBottom: true
    }
  },
  computed: {
    selected() {
      return this.options[this.selectedIndex]
    }
  },
  methods: {
    pie(idx) {
      const max = this.options.length
      const dst = this.open ? 100 : 500
      const offset = (max - this.selectedIndex) / max - 0.25
      const x = Math.cos((idx / max + offset) * 3.14 * 2) * dst
      const y = Math.sin((idx / max + offset) * 3.14 * 2) * dst
      return `translate(${x}, ${y})`
    },
    toggleOption() {
      this.apply()
      this.open = !this.open
    },
    moveSelect(offset) {
      this.open = true
      this.selectedIndex += offset
      this.clamp()
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
}
</style>