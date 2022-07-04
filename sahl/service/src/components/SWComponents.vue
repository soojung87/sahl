<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showSWComponent">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>SW Component Type</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>SW Component Type</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputSWComponentName' outlined dense></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showPort" x-small color="indigo">
                                    <v-icon>{{ isPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Port
                        </div>
                        <v-card-text v-if="isPortOpenClose">
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/pporttable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showPPort" x-small color="indigo">
                                            <v-icon>{{ isPPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    P Port Prototype
                                    <v-btn @click="isPPortCheckbox" text x-small color="indigo" v-if="isPPortOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isPPortOpenClose && isdeletePPort" @click="deletePPort" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isPPortOpenClose">  
                                    <v-data-table v-model="selectDelectPPort" :headers="headerPPort" :items="element.pport" :items-per-page='20'
                                            :show-select="isdeletePPort" item-key="id" height="100px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeletePPort" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openPPort(idx)" @cancel="editPPort(idx)" @save="cancelPPort" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editPPortItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editPPortItem.interface' label='Provided Interface Tref' :items='selServiceInterface' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingPPort"  @click="setPPortSelect()" @blur="isEditingPPort=true"
                                                                        @click:clear='clearPportRef' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newServiceInterface">
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
                                                        <v-edit-dialog large persistent cancel-text='Ok' save-text="Cancel" @cancel="addPPort()" @save="cancelPPort"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editPPortItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editPPortItem.interface' label='Provided Interface Tref' :items='selServiceInterface' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingPPort"  @click="setPPortSelect()" @blur="isEditingPPort=true"
                                                                        @click:clear='clearPportRef' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newServiceInterface">
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
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/prporttable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showPRPort" x-small color="indigo">
                                            <v-icon>{{ isPRPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    PR Port Prototype
                                    <v-btn @click="isPRPortCheckbox" text x-small color="indigo" v-if="isPRPortOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isPRPortOpenClose && isdeletePRPort" @click="deletePRPort" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isPRPortOpenClose">  
                                    <v-data-table v-model="selectDelectPRPort" :headers="headerPRPort" :items="element.prport" :items-per-page='20'
                                            :show-select="isdeletePRPort" item-key="id" height="100px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeletePRPort" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openPRPort(idx)" @cancel="editPRPort(idx)" @save="cancelPRPort" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editPRPortItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editPRPortItem.interface' label='Provided Required Interface Tref' :items='selServiceInterface' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingPRPort"  @click="setPRPortSelect()" @blur="isEditingPRPort=true"
                                                                        @click:clear='clearPRportRef' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newServiceInterface">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addPRPort()" @save="cancelPRPort"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editPRPortItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editPRPortItem.interface' label='Provided Required Interface Tref' :items='selServiceInterface' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingPRPort"  @click="setPRPortSelect()" @blur="isEditingPRPort=true"
                                                                        @click:clear='clearPRportRef' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newServiceInterface">
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
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/rporttable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showRPort" x-small color="indigo">
                                            <v-icon>{{ isRPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    R Port Prototype
                                    <v-btn @click="isRPortCheckbox" text x-small color="indigo" v-if="isRPortOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isRPortOpenClose && isdeleteRPort" @click="deleteRPort" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isRPortOpenClose">  
                                    <v-data-table v-model="selectDelectRPort" :headers="headerRPort" :items="element.rport" :items-per-page='20'
                                            :show-select="isdeleteRPort" item-key="id" height="100px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteRPort" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openRPort(idx)" @cancel="editRPort(idx)" @save="cancelRPort" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editRPortItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editRPortItem.interface' label='Required Interface Tref' :items='selServiceInterface' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingRPort"  @click="setRPortSelect()" @blur="isEditingRPort=true"
                                                                        @click:clear='clearRportRef' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newServiceInterface">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addRPort()" @save="cancelRPort"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editRPortItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editRPortItem.interface' label='Required Interface Tref' :items='selServiceInterface' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingRPort"  @click="setRPortSelect()" @blur="isEditingRPort=true"
                                                                        @click:clear='clearRportRef' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newServiceInterface">
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
            isPPortOpenClose: true,
            isPRPortOpenClose: true,
            isRPortOpenClose: true,
            isdeletePPort: false,
            isdeletePRPort: false,
            isdeleteRPort: false,
            isEditingPPort: true,
            isEditingPRPort: true,
            isEditingRPort: true,
            selectDelectPPort: [],
            selectDelectPRPort: [],
            selectDelectRPort: [],
            headerPPort: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Provided Interface', sortable: false, value: 'interface' },
            ],
            headerPRPort: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Provided Required Interface', sortable: false, value: 'interface' },
            ],
            headerRPort: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Required Interface', sortable: false, value: 'interface' },
            ],
            editPPortItem: { name: '', interface: null, id: ''},
            editPRPortItem: { name: '', interface: null, id: ''},
            editRPortItem: { name: '', interface: null, id: ''},
            defaultItem: { name:'', interface: null, id: ''},
            changeLinePPort : [],
            changeLinePRPort : [],
            changeLineRPort : [],

            selServiceInterface: this.$store.getters.getServiceInterface,
        }
    },
    mounted () {
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
        showSWComponent() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showPort() {
            this.isPortOpenClose = this.isPortOpenClose ? false : true
        },
        showPPort() {
            this.isPPortOpenClose = this.isPPortOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showPRPort() {
            this.isPRPortOpenClose = this.isPRPortOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showRPort() {
            this.isRPortOpenClose = this.isRPortOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        inputSWComponentName() {
            this.$store.commit('editSWComponents', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        isPPortCheckbox() {
            if (this.isdeletePPort == true) {
                this.selectDelectPPort = []
                this.isdeletePPort = false
            } else {
                this.isdeletePPort = true
            }
        },
        deletePPort() {
            if (this.isdeletePPort == true) {
                for(let i=0; i<this.element.pport.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pporttable-'+i)
                    if(endLine != undefined) {
                        this.changeLinePPort.push({id:this.element.pport[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/pporttable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'pPort', deletItemList: this.selectDelectPPort, path: this.element.path, name: this.element.name})
                this.element.pport = this.element.pport.filter(item => {
                         return this.selectDelectPPort.indexOf(item) < 0 })

                for(let n=0; n<this.element.pport.length; n++) {
                    for(let idx=0; idx<this.changeLinePPort.length; idx++) {
                        if (this.element.pport[n].id == this.changeLinePPort[idx].id) {
                            this.newLine(this.element.uuid+'/pporttable-'+n, this.element.uuid+'/pporttable', this.changeLinePPort[idx].endLine)
                        }
                    }
                }

                this.isdeletePPort = false
                this.selectDelectPPort = []
                this.changeLinePPort = []
            } 
        },
        openPPort(idx) {
            this.selServiceInterface = this.$store.getters.getServiceInterface
            this.editPPortItem.name = this.element.pport[idx].name
            if ( this.element.pport[idx].interface != null) {
                this.editPPortItem.interface = { name :this.element.pport[idx].interface, uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/pporttable-'+idx) }
            }
        },
        editPPort(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pporttable-'+idx)
            if (endLine != undefined && this.editPPortItem.interface == null) {
                this.deleteLine(this.element.uuid+'/pporttable-'+idx)
                this.element.pport[idx].interface = null
            } else if (endLine != undefined && endLine != this.editPPortItem.interface.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/pporttable-'+idx)
                this.newLine(this.element.uuid+'/pporttable-'+idx, this.element.uuid+'/pporttable', this.editPPortItem.interface.uuid)
                this.element.pport[idx].interface = this.editPPortItem.interface.name
            } else if (endLine == undefined && this.editPPortItem.interface != null) {
                this.newLine(this.element.uuid+'/pporttable-'+idx, this.element.uuid+'/pporttable', this.editPPortItem.interface.uuid)
                this.element.pport[idx].interface = this.editPPortItem.interface.name
            }

            if (this.element.pport[idx].name != this.editPPortItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'pPort', listname: this.editPPortItem.name} )
            }

            this.element.pport[idx].name = this.editPPortItem.name
            this.cancelPPort()
        },
        cancelPPort() {
            this.editPPortItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        addPPort() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport.some(item => item.id === n)
            }
            this.editPPortItem.id = n

            if (this.editPPortItem.interface != null) {
                var datacount = this.element.pport.length
                this.newLine(this.element.uuid+'/pporttable-'+datacount, this.element.uuid+'/pporttable', this.editPPortItem.interface.uuid)
                this.editPPortItem.interface = this.editPPortItem.interface.name
            }
            const addObj = Object.assign({}, this.editPPortItem);
            this.element.pport.push(addObj);
            this.cancelPPort()
        },
        setPPortSelect() {
            if (this.isEditingPPort == true) {
                console.log('setPPortSelect  >>' + this.editPPortItem.interface)
                if (this.editPPortItem.interface != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPPortItem.interface.uuid, element: constant.ServiceInterface_str} )
                }
                this.setServiceInterfaceList()
                this.isEditingPPort = false
            } else {
                this.isEditingPPort = true
            }
        },
        clearPportRef() {
            this.isEditingPPort = true
            this.editPPortItem.interface = null
        },

        isPRPortCheckbox() {
            if (this.isdeletePRPort == true) {
                this.selectDelectPRPort = []
                this.isdeletePRPort = false
            } else {
                this.isdeletePRPort = true
            }
        },
        deletePRPort() {
            if (this.isdeletePRPort == true) {
                for(let i=0; i<this.element.prport.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttable-'+i)
                    if(endLine != undefined) {
                        this.changeLinePRPort.push({id:this.element.prport[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/prporttable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'prPort', deletItemList: this.selectDelectPRPort, path: this.element.path, name: this.element.name})
                this.element.prport = this.element.prport.filter(item => {
                         return this.selectDelectPRPort.indexOf(item) < 0 })

                for(let n=0; n<this.element.prport.length; n++) {
                    for(let idx=0; idx<this.changeLinePRPort.length; idx++) {
                        if (this.element.prport[n].id == this.changeLinePRPort[idx].id) {
                            this.newLine(this.element.uuid+'/prporttable-'+n, this.element.uuid+'/prporttable', this.changeLinePRPort[idx].endLine)
                        }
                    }
                }

                this.isdeletePRPort = false
                this.selectDelectPRPort = []
                this.changeLinePRPort = []
            } 
        },
        openPRPort(idx) {
            this.selServiceInterface = this.$store.getters.getServiceInterface
            this.editPRPortItem.name = this.element.prport[idx].name
            if ( this.element.prport[idx].interface != null) {
                this.editPRPortItem.interface = { name :this.element.prport[idx].interface, uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttable-'+idx) }
            }
        },
        editPRPort(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttable-'+idx)
            if (endLine != undefined && this.editPRPortItem.interface == null) {
                this.deleteLine(this.element.uuid+'/prporttable-'+idx)
                this.element.prport[idx].interface = null
            } else if (endLine != undefined && endLine != this.editPRPortItem.interface.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/prporttable-'+idx)
                this.newLine(this.element.uuid+'/prporttable-'+idx, this.element.uuid+'/prporttable', this.editPRPortItem.interface.uuid)
                this.element.prport[idx].interface = this.editPRPortItem.interface.name
            } else if (endLine == undefined && this.editPRPortItem.interface != null) {
                this.newLine(this.element.uuid+'/prporttable-'+idx, this.element.uuid+'/prporttable', this.editPRPortItem.interface.uuid)
                this.element.prport[idx].interface = this.editPRPortItem.interface.name
            }

            if (this.element.prport[idx].name != this.editPRPortItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'prPort', listname: this.editPRPortItem.name} )
            }

            this.element.prport[idx].name = this.editPRPortItem.name
            this.cancelPRPort()
        },
        cancelPRPort() {
            this.editPRPortItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        addPRPort() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.prport.some(item => item.id === n)
            }
            this.editPRPortItem.id = n

            if (this.editPRPortItem.interface != null) {
                var datacount = this.element.prport.length
                this.newLine(this.element.uuid+'/prporttable-'+datacount, this.element.uuid+'/prporttable', this.editPRPortItem.interface.uuid)
                this.editPRPortItem.interface = this.editPRPortItem.interface.name
            }
            const addObj = Object.assign({}, this.editPRPortItem);
            this.element.prport.push(addObj);
            this.cancelPRPort()
        },
        setPRPortSelect() {
            if (this.isEditingPRPort == true) {
                if (this.editPRPortItem.interface != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPRPortItem.interface.uuid, element: constant.ServiceInterface_str} )
                }
                this.setServiceInterfaceList()
                this.isEditingPRPort = false
            } else {
                this.isEditingPRPort = true
            }
        },
        clearPRportRef() {
            this.isEditingPRPort = true
            this.editPRPortItem.interface = null
        },

        isRPortCheckbox() {
            if (this.isdeleteRPort == true) {
                this.selectDelectRPort = []
                this.isdeleteRPort = false
            } else {
                this.isdeleteRPort = true
            }
        },
        deleteRPort() {
            if (this.isdeleteRPort == true) {
                for(let i=0; i<this.element.rport.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rporttable-'+i)
                    if(endLine != undefined) {
                        this.changeLineRPort.push({id:this.element.rport[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/rporttable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'rPort', deletItemList: this.selectDelectRPort, path: this.element.path, name: this.element.name})
                this.element.rport = this.element.rport.filter(item => {
                         return this.selectDelectRPort.indexOf(item) < 0 })

                for(let n=0; n<this.element.rport.length; n++) {
                    for(let idx=0; idx<this.changeLineRPort.length; idx++) {
                        if (this.element.rport[n].id == this.changeLineRPort[idx].id) {
                            this.newLine(this.element.uuid+'/rporttable-'+n, this.element.uuid+'/rporttable', this.changeLineRPort[idx].endLine)
                        }
                    }
                }

                this.isdeleteRPort = false
                this.selectDelectRPort = []
                this.changeLineRPort = []
            } 
        },
        openRPort(idx) {
            this.selServiceInterface = this.$store.getters.getServiceInterface
            this.editRPortItem.name = this.element.rport[idx].name
            if ( this.element.rport[idx].interface != null) {
                this.editRPortItem.interface = { name :this.element.rport[idx].interface, uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/rporttable-'+idx) }
            }
        },
        editRPort(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rporttable-'+idx)
            if (endLine != undefined && this.editRPortItem.interface == null) {
                this.deleteLine(this.element.uuid+'/rporttable-'+idx)
                this.element.rport[idx].interface = null
            } else if (endLine != undefined && endLine != this.editRPortItem.interface.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/rporttable-'+idx)
                this.newLine(this.element.uuid+'/rporttable-'+idx, this.element.uuid+'/rporttable', this.editRPortItem.interface.uuid)
                this.element.rport[idx].interface = this.editRPortItem.interface.name
            } else if (endLine == undefined && this.editRPortItem.interface != null) {
                this.newLine(this.element.uuid+'/rporttable-'+idx, this.element.uuid+'/rporttable', this.editRPortItem.interface.uuid)
                this.element.rport[idx].interface = this.editRPortItem.interface.name
            }

            if (this.element.rport[idx].name != this.editRPortItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'rPort', listname: this.editRPortItem.name} )
            }

            this.element.rport[idx].name = this.editRPortItem.name
            this.cancelRPort()
        },
        cancelRPort() {
            this.editRPortItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        addRPort() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.rport.some(item => item.id === n)
            }
            this.editRPortItem.id = n

            if( this.editRPortItem.interface != null) {
                var datacount = this.element.rport.length
                this.newLine(this.element.uuid+'/rporttable-'+datacount, this.element.uuid+'/rporttable', this.editRPortItem.interface.uuid)
                this.editRPortItem.interface = this.editRPortItem.interface.name
            }
            const addObj = Object.assign({}, this.editRPortItem);
            this.element.rport.push(addObj);
            this.cancelRPort()
        },
        setRPortSelect() {
            if (this.isEditingRPort == true) {
                if (this.editRPortItem.interface != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRPortItem.interface.uuid, element: constant.ServiceInterface_str} )
                }
                this.setServiceInterfaceList()
                this.isEditingRPort = false
            } else {
                this.isEditingRPort = true
            }
        },
        clearRportRef() {
            this.isEditingRPort = true
            this.editRPortItem.interface = null
        },

        setServiceInterfaceList() {
            this.selServiceInterface = this.$store.getters.getServiceInterface
            this.setactiveUUID()
        },
        newServiceInterface() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementService', {
                    name: this.$store.getters.getNameServiceInterface, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10,  icon:"mdi-clipboard-outline", validation: false,
                    versionMaj:'', versionMin:'', namespace:'', events:[], fields:[], methods:[], isservice: '',
                })
            EventBus.$emit('add-element', constant.ServiceInterface_str)
            EventBus.$emit('add-element', constant.ServiceInterfaces_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
