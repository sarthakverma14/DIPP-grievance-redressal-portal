import router from "../../router/index";
import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
export default {
  state: {
    userid: null,
    class: ''
  },
  getters: {
    getUserId(state) {
      return state.userid;
    },
    getClass(state) {
      return state.class;
    },
  },
  mutations: {
    setUserId(state, payload) {
      state.userid = payload;
    },
    setClass(state, payload) {
      state.class = payload;
    }
  },
  actions: {
    signUserIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("dippusers")
        .where("email", "==", payload.email)
        .limit(1)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(dippuserdoc) {
            commit("setClass", dippuserdoc.data().class);
            commit("setLevel", dippuserdoc.data().level);
          });
          firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(data => {
              commit("setLoading", false);
              router.replace("/dashboard");
              commit("setSuccess", {
                message: "Logged In Successfully",
                status: true
              });              
              setTimeout(() => dispatch("clearSuccess"), 2000);
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
        });
    },
    autoSignIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      commit("setUserId", payload.uid);
      db.collection("dippusers")
        .where("email", "==", payload.email)
        .limit(1)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(dippuserdoc) {
            commit("setClass", dippuserdoc.data().class);
            commit("setLevel", dippuserdoc.data().level);   
          });
          dispatch('fetchAllMinistryList');
          dispatch("getProfileData");          
        });
      commit("setLoading", false);
      commit("setSuccess", { message: "Logged In successfully", status: true });
      setTimeout(() => commit("clearSuccess"), 2000);
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut();
      commit("setUserId", null);
      commit('setClass',null);
      commit('setCurrentCases',null)
      commit('setCaseDetails',null)
      commit('setApprovedCases',null)
      commit('setRejectedCases',null)
      commit('setTransferedCases',null)
      commit('setEscalatedCases',null)
      commit('clearAllMinistryList')
      commit('setChats',null)
      commit("setSuccess", {
        message: "Logged Out Successfully",
        status: true
      });
      router.replace("/signin");
      setTimeout(() => dispatch("clearSuccess"), 2000);
    },
    resetPassword: ({ commit }, payload) => {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(function() {
          commit("setSuccess", {
            message:
              "Password Reset link has been sent to your account linked with Eduscope",
            status: true
          });
          commit("setLoading", false);
        })
        .catch(function(error) {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    updatepassword({ commit, getters, dispatch }, payload) {
      console.log("vghj");
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(getters.getEmail, payload.oldpassword)
        .then(function(user) {
          firebase
            .auth()
            .currentUser.updatePassword(payload.newpassword)
            .then(function() {
              commit("setLoading", false);
              commit("setSuccess", {
                message: "Password updated successfully",
                status: true
              });
              dispatch("logout");
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    }
  }
};
