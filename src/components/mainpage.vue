<template>
<v-app>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-toolbar class="primary">
        <span class="white-text">DIPP</span>
        <v-spacer></v-spacer>
        <router-link :to="userstatus">
            <v-btn class="primary mt-2" large>
                Get Started
            </v-btn>
        </router-link>
    </v-toolbar>
</v-app>
</template>

<script>
export default {
    data: function () {
        return {
            
        }
    },
    computed: {
        userstatus() {
            if (
                this.$store.getters.getUserId !== null &&
                this.$store.getters.getUserId !== undefined
            ) {
                return "/dashboard";
            } else {
                return "/signin";
            }
        },
         error() {
            return this.$store.getters.error;
        },
        success() {
            return this.$store.getters.success;
        },        
        loading() {
            return this.$store.getters.loading;
        },
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
    },

};
</script>
