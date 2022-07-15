<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showSomeIPClient">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>SomeIP SD Client Service Instance Config</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SomeIP SD Client Service Instance Config</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSomeIPClientName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    Initial Find Behavior
                                </div>
                                <v-card-text>
                                    <v-text-field v-model="element.inidelaymax" label="Inital Delay Max Value" placeholder="Time" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                    <v-text-field v-model="element.inidelaymin" label="Inital Delay Min Value" placeholder="Time" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                    <v-text-field v-model="element.inibasedelay" label="Inital Repetitions Base Delay" placeholder="Time" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                                    <v-text-field v-model="element.inirepetimax" label="Inital Repetitions Max" placeholder="Int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-card-text>
                            </v-card>
                            <v-text-field v-model="element.findtime" label="Service Find Time To Live" placeholder="Int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-card-text>
                        <v-card-text v-else-if="zoomvalue > $setZoominElement || !minimaptoolbar">
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
                            <label style="padding:10px;">&#60;INITIAL-FIND-BEHAVIOR&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;INITIAL-DELAY-MAX-VALUE&#62;</label>
                            <v-text-field v-model="editARXML.inidelaymax" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;INITIAL-DELAY-MAX-VALUE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;INITIAL-DELAY-MIN-VALUE&#62;</label>
                            <v-text-field v-model="editARXML.inidelaymin" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;INITIAL-DELAY-MIN-VALUE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;INITIAL-REPETITIONS-BASE-DELAY&#62;</label>
                            <v-text-field v-model="editARXML.inibasedelay" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;INITIAL-REPETITIONS-BASE-DELAY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;INITIAL-REPETITIONS-MAX&#62;</label>
                            <v-text-field v-model="editARXML.inirepetimax" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;INITIAL-REPETITIONS-MAX&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;INITIAL-FIND-BEHAVIOR&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;SERVICE-FIND-TIME-TO-LIVE&#62;</label>
                                <v-text-field v-model="editARXML.findtime" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SERVICE-FIND-TIME-TO-LIVE&#62;</label>
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


export default {
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: {
        activeUUID() {
            return this.$store.state.activeUUID
        },
        detailViewUUID() {
            return this.$store.state.detailViewUUID
        },
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        },
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
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', findtime: '', inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: ''},
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
        showSomeIPClient () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        inputSomeIPClientName () {
            this.$store.commit('editSomeIPClient', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.findtime = this.element.findtime
            this.editARXML.inidelaymax = this.element.inidelaymax
            this.editARXML.inidelaymin = this.element.inidelaymin
            this.editARXML.inibasedelay = this.element.inibasedelay
            this.editARXML.inirepetimax = this.element.inirepetimax
            this.dialogText= true
        },
        saveARXML() {
            this.element.name = this.editARXML.name
            this.element.findtime = this.editARXML.findtime
            this.element.inidelaymax = this.editARXML.inidelaymax
            this.element.inidelaymin = this.editARXML.inidelaymin
            this.element.inibasedelay = this.editARXML.inibasedelay
            this.element.inirepetimax = this.editARXML.inirepetimax
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', findtime: '', inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: ''}
            this.dialogText = false
        },
    },

}
</script>