<template>
  <div class="wrapper">
    <div class="select" tabindex="0">
      <div class="label">Option 01 ▼</div>
      <div class="options">
        <div class="option">Option 01</div>
        <div class="option">Option 02</div>
        <div class="option selected">Option 03</div>
        <div class="option">Option 04</div>
        <div class="option">Option 05</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.select {
  outline: 0px;
  position: relative;
  font-family: system-ui;
  border: 1px solid #999;
  padding: 0.25em 0.5em;
  line-height: 0.9em;
  border-radius: 4px;
  cursor: default;
}
.select:focus {
  box-shadow: 0 0 0px 2px dodgerblue;
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
.option {
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
}
.option:hover {
  background: #eee;
}
.selected {
  background: #ddd;
}
.wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>