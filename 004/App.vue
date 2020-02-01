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
      value: 'Option 01',
      options: [
        { value: 'Option 01', id: 'Option01' },
        { value: 'Option 02', id: 'Option02' },
        { value: 'Option 03', id: 'Option03' },
        { value: 'Option 04', id: 'Option04' },
        { value: 'Option 05', id: 'Option05' }
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
  margin: 0;
}

.app {
  height: 100%;
  display: flex;
  width: 300px;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
}

select {
  font-size: inherit;
}
</style>