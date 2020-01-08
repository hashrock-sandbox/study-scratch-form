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
  >
    <div class="e-select__label">
      {{value}} 🞃
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
  data() {
    return {
      open: false,
      options: [
        "Option 01",
        "Option 02",
        "Option 03",
        "Option 04",
        "Option 05"
      ],
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
    setSelection(value) {
      this.selectedIndex = this.options.indexOf(value);
    },
    apply() {
      this.value = this.selected;
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
    this.selectedIndex = this.options.length > 0 ? 0 : 1;
    this.value = this.selected;
    this.$el.addEventListener("keydown", ev => {
      if (!this.active) {
        return;
      }
      switch (ev.code) {
        case "Tab":
          break;
        case "Space":
          if (this.open) {
            this.apply();
          }
          this.open = !this.open;
          ev.preventDefault();
          break;
        case "ArrowUp":
          this.open = true;
          this.selectedIndex--;
          ev.preventDefault();
          break;
        case "ArrowDown":
          this.open = true;
          this.selectedIndex++;
          ev.preventDefault();
          break;
        case "Enter":
          if (this.open) {
            this.open = false;
            this.apply();
          }
          break;
        case "Escape":
          if (this.open) {
            this.open = false;
          }
          break;
      }
      this.selectedIndex = clamp(
        this.selectedIndex,
        0,
        this.options.length - 1
      );
    });
  }
});

new Vue({
  el: "#app"
});
