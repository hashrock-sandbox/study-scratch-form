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
.option {
  line-height: 1.5em;
  padding: 0 0.5em;
  cursor: default;
}
.option:hover {
  background: #eee;
}
.option.selected {
  background: #888;
  color: white;
}
</style>