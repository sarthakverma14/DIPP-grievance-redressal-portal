<template>
  <v-container>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <!-- Change Name Dialog -->
    <v-dialog persistent v-model="changename" width="500">
      <v-card>
        <v-card-title class="grey lighten-3">
          <h1 class="font-weight-light">Update Name</h1>
        </v-card-title>
        <v-container>
          <v-form ref="nameform" @submit.prevent="updateusername" v-model="namevalid">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  name="name"
                  label="Name"
                  id="name"
                  v-model="newname"
                  type="text"
                  :rules="namerules"
                  :disabled="loading"
                  required
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12>
                            <v-text-field name="contact" label="Contact Number" id="contact" v-model="newcontact" type="number" :disabled="loading" :counter="10" :rules="contactrules" required></v-text-field>
              </v-flex>-->
            </v-layout>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat class="error--text" @click="changename=!changename">Cancel</v-btn>
          <v-btn flat class="success--text" type="submit" @click="updateusername">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Change Contact -->
    <v-dialog persistent v-model="changecontact" width="500">
      <v-card>
        <v-card-title class="grey lighten-3">
          <h1 class="font-weight-light">Update Contact</h1>
        </v-card-title>
        <v-container>
          <v-form ref="contactform" @submit.prevent="updateusercontact" v-model="namevalid">
            <v-layout wrap>
              <!-- <v-flex xs12>
                            <v-text-field name="name" label="Name" id="name" v-model="newname" type="text" :rules="namerules" :disabled="loading" required></v-text-field>
              </v-flex>-->
              <v-flex xs12>
                <v-text-field
                  name="contact"
                  label="Contact Number"
                  id="contact"
                  v-model="newcontact"
                  type="number"
                  :disabled="loading"
                  counter="10"
                  :rules="contactrules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat class="error--text" @click="changecontact=!changecontact">Cancel</v-btn>
          <v-btn flat class="success--text" type="submit" @click="updateusercontact">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout class="mt-0" row wrap>
      <!-- Name and email flex -->
      <v-flex xs12 sm6 class="text-xs-center" align-self-center>
        <v-card class="elevation-0 transparent" flat>
          <v-layout column fill-height justify-space-around align-center>
            <v-avatar size="200" tile>
              <img :src="avatar">
            </v-avatar>
            <v-card-title class>
              <span class>{{email}}</span>
            </v-card-title>
          </v-layout>
          <v-card-actions class>
            <v-layout align-center justify-center row wrap>
              <v-flex xs12>
                <v-badge>
                  <h1 class="text-xs-center font-weight-thin display-1">{{name}}</h1>
                  <v-icon @click="editdname" slot="badge" dark>edit</v-icon>
                </v-badge>
              </v-flex>
              <v-flex xs12>
                <br>
                <v-badge>
                  <h3 class="font-weight-light">{{contact}}</h3>
                  <v-icon @click="editcontact" slot="badge" dark>edit</v-icon>
                </v-badge>
                <h3>Class A Ministry</h3>
              </v-flex>
              <v-divider></v-divider>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
      <!-- Rating flex -->
      <v-flex xs12 sm6 class="text-xs-center" align-self-center>
        <v-card class="elevation-0 transparent" flat>
          <v-layout column fill-height justify-space-around align-center></v-layout>
          <v-card-actions class>
            <v-layout align-center justify-center row wrap>
              <v-divider></v-divider>
              <v-flex xs12 class="mt-3">
                <v-layout row wrap>
                  <v-flex xs12>
                    <h2 class="font-weight-light text-xs-center display-2">{{rating}}</h2>
                    <h3>(DIPP Rating)</h3>
                  </v-flex>
                  <v-flex xs12>
                    <br>
                    <v-rating
                      v-model="stars"
                      background-color="amber lighten-3"
                      color="amber darken-3"
                      size="40"
                      readonly
                    ></v-rating>
                    <!-- <div class="text-xs-center">
                                        <v-icon size="50" color="amber accent-4">star</v-icon>
                                        <v-icon size="50" color="amber accent-4">star</v-icon>
                                        <v-icon size="50" color="amber accent-4">star</v-icon>
                                        <v-icon size="50">star</v-icon>
                                        <v-icon size="50">star</v-icon>
                    </div>-->
                    <br>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 class="text-xs-center">
                <h2 class="text-xs-center font-weight-light">Approved - 90</h2>
                <h2 class="text-xs-center font-weight-light">Rejected - 30</h2>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center" align-self-center>
        <br>
        <br>
        <canvas ref="mypiechart" id="mypiechart"></canvas>
      </v-flex>
      <v-flex xs12 sm6 class="mt-1 text-xs-center" align-self-center>
        <br>
        <br>
        <canvas ref="linechart" id="linechart"></canvas>
      </v-flex>
      <v-flex xs12 class="mt-1 text-xs-center" align-self-center>
        <br>
        <canvas ref="mychart" id="myChart"></canvas>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import avatar from "@/assets/avatar.png";
