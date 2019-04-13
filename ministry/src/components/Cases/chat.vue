<template>
  <v-layout row wrap>
    <v-dialog v-model="chatDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="chatDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Case officer</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <div class="chat-window">
              <div class="chat-window-body font-weight-regular">
                <div
                  v-for="(chat, index) in chats"
                  :key="index"
                  :class="chat.sender == 'helpline' ? 'chat mright': 'chat mleft'"
                >
                  <span
                    :class="chat.sender == 'helpline' ? 'lime lighten-4':'orange lighten-4'"
                    style="border:1px solid black;padding:1rem;"
                  >{{chat.text}}</span>
                  <div
                    class="sub-text pt-3 grey--text font-weight-light text--darken-2"
                  >{{ chat.sender == 'helpline' ? 'You' : 'User' }}</div>
                </div>
              </div>
            </div>
            <!-- <div class="chat-window-input">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field label="Enter Message Here" :disabled="loading" v-model="msg" outline @keyup.enter="sendMsg" @keyup.esc="msg = ''"></v-text-field>
                        </v-flex>
                    </v-layout>
            </div>-->
            <v-footer fixed height="65" class>
              <v-layout row wrap class="mt-4" bottom fixed>
                <v-flex xs12 sm10 offset-sm1>
                  <!-- <div class="new-messages font-weight-light subheading green accent-4 white--text text-xs-center" @click="scrollBottom" v-if="newMessages">New message</div> -->
                </v-flex>
                <v-flex xs12 sm10 offset-sm1>
                  <v-text-field
                    label="Enter Message Here"
                    :disabled="loading"
                    v-model="msg"
                    outline
                    @keyup.enter="sendMsg"
                    @keyup.esc="msg = ''"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-footer>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "../../firebase/db";
// import firebase from "firebase/app";
// import "firebase/firestore";
export default {
  data() {
    return {
      chatDialog: false,

      msg: "",
      loading: false,
      newMessages: false
    };
  },
  created() {
    var self = this;
    db.collection("chats")
      .doc(self.caseId)
      .onSnapshot(doc => {
        
          self.$store.commit('setSuccess',{message:'New message',status:true})
        
        self.$store.commit("setChats", doc.data().chats);
        setTimeout(() => self.scrollBottom(), 100);
      });
    // var that = this;
    // var i = 0;
    // db.collection("chats")
    //     .doc(that.$route.params.caseId)
    //     .onSnapshot(snapshot => {
    //         that.chats = snapshot.data();
    //         that.scrollBottom();
    //         i++;
    //         if (i == 2) {
    //             that.newMessages = true;
    //             i--;
    //         }
    //     });
  },
  props: ["caseId"],
  // firestore() {
  //     return {
  //         chats: db.collection("chats").doc(this.$routes.params.caseId)
  //     };
  // },
  methods: {
    async sendMsg() {
      var self = this;
      self.loading = true;
      if (self.msg.trim() == "") {
        self.loading = false;
        return;
      }
      var obj = {
        caseid: self.caseId,
        chat: {
          text: self.msg,
          sender: "helpline",
          num: self.chats.length
        }
      };
      // console.log(obj);
      await self.$store.dispatch("pushMessage", obj).then(() => {
        setTimeout(() => self.scrollBottom(), 100);
      });
      // await self.$firestore.chats.update({
      //     chats: self.chats.chats
      //     // timestamp: firebase.firestore.ServerValue.TIMESTAMP
      // });
      self.msg = "";
      //self.scrollBottom();
      self.loading = false;
    },
    scrollBottom() {
      var objDiv = document.querySelector(".chat-window");
      objDiv.scrollTop = objDiv.scrollHeight;
      this.newMessages = false;
    }
  },
  computed: {
    chats() {
      return this.$store.getters.getChats;
    },   
    success() {
      return this.$store.getters.success;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(err) {
      if (!!err) {
        setTimeout(() => this.$store.dispatch("clearError"), 3000);
      }
    },
    success(con) {
      if (!!con) {
        setTimeout(() => this.$store.dispatch("clearSuccess"), 2000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: calc(60vw + 10px);
  display: block;
  height: 67vh;
  position: relative;
  margin: 0 auto;
  // border: 1px grey solid;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    width: calc(90vw + 10px);
  }

  &::-webkit-scrollbar {
    // width: 8px;
    // z-index: 1001;
    display: none;
  }

  // &-header {
  //     border-bottom: 1px grey solid;
  //     position: fixed;
  //     width: 60vw;
  //     background-color: white;
  //     padding-right: 1rem;

  //     @media screen and (max-width: 768px) {
  //         width: 90vw;
  //     }
  // }

  &-body {
    margin-top: 10rem;
    width: 100%;

    .chat {
      padding: 2rem;
      margin: 0.5rem 0;

      &-text {
        border: 1px solid black;
        padding: 1rem;
      }

      .sub-text {
        font-style: italic;
        padding-right: 0.3rem;
      }
    }

    .mleft {
      margin-left: 20px;
      text-align: left;
    }

    .mright {
      text-align: right;
      margin-right: 20px;
    }
  }

  &-input {
    display: block;
    padding-top: 1rem;
    width: calc(60vw + 10px);

    @media screen and (max-width: 768px) {
      width: calc(90vw + 10px);
    }

    margin: 0 auto;
  }
}
</style>
