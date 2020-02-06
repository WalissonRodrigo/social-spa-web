<template>
  <span>
    <header>
      <nav-bar logo="Social" url="/" cor="blue darken-1">
        <li v-if="!usuario">
          <router-link to="/login">Entrar</router-link>
        </li>
        <li v-if="!usuario">
          <router-link to="/cadastro">Cadastre-se</router-link>
        </li>
        <li v-if="usuario">
          <router-link to="/perfil">{{usuario.name}}</router-link>
        </li>
        <li v-if="usuario">
          <a href="#" v-on:click="sair">Sair</a>
        </li>
      </nav-bar>
    </header>
    <main>
      <div class="container">
        <div class="row">
          <grid-vue tamanho="4">
            <card-menu cor="white lighten-5" sombra="5">
              <slot name="menu-esquerdo"></slot>
            </card-menu>
            <card-menu cor="white lighten-5" sombra="5">
              <h3>Amigos</h3>
              <li>Boi</li>
              <li>Renan</li>
            </card-menu>
          </grid-vue>
          <grid-vue tamanho="8">
            <slot name="menu-direito"></slot>
          </grid-vue>
        </div>
      </div>
    </main>
    <footer-vue
      cor="blue darken-1"
      logo="Social"
      descricao="Social foi criado com a intenção de gerar apredizado sobre Vue com SPA."
      links="Contato do Autor"
      ano="2019"
      autor="Walisson Rodrigo"
      contato1="http://fb.com/walissonrodrigo0"
      contato2="http://www.linkedin.com/in/walissonrodrigo/"
    >
      {{ /** Conteúdo do Componente Footer */ }}
      <li>
        <a class="grey-text text-lighten-3">
          <i class="fa fa-phone"></i> +55 38 9 9749-8037
        </a>
      </li>
      <li>
        <a class="grey-text text-lighten-3" href="#/">
          <i class="fas fa-envelope"></i> walissonrodrigo@outlook.com
        </a>
      </li>
      <li>
        <a class="grey-text text-lighten-3" href="#/">
          <i class="fas fa-map-marker-alt"></i> Rua Altino Rodrigues, 128, Bocaiúva/MG
        </a>
      </li>
    </footer-vue>
  </span>
</template>
<script>
import NavBar from "@/components/layouts/NavBar";
import FooterVue from "@/components/layouts/Footer";
import GridVue from "@/components/layouts/Grid";
import CardMenu from "@/components/layouts/CardMenu";

export default {
  name: "SiteTemplate",
  data() {
    return {
      usuario: {
        name: "John Doe",
        imagem: "http://www.chessgames.com/f/70670.jpg"
      }
    };
  },
  components: {
    NavBar,
    FooterVue,
    GridVue,
    CardMenu
  },
  created() {
    let usuario = this.$store.getters.getUsuario;
    if (usuario) {
      this.usuario = this.$store.getters.getUsuario;
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    sair() {
      sessionStorage.clear();
      this.$store.commit("setUsuario", null);
      this.usuario = false;
      this.$router.push("/login");
    }
  }
};
</script>