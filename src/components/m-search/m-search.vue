<template>
  <div class="search">
    <input placeholder="Search for users..." v-model="value" />
    <font-awesome-icon :icon="['fasr', 'magnifying-glass']" />
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  max-width: 100%;
  border-radius: 6px;
  background-color: #f6f7f9;
  padding: 6px 12px;
  input {
    overflow: hidden;
    background-color: transparent;
    border: 0;
    min-height: fit-content;

    height: 40px;
    width: 100%;
    outline: 0;
  }
}
</style>

<script setup lang="ts">
const value = defineModel();
</script>
