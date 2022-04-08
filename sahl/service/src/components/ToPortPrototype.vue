<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Service Instance To Port Prototype Mapping</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
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
                            <v-row>
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
                                            <v-list-item v-if="selPortPrototype.length == 0">
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
                <v-card-text v-else>
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                readonly outlined dense></v-text-field>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import constant from "../store/constants.js"
import { EventBus } from "../main.js"
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
        }
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        }
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
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isPortOpenClose: true,
            isServiceInsOpenClose: true,
            selectPortList: ['P-PORT-PROTOTYPE','R-PORT-PROTOTYPE', 'PR-PORT-PROTOTYPE'],
            selPortPrototype: null,
            selProcess: this.$store.getters.getProcessDesign,
            selectServiceInsList: ["PROVIDED-SOMEIP-SERVICE-INSTANCE", "REQUIRED-SOMEIP-SERVICE-INSTANCE"],
            selServiceIns: null,
        }
    },
    mounted () {
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
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
            this.$store.commit('addElementProcessDesign', {
                name: this.$store.getters.getNameProcessDesign, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10,  icon:"mdi-clipboard-outline", validation: false,
                executableref: null, determin: null,
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
            if (this.element.selectServiceIns == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                this.$store.commit('addElementProvidedSomeIP', {
                    name: this.$store.getters.getNameProvidedSomeIP, input: false, path: '',
                    top: this.element.top+100, left: this.element.left+ 300, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, someipserver: null, id: '', eventP: null, method: null, eventG: null,
                })
                EventBus.$emit('add-element', constant.ProvidedSomeIP_str)
            } else if (this.element.selectServiceIns == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                this.$store.commit('addElementRequiredSomeIP', {  //deployref, clientref,ver는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                    name: this.$store.getters.getNameRequiredSomeIP, input: false, path: '',
                    top: this.element.top+100, left: this.element.left+ 300, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    deployref: null, minover: '', id: '', clientref: null, ver: null, method: null, requiredevent: null,
                })
                EventBus.$emit('add-element', constant.RequiredSomeIP_str)
            }
            EventBus.$emit('add-element', constant.ServiceInstances_str)
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

    },

}
</script>