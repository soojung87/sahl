<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showToPortPrototype">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Service Instance To Port Prototype Mapping</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Service Instance To Port Prototype Mapping</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputToPortPrototypeName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <!-- <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showPort" x-small color="indigo">
                                            <v-icon>{{ isPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover> -->
                                    <v-btn text x-small color="indigo">
                                        <v-icon>mdi-chevron-double-right</v-icon>
                                    </v-btn>
                                    Port Prototype Iref
                                </div>
                                <v-card-text v-if="isPortOpenClose">
                                    <v-select v-model="element.selectPort" :items="selectPortList" @change="inputSelectPort" clearable @click:clear='clearPort()' label="Select Port Prototype" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                    <v-row style="height: 45px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.porttype" readonly @click="setPortSelect()" clearable @click:clear='clearPort()' label="Type TReference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/toportport'" icon v-bind="attrs" v-on="on" @click="setPortList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list v-if="element.selectPort != null">
                                                    <v-list-item v-for="(item, i) in selPortPrototype" :key="i" link @click="setPortPrototype(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item v-if="selPortPrototype == null || (selPortPrototype !=null && selPortPrototype.length == 0)">
                                                        <v-list-item-title>No Data Available</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 60px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.context" readonly @click="setContextSelect()" clearable @click:clear='clearContext()' label="Context Root SW Component Prototype Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/toportcontext'" dark icon v-bind="attrs" v-on="on" @click="setContextList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(item, i) in selContext" :key="i" link @click="setContextRef(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item v-if="selContext.length == 0">
                                                        <v-list-item-title>No Data Available</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.process" readonly @click="setProcessSelect()" clearable @click:clear='clearProcess()' label="Process Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/toportprocess'" dark icon v-bind="attrs" v-on="on" @click="setProcessList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selProcess" :key="i" link @click="setProcessRef(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newProcess" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <!-- <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showServiceIns" x-small color="indigo">
                                            <v-icon>{{ isServiceInsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover> -->
                                    <v-btn text x-small color="indigo">
                                        <v-icon>mdi-chevron-double-right</v-icon>
                                    </v-btn>
                                    Service Instance Reference
                                </div>
                                <v-card-text v-if="isServiceInsOpenClose">
                                    <v-select v-model="element.selectServiceIns" :items="selectServiceInsList" @change="inputSelectServiceIns" clearable @click:clear='clearServiceIns()' label="Executable Launch Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                    <v-row style="height: 60px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.serviceIns" readonly @click="setServiceInsSelect()" clearable @click:clear='clearServiceIns()' label="Type TReference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/toportservice'" dark icon v-bind="attrs" v-on="on" @click="setServiceInsList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list v-if="element.selectServiceIns != null">
                                                    <v-list-item v-for="(item, i) in selServiceIns" :key="i" link @click="setServiceIns(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-btn outlined color="indigo" dense text small block @click="newServiceIns" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                        <v-card-text v-show="(!iselementOpenClose && zoomvalue > $setZoominElement) || !minimaptoolbar">
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
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;PORT-PROTOTYPE-IREF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;margin:2px 0px 2px 30px;">&#60;TARGET-PORT-PROTOTYPE-REF&#62;</label>
                            <v-text-field v-model="editARXML.porttype" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;TARGET-PORT-PROTOTYPE-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 35px;">
                            <label style="padding:10px;margin:2px 0px 2px 30px;">&#60;CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <v-text-field v-model="editARXML.context" placeholder="Path" style="margin:2px 0px 2px 80px" class="lable-placeholer-color" dense></v-text-field>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin:2px 0px 2px 30px;">&#60;&#47;CONTEXT-ROOT-SW-COMPONENT-PROTOTYPE-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;&#47;PORT-PROTOTYPE-IREF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;PROCESS-REF&#62;</label>
                            <v-text-field v-model="editARXML.process" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;PROCESS-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SERVICE-INSTANCE-REF&#62;</label>
                            <v-text-field v-model="editARXML.serviceIns" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SERVICE-INSTANCE-REF&#62;</label>
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
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', selectPort:null, porttype: null, context: null, process:null, selectServiceIns: null, serviceIns: null},
            isPortOpenClose: true,
            isServiceInsOpenClose: true,
            selectPortList: ['P-PORT-PROTOTYPE','R-PORT-PROTOTYPE', 'PR-PORT-PROTOTYPE'],
            selPortPrototype: null,
            selProcess: this.$store.getters.getProcessDesign,
            selectServiceInsList: ["PROVIDED-SOMEIP-SERVICE-INSTANCE", "REQUIRED-SOMEIP-SERVICE-INSTANCE"],
            selServiceIns: null,
            selContext: this.$store.getters.getRootSWComponentPrototype,
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
        setToolbarColorDetailView(isdetail) {
            if(this.element.uuid == isdetail) {
                this.colorToolbar = "#B0E0E6" 
            } else if (this.element.uuid == this.$store.state.activeUUID) {
                this.colorToolbar  = "#FF1493"
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showToPortPrototype () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showPort() {
            this.isPortOpenClose = this.isPortOpenClose ? false : true
        },
        showServiceIns() {
            this.isServiceInsOpenClose = this.isServiceInsOpenClose ? false : true
        },
        inputToPortPrototypeName () {
            this.$store.commit('editToPortPrototype', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            //this.$store.commit('changeNameDataConstr', {uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        inputSelectPort() {
            this.clearPort()
            this.setPortList()
        },
        setPortSelect() {
            if (this.element.selectPort != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportport')
                if (endLine == undefined) {
                    if (this.element.selectPort == "P-PORT-PROTOTYPE") {
                        endLine = this.$store.getters.getSWComponentPath(this.element.porttype, 1)
                    } else if (this.element.selectPort == "R-PORT-PROTOTYPE") {
                        endLine = this.$store.getters.getSWComponentPath(this.element.porttype, 2)
                    } else if (this.element.selectPort == "PR-PORT-PROTOTYPE") {
                        endLine = this.$store.getters.getSWComponentPath(this.element.porttype, 3)
                    }
                }
                if (endLine != null) {
                    this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWComponents_str} )
                    document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)
                }
            }
        },
        setPortList() {
            if (this.element.selectPort == "P-PORT-PROTOTYPE") {
                this.selPortPrototype = this.$store.getters.getPPortPrototype
            } else if (this.element.selectPort == "R-PORT-PROTOTYPE") {
                this.selPortPrototype = this.$store.getters.getRPortPrototype
            } else if (this.element.selectPort == "PR-PORT-PROTOTYPE") {
                this.selPortPrototype = this.$store.getters.getPRPortPrototype
            }
            this.setactiveUUID()
        },
        setPortPrototype(item){
            if( this.element.porttype != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportport')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/toportport')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/toportport', this.element.uuid+'/toportport', item.uuid)
                }
                this.element.porttype = item.name
            }
            this.setactiveUUID()
        },
        clearPort() {
            this.element.porttype = null
            this.selPortPrototype = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportport')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/toportport')
            }
        },
        clearContext() {
            this.element.context = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportcontext')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/toportcontext')
            }
        },
        setContextSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportcontext')
            if (endLine == undefined) {
                endLine = this.$store.getters.getRootSWComponentPrototypePath(this.element.context)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Executable_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setContextList() {
            this.selContext = this.$store.getters.getRootSWComponentPrototype
            this.setactiveUUID()
        },
        setContextRef(item){
            if( this.element.context != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportcontext')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/toportcontext')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/toportcontext', this.element.uuid+'/toportcontext', item.uuid)
                }
                this.element.context = item.name
            }
            this.setactiveUUID()
        },

        clearProcess() {
            this.element.process = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportprocess')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/toportprocess')
            }
        },
        setProcessSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportprocess')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessDesignPath(this.element.process)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProcessDesign_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setProcessList() {
            this.selProcess = this.$store.getters.getProcessDesign
            this.setactiveUUID()
        },
        setProcessRef(item){
            if( this.element.process != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportprocess')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/toportprocess')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/toportprocess', this.element.uuid+'/toportprocess', item.uuid)
                }
                this.element.process = item.name
            }
            this.setactiveUUID()
        },
        newProcess() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementProcessDesign', {
                name: this.$store.getters.getNameProcessDesign, path: '',
                top: elementY, left: elementX, zindex: 10,  icon:"mdi-clipboard-outline", validation: false,
                executableref: null, determin: [],
            })
            EventBus.$emit('add-element', constant.ProcessDesign_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editToPortPrototype', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        inputSelectServiceIns() {
            this.clearServiceIns()
            this.setServiceInsList()
        },
        clearServiceIns() {
            this.element.serviceIns = null
            this.selServiceIns = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportservice')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/toportservice')
            }
        },
        setServiceInsSelect() {
            if (this.element.selectServiceIns != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportservice')
                if (endLine == undefined) {
                    if (this.element.selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                        endLine = this.$store.getters.getProvidedSomeIPPath(this.element.serviceIns)
                    } else if (this.element.selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                        endLine = this.$store.getters.getRequiredSomeIPPath(this.element.serviceIns)
                    }
                }
                if (endLine != null) {
                    if (this.element.selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProvidedSomeIP_str} )
                    } else if (this.element.selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.RequiredSomeIP_str} )
                    }
                    document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)
                }
            }
        },
        setServiceInsList() {
            if (this.element.selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                this.selServiceIns = this.$store.getters.getProvidedSomeIP
            } else if (this.element.selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                this.selServiceIns = this.$store.getters.getRequiredSomeIP
            }
            this.setactiveUUID()
        },
        setServiceIns(item){
            if( this.element.serviceIns != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportservice')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/toportservice')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/toportservice', this.element.uuid+'/toportservice', item.uuid)
                }
                this.element.serviceIns = item.name
            }
            this.setactiveUUID()
        },
        newServiceIns() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            if (this.element.selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                this.$store.commit('addElementProvidedSomeIP', {
                    name: this.$store.getters.getNameProvidedSomeIP, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, someipserver: null, id: '', eventP: [], method: [], eventG: [],
                })
                EventBus.$emit('add-element', constant.ProvidedSomeIP_str)
            } else if (this.element.selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                this.$store.commit('addElementRequiredSomeIP', {  //deployref, clientref,ver는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameRequiredSomeIP, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, minover: '', id: '', clientref: null, ver: null, method: [], requiredevent: [],
                })
                EventBus.$emit('add-element', constant.RequiredSomeIP_str)
            }
            this.$store.commit('editToPortPrototype', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editToPortPrototype', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
        deleteLine(fineLine) {
            var linenum = this.$store.getters.getconnectLineNum(fineLine)
            if (linenum != -1) {
                EventBus.$emit('delete-line', linenum)
                this.$store.commit('deletConnectionline', {startnum: linenum} )
            }
        },
        newLine(startLine, drawLine, endLine) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            EventBus.$emit('new-line', drawLine, endLine)
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.porttype = this.element.porttype
            this.editARXML.context = this.element.context
            this.editARXML.process = this.element.process
            this.editARXML.serviceIns = this.element.serviceIns
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editToPortPrototype', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name

            var endLine = null, changEndLine = null
            if (this.editARXML.porttype != this.element.porttype) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportport')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/toportport')
                }
                changEndLine = this.$store.getters.getSWComponentPath(this.editARXML.porttype,1)
                if (changEndLine != null) {
                    this.element.selectPort = "P-PORT-PROTOTYPE"
                    this.newLine(this.element.uuid+'/toportport', this.element.uuid+'/toportport', changEndLine)
                } else {
                    changEndLine = this.$store.getters.getSWComponentPath(this.editARXML.porttype,2)
                    if (changEndLine != null) {
                        this.element.selectPort = "R-PORT-PROTOTYPE"
                        this.newLine(this.element.uuid+'/toportport', this.element.uuid+'/toportport', changEndLine)
                    } else {
                        changEndLine = this.$store.getters.getSWComponentPath(this.editARXML.porttype,3)
                        if (changEndLine != null) {
                            this.element.selectPort = "PR-PORT-PROTOTYPE"
                            this.newLine(this.element.uuid+'/toportport', this.element.uuid+'/toportport', changEndLine)
                        } 
                    }
                }
            }
            this.element.porttype = this.editARXML.porttype

            if (this.editARXML.context != this.element.context) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportcontext')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/toportcontext')
                }
                changEndLine = this.$store.getters.getRootSWComponentPrototypePath(this.editARXML.context)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/toportcontext', this.element.uuid+'/toportcontext', changEndLine)
                }
            }
            this.element.context = this.editARXML.context

            if (this.editARXML.process != this.element.process) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportprocess')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/toportprocess')
                }
                changEndLine = this.$store.getters.getProcessDesignPath(this.editARXML.process)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/toportprocess', this.element.uuid+'/toportprocess', changEndLine)
                }
            }
            this.element.process = this.editARXML.process

            if (this.editARXML.serviceIns != this.element.serviceIns) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toportservice')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/toportservice')
                }
                changEndLine = this.$store.getters.getProvidedSomeIPPath(this.editARXML.serviceIns)
                if (changEndLine != null) {
                    this.element.selectServiceIns = "PROVIDED-SOMEIP-SERVICE-INSTANCE"
                    this.newLine(this.element.uuid+'/toportservice', this.element.uuid+'/toportservice', changEndLine)
                } else {
                    changEndLine = this.$store.getters.getRequiredSomeIPPath(this.editARXML.serviceIns)
                    if (changEndLine != null) {
                        this.element.selectServiceIns = "REQUIRED-SOMEIP-SERVICE-INSTANCE"
                        this.newLine(this.element.uuid+'/toportservice', this.element.uuid+'/toportservice', changEndLine)
                    }
                }
            }
            this.element.serviceIns = this.editARXML.serviceIns

            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', selectPort:null, porttype: null, context: null, process:null, selectServiceIns: null, serviceIns: null}
            this.dialogText = false
        },

    },

}
</script>