<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showSomeIPtoMachine">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>SomeIP Service Instance To Machine Mapping</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SomeIP Service Instance To Machine Mapping</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSomeIPtoMachineName' outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.ccref" readonly @click="setCCRefSelect()" clearable @click:clear='clearCCRef()' label="Communication Connector Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/tomachinCC'" icon v-bind="attrs" v-on="on" @click="setCCRefList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list >
                                            <v-list-item v-for="(item, i) in selCommuniConnect" :key="i" link @click="setCCRef(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item v-if="selCommuniConnect.length == 0">
                                                <v-list-item-title>No Data Available</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/toMachinServiceIns'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showSI" x-small color="indigo">
                                            <v-icon>{{ isSIOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Service Instance Reference
                                    <v-btn @click="isCheckSI" text x-small color="indigo" v-if="isSIOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isSIOpenClose && isdeleteSIItem" @click="deletSI" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isSIOpenClose">
                                    <v-data-table v-model="selectDelectSI" :headers="headerSI" :items="element.serviceI" :items-per-page='20'
                                            :show-select="isdeleteSIItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSIItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openSI(idx)" @cancel="editSI(idx)" @save="cancelSI" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSIItem.ref' label='Service Instance' :items='selSI' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object @click:clear='clearSI' clearable>
                                                                </v-autocomplete>
                                                                <v-autocomplete v-if="editSIItem.ref !=null && editSIItem.ref.uuid == 1" v-model='editSIItem.service' label='Reference' :items='selProvidedSomeIP' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingPro" clearable @click="setProvideSelect()" 
                                                                            @click:clear='clearProvideRef' @blur="isEditingPro=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newProvide">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-autocomplete v-if="editSIItem.ref !=null && editSIItem.ref.uuid == 2" v-model='editSIItem.service' label='Reference' :items='selRequiredSomeIP' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingReq" clearable @click="setRequiredSelect()" 
                                                                            @click:clear='clearRequiredRef' @blur="isEditingReq=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newRequired">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addSI()" @save="cancelSI"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSIItem.ref' label='Service Instance' :items='selSI' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object @click:clear='clearSI' clearable>
                                                                </v-autocomplete>
                                                                <v-autocomplete v-if="editSIItem.ref !=null && editSIItem.ref.uuid == 1" v-model='editSIItem.service' label='Reference' :items='selProvidedSomeIP' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingPro" clearable @click="setProvideSelect()" 
                                                                            @click:clear='clearProvideRef' @blur="isEditingPro=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newProvide">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-autocomplete v-if="editSIItem.ref !=null && editSIItem.ref.uuid == 2" v-model='editSIItem.service' label='Reference' :items='selRequiredSomeIP' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingReq" clearable @click="setRequiredSelect()" 
                                                                            @click:clear='clearRequiredRef' @blur="isEditingReq=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newRequired">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
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
                            <v-text-field v-model="element.udp" label="UDP Port" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.tcp" label="TCP Port" placeholder="int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
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
import dialogPathSetting from './dialogPathSetting.vue'


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
            selCommuniConnect: this.$store.getters.getCommunicationConnect, //MachineDesign에 있다.
            selRequiredSomeIP: this.$store.getters.getRequiredSomeIP,
            selProvidedSomeIP: this.$store.getters.getProvidedSomeIP,
            isSIOpenClose: true,
            isdeleteSIItem: false,
            selectDelectSI: [],
            headerSI: [
                { text: 'Service Instance Ref', align: 'start', sortable: false, value: 'service' },
            ],
            editSIItem: { ref: '', service: null, id: ''},
            selSI: [{name:"PROVIDED-SOMEIP-SERVICE-INSTANCE", uuid:1},{name:"REQUIRED-SOMEIP-SERVICE-INSTANCE", uuid:2},],
            isEditingPro: true,
            isEditingReq: true,
            deleteChangeLine: [],
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
        showSomeIPtoMachine () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showSI() {
            this.isSIOpenClose = this.isSIOpenClose ? false : true
        },
        inputSomeIPtoMachineName () {
            this.$store.commit('editSomeIPtoMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            //this.$store.commit('changeNameDataConstr', {uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearCCRef() {
            this.element.ccref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/tomachinCC')
            }
        },
        setCCRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinDesignPath(this.element.ccref, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.MachineDesigne_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setCCRef(item){
            console.log(item)
            if( this.element.ccref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/tomachinCC')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/tomachinCC', this.element.uuid+'/tomachinCC', item.uuid)
                }
                this.element.ccref = item.name
            }
            this.setactiveUUID()
        },
        setCCRefList() {
            this.selCommuniConnect = this.$store.getters.getCommunicationConnect
            this.setactiveUUID()
        },

        isCheckSI() {
            if (this.isdeleteSIItem == true) {
                this.isdeleteSIItem = false
                this.selectDelectSI = []
            } else {
                this.isdeleteSIItem = true
            }
        },
        deletSI() {
            if (this.isdeleteSIItem == true) {
                for(let i=0; i<this.element.serviceI.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({id:this.element.serviceI[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+i)
                    }
                }

                this.element.serviceI = this.element.serviceI.filter(item => {
                        return this.selectDelectSI.indexOf(item) < 0 })

                for(let n=0; n<this.element.serviceI.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.serviceI[n].id == this.deleteChangeLine[idx].id) {
                            this.newLine(this.element.uuid+'/toMachinServiceIns-'+n, this.element.uuid+'/toMachinServiceIns', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteSIItem = false
                this.selectDelectSI = []
                this.deleteChangeLine = []
            } 
        },
        editSI(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+idx)
            this.element.serviceI[idx].ref = this.editSIItem.ref.name
            if (endLine != undefined && this.editSIItem.service == null) {
                this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+idx)
                this.element.serviceI[idx].service = null
            } else if (endLine != undefined && endLine != this.editSIItem.service.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+idx)
                this.newLine(this.element.uuid+'/toMachinServiceIns-'+idx, this.element.uuid+'/toMachinServiceIns', this.editSIItem.service.uuid)
                this.element.serviceI[idx].service = this.editSIItem.service.name
            } else if (endLine == undefined && this.editSIItem.service != null) {
                this.newLine(this.element.uuid+'/toMachinServiceIns-'+idx, this.element.uuid+'/toMachinServiceIns', this.editSIItem.service.uuid)
                this.element.serviceI[idx].service = this.editSIItem.service.name
            }
            this.cancelSI()
        },
        cancelSI() {
            this.editSIItem.ref = ''
            this.editSIItem.service = null
            this.editSIItem.id = ''
            this.setactiveUUID()
        },
        openSI(idx) {
            var id = null, endLine
            if (this.element.serviceI[idx].ref == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                id = 1
                this.editSIItem.ref = this.element.serviceI[idx].ref
                this.selProvidedSomeIP = this.$store.getters.getProvidedSomeIP
                if ( this.element.serviceI[idx].service != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+idx)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getProvidedSomeIPPath(this.element.serviceI[idx].service)
                    }
                    this.editSIItem.service = { name: this.element.serviceI[idx].service, uuid: endLine }
                }
            } else if (this.element.serviceI[idx].ref == "REQUIRED-SOMEIP-SERVICE-INSTANCE"){
                id = 2
                this.selRequiredSomeIP = this.$store.getters.getRequiredSomeIP
                if ( this.element.serviceI[idx].service != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+idx)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getRequiredSomeIPPath(this.element.serviceI[idx].service)
                    }
                    this.editSIItem.service = { name: this.element.serviceI[idx].service, uuid: endLine }
                }
            }
            this.editSIItem.ref = { name: this.element.serviceI[idx].ref, uuid: id}
        },
        addSI() {
            let res = true, n = 0
            var datacount = this.element.serviceI.length
            while (res) {
                n++
                res = this.element.serviceI.some(item => item.id === n)
            }
            this.editSIItem.id = n
            this.editSIItem.ref = this.editSIItem.ref.name
            if( this.editSIItem.service != null) {
                this.newLine(this.element.uuid+'/toMachinServiceIns-'+datacount, this.element.uuid+'/toMachinServiceIns', this.editSIItem.service.uuid)
                this.editSIItem.service = this.editSIItem.service.name
            }

            const addObj = Object.assign({}, this.editSIItem)
            this.element.serviceI.push(addObj)
            this.cancelSI()
        },
        clearSI() {
            this.editSIItem.ref = ''
            this.editSIItem.service = null
        },
        setProvideSelect() {            
            if (this.isEditingPro == true) {
                if (this.editSIItem.service != null && this.editSIItem.service.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSIItem.service.uuid, element: constant.ProvidedSomeIP_str} )
                    document.getElementById(this.editSIItem.service.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSIItem.service.uuid)
                }
                this.setProvideList()
                this.isEditingPro = false
            } else {
                this.isEditingPro = true
            }
        },
        setProvideList() {
            this.selProvidedSomeIP = this.$store.getters.getProvidedSomeIP
            this.setactiveUUID()
        },
        clearProvideRef() {
            this.isEditingPro = true
            this.editSIItem.service = null
        },
        newProvide() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            this.$store.commit('addElementProvidedSomeIP', {
                name: this.$store.getters.getNameProvidedSomeIP, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                deployref: null, someipserver: null, id: '', eventP: [], method: [], eventG: [],
            })
            EventBus.$emit('add-element', constant.ProvidedSomeIP_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSomeIPtoMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setRequiredSelect() {            
            if (this.isEditingReq == true) {
                if (this.editSIItem.service != null && this.editSIItem.service.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSIItem.service.uuid, element: constant.RequiredSomeIP_str} )
                    document.getElementById(this.editSIItem.service.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSIItem.service.uuid)
                }
                this.setRequiredList()
                this.isEditingReq = false
            } else {
                this.isEditingReq = true
            }
        },
        setRequiredList() {
            this.selRequiredSomeIP = this.$store.getters.getRequiredSomeIP
            this.setactiveUUID()
        },
        clearRequiredRef() {
            this.isEditingReq = true
            this.editSIItem.service = null
        },
        newRequired() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementRequiredSomeIP', { 
                name: this.$store.getters.getNameRequiredSomeIP, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                deployref: null, minover: '', id: '', clientref: null, ver: null, method: [], requiredevent: [],
            })
            EventBus.$emit('add-element', constant.RequiredSomeIP_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSomeIPtoMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSomeIPtoMachine', {compo:"z", uuid:this.element.uuid, zindex:10} )
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