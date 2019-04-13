import Vue from 'vue'
import Vuex from 'vuex'
import shared from './Shared'
import user from './User'
import profile from './Profile'
import complaints from './Complaints'
import chats from './Chats'


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    shared:shared,
    user:user,
    profile:profile,
    complaints:complaints,
    chats:chats
  }
})
