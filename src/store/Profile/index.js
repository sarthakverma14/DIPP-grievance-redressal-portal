// import router from "../../router/index";
// import firebase from "../../firebase/firebase";
import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
export default {
  state: {
    email: null,
    contact: null,
    name: null,
    rating: null,
    level: null
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
    getContact(state) {
      return state.contact;
    },
    getName(state) {
      return state.name;
    },
    getRating(state) {
      return state.rating;
    },
    getLevel(state) {
      return state.level;
    }
  },
  mutations: {
    setEmail(state, payload) {
      state.email = payload;
    },
    setContact(state, payload) {
      state.contact = payload;
    },
    setRating(state, payload) {
      state.rating = payload;
    },
    setName(state, payload) {
      state.name = payload;
    },
    setLevel(state,payload) {
      state.level = payload;
    }
  },
  actions: {
    getProfileData({ commit, getters, dispatch }) {
      commit("setLoading", true);
      commit("clearError");
      db.collection(getters.getClass+"level"+getters.getLevel)
        .doc(getters.getUserId)
        .onSnapshot(function(doc) {
          commit("setName", doc.data().name);
          commit("setEmail", doc.data().email);
          commit("setContact", doc.data().contact);
          commit("setRating", doc.data().rating);
          //if(doc.data().currentcases!==undefined && doc.data().currentcases!==null){
            commit("setCurrentCases", doc.data().currentcases);          
          // }
          // if(doc.data().approvedcases!==undefined && doc.data().approvedcases!==null){
            commit("setApprovedCases", doc.data().approvedcases);          
          // }
          // if(doc.data().transfercases!==undefined && doc.data().transfercases!==null){
            commit("setTransferedCases", doc.data().transfercases); 
          // }
          // if(doc.data().rejectedcases!==undefined && doc.data().rejectedcases!==null){
            commit("setRejectedCases", doc.data().rejectedcases);          
            // console.log(doc.data().rejectedcases)
          // }
          // if(doc.data().escalatedcases!==undefined && doc.data().escalatedcases!==null){
            commit("setEscalatedCases",doc.data().escalatedcases);          
          //}
          dispatch('fetchCaseDetails');
          commit("setLoading", false);
        })
    },
    updatename({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("dippusers")
        .doc(getters.getUserId)
        .set(
          {
            name: payload.name
          },
          { merge: true }
        )
        .then(function() {
          commit("setName", payload.name);
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Name updated successfully",
            status: true
          });
        })
        .catch(function(error) {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    updatecontact({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("dippusers")
        .doc(getters.getUserId)
        .set(
          {
            contact: payload.contact
          },
          { merge: true }
        )
        .then(function() {
          commit("setContact", payload.contact);
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Contact number updated successfully",
            status: true
          });
        })
        .catch(function(error) {
          commit("setLoading", false);
          commit("setError", error);
        });
    }
  }
};
