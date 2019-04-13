<template>
<v-layout row>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">Current Grievances</h1>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
        <v-container>
            <v-layout row wrap v-if=" getCurrCases!==undefined && getCurrCases.length>0 ">
                <v-flex xs12>
                    <v-data-table :headers="headers" hide-actions :pagination.sync="pagination" rows-per-page-items="5" :items="getCurrCases" class="elevation-5" item-key="caseid">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.caseid }}</td>
                            <td class="text-xs-center">{{ convertTime(props.item.date) }}</td>
                            <td class="text-xs-center">{{ props.item.daysleft }}</td>
                            <td class="text-xs-center">{{ props.item.ministry }}</td>
                            <td class="justify-center layout px-0">
                                <router-link :to="'/casefile/'+props.item.caseid">
                                    <v-icon class=" fas fa-eye" color="info" large></v-icon>
                                </router-link>
                            </td>
                        </template>
                        <template slot="footer">
                            <td :colspan="headers.length" class="text-xs-center">
                                <strong>{{getCurrCases.length}} Pending Applications Queued</strong>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center column fill-height v-else>
                <div class="text-xs-center">
                    <v-icon size="250" color="grey">vertical_split</v-icon>
                </div>
                <br>
                <h1 style="text-align:center;" class="font-weight-light">No Grievances Yet</h1>
                <br>
                <p style="text-align:center;" class="font-weight-light">There is no grievance filled yet. Please wait for grievance to be filled.</p>
            </v-layout>
        </v-container>
    </v-flex>
</v-layout>
</template>

<script>
export default {
    data() {
        return {
            pagination: {
                rowsPerPage: 5,
                totalItems: 5
            },

            headers: [{
                    text: "Case ID",
                    value: "id",
                    align: "center",
                    sortable: false
                },
                {
                    text: "Date of filling",
                    value: "date",
                    align: "center",
                    sortable: false
                },
                {
                    text: "Days left",
                    value: "Days left",
                    align: "center",
                    sortable: false
                },
                {
                    text: "Ministry concerned",
                    value: "ministry concerned",
                    align: "center",
                    sortable: false
                },
                {
                    text: "Actions",
                    value: "action",
                    align: "center",
                    sortable: false
                }
            ]
        };
    },
    methods: {
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
        getCurrCases() {
            return this.$store.getters.getCurrentCases;
        },
        error() {
            return this.$store.getters.error;
        },
        success() {
            return this.$store.getters.success;
        },
        loading() {
            return this.$store.getters.loading;
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

<style scoped>
a {
    text-decoration: none;
}
</style>
