Vue.component("e-option", {
  props: ["selected", "option"],
  template: `<div @mousedown="select($event)" :class="{selected: selected === option}" class="e-option">{{option}}</div>`,
  methods: {
    select(ev) {
      this.$emit("select", this.option);
      ev.preventDefault();
    }
  }
});

new Vue({
  el: "#app",
  data: {
    open: false,
    options: ["Option 01", "Option 02", "Option 03", "Option 04", "Option 05"],
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
    onBlur() {
      this.open = false;
      this.active = false;
    },
    onSelect(value) {
      this.setSelection(value);
      this.open = false;
    },
    onFocus() {
      this.active = true;
    }
  },
  mounted() {
    this.selectedIndex = this.options.length > 0 ? 0 : 1;
    this.$el.addEventListener("keydown", ev => {
      if (!this.active) {
        return;
      }
      switch (ev.code) {
        case "Tab":
          break;
        case "Space":
          this.open = !this.open;
          break;
        case "ArrowUp":
          this.open = true;
          if (this.selectedIndex > 0) {
            this.selectedIndex--;
          }
          break;
        case "ArrowDown":
          this.open = true;
          if (this.selectedIndex < this.options.length - 1) {
            this.selectedIndex++;
          }
          break;
        case "Enter":
          if (this.open) {
            this.open = false;
          }
      }
    });
  }
});
