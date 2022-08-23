<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showApplicationArray">
                                    <v-icon>{{ istoolbarOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Application Array Data Type</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Application Array Data Type</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="istoolbarOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputApplicaionAName' outlined dense></v-text-field>
                            <v-text-field v-model="element.category" label="Category" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.dynamicArrySize" label="Dynamic Array Size Profile" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showAAItem" x-small color="indigo">
                                            <v-icon>{{ isElementOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Element
                                </div>
                                <v-card-text v-if="isElementOpenClose">  
                                    <v-text-field v-model="element.elename" label="Name" :rules="rules.name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                    <v-select v-model="element.elehandling" :items="handlingLaunch" clearable label="Array Size Handling" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                    <v-select v-model="element.elesemantics" :items="semanticsLaunch" clearable label="Array Size Semantics" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                    <v-text-field v-model="element.elemaxnumber" label="Max Number of Elements" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-card-text>
                            </v-card>
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
                            <label style="padding:10px;">&#60;CATEGORY&#62;</label>
                            <v-text-field v-model="editARXML.category" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;CATEGORY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;DYNAMIC-ARRAY-SIZE-PROFILE&#62;</label>
                            <v-text-field v-model="editARXML.dynamicArrySize" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;DYNAMIC-ARRAY-SIZE-PROFILE&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;ELEMENT&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.elename" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;ARRAY-SIZE-HANDLING&#62;</label>
                            <v-text-field v-model="editARXML.elehandling" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;ARRAY-SIZE-HANDLING&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;ARRAY-SIZE-SEMANTICS&#62;</label>
                            <v-text-field v-model="editARXML.elesemantics" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;ARRAY-SIZE-SEMANTICS&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px; margin-left: 30px;">&#60;MAX-NUMBER-OF-ELEMENTS&#62;</label>
                            <v-text-field v-model="editARXML.elemaxnumber" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MAX-NUMBER-OF-ELEMENTS&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;ELEMENT&#62;</label>
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
        setting() {
            return this.$store.state.setting
        },
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
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
            istoolbarOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', category: '', dynamicArrySize: '', elename: '', elehandling: null, elesemantics: null, elemaxnumber: ''},
            isElementOpenClose: true,
            handlingLaunch: ['ALL-INDICES-DIFFERENT-ARRAY-SIZE','ALL-INDICES-DEFFERENT-ARRAY-SIZE', 'INHERITED-FORM-ARRAY-ELEMENT-TYPE-SIZE'],
            semanticsLaunch: ['FIXED-SIZE', 'VARIABLE-SIZE'],
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

        showApplicationArray () {
            this.istoolbarOpenClose = this.istoolbarOpenClose ? false : true
        },
        showAAItem () {
            this.isElementOpenClose = this.isElementOpenClose ? false : true
        },
        inputApplicaionAName () {
            this.$store.commit('editApplicationArray', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editApplicationArray', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.category = this.element.category
            this.editARXML.dynamicArrySize = this.element.dynamicArrySize
            this.editARXML.elename = this.element.elename
            this.editARXML.elehandling = this.element.elehandling
            this.editARXML.elesemantics = this.element.elesemantics
            this.editARXML.elemaxnumber = this.element.elemaxnumber
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editApplicationArray', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.category = this.editARXML.category
            this.element.dynamicArrySize = this.editARXML.dynamicArrySize
            this.element.elename = this.editARXML.elename
            if (this.editARXML.elehandling == 'ALL-INDICES-DIFFERENT-ARRAY-SIZE' || this.editARXML.elehandling == 'ALL-INDICES-DEFFERENT-ARRAY-SIZE' || this.editARXML.elehandling == 'INHERITED-FORM-ARRAY-ELEMENT-TYPE-SIZE' || this.editARXML.elehandling == null) {
                this.element.elehandling = this.editARXML.elehandling
            }
            if(this.editARXML.elesemantics == 'FIXED-SIZE' || this.editARXML.elesemantics == 'VARIABLE-SIZE' || this.editARXML.elesemantics == null) {
                this.element.elesemantics = this.editARXML.elesemantics
            }
            this.element.elemaxnumber = this.editARXML.elemaxnumber
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', category: '', dynamicArrySize: '', elename: '', elehandling: null, elesemantics: null, elemaxnumber: ''}
            this.dialogText = false
        },

    },

}
</script>