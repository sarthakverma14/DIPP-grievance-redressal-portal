<template>
<v-snackbar v-model="snackbar"  :multi-line="mode === 'multi-line'" :timeout="timeout" >
    {{ text }}
    <v-btn :color="color" flat @click="snackbar = false">
        Close
    </v-btn>
</v-snackbar>
</template>

<script>
export default {
    props: [
        'text',
        'color'
    ],
    data() {
        return {
            snackbar: true,
            y: '',
            mode: '',
            timeout: 6000
        }
    }

}
</script>
