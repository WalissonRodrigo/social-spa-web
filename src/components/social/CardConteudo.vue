<template>
  <div :class="'card '+ cor || '' + ' z-depth-' + sombra || '1'">
    <div :class="'card-content '+textColor+'-text'">
      <div class="row valign-wrapper">
        <grid-vue tamanho="1">
          <img :src="perfil" class="circle responsive-img">
        </grid-vue>
        <grid-vue tamanho="11">
          <span :class="textColor+'-text'">
            <strong>{{nome}}</strong> -
            <small>{{data}}</small>
          </span>
        </grid-vue>
      </div>
      <slot/>
    </div>
    <div class="card-action">
      <p>
        <a style="cursor:pointer" @click="curtida(id)">
          <i class="material-icons">{{curtiu}}</i>
          {{totalCurtidas}}
        </a>
        <a style="cursor:pointer" @click="abreComentarios(id)">
          <i class="material-icons">insert_comments</i>
          {{totalComentarios}}
        </a>
      </p>
      <p class="right-align">
        <input type="text" placeholder="Deixe seu comentario" v-model="comentario">
        <button @click="comentar" class="btn waves-effect waves-light orange">
          <i class="material-icons">send</i>
        </button>
      </p>
      <legend>Comentários da Postagem</legend>
      <div>
        <ul class="collection">
          <li class="collection-item avatar">
            <img src="https://materializecss.com/images/yuna.jpg" alt class="circle">
            <span class="title">
              Maria da Silva
              <small>14h04 06/04/2019</small>
            </span>
            <p>Gostei desse conteúdo!</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import GridVue from "@/components/layouts/Grid";

export default {
  name: "CardConteudo",
  props: [
    "id",
    "totalcurtidas",
    "curtiuconteudo",
    "cor",
    "sombra",
    "textColor",
    "perfil",
    "nome",
    "data",
    "link"
  ],
  components: {
    GridVue
  },
  data() {
    return {
      curtiu: this.curtiuconteudo ? "favorite" : "favorite_border",
      totalCurtidas: this.totalcurtidas,
      totalComentarios: 0,
      comentario: ""
    };
  },
  methods: {
    curtida(id) {
      this.$http
        .put(
          `${this.$urlAPI}conteudo/curtir/${id}`,
          { id: id },
          {
            headers: { authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(response => {
          if (response.data.status) {
            this.totalCurtidas = response.data.curtidas;
            this.$store.commit(
              "setConteudos",
              response.data.lista.conteudos.data
            );
            if (this.curtiu == "favorite_border") this.curtiu = "favorite";
            else this.curtiu = "favorite_border";
          } else {
            //erros de validação
            window.Materialize.toast(
              "Ocorreu um erro ao alterar o valor da curtida.",
              5000,
              "red darken-1 rounded"
            );
          }
        })
        .catch(e => {});
    },
    comentar(id) {
      //
    },
    abreComentarios(id) {
      //
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>