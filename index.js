Vue.component("e-option", {
  props: ["selected", "option"],
  template: `<div @mousedown="select($event)" :class="{selected: selected === option}" class="e-option">{{option}}</div>`,
  methods: {
    select(ev) {
      this.$emit("select", this.option);
    }
  }
});

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

new Vue({
  el: "#app",
  data: {
    open: false,
    options: ["Option 01", "Option 02", "Option 03", "Option 04", "Option 05"],
    value: "",
    selectedIndex: -1,
    active: false
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
          break;
        case "ArrowUp":
          this.open = true;
          this.selectedIndex--;
          break;
        case "ArrowDown":
          this.open = true;
          this.selectedIndex++;
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
