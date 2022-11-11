<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showCLient">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>SomeIP SD Client Event Group Timing Config</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SomeIP SD Client Event Group Timing Config</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputClientName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    Request Response Delay
                                </div>
                                <v-card-text>
                                    <v-text-field v-model="element.delaymax" label="Max Value" placeholder="Time" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                    <v-text-field v-model="element.delaymin" label="Min Value" placeholder="Time" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-card-text>
                            </v-card>
                            <v-text-field v-model="element.retrydelay" label="Subscribe Eventgroup Retry Delay" placeholder="Time" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.retrymax" label="Subscribe Eventgroup Retry Max" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.timetolive" label="Time To Live" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-card-text>
                        <v-card-text v-else>
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        readonly outlined dense></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
            <v-dialog v-model="dialogText" persistent scrollable width="800">
                <v-card >
                    <v-card-title class="text-h6 green accent-1"> Edit Text </v-card-title>
                    <v-card-text>
                        <br>
                        <v-row>
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;REQUEST-RESPONSE-DELAY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;MAX-VALUE&#62;</label>
                            <v-text-field v-model="editARXML.delaymax" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MAX-VALUE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;MIN-VALUE&#62;</label>
                            <v-text-field v-model="editARXML.delaymin" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MIN-VALUE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;REQUEST-RESPONSE-DELAY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;SUBSCRIBE-EVENTGROUP-RETRY-DELAY&#62;</label>
                                <v-text-field v-model="editARXML.retrydelay" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SUBSCRIBE-EVENTGROUP-RETRY-DELAY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;SUBSCRIBE-EVENTGROUP-RETRY-MAX&#62;</label>
                            <v-text-field v-model="editARXML.retrymax" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SUBSCRIBE-EVENTGROUP-RETRY-MAX&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;TIME-TO-LIVE&#62;</label>
                            <v-text-field v-model="editARXML.timetolive" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;TIME-TO-LIVE&#62;</label>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text  @click="saveARXML()" >
                            Save
                        </v-btn>
                        <v-btn class="d-inline-flex ml-3 mr-1" color="green darken-1" text @click="cancelARXML()">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
//import constant from "../store/constants.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'
import { EventBus } from "../main.js"

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: {
        activeUUID() {
            return this.$store.state.activeUUID
        },
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        /*detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        },*/
        setting(value) {
            this.zoomvalue = value.zoomMain
            if (this.zoomvalue < this.$setZoominTooltip) {
                this.isTooltip = false
            } else {
                this.isTooltip = this.minimaptoolbar
            }
        },
    },
    created() {
        this.setToolbarColor(this.$store.state.activeUUID)
    },
    data() {
        return {
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: true,//this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', delaymax: '', delaymin: '', retrydelay: '', retrymax: '', timetolive: ''},
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})            
        },
        setToolbarColor(uuid) 
        {
            if(this.element.uuid == uuid) {
                this.colorToolbar = "#FF1493" 
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        setToolbarColorDetailView(isdetail) {
            if(this.element.uuid == isdetail) {
                this.colorToolbar = "#B0E0E6" 
            } else if (this.element.uuid == this.$store.state.activeUUID) {
                this.colorToolbar  = "#FF1493"
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showCLient () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        inputClientName () {
            this.$store.commit('editClient', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.delaymax = this.element.delaymax
            this.editARXML.delaymin = this.element.delaymin
            this.editARXML.retrydelay = this.element.retrydelay
            this.editARXML.retrymax = this.element.retrymax
            this.editARXML.timetolive = this.element.timetolive
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editClient', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.delaymax = this.editARXML.delaymax
            this.element.delaymin = this.editARXML.delaymin
            this.element.retrydelay = this.editARXML.retrydelay
            this.element.retrymax = this.editARXML.retrymax
            this.element.timetolive = this.editARXML.timetolive
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', delaymax: '', delaymin: '', retrydelay: '', retrymax: '', timetolive: ''}
            this.dialogText = false
        },
    },

}
</script>