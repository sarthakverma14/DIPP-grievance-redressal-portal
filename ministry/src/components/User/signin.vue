<template>
  <v-container>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 class>
        <v-card hover raised>
          <v-card-title class="grey lighten-3">
            <v-icon class="ml-2 mr-3">person</v-icon>
            <h1 class="font-weight-light">User Login</h1>
          </v-card-title>
          <v-progress-linear
            v-if="loading"
            class="mt-0"
            height="3"
            color="accent"
            :indeterminate="loading"
          ></v-progress-linear>
          <v-card-text>
            <v-form @submit.prevent="onSignin" ref="form" v-model="valid">
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      :disabled="loading"
                      name="email"
                      prepend-icon="email"
                      label="Enter your Email"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="emailrules"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      :disabled="loading"
                      prepend-icon="lock"
                      name="password"
                      label="Enter your Password"
                      id="password"
                      v-model="password"
                      :append-icon="show ? 'visibility_off' : 'visibility'"
                      :type="show ? 'text' : 'password'"
                      :rules="passwordrules"
                      counter
                      @click:append="show = !show"
                      required
                    ></v-text-field>
                    <p
                      class="body-2 blue--text text--darken-2 font-weight-regular hover-underline"
                      @click="passwordReset = true"
                    >Forgot Password?</p>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-layout>
                <v-spacer></v-spacer>
                <v-btn @click="clear()" flat large :disabled="loading" color="error" raised ripple>
                  <v-icon>clear</v-icon>Clear
                </v-btn>
                <v-btn
                  :disabled="!valid || loading"
                  flat
                  large
                  color="success"
                  :loading="loading"
                  type="submit"
                  raised
                  ripple
                >
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                  <v-icon>near_me</v-icon>Login
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      respassvalid: false,
      passwordReset: false,
      email: "",
      password: "",
      valid: false,
      show: false,
      emailrules: [],
      passwordrules: []
    };
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    clear() {
      this.$refs.form.reset();
    },
    resetPassword() {
      var payload = {
        email: this.email
      };
      this.$store.dispatch("resetPassword", payload);
      this.passwordReset = false;
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUserId;
    },
    loading() {
      return this.$store.getters.loading;
    },
    success() {
      return this.$store.getters.success;
    },
    error() {
      return this.$store.getters.error;
    },
    ...mapGetters(["getUserId"]),
    nextRoute() {
      return this.$route.query.redirect || "/";
    }
  },
  watch: {
    email() {
      if (this.email.trim().length > 0) {
        this.emailrules = [() => !!this.email || "Required"];
      } else {
        this.emailrules = [];
      }
    },
    password() {
      if (this.password.trim().length > 0) {
        this.passwordrules = [
          () => !!this.password || "Required"
        ];
      } else {
        this.passwordrules = [];
      }
    },
    user(auth) {
      if (!!auth) {
        this.dialog = true;
        setTimeout(() => this.$router.replace(this.nextRoute), 1200);
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

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
