<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="shoeModeDeclaration">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Mode Declaration Group</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Mode Declaration Group</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputModeDeclarationName' outlined dense></v-text-field>
                            <v-select v-model="element.initmode" :items="element.modedeclaration" label="Initial Mode" clearable @click:clear='element.initmode=null' @click="setactiveUUID()" outlined dense style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showModeDeclarationItem" x-small color="indigo">
                                            <v-icon>{{ isModeDeclarationOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Mode Declarations
                                </div>
                                <v-card-text v-if="isModeDeclarationOpenClose">
                                    <v-row>
                                        <v-col v-for="(item, i) in element.modedeclaration" :key="i"  class="shrink">
                                            <v-chip close @click:close="deleteModeDeclaration(i)" small>
                                                {{item}}
                                            </v-chip>
                                        </v-col>
                                        <v-col>
                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addmodedeclaration" @save="editmodeDeclaration=''"> 
                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                    <v-icon >mdi-plus</v-icon>New Item
                                                </v-btn>
                                                <template v-slot:input>
                                                    <br>
                                                    <v-text-field v-model="editmodeDeclaration" label="Mode declaration" placeholder="String" @click="setactiveUUID()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                </template>
                                            </v-edit-dialog>
                                        </v-col>
                                    </v-row>
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
                            <label style="padding:10px;">&#60;INITIAL-MODE-REF&#62;</label>
                            <v-text-field v-model="editARXML.initmode" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;INITIAL-MODE-REF&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height:15px;">&#60;MODE-DECLARATIONS&#62;
                                <v-btn @click="newTextMD()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <v-row>
                            <div class="text-editDialog">
                                <br>
                                <v-row v-for="(item, i) in editARXML.modedeclaration" :key="i" style="height: 90px;">
                                    <div>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 30px;">
                                                <v-btn @click="deletTextMD(i)" text x-small color="indigo">
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                                &#60;MODE-DECLARATION&#62;
                                            </label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:90px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="editARXML.modedeclaration[i]" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:75px;">&#60;&#47;MODE-DECLARATION&#62;</label>
                                        </v-row>
                                    </div>
                                </v-row>
                            </div>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height:20px;" >&#60;&#47;MODE-DECLARATIONS&#62;</label>
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
//import { EventBus } from "../main.js"
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
            rules: { name:  [val => (val || '').length > 0 ], },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: this.minimaptoolbar,
            dialogText: false,
            editARXML: {name:'', initmode: null, modedeclaration: []},
            isModeDeclarationOpenClose: true,
            editmodeDeclaration: '',
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
        setToolbarColor(activeid) 
        {
            if(this.element.uuid == activeid) {
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
        shoeModeDeclaration () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        showModeDeclarationItem () {
            this.isModeDeclarationOpenClose = this.isModeDeclarationOpenClose ? false : true
        },
        inputModeDeclarationName() {
            this.$store.commit('editModeDeclarationGroup', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        addmodedeclaration() {
            this.element.modedeclaration.push(this.editmodeDeclaration)
            this.editmodeDeclaration = ''
        },
        deleteModeDeclaration(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'modeDeclar', deleteTab: true, tabName : this.element.modedeclaration[idx], path: this.element.path, name: this.element.name})
            this.element.modedeclaration.splice(idx, 1)
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editModeDeclarationGroup', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.initmode = this.element.initmode
            this.editARXML.modedeclaration = JSON.parse(JSON.stringify(this.element.modedeclaration))
            this.dialogText= true
        },
        saveARXML() {
            this.element.name = this.editARXML.name
            if (this.editARXML.initmode == null ) {
                this.element.initmode = this.editARXML.initmode
            } else {
                this.editARXML.modedeclaration.forEach(element => {
                    if (element == this.editARXML.initmode) {
                        this.element.initmode = this.editARXML.initmode
                    }
                })
            }
            this.element.modedeclaration = JSON.parse(JSON.stringify(this.editARXML.modedeclaration))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', initmode: null, modedeclaration: []}
            this.editmodeDeclaration = ''
            this.dialogText = false
        },
        newTextMD() {
            this.editARXML.modedeclaration.push(this.editmodeDeclaration);
            this.editmodeDeclaration = ''
        },
        deletTextMD(idx) {
            this.editARXML.modedeclaration.splice(idx,1)
        },

    },
}
</script>