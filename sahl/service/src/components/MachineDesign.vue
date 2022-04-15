<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined  :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showMachineDesign">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Machine Design</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Machine Design</v-toolbar-title>
                </v-toolbar>
                <v-card-text  v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputMachineDesignName' outlined dense></v-text-field>
                    <v-select :items="accessControl" label="Access Control"  v-model="element.access" @click="setactiveUUID" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                    <v-text-field v-model="element.resettimer" label="PN reset Timer" placeholder="TIME" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/cctable'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showCCItem" x-small color="indigo">
                                    <v-icon>{{ isCCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Communication-Connectors
                            <v-btn @click="isCheckCC" text x-small color="indigo" v-if="isCCOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn  v-if="isCCOpenClose && isdeleteCCItem" @click="deleteCCItem" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isCCOpenClose">  
                            <v-data-table v-model="selectdeleteCCItem" :headers="headersCC" :items="CCItem" 
                                    :show-select="isdeleteCCItem" item-key="name" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteCCItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <!-- <draggable :list="items" tag="tbody"> -->
                                        <tr v-for="(item,idx) in items" :key="idx" >
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-icon v-if="header.value == 'sort'" x-small class="page__grab-icon">mdi-arrow-all</v-icon>
                                                <v-edit-dialog v-if="header.value != 'sort'" persistent cancel-text='Ok' save-text="Cancel" @open="openCC(idx)" @cancel="editCC(idx)" @save="cancelCC" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editedItemCC.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>                                                       
                                                        <v-text-field v-model="editedItemCC.mtu" label="MTU" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editedItemCC.timeout" label="MTU Timeout" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editedItemCC.mask" label="Filter Data Mask" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-checkbox v-model="editedItemCC.mtuenable" label="MTU Enable" @click="setactiveUUID()"></v-checkbox>
                                                        <v-autocomplete v-model='editedItemCC.endpoint' label='Unicast Network End Point' :items='selNetworkEndpoint' item-text='name' item-value="name" class="lable-placeholer-color"
                                                            return-object :readonly="!isEditingMDEndpoint" clearable @click:clear='clearMDEndpoint' @click="setMDEndpointSelect()" @blur="isEditingMDEndpoint=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @open="addOpenCC()" @cancel="addCC()" @save="cancelCC"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editedItemCC.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editedItemCC.mtu" label="MTU" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editedItemCC.timeout" label="MTU Timeout" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editedItemCC.mask" label="Filter Data Mask" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-checkbox v-model="editedItemCC.mtuenable" label="MTU Enable" @click="setactiveUUID()"></v-checkbox>
                                                        <v-autocomplete v-model='editedItemCC.endpoint' label='Unicast Network End Point' :items='selNetworkEndpoint' item-text='name' item-value="name" class="lable-placeholer-color"
                                                            return-object :readonly="!isEditingMDEndpoint" clearable @click:clear='clearMDEndpoint' @click="setMDEndpointSelect()" @blur="isEditingMDEndpoint=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                    </template>
                                                </v-edit-dialog>
                                            </th>
                                        </tr>
                                    <!-- </draggable> -->
                                    </tbody>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/sdctable'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showSDCItem" x-small color="indigo">
                                    <v-icon>{{ isSDCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Service discover configs
                            <v-btn @click="isCheckSDC" text x-small color="indigo" v-if="isSDCOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn  v-if="isSDCOpenClose && isdeleteSDCItem" @click="deleteSDC" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isSDCOpenClose"> 
                            <v-data-table v-model="selectdeleteSDCItem" :headers="headersSDC" :items="SDCItem"
                                    :show-select="isdeleteSDCItem" item-key="ssdp" style="width:100%" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteSDCItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx" >
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog v-if="header.value != 'sort'" persistent cancel-text='Ok' save-text="Cancel" @open="openSDC(idx)" @cancel="editSDC(idx)" @save="cancelSDC" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editedItemSDC.msia' label='Multicast SD IP Address' :items='selNetworkEndpoint' item-text='name' item-value="name" class="lable-placeholer-color"
                                                            return-object :readonly="!isEditingMDMulticast" clearable @click:clear='clearMDMulticast' @click="setMDMulticastSelect()" @blur="isEditingMDMulticast=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                        <v-text-field v-model="editedItemSDC.ssdp" label="Some IP SD Port" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @open="addOpenSDC()" @cancel="addSDC()" @save="cancelSDC"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editedItemSDC.msia' label='Multicast SD IP Address' :items='selNetworkEndpoint' item-text='name' item-value="name" class="lable-placeholer-color"
                                                            return-object :readonly="!isEditingMDMulticast" clearable @click:clear='clearMDMulticast' @click="setMDMulticastSelect()" @blur="isEditingMDMulticast=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                        <v-text-field v-model="editedItemSDC.ssdp" label="Some IP SD Port" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
//import draggable from "vuedraggable";
import dialogPathSetting from '../components/dialogPathSetting.vue'


export default {
//    components: {draggable},
    props: ['element', 'isDatailView', 'minimaptoolbar'],
    components:{dialogPathSetting},
    computed: { 
        activeUUID() {
            return this.$store.state.activeUUID
        },
        detailViewUUID() {
            return this.$store.state.detailViewUUID
        },
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex() {
            return this.$store.state.openProjectIndex
        },
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
            rules: { name:  [val => (val || '').length > 0 ], },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            iselementOpenClose: this.minimaptoolbar,
            isCCOpenClose: true,
            isSDCOpenClose: true,
            accessControl: ['MODELED', 'CUSTOM'],

            isdeleteCCItem: false,
            isEditingEndPoint: true,
            selNetworkEndpoint: this.$store.getters.getNetworkEndPoint,
            menulistEndpoint: [],
            selectdeleteCCItem: [],
            CCItem: [],
            headersCC: [
                { text: '', sortable: false, value: 'sort', width: '10px' },
                { text: 'name', align: 'start', sortable: false, value: 'name' },
                { text: 'MTU',  sortable: false, value: 'mtu' },
                { text: 'MTU Enable', sortable: false, value: 'mtuenable' },
                { text: 'MTU Timeout', width:'110px', sortable: false, value: 'timeout' },
                { text: 'Unicast Network End Point', width:'180px', value: 'endpoint', sortable: false },
                { text: 'Filter Data Mask', width:'120px', sortable: false, value: 'mask' },
            ],
            editedItemCC: { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: ''},
            defaultItemCC: { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: ''},
            selectEndpointItem: [],
            headersEndpoint: [
                { text: 'name', align: 'start', sortable: false, value: 'fullname' },
                { text: 'Domain name',  sortable: false, value: 'domainname' },
            ],
            selectIPAdderssItem: [],
            deleteChangeLineCC: [],
            deleteChangeLineSDC: [],

            isdeleteSDCItem: false,
            selectdeleteSDCItem: [],
            SDCItem: [],
            headersSDC: [
                { text: 'Multicast-SD-Ip-Address', width:'170px', align: 'start', sortable: false, value: 'msia' },
                { text: 'SomeIP-Service-discovery-port',width:'210px', sortable: false, value: 'ssdp' },
            ],
            editedItemSDC: { msia: null, ssdp: ''},
            defaultItemSDC: {  msia: null, ssdp: ''},

            isEditingMDEndpoint: true,
            isEditingMDMulticast: true,
        }
    },
    mounted () {
        this.$nextTick(() => {
            if(this.element.connector != undefined) {
                this.CCItem = this.element.connector.slice()
            }
            if(this.element.servicediscover != undefined) {
                this.SDCItem = this.element.servicediscover.slice()
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
        showMachineDesign () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showCCItem() {
            this.isCCOpenClose = this.isCCOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showSDCItem() {
            this.isSDCOpenClose = this.isSDCOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        inputMachineDesignName() {
            this.$store.commit('editMachineDesign', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        isCheckCC() {
            if (this.isdeleteCCItem == true) {
                this.isdeleteCCItem = false
                this.selectdeleteCCItem = []
            } else {
                this.isdeleteCCItem = true
            }
        },
        deleteCCItem() {
            if (this.isdeleteCCItem == true) {
                for(let i=0; i<this.CCItem.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineCC.push({endpoint:this.CCItem[i].endpoint, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/cctable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'CommunicationC', deletItemList: this.selectdeleteCCItem, path: this.element.path, name: this.element.name})
                this.CCItem = this.CCItem.filter(item => {
                         return this.selectdeleteCCItem.indexOf(item) < 0 })

                for(let n=0; n<this.CCItem.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineCC.length; idx++) {
                        if (this.CCItem[n].endpoint == this.deleteChangeLineCC[idx].endpoint) {
                            this.newLine(this.element.uuid+'/cctable-'+n, this.element.uuid+'/cctable', this.deleteChangeLineCC[idx].endLine)
                        }
                    }
                }

                this.isdeleteCCItem = false
                this.selectdeleteCCItem = []
                this.inputCCItem()
            } 
        },
        inputCCItem() {
            this.$store.commit('editMachineDesign', {compo:"CC item", uuid:this.element.uuid, cc:this.CCItem} )
        },
        openCC(idx) {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.editedItemCC.name = this.CCItem[idx].name
            this.editedItemCC.mtu = this.CCItem[idx].mtu
            this.editedItemCC.mtuenable = this.CCItem[idx].mtuenable
            this.editedItemCC.timeout = this.CCItem[idx].timeout
            this.editedItemCC.mask = this.CCItem[idx].mask
            if ( this.CCItem[idx].endpoint != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getEthernetClusterPath(this.CCItem[idx].endpoint)
                }
                this.editedItemCC.endpoint = { name: this.CCItem[idx].endpoint, uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+idx) }
            }
            this.setlistEthernetCluster()
        },
        addOpenCC() {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.setlistEthernetCluster()
        },
        addCC() {
            if(this.editedItemCC.endpoint != null) {
                var datacount
                if(this.CCItem == undefined) {
                    datacount = 0
                }else {
                    datacount = this.CCItem.length
                }
                this.newLine(this.element.uuid+'/cctable-'+datacount, this.element.uuid+'/cctable', this.editedItemCC.endpoint.uuid)
                this.editedItemCC.endpoint = this.editedItemCC.endpoint.name
            }
            const addObj = Object.assign({}, this.editedItemCC);
            this.CCItem.push(addObj);
            this.cancelCC()
            this.inputCCItem()
        },
        editCC(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+idx)
            if (endLine != undefined && this.editedItemCC.endpoint == null) {
                this.deleteLine(this.element.uuid+'/cctable-'+idx)
                this.CCItem[idx].endpoint = null
            } else if (endLine != undefined && endLine != this.editedItemCC.endpoint.uuid) {
                this.deleteLine(this.element.uuid+'/cctable-'+idx)
                this.newLine(this.element.uuid+'/cctable-'+idx, this.element.uuid+'/cctable', this.editedItemCC.endpoint.uuid)
            } else if (endLine == undefined && this.editedItemCC.endpoint != null) {
                this.newLine(this.element.uuid+'/cctable-'+idx, this.element.uuid+'/cctable', this.editedItemCC.endpoint.uuid)
                this.CCItem[idx].endpoint = this.editedItemCC.endpoint.name
            }

            if (this.CCItem[idx].name != this.editedItemCC.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'CommunicationC', listname: this.editedItemCC.name} )
            }


            this.CCItem[idx].name = this.editedItemCC.name
            this.CCItem[idx].mtu = this.editedItemCC.mtu
            this.CCItem[idx].mtuenable = this.editedItemCC.mtuenable
            this.CCItem[idx].timeout = this.editedItemCC.timeout
            this.CCItem[idx].mask = this.editedItemCC.mask
            this.cancelCC()
            this.inputCCItem()
        },
        cancelCC() {
            this.editedItemCC = Object.assign({}, this.defaultItemCC)
            this.selectEndpointItem = []
            this.menulistEndpoint = []
            this.setactiveUUID()
        },
        moveActiveEthernetCluster(item) {
            if(this.$store.state.activeUUID != null) {
                EventBus.$emit('onDeactivated', this.$store.state.activeUUID)
            }
            EventBus.$emit('onActivated', item.uuid)
            //this.$store.commit('editEthernetCluster', {compo:"z", uuid:this.$store.state.activeUUID, zindex:2})
            //this.$store.commit('editEthernetCluster', {compo:"z", uuid:item.uuid, zindex:10})
            //this.$store.commit('editMachineDesign', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newNetWorkEndPoint() {
            //new NetWork endpoint
            this.$store.commit('addElementEthernetCluster', {
                name: this.$store.getters.getNameEthernetCluster, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300, zindex: 10, conditional:'', icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.EthernetCluster_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachineDesign', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newHWAttribute() {
            // new HW attribute
            //EventBus.$emit('add-element', constant.)
            //EventBus.$emit('add-element', constant.Machines_str)
            //this.$store.commit('editMachineDesign', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        clearMDEndpoint() {
            this.isEditingMDEndpoint = true
            this.editedItemCC.endpoint = null
        },
        setMDEndpointSelect() {
            if (this.isEditingMDEndpoint == true) {
                if (this.editedItemCC.endpoint != null && this.editedItemCC.endpoint.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editedItemCC.endpoint.uuid, element: constant.EthernetCluster_str} )
                }
                this.setMDEndpointList()
                this.isEditingMDEndpoint = false
            } else {
                this.isEditingMDEndpoint = true
            }
        },
        setMDEndpointList() {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.setactiveUUID()
        },

        isCheckSDC() {
            if (this.isdeleteSDCItem == true) {
                this.isdeleteSDCItem = false
                this.selectdeleteSDCItem = []
            } else {
                this.isdeleteSDCItem = true
            }
        },
        deleteSDC() {
            if (this.isdeleteSDCItem == true) {
                for(let i=0; i<this.SDCItem.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineSDC.push({msia:this.SDCItem[i].msia, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/sdctable-'+i)
                    }
                }

                this.SDCItem = this.SDCItem.filter(item => {
                         return this.selectdeleteSDCItem.indexOf(item) < 0 })

                for(let n=0; n<this.SDCItem.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineSDC.length; idx++) {
                        if (this.SDCItem[n].msia == this.deleteChangeLineSDC[idx].msia) {
                            this.newLine(this.element.uuid+'/sdctable-'+n, this.element.uuid+'/sdctable', this.deleteChangeLineSDC[idx].endLine)
                        }
                    }
                }

                this.isdeleteSDCItem = false
                this.selectdeleteSDCItem = []
                this.deleteChangeLineSDC = []
                this.inputSDCItem()
            } 
        },
        inputSDCItem() {
            this.$store.commit('editMachineDesign', {compo:"SDC item", uuid:this.element.uuid, sdc:this.SDCItem} )
        },
        openSDC(idx) {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.editedItemSDC.ssdp = this.SDCItem[idx].ssdp
            if ( this.SDCItem[idx].msia != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getEthernetClusterPath(this.SDCItem[idx].msia)
                }
                this.editedItemSDC.msia = { name: this.SDCItem[idx].msia, uuid: endLine }
            }
            this.setlistEthernetCluster()
        },
        addOpenSDC() {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.setlistEthernetCluster()
        },
        editSDC(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+idx)
            if (endLine != undefined && this.editedItemSDC.msia == null) {
                this.deleteLine(this.element.uuid+'/sdctable-'+idx)
                this.SDCItem[idx].msia = null
            } else if (endLine != undefined && endLine != this.editedItemSDC.msia.uuid) {
                this.deleteLine(this.element.uuid+'/sdctable-'+idx)
                this.newLine(this.element.uuid+'/sdctable-'+idx, this.element.uuid+'/sdctable', this.editedItemSDC.msia.uuid)
            } else if (endLine == undefined && this.editedItemSDC.msia != null) {
                this.newLine(this.element.uuid+'/sdctable-'+idx, this.element.uuid+'/functiontable', this.editedItemSDC.msia.uuid)
                this.SDCItem[idx].msia = this.editedItemSDC.msia.name
            }

            this.SDCItem[idx].ssdp = this.editedItemSDC.ssdp
            this.cancelSDC()
            this.inputSDCItem()
        },
        cancelSDC() {
            for(let i=0; i<this.$store.state.SAHLProject[this.$store.state.openProjectIndex].Machine.EthernetCluster.length; i++){
                this.$store.commit('editEthernetCluster', {compo:"z", uuid:this.$store.state.SAHLProject[this.$store.state.openProjectIndex].Machine.EthernetCluster[i].uuid, zindex:2} )
            }
            this.editedItemSDC = Object.assign({}, this.defaultItemSDC)
            this.selectIPAdderssItem = []
            this.menulistEndpoint = []
            this.setactiveUUID()
        },
        addSDC() {
            if(this.editedItemSDC.msia != null) {
                var datacount
                if(this.SDCItem == undefined) {
                    datacount = 0
                }else {
                    datacount = this.SDCItem.length
                }
                this.newLine(this.element.uuid+'/sdctable-'+datacount, this.element.uuid+'/sdctable', this.editedItemSDC.msia.uuid)
                this.editedItemSDC.msia = this.editedItemSDC.msia.name
            }
            const addObj = Object.assign({}, this.editedItemSDC);
            this.SDCItem.push(addObj);
            this.cancelSDC()
            this.inputSDCItem()
        },
        clearMDMulticast() {
            this.isEditingMDMulticast = true
            this.editedItemSDC.msia = null
        },
        setMDMulticastSelect() {
            if (this.isEditingMDMulticast == true) {
                if (this.editedItemSDC.msia != null && this.editedItemSDC.msia.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editedItemSDC.msia.uuid, element: constant.EthernetCluster_str} )
                }
                this.setMDEndpointList()
                this.isEditingMDMulticast = false
            } else {
                this.isEditingMDMulticast = true
            }
        },


        setlistEthernetCluster() { // add list 버튼 눌렀을 경우 같은 element 이름 없애주는 코드임
            this.menulistEndpoint = this.selNetworkEndpoint.filter((item1, idx1) => {
                return this.selNetworkEndpoint.findIndex((item2) => {
                    return item1.ethernetname == item2.ethernetname
                }) == idx1
            })
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editMachineDesign', {compo:"z", uuid:this.element.uuid, zindex:10} )
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

    }
}
</script>

