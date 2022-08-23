<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Persistency Key Value DataBase</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPERKeyValueDName' outlined dense  @click="setactiveUUID"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/PERKeyDSDG'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showSDGS" x-small color="indigo">
                                            <v-icon>{{ isSDGSOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Admin Data
                                    <v-btn @click="isCheckSDGS" text x-small color="indigo" v-if="isSDGSOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isSDGSOpenClose && isdeleteSDGSItem" @click="deletSDGS" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isSDGSOpenClose">
                                    <v-data-table v-model="selectDelectSDGS" :headers="headerSDGS" :items="element.sdgs" :items-per-page='20'
                                            :show-select="isdeleteSDGSItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSDGSItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openSDGS(idx)" @cancel="editSDGS(idx)" @save="cancelSDGS" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSDGSItem.sdg' label='SDG' :items='selSDG' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object @click:clear='clearSDGS' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 1" v-model="editSDGSItem.sd" :items="enumSD" label="SD" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-autocomplete v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 2" v-model='editSDGSItem.port' label='SDX Reference' :items='selPort' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingPort" clearable @click="setPortSelect()" 
                                                                            @click:clear='clearPort' @blur="isEditingPort=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addSDGS()" @save="cancelSDGS"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSDGSItem.sdg' label='SDG' :items='selSDG' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object @click:clear='clearSDGS' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 1" v-model="editSDGSItem.sd" :items="enumSD" label="SD" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-autocomplete v-if="editSDGSItem.sdg !=null && editSDGSItem.sdg.uuid == 2" v-model='editSDGSItem.port' label='SDX Reference' :items='selPort' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingPort" clearable @click="setPortSelect()" 
                                                                            @click:clear='clearPort' @blur="isEditingPort=true" outlined dense style="height: 45px;">
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
                                            :show-select="isdeleteRedundancyItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteRedundancyItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openRedundancy(idx)" @cancel="editRedundancy(idx)" @save="cancelRedundancy" large >
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
                                                                :show-select="isdeleteArray" item-key="id" height="140px" dense hide-default-footer >
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
                                                                :show-select="isdeleteNumerical" item-key="id" height="140px" dense hide-default-footer >
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
            isRedundancyOpenClose: true,
            isKeyValueOpenClose: true,
            isdeleteRedundancyItem: false,
            enumScope: ['PERSISTENCY-REDUNDANCY-HANDLING-SCOPE-DATABASE', 'PERSISTENCY-REDUNDANCY-HANDLING-SCOPE-ELEMENT','PERSISTENCY-REDUNDANCY-HANDLING-SCOPE-STORAGE'],
            strategy: ['DELETE', 'KEEPEXISTING', 'OVERWRITE'],

            isSDGSOpenClose: true,
            isdeleteSDGSItem: false,
            selectDelectSDGS: [],
            headerSDGS: [
                { text: 'SDG', align: 'start', sortable: false, value: 'sdg' },
                { text: 'SD', align: 'start', sortable: false, value: 'sd' },
                { text: 'SDX Ref', align: 'start', sortable: false, value: 'port' },
            ],
            editSDGSItem: { sdg: null, sd : null, port: null, id: ''},
            selSDG: [{name:"DATA-ENCRYPTION", uuid:1},{name:"PERSISTENCY-DEPLOYMENT-EXTENSION", uuid:2},],
            enumSD: ['Yes', 'No'],
            selPort: this.$store.getters.getPRPortPrototype,
            isEditingPort: true,
            deleteChangeLine: [],

            selectDelectRedundancy: [],
            headerRedundancy: [
                { text: 'Scope', align: 'start', sortable: false, value: 'scope' },
                { text: 'M', align: 'start', sortable: false, value: 'm' },
                { text: 'N', align: 'start', sortable: false, value: 'n' },
            ],
            editItem: { scope : null, m: '', n: '', id:''},

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
            editArrayItem: { value: null, id:''},
            editNumeriItem: { value: null, id:''},
            selImplementation: this.$store.getters.getImplementationDataType,
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
        showSDGS() {
            this.isSDGSOpenClose = this.isSDGSOpenClose ? false : true
            EventBus.$emit('drawLine')
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

        isCheckSDGS() {
            if (this.isdeleteSDGSItem == true) {
                this.isdeleteSDGSItem = false
                this.selectDelectSDGS = []
            } else {
                this.isdeleteSDGSItem = true
            }
        },
        deletSDGS() {
            if (this.isdeleteSDGSItem == true) {
                for(let i=0; i<this.element.sdgs.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyDSDG-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({id:this.element.sdgs[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/PERKeyDSDG-'+i)
                    }
                }

                this.element.sdgs = this.element.sdgs.filter(item => {
                        return this.selectDelectSDGS.indexOf(item) < 0 })

                for(let n=0; n<this.element.sdgs.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.sdgs[n].id == this.deleteChangeLine[idx].id) {
                            this.newLine(this.element.uuid+'/PERKeyDSDG-'+n, this.element.uuid+'/PERKeyDSDG', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteSDGSItem = false
                this.selectDelectSDGS = []
                this.deleteChangeLine = []
            } 
        },
        editSDGS(idx) {
            var endLine
            this.element.sdgs[idx].sdg = this.editSDGSItem.sdg.name
            if (this.element.sdgs[idx].sdg == "DATA-ENCRYPTION") {
                this.element.sdgs[idx].sd = this.editSDGSItem.sd
                if (this.editSDGSItem.port != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyDSDG-'+idx)
                    if (endLine != undefined) {
                        this.deleteLine(this.element.uuid+'/PERKeyDSDG-'+idx)
                        this.element.sdgs[idx].port = null
                    } 
                }
            } else if (this.element.sdgs[idx].sdg == "PERSISTENCY-DEPLOYMENT-EXTENSION"){
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyDSDG-'+idx)
                if (endLine != undefined && this.editSDGSItem.port == null) {
                    this.deleteLine(this.element.uuid+'/PERKeyDSDG-'+idx)
                    this.element.sdgs[idx].port = null
                } else if (endLine != undefined && endLine != this.editSDGSItem.port.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/PERKeyDSDG-'+idx)
                    this.newLine(this.element.uuid+'/PERKeyDSDG-'+idx, this.element.uuid+'/PERKeyDSDG', this.editSDGSItem.port.uuid)
                    this.element.sdgs[idx].port = this.editSDGSItem.port.name
                } else if (endLine == undefined && this.editSDGSItem.port != null && this.editSDGSItem.port.uuid != null) {
                    this.newLine(this.element.uuid+'/PERKeyDSDG-'+idx, this.element.uuid+'/PERKeyDSDG', this.editSDGSItem.port.uuid)
                    this.element.sdgs[idx].port = this.editSDGSItem.port.name
                }
                this.element.sdgs[idx].sd = null
            }

            this.cancelSDGS()
        },
        cancelSDGS() {
            this.editSDGSItem.sdg = null
            this.editSDGSItem.sd = null
            this.editSDGSItem.port = null
            this.editSDGSItem.id = ''
            this.setactiveUUID()
        },
        openSDGS(idx) {
            var id = null
            if (this.element.sdgs[idx].sdg == "DATA-ENCRYPTION") {
                id = 1
                this.editSDGSItem.sd = this.element.sdgs[idx].sd
            } else if (this.element.sdgs[idx].sdg == "PERSISTENCY-DEPLOYMENT-EXTENSION"){
                id = 2
                this.selPort = this.$store.getters.getPRPortPrototype
                if ( this.element.sdgs[idx].port != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERKeyDSDG-'+idx)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getSWComponentPath(this.element.sdgs[idx].port, 3)
                    }
                    this.editSDGSItem.port = { name: this.element.sdgs[idx].port, uuid: endLine }
                }
            }
            this.editSDGSItem.sdg = { name: this.element.sdgs[idx].sdg, uuid: id}
        },
        addSDGS() {
            let res = true, n = 0
            var datacount = this.element.sdgs.length
            while (res) {
                n++
                res = this.element.sdgs.some(item => item.id === n)
            }
            this.editSDGSItem.id = n
            this.editSDGSItem.sdg = this.editSDGSItem.sdg.name
            if( this.editSDGSItem.port != null) {
                this.newLine(this.element.uuid+'/PERKeyDSDG-'+datacount, this.element.uuid+'/PERKeyDSDG', this.editSDGSItem.port.uuid)
                this.editSDGSItem.port = this.editSDGSItem.port.name
            }

            const addObj = Object.assign({}, this.editSDGSItem)
            this.element.sdgs.push(addObj)
            this.cancelSDGS()
        },
        clearSDGS() {
            this.editSDGSItem.sdg = null
        },
        setPortSelect() {            
            if (this.isEditingPort == true) {
                if (this.editSDGSItem.port != null && this.editSDGSItem.port.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSDGSItem.port.uuid, element: constant.SWComponents_str} )
                    document.getElementById(this.editSDGSItem.port.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSDGSItem.port.uuid)
                }
                this.setPortList()
                this.isEditingPort = false
            } else {
                this.isEditingPort = true
            }
        },
        setPortList() {
            this.selPort = this.$store.getters.getPRPortPrototype
            this.setactiveUUID()
        },
        clearPort() {
            this.isEditingPort = true
            this.editSDGSItem.port = null
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
        openRedundancy(idx) {
            this.editItem.scope = this.element.redundancy[idx].scope
            this.editItem.m = this.element.redundancy[idx].m
            this.editItem.n = this.element.redundancy[idx].n
        },
        addRedundancy() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.redundancy.some(item => item.id === n)
            }
            this.editItem.id = n

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
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        newDataType() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation, path: '',
                    top: elementY, left: elementX,  zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', traceName: '', trace: [],
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
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.keyValue[this.keyValueTab].array.some(item => item.id === n)
            }
            this.editArrayItem.id = n

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
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.keyValue[this.keyValueTab].numerical.some(item => item.id === n)
            }
            this.editNumeriItem.id = n

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
            if(this.element.keyValue.length > 0 && this.location == 1 && this.keyValueTab != undefined) {
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
        },
        inputKeyValueName(/*name*/) {
            /*this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'PERDBKeyV', listname: name} )*/
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
