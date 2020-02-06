<template>
  <login-template>
    <publicar-conteudo/>
    <span slot="principal">
      <div class="card">
        <div class="card-title valign-wrapper">
          <h4 class="center-block">
            <i class="fas fa-user-secret" aria-hidden="true"></i> Login
          </h4>
        </div>
        <div class="card-content">
          <div class="input-field">
            <i class="fas fa-envelope material-icons prefix" aria-hidden="true"></i>
            <input type="text" class="validate" name="email" id="email" v-model="usuario.email">
            <label for="email">Email</label>
          </div>
          <div class="input-field">
            <i class="fa fa-key material-icons prefix" aria-hidden="true"></i>
            <input
              type="password"
              class="validate"
              name="senha"
              id="senha"
              v-model="usuario.password"
            >
            <label for="senha">Senha</label>
          </div>
          <button class="btn waves-effect waves-light blue" v-on:click="login">
            <i class="fal fa-sign-in"></i> Acessar
          </button>
          <router-link to="/cadastro" class="btn waves-effect waves-light teal">
            <i class="fas fa-plus"></i> Cadastrar
          </router-link>
          <br>
        </div>
      </div>
    </span>
    <span slot="menu-esquerdo" class="valign-wrapper">
      <card-menu>
        <img
          src="https://www.designerd.com.br/wp-content/uploads/2013/06/criar-rede-social.png"
          alt="Rede Social"
          class="responsive-img"
        >
      </card-menu>
    </span>
  </login-template>
</template>

<script>
import LoginTemplate from "@/template/LoginTemplate";
import CardMenu from "@/components/layouts/CardMenu";

export default {
  name: "Login",
  data() {
    return {
      usuario: { email: "", password: "" }
    };
  },
  components: {
    LoginTemplate,
    CardMenu
  },
  methods: {
    login() {
      this.$http
        .post(`${this.$urlAPI}login`, {
          email: this.usuario.email,
          password: this.usuario.password
        })
        .then(response => {
          if (response.data.status) {
            //login com sucesso
            window.Materialize.toast(
              "Login realizado com sucesso",
              5000,
              "blue rounded"
            );
            sessionStorage.setItem(
              "usuario",
              JSON.stringify(response.data.usuario)
            );
            this.$store.commit("setUsuario", response.data.usuario);
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
            window.Materialize.toast(
              "Não foi possível realizar login",
              5000,
              "red rounded"
            );
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