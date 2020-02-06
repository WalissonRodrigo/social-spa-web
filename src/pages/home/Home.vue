<template>
  <site-template>
    <!-- Template do Lado Esquerdo como se fosse o Perfil do Site -->
    <span slot="menu-esquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="6">
          <img :src="usuario.imagem" class="circle responsive-img" :alt="usuario.name">
        </grid-vue>
        <grid-vue tamanho="6">
          <span class="black-text">
            <h5>{{usuario.name}}</h5>
          </span>
        </grid-vue>
      </div>
    </span>
    <!-- Template do Lado Direito da Página do Site como a área de conteúdo e postagens -->
    <span slot="menu-direito">
      <publicar-conteudo/>
      <card-conteudo
        v-for="item in listaConteudos"
        :key="item.id"
        :id="item.id"
        :totalcurtidas="item.total_curtidas"
        :curtiuconteudo="item.curtiu_conteudo"
        cor="white lighten-5"
        sombra="5"
        textColor="black"
        :perfil="item.user.imagem"
        :nome="item.user.name"
        :data="item.data"
        :link="item.link"
      >
        <card-detalhe
          :imagem="item.imagem"
          :titulo="item.titulo"
          :descricao="item.texto"
          :link="item.link"
        ></card-detalhe>
      </card-conteudo>
    </span>
  </site-template>
</template>

<script>
import SiteTemplate from "@/template/SiteTemplate";
import CardMenu from "@/components/layouts/CardMenu";
import GridVue from "@/components/layouts/Grid";
import CardConteudo from "@/components/social/CardConteudo";
import CardDetalhe from "@/components/social/CardDetalhe";
import PublicarConteudo from "@/components/social/PublicarConteudo";

export default {
  name: "Home",
  data() {
    return {
      usuario: false
    };
  },
  components: {
    SiteTemplate,
    CardMenu,
    GridVue,
    CardConteudo,
    CardDetalhe,
    PublicarConteudo
  },
  created() {
    let usuarioAux = this.$store.getters.getUsuario;
    if (usuarioAux) {
      this.usuario = this.$store.getters.getUsuario;
      if (this.usuario.token == null) {
        this.$router.push("/login");
      }
      this.$http
        .get(`${this.$urlAPI}conteudo`, {
          headers: { authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(response => {
          if (response.data.status) {
            //login com sucesso
            //console.log(response.data.conteudos.data);
            this.$store.commit("setConteudos", response.data.conteudos.data);
          } else {
            //erros de validação
            window.Materialize.toast(
              "Você ainda não têm conteúdo postado. Faça sua primeira publicação.",
              5000,
              "red rounded"
            );
          }
        })
        .catch(e => {
          console.log(e);
          window.Materialize.toast(
            "Falha ao comunicar com o Servidor. Não foi possível carregar seu conteúdo postado. Tente novamente mais tarde!",
            5000,
            "red rounded"
          );
          this.$router.push("/login");
        });
    }
  },
  computed: {
    listaConteudos() {
      return this.$store.getters.getConteudos;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>