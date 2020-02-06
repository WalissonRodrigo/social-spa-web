<template>
  <site-template>
    <publicar-conteudo/>
    <span slot="menu-direito">
      <div class="card">
        <div class="card-title valign-wrapper">
          <h4 class="center-block">
            <i class="fas fa-user-secret"></i> Perfil
          </h4>
        </div>
        <div class="card-content">
          <div class="input-field">
            <i class="fas fa-user-alt prefix"></i>
            <input
              type="text"
              placeholder="Nome"
              class="materialize validate"
              name="name"
              v-model="usuario.name"
            >
            <label for="name">Nome</label>
          </div>
          <div class="input-field">
            <i class="fas fa-envelope prefix"></i>
            <input
              type="text"
              placeholder="Email"
              class="materialize validate"
              name="email"
              v-model="usuario.email"
            >
            <label for="email">Email</label>
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Imagem</span>
              <input type="file" v-on:change="salvaImagem">
            </div>
            <div class="file-path-wrapper">
              <input
                class="file-path validate"
                type="text"
                placeholder="Faça upload de uma imagem para o usuario"
              >
            </div>
          </div>
          <div class="input-field">
            <i class="fa fa-key prefix"></i>
            <input
              type="password"
              class="materialize validate"
              name="password"
              id="password"
              v-model="usuario.password"
            >
            <label for="password">Senha</label>
          </div>
          <div class="input-field">
            <i class="fa fa-key prefix"></i>
            <input
              type="password"
              class="materialize validate"
              name="password_confirmation"
              id="password_confirmation"
              v-model="usuario.password_confirmation"
            >
            <label for="password_confirmation">Confirme sua Senha</label>
          </div>
          <button class="btn waves-effect waves-light teal" v-on:click="perfil">
            <i class="fas fa-save"></i> Atualizar
          </button>
          <br>
        </div>
      </div>
    </span>
    <span slot="menu-esquerdo" class="valign-wrapper">
      <img
        :src="usuario.imagem || 'https://www.designerd.com.br/wp-content/uploads/2013/06/criar-rede-social.png'"
        alt="Rede Social"
        class="responsive-img"
      >
    </span>
  </site-template>
</template>

<script>
import SiteTemplate from "@/template/SiteTemplate";
import CardMenu from "@/components/layouts/CardMenu";

export default {
  name: "Perfil",
  data() {
    return {
      imagem: false,
      usuario: null
    };
  },
  components: {
    SiteTemplate,
    CardMenu
  },
  created() {
    this.usuario = this.$store.getters.getUsuario;
  },
  methods: {
    salvaImagem(event) {
      //code here to save images
      let file = event.target.files || event.dataTransfer.files;
      if (!file.length) {
        return;
      }
      let reader = new FileReader();
      reader.onloadend = event => {
        this.usuario.imagem = event.target.result;
      };
      reader.readAsDataURL(file[0]);
      this.imagem = true;
    },
    perfil() {
      this.$http
        .put(
          `${this.$urlAPI}perfil`,
          {
            name: this.usuario.name,
            email: this.usuario.email,
            imagem: this.imagem ? this.usuario.imagem : null,
            password: this.usuario.password,
            password_confirmation: this.usuario.password_confirmation
          },
          {
            headers: { authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(response => {
          if (response.data.status) {
            //login com sucesso
            window.Materialize.toast(
              "Perfil atualizado com sucesso!",
              5000,
              "blue rounded"
            );
            sessionStorage.setItem(
              "usuario",
              JSON.stringify(response.data.usuario)
            );
            this.$store.commit("setUsuario", response.data.usuario);
            this.usuario = response.data.usuario;
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