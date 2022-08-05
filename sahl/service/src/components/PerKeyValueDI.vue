<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showPERKeyValueDI">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Persistency Key Value Database Interface</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Persistency Key Value Database Interface</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPERKeyValueDIName' outlined dense></v-text-field>
                            <v-text-field v-model="element.minisize" label="Minimun Sustained Size" placeholder="Integer" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-select v-model="element.redundancy" :items="enumRedundancy" clearable label="Redundance" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-select v-model="element.updateS" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/PERData'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showDataElement" x-small color="indigo">
                                            <v-icon>{{ isDataOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Data Element
                                    <v-btn @click="isCheckData" text x-small color="indigo" v-if="isDataOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isDataOpenClose && isdeleteDataItem" @click="deletData" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isDataOpenClose">
                                    <v-data-table v-model="selectDelectData" :headers="headerPersistency" :items="element.data" :items-per-page='20'
                                            :show-select="isdeleteDataItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteDataItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editData(idx)" @open="openData(idx)" @save="cancelData" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editItem.type' label='Type Tref' :items='selImplementation' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingType" clearable @click="setTypeSelect()" 
                                                                            @click:clear='clearTypeRef' @blur="isEditingType=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newImplementation">
                                                                            <v-icon>mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-select v-model="editItem.strategy" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addData()" @save="cancelData"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editItem.type' label='Type Tref' :items='selImplementation' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingType" clearable @click="setTypeSelect()" 
                                                                            @click:clear='clearTypeRef' @blur="isEditingType=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newImplementation">
                                                                            <v-icon>mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-select v-model="editItem.strategy" :items="strategy" clearable label="Update Strategy" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                                <div class="subtitle-2" :id="element.uuid+'/PERSerial'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showSerialization" x-small color="indigo">
                                            <v-icon>{{ isSerializationOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Data Type For Serialization Refs
                                    <v-btn @click="isCheckSerialization" text x-small color="indigo" v-if="isSerializationOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isSerializationOpenClose && isdeleteSerializationItem" @click="deletSerialization" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isSerializationOpenClose">
                                    <v-data-table v-model="selectDelectSerialization" :headers="headerSerialization" :items="element.serialization" :items-per-page='20'
                                            :show-select="isdeleteSerializationItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSerializationItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editSerialization(idx)" @open="openSerialization(idx)" @save="cancelSerialization" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSerialItem.serial' label='Data Type For Serialization Ref' :items='selImplementation' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingImplement" clearable @click="setImplementSelect()" 
                                                                            @click:clear='clearImplementRef' @blur="isEditingImplement=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newImplementation">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addSerialization()" @save="cancelSerialization"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSerialItem.serial' label='Data Type For Serialization Ref' :items='selImplementation' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingImplement" clearable @click="setImplementSelect()" 
                                                                            @click:clear='clearImplementRef' @blur="isEditingImplement=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newImplementation">
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
            enumRedundancy: ['NONE', ' REDUNDANT', 'REDUNDANTPER-ELEMENT'],
            strategy: ['DELETE', 'KEEPEXISTING', 'OVERWRITE'],
            selImplementation: this.$store.getters.getImplementationDataType,
            isDataOpenClose: true,
            isEditingType: true,
            isdeleteDataItem: false,
            selectDelectData: [],
            headerPersistency: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Type Tref', align: 'start', sortable: false, value: 'type' },
                { text: 'Update Strategy', align: 'start', sortable: false, value: 'strategy' },
            ],
            editItem: { name: '', type : null, strategy: null, id:''},
            deleteChangeLine : [],

            isSerializationOpenClose: true,
            isEditingImplement: true,
            isdeleteSerializationItem: false,
            selectDelectSerialization: [],
            headerSerialization: [
                { text: 'Data Type For Serialization Ref', align: 'start', sortable: false, value: 'serial' },
            ],
            editSerialItem: { serial : null, id:''},
            deleteChangeLineSerial : [],
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
        showPERKeyValueDI () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showDataElement() {
            this.isDataOpenClose = this.isDataOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showSerialization() {
            this.isSerializationOpenClose = this.isSerializationOpenClose ? false : true
        },
        inputPERKeyValueDIName () {
            this.$store.commit('editPERKeyValueDI', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        
        isCheckData() {
            if (this.isdeleteDataItem == true) {
                this.isdeleteDataItem = false
                this.selectDelectData = []
            } else {
                this.isdeleteDataItem = true
            }
        },
        deletData() {
            if (this.isdeleteDataItem == true) {
                for(let i=0; i<this.element.data.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERData-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({id:this.element.data[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/PERData-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'perKVDIdata', deletItemList: this.selectDelectData, path: this.element.path, name: this.element.name})
                this.element.data = this.element.data.filter(item => {
                        return this.selectDelectData.indexOf(item) < 0 })

                for(let n=0; n<this.element.data.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.data[n].id == this.deleteChangeLine[idx].id) {
                            this.newLine(this.element.uuid+'/PERData-'+n, this.element.uuid+'/PERData', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteDataItem = false
                this.selectDelectData = []
                this.deleteChangeLine = []
            } 
        },
        openData(idx) {
            this.selImplementation = this.$store.getters.getImplementationDataType
            if ( this.element.data[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERData-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getPHMContributionPath(this.element.data[idx].type)
                }
                this.editItem.type = { name: this.element.data[idx].type, uuid: endLine }
            }
            this.editItem.name = this.element.data[idx].name
            this.editItem.strategy = this.element.data[idx].strategy
        },
        editData(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERData-'+idx)
            if (endLine != undefined && this.editItem.type == null) {
                this.deleteLine(this.element.uuid+'/PERData-'+idx)
                this.element.data[idx].type = null
            } else if (endLine != undefined && endLine != this.editItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/PERData-'+idx)
                this.newLine(this.element.uuid+'/PERData-'+idx, this.element.uuid+'/PERData', this.editItem.type.uuid)
                this.element.data[idx].type = this.editItem.type.name
            } else if (endLine == undefined && this.editItem.type != null) {
                this.newLine(this.element.uuid+'/PERData-'+idx, this.element.uuid+'/PERData', this.editItem.type.uuid)
                this.element.data[idx].type = this.editItem.type.name
            }

            if (this.element.data[idx].name != this.editItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'PerDataInter', listname: this.editItem.name, beforename: this.element.data[idx].name} )
            }

            this.element.data[idx].name = this.editItem.name
            this.element.data[idx].strategy = this.editItem.strategy
            this.cancelData()
        },
        cancelData() {
            this.editItem.name = ''
            this.editItem.strategy = null
            this.editItem.type = null
            this.setactiveUUID()
        },
        addData() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.data.some(item => item.id === n)
            }
            this.editItem.id = n

            if( this.editItem.type != null) {
                var datacount = this.element.data.length
                this.newLine(this.element.uuid+'/PERData-'+datacount, this.element.uuid+'/PERData', this.editItem.type.uuid)
                this.editItem.type = this.editItem.type.name
            }
            const addObj = Object.assign({}, this.editItem)
            this.element.data.push(addObj);
            this.cancelData()
        },

        clearTypeRef() {
            this.isEditingType = true
            this.editItem.type = null
        },
        setTypeSelect() {
            if (this.isEditingType == true) {
                if (this.editItem.type != null && this.editItem.type.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editItem.type.uuid, element: constant.Implementation_str} )
                    document.getElementById(this.editItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editItem.type.uuid)
                }
                this.setImplementList()
                this.isEditingType = false
            } else {
                this.isEditingType = true
            }
        },

        isCheckSerialization() {
            if (this.isdeleteSerializationItem == true) {
                this.isdeleteSerializationItem = false
                this.selectDelectSerialization = []
            } else {
                this.isdeleteSerializationItem = true
            }
        },
        deletSerialization() {
            if (this.isdeleteSerializationItem == true) {
                for(let i=0; i<this.element.serialization.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERSerial-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineSerial.push({id:this.element.serialization[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/PERSerial-'+i)
                    }
                }

                this.element.serialization = this.element.serialization.filter(item => {
                        return this.selectDelectSerialization.indexOf(item) < 0 })

                for(let n=0; n<this.element.serialization.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineSerial.length; idx++) {
                        if (this.element.serialization[n].id == this.deleteChangeLineSerial[idx].id) {
                            this.newLine(this.element.uuid+'/PERSerial-'+n, this.element.uuid+'/PERSerial', this.deleteChangeLineSerial[idx].endLine)
                        }
                    }
                }

                this.isdeleteSerializationItem = false
                this.selectDelectSerialization = []
                this.deleteChangeLineSerial = []
            } 
        },
        openSerialization(idx) {
            this.selImplementation = this.$store.getters.getImplementationDataType
            if ( this.element.serialization[idx].serial != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERSerial-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.serialization[idx].serial)
                }
                this.editSerialItem.serial = { name: this.element.serialization[idx].serial, uuid: endLine }
            }
        },
        editSerialization(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PERSerial-'+idx)
            if (endLine != undefined && this.editSerialItem.serial == null) {
                this.deleteLine(this.element.uuid+'/PERSerial-'+idx)
                this.element.serialization[idx].serial = null
            } else if (endLine != undefined && endLine != this.editSerialItem.serial.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/PERSerial-'+idx)
                this.newLine(this.element.uuid+'/PERSerial-'+idx, this.element.uuid+'/PERSerial', this.editSerialItem.serial.uuid)
                this.element.serialization[idx].serial = this.editSerialItem.serial.name
            } else if (endLine == undefined && this.editSerialItem.serial != null) {
                this.newLine(this.element.uuid+'/PERSerial-'+idx, this.element.uuid+'/PERSerial', this.editSerialItem.serial.uuid)
                this.element.serialization[idx].serial = this.editSerialItem.serial.name
            }

            this.cancelSerialization()
        },
        cancelSerialization() {
            this.editSerialItem.serial = null
            this.setactiveUUID()
        },
        addSerialization() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.serialization.some(item => item.id === n)
            }
            this.editSerialItem.id = n

            if( this.editSerialItem.serial != null) {
                var datacount = this.element.serialization.length
                this.newLine(this.element.uuid+'/PERSerial-'+datacount, this.element.uuid+'/PERSerial', this.editSerialItem.serial.uuid)
                this.editSerialItem.serial = this.editSerialItem.serial.name
            }
            const addObj = Object.assign({}, this.editSerialItem)
            this.element.serialization.push(addObj);
            this.cancelSerialization()
        },

        clearImplementRef() {
            this.isEditingImplement = true
            this.editSerialItem.serial = null
        },
        setImplementSelect() {
            if (this.isEditingImplement == true) {
                if (this.editSerialItem.serial != null && this.editSerialItem.serial.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSerialItem.serial.uuid, element: constant.Implementation_str} )
                    document.getElementById(this.editSerialItem.serial.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSerialItem.serial.uuid)
                }
                this.setImplementList()
                this.isEditingImplement = false
            } else {
                this.isEditingImplement = true
            }
        },
        setImplementList() {
            this.selImplementation = this.$store.getters.getImplementationDataType
            this.setactiveUUID()
        },
        newImplementation() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation, input: false, path: '',
                    top: elementY, left: elementX,  zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', traceName: '', trace: [],
                    typeref: null, templatetype:null, desc:'', ddpc:[], idtelement:[],
            })
            EventBus.$emit('add-element', constant.Implementation_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editPERKeyValueDI', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPERKeyValueDI', {compo:"z", uuid:this.element.uuid, zindex:10} )
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