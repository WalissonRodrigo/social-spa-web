<template>
  <footer :class="'page-footer ' + cor || 'blue darken-3'">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">{{logo || 'Site'}}</h5>
          <p class="grey-text text-lighten-4">{{descricao}}</p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">{{links}}</h5>
          <ul>
            <slot></slot>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        © {{ano || '2018'}} Copyright {{autor || 'Desconhecido'}}
        <a
          class="grey-text text-lighten-4 footer-social right"
          :href="contato1"
        >
          <i class="fab fa-facebook"></i> Facebook
        </a>
        <a class="grey-text text-lighten-4 footer-social right" :href="contato2">
          <i class="fab fa-linkedin"></i> Linkedin
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: [
    "cor",
    "links",
    "logo",
    "descricao",
    "ano",
    "autor",
    "contato1",
    "contato2"
  ]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.footer-social {
  margin-right: 25px;
  margin-left: 25px;
}
</style>