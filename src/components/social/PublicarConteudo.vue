<template>
  <card-menu cor="white lighten-5" sombra="5">
    <div class="row">
      <grid-vue class="input-field" tamanho="12">
        <i class="fas fa-comment-alt prefix" aria-hidden="true"></i>
        <input v-model="conteudo.titulo" type="text" class="materialize" name="titulo">
        <label for="titulo">Titulo</label>

        <i v-if="conteudo.titulo" class="fas fa-comment prefix"></i>
        <textarea
          v-if="conteudo.titulo"
          v-model="conteudo.texto"
          placeholder="Conteúdo"
          class="materialize-textarea"
          name="texto"
        ></textarea>
        <i v-if="conteudo.titulo && conteudo.texto" class="fas fa-link prefix"></i>
        <input
          v-if="conteudo.titulo && conteudo.texto"
          v-model="conteudo.link"
          type="text"
          placeholder="Link"
          class="materialize"
          name="link"
        >
        <i v-if="conteudo.titulo && conteudo.texto" class="fas fa-image prefix"></i>
        <input
          v-if="conteudo.titulo && conteudo.texto"
          v-model="conteudo.imagem"
          type="text"
          placeholder="Url da Imagem"
          class="materialize"
          name="imagem"
        >
      </grid-vue>
      <button
        v-if="conteudo.titulo && conteudo.texto"
        @click="publicar"
        class="btn waves-effect waves-light right blue center"
      >
        <i class="fas fa-angle-right"></i> Publicar
      </button>
    </div>
  </card-menu>
</template>

<script>
import GridVue from "@/components/layouts/Grid";
import CardMenu from "@/components/layouts/CardMenu";

export default {
  name: "PublicarConteudo",
  props: [],
  data() {
    return {
      usuario: false,
      conteudo: {
        titulo: "",
        texto: "",
        link: "",
        imagem: ""
      }
    };
  },
  components: {
    GridVue,
    CardMenu
  },
  methods: {
    publicar() {
      this.$http
        .post(
          `${this.$urlAPI}conteudo/adicionar`,
          {
            titulo: this.conteudo.titulo,
            texto: this.conteudo.texto,
            link: this.conteudo.link,
            imagem: this.conteudo.imagem || "#"
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.getters.getToken}`
            }
          }
        )
        .then(response => {
          if (response.data.status) {
            //login com sucesso
            window.Materialize.toast(
              "Postagem realizada com sucesso",
              5000,
              "black rounded"
            );
            console.log(response.data);
            this.$store.commit("setConteudos", response.data.conteudos.data);
            this.conteudo = {
              titulo: "",
              texto: "",
              link: "",
              imagem: ""
            };
            this.$router.push("/");
          } else if (response.data.status == false && response.data.validacao) {
            //login não existe
            for (let erro of Object.values(response.data.validacao)) {
              window.Materialize.toast(erro, 5000, "yellow rounded");
            }
          } else {
            //erros de validação
            for (let erro of Object.values(response.data)) {
              window.Materialize.toast(erro, 5000, "red rounded");
            }
          }
        })
        .catch(e => {
          console.log(e);
          window.Materialize.toast(
            "Falha ao comunicar com o Servidor. Tente novamente mais tarde!",
            5000,
            "red rounded"
          );
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>