<template>
  <div :class="'card-panel '+ cor || 'grey lighten-5' + ' z-depth-' + sombra || '1'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CardMenu",
  props: ["cor", "sombra"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>