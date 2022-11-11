<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Machine Design</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text  v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputMachineDesignName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-select :items="accessControl" label="Access Control"  v-model="element.access" @click="[clickOtherFields(),setactiveUUID()]" 
                                        clearable @click:clear="clickOtherFields()" outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-text-field v-model="element.resettimer" label="PN reset Timer" @click="clickOtherFields()" placeholder="TIME" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-data-table v-model="selectdeleteCCItem" :headers="headersCC" :items="element.connector" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteCCItem" item-key="id" height="140px" dense hide-default-footer id="commun-table">
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteCCItem" v-slot:body="props">
                                            <!-- <tbody> -->
                                            <draggable v-model="props.items" tag="tbody" handle=".my-handle">
                                                <tr v-for="(item,idx) in props.items" :key="idx" >
                                                    <td v-for="(header,key) in props.headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refCommuni === item.id ? 'red' : null " @click="rowCommuniClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openCC(idx)" @cancel="cancelCC" @save="editCC(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editedItemCC.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>                                                       
                                                                <v-text-field v-model="editedItemCC.mtu" label="MTU" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editedItemCC.timeout" label="MTU Timeout" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editedItemCC.mask" label="Filter Data Mask" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-checkbox v-model="editedItemCC.mtuenable" label="MTU Enable" value="editedItemCC.mtuenable" :indeterminate="editedItemCC.mtuenable==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()"></v-checkbox>
                                                                <v-autocomplete v-model='editedItemCC.endpoint' label='Unicast Network End Point' :items='selNetworkEndpoint' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingMDEndpoint" clearable @click:clear='clearMDEndpoint' @click="setMDEndpointSelect()" @blur="isEditingMDEndpoint=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @open="addOpenCC()" @cancel="cancelCC" @save="addCC()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editedItemCC.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editedItemCC.mtu" label="MTU" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editedItemCC.timeout" label="MTU Timeout" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editedItemCC.mask" label="Filter Data Mask" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-checkbox v-model="editedItemCC.mtuenable" label="MTU Enable" value="editedItemCC.mtuenable" :indeterminate="editedItemCC.mtuenable==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()"></v-checkbox>
                                                                <v-autocomplete v-model='editedItemCC.endpoint' label='Unicast Network End Point' :items='selNetworkEndpoint' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingMDEndpoint" clearable @click:clear='clearMDEndpoint' @click="setMDEndpointSelect()" @blur="isEditingMDEndpoint=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </th>
                                                </tr>
                                            </draggable>
                                            <!-- </tbody> -->
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
                                    <v-data-table v-model="selectdeleteSDCItem" :headers="headersSDC" :items="element.servicediscover" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteSDCItem" item-key="id" style="width:100%" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSDCItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx" >
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refService === item.id ? 'red' : null " @click="rowServiceClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openSDC(idx)" @cancel="cancelSDC" @save="editSDC(idx)" large >
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
                                                        <v-edit-dialog  large persistent @open="addOpenSDC()" @cancel="cancelSDC" @save="addSDC()"> 
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
                            <label style="padding:10px;">&#60;ACCESS-CONTROL&#62;</label>
                            <v-text-field v-model="editARXML.access" placeholder="MODELED or CUSTOM" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;ACCESS-CONTROL&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;PN-RESET-TIMER&#62;</label>
                            <v-text-field v-model="editARXML.resettimer" placeholder="Time" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;PN-RESET-TIMER&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;COMMUNICATION-CONNECTORS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextConnector()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 250px;">
                            <v-row v-for="(item, i) in editARXML.connector" :key="i" style="height: 210px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextConnector(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;ETHERNET-COMMUNICATION-CONNECTOR&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:2px 0px 2px 70px;">
                                        <v-col cols="5">
                                        <label>&#60;MAXIMUM-TRANSMISSION-UNIT&#62;</label>
                                        </v-col><v-col cols="2">
                                        <v-text-field v-model="item.mtu" placeholder="Int" style="margin:-5px 0px 0px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="5">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-TRANSMISSION-UNIT&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;PATH-MTU-TIMEOUT&#62;</label>
                                        <v-text-field v-model="item.timeout" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;PATH-MTU-TIMEOUT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;PNC-FILTER-DATA-MASK&#62;</label>
                                        <v-text-field v-model="item.mask" placeholder="Int"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;PNC-FILTER-DATA-MASK&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;PATH-MTU-ENABLED&#62;</label>
                                        <v-text-field v-model="item.mtuenable" placeholder="true or false"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;PATH-MTU-ENABLED&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:2px 0px 2px 70px;">
                                        <v-col cols="5">
                                        <label>&#60;UNICAST-NETWORK-ENDPOINT-REF&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.endpoint" placeholder="Path" style="margin:-5px 0px 0px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;UNICAST-NETWORK-ENDPOINT-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;ETHERNET-COMMUNICATION-CONNECTOR&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;COMMUNICATION-CONNECTORS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;SERVICE-DISCOVER-CONFIGS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextService()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.servicediscover" :key="i" style="height: 100px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextService(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SOMEIP-SERVICE-DISCOVERY&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;MULTICAST-SD-IP-ADDRESS-REF&#62;</label>
                                        </v-col><v-col cols="3">
                                        <v-text-field v-model="item.msia" placeholder="Path" style="margin:-5px 0px 0px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="4">
                                        <label style="padding:10px;">&#60;&#47;MULTICAST-SD-IP-ADDRESS-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;SOMEIP-SERVICE-DISCOVERY-PORT&#62;</label>
                                        </v-col><v-col cols="3">
                                        <v-text-field v-model="item.ssdp" placeholder="Integer" style="margin:-5px 0px 0px 15px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="4">
                                        <label style="padding:10px;">&#60;&#47;SOMEIP-SERVICE-DISCOVERY-PORT&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-SERVICE-DISCOVERY&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;SERVICE-DISCOVER-CONFIGS&#62;</label>
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
import draggable from "vuedraggable";
import dialogPathSetting from '../components/dialogPathSetting.vue'
import Sortable from 'sortablejs';

