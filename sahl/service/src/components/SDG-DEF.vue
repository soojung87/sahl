<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showSDG">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>SDG-DEF</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SDG-DEF</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSDGName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showSDGClass" x-small color="indigo">
                                            <v-icon>{{ isSDGClassOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    SDG Class
                                    <v-btn v-if="isSDGClassOpenClose" @click="addSDGClass()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isSDGClassOpenClose">
                                    <v-tabs v-model='SDGClassTab' height="30px" show-arrows @change="changeSDGClassTab()">
                                        <v-tab v-for="(tab, idx) in element.sdgClass" :key="idx" @click="clickSDGClassTab()"> 
                                            {{tab.id}}
                                            <v-btn text x-small @click="deleteSDGClass(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="SDGClassTab">
                                        <v-tab-item v-for="(tab, idx) in element.sdgClass" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" label="Name" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                    <v-text-field v-model="tab.gid" label="GID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.metaClass" label="Extends Meta Class" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-card outlined class="mx-auto">
                                                        <div class="subtitle-2" style="height:20px">
                                                            <v-btn text  x-small color="indigo">
                                                                <v-icon>mdi-chevron-double-right</v-icon>
                                                            </v-btn>
                                                            Attributes
                                                        </div>
                                                        <v-card-text>
                                                            <v-text-field v-model="tab.attriName" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.lowMulti" label="Lower Multiplicity" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.upMulti" label="Upper Mulriplicity" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.atrriGid" label="GID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.pattern" label="Pattern" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                        <v-card-text v-else>
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        readonly outlined dense></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
            <v-dialog v-model="dialogText" persistent width="800">
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
                            <label style="padding:10px;height: 20px;">&#60;SDG-CLASSESS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextSDG()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row>
                            <div class="text-editDialog" style="height: 400px;">
                                <v-row v-for="(item, i) in editARXML.sdgClass" :key="i" style="height: 340px;">
                                    <div>
                                        <v-row style="height: 25px;margin:0px;">
                                            <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextSDG(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SDG-CLASS&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.name" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;GID&#62;</label>
                                            <v-text-field v-model="item.gid" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;GID&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EXTENDS-META-CLASS&#62;</label>
                                            <v-text-field v-model="item.metaClass" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;EXTENDS-META-CLASS&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;ATTRIBUTES&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SDG-PRIMITIVE-ATTRIBUTE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 120px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.attriName" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 120px;">&#60;LOWER-MULTIPLICITY&#62;</label>
                                            <v-text-field v-model="item.lowMulti" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;LOWER-MULTIPLICITY&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 120px;">&#60;UPPER-MULTIPLICITY&#62;</label>
                                            <v-text-field v-model="item.upMulti" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;UPPER-MULTIPLICITY&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 120px;">&#60;GID&#62;</label>
                                            <v-text-field v-model="item.atrriGid" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;GID&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 120px;">&#60;PATTERN&#62;</label>
                                            <v-text-field v-model="item.pattern" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;PATTERN&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;&#47;SDG-PRIMITIVE-ATTRIBUTE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;ATTRIBUTES&#62;</label>
                                        </v-row>

                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:50px;">&#60;&#47;SDG-CLASS&#62;</label>
                                        </v-row>
                                    </div>
                                </v-row>
                            </div>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 20px;" >&#60;&#47;SDG-CLASSES&#62;</label>
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
            editARXML: {name:'', sdgClass: []},
            editTextItem: {name: '', gid: '', metaClass: '', 
                              attriName: '', lowMulti: '', upMulti: '', atrriGid: '', pattern: '', id: ''},
            isSDGClassOpenClose : true,
            SDGClassTab: null,
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
        showSDG() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showE2EProfileConfig() {
            this.isE2EProfileConfigOpenClose = this.isE2EProfileConfigOpenClose ? false : true
        },
        showSDGClass() {
            this.$store.commit('editSDG_DEF', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputSDGName() {
        },

        addSDGClass() {
            const editItem = {name: '', gid: '', metaClass: '', 
                              attriName: '', lowMulti: '', upMulti: '', atrriGid: '', pattern: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                n++;
                res = this.element.sdgClass.some(ele => ele.id === n)
            }
            addObj.id = n
            this.element.sdgClass.push(addObj)
            this.SDGClassTab = this.element.sdgClass.length-1
        },
        clickSDGClassTab() {
        },
        changeSDGClassTab() {
        },
        deleteSDGClass(idx) {
            this.element.sdgClass.splice(idx, 1)
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSDG_DEF', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.sdgClass = JSON.parse(JSON.stringify(this.element.sdgClass))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editSDG_DEF', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.sdgClass = JSON.parse(JSON.stringify(this.editARXML.sdgClass))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', sdgClass: []}
            this.editTextItem = {name: '', gid: '', metaClass: '', 
                              attriName: '', lowMulti: '', upMulti: '', atrriGid: '', pattern: '', id: ''}
            this.dialogText = false
        },
        newTextSDG() {
            this.editTextItem = {name: '', gid: '', metaClass: '', 
                              attriName: '', lowMulti: '', upMulti: '', atrriGid: '', pattern: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.sdgClass.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.sdgClass.push(addObj);
        },
        deletTextSDG(idx) {
            this.editARXML.sdgClass.splice(idx,1)
        },
    },
}
</script>
