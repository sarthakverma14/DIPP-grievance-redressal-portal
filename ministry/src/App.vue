<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import drawerimg from "@/assets/profile_background.jpg";
export default {
  data: () => ({
    drawer: null,
    drawerimg: drawerimg
  }),
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
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
    userIsAuthenticated() {
      return (
        this.$store.getters.getUserId !== null &&
        this.$store.getters.getUserId !== undefined
      );
    },
    watch: {
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
  }
};
</script>
