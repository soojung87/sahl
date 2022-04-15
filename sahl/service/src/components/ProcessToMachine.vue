<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showProcesstoMachineMappingset">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Process to Machine Mapping Set</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Process to Machine Mapping Set</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputProcesstoMachineMappingsetName' outlined dense></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <!-- <v-hover v-slot="{ hover }">
                                <v-btn text @click="showProcesstoMachine" x-small color="indigo">
                                    <v-icon>{{ isProcesstoMachineOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover> -->
                            <v-btn text x-small color="indigo">
                                <v-icon>mdi-chevron-double-right</v-icon>
                            </v-btn>
                            Process to Machine Mapping
                        </div>
                        <v-card-text v-if="isProcesstoMachineOpenClose">
                            <v-text-field v-model="element.ptmmname" label="name" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.ptmmMachine" readonly @click="setMachineRefSelect()" clearable @click:clear='clearMachineRef()' label="Machine Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/machinefromptmm'" dark icon v-bind="attrs" v-on="on" @click="setMachineList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selMachine" :key="i" link @click="setMachine(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newMachine" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.ptmmProcess" readonly @click="setProcessRefSelect()" clearable @click:clear='clearProcessRef()' label="Process Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/processfromptmm'" dark icon v-bind="attrs" v-on="on" @click="setProcessList()">
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
            isProcesstoMachineOpenClose: true,
            selMachine: this.$store.getters.getMachine,
            selProcess: this.$store.getters.getProcess,
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
        showProcesstoMachineMappingset() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showProcesstoMachine() {
            this.isProcesstoMachineOpenClose = this.isProcesstoMachineOpenClose ? false : true
        },
        inputProcesstoMachineMappingsetName() {
            this.$store.commit('editProtoMachineMapping', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            //this.$store.commit('changeNameExecutable', {uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        }, 

        clearMachineRef() {
            this.element.ptmmMachine = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinefromptmm')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/machinefromptmm')
            }
        },
        setMachineRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinefromptmm')
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinePath(this.element.ptmmMachine, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Machine_str} )
            }
        },
        setMachineList() {
            this.selMachine = this.$store.getters.getMachine
            this.setactiveUUID()
        },
        setMachine(item) {
            if( this.element.ptmmMachine != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinefromptmm')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/machinefromptmm')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/machinefromptmm', this.element.uuid+'/machinefromptmm', item.uuid)
                this.element.ptmmMachine = item.name
            }
            this.setactiveUUID()
        },
        newMachine() {
            this.$store.commit('addElementMachine', {
                name: this.$store.getters.getNameMachine, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300, zindex: 10, machinedesign:null, timeout:'', hwelement:null, executable:null, 
                admin: '', functiongroup:null, processor: null, moduleinstant: null, icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.Machine_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editProtoMachineMapping', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        clearProcessRef() {
            this.element.ptmmProcess = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processfromptmm')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processfromptmm')
            }
        },
        setProcessRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processfromptmm')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessPath(this.element.ptmmProcess)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Process_str} )
            }
        },
        setProcessList() {
            this.selProcess = this.$store.getters.getProcess
            this.setactiveUUID()
        },
        setProcess(item) {
            if( this.element.ptmmProcess != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processfromptmm')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processfromptmm')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processfromptmm', this.element.uuid+'/processfromptmm', item.uuid)
                this.element.ptmmProcess = item.name
            }
            this.setactiveUUID()
        },
        newProcess() {
            this.$store.commit('addElementProcess', { //prodesign, determin, execut, machinetype  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameProcess, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: null
            })
            EventBus.$emit('add-element', constant.Process_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProtoMachineMapping', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProtoMachineMapping', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
