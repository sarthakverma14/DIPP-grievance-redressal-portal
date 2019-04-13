import router from "../../router/index";
import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
export default {
  state: {
    loading: false,
    error: null,
    success: null,
    allministrylist: []
  },
  getters: {
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    success(state) {
      return state.success;
    },
    getAllMinistryList(state) {
      return state.allministrylist;
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
    clearSuccess(state) {
      state.success = null;
    },
    setAllMinistryList(state, payload) {
      var templist = [];
      for (var key in payload) {
        payload[key].forEach(element => {
          templist.push({ ministry: element, class: key });
        });
      }
      state.allministrylist = templist;
    },
    clearAllMinistryList(state) {
      state.allministrylist = [];
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    clearSuccess({ commit }) {
      commit("clearSuccess");
    },
    fetchAllMinistryList({ commit }) {
      console.log("fetch");
      db.collection("allministries").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            commit("setAllMinistryList", change.doc.data());
          }
          if (change.type === "modified") {
            commit("setAllMinistryList", change.doc.data());
          }
          if (change.type === "removed") {
            commit("setAllMinistryList", change.doc.data());
          }
        });
      });      
    }
  }
};