import drawer from "@/assets/profile_background.jpg";
export default {
  data() {
    return {
      namevalid:false,
      stars: 1,
      newname: "",
      newcontact: "",
      avatar: avatar,
      drawer: drawer,
      namerules: [],
      contactrules: [],
      changename: false,
      changecontact: false
    };
  },
  mounted() {
    this.graphinit();
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    },
    email() {
      return this.$store.getters.getEmail;
    },
    loading() {
      return this.$store.getters.loading;
    },
    name() {
      return this.$store.getters.getName;
    },
    rating() {
      return this.$store.getters.getRating;
    },
    contact() {
      return this.$store.getters.getContact;
    }
  },
  methods: {
    editdname() {
      this.newname = "";
      this.$refs.nameform.reset();
      this.$refs.nameform.resetValidation();
      this.changename = true;
    },
    editcontact() {
      this.newcontact = "";
      this.$refs.contactform.reset();
      this.$refs.contactform.resetValidation();
      this.changecontact = true;
    },
    graphinit() {
      var ctx = this.$refs.mychart;
      var linechart = new Chart(ctx, {
        type: "bar",

        data: {
          datasets: [
            {
              label: "Approved",
              data: [99, 20, 30, 40, 50, 60, 45, 34, 77, 32, 12, 89],
              pointBackgroundColor: "#F4445",
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76,175,80,0.5)",
              fill: true
            },
            {
              label: "Rejected",
              data: [6, 53, 25, 23, 26, 56, 41, 31, 4, 54, 6, 30],
              pointBackgroundColor: "#F4445",
              borderColor: "#F44336",
              backgroundColor: "rgba(128,67,54,0.5)",
              fill: true
            },
            {
              label: "Escalted",
              data: [67, 23, 45, 3, 23, 56, 4, 3, 34, 34, 76, 0],
              pointBackgroundColor: "#F4445",
              borderColor: "#F44336",
              backgroundColor: "rgba(244,67,54,0.5)",
              fill: true
            }
          ],
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        options: {
          animation: {
            duration: 5000 // general animation time
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Work Done in terms of approval and rejection"
                }
              }
            ],
            xAxes: [
              {
                // type: "linear",
                position: "bottom",
                scaleLabel: {
                  display: true,
                  labelString: "Month"
                }
              }
            ]
          }
        }
      });
      var cttx = this.$refs.mypiechart;
      var piechart = new Chart(cttx, {
        type: "doughnut",
        data: {
          labels: ["Approve", "Rejected", "Escalated"],
          datasets: [
            {
              label: "My Stats",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: [70, 19, 11]
            }
          ]
        },
        options: {
          animation: {
            duration: 5000 // general animation time
          },
          title: {
            display: true,
            text: "Analysis"
          }
        }
      });
      var ctttx = this.$refs.linechart;
      var linechart1 = new Chart(ctttx, {
        type: "line",

        data: {
          datasets: [
            {
              label: "My Rating",
              data: [99, 20, 30, 40, 50, 60, 45, 34, 77, 32, 12, 89],
              pointBackgroundColor: "#F4445",
              borderColor: "rgba(100,15,80,0.5)",
              backgroundColor: "rgba(100,15,80,0.5)",
              fill: true,
              lineTension: 0
            }
          ],
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        options: {
          animation: {
            duration: 5000 // general animation time
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Rating"
                }
              }
            ],
            xAxes: [
              {
                // type: "linear",
                position: "bottom",
                scaleLabel: {
                  display: true,
                  labelString: "Month"
                }
              }
            ]
          }
        }
      });
    },
    updateusername() {
      var obj = {
        name: this.newname
      };
      this.$store.dispatch("updatename", obj);
      this.changename = false;
    },
    updateusercontact() {
      var obj = {
        name: parseInt(this.newcontact)
      };
      this.$store.dispatch("updatecontact", obj);
      this.changecontact = false;
    }
  },
  watch: {
    newname() {
      if (this.newname.trim().length > 0) {
        this.namerules = [() => !!this.newname || "Required"];
      } else {
        this.namerules = [];
      }
    },
    newcontact() {
      if (this.newcontact.trim().length > 0) {
        this.contactrules = [
          () => !!this.newcontact || "Required",
          () => !!this.newcontact.trim().length==10 || "Must be of 10 digits"
        ];
      } else {
        this.contactrules = [];
      }
    },
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
