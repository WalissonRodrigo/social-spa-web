// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlAPI = "http://192.168.2.208:8000/api/"

/* eslint-disable no-new */

var store = {
    state: {
        tituloPagina: 'Social',
        usuario: sessionStorage.getItem("usuario") ? JSON.parse(sessionStorage.getItem("usuario")) : null,
        conteudos: []
    },
    getters: {
        getTituloPagina: state => {
            return state.tituloPagina;
        },
        getUsuario: state => {
            return state.usuario;
        },
        getToken: state => {
            return state.usuario.token;
        },
        getConteudos: state => {
            return state.conteudos;
        }
    },
    mutations: {
        setUsuario(state, value) {
            state.usuario = value;
        },
        setConteudos(state, value) {
            state.conteudos = value;
        },
        setAddConteudos(state, value) {
            state.conteudos.push(value);
        }
    }
}

new Vue({
    el: '#app',
    store: new Vuex.Store(store),
    router,
    template: '<App/>',
    components: {
        App
    }
})