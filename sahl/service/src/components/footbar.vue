<template>
    <v-card class="flex" flat>
        <v-app-bar dense>
            <v-edit-dialog  large persistent cancel-text='' save-text="Ok"> 
                <v-btn text small :class="[errorList.length > 0 ? 'red--text' : 'black--text']">
                    <v-icon >mdi-alert-outline</v-icon>{{errorList.length}}
                </v-btn>
                <template v-slot:input>
                    <v-subheader class="text-h6 red accent-2 font-weight-bold" dark> Error List</v-subheader>
                    <v-list dense class='validationList'>
                        <v-list-item v-for="(item, i) in errorList" :key="i" link @click="goElement(item.uuid)" style="height: 12px;">
                            <v-list-item-avatar>
                                <v-icon color="red lighten-1">mdi-alert-circle-outline</v-icon>
                            </v-list-item-avatar>                               
                            <v-list-item-content>
                                <v-list-item-title v-if="item.error == 'Name Space'" class="red--text" >{{ item.parent +'/'+item.name +' ===> '+ item.error +' is wrong'}}</v-list-item-title>
                                <v-list-item-title v-else class="red--text" >{{ item.parent +'/'+item.name +' ===> '+ item.error +' is null'}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </template>
            </v-edit-dialog>
            <v-btn text small @click="openZoomdialog()">
                <v-icon>mdi-magnify</v-icon>
                zoom :  {{zoomvalue.toFixed(2)}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-checkbox v-model="checkDrag" label="Draggable" dense @click="checkDraggable()" style="height:28px;"></v-checkbox>
            <v-dialog v-model='zoomdialog' width="500" persistent>
                <v-card>
                    <v-card-title class="text-h6 green accent-1"> Settings</v-card-title>
                    <v-subheader>Main View Zoom</v-subheader>
                    <v-card-text>
                        <v-slider v-model="zoomMain" append-icon="mdi-magnify-plus-outline" prepend-icon="mdi-magnify-minus-outline"
                            :max="2" :min="0.3" @click:append="zoomMainIn" @click:prepend="zoomMainOut" step="0.05" ticks="always" tick-size="3"></v-slider>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="saveZoom()" >
                            Save
                        </v-btn>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelZoom()">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app-bar>
    </v-card>
</template>

<script>
import { EventBus } from "../main.js"

export default {
    computed: { 
        errorList() {
            return this.$store.state.errorList
        },
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
            zoomdialog: false,
            zoomMain: this.$store.state.setting.zoomMain,
            checkDrag: true,
        }
    },
    methods: {
        goElement(uuid) {
            EventBus.$emit('goElement', uuid)
        },
        openZoomdialog() {
            this.zoomMain = this.$store.state.setting.zoomMain
            this.zoomdialog = true
        },
        zoomMainOut () {
            this.zoomMain = this.zoomMain <= 0.2 ? 0.2 : this.zoomMain - 0.1
        },
        zoomMainIn () {
            this.zoomMain = this.zoomMain >= 2 ? 2 : this.zoomMain + 0.1
        },
        saveZoom() {
            this.$store.commit('setZoomInOut', {valueMain: this.zoomMain, valueDetail: null})
            this.cancelZoom()
        },
        cancelZoom() {
            this.zoomdialog = false
        },
        checkDraggable() {
            this.$store.commit('setDraggable', {drag: this.checkDrag})
        },
    }
}
</script>