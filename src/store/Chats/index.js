import router from "../../router/index";
import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
import { store } from "../store";

export default {
  state: {
    chats:null
  },
  getters: {
    getChats(state) {
      return state.chats;
    }
  },
  mutations: {
    setChats(state, payload) {
      state.chats = payload;
    }
  },
  actions: {
    pushMessage({ commit, getters },payload){
      return new Promise((resolve,reject)=>{
        var docref = db.collection('chats').doc(payload.caseid)
        docref.update({
            chats: firebase.firestore.FieldValue.arrayUnion(payload.chat)
        }).catch(error=>{
          console.log(errors)
        });
        resolve()
      })
        
    }
  }
};
