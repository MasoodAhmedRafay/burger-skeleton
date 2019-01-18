import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: io(),
    uiLabels:{},
    lang: "en"
  },
  getters: {
    getSocket: state => state.socket,
    getLang: state => state.lang,
    getUiLabels: state => state.uiLabels
  },
  mutations: { //manipulating data in the store
    setUiLabels:function(store, labels){
      store.uiLabels = labels;
      this.state.uiLabels = labels;
    },
    switchLang:function(store, lang){
      store.lang = lang;
      this.state.lang = lang;
    }
  },
  actions: {
  }
})
