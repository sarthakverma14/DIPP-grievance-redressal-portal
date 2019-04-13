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
                  <span class="font-weight-light subheading info--text">{{convertTime(this.currcase.date)}}</span>
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

              <!-- Actions -->
              <!-- Heading -->
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 class="font-weight-regular headline">
                    <v-icon class="fas fa-location-arrow accent--text mr-2"></v-icon>Action taken
                  </h2>
                </v-flex>
                <v-flex xs12>
                  <br>
                </v-flex>
              </v-layout>

              <!-- Main Actions -->
              <v-layout row wrap>
                <v-flex xs12 sm4 class="text-xs-center" v-if="currcase.status==5">
                  <v-btn flat color="info">
                    <v-icon class="fas fa-exchange-alt" left></v-icon>You transferes this case.
                  </v-btn>
                </v-flex>
                <v-flex xs12 sm4 class="text-xs-center" v-if="currcase.status==2">
                  <v-btn flat color="error">
                    <v-icon class="fas fa-ban" left></v-icon>You rejected this case
                  </v-btn>
                </v-flex>
                <v-flex xs12 sm4 class="text-xs-center" v-if="currcase.status==1">
                  <v-btn flat color="success">
                    <v-icon class="fas fa-thumbs-up" left></v-icon>You transfered this case.
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-continer></v-continer>
  </v-layout>
</template>

<script>
import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
export default {
  data() {
    return {
      currcase: null,
      caseId: "",
      installapp: false
    };
  },
  methods: {
    initialise(payload) {
      console.log("world");
      this.$store.commit("setLoading", true);
      db.collection("cases")
        .doc(payload)
        .get()
        .then(doc => {
          var t = doc.data();
          var obj = {
            ministry: t.ministry,
            date: t.date,
            username: t.username,
            startupname: t.startupname,
            email: t.email,
            contact: t.contact,
            subject: t.subject,
            description: t.description,
            downloadlink: t.downloadlink
          };
          this.currcase = obj;
        })
        .catch(() => {
          this.$store.commit("setError", {
            message: "Something went wrong.Please try again",
            status: true
          });
        });
      this.$store.commit("setLoading", false);
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
    }
  },

  created() {
    this.caseId = this.$route.params.caseid;
    var t = this.$store.getters.getCaseDetails;
    this.currcase = t[this.caseId];
    if (this.currcase === undefined) console.log("hello");
    this.initialise(this.caseId);
    // console.log(this.caseId);
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
