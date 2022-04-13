<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showRequiredSomeIP">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Required SomeIP Service Instance</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Required SomeIP Service Instance</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-show="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputRequiredSomeIPName' outlined dense></v-text-field>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.deployref" readonly @click="setSIDeploymentSelect()" clearable @click:clear='clearSIDeployment()' label="Service Interface Deployment Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredDeploy'" dark icon v-bind="attrs" v-on="on" @click="setSIDeploymentList()">
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
                    <v-text-field v-model="element.minorver" label="Required Minor Version" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.serviceInsid" label="Required Service Instance ID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.someipclient" readonly @click="setSomeIPClientSelect()" clearable @click:clear='clearSomeIPClient()' label="SD Client Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredSomeIPC'" dark icon v-bind="attrs" v-on="on" @click="setSomeIPClientList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selSomeIPClient" :key="i" link @click="setSomeIPClient(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newSomeIPClient" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-select v-model="element.version" :items="enumVersion" clearable label="Version Driven Find Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/requiredMethod'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showMethodRef" x-small color="indigo">
                                    <v-icon>{{ isMethodRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Method Request Propss
                            <v-btn @click="isCheckMethodRef" text x-small color="indigo" v-if="isMethodRefOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isMethodRefOpenClose && isdeleteMethodRef" @click="deletMethodRef" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isMethodRefOpenClose">
                            <v-data-table v-model="selectMethodRef" :headers="headerMethodRef" :items="methodItem"
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
                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/requiredE'">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showRequiredEvent" x-small color="indigo">
                                    <v-icon>{{ isRequiredEventOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            SomeIP Required Event Group
                            <v-btn v-if="isRequiredEventOpenClose" @click="addRequiredEvent" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-tabs v-model='eventGroupTab' v-show="isRequiredEventOpenClose" show-arrows @change="changeEeventGroupTab()">
                            <v-tab v-for="(tab, idx) in eventGroupItem" :key="idx" @click="clickEeventGroupTab()"> 
                                {{tab.name}}
                                <v-btn text x-small @click="deleteEventGroup(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="eventGroupTab" v-show="isRequiredEventOpenClose">
                            <v-tab-item v-for="(tab, idx) in eventGroupItem" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-text-field v-model="tab.name" label="name" :rules="rules.name" @input='inputEventGName(tab.name)' @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                        <v-row style="height: 45px">
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.eventG" readonly @click="setEventGSelect(tab)" clearable @click:clear='clearEventG(tab)' label="Event Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredEventG'+tab.name" icon v-bind="attrs" v-on="on" @click="setEventGList()">
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
                                        <v-row>
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.client" readonly @click="setClientSelect(tab)" clearable @click:clear='clearClient(tab)' label="SD Client Event Group Timing Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredClient'+tab.name" icon v-bind="attrs" v-on="on" @click="setClientList()">
                                                            <v-icon>mdi-menu-down-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item v-for="(item, i) in selClient" :key="i" link @click="setClient(item, tab)">
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                        </v-list-item>
                                                        <v-btn outlined color="indigo" dense text small block @click="newClient" >
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
            isMethodRefOpenClose: true,
            isRequiredEventOpenClose: true,
            selSIDeployment: this.$store.getters.getSIDeployment,
            selSomeIPClient: this.$store.getters.getSomeIPClient,
            enumVersion: ['MINIMUM-MINOR-VERSION',],

            selectMethodRef: [],
            headerMethodRef: [
                { text: 'SomeIP Method Props', align: 'start', sortable: false, value: 'method' },
            ],
            methodItem: [],
            editMethodItem: { method : null},
            isdeleteMethodRef: false,
            selMethodref: this.$store.getters.getDeploymentMethod,
            isEditingMethod: true,
            deleteMethodLine: [],

            eventGroupTab: 0,
            eventGroupItem: [],
            selEventG: this.$store.getters.getEventGroup,
            selClient: this.$store.getters.getClient,
        }
    },
    mounted () {
        this.$nextTick(() => {
            if(this.element.method != undefined) {
                this.methodItem = this.element.method.slice()
            }
            if(this.element.requiredevent != undefined) {
                this.eventGroupItem = this.element.requiredevent.slice()
            }
        })
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: true} )
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
            } else {
                this.colorToolbar = "#6A5ACD"
            }
        },
        showRequiredSomeIP () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.eventGroupItem.length > 0) {
                        if (this.isRequiredEventOpenClose) {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.eventGroupTab, this.eventGroupItem[this.eventGroupTab].name)
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
        showRequiredEvent() {
            this.isRequiredEventOpenClose = this.isRequiredEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            if(this.eventGroupItem.length > 0) {
                this.$nextTick(() => {
                    if(this.isRequiredEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.eventGroupTab, this.eventGroupItem[this.eventGroupTab].name)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        inputRequiredSomeIPName () {
            this.$store.commit('editRequiredSomeIP', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: true} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearSIDeployment() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
            if (endLine != undefined) {
                this.element.deployref = null
                this.deleteLine(this.element.uuid+'/requiredDeploy')
            }
        },
        setSIDeploymentSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredDeploy')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredDeploy', this.element.uuid+'/requiredDeploy', item.uuid)
                }
                this.element.deployref = item.name
            }
            this.setactiveUUID()
        },
        newSIDeployment() {
            this.$store.commit('addElementSomeIPService', {
                name: this.$store.getters.getNameSomeIPService, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                service: null, majversion:'', minversion:'', id: '', eventG:null, eventD: null, methodD:null, fieldD:null,
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInterfaces_str)
            EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearSomeIPClient() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
            if (endLine != undefined) {
                this.element.someipclient = null
                this.deleteLine(this.element.uuid+'/requiredSomeIPC')
            }
        },
        setSomeIPClientSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSomeIPClientPath(this.element.someipclient)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPClient_str} )
            }
        },
        setSomeIPClientList() {
            this.selSomeIPClient = this.$store.getters.getSomeIPClient
            this.setactiveUUID()
        },
        setSomeIPClient(item){
            if( this.element.someipclient != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredSomeIPC')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredSomeIPC', this.element.uuid+'/requiredSomeIPC', item.uuid)
                }
                this.element.someipclient = item.name
            }
            this.setactiveUUID()
        },
        newSomeIPClient() {
                this.$store.commit('addElementSomeIPClient', { 
                name: this.$store.getters.getNameSomeIPClient, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                findtime: '', inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.SomeIPClient_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
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
                for(let i=0; i<this.methodItem.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+i)
                    if(endLine != undefined) {
                        this.deleteMethodLine.push({name:this.methodItem[i].method, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/requiredMethod-'+i)
                    }
                }

                this.methodItem = this.methodItem.filter(item => {
                        return this.selectMethodRef.indexOf(item) < 0 })

                for(let n=0; n<this.methodItem.length; n++) {
                    for(let idx=0; idx<this.deleteMethodLine.length; idx++) {
                        if (this.methodItem[n].method == this.deleteMethodLine[idx].name) {
                            this.newLine(this.element.uuid+'/requiredMethod-'+n, this.element.uuid+'/requiredMethod', this.deleteMethodLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteMethodRef = false
                this.selectMethodRef = []
                this.deleteMethodLine = []
                this.inputMethodItem()
            } 
        },
        inputMethodItem() {
            this.$store.commit('editRequiredSomeIP', {compo:"method", uuid:this.element.uuid, methodref: this.methodItem} )
        },
        openMethodRef(idx) {
            this.selMethodref = this.$store.getters.getDeploymentMethod

            if ( this.methodItem[idx].method != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.methodItem[idx].method, 3)
                }
                this.editMethodItem.method = { name: this.methodItem[idx].method, uuid: endLine }
            }
        },
        editMethodRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+idx)
            if (endLine != undefined && this.editMethodItem.method == null) {
                this.deleteLine(this.element.uuid+'/requiredMethod-'+idx)
                this.methodItem[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodItem.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/requiredMethod-'+idx)
                this.newLine(this.element.uuid+'/requiredMethod-'+idx, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid)
                this.methodItem[idx].method = this.editMethodItem.method.name
            } else if (endLine == undefined && this.editMethodItem.method != null) {
                this.newLine(this.element.uuid+'/requiredMethod-'+idx, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid)
                this.methodItem[idx].method = this.editMethodItem.method.name
            }
            
            this.cancelMethodRef()
            this.inputMethodItem()
        },
        cancelMethodRef() {
            this.editMethodItem.method = null
            this.setactiveUUID()
        },
        addMethodRef() {
            if( this.editMethodItem.method != null) {
                var datacount
                if(this.methodItem == undefined) {
                    datacount = 0
                }else {
                    datacount = this.methodItem.length
                }
                this.newLine(this.element.uuid+'/requiredMethod-'+datacount, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid)
                this.editMethodItem.method = this.editMethodItem.method.name
            }
            const addObj = Object.assign({}, this.editMethodItem)
            this.methodItem.push(addObj);

            this.cancelMethodRef()
            this.inputMethodItem()
        },
        setMethodSelect() {
            if (this.isEditingMethod == true) {
                if (this.editMethodItem.method != null && this.editMethodItem.method.uuid != null) {
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

        inputEventGName(name) {
            this.$store.commit('editRequiredSomeIP', {compo:"Event name", uuid:this.element.uuid, name: name, tab: this.eventGroupTab} )
        },
        inputEventGroupItem() {
            this.$store.commit('editRequiredSomeIP', {compo:"Required Event", uuid:this.element.uuid, eventG: this.eventGroupItem} )
        },
        addRequiredEvent() {
            const editItem = { name: '', eventG: null, client: null}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Event Group_' + n++;
                res = this.eventGroupItem.some(ele => ele.name === addObj.name)
            }
            this.eventGroupItem.push(addObj)
            this.eventGroupTab = this.eventGroupItem.length-1
            this.inputEventGroupItem()
            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
        },
        clickEeventGroupTab() {},
        changeEeventGroupTab() {
            if(this.eventGroupItem.length > 0) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.eventGroupTab, this.eventGroupItem[this.eventGroupTab].name)}, 300);
            }
        },
        deleteEventGroup(idx) {
            var endLine
            if (this.eventGroupItem[idx].eventG != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+idx)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+idx)
                }
            }
            if (this.eventGroupItem[idx].client != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+idx)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredClient-'+idx)
                }
            }
            this.eventGroupItem.splice(idx, 1)
            this.inputEventGroupItem()
        },
        clearEventG(item) {
            item.eventG = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
            }
            this.inputEventGroupItem()
        },
        setEventGSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab, this.element.uuid+'/requiredEventG'+this.eventGroupItem[this.eventGroupTab].name, item.uuid)
                }
                tab.eventG = item.name
                this.inputEventGroupItem()
            }
            this.setactiveUUID()
        },
        clearClient(item) {
            item.client = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
            }
            this.inputEventGroupItem()
        },
        setClientSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getClientPath(item.client)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Client_str} )
            }
        },
        setClientList() {
            this.selClient =  this.$store.getters.getClient
            this.setactiveUUID()
        },
        setClient(item, tab){
            if( tab.client != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab, this.element.uuid+'/requiredClient'+this.eventGroupItem[this.eventGroupTab].name, item.uuid)
                }
                tab.client = item.name
                this.inputEventGroupItem()
            }
            this.setactiveUUID()
        },
        newClient() {
            this.$store.commit('addElementClient', { 
                name: this.$store.getters.getNameClient, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300 , zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                delay: '', max: '', timetolive: '', delaymax: '', delaymin:''
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPEvents_str)
            EventBus.$emit('add-element', constant.Client_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:10} )
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