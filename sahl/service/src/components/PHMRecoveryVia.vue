<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showPHMRecoveryVia">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Recovery VIA Application Action To Client Server Operation Mapping</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Recovery VIA Application Action To Client Server Operation Mapping</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPHMRecoveryViaName' outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.process" readonly @click="setProcessRefSelect()" clearable @click:clear='clearProcessRef()' label="Process Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/PHMViaPro'" dark icon v-bind="attrs" v-on="on" @click="setProcessList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selProcess" :key="i" link @click="setProcess(item)">
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
                                    <v-btn text x-small color="indigo">
                                        <v-icon>mdi-chevron-double-right</v-icon>
                                    </v-btn>
                                    Recovery Action IREF
                                </div>
                                <v-card-text>
                                    <v-row style="height: 45px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.swcomponent" readonly @click="setSWCompoRefSelect()" clearable @click:clear='clearSWCompoRef()' label="SW Component Prototype Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/PHMViaSWCompo'" dark icon v-bind="attrs" v-on="on" @click="setSWCompoList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(item, i) in selSWComponent" :key="i" link @click="setSWCompo(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-btn outlined color="indigo" dense text small block @click="newSWComponent" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 45px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.port" readonly @click="setPortSelect()" clearable @click:clear='clearPort()' label="P Port Prototype Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/PHMViaPPort'" dark icon v-bind="attrs" v-on="on" @click="setPortList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(item, i) in selPort" :key="i" link @click="setPort(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item v-if="selPort.length == 0">
                                                        <v-list-item-title>No Data Available</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="10">
                                            <v-text-field v-model="element.phmRecovery" readonly @click="setPHMRecoverySelect()" clearable @click:clear='clearPHMRecovery()' label="Target Method Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/PHMViaRecovery'" dark icon v-bind="attrs" v-on="on" @click="setPHMRecoveryList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(item, i) in selPHMRecovery" :key="i" link @click="setPHMRecovery(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-btn outlined color="indigo" dense text small block @click="newPHMRecovery" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
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
            selSWComponent: this.$store.getters.getSWComponentType,
            selProcess: this.$store.getters.getProcess,
            selPort: this.$store.getters.getPPortPrototype,
            selPHMRecovery: this.$store.getters.getPHMRecovery
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, () => {
            //
        })
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
        showPHMRecoveryVia() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        inputPHMRecoveryViaName() {
            this.$store.commit('editPHMRecoveryVia', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        }, 
        clearProcessRef() {
            this.element.process = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaPro')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PHMViaPro')
            }
        },
        setProcessRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaPro')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessPath(this.element.process)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Process_str} )
                /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)*/
            }
        },
        setProcessList() {
            this.selProcess = this.$store.getters.getProcess
            this.setactiveUUID()
        },
        setProcess(item) {
            if( this.element.process != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaPro')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PHMViaPro')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/PHMViaPro', this.element.uuid+'/PHMViaPro', item.uuid, false)
                this.element.process = item.name
            }
            this.setactiveUUID()
        },
        newProcess() {
            this.$store.commit('addElementProcess', {
                name: this.$store.getters.getNameProcess, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []
            })
            EventBus.$emit('add-element', constant.Process_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editPHMRecoveryVia', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearSWCompoRef() {
            this.element.swcomponent = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaSWCompo')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PHMViaSWCompo')
            }
        },
        setSWCompoRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaSWCompo')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSWComponentPath(this.element.swcomponent, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWComponents_str} )
                /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)*/
            }
        },
        setSWCompoList() {
            this.selSWComponent = this.$store.getters.getSWComponentType
            this.setactiveUUID()
        },
        setSWCompo(item) {
            if( this.element.swcomponent != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaSWCompo')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PHMViaSWCompo')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/PHMViaSWCompo', this.element.uuid+'/PHMViaSWCompo', item.uuid, false)
                this.element.swcomponent = item.name
            }
            this.setactiveUUID()
        },
        newSWComponent() {
            this.$store.commit('addElementSWComponents', {
                    name: this.$store.getters.getNameSWComponents, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    pport: [], rport: [], prport: [],
                })
            EventBus.$emit('add-element', constant.SWComponents_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editPHMRecoveryVia', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setPortSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaPPort')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSWComponentPath(this.element.port, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWComponents_str} )
                /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)*/
            }
        },
        clearPort() {
            this.element.port = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaPPort')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PHMViaPPort')
            }
        },
        setPortList() {
            this.selPort = this.$store.getters.getPPortPrototype
            this.setactiveUUID()
        },
        setPort(item) {
            if(this.element.port != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaPPort')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PHMViaPPort')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/PHMViaPPort', this.element.uuid+'/PHMViaPPort', item.uuid, false)
                }
                this.element.port = item.name
            }
            this.setactiveUUID()
        },

        clearPHMRecovery() {
            this.element.phmRecovery = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaRecovery')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PHMViaRecovery')
            }
        },
        setPHMRecoverySelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaRecovery')
            if (endLine == undefined) {
                endLine = this.$store.getters.getPHMRecoveryPath(this.element.phmRecovery)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.RecoveryVA_str} )
                /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)*/
            }
        },
        setPHMRecoveryList() {
            this.selPHMRecovery = this.$store.getters.getPHMRecovery
            this.setactiveUUID()
        },
        setPHMRecovery(item) {
            if( this.element.phmRecovery != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PHMViaRecovery')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PHMViaRecovery')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/PHMViaRecovery', this.element.uuid+'/PHMViaRecovery', item.uuid, false)
                this.element.phmRecovery = item.name
            }
            this.setactiveUUID()
        },
        newPHMRecovery() {
            this.$store.commit('addElementPHMRecovery', {
                name: this.$store.getters.getNamePHMRecovery, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                reconame: '', faf: null
            })
            EventBus.$emit('add-element', constant.RecoveryVA_str)
            this.$store.commit('editPHMRecoveryVia', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPHMRecoveryVia', {compo:"z", uuid:this.element.uuid, zindex:10} )
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



    },
}
</script>
