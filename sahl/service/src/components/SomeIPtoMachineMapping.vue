<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SomeIP Service Instance To Machine Mapping</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSomeIPtoMachineName'  @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.ccref" readonly @click="setCCRefSelect()" :style="refCommunication ? 'height: 43px;border:solid red 2px' : ''"
                                                 clearable @click:clear='clearCCRef()' label="Communication Connector Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-data-table v-model="selectDelectSI" :headers="headerSI" :items="element.serviceI" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteSIItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSIItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refService === item.id ? 'red' : null " @click="rowClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openSI(idx)" @cancel="cancelSI" @save="editSI(idx)" large >
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelSI" @save="addSI()"> 
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
                            <v-text-field v-model="element.udp" label="UDP Port"  @click="clickOtherFields()" placeholder="Int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.tcp" label="TCP Port"  @click="clickOtherFields()" placeholder="Int" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
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
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;COMMUNICATION-CONNECTOR-REF&#62;</label>
                            <v-text-field v-model="editARXML.ccref" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;COMMUNICATION-CONNECTOR-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;SERVICE-INSTANCE-REFS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextServiceI()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 150px;">
                            <v-row v-for="(item, i) in editARXML.serviceI" :key="i" style="height: 30px;">
                                <div>
                                    <br>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextServiceI(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SERVICE-INSTANCE-REF&#62;</label>
                                        <v-text-field v-model="item.service" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SERVICE-INSTANCE-REF&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;&#47;SERVICE-INSTANCE-REFS&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;TCP-PORT&#62;</label>
                            <v-text-field v-model="editARXML.udp" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;TCP-PORT&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;UDP-PORT&#62;</label>
                            <v-text-field v-model="editARXML.tcp" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;UDP-PORT&#62;</label>
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
import dialogPathSetting from './dialogPathSetting.vue'


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
            editARXML: {name:'', ccref: null, serviceI: [], tcp:'', udp: ''},
            editTextItem: {ref: '', service: null, id: ''},
            selCommuniConnect: this.$store.getters.getCommunicationConnect, //MachineDesign에 있다.
            selRequiredSomeIP: this.$store.getters.getRequiredSomeIP,
            selProvidedSomeIP: this.$store.getters.getProvidedSomeIP,
            isSIOpenClose: true,
            isdeleteSIItem: false,
            selectDelectSI: [],
            headerSI: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Service Instance Ref', align: 'start', sortable: false, value: 'service' },
            ],
            editSIItem: { ref: '', service: null, id: ''},
            selSI: [{name:"PROVIDED-SOMEIP-SERVICE-INSTANCE", uuid:1},{name:"REQUIRED-SOMEIP-SERVICE-INSTANCE", uuid:2},],
            isEditingPro: true,
            isEditingReq: true,
            refCommunication: false,
            refService: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID,isDeleteItem) => {
            if (isDeleteItem) {
                if (this.refCommunication) {
                    this.clickOtherFields()
                }
            } else {
                this.refCommunication = false
                this.refService = null

                if (refNum == 1) {
                    this.refCommunication = true
                } else if (refNum == 2) {
                    this.refService = idxID
                }
            }
        })
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showSI() {
            this.clickOtherFields()
            this.isSIOpenClose = this.isSIOpenClose ? false : true
        },
        inputSomeIPtoMachineName () {
            this.$store.commit('editSomeIPtoMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            //this.$store.commit('changeNameDataConstr', {uuid:this.element.uuid, name:this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refCommunication || this.refService != null) {
                this.deleteOpenElement()
                this.refCommunication = false
                this.refService = null
            }
        },
        rowClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refService != this.element.serviceI[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id)
                if (endLine == undefined) {
                    if (this.element.serviceI[idx].ref == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                        endLine = this.$store.getters.getProvidedSomeIPPath(this.element.serviceI[idx].service)
                    } else if (this.element.serviceI[idx].ref == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                        endLine = this.$store.getters.getRequiredSomeIPPath(this.element.serviceI[idx].service)
                    }
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    if (this.element.serviceI[idx].ref == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                        this.$store.commit('editProvidedSomeIP', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ProvidedSomeIP_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.serviceI[idx].ref == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                        this.$store.commit('editRequiredSomeIP', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.RequiredSomeIP_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/toMachinServiceIns', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/toMachinServiceIns', end:endLine, iscircle:false, refNum:2, idxID: this.element.serviceI[idx].id})
                }
                this.refService = this.element.serviceI[idx].id
            }
        },

        clearCCRef() {
            this.element.ccref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/tomachinCC')
            }
            this.clickOtherFields()
        },
        setCCRefSelect() {
            this.clickOtherFields()
            if (this.element.ccref != null) {this.refCommunication = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachineDesignPath(this.element.ccref, 1)
                }
                if (endLine != null) {
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/tomachinCC', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/tomachinCC', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.MachineDesigne_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setCCRef(item){
            console.log(item)
            this.clickOtherFields()
            if( this.element.ccref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/tomachinCC')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refCommunication = true
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/tomachinCC', this.element.uuid+'/tomachinCC', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/tomachinCC', end:item.uuid, iscircle:false, refNum:1})
                }
                this.element.ccref = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refCommunication = true
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/tomachinCC', this.element.uuid+'/tomachinCC', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/tomachinCC', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        setCCRefList() {
            this.selCommuniConnect = this.$store.getters.getCommunicationConnect
            this.setactiveUUID()
        },

        isCheckSI() {
            this.clickOtherFields()
            if (this.isdeleteSIItem == true) {
                this.isdeleteSIItem = false
                this.selectDelectSI = []
            } else {
                this.isdeleteSIItem = true
            }
        },
        deletSI() {
            this.clickOtherFields()
            if (this.isdeleteSIItem == true) {
                this.selectDelectSI.forEach(item => {
                    for(let i=0; i<this.element.serviceI.length; i++){
                        if (item.id == this.element.serviceI[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[i].id)
                            }
                        }
                    }
                })

                this.element.serviceI = this.element.serviceI.filter(item => {
                        return this.selectDelectSI.indexOf(item) < 0 })

                this.isdeleteSIItem = false
                this.selectDelectSI = []
            } 
        },
        editSI(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id)
            this.element.serviceI[idx].ref = this.editSIItem.ref.name
            if (endLine != undefined && this.editSIItem.service == null) {
                this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id)
                this.element.serviceI[idx].service = null
            } else if (endLine != undefined && endLine != this.editSIItem.service.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id)
                this.newLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id, this.element.uuid+'/toMachinServiceIns', this.editSIItem.service.uuid, false)
                this.element.serviceI[idx].service = this.editSIItem.service.name
            } else if (endLine == undefined && this.editSIItem.service != null && this.editSIItem.service.uuid != null) {
                this.newLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id, this.element.uuid+'/toMachinServiceIns', this.editSIItem.service.uuid, false)
                this.element.serviceI[idx].service = this.editSIItem.service.name
            }

            if (this.refService == this.element.serviceI[idx].id) {
                this.deleteOpenElement()
                if (this.editSIItem.service != null && this.editSIItem.service.uuid != null) {
                    var endLineChange = this.editSIItem.service.uuid
                    if (this.element.serviceI[idx].ref == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                        this.$store.commit('editProvidedSomeIP', {compo:"drag", uuid: this.editSIItem.service.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ProvidedSomeIP_str, uuid: this.editSIItem.service.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.serviceI[idx].ref == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                        this.$store.commit('editRequiredSomeIP', {compo:"drag", uuid: this.editSIItem.service.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.RequiredSomeIP_str, uuid: this.editSIItem.service.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/toMachinServiceIns', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/toMachinServiceIns', end: endLineChange, iscircle:false, refNum:2, idxID: this.refService})
                }
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
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getProvidedSomeIPPath(this.element.serviceI[idx].service)
                    }
                    this.editSIItem.service = { name: this.element.serviceI[idx].service, uuid: endLine }
                }
            } else if (this.element.serviceI[idx].ref == "REQUIRED-SOMEIP-SERVICE-INSTANCE"){
                id = 2
                this.selRequiredSomeIP = this.$store.getters.getRequiredSomeIP
                if ( this.element.serviceI[idx].service != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+this.element.serviceI[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getRequiredSomeIPPath(this.element.serviceI[idx].service)
                    }
                    this.editSIItem.service = { name: this.element.serviceI[idx].service, uuid: endLine }
                }
            }
            this.editSIItem.ref = { name: this.element.serviceI[idx].ref, uuid: id}
        },
        addSI() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.serviceI.some(item => item.id === n)
            }
            this.editSIItem.id = n
            this.editSIItem.ref = this.editSIItem.ref.name
            var endLine = null
            if( this.editSIItem.service != null) {
                endLine = this.editSIItem.service.uuid
                if (this.editSIItem.ref == "PROVIDED-SOMEIP-SERVICE-INSTANCE") {
                    this.$store.commit('editProvidedSomeIP', {compo:"drag", uuid: this.editSIItem.service.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ProvidedSomeIP_str, uuid: this.editSIItem.service.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                } else if (this.editSIItem.ref == "REQUIRED-SOMEIP-SERVICE-INSTANCE") {
                    this.$store.commit('editRequiredSomeIP', {compo:"drag", uuid: this.editSIItem.service.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.RequiredSomeIP_str, uuid: this.editSIItem.service.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                }
                this.editSIItem.service = this.editSIItem.service.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/toMachinServiceIns-'+n, this.element.uuid+'/toMachinServiceIns', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/toMachinServiceIns', end:endLine, iscircle:false, refNum:2, idxID: this.editSIItem.id})
            }

            const addObj = Object.assign({}, this.editSIItem)
            this.element.serviceI.push(addObj)
            this.refService = n
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
                    // document.getElementById(this.editSIItem.service.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editSIItem.service.uuid)
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
            this.$store.commit('addElementProvidedSomeIP', {
                name: this.$store.getters.getNameProvidedSomeIP, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                deployref: null, someipserver: null, id: '', eventP: [], method: [], eventG: [],
            })
            EventBus.$emit('add-element', constant.ProvidedSomeIP_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSomeIPtoMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setRequiredSelect() {            
            if (this.isEditingReq == true) {
                if (this.editSIItem.service != null && this.editSIItem.service.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSIItem.service.uuid, element: constant.RequiredSomeIP_str} )
                    // document.getElementById(this.editSIItem.service.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editSIItem.service.uuid)
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
            this.$store.commit('addElementRequiredSomeIP', { 
                name: this.$store.getters.getNameRequiredSomeIP, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                deployref: null, minover: '', id: '', clientref: null, ver: null, method: [], requiredevent: [],
            })
            EventBus.$emit('add-element', constant.RequiredSomeIP_str)
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
            this.editARXML.ccref = this.element.ccref
            this.editARXML.tcp = this.element.tcp
            this.editARXML.udp = this.element.udp
            this.editARXML.serviceI = JSON.parse(JSON.stringify(this.element.serviceI))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editSomeIPtoMachine', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name

            var endLine = null, changEndLine = null
            if (this.editARXML.ccref != this.element.ccref) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/tomachinCC')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/tomachinCC')
                }
                changEndLine = this.$store.getters.getMachineDesignPath(this.editARXML.ccref,1)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/tomachinCC', this.element.uuid+'/tomachinCC', changEndLine, false)
                }
            }
            this.element.ccref = this.editARXML.ccref
            this.element.tcp = this.editARXML.tcp
            this.element.udp = this.editARXML.udp

            if (this.editARXML.serviceI.length > 0) {
                this.editARXML.serviceI.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.serviceI.length; n++){
                        if (this.element.serviceI[n].id == item.id &&
                            this.element.serviceI[n].service == item.service ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+item.id)
                        }
                        var changEndLine = this.$store.getters.getRequiredSomeIPPath(item.service)
                        if (changEndLine != null) {
                            item.ref = "REQUIRED-SOMEIP-SERVICE-INSTANCE"
                            this.newLine(this.element.uuid+'/toMachinServiceIns-'+item.id, this.element.uuid+'/toMachinServiceIns', changEndLine, false)
                        } else {
                            changEndLine = this.$store.getters.getProvidedSomeIPPath(item.service)
                            if (changEndLine != null) {
                                item.ref = "PROVIDED-SOMEIP-SERVICE-INSTANCE"
                                this.newLine(this.element.uuid+'/toMachinServiceIns-'+item.id, this.element.uuid+'/toMachinServiceIns', changEndLine, false)
                            }
                        }
                    }
                })
                this.element.serviceI.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.serviceI.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.serviceI.length > 0) {
                    this.element.serviceI.forEach(item => {
                        if (item.service != null) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/toMachinServiceIns-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/toMachinServiceIns-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.serviceI = JSON.parse(JSON.stringify(this.editARXML.serviceI))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', ccref: null, serviceI: [], tcp:'', udp: ''}
            this.editTextItem = {ref: '', service: null, id: ''}
            this.dialogText = false
        },
        newTextServiceI() {
            this.editTextItem = {ref: '', service: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.serviceI.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.serviceI.push(addObj);
        },
        deletTextServiceI(idx) {
            this.editARXML.serviceI.splice(idx,1)
        },

    },

}
</script>