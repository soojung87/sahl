<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showPPPtoFileArray">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Persistency Port Prototype To File Array Mapping</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Persistency Port Prototype To File Array Mapping</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPPPtoFileArrayName' outlined dense  @click="setactiveUUID"></v-text-field>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.fileArray" readonly @click="setFileArraySelect()" clearable @click:clear='clearFileArrayRef()' label="File Array Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/PPPtoFileArray'" dark icon v-bind="attrs" v-on="on" @click="setFileArrayList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selFileArray" :key="i" link @click="setFileArray(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newFileArray()" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.port" readonly @click="setPortSelect()" clearable @click:clear='clearPort()' label="Target Port Prototype Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/PPPtoFilePRPort'" icon v-bind="attrs" v-on="on" @click="setPortList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list >
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
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.process" readonly @click="setProcessRefSelect()" clearable @click:clear='clearProcessRef()' label="Process Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/PPPtoFileProcess'" dark icon v-bind="attrs" v-on="on" @click="setProcessList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selProcess" :key="i" link @click="setProcess(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newProcess()" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text v-else-if="zoomvalue > $setZoominElement || !minimaptoolbar">
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
            selFileArray: this.$store.getters.getPERFileArray,
            selPort: this.$store.getters.getPRPortPrototype,
            selProcess: this.$store.getters.getProcess,
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
        showPPPtoFileArray() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        inputPPPtoFileArrayName() {
            this.$store.commit('editPERPPtoFileArray', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clearFileArrayRef() {
            this.element.fileArray = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFileArray')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PPPtoFileArray')
            }
        },
        setFileArraySelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFileArray')
            if (endLine == undefined) {
                endLine = this.$store.getters.getPERFileArrayPath(this.element.fileArray)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.FileArray_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setFileArrayList() {
            this.selFileArray = this.$store.getters.getPERFileArray
            this.setactiveUUID()
        },
        setFileArray(item) {
            if(this.element.fileArray != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFileArray')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PPPtoFileArray')
                }
                //새로 추가해준다
                console.log(item.uuid)
                this.newLine(this.element.uuid+'/PPPtoFileArray', this.element.uuid+'/PPPtoFileArray', item.uuid)
                this.element.fileArray = item.name
            }
            this.setactiveUUID()
        },
        newFileArray() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementPERFileArray', { 
                name: this.$store.getters.getNamePERFileArray, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                
            })
            EventBus.$emit('add-element', constant.FileArray_str)
            this.$store.commit('editPERPPtoFileArray', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setPortSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFilePRPort')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSWComponentPath(this.element.port, 3)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SWComponents_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        clearPort() {
            this.element.port = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFilePRPort')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PPPtoFilePRPort')
            }
        },
        setPortList() {
            this.selPort = this.$store.getters.getPRPortPrototype
            this.setactiveUUID()
        },
        setPort(item) {
            if(this.element.port != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFilePRPort')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PPPtoFilePRPort')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/PPPtoFilePRPort', this.element.uuid+'/PPPtoFilePRPort', item.uuid)
                }
                this.element.port = item.name
            }
            this.setactiveUUID()
        },

        clearProcessRef() {
            this.element.process = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFileProcess')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PPPtoFileProcess')
            }
        },
        setProcessRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFileProcess')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessPath(this.element.process)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Process_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setProcessList() {
            this.selProcess = this.$store.getters.getProcess
            this.setactiveUUID()
        },
        setProcess(item) {
            if(this.element.process != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPPtoFileProcess')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PPPtoFileProcess')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/PPPtoFileProcess', this.element.uuid+'/PPPtoFileProcess', item.uuid)
                this.element.process = item.name
            }
            this.setactiveUUID()
        },
        newProcess() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementProcess', { 
                name: this.$store.getters.getNameProcess, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []
            })
            EventBus.$emit('add-element', constant.Process_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editPERPPtoFileArray', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPERPPtoFileArray', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
