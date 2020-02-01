<template>
  <div class="app">
    <select>
      <option>Option 01</option>
      <option>Option 02</option>
      <option>Option 03</option>
      <option>Option 04</option>
      <option>Option 05</option>
    </select>

    <my-select :options="options" v-model="value"></my-select>
  </div>
</template>
<script>
import MySelect from './MySelect.vue'

export default {
  components: {
    MySelect
  },
  data() {
    return {
      value: '😀',
      options: [
        { value: '😀', id: 'Option01' },
        { value: '😄', id: 'Option02' },
        { value: '🤣', id: 'Option03' },
        { value: '😇', id: 'Option04' },
        { value: '🤩', id: 'Option05' },
        { value: '😚', id: 'Option06' },
        { value: '🤑', id: 'Option07' }
      ]
    }
  }
}
</script>

<style>
body,
html {
  height: 100%;
}
body {
  font-size: 16px;
  margin: 1rem;
}

.app {
  height: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
}

select {
  font-size: inherit;
}
</style>