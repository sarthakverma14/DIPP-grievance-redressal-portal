import router from "../../router/index";
import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
import { isEmpty } from "@firebase/util";
import axios from 'axios'
export default {
  state: {
    currentcases: [],
    casedetails: "",
    approvedcases: [],
    rejectedcases: [],
    transferedcases: [],
    escalatedcases: []
  },
  getters: {
    getCurrentCases(state) {
      return state.currentcases;
    },
    getCaseDetails(state) {
      return state.casedetails;
    },
    getApprovedcases(state) {
      return state.approvedcases;
    },
    getRejectedCases(state) {
      return state.rejectedcases;
    },
    getTransferedCases(state) {
      return state.transferedcases;
    },
    getEscalatedCases(state) {
      return state.escalatedcases;
    }
    // getCurrentCases(state) {
    //   return state.currentcases;
    // },
  },
  mutations: {
    setCurrentCases(state, payload) {
      state.currentcases = payload;
    },
    setCaseDetails(state, payload) {
      state.casedetails = payload;
    },
    setApprovedCases(state, payload) {
      state.approvedcases = payload;
    },
    setRejectedCases(state, payload) {
      state.rejectedcases = payload;
    },
    setTransferedCases(state, payload) {
      state.transferedcases = payload;
    },
    setEscalatedCases(state, payload) {
      state.escalatedcases = payload;
    }
  },
  actions: {
    fetchCaseDetails({ commit, getters }) {
      var id = getters.getUserId;
      db.collection("cases")
        .where("currentcaseofficerid", "==", id)
        .onSnapshot(querydocs => {
          var arr = {};
          querydocs.forEach(doc => {
            arr[doc.id] = doc.data();
          });
          if (!isEmpty(arr)) {
            commit("setCaseDetails", arr);
          } else {
            commit("setCaseDetails", "");
          }
        });
    },
    transfercase({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      // Cloud Functions to transfer
      fetch("https://us-central1-dipp-4cd9b.cloudfunctions.net/transferCase", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.status == 1) {
            console.log(data);
            commit("setSuccess", {
              message: "Case Transfered successfully",
              status: true
            });
            router.replace("/dashboard");
          } else {
            console.log(data);
            commit("setLoading", false);
            commit("clearError");
          }
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    rejectcase({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      // Cloud Functions to transfer
      fetch("https://us-central1-dipp-4cd9b.cloudfunctions.net/rejectCase", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.status == 1) {
            console.log(data);
            commit("setSuccess", {
              message: "Case rejected successfully",
              status: true
            });
            router.replace("/dashboard");
            dispatch("sendrejectmsg", payload);
          } else {
            console.log(data);
            commit("setLoading", false);
            commit("clearError");
          }
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    approvecase({ commit ,dispatch}, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      // Cloud Functions to transfer
      fetch("https://us-central1-dipp-4cd9b.cloudfunctions.net/approveCase", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.status == 1) {
            console.log(data);
            commit("setSuccess", {
              message: "Case approved successfully",
              status: true
            });
            router.replace("/dashboard");
            dispatch('sendapprovemsg',payload)
          } else {
            console.log(data);
            commit("setLoading", false);
            commit("clearError");
          }
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    sendrejectmsg({ commit }, payload) {
      var formData = new FormData();
      var contact = payload.c.contact;
      var name = payload.c.username;
      var gnr = payload.caseid;
      formData.append("contact", contact);
      formData.append("name", name);
      formData.append("gnr", gnr);
      self = this;
      axios
        .post("http://staff.rajulsaxena.com/rejectmsg.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(function(response) {
          if (response.data.status == true) {
            console.log(response.data);
            console.log("msg sent");
          }
        })
        .catch(error => {
          console.log(error);
          commit("setError", {
            message: "Server Not Responding. Try Again Later",
            status: true
          });
        });
    },
    sendapprovemsg({ commit }, payload) {
      var formData = new FormData();
      var contact = payload.c.contact;
      var name = payload.c.username;
      var gnr = payload.caseid;
      formData.append("contact", contact);
      formData.append("name", name);
      formData.append("gnr", gnr);
      self = this;
      axios
        .post("http://staff.rajulsaxena.com/approvedmsg.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(function(response) {
          if (response.data.status == true) {
            console.log(response.data);
            console.log("msg sent");
          }
        })
        .catch(error => {
          console.log(error);
          commit("setError", {
            message: "Server Not Responding. Try Again Later",
            status: true
          });
        });
    }
  }
};
