<template>
  <div :class="'col s'+tamanho || '6'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridVue",
  props: ["tamanho"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>