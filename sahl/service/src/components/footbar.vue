<template>
    <div>
        <v-row>
            <v-col>
                <v-icon>mdi-magnify</v-icon>
                zoom :  {{zoomvalue.toFixed(2)}}
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    computed: { 
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        setting(value) {
            //console.log(value)
            this.zoomvalue = value.zoomMain
        },

    },
    data() {
        return {
            zoomvalue: this.$store.state.setting.zoomMain,
        }
    },
    methods: {
    }
}
</script>