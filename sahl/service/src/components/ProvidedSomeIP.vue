<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showProvidedSomeIP">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Provided SomeIP Service Instance</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Provided SomeIP Service Instance</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-show="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputProvidedSomeIPName' outlined dense></v-text-field>
                    <v-row style="height: 45px">
                        <v-col cols="10">
                            <v-text-field v-model="element.deployref" readonly @click="setSIDeploymentSelect()" clearable @click:clear='clearSIDeployment()' label="Service Interface Deployment Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/providDeploy'" dark icon v-bind="attrs" v-on="on" @click="setSIDeploymentList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selSIDeployment" :key="i" link @click="setSIDeployment(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newSIDeployment" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.someipserver" readonly @click="setSomeIPServerSelect()" clearable @click:clear='clearSomeIPServer()' label="SD Server Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/providSomeIPS'" dark icon v-bind="attrs" v-on="on" @click="setSomeIPServerList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selSomeIPServer" :key="i" link @click="setSomeIPServer(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newSomeIPServer" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="element.instanceid" label="Service Instance ID" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/proviedEventP'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showEventP" x-small color="indigo">
                                    <v-icon>{{ isEventPOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Event Propss
                            <v-btn @click="isCheckEventP" text x-small color="indigo" v-if="isEventPOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isEventPOpenClose && isdeleteEventP" @click="deletEventP" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isEventPOpenClose">
                            <v-data-table v-model="selectEventP" :headers="headerEventP" :items="element.eventP"
                                    :show-select="isdeleteEventP" item-key="event" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteEventP" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openEventP(idx)" @cancel="editEventP(idx)" @save="cancelEventP" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editEventItem.event' label='Event Reference' :items='selEventProp' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingEventP" clearable @click="setEventPSelect()" 
                                                                    @click:clear='clearEventP' @blur="isEditingEventP=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addEventP()" @save="cancelEventP"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editEventItem.event' label='Event Reference' :items='selEventProp' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingEventP" clearable @click="setEventPSelect()" 
                                                                    @click:clear='clearEventP' @blur="isEditingEventP=true" outlined dense style="height: 45px;">
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
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/proviedMethod'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showMethodRef" x-small color="indigo">
                                    <v-icon>{{ isMethodRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Method Response Propss
                            <v-btn @click="isCheckMethodRef" text x-small color="indigo" v-if="isMethodRefOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isMethodRefOpenClose && isdeleteMethodRef" @click="deletMethodRef" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isMethodRefOpenClose">
                            <v-data-table v-model="selectMethodRef" :headers="headerMethodRef" :items="element.method"
                                    :show-select="isdeleteMethodRef" item-key="method" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteMethodRef" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openMethodRef(idx)" @cancel="editMethodRef(idx)" @save="cancelMethodRef" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editMethodItem.method' label='Method Reference' :items='selMethodref' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingMethod" clearable @click="setMethodSelect()" 
                                                                    @click:clear='clearMethodRef' @blur="isEditingMethod=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addMethodRef()" @save="cancelMethodRef"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editMethodItem.method' label='Method Reference' :items='selMethodref' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingMethod" clearable @click="setMethodSelect()" 
                                                                    @click:clear='clearMethodRef' @blur="isEditingMethod=true" outlined dense style="height: 45px;">
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
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/providE'" >
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showProvidEvent" x-small color="indigo">
                                    <v-icon>{{ isProvidEventOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            SomeIP Provided Event Group
                            <v-btn v-if="isProvidEventOpenClose" @click="addProvidEvent" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-tabs v-model='eventGroupTab' v-show="isProvidEventOpenClose" show-arrows @change="changeEeventGroupTab()">
                            <v-tab v-for="(tab, idx) in element.eventG" :key="idx" @click="clickEeventGroupTab()"> 
                                {{tab.name}}
                                <v-btn text x-small @click="deleteEventGroup(idx)"><v-icon x-small>mdi-close</v-icon></v-btn>
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="eventGroupTab" v-show="isProvidEventOpenClose">
                            <v-tab-item v-for="(tab, idx) in element.eventG" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-text-field v-model="tab.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-row style="height: 70px">
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.eventG" readonly @click="setEventGSelect(tab)" clearable @click:clear='clearEventG(tab)' label="Event Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/providEventG'+tab.name" icon v-bind="attrs" v-on="on" @click="setEventGList()">
                                                            <v-icon>mdi-menu-down-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list >
                                                        <v-list-item v-for="(item, i) in selEventG" :key="i" link @click="setEventG(item, tab)">
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item v-if="selEventG.length == 0">
                                                            <v-list-item-title>No Data Available</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                        <v-text-field v-model="tab.udp" label="Event Multicast UDP Port" @click="setactiveUUID" placeholder="int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-text-field v-model="tab.ipv4" label="IPV-4 Multicast IP Adderss" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-text-field v-model="tab.ipv6" label="IPV-6 Multicast IP Adderss" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-text-field v-model="tab.threshold" label="Multicast Threshold" @click="setactiveUUID" placeholder="int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-row>
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.server" readonly @click="setServerSelect(tab)" clearable @click:clear='clearServer(tab)' label="SD Server Event Group Timing Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/providServer'+tab.name" dark icon v-bind="attrs" v-on="on" @click="setServerList()">
                                                            <v-icon>mdi-menu-down-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item v-for="(item, i) in selServer" :key="i" link @click="setServer(item,tab)">
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                        </v-list-item>
                                                        <v-btn outlined color="indigo" dense text small block @click="newServer" >
                                                            <v-icon >mdi-plus</v-icon>New Item
                                                        </v-btn>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-card-text>
                <v-card-text v-show="!iselementOpenClose">
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
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
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
            isMethodRefOpenClose: true,
            isEventPOpenClose: true,
            isProvidEventOpenClose: true,
            selSIDeployment: this.$store.getters.getSIDeployment,
            selSomeIPServer: this.$store.getters.getSomeIPServer,

            selectMethodRef: [],
            headerMethodRef: [
                { text: 'SomeIP Method Props', align: 'start', sortable: false, value: 'method' },
            ],
            editMethodItem: { method : null},
            isdeleteMethodRef: false,
            selMethodref: this.$store.getters.getDeploymentMethod,
            isEditingMethod: true,
            deleteMethodLine: [],

            selectEventP: [],
            headerEventP: [
                { text: 'SomeIP Event Props', align: 'start', sortable: false, value: 'event' },
            ],
            editEventItem: { event : null},
            isdeleteEventP: false,
            selEventProp: this.$store.getters.getEventDeployment,
            isEditingEventP: true,
            deleteEventLine: [],

            eventGroupTab: 0,
            selEventG: this.$store.getters.getEventGroup,
            selServer: this.$store.getters.getServer,
        }
    },
    mounted () {
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: false} )
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
        showProvidedSomeIP () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.element.eventG.length > 0 && this.location == 1) {
                        if (this.isProvidEventOpenClose) {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].name)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showMethodRef() {
            this.isMethodRefOpenClose = this.isMethodRefOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showEventP() {
            this.isEventPOpenClose = this.isEventPOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showProvidEvent() {
            if(this.isDatailView == true) {
                this.element.eventG = this.element.eventG.slice()
            }
            this.isProvidEventOpenClose = this.isProvidEventOpenClose ? false : true
            if(this.element.eventG.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isProvidEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].name)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        inputProvidedSomeIPName () {
            this.$store.commit('editProvidedSomeIP', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: false} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearSIDeployment() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providDeploy')
            if (endLine != undefined) {
                this.element.deployref = null
                this.deleteLine(this.element.uuid+'/providDeploy')
            }
        },
        setSIDeploymentSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providDeploy')
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.element.deployref, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
            }
        },
        setSIDeploymentList() {
            this.selSIDeployment = this.$store.getters.getSIDeployment
            this.setactiveUUID()
        },
        setSIDeployment(item){
            if( this.element.deployref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providDeploy')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providDeploy')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providDeploy', this.element.uuid+'/providDeploy', item.uuid)
                }
                this.element.deployref = item.name
            }
            this.setactiveUUID()
        },
        newSIDeployment() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementSomeIPService', {
                name: this.$store.getters.getNameSomeIPService, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                service: null, majversion:'', minversion:'', id: '', eventG:null, eventD: [], methodD:[], fieldD:[],
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInterfaces_str)
            EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearSomeIPServer() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
            if (endLine != undefined) {
                this.element.someipserver = null
                this.deleteLine(this.element.uuid+'/providSomeIPS')
            }
        },
        setSomeIPServerSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSomeIPServerPath(this.element.someipserver)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServer_str} )
            }
        },
        setSomeIPServerList() {
            this.selSomeIPServer = this.$store.getters.getSomeIPServer
            this.setactiveUUID()
        },
        setSomeIPServer(item){
            if( this.element.someipserver != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providSomeIPS')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providSomeIPS', this.element.uuid+'/providSomeIPS', item.uuid)
                }
                this.element.someipserver = item.name
            }
            this.setactiveUUID()
        },
        newSomeIPServer() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementSomeIPServer', { 
                name: this.$store.getters.getNameSomeIPServer, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '', delaymax: '', delaymin: '',
                offer: '', tiemtolive: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.SomeIPServer_str)
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckEventP() {
            if (this.isdeleteEventP == true) {
                this.isdeleteEventP = false
                this.selectEventP = []
            } else {
                this.isdeleteEventP = true
            }
        },
        deletEventP() {
            if (this.isdeleteEventP == true) {
                for(let i=0; i<this.element.eventP.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+i)
                    if(endLine != undefined) {
                        this.deleteEventLine.push({name:this.element.eventP[i].event, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/proviedEventP-'+i)
                    }
                }

                this.element.eventP = this.element.eventP.filter(item => {
                        return this.selectEventP.indexOf(item) < 0 })

                for(let n=0; n<this.element.eventP.length; n++) {
                    for(let idx=0; idx<this.deleteEventLine.length; idx++) {
                        if (this.element.eventP[n].event == this.deleteEventLine[idx].name) {
                            this.newLine(this.element.uuid+'/proviedEventP-'+n, this.element.uuid+'/proviedEventP', this.deleteEventLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteEventP = false
                this.selectEventP = []
                this.deleteEventLine = []
            } 
        },
        openEventP(idx) {
            this.selEventProp = this.$store.getters.getEventDeployment
            if ( this.element.eventP[idx].event != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.element.eventP[idx].event, 2)
                }
                this.editEventItem.event = { name: this.element.eventP[idx].event, uuid: endLine }
            }
        },
        editEventP(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+idx)
            if (endLine != undefined && this.editEventItem.event == null) {
                this.deleteLine(this.element.uuid+'/proviedEventP-'+idx)
                this.element.eventP[idx].event = null
            } else if (endLine != undefined && endLine != this.editEventItem.event.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/proviedEventP-'+idx)
                this.newLine(this.element.uuid+'/proviedEventP-'+idx, this.element.uuid+'/proviedEventP', this.editEventItem.event.uuid)
                this.element.eventP[idx].event = this.editEventItem.event.name
            } else if (endLine == undefined && this.editEventItem.event != null) {
                this.newLine(this.element.uuid+'/proviedEventP-'+idx, this.element.uuid+'/proviedEventP', this.editEventItem.event.uuid)
                this.element.eventP[idx].event = this.editEventItem.event.name
            }
            
            this.cancelEventP()
        },
        cancelEventP() {
            this.editEventItem.event = null
            this.setactiveUUID()
        },
        addEventP() {
            if( this.editEventItem.event != null) {
                var datacount = this.element.eventP.length
                this.newLine(this.element.uuid+'/proviedEventP-'+datacount, this.element.uuid+'/proviedEventP', this.editEventItem.event.uuid)
                this.editEventItem.event = this.editEventItem.event.name
            }
            const addObj = Object.assign({}, this.editEventItem)
            this.element.eventP.push(addObj);

            this.cancelEventP()
        },
        setEventPSelect() {
            if (this.isEditingEventP == true) {
                if (this.editEventItem.event != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEventItem.event.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                }
                this.setEventList()
                this.isEditingEventP = false
            } else {
                this.isEditingEventP = true
            }
        },
        setEventList() {
            this.selEventProp = this.$store.getters.getEventDeployment
            this.setactiveUUID()
        },
        clearEventP() {
            this.isEditingEventP = true
            this.editEventItem.event = null
        },

        isCheckMethodRef() {
            if (this.isdeleteMethodRef == true) {
                this.isdeleteMethodRef = false
                this.selectMethodRef = []
            } else {
                this.isdeleteMethodRef = true
            }
        },
        deletMethodRef() {
            if (this.isdeleteMethodRef == true) {
                for(let i=0; i<this.element.method.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+i)
                    if(endLine != undefined) {
                        this.deleteMethodLine.push({name:this.element.method[i].method, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/proviedMethod-'+i)
                    }
                }

                this.element.method = this.element.method.filter(item => {
                        return this.selectMethodRef.indexOf(item) < 0 })

                for(let n=0; n<this.element.method.length; n++) {
                    for(let idx=0; idx<this.deleteMethodLine.length; idx++) {
                        if (this.element.method[n].method == this.deleteMethodLine[idx].name) {
                            this.newLine(this.element.uuid+'/proviedMethod-'+n, this.element.uuid+'/proviedMethod', this.deleteMethodLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteMethodRef = false
                this.selectMethodRef = []
                this.deleteMethodLine = []
            } 
        },
        openMethodRef(idx) {
            this.selMethodref = this.$store.getters.getDeploymentMethod
            if ( this.element.method[idx].method != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.element.method[idx].method, 3)
                }
                this.editMethodItem.method = { name: this.element.method[idx].method, uuid: endLine }
            }
        },
        editMethodRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+idx)
            if (endLine != undefined && this.editMethodItem.method == null) {
                this.deleteLine(this.element.uuid+'/proviedMethod-'+idx)
                this.element.method[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodItem.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/proviedMethod-'+idx)
                this.newLine(this.element.uuid+'/proviedMethod-'+idx, this.element.uuid+'/proviedMethod', this.editMethodItem.method.uuid)
                this.element.method[idx].method = this.editMethodItem.method.name
            } else if (endLine == undefined && this.editMethodItem.method != null) {
                this.newLine(this.element.uuid+'/proviedMethod-'+idx, this.element.uuid+'/proviedMethod', this.editMethodItem.method.uuid)
                this.element.method[idx].method = this.editMethodItem.method.name
            }
            
            this.cancelMethodRef()
        },
        cancelMethodRef() {
            this.editMethodItem.method = null
            this.setactiveUUID()
        },
        addMethodRef() {
            if( this.editMethodItem.method != null) {
                var datacount = this.element.method.length
                this.newLine(this.element.uuid+'/proviedMethod-'+datacount, this.element.uuid+'/proviedMethod', this.editMethodItem.method.uuid)
                this.editMethodItem.method = this.editMethodItem.method.name
            }
            const addObj = Object.assign({}, this.editMethodItem)
            this.element.method.push(addObj);

            this.cancelMethodRef()
        },
        setMethodSelect() {
            if (this.isEditingMethod == true) {
                if (this.editMethodItem.method != null) {
                    this.$store.commit('setDetailView', {uuid: this.editMethodItem.method.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                }
                this.setMethodList()
                this.isEditingMethod = false
            } else {
                this.isEditingMethod = true
            }
        },
        setMethodList() {
            this.selMethodref = this.$store.getters.getDeploymentMethod
            this.setactiveUUID()
        },
        clearMethodRef() {
            this.isEditingMethod = true
            this.editMethodItem.method = null
        },

        addProvidEvent() {
            const editItem = { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Event Group_' + n++;
                res = this.element.eventG.some(ele => ele.name === addObj.name)
            }
            this.element.eventG.push(addObj)
            this.eventGroupTab = this.element.eventG.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
            }
        },
        clickEeventGroupTab() {
        },
        changeEeventGroupTab() {
            console.log('changeEeventGroupTab')
            if(this.element.eventG.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].name)}, 300);
            }
        },
        deleteEventGroup(idx) {
            var endLine, endS, endE
            console.log(this.element.eventG)
            if (this.element.eventG[idx].eventG != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+idx)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/providEventG-'+idx)
                }
            }
            if (this.element.eventG[idx].server != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+idx)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/providServer-'+idx)
                }
            }
            for(let i=idx+1; i<this.element.eventG.length; i++){
                endE = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+i)
                endS = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+i)
                if (endE != undefined) {
                    this.deleteLine(this.element.uuid+'/providEventG-'+i)
                    this.newLine(this.element.uuid+'/providEventG-'+(i-1), this.element.uuid+'/providE', endE)
                }
                if (endS != undefined) {
                    this.deleteLine(this.element.uuid+'/providServer-'+i)
                    this.newLine(this.element.uuid+'/providServer-'+(i-1), this.element.uuid+'/providE', endS)
                }
            }

            this.element.eventG.splice(idx, 1)
            this.changeEeventGroupTab()
        },
        clearEventG(item) {
            item.eventG = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+this.eventGroupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/providEventG-'+this.eventGroupTab)
            }
        },
        setEventGSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+this.eventGroupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.eventG, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
            }
        },
        setEventGList() {
            this.selEventG =  this.$store.getters.getEventGroup
            this.setactiveUUID()
        },
        setEventG(item, tab){
            if( tab.eventG != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+this.eventGroupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providEventG-'+this.eventGroupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providEventG-'+this.eventGroupTab, this.element.uuid+'/providEventG'+this.element.eventG[this.eventGroupTab].name, item.uuid)
                }
                tab.eventG = item.name
            }
            this.setactiveUUID()
        },
        clearServer(item) {
            item.server = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+this.eventGroupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/providServer-'+this.eventGroupTab)
            }
        },
        setServerSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+this.eventGroupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServerPath(item.server)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Server_str} )
            }
        },
        setServerList() {
            this.selServer =  this.$store.getters.getServer
            this.setactiveUUID()
        },
        setServer(item, tab){
            if( tab.server != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+this.eventGroupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providServer-'+this.eventGroupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providServer-'+this.eventGroupTab, this.element.uuid+'/providServer'+this.element.eventG[this.eventGroupTab].name, item.uuid)
                }
                tab.server = item.name
            }
            this.setactiveUUID()
        },
        newServer() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementServer', { 
                name: this.$store.getters.getNameServer, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                delaymax: '', delaymin: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPEvents_str)
            EventBus.$emit('add-element', constant.Server_str)
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:10} )
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