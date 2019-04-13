<template>
  <v-layout row>
    <v-flex xs12 sm12 md12>
      <h1 style="text-align:center;" class="font-weight-light">Case Id: {{ caseId }}</h1>
      <v-progress-linear
        v-if="loading"
        class="mt-0"
        height="3"
        color="accent"
        :indeterminate="loading"
      ></v-progress-linear>
      <!-- Transfer Dialogs -->
      <v-dialog v-model="tranfercasedialog" max-width="600px" persistent>
        <v-card>
          <v-form @submit.prevent="transfercase" ref="transferform" v-model="transfervalid">
            <v-card-title class="grey lighten-3">
              <h1 class="font-weight-light">Transfer Case</h1>
            </v-card-title>
            <v-progress-linear
              v-if="loading"
              class="mt-0"
              height="3"
              color="accent"
              :indeterminate="loading"
            ></v-progress-linear>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <!-- Ministry -->
                  <v-flex xs12>
                    <v-autocomplete
                      :rules="req"
                      :disabled="loading"
                      hint="Type Ministry / Department Name t which case is to transfered"
                      persistent-hint
                      :items="allministrylist"
                      v-model="ministry"
                      item-text="ministry"
                      item-value="ministry"
                      label="Select Ministry / Department"
                    >
                      <template slot="data.selected" slot-scope="data">{{data.item.ministry}}</template>
                      <template slot="item" slot-scope="data">
                        <template>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.ministry"></v-list-tile-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <!-- Reason -->
                  <v-text-field v-model="reason" :rules="req" label="State your reason"></v-text-field>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" flat @click.native="tranfercasedialog = false">Close</v-btn>
              <v-btn
                color="accent"
                flat
                type="submit"
                :disabled="!transfervalid || loading"
              >Transfer</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- image dialog -->
      <v-dialog v-model="installapp" max-width="800px">
        <!-- <v-card>  -->
        <!-- <v-card-title class="grey lighten-3">
                <h2><span class="font-weight-light ">Tutorial</span></h2>
        </v-card-title>-->
        <img :src="currcase.downloadlink" style="vertical-align:middle" width="auto" height="auto">
        <!-- </v-card> -->
      </v-dialog>
      <!-- Reject dialog -->
      <v-dialog v-model="rejectcasedialog" max-width="600px" persistent>
        <v-card>
          <v-form @submit.prevent="rejectcase" ref="rejectform" v-model="rejectvalid">
            <v-card-title class="grey lighten-3">
              <h1 class="font-weight-light">Reject Case</h1>
            </v-card-title>
            <v-progress-linear
              v-if="loading"
              class="mt-0"
              height="3"
              color="accent"
              :indeterminate="loading"
            ></v-progress-linear>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <!-- Reason -->
                  <v-text-field v-model="reason" :rules="req" label="State reason for rejection"></v-text-field>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" flat @click.native="rejectcasedialog = false">Close</v-btn>
              <v-btn color="accent" flat type="submit" :disabled="!rejectvalid || loading">Reject</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- Approve case dialog -->
      <v-dialog v-model="approvecasedialog" max-width="600px" persistent>
        <v-card>
          <v-form @submit.prevent="approvecase" ref="approveform" v-model="approvevalid">
            <v-card-title class="grey lighten-3">
              <h1 class="font-weight-light">Approve Case</h1>
            </v-card-title>
            <v-progress-linear
              v-if="loading"
              class="mt-0"
              height="3"
              color="accent"
              :indeterminate="loading"
            ></v-progress-linear>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <!-- Reason -->
                  <v-text-field v-model="reason" :rules="req" label="State reason for approval"></v-text-field>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" flat @click.native="approvecasedialog = false">Close</v-btn>
              <v-btn color="success" flat type="submit" :disabled="!approvevalid || loading">Approve</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-container>
              <!-- Basic Details -->
              <!-- Heading -->
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 class="font-weight-regular headline">
                    <v-icon class="accent--text mr-2">bubble_chart</v-icon>Basic Details
                  </h2>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
              </v-layout>

              <!-- Main -->
              <v-layout row wrap>
                <v-flex xs12 sm6 self-align-center>
                  <p>
                    <span class="font-weight-light title">Ministry Concerned: &nbsp;</span>
                    <span class="font-weight-light subheading info--text">{{currcase.ministry}}</span>
                  </p>
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.xsOnly" xs12>
                  <br>
                </v-flex>
                <v-flex xs12 sm6 self-align-center>
                  <p>
                    <span class="font-weight-light title">Date Of Application: &nbsp;</span>
                    <span
                      class="font-weight-light subheading info--text"
                    >{{convertTime(currcase.date)}}</span>
                  </p>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
                <v-flex xs12 sm6 self-align-center>
                  <p>
                    <span class="font-weight-light title">Complainant: &nbsp;</span>
                    <span class="font-weight-light subheading info--text">{{currcase.username}}</span>
                  </p>
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.xsOnly" xs12>
                  <br>
                </v-flex>
                <v-flex xs12 sm6 self-align-center>
                  <p>
                    <span class="font-weight-light title">Startup: &nbsp;</span>
                    <span class="font-weight-light subheading info--text">{{currcase.startupname}}</span>
                  </p>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
                <v-flex xs12 sm6 self-align-center>
                  <p>
                    <span class="font-weight-light title">Email: &nbsp;</span>
                    <span class="font-weight-light subheading info--text">{{currcase.email}}</span>
                  </p>
                </v-flex>
                <v-flex v-if="$vuetify.breakpoint.xsOnly" xs12>
                  <br>
                </v-flex>
                <v-flex xs12 sm6 self-align-center>
                  <p>
                    <span class="font-weight-light title">Contact: &nbsp;</span>
                    <span
                      class="font-weight-light subheading info--text"
                    >{{"+91 " + currcase.contact}}</span>
                  </p>
                </v-flex>
              </v-layout>

              <!-- Separation -->
              <v-layout row wrap>
                <br>
                <br>
              </v-layout>
              <v-layout row wrap>
                <v-divider></v-divider>
              </v-layout>
              <v-layout row wrap>
                <br>
                <br>
              </v-layout>

              <!-- Complaint Description -->
              <!-- Heading -->
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 class="font-weight-regular headline">
                    <v-icon class="mr-2 accent--text">speaker_notes</v-icon>Grievance Details
                  </h2>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
              </v-layout>

              <!-- Main -->
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="font-weight-light title">Problem Subject:</p>
                </v-flex>
                <v-flex xs12>
                  <p class="info--text">{{currcase.subject}}</p>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
                <v-flex xs12>
                  <p class="font-weight-light title">Problem Description:</p>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    rows="1"
                    id="as"
                    background-color="transparent"
                    readonly
                    auto-grow
                    full-width
                    :value="currcase.description"
                  ></v-textarea>
                </v-flex>
                <div v-if="currcase.downloadlink">
                  <v-flex xs12>
                    <br>
                  </v-flex>
                  <v-flex xs12>
                    <p class="font-weight-light title">Supporting Document:</p>
                  </v-flex>
                  <v-flex xs12>
                    <br>
                  </v-flex>
                  <v-flex xs6 align-self-center>
                    <v-btn flat color="accent" @click="installapp = true">
                      <v-icon left>visibility</v-icon>View
                    </v-btn>
                  </v-flex>
                </div>
              </v-layout>

              <!-- Actions -->
              <!-- Heading -->
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 class="font-weight-regular headline">
                    <v-icon class="fas fa-location-arrow accent--text mr-2"></v-icon>Reply
                  </h2>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
              </v-layout>
              <!-- Main Actions -->
              <v-layout row wrap>
                <v-flex xs12>
                  <v-textarea
                    name="input-7-1"
                    box
                    auto-grow
                    class="transparent"
                    v-model="minreply"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-btn color="accent" @click="replybyministry">Reply</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-continer>
      <chat ref="chatDiag" :caseId="caseId"></chat>
    </v-continer>
  </v-layout>