export default {
//    components: {draggable},
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
    components:{dialogPathSetting, draggable},
    computed: { 
        activeUUID() {
            return this.$store.state.activeUUID
        },
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex() {
            return this.$store.state.openProjectIndex
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
            rules: { name:  [val => (val || '').length > 0 ], },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: true,
            dialogText: false,
            editARXML: {name:'', access: null, resettimer: '', connector: [], servicediscover: []},
            editTextConnector: { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: '', id:''},
            editTextSer: {msia: null, ssdp: '', id: ''},
            isCCOpenClose: true,
            isSDCOpenClose: true,
            accessControl: ['MODELED', 'CUSTOM'],

            isdeleteCCItem: false,
            isEditingEndPoint: true,
            selNetworkEndpoint: this.$store.getters.getNetworkEndPoint,
            menulistEndpoint: [],
            selectdeleteCCItem: [],
            headersCC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'name', align: 'start', sortable: false, value: 'name' },
                { text: 'MTU',  sortable: false, value: 'mtu' },
                { text: 'MTU Enable', sortable: false, value: 'mtuenable' },
                { text: 'MTU Timeout', width:'110px', sortable: false, value: 'timeout' },
                { text: 'Unicast Network End Point', width:'180px', value: 'endpoint', sortable: false },
                { text: 'Filter Data Mask', width:'130px', sortable: false, value: 'mask' },
            ],
            editedItemCC: { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: '', id:''},
            defaultItemCC: { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: '', id:''},
            selectEndpointItem: [],
            selectIPAdderssItem: [],

            isdeleteSDCItem: false,
            selectdeleteSDCItem: [],
            headersSDC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Multicast-SD-Ip-Address', width:'170px', align: 'start', sortable: false, value: 'msia' , id:''},
                { text: 'SomeIP-Service-discovery-port',width:'210px', sortable: false, value: 'ssdp' , id:''},
            ],
            editedItemSDC: { msia: null, ssdp: ''},
            defaultItemSDC: {  msia: null, ssdp: ''},

            isEditingMDEndpoint: true,
            isEditingMDMulticast: true,
            refCommuni: null,
            refService: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, id, isDeleteItem, item, idxRow) => {
            console.log('** '+ id+'/'+item+'/'+idxRow)
            if (isDeleteItem) {
                if (this.refCommuni == id && item == 'Connector') {
                    this.refCommuni = id +1
                    this.rowCommuniClick(idxRow)
                } else if (this.refService == id && item == 'Service') {
                    this.refService = id +1
                    this.rowServiceClick(idxRow)
                }
            } else {
                this.refCommuni = null
                this.refService = null

                if (refNum == 1) {
                    this.refCommuni = idxID
                } else if (refNum == 2) {
                    this.refService = idxID
                }
            }
        })
    },
    methods: {
        initSortable() {
            let table = document.getElementById("commun-table");
            Sortable.create(table, {
                handle: ".my-handle",
                onStart() {console.log('111111111111111111')},
                onMove() { console.log('move')},
                onEnd({newIndex,oldIndex }) {
                    const movedItem = this.element.connector.splice(oldIndex, 1)[0]
                    this.element.connector.splice(newIndex, 0, movedItem)
                    console.log(this.element.connector);
                }
            });
        },
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showCCItem() {
            this.clickOtherFields()
            this.isCCOpenClose = this.isCCOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showSDCItem() {
            this.clickOtherFields()
            this.isSDCOpenClose = this.isSDCOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        inputMachineDesignName() {
            this.$store.commit('editMachineDesign', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refCommuni != null || this.refService != null) {
                this.deleteOpenElement()
                this.refCommuni = null
                this.refService = null
            }
        },
        rowCommuniClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refCommuni != this.element.connector[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.connector[idx].endpoint != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getEthernetClusterPath(this.element.connector[idx].endpoint)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var isExist = true
                        if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                            this.$store.commit('editEthernetCluster', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.EthernetCluster_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/cctable', endLine, isExist)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/cctable', end:endLine, iscircle:isExist, refNum:1, idxID: this.element.connector[idx].id})
                    }
                }
                this.refCommuni = this.element.connector[idx].id
            }
        },
        rowServiceClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refService != this.element.servicediscover[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.servicediscover[idx].msia != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getEthernetClusterPath(this.element.servicediscover[idx].msia)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var isExist = true
                        if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                            this.$store.commit('editEthernetCluster', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.EthernetCluster_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/sdctable', endLine, isExist)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/sdctable', end:endLine, iscircle:isExist, refNum:2, idxID: this.element.servicediscover[idx].id})
                    }
                }
                this.refService = this.element.servicediscover[idx].id
            }
        },

        isCheckCC() {
            this.clickOtherFields()
            if (this.isdeleteCCItem == true) {
                this.isdeleteCCItem = false
                this.selectdeleteCCItem = []
            } else {
                this.isdeleteCCItem = true
            }
        },
        deleteCCItem() {
            this.clickOtherFields()
            if (this.isdeleteCCItem == true) {
                this.selectdeleteCCItem.forEach(item => {
                    for(let i=0; i<this.element.connector.length; i++){
                        if (item.id == this.element.connector[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+this.element.connector[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/cctable-'+this.element.connector[i].id)
                            }
                        }
                    }
                })
                
                this.$store.commit('deleteRefTable', {deleteName:'CommunicationC', deletItemList: this.selectdeleteCCItem, path: this.element.path, name: this.element.name})
                this.element.connector = this.element.connector.filter(item => {
                         return this.selectdeleteCCItem.indexOf(item) < 0 })

                this.isdeleteCCItem = false
                this.selectdeleteCCItem = []
            } 
        },
        openCC(idx) {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.editedItemCC.name = this.element.connector[idx].name
            this.editedItemCC.mtu = this.element.connector[idx].mtu
            this.editedItemCC.mtuenable = this.element.connector[idx].mtuenable
            this.editedItemCC.timeout = this.element.connector[idx].timeout
            this.editedItemCC.mask = this.element.connector[idx].mask
            if ( this.element.connector[idx].endpoint != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getEthernetClusterPath(this.element.connector[idx].endpoint)
                }
                this.editedItemCC.endpoint = { name: this.element.connector[idx].endpoint, uuid: endLine}
            }
            this.setlistEthernetCluster()
        },
        addOpenCC() {
            this.clickOtherFields()
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.setlistEthernetCluster()
        },
        addCC() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.connector.some(item => item.id === n)
            }
            this.editedItemCC.id = n
            var endLine = null
            if(this.editedItemCC.endpoint != null) {
                var isExist = true
                endLine = this.editedItemCC.endpoint.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editedItemCC.endpoint.uuid) == -1) {
                    this.$store.commit('editEthernetCluster', {compo:"drag", uuid: this.editedItemCC.endpoint.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    isExist = false
                }
                this.$store.commit('setzIndexVisible', {parent:constant.EthernetCluster_str, uuid: this.editedItemCC.endpoint.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editedItemCC.endpoint = this.editedItemCC.endpoint.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/cctable-'+n, this.element.uuid+'/cctable', endLine, true, isExist)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/cctable', end:endLine, iscircle:isExist, refNum:1, idxID: this.editedItemCC.id})
            }
            const addObj = Object.assign({}, this.editedItemCC);
            this.element.connector.push(addObj);
            this.refCommuni = n
            this.cancelCC()
            //this.initSortable()
        },
        editCC(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id)
            if (endLine != undefined && this.editedItemCC.endpoint == null) {
                this.deleteLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id)
                this.element.connector[idx].endpoint = null
            } else if (endLine != undefined && endLine != this.editedItemCC.endpoint.uuid) {
                this.deleteLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id)
                this.newLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id, this.element.uuid+'/cctable', this.editedItemCC.endpoint.uuid, false)
            } else if (endLine == undefined && this.editedItemCC.endpoint != null && this.editedItemCC.endpoint.uuid != null) {
                this.newLine(this.element.uuid+'/cctable-'+this.element.connector[idx].id, this.element.uuid+'/cctable', this.editedItemCC.endpoint.uuid, false)
                this.element.connector[idx].endpoint = this.editedItemCC.endpoint.name
            } else if (this.editedItemCC.endpoint != null && endLine == this.editedItemCC.endpoint.uuid && this.element.connector[idx].endpoint != this.editedItemCC.endpoint.name) {
                this.element.connector[idx].endpoint = this.editedItemCC.endpoint.name
            }

            if (this.element.connector[idx].name != this.editedItemCC.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'CommunicationC', listname: this.editedItemCC.name, beforename: this.element.connector[idx].name} )
            }

            if (this.refCommuni == this.element.connector[idx].id) {
                this.deleteOpenElement()
                if (this.editedItemCC.endpoint != null && this.editedItemCC.endpoint.uuid != null) {
                    var isExist = true, endLineChange = this.editedItemCC.endpoint.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editedItemCC.endpoint.uuid) == -1) {
                        this.$store.commit('editEthernetCluster', {compo:"drag", uuid: this.editedItemCC.endpoint.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.EthernetCluster_str, uuid: this.editedItemCC.endpoint.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/cctable', endLineChange, isExist)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/cctable', end:endLineChange, iscircle:isExist, refNum:1, idxID: this.refCommuni})
                }
            }

            this.element.connector[idx].name = this.editedItemCC.name
            this.element.connector[idx].mtu = this.editedItemCC.mtu
            this.element.connector[idx].mtuenable = this.editedItemCC.mtuenable
            this.element.connector[idx].timeout = this.editedItemCC.timeout
            this.element.connector[idx].mask = this.editedItemCC.mask
            this.cancelCC()
        },
        cancelCC() {
            this.editedItemCC = Object.assign({}, this.defaultItemCC)
            this.selectEndpointItem = []
            this.menulistEndpoint = []
            this.setactiveUUID()
        },
        clearMDEndpoint() {
            this.isEditingMDEndpoint = true
            this.editedItemCC.endpoint = null
        },
        setMDEndpointSelect() {
            if (this.isEditingMDEndpoint == true) {
                if (this.editedItemCC.endpoint != null && this.editedItemCC.endpoint.uuid != null) {
                                    console.log(this.editedItemCC.endpoint.uuid)
                    this.infoEthernetCluster()
                    this.$store.commit('setDetailView', {uuid: this.editedItemCC.endpoint.uuid, element: constant.EthernetCluster_str} )
                    /*document.getElementById(this.editedItemCC.endpoint.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editedItemCC.endpoint.uuid)*/
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
            this.clickOtherFields()
            if (this.isdeleteSDCItem == true) {
                this.isdeleteSDCItem = false
                this.selectdeleteSDCItem = []
            } else {
                this.isdeleteSDCItem = true
            }
        },
        deleteSDC() {
            this.clickOtherFields()
            if (this.isdeleteSDCItem == true) {
                this.selectdeleteSDCItem.forEach(item => {
                    for(let i=0; i<this.element.servicediscover.length; i++){
                        if (item.id == this.element.servicediscover[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[i].id)
                            }
                        }
                    }
                })
                
                this.element.servicediscover = this.element.servicediscover.filter(item => {
                         return this.selectdeleteSDCItem.indexOf(item) < 0 })

                this.isdeleteSDCItem = false
                this.selectdeleteSDCItem = []
            } 
        },
        openSDC(idx) {
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.editedItemSDC.ssdp = this.element.servicediscover[idx].ssdp
            if ( this.element.servicediscover[idx].msia != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getEthernetClusterPath(this.element.servicediscover[idx].msia)
                }
                this.editedItemSDC.msia = { name: this.element.servicediscover[idx].msia, uuid: endLine }
            }
            this.setlistEthernetCluster()
        },
        addOpenSDC() {
            this.clickOtherFields()
            this.selNetworkEndpoint = this.$store.getters.getNetworkEndPoint
            this.setlistEthernetCluster()
        },
        editSDC(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id)
            if (endLine != undefined && this.editedItemSDC.msia == null) {
                this.deleteLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id)
                this.element.servicediscover[idx].msia = null
            } else if (endLine != undefined && endLine != this.editedItemSDC.msia.uuid) {
                this.deleteLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id)
                this.newLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id, this.element.uuid+'/sdctable', this.editedItemSDC.msia.uuid, false)
            } else if (endLine == undefined && this.editedItemSDC.msia != null && this.editedItemSDC.msia.uuid != null) {
                this.newLine(this.element.uuid+'/sdctable-'+this.element.servicediscover[idx].id, this.element.uuid+'/sdctable', this.editedItemSDC.msia.uuid, false)
                this.element.servicediscover[idx].msia = this.editedItemSDC.msia.name
            } else if (this.editedItemSDC.msia != null && endLine == this.editedItemSDC.msia.uuid && this.element.servicediscover[idx].msia != this.editedItemSDC.msia.name) {
                this.element.servicediscover[idx].msia = this.editedItemSDC.msia.name
            }
 
            if (this.refService == this.element.servicediscover[idx].id) {
                this.deleteOpenElement()
                if (this.editedItemSDC.msia != null && this.editedItemSDC.msia.uuid != null) {
                    var isExist = true, endLineChange = this.editedItemSDC.msia.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editedItemSDC.msia.uuid) == -1) {
                        this.$store.commit('editEthernetCluster', {compo:"drag", uuid: this.editedItemSDC.msia.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.EthernetCluster_str, uuid: this.editedItemSDC.msia.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/sdctable', endLineChange, isExist)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/sdctable', end:endLineChange, iscircle:isExist, refNum:2, idxID: this.refService})
                }
            }

            this.element.servicediscover[idx].ssdp = this.editedItemSDC.ssdp
            this.cancelSDC()
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
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.servicediscover.some(item => item.id === n)
            }
            this.editedItemSDC.id = n
            var endLine = null
            if(this.editedItemSDC.msia != null) {
                var isExist = true
                endLine = this.editedItemSDC.msia.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editedItemSDC.msia.uuid) == -1) {
                    this.$store.commit('editEthernetCluster', {compo:"drag", uuid: this.editedItemSDC.msia.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    isExist = false
                }
                this.$store.commit('setzIndexVisible', {parent:constant.EthernetCluster_str, uuid: this.editedItemSDC.msia.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editedItemSDC.msia = this.editedItemSDC.msia.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/sdctable-'+n, this.element.uuid+'/sdctable', endLine, true, isExist)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/sdctable', end:endLine, iscircle:isExist, refNum:2, idxID: this.editedItemSDC.id})
            }
            const addObj = Object.assign({}, this.editedItemSDC);
            this.element.servicediscover.push(addObj);
            this.refService = n
            this.cancelSDC()
        },
        clearMDMulticast() {
            this.isEditingMDMulticast = true
            this.editedItemSDC.msia = null
        },
        setMDMulticastSelect() {
            if (this.isEditingMDMulticast == true) {
                if (this.editedItemSDC.msia != null && this.editedItemSDC.msia.uuid != null) {
                    this.infoEthernetCluster()
                    this.$store.commit('setDetailView', {uuid: this.editedItemSDC.msia.uuid, element: constant.EthernetCluster_str} )
                    /*document.getElementById(this.editedItemSDC.msia.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editedItemSDC.msia.uuid)*/
                }
                this.setMDEndpointList()
                this.isEditingMDMulticast = false
            } else {
                this.isEditingMDMulticast = true
            }
        },
        infoEthernetCluster() {
            var info = {  isChannel: true, isEndpoint: true, idxConditional: 0, idxChannel: 0,  idxEndpoint: 0,}
            this.selNetworkEndpoint.forEach( data => {
                if (data.uuid == this.editedItemCC.endpoint.uuid) {
                    info.idxConditional = data.condidx
                    info.idxChannel = data.channelidx
                    info.idxEndpoint = data.endpointidx
                }
            })
            EventBus.$emit('detailViewInfo',info)
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
                this.$store.commit('deletConnectionline', {startnum: linenum} )
                this.deleteOpenElement()
            }
        },
        deleteOpenElement() {
            //EventBus.$emit('delete-line', this.$store.getters.getDeleteOpenElement(this.element.uuid))
            this.$store.commit('deleteOpenElemnt', {uuid: this.element.uuid, isDeleteAll: false, startUUID: this.element.uuid} )
        },
        newLine(startLine, drawLine, endLine, isView, isExist) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine, isExist)
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.access = this.element.access
            this.editARXML.resettimer = this.element.resettimer
            this.editARXML.connector = JSON.parse(JSON.stringify(this.element.connector))
            this.editARXML.servicediscover = JSON.parse(JSON.stringify(this.element.servicediscover))
            this.dialogText= true
        },
        saveARXML() {
            var isHaveTable
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editMachineDesign', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name

            this.editARXML.access = this.editARXML.access.toUpperCase()
            if(this.editARXML.access == 'MODELED' || this.editARXML.access == 'CUSTOM') {
                this.element.access = this.editARXML.access
            }
            this.element.resettimer = this.editARXML.resettimer

            if (this.editARXML.connector.length > 0) {
                var deleteItem = []
                this.element.connector.forEach(item => {
                    var isExistence = false
                    this.editARXML.connector.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'CommunicationC', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'CommunicationC', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.connector.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'CommunicationC', deletItemList: this.element.connector, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.connector.length > 0) {
                this.editARXML.connector.forEach(item => {
                    isHaveTable = false
                    for(let n=0; n<this.element.connector.length; n++){
                        if (this.element.connector[n].id == item.id &&
                            this.element.connector[n].endpoint == item.endpoint ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+item.id)
                        if (endLineC != undefined) {
                            this.deleteLine(this.element.uuid+'/cctable-'+item.id)
                        }
                        var changEndLineC = this.$store.getters.getEthernetClusterPath(item.endpoint)
                        console.log(changEndLineC)
                        if (changEndLineC != null) {
                            this.newLine(this.element.uuid+'/cctable-'+item.id, this.element.uuid+'/cctable', changEndLineC, false)
                        }
                    }
                })
                this.element.connector.forEach(item => {
                    isHaveTable = false
                    this.editARXML.connector.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+item.id)
                        if (endLineC != undefined) {
                            this.deleteLine(this.element.uuid+'/cctable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.connector.length > 0) {
                    this.element.connector.forEach(item => {
                        var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/cctable-'+item.id)
                        if (endLineC != undefined) {
                            this.deleteLine(this.element.uuid+'/cctable-'+item.id)
                        }
                    })
                }
            }

            if (this.editARXML.servicediscover.length > 0) {
                this.editARXML.servicediscover.forEach(item => {
                    isHaveTable = false
                    for(let n=0; n<this.element.servicediscover.length; n++){
                        if (this.element.servicediscover[n].id == item.id && 
                            this.element.servicediscover[n].msia == item.msia) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+item.id)
                        if (endLineS != undefined) {
                            this.deleteLine(this.element.uuid+'/sdctable-'+item.id)
                        }
                        var changEndLineS = this.$store.getters.getEthernetClusterPath(item.msia)
                        if (changEndLineS != null) {
                            this.newLine(this.element.uuid+'/sdctable-'+item.id, this.element.uuid+'/sdctable', changEndLineS, false)
                        }
                    }
                })
                this.element.servicediscover.forEach(item => {
                    isHaveTable = false
                    this.editARXML.servicediscover.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+item.id)
                        if (endLineS != undefined) {
                            this.deleteLine(this.element.uuid+'/sdctable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.servicediscover.length > 0) {
                    this.element.servicediscover.forEach(item => {
                        if (item.msia != null) {
                            var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/sdctable-'+item.id)
                            if (endLineS != undefined) {
                                this.deleteLine(this.element.uuid+'/sdctable-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.connector = JSON.parse(JSON.stringify(this.editARXML.connector))
            this.element.servicediscover = JSON.parse(JSON.stringify(this.editARXML.servicediscover))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', access: null, resettimer: '', connector: [], servicediscover: []}
            this.editTextConnector = { name: '', mtu: '', mtuenable: null, timeout: '', endpoint: null, mask: '', id:''}
            this.editTextSer = {msia: null, ssdp: '', id: ''}
            this.dialogText = false
        },
        newTextConnector() {
            this.editTextConnector = { const : '', symbol: '', lowerlimit: '', upperlimit: '', desc: '', id: ''} 
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.connector.some(item => item.id === n)
            }
            this.editTextConnector.id = n

            const addObj = Object.assign({}, this.editTextConnector)
            this.editARXML.connector.push(addObj);
        },
        deletTextConnector(idx) {
            this.editARXML.connector.splice(idx,1)
        },
        newTextService() {
            this.editTextSer = { msia : null, ssdp: '', id: ''} 
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.servicediscover.some(item => item.id === n)
            }
            this.editTextSer.id = n

            const addObj = Object.assign({}, this.editTextSer)
            this.editARXML.servicediscover.push(addObj);
        },
        deletTextService(idx) {
            this.editARXML.servicediscover.splice(idx,1)
        },
    }
}
</script>
