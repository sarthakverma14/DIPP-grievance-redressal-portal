<template>
<v-layout row>
    <!-- <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
        <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component> -->
    <v-flex xs12 sm12 md12>
        <h1 style="text-align:center;" class="font-weight-light">Past Grievances</h1>
        <v-progress-linear v-if="loading" class="mt-0" height="3" color="accent" :indeterminate="loading"></v-progress-linear>
        <v-container>
            <v-layout row wrap v-if="pastcases.length>0">
                <v-flex xs12>
                    <v-card class="elevation-1">
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                    </v-card>
                    <!-- Grievances table-->
                    <v-data-table :headers="headers" :items="pastcases" class="elevation-5" item-key="item">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ convertTime(props.item.obj.date) }}</td>
                            <td class="text-xs-center">{{ props.item.obj.caseid }}</td>
                            <td class="text-xs-center">{{ props.item.obj.ministry }}</td>
                            <!-- <td class="text-xs-center">{{ props.item.status }}</td> -->
                            <td class="justify-center layout px-0">
                                <router-link :to="'/pastcasefile/'+props.item.obj.caseid">
                                    <v-icon class=" fas fa-eye" color="accent"></v-icon>
                                </router-link>
                            </td>
                        </template>
                        <template slot="no-data">
                            <div class="text-xs-center">
                                No Past Case yet.
                            </div>
                        </template>

                    </v-data-table>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center column fill-height v-else>
                <br>
                <div class="text-xs-center">
                    <v-icon size="220">access_time</v-icon>
                </div>
                <br>
                <h2 style="text-align:center;" class="font-weight-light">No Past Grievances</h2>
                <br>
                <p style="text-align:center;" class="font-weight-light">To lodge your grievance, click on &nbsp<b>+</b>&nbsp button down below</p>

            </v-layout>
        </v-container>
    </v-flex>
    <!-- <file-grievance></file-grievance> -->
</v-layout>
</template>

<script>
// import FileGrievance from "../Dashboard/filegrievance";
export default {
    // components: {
    //     "file-grievance": FileGrievance
    // },
    data() {
        return {
            //table data
            search: "",
            headers: [{
                    text: "Date",
                    value: "date",
                    align: "center",
                    sortable: true
                },
                {
                    text: "ID",
                    value: "id",
                    align: "center",
                    sortable: true
                },
                {
                    text: "Ministry",
                    value: "ministry",
                    align: "center",
                    sortable: true
                },
                // {
                //     text: "Status",
                //     value: "status",
                //     align: "center",
                //     sortable: true
                // },
                {
                    text: "Actions",
                    value: "question",
                    align: "center",
                    sortable: false
                }
            ],
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
        pastcases() {
            var item = []
            var arr1 = this.$store.getters.getApprovedcases
            var arr2 = this.$store.getters.getRejectedCases
            var arr3 = this.$store.getters.getTransferedCases
            var arr4 = this.$store.getters.getEscalatedCases
            if (arr1 !== undefined && arr1 !== null) {
                arr1.forEach(element => {
                    item.push({
                        obj: element,
                        status: 1
                    })
                });
            }
            if (arr2 !== undefined && arr2 !== null) {
                arr2.forEach(element => {
                    item.push({
                        obj: element,
                        status: 2
                    })
                });
            }
            if (arr3 !== undefined && arr3 !== null) {
                arr3.forEach(element => {
                    item.push({
                        obj: element,
                        status: 5
                    })
                });
            }
            if (arr4 !== undefined && arr4 !== null) {
                arr4.forEach(element => {
                    item.push({
                        obj: element,
                        status: 6
                    })
                });
            }
            return item
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
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
}
</style>

