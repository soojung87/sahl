<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Process to Machine Mapping Set</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputProcesstoMachineMappingsetName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/proMapping'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showProMapping" x-small color="indigo">
                                            <v-icon>{{ isProMappingOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Process To Machine Mappings
                                    <v-btn v-if="isProMappingOpenClose" @click="addProMapping()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isProMappingOpenClose">
                                    <v-tabs v-model='mappingTab' height="30px" show-arrows @change="changeProMappingTab()">
                                        <v-tab v-for="(tab, idx) in element.mapping" :key="idx" @click="clickProMappingtab()"> 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deleteProMapping(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="mappingTab">
                                        <v-tab-item v-for="(tab, idx) in element.mapping" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputProMappingName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-row style="height: 45px">
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.ptmmMachine" readonly @click="setMachineRefSelect()" clearable @click:clear='clearMachineRef(idx)' label="Machine Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-menu>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/machinefromptmm-'+tab.id" dark icon v-bind="attrs" v-on="on" @click="setMachineList()">
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
                                                            <v-text-field v-model="tab.ptmmProcess" readonly @click="setProcessRefSelect()" clearable @click:clear='clearProcessRef(idx)' label="Process Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-menu>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/processfromptmm-'+tab.id" dark icon v-bind="attrs" v-on="on" @click="setProcessList()">
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
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/runOn-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showRunOn" x-small color="indigo">
                                                                    <v-icon>{{ isRunOnOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Shall Run On Refs
                                                            <v-btn @click="isCheckRunOn" text x-small color="indigo" v-if="isRunOnOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isRunOnOpenClose && isdeleteRunOn" @click="deleteRunOn" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isRunOnOpenClose">
                                                            <v-data-table v-model="selectDelectRunOn" :headers="headerRunOn" :items="tab.runon" :items-per-page='20'
                                                                    :show-select="isdeleteRunOn" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteRunOn" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openRunOn(num)" @cancel="editRunOnItem(num)" @save="cancelRunOn()" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editRunOn.shall' label='Shall Run On Reference' :items='selRunOn' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingRunOn" clearable @click="setRunOnSelect()" 
                                                                                            @click:clear='clearRunOn' @blur="isEditingRunOn=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addRunOn()" @save="cancelRunOn"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editRunOn.shall' label='Shall Run On Reference' :items='selRunOn' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingRunOn" clearable @click="setRunOnSelect()" 
                                                                                            @click:clear='clearRunOn' @blur="isEditingRunOn=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </th>
                                                                        </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-data-table>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs-items>
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
                        if(this.iselementOpenClose && this.location == 1) {
                            if (this.isProMappingOpenClose) {
                                EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.mappingTab, this.element.mapping[this.mappingTab].id)
                            } else {
                                EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                            }
                        }
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
            isProMappingOpenClose: true,
            isRunOnOpenClose: true,
            selMachine: this.$store.getters.getMachine,
            selProcess: this.$store.getters.getProcess,

            mappingTab: null,
            isdeleteRunOn: false,
            selectDelectRunOn: [],
            headerRunOn: [
                { text: 'Shall Run On Ref', sortable: false, value: 'shall' },
            ],
            editRunOn: { shall: null, id: ''},
            isEditingRunOn: true,
            selRunOn: this.$store.getters.getMachinProcessor,
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
        showProcesstoMachineMappingset() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose && this.location == 1) {
                    if (this.isProMappingOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.mappingTab, this.element.mapping[this.mappingTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                }
            })
        },
        showProMapping() {
            this.isProMappingOpenClose = this.isProMappingOpenClose ? false : true
            if(this.element.mapping.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isProMappingOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.mappingTab, this.element.mapping[this.mappingTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                })
            }
        },
        showRunOn() {
            this.isRunOnOpenClose = this.isRunOnOpenClose ? false : true
        },
        inputProcesstoMachineMappingsetName() {
            this.$store.commit('editProtoMachineMapping', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            //this.$store.commit('changeNameExecutable', {uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        }, 

        clearMachineRef(idx) {
            this.element.mapping[idx].ptmmMachine = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinefromptmm-'+this.element.mapping[idx].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/machinefromptmm-' + this.element.mapping[idx].id)
            }
        },
        setMachineRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinefromptmm-'+this.element.mapping[this.mappingTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinePath(this.element.mapping[this.mappingTab].ptmmMachine, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Machine_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setMachineList() {
            this.selMachine = this.$store.getters.getMachine
            this.setactiveUUID()
        },
        setMachine(item) {
            console.log('/// '+ this.element.mapping[this.mappingTab].ptmmMachine)
            if( this.element.mapping[this.mappingTab].ptmmMachine != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinefromptmm-'+ this.element.mapping[this.mappingTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/machinefromptmm-'+ this.element.mapping[this.mappingTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/machinefromptmm-'+this.element.mapping[this.mappingTab].id, this.element.uuid+'/machinefromptmm-'+this.element.mapping[this.mappingTab].id, item.uuid)
                }
                this.element.mapping[this.mappingTab].ptmmMachine = item.name
            }
            this.setactiveUUID()
        },
        newMachine() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementMachine', {
                name: this.$store.getters.getNameMachine, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, machinedesign:null, timeout:'', hwelement:[], executable:null, 
                admin: '', functiongroup:[], processor: [], moduleinstant: [], icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.Machine_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editProtoMachineMapping', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        clearProcessRef(idx) {
            this.element.mapping[idx].ptmmProcess = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processfromptmm-'+this.element.mapping[idx].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processfromptmm-'+this.element.mapping[idx].id)
            }
        },
        setProcessRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processfromptmm-'+this.element.mapping[this.mappingTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessPath(this.element.mapping[this.mappingTab].ptmmProcess)
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
            if( this.element.mapping[this.mappingTab].ptmmProcess != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processfromptmm-'+this.element.mapping[this.mappingTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processfromptmm-'+this.element.mapping[this.mappingTab].id)
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processfromptmm-'+this.element.mapping[this.mappingTab].id, this.element.uuid+'/processfromptmm-'+this.element.mapping[this.mappingTab].id, item.uuid)
                this.element.mapping[this.mappingTab].ptmmProcess = item.name
            }
            this.setactiveUUID()
        },
        newProcess() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementProcess', { //prodesign, determin, execut, machinetype  는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameProcess, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []
            })
            EventBus.$emit('add-element', constant.Process_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProtoMachineMapping', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addProMapping() {
            const editItem = {name: '', ptmmMachine: null, ptmmProcess: null, runon: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'ProcessToMachineMap_' + n++;
                res = this.element.mapping.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.mapping.push(addObj)
            this.mappingTab = this.element.mapping.length-1
            if(this.location == 1) {
                EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
            }
        },
        clickProMappingtab() {
            this.isdeleteRunOn = false
            this.selectDelectRunOn = []
        },
        changeProMappingTab() {
            if(this.element.mapping.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.mappingTab, this.element.mapping[this.mappingTab].id)}, 300);
            }
        },
        deleteProMapping(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'proMapping', deleteTab: true, tabName: this.element.mapping[idx].name, path: this.element.path, name: this.element.name})

            if (this.element.mapping[this.mappingTab].ptmmMachine != null) {
                this.clearMachineRef(idx)
            }
            if (this.element.mapping[this.mappingTab].ptmmProcess != null) {
                this.clearProcessRef(idx)
            }
            for(let i=0; i<this.element.mapping[idx].runon.length; i++){
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/runOn-'+this.element.mapping[idx].runon[i].id+'-'+this.element.mapping[idx].id)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/runOn-'+this.element.mapping[idx].runon[i].id+'-'+this.element.mapping[idx].id)
                }
            }

            this.element.mapping.splice(idx, 1)
            this.changeProMappingTab()
        },
        isCheckRunOn() {
            if (this.isdeleteRunOn == true) {
                this.isdeleteRunOn = false
                this.selectDelectRunOn = []
            } else {
                this.isdeleteRunOn = true
            }
        },
        deleteRunOn() {
            if (this.isdeleteRunOn == true) {
                this.selectDelectRunOn.forEach(element => {
                    for(let i=0; i<this.element.mapping[this.mappingTab].runon.length; i++){
                        if (element.id == this.element.mapping[this.mappingTab].runon[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[i].id+'-'+this.element.mapping[this.mappingTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[i].id+'-'+this.element.mapping[this.mappingTab].id)
                            }
                        }
                    }
                })
                
                this.element.mapping[this.mappingTab].runon = this.element.mapping[this.mappingTab].runon.filter(item => {
                        return this.selectDelectRunOn.indexOf(item) < 0 })

                this.isdeleteRunOn = false
                this.selectDelectRunOn = []
            } 
        },
        openRunOn(idx) { 
            this.selRunOn = this.$store.getters.getMachinProcessor

            if ( this.element.mapping[this.mappingTab].runon[idx].shall != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[idx].id+'-'+this.element.mapping[this.mappingTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachineProcessorPath(this.element.mapping[this.mappingTab].runon[idx].shall)
                }
                this.editRunOn.shall = { name: this.element.mapping[this.mappingTab].runon[idx].shall, uuid: endLine}
            }
        },
        editRunOnItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[idx].id+'-'+this.element.mapping[this.mappingTab].id)
            if (endLine != undefined && this.editRunOn.shall == null) {
                this.deleteLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[idx].id+'-'+this.element.mapping[this.mappingTab].id)
                this.element.mapping[this.mappingTab].runon[idx].shall = null
            } else if (endLine != undefined && endLine != this.editRunOn.shall.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[idx].id+'-'+this.element.mapping[this.mappingTab].id)
                this.newLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[idx].id+'-'+this.element.mapping[this.mappingTab].id, this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].id, this.editRunOn.shall.uuid)
                this.element.mapping[this.mappingTab].runon[idx].shall = this.editRunOn.shall.name
            } else if (endLine == undefined && this.editRunOn.shall != null) {
                this.newLine(this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].runon[idx].id+'-'+this.element.mapping[this.mappingTab].id, this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].id, this.editRunOn.shall.uuid)
                this.element.mapping[this.mappingTab].runon[idx].shall = this.editRunOn.shall.name
            } else if (this.editRunOn.shall != null && endLine == this.editRunOn.method.uuid && this.element.mapping[this.mappingTab].runon[idx].shall != this.editRunOn.shall.name) {
                this.element.mapping[this.mappingTab].runon[idx].shall = this.editRunOn.shall.name
            }

            this.cancelRunOn()
        },
        cancelRunOn() {
            this.editRunOn = {shall: null}
            this.setactiveUUID()
        },
        addRunOn() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.mapping[this.mappingTab].runon.some(item => item.id === n)
            }
            this.editRunOn.id = n

            if( this.editRunOn.shall != null) {
                this.newLine(this.element.uuid+'/runOn-'+n+'-'+this.element.mapping[this.mappingTab].id, this.element.uuid+'/runOn-'+this.element.mapping[this.mappingTab].id, this.editRunOn.shall.uuid)
                this.editRunOn.shall = this.editRunOn.shall.name
            }

            const addObj = Object.assign({}, this.editRunOn)
            this.element.mapping[this.mappingTab].runon.push(addObj);
            this.cancelRunOn()
        },
        setRunOnSelect() {
            if (this.isEditingRunOn == true) {
                if (this.editRunOn.shall != null && this.editRunOn.shall.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRunOn.shall.uuid, element: constant.Machine_str} )
                    document.getElementById(this.editRunOn.shall.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editRunOn.shall.uuid)
                }
                this.setEventList()
                this.isEditingRunOn = false
            } else {
                this.isEditingRunOn = true
            }
        },
        setEventList() {
            this.selRunOn = this.$store.getters.getMachinProcessor
            this.setactiveUUID()
        },
        clearRunOn() {
            this.isEditingRunOn = true
            this.editRunOn.shall = null
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
