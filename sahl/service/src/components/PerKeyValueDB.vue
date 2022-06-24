<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showPERKeyValueD">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Persistency Key Value DataBase</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Persistency Key Value DataBase</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputPERKeyValueDName' outlined dense  @click="setactiveUUID"></v-text-field>
                    <v-text-field v-model="element.maxSize" label="Max Allowed Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.miniSize" label="Minimun Sustained Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-select v-model="element.updateS" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                    <v-text-field v-model="element.uri" label="URI" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showRedundancy" x-small color="indigo">
                                    <v-icon>{{ isRedundancyOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Redundancy Handlings
                            <v-btn @click="isCheckRedundancy" text x-small color="indigo" v-if="isRedundancyOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isRedundancyOpenClose && isdeleteRedundancyItem" @click="deletRedundancy" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isRedundancyOpenClose">
                            <v-data-table v-model="selectDelectRedundancy" :headers="headerRedundancy" :items="element.redundancy" :items-per-page='20'
                                    :show-select="isdeleteRedundancyItem" item-key="name" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteRedundancyItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editRedundancy(idx)" @save="cancelRedundancy" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-select v-model="editItem.scope" :items="enumScope" clearable label="Scope" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editItem.m" label="M" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editItem.n" label="N" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addRedundancy()" @save="cancelRedundancy"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-select v-model="editItem.scope" :items="enumScope" clearable label="Scope" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-text-field v-model="editItem.m" label="M" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editItem.n" label="N" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                        <div class="subtitle-2" :id="element.uuid+'/PERKeyV'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showKeyValue" x-small color="indigo">
                                    <v-icon>{{ isKeyValueOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Key Value Pairs
                            <v-btn v-if="isKeyValueOpenClose" @click="addKeyValue" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isKeyValueOpenClose">
                        <v-tabs v-model='keyValueTab' show-arrows @change="changeKeyValueTab()">
                            <v-tab v-for="(tab, idx) in element.keyValue" :key="idx" @click="clickKeyValuetab()"> 
                                {{tab.name}}
                                <v-btn text x-small @click="deleteKeyValue(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="keyValueTab">
                            <v-tab-item v-for="(tab, idx) in element.keyValue" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputKeyValueName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        <v-select v-model="tab.update" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                        <v-row style="height: 70px">
                                            <v-col cols="10">
                                                <v-text-field v-model="tab.datatype" readonly @click="setDataTypeSelect()" clearable @click:clear='clearDataType()' label="Value Data Type Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-menu>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="deep-purple accent-4" :id="element.uuid+'/PERDBImple'+tab.name" icon v-bind="attrs" v-on="on" @click="setDataTypeList()">
                                                            <v-icon>mdi-menu-down-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list >
                                                        <v-list-item v-for="(item, i) in selImplementation" :key="i" link @click="setDataType(item)">
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                        </v-list-item>
                                                        <v-btn outlined color="indigo" dense text small block @click="newDataType()" >
                                                            <v-icon >mdi-plus</v-icon>New Item
                                                        </v-btn>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                        <v-card outlined class="mx-auto">
                                            <div class="subtitle-2" style="height:20px">
                                                <v-hover v-slot="{ hover }">
                                                    <v-btn text @click="showArray" x-small color="indigo">
                                                        <v-icon>{{ isArrayOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                    </v-btn>
                                                </v-hover>
                                                Array Value Specification
                                                <v-btn v-if="isArrayOpenClose" @click="isCheckArray" text x-small color="indigo">
                                                    <v-icon>mdi-check</v-icon>
                                                </v-btn>
                                                <v-btn  v-if="isdeleteArray && isArrayOpenClose" @click="deleteArray" text x-small color="indigo">
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-card-text v-show="isArrayOpenClose">
                                                <v-data-table v-model="selDeleteArray" :headers="headerArray" :items="tab.array" :items-per-page='20'
                                                        :show-select="isdeleteArray" item-key="value" height="100px" dense hide-default-footer >
                                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                    </template>
                                                    <template v-if="!isdeleteArray" v-slot:body="{ items, headers }">
                                                        <tbody>
                                                            <tr v-for="(item,idx) in items" :key="idx" >
                                                                <td v-for="(header,key) in headers" :key="key">
                                                                    <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openArray(idx)" @cancel="editArray(idx)" @save="cancelArray" large >
                                                                        {{item[header.value]}}
                                                                        <template v-slot:input>
                                                                            <br> 
                                                                            <v-text-field v-model="editArrayItem.value" label="Value" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                        </template>
                                                                    </v-edit-dialog>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th colspan="3">
                                                                    <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addArray()" @save="cancelArray"> 
                                                                        <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                        <template v-slot:input>
                                                                            <br>
                                                                            <v-text-field v-model="editArrayItem.value" label="Value" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                            <div class="subtitle-2" style="height:20px">
                                                <v-hover v-slot="{ hover }">
                                                    <v-btn text @click="showNumerical" x-small color="indigo">
                                                        <v-icon>{{ isNumericalOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                    </v-btn>
                                                </v-hover>
                                                Numerical Value Specification
                                                <v-btn v-if="isNumericalOpenClose" @click="isCheckNumerical" text x-small color="indigo">
                                                    <v-icon>mdi-check</v-icon>
                                                </v-btn>
                                                <v-btn  v-if="isdeleteNumerical && isNumericalOpenClose" @click="deleteNumerical" text x-small color="indigo">
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-card-text v-show="isNumericalOpenClose">
                                                <v-data-table v-model="selDeleteNumerical" :headers="headerNumeri" :items="tab.numerical" :items-per-page='20'
                                                        :show-select="isdeleteNumerical" item-key="value" height="100px" dense hide-default-footer >
                                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                    </template>
                                                    <template v-if="!isdeleteNumerical" v-slot:body="{ items, headers }">
                                                        <tbody>
                                                            <tr v-for="(item,idx) in items" :key="idx" >
                                                                <td v-for="(header,key) in headers" :key="key">
                                                                    <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openNumerical(idx)" @cancel="editNumerical(idx)" @save="cancelNumerical" large >
                                                                        {{item[header.value]}}
                                                                        <template v-slot:input>
                                                                            <br>
                                                                            <v-text-field v-model="editNumeriItem.value" label="Value" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                        </template>
                                                                    </v-edit-dialog>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th colspan="3">
                                                                    <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addNumerical()" @save="cancelNumerical"> 
                                                                        <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                        <template v-slot:input>
                                                                            <br>
                                                                            <v-text-field v-model="editNumeriItem.value" label="Value" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
            isRedundancyOpenClose: true,
            isKeyValueOpenClose: true,
            isdeleteRedundancyItem: false,
            enumScope: ['PERSISTENCY-REDUNDANCY-HANDLING-SCOPE-DATABASE', 'PERSISTENCY-REDUNDANCY-HANDLING-SCOPE-ELEMENT','PERSISTENCY-REDUNDANCY-HANDLING-SCOPE-STORAGE'],
            strategy: ['DELETE', 'KEEPEXISTING', 'OVERWRITE'],
            selectDelectRedundancy: [],
            headerRedundancy: [
                { text: 'Scope', align: 'start', sortable: false, value: 'scope' },
                { text: 'M', align: 'start', sortable: false, value: 'm' },
                { text: 'N', align: 'start', sortable: false, value: 'n' },
            ],
            editItem: { scope : null, m: '', n: ''},

            keyValueTab: 0,
            isArrayOpenClose: true,
            isNumericalOpenClose: true,
            isdeleteArray: false,
            isdeleteNumerical: false,
            selDeleteArray:[],
            selDeleteNumerical: [],
            headerArray: [
                { text: 'Value', align: 'start', sortable: false, value: 'value' },
            ],
            headerNumeri: [
                { text: 'Value', align: 'start', sortable: false, value: 'value' },
            ],
            editArrayItem: { value: null},
            editNumeriItem: { value: null},
            selImplementation: this.$store.getters.getImplementationDataType,
        }
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
        showPERKeyValueD() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.element.keyValue.length > 0) {
                        if (this.isKeyValueOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'PERKeyV', this.element.uuid, this.keyValueTab, this.element.keyValue[this.keyValueTab].name)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'PERKeyV', this.element.uuid, null)
                        }
                    }
                }
            })

        },
        showRedundancy() {
            this.isRedundancyOpenClose = this.isRedundancyOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showKeyValue() { 
            this.isKeyValueOpenClose = this.isKeyValueOpenClose ? false : true
            if(this.element.keyValue.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isKeyValueOpenClose ) {
                        EventBus.$emit('changeLine-someipService', 'PERKeyV', this.element.uuid, this.keyValueTab, this.element.keyValue[this.keyValueTab].name)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'PERKeyV', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        inputPERKeyValueDName() {
            this.$store.commit('editPERKeyValueD', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        isCheckRedundancy() {
            if (this.isdeleteRedundancyItem == true) {
                this.isdeleteRedundancyItem = false
                this.selectDelectRedundancy = []
            } else {
                this.isdeleteRedundancyItem = true
            }
        },
        deletRedundancy() {
            if (this.isdeleteRedundancyItem == true) {
                this.element.redundancy = this.element.redundancy.filter(item => {
                        return this.selectDelectRedundancy.indexOf(item) < 0 })

                this.isdeleteRedundancyItem = false
                this.selectDelectRedundancy = []
            } 
        },
        editRedundancy(idx) {
            this.element.redundancy[idx].scope = this.editItem.scope
            this.element.redundancy[idx].m = this.editItem.m
            this.element.redundancy[idx].n = this.editItem.n
            this.cancelRedundancy()
        },
        cancelRedundancy() {
            this.editItem.scope = null
            this.editItem.m = ''
            this.editItem.n = ''
            this.setactiveUUID()
        },
        addRedundancy() {
            const addObj = Object.assign({}, this.editItem)
            this.element.redundancy.push(addObj)
            this.cancelRedundancy()
        },

        setDataTypeSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyV-'+this.keyValueTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getImplementationPath(this.element.keyValue[this.keyValueTab].datatype)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Implementation_str} )
            }
        },
        newDataType() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation, input: false, path: '',
                    top: elementY, left: elementX,  zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', 
                    typeref: null, templatetype:null, desc:'', ddpc:[], idtelement:[],
            })
            EventBus.$emit('add-element', constant.Implementation_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editPERKeyValueD', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        clearDataType() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyV-'+this.keyValueTab)
            if (endLine != undefined) {
                this.element.keyValue[this.keyValueTab].datatype = null
                this.deleteLine(this.element.uuid+'/PERKeyV-'+this.keyValueTab)
            }
        },
        setDataTypeList() {
            this.selImplementation = this.$store.getters.getImplementationDataType
            this.setactiveUUID()
        },
        setDataType(item) {
            if( this.element.keyValue[this.keyValueTab].datatype != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyV-'+this.keyValueTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PERKeyV-'+this.keyValueTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/PERKeyV-'+this.keyValueTab, this.element.uuid+'/PERDBImple'+this.element.keyValue[this.keyValueTab].name, item.uuid)
                }
                this.element.keyValue[this.keyValueTab].datatype = item.name
            }
            this.setactiveUUID()
        },

        showArray() {
            this.isArrayOpenClose = this.isArrayOpenClose ? false : true
        },
        showNumerical() {
            this.isNumericalOpenClose = this.isNumericalOpenClose ? false : true
        },
        isCheckArray() {
            if (this.isdeleteArray == true) {
                this.isdeleteArray = false
                this.selDeleteArray = []
            } else {
                this.isdeleteArray = true
            }
        },
        deleteArray() {
            if (this.isdeleteArray == true) {
                this.element.keyValue[this.keyValueTab].array = this.element.keyValue[this.keyValueTab].array.filter(item => {
                        return this.selDeleteArray.indexOf(item) < 0 })

                this.isdeleteArray = false
                this.selDeleteArray = []
            } 
        },
        openArray(idx) {
            this.editArrayItem.value = this.element.keyValue[this.keyValueTab].array[idx].value
        },
        editArray(idx) {
            this.element.keyValue[this.keyValueTab].array[idx].value = this.editArrayItem.value
            this.cancelArray()
        },
        cancelArray() {
            this.editArrayItem.value = ''
            this.setactiveUUID()
        },
        addArray() {
            const addObj = Object.assign({}, this.editArrayItem)
            this.element.keyValue[this.keyValueTab].array.push(addObj)
            this.cancelArray()
        },

        isCheckNumerical() {
            if (this.isdeleteNumerical == true) {
                this.isdeleteNumerical = false
                this.selDeleteNumerical = []
            } else {
                this.isdeleteNumerical = true
            }
        },
        deleteNumerical() {
            if (this.isdeleteNumerical == true) {
                this.element.keyValue[this.keyValueTab].numerical = this.element.keyValue[this.keyValueTab].numerical.filter(item => {
                        return this.selDeleteNumerical.indexOf(item) < 0 })

                this.isdeleteNumerical = false
                this.selDeleteNumerical = []
            } 
        },
        openNumerical(idx) {
            this.editNumeriItem.value = this.element.keyValue[this.keyValueTab].numerical[idx].value
        },
        editNumerical(idx) {
            this.element.keyValue[this.keyValueTab].numerical[idx].value = this.editNumeriItem.value
            this.cancelNumerical()
        },
        cancelNumerical() {
            this.editNumeriItem.value = ''
            this.setactiveUUID()
        },
        addNumerical() {
            const addObj = Object.assign({}, this.editNumeriItem)
            this.element.keyValue[this.keyValueTab].numerical.push(addObj)
            this.cancelNumerical()
        },

        addKeyValue() {
            const editKeyValueItem = { name: '', update: null, datatype: null, array: [], numerical: []}
            const addObj = new Object(editKeyValueItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'KeyVlaue_' + n++;
                res = this.element.keyValue.some(ele => ele.name === addObj.name)
            }
            this.element.keyValue.push(addObj)
            this.keyValueTab = this.element.keyValue.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'PERKeyV', this.element.uuid, null)
            }
        },
        clickKeyValuetab() {
            this.selDeleteArray = []
            this.selDeleteNumerical = []
            this.isdeleteArray = false
            this.isdeleteNumerical = false
            this.isArrayOpenClose = true
            this.isNumericalOpenClose = true
        },
        changeKeyValueTab() {
            if(this.element.keyValue.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'PERKeyV', this.element.uuid, this.keyValueTab, this.element.keyValue[this.keyValueTab].name)}, 300);
            }
        },
        deleteKeyValue(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyV-'+idx)
            if(endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PERKeyV-'+idx)
            }
            for(let i=idx+1; i<this.element.keyValue.length; i++){
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyV-'+i)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/PERKeyV-'+i)
                    this.newLine(this.element.uuid+'/PERKeyV-'+(i-1), this.element.uuid+'/PERKeyV', endLine)
                }
            }

            this.element.keyValue.splice(idx, 1)
            this.changeMethodTab()
        },
        inputKeyValueName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'PERDBKeyV', listname: name} )
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPERKeyValueD', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
