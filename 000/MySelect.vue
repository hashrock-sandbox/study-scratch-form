<template>
  <div class="select" @mousedown="open = true" @blur="open = false" tabindex="0">
    <div class="select__label">
      Option 01
      ▼
    </div>
    <ul class="options" v-if="open">
      <li class="option selected">Option 01</li>
      <li class="option">Option 02</li>
      <li class="option">Option 03</li>
      <li class="option">Option 04</li>
      <li class="option">Option 05</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  }
};
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
.option {
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
}
.option:hover {
  background: #ddd;
}
.selected {
  background: #aaa;
}
</style>