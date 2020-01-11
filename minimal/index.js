Vue.component("e-option", {
  props: ["selected", "option"],
  template: `
    <div @mousedown="select($event)" :class="{selected: selected === option}" class="e-option">
      {{option}}
    </div>
  `,
  methods: {
    select() {
      this.$emit("select", this.option);
    }
  }
});

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

Vue.component("e-select", {
  template: `
  <div
    class="e-select"
    @mousedown="open = true"
    @blur="onBlur"
    @focus="onFocus"
    tabindex="0"
    ref="select"
    @keydown.space.prevent="toggleOption"
    @keydown.up.prevent="moveSelect(-1)"
    @keydown.down.prevent="moveSelect(1)"
    @keydown.enter="closeOption(true)"
    @keydown.esc="closeOption(false)"
  >
    <div class="e-select__label">
      {{value}} ▼
    </div>
    <div
      class="e-options"
      v-if="open"
      ref="options"
      :class="{positionTop: !positionBottom}"
    >
      <e-option
        v-for="(option, idx) in options"
        :key="idx"
        @select="onSelect"
        :selected="selected"
        :option="option"
      ></e-option>
    </div>
  </div>`,
  props: ["options"],
  data() {
    return {
      open: false,
      value: "",
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
        this.value = this.selected;
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
    this.value = this.selected;
  }
});

new Vue({
  el: "#app",
  data: {
    options: ["Option 01", "Option 02", "Option 03", "Option 04", "Option 05"]
  }
});
