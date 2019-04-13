/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import AlertComponent from './components/Shared/alert.vue'
import * as firebase from 'firebase'
import { store } from './store/store'
import VueFirestore from 'vue-firestore'
import Firebase from './firebase/firebase'


Vue.use(VueFirestore)
Vue.use(Vuetify, {
  theme: {
    primary: '#01579B',
    secondary: colors.blue.darken3,
    accent: colors.orange,
    error: colors.red.lighten1,
    warning: colors.purple.accent4,
    info: colors.blue.base,
    success: colors.green.base
  }
})

Vue.config.productionTip = false
Vue.use(VueCharts)

Vue.component('alert-component',AlertComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App),
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        store.dispatch("autoSignIn", user)
      }
    })
  }
  
})
