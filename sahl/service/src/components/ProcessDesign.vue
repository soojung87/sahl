<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showProcessDesign">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Process Design</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Process Design</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputProDesignName' outlined dense  @click="clickOtherFields()"></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.executableref" readonly @click="setExecutableRefSelect()" :style="refExecutable ? 'height: 43px;border:solid red 2px' : ''"
                                                 clearable @click:clear='clearExecutableRef()' label="Executable Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/prodesignexecutable'" dark icon v-bind="attrs" v-on="on" @click="setExecutableList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selExecutable" :key="i" link @click="setExecutable(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newExecutable" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showDeterministric" x-small color="indigo">
                                            <v-icon>{{ isDeterminsticOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Determinstic Client Resource Needs
                                    <v-btn v-if="isDeterminsticOpenClose" @click="addDeterministic" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='determinTab' v-if="isDeterminsticOpenClose">
                                    <v-tab v-for="(tab, idx) in element.determin" :key="idx" @click="clickDeterminstictab()"> 
                                        {{idx}}
                                        <v-btn text x-small @click="deleteDeterminstic(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="determinTab" v-if="isDeterminsticOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.determin" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.swname" label="name" @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.hardwareP" label="Hardware Platform" @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-card outlined class="mx-auto">
                                                    <div class="subtitle-2" style="height:20px">
                                                        Init Resource
                                                    </div>
                                                    <v-card-text>
                                                        <v-text-field v-model="tab.initnofinstruction" label="Number of Instructions" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="tab.initsequentialbegin" label="Sequential Instructions Begin" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="tab.initsequentialend" label="Sequential Instructions End" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="tab.initspeedup" label="Speedup" placeholder="int" @click="clickOtherFields()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-card-text>
                                                </v-card>
                                                <v-card outlined class="mx-auto">
                                                    <div class="subtitle-2" style="height:20px">
                                                        Run Resource
                                                    </div>
                                                    <v-card-text>
                                                        <v-text-field v-model="tab.runnofinstruction" label="Number of Instructions" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="tab.runsequentialbegin" label="Sequential Instructions Begin" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="tab.runsequentialend" label="Sequential Instructions End" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="tab.runspeedup" label="Speedup" @click="clickOtherFields()" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-card-text>
                                                </v-card>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
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
                        <v-row style="height:30px">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height:25px">
                            <label style="padding:10px;">&#60;EXECUTABLE-REF&#62;</label>
                            <v-text-field v-model="editARXML.executableref" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;EXECUTABLE-REF&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 50px;">&#60;DETERMINISTIC-CLIENT-RESOURCE-NEEDSS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextDeterministic()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row>
                            <div class="text-editDialog" style="height: 430px;">
                                <v-row v-for="(item, i) in editARXML.determin" :key="i" style="height: 410px;">
                                    <div>
                                        <v-row style="height: 25px;margin:0px;">
                                            <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextDeterministic(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;DETERMINISTIC-CLIENT-RESOURCE-NEEDS&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.swname" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;HARDWARE-PLATFORM&#62;</label>
                                            <v-text-field v-model="item.hardwareP" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;HARDWARE-PLATFORM&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;INIT-RESOURCE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;NUMBER-OF-INSTRUCTIONS&#62;</label>
                                            <v-text-field v-model="item.initnofinstruction" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;NUMBER-OF-INSTRUCTIONS&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:2px 0px 2px 100px;">
                                            <v-col cols="5">
                                            <label>&#60;SEQUENTIAL-INSTRUCTIONS-BEGIN&#62;</label>
                                            </v-col><v-col cols="2">
                                            <v-text-field v-model="item.initsequentialbegin" placeholder="Int" style="margin: -8px 0px 2px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                            </v-col><v-col cols="5">
                                            <label style="padding:10px;">&#60;&#47;SEQUENTIAL-INSTRUCTIONS-BEGIN&#62;</label>
                                            </v-col>
                                        </v-row>
                                        <v-row style="height: 25px;margin:2px 0px 2px 100px;">
                                            <v-col cols="5">
                                            <label>&#60;SEQUENTIAL-INSTRUCTIONS-END&#62;</label>
                                            </v-col><v-col cols="2">
                                            <v-text-field v-model="item.initsequentialend" placeholder="Int" style="margin: -8px 0px 2px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                            </v-col><v-col cols="5">
                                            <label style="padding:10px;">&#60;&#47;SEQUENTIAL-INSTRUCTIONS-END&#62;</label>
                                            </v-col>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 100px;">&#60;SPEEDUP&#62;</label>
                                            <v-text-field v-model="item.initspeedup" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SPEEDUP&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;INIT-RESOURCE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;RUN-RESOURCE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 100px;">&#60;NUMBER-OF-INSTRUCTIONS&#62;</label>
                                            <v-text-field v-model="item.runnofinstruction" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;NUMBER-OF-INSTRUCTIONS&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:2px 0px 2px 100px;">
                                            <v-col cols="5">
                                            <label>&#60;SEQUENTIAL-INSTRUCTIONS-BEGIN&#62;</label>
                                            </v-col><v-col cols="2">
                                            <v-text-field v-model="item.runsequentialbegin" placeholder="Int" style="margin: -8px 0px 2px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                            </v-col><v-col cols="5">
                                            <label style="padding:10px;">&#60;&#47;SEQUENTIAL-INSTRUCTIONS-BEGIN&#62;</label>
                                            </v-col>
                                        </v-row>
                                        <v-row style="height: 25px;margin:2px 0px 2px 100px;">
                                            <v-col cols="5">
                                            <label>&#60;SEQUENTIAL-INSTRUCTIONS-END&#62;</label>
                                            </v-col><v-col cols="2">
                                            <v-text-field v-model="item.runsequentialend" placeholder="Int" style="margin: -8px 0px 2px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                            </v-col><v-col cols="5">
                                            <label style="padding:10px;">&#60;&#47;SEQUENTIAL-INSTRUCTIONS-END&#62;</label>
                                            </v-col>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 100px;">&#60;SPEEDUP&#62;</label>
                                            <v-text-field v-model="item.runspeedup" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SPEEDUP&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;RUN-RESOURCE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:58px;">&#60;&#47;DETERMINISTIC-CLIENT-RESOURCE-NEEDS&#62;</label>
                                        </v-row>
                                    </div>
                                </v-row>
                            </div>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 20px;" >&#60;&#47;DETERMINISTIC-CLIENT-RESOURCE-NEEDSS&#62;</label>
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
import constant from "../store/constants.js"
import { EventBus } from "../main.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
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
                if (this.zoomvalue  > this.$setZoominLineTitle && this.zoomvalue < this.$setZoominLineSetupStart) {
                    EventBus.$emit('drawLineTitleBar', this.element.uuid, false)
                } else if (this.zoomvalue > this.$setZoominLineSetupStart && this.zoomvalue < this.$setZoominLineSetupEnd) {
                    this.$nextTick(() => {
                        EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                    })
                }
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
            editARXML: {name:'', executableref: null, determin: []},
            editTextItem: {swname: '', hardwareP:'', 
                initnofinstruction: '', initsequentialbegin: '', initsequentialend: '', initspeedup: '',
                runnofinstruction: '', runsequentialbegin: '', runsequentialend: '', runspeedup: ''},
            isDeterminsticOpenClose: true,
            selExecutable: this.$store.getters.getExecutable,
            determinTab: 0,
            refExecutable: false,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum) => {
            this.refExecutable = false

            if (refNum == 1 ) {
                this.refExecutable = true
            }
        })
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
        showProcessDesign() {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showDeterministric() {
            this.clickOtherFields()
            this.isDeterminsticOpenClose = this.isDeterminsticOpenClose? false : true
        },
        inputProDesignName() {
            this.$store.commit('editProcessDesign', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refExecutable) {
                this.deleteOpenElement()
                this.refExecutable = false
            }
        },

        clearExecutableRef() {
            this.element.executableref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
            console.log('clearExecutableRef==' + endLine)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/prodesignexecutable')
                this.refExecutable = false
            }
        },
        setExecutableRefSelect() {
            if (this.element.executableref != null) {this.refExecutable = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getExecutablePath(this.element.executableref)
                }
                if (endLine != null) {
                    this.$store.commit('editExecutable', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Executable_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/prodesignexecutable', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/prodesignexecutable', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.Executable_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setExecutableList() {
            this.selExecutable = this.$store.getters.getExecutable
            this.setactiveUUID()
        },
        setExecutable(item) {
            this.clickOtherFields()
            if (this.element.executableref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/prodesignexecutable')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refExecutable = true
                    this.$store.commit('editExecutable', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Executable_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/prodesignexecutable', this.element.uuid+'/prodesignexecutable', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/prodesignexecutable', end:item.uuid, iscircle:false, refNum:1})
                }
                this.element.executableref = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refExecutable = true
                    this.$store.commit('editExecutable', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Executable_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/prodesignexecutable', this.element.uuid+'/prodesignexecutable', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/prodesignexecutable', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        newExecutable() {
            this.$store.commit('addElementExecutable', { //applicationtyperef 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameExecutable, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    version: '', category:'', buildType:null, loggingBehabior:null, reportingBehabior:null, swname:'', applicationtyperef: null,
                })
            EventBus.$emit('add-element', constant.Executable_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcessDesign', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addDeterministic() {
            this.clickOtherFields()
            const editItem = {swname: '', hardwareP:'', 
                initnofinstruction: '', initsequentialbegin: '', initsequentialend: '', initspeedup: '',
                runnofinstruction: '', runsequentialbegin: '', runsequentialend: '', runspeedup: ''}
            const addObj = new Object(editItem)
            this.element.determin.push(addObj)
            this.determinTab = this.element.determin.length-1
        },
        clickDeterminstictab() {},
        deleteDeterminstic(idx) {
            this.clickOtherFields()
            this.element.determin.splice(idx, 1)
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProcessDesign', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
        deleteLine(fineLine) {
            var linenum = this.$store.getters.getconnectLineNum(fineLine)
            if (linenum != -1) {
                this.$store.commit('deletConnectionline', {startnum: linenum} )
                this.deleteOpenElement()
            }
        },
        deleteOpenElement() {
            //EventBus.$emit('delete-line', this.$store.getters.getDeleteOpenElement(this.element.uuid))
            this.$store.commit('deleteOpenElemnt', {uuid: this.element.uuid, isDeleteAll: false, startUUID: this.element.uuid} )
        },
        newLine(startLine, drawLine, endLine, isView) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine)
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.executableref = this.element.executableref
            this.editARXML.determin = JSON.parse(JSON.stringify(this.element.determin))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editProcessDesign', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            
            if (this.editARXML.executableref != null &&this.element.executableref != this.editARXML.executableref) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prodesignexecutable')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/prodesignexecutable')
                }
                var changEndLine = this.$store.getters.getExecutablePath(this.editARXML.executableref)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/prodesignexecutable', this.element.uuid+'/prodesignexecutable', changEndLine, false)
                }
            }
            this.element.executableref = this.editARXML.executableref
            this.element.determin = JSON.parse(JSON.stringify(this.editARXML.determin))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', executableref: '', determin: []}
            this.editTextItem = {swname: '', hardwareP:'', 
                initnofinstruction: '', initsequentialbegin: '', initsequentialend: '', initspeedup: '',
                runnofinstruction: '', runsequentialbegin: '', runsequentialend: '', runspeedup: ''}
            this.dialogText = false
        },
        newTextDeterministic() {
            this.editTextItem = {swname: '', hardwareP:'', 
                initnofinstruction: '', initsequentialbegin: '', initsequentialend: '', initspeedup: '',
                runnofinstruction: '', runsequentialbegin: '', runsequentialend: '', runspeedup: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.determin.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.determin.push(addObj);
        },
        deletTextDeterministic(idx) {
            this.editARXML.determin.splice(idx,1)
        },
    },
}
</script>
