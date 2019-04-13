<template>
  <v-app>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <!-- Change Password  -->
    <v-dialog v-model="changepassworddialog" persistent max-width="500px">
      <v-card>
        <v-form @submit.prevent="updatepassword" ref="form" v-model="passwordvalid">
          <v-card-title class="grey lighten-3">
            <h1 class="font-weight-light">Change Your Password</h1>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Current Password"
                    type="password"
                    v-model="currentpassword"
                    :rules="currentpasswordrules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="New Password"
                    type="password"
                    v-model="newpassword"
                    :rules="newpasswordrules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Confirm New Password"
                    type="password"
                    v-model="confirmnewpassword"
                    :rules="comparePasswords"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click.native="closepassdialog">Close</v-btn>
            <v-btn color="success" flat type="submit" :disabled="!passwordvalid || loading">Update</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      v-if="userIsAuthenticated"
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      clipped
      app
      width="240"
    >
      <v-img :aspect-ratio="16/9" :src="drawerimg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink v-if="!mini">
            <div class="subheading">{{name}}</div>
            <div class="body-1">{{email}}</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-progress-linear
        v-if="loading"
        class="mt-0"
        height="2"
        color="accent"
        :indeterminate="loading"
      ></v-progress-linear>
      <div></div>

      <v-list>
        <template>
          <v-list-tile v-if="userIsAuthenticated" to="/dashboard">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-title color="primary">Dashboard</v-list-tile-title>
          </v-list-tile>
        </template>
        <template>
          <v-list-tile v-if="userIsAuthenticated" to="/pastcases">
            <v-list-tile-action>
              <v-icon class="fas fa-clipboard-list"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title color="primary">Past Cases</v-list-tile-title>
          </v-list-tile>
        </template>
        <template>
          <v-list-tile v-if="userIsAuthenticated" to="/statistics">
            <v-list-tile-action>
              <v-icon class="fas fa-chart-line"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title color="primary">Profile</v-list-tile-title>
          </v-list-tile>
        </template>
        <template>
          <v-list-tile v-if="userIsAuthenticated" @click="changepassworddialog=true">
            <v-list-tile-action>
              <v-icon class="fas fa-key"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title color="primary">Change Password</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-divider v-if="userIsAuthenticated"></v-divider>
        <template>
          <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
            <v-list-tile-action>
              <v-icon color="error">power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-title color="primary">Logout</v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat class="primary" app clipped-left fixed dark>
      <v-toolbar-side-icon
        v-if="userIsAuthenticated"
        @click.native="drawer = !drawer"
        class="white--text"
      ></v-toolbar-side-icon>
      <router-link to="/">
        <span class="title ml-3 mr-5 white--text">DIPP</span>
      </router-link>
      <v-spacer></v-spacer>
      <div v-if="userIsAuthenticated">
        <v-tooltip bottom>
          <template #activator="data">
            <v-badge color="error" right overlap>
              <span slot="badge">{{getCurrCases}}</span>
              <router-link to="/dashboard">
                <v-icon class="white--text mr-2" medium v-on="data.on">notifications</v-icon>
              </router-link>
            </v-badge>
          </template>
          <span>68 Pending Grievances</span>
        </v-tooltip>
      </div>
      <v-btn flat color="primary" v-if="userIsAuthenticated" @click="onLogout">
        <v-icon class="fas fa-sign-out-alt white--text mr-2"></v-icon>
        <span class="white--text mr-1">Logout</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import drawerimg from "@/assets/profile_background.jpg";
export default {
  data: () => ({
    mini: false,
    drawer: null,
    drawerimg: drawerimg,
    currentpassword: "",
    newpassword: "",
    confirmnewpassword: "",
    changepassworddialog: false,
    passwordvalid: false,
    currentpasswordrules: [],
    newpasswordrules: []
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.getUserId !== null &&
        this.$store.getters.getUserId !== undefined
      );
    },
    email() {
      return this.$store.getters.getEmail;
    },
    name() {
      return this.$store.getters.getName;
    },
    loading() {
      return this.$store.getters.loading;
    },
    comparePasswords() {
      if (this.newpassword !== this.confirmnewpassword)
        return ["Passwords do not match"];
      else return "";
    },
    getCurrCases() {
      if (
        this.$store.getters.getCurrentCases == undefined ||
        this.$store.getters.getCurrentCases == null
      ) {
        return 0;
      } else {
        return this.$store.getters.getCurrentCases.length;
      }
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    updatepassword() {
      this.changepassworddialog = false;
      this.$store.dispatch("updatepassword", {
        oldpassword: this.currentpassword,
        newpassword: this.newpassword
      });
      (this.currentpassword = ""),
        (this.newpassword = ""),
        (this.confirmnewpassword = ""),
        this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    closepassdialog() {
      this.changepassworddialog = false;
      (this.currentpassword = ""),
        (this.newpassword = ""),
        (this.confirmnewpassword = ""),
        this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    loading() {
      return this.$store.getters.loading;
    },
    currentpasswordrules() {
      if (this.currentpassword.length > 0) {
        this.currentpasswordrules = [
          () => !!this.currentpassword || "Required"
        ];
      } else {
        this.currentpasswordrules = [];
      }
    },
    newpasswordrules() {
      if (this.newpassword.trim().length > 0) {
        this.newpasswordrules = [
          () => !!this.newpassword || "Required",
          () => !!this.newpassword.length > 6 || "Must be of characters atleast"
        ];
      } else {
        this.newpasswordrules = [];
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
