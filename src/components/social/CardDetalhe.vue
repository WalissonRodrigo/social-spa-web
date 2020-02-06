<template>
  <span>
    <div v-if="imagem && imagem != '#'" class="card-image">
      <a :href="imagem || '#'" target="_blank">
        <img :src="imagem">
      </a>
    </div>
    <div v-if="descricao" class="card-content">
      <span class="card-title">{{titulo}}</span>
      <p>{{descricao}}</p>
      <p v-if="link && link != '#'">
        <a :href="link">Confira mais aqui...</a>
      </p>
    </div>
  </span>
</template>

<script>
import CardMenu from "@/components/layouts/CardMenu";

export default {
  name: "CardDetalhe",
  props: ["imagem", "titulo", "descricao", "link"],
  components: {
    CardMenu
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>