</template>

<script>
import db from "../../firebase/db";
export default {
  data() {
    return {
      // Basic Details
      tranfercasedialog: false,
      approvecasedialog: false,
      transfervalid: false,
      approvevalid: false,
      rejectcasedialog: false,
      rejectvalid: false,
      currcase: null,
      ministry: "",
      caseId: "",
      // Actions
      minreply:'',
      reason: "",
      installapp: false,
      req: [v => !!v || "The input is required"]
      // //Dialog
      // transferdialog: true,
      // rejectdialog:true
    };
  },
  methods: {
    replybyministry(){
      this.dispatch('reply',this.minreply);
    },
    convertTime(payload) {
      var t = new Date(1970, 0, 1);
      t.setSeconds(payload.seconds + 19800);
      var year = t.getFullYear();
      var month = t.getMonth();
      var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var date = t.getDate();
      var str = date + " " + monthNames[month] + " " + year;
      return str;
    },
    chatinitiate() {
      var self = this;
      db.collection("chats")
        .doc(self.caseId)
        .get()
        .then(doc => {
          if (doc.exists) {
            self.$refs.chatDiag.chatDialog = true;
          } else {
            db.collection("chats")
              .doc(self.caseId)
              .set({
                caseofficername: self.$store.getters.getName,
                //startupusername:asjkdjka
                chats: [
                  {
                    sender1: "admin",
                    text: "Initiate"
                  }
                ]
              })
              .then(doc => {
                self.$refs.chatDiag.chatDialog = true;
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    transfercase() {
      var posts = this.$store.getters.getCurrentCases;
      var toremove = posts.filter(posts => posts.caseid !== this.caseId);
      var tclass = "";
      this.allministrylist.forEach(element => {
        if (element.ministry == this.ministry) {
          tclass = element.class;
        }
      });
      var dleft = "";
      if (this.currcase.currentlevel == 1) dleft = 10;
      else if (this.currcase.currentlevel == 2) dleft = 5;
      else dleft = 2;

      var o1 = {
        caseofficerid: this.$store.getters.getUserId,
        caseofficername: this.$store.getters.getName,
        class: this.$store.getters.getClass,
        level: this.currcase.currentlevel,
        ministry: this.currcase.ministry,
        status: 5,
        comment: this.reason
      };
      var o2 = {
        transministry: this.ministry,
        transclass: tclass,
        transstatus: 0
      };
      var daysleftt = dleft;
      var transobj = {
        obj1: o1,
        obj2: o2,
        daysleft: daysleftt,
        caseid: this.caseId,
        orgdaysleft: this.currcase.daysleft,
        orgdate: this.currcase.date,
        currentcaselength: this.$store.getters.getCurrentCases.length,
        toremove: toremove,
        toremovelen: posts.length
      };
      this.$refs.transferform.reset();
      this.tranfercasedialog = false;
      this.$store.dispatch("transfercase", transobj);
    },
    rejectcase() {
      var posts = this.$store.getters.getCurrentCases;
      var toremove = posts.filter(posts => posts.caseid !== this.caseId);
      var c = this.$store.getters.getCaseDetails;
      var obj = {
        comment: this.reason,
        class: this.$store.getters.getClass,
        caseofficerid: this.$store.getters.getUserId,
        caseofficername: this.$store.getters.getName,
        level: this.currcase.currentlevel,
        ministry: this.currcase.ministry
      };
      var rejectobj = {
        caseid: this.caseId,
        obj1: obj,
        toremove: toremove,
        toremovelen: toremove.length,
        datefile: this.currcase.date,
        c: c[this.caseId]
      };
      // console.log(rejectobj);
      this.$refs.rejectform.reset();
      this.rejectcasedialog = false;
      this.$store.dispatch("rejectcase", rejectobj);
    },
    approvecase() {
      var posts = this.$store.getters.getCurrentCases;
      var toremove = posts.filter(posts => posts.caseid !== this.caseId);
      var c = this.$store.getters.getCaseDetails;
      var obj = {
        comment: this.reason,
        class: this.$store.getters.getClass,
        caseofficerid: this.$store.getters.getUserId,
        caseofficername: this.$store.getters.getName,
        level: this.currcase.currentlevel,
        ministry: this.currcase.ministry
      };
      var approveobj = {
        caseid: this.caseId,
        obj1: obj,
        toremove: toremove,
        toremovelen: toremove.length,
        datefile: this.currcase.date,
        c: c[this.caseId]
      };
      // console.log(approveobj);
      this.$refs.approveform.reset();
      this.approvecasedialog = false;
      this.$store.dispatch("approvecase", approveobj);
    },
    trans() {
      this.$refs.transferform.reset();
      this.tranfercasedialog = true;
    },
    rej() {
      this.$refs.rejectform.reset();
      this.rejectcasedialog = true;
    },
    app() {
      this.$refs.approveform.reset();
      this.approvecasedialog = true;
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    success() {
      return this.$store.getters.success;
    },
    error() {
      return this.$store.getters.error;
    },
    allministrylist() {
      return this.$store.getters.getAllMinistryList;
    }
  },

  created() {
    this.caseId = this.$route.params.caseid;
    var t = this.$store.getters.getCaseDetails;
    this.currcase = t[this.caseId];
    console.log(this.currcase);
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

<style>
#as {
  color: #2196f3;
}
</style>
