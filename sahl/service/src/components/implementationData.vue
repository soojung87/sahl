<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showImplementationData">
                            <v-icon >{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                   <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Implementation Data Type</v-toolbar-title>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Implementation Data Type</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputImplementationName' outlined dense></v-text-field>
                    <v-text-field v-model="element.category" label="Category" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.namespace" label="Name space" placeholder="String/String/,String/String/,..." style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.arraysize" label="Array Size" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-text-field v-model="element.typeemitter" label="Type Emitter" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-row style="height: 45px">
                        <v-col cols="10">
                            <v-text-field v-model="element.typeref" readonly @click="setTypeRefSelect()" clearable @click:clear='clearTypeRef()' label="Type Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/typeref'" dark icon v-bind="attrs" v-on="on" @click="setTemplateTypeList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selTemplateType" :key="i" link @click="setTypeRef(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newTemplateType" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.templatetype" readonly @click="setTemplateTypeSelect()" clearable @click:clear='clearTemplateType()' label="Template Type" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/templateType'" dark icon v-bind="attrs" v-on="on" @click="setTemplateTypeList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selTemplateType" :key="i" link @click="setTemplateType(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newTemplateType" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="element.desc" label="Desc" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/DDPC'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showDDPCItem" x-small color="indigo">
                                    <v-icon>{{ isDDPCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Data Def Props Conditional
                            <v-btn @click="isCheckDDPC" text x-small color="indigo" v-if="isDDPCOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn  v-if="isDDPCOpenClose && isdeleteDDPCItem" @click="deleteDDPC" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isDDPCOpenClose">  
                            <v-data-table v-model="selectDelectDDPCItem" :headers="headerDDPC" :items="element.ddpc"
                                    :show-select="isdeleteDDPCItem" item-key="compumethod" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteDDPCItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx" >
                                            <td v-for="(header,key) in headers" :key="key">
                                                <!-- <v-icon v-if="header.value == 'sort'" small class="sortHandle" >mdi-arrow-all</v-icon> -->
                                                <v-edit-dialog v-if="header.value != 'sort'" persistent cancel-text='Ok' save-text="Cancel" @open="openDDPC(idx)" @cancel="editDDPC(idx)" @save="cancelDDPC" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editDDPCItem.compumethod' label='Compu Method' :items='selCompuMethod' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                   return-object :readonly="!isEditingCompuMethod" @click="setCompuMethodSelect()" @blur="isEditingCompuMethod=true" 
                                                                   clearable @click:clear='clearCompuMethodRef'>
                                                             <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newCompuMethod">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </template>
                                                        </v-autocomplete>
                                                        <v-autocomplete v-model='editDDPCItem.dataconstr' label='Data Constr' :items='selDataConstr' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                   return-object :readonly="!isEditingDataConstr"  @click="setDataConstrSelect()" @blur="isEditingDataConstr=true" 
                                                                   clearable @click:clear='clearDataConstrRef'>
                                                             <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newDataConstr">
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
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addDDPC()" @save="cancelDDPC"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editDDPCItem.compumethod' label='Compu Method' :items='selCompuMethod' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                   return-object :readonly="!isEditingCompuMethod" @click="setCompuMethodSelect()" @blur="isEditingCompuMethod=true"
                                                                   clearable @click:clear='clearCompuMethodRef'>
                                                             <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newCompuMethod">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </template>
                                                        </v-autocomplete>
                                                        <v-autocomplete v-model='editDDPCItem.dataconstr' label='Data Constr' :items='selDataConstr' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                   return-object :readonly="!isEditingDataConstr" @click="setDataConstrSelect()" @blur="isEditingDataConstr=true"
                                                                   clearable @click:clear='clearDataConstrRef'>
                                                             <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newDataConstr">
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
                        <div class="subtitle-2" :id="element.uuid+'/idtetable'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showIDTElementItem" x-small color="indigo">
                                    <v-icon>{{ isIDTElementOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Implementation Data Type
                            <v-btn @click="isCheckIDTElement" text x-small color="indigo" v-if="isIDTElementOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isIDTElementOpenClose && isdeleteIDTElementItem" @click="deleteIDTElement" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isIDTElementOpenClose">  
                            <v-data-table v-model="selectDelectIDTElementItem" :headers="headerIDTElement" :items="element.idtelement"
                                    :show-select="isdeleteIDTElementItem" item-key="name" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteIDTElementItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openIDTElement(idx)" @cancel="editIDTElement(idx)" @save="cancelIDTElement" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editIDTElementItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editIDTElementItem.typeref' label='Type Reference' :items='selTemplateType' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                   return-object :readonly="!isEditingIDTETypeRef" @click="setIDTElementSelect()" @blur="isEditingIDTETypeRef=true" outlined dense style="height: 45px;"
                                                                   clearable @click:clear='clearIDTETypeRef'>
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newTemplateType">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </template>
                                                        </v-autocomplete>
                                                        <v-checkbox v-model="editIDTElementItem.inplace" label="Inplace" @click="setactiveUUID()"></v-checkbox>
                                                        <v-text-field v-model="editIDTElementItem.desc" label="Desc" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addIDTElement()" @save="cancelIDTElement"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editIDTElementItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editIDTElementItem.typeref' label='Type Reference' :items='selTemplateType' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                   return-object :readonly="!isEditingIDTETypeRef" @click="setIDTElementSelect()" @blur="isEditingIDTETypeRef=true" outlined dense style="height: 45px;"
                                                                   clearable @click:clear='clearIDTETypeRef'>
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newTemplateType">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </template>
                                                        </v-autocomplete>
                                                        <v-checkbox v-model="editIDTElementItem.inplace" label="Inplace" @click="setactiveUUID()"></v-checkbox>
                                                        <v-text-field v-model="editIDTElementItem.desc" label="Desc" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isEditingCompuMethod: true,
            isEditingDataConstr: true,
            isDDPCOpenClose: true,

            isdeleteDDPCItem: false,
            headerDDPC: [
                { text: '', sortable: false, value: 'sort' },
                { text: 'Compu Method', align: 'start', sortable: false, value: 'compumethod' },
                { text: 'Data Constr', sortable: false, value: 'dataconstr' },
            ],
            selectDelectDDPCItem: [],
            defaultDDPCItem: { compumethod: null, dataconstr: null },
            editDDPCItem: { compumethod: null, dataconstr: null },
            selCompuMethod: this.$store.getters.getCompuMethod,
            selDataConstr: this.$store.getters.getDataConstr,
            selTemplateType: this.$store.getters.getImplementationDataType,

            isIDTElementOpenClose: true,
            isdeleteIDTElementItem: false,
            isEditingIDTETypeRef: true,
            headerIDTElement: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Type Reference​', sortable: false, value: 'typeref' },
                { text: 'Inplace', sortable: false, value: 'inplace' },
                { text: 'Desc', sortable: false, value: 'desc' }
            ],
            selectDelectIDTElementItem: [],
            defaultIDTElementItem: { name: '', typeref: null, inplace: false, desc: '' },
            editIDTElementItem: { name: '', typeref: null, inplace: false, desc: '' },
            changeLineImp: [],
            changeLineDDPC: [],
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
        showImplementationData() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showDDPCItem() {
            this.isDDPCOpenClose = this.isDDPCOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showIDTElementItem() {
            this.isIDTElementOpenClose = this.isIDTElementOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        inputImplementationName() {
            this.$store.commit('editImplementation', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clearTemplateType() {
            this.element.templatetype = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/templateType')
            }
        },
        clearTypeRef() {
            this.element.typeref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
            console.log(endLine)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/typeref')
            }
        },
        isCheckDDPC() {
            if (this.isdeleteDDPCItem == true) {
                this.isdeleteDDPCItem = false
                this.selectDelectDDPCItem = []
            } else {
                this.isdeleteDDPCItem = true
            }
        },
        deleteDDPC() {
            if (this.isdeleteDDPCItem == true) {
                for(let i=0; i<this.element.ddpc.length; i++){
                    var endLineCom = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+i)
                    if(endLineCom != undefined) {
                        this.deleteLine(this.element.uuid+'/ddpccompu-'+i)
                    }
                    var endLineData = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+i)
                    if(endLineData != undefined) {
                        this.deleteLine(this.element.uuid+'/ddpcdata-'+i)
                    }
                    if(endLineCom != undefined || endLineData != undefined) {
                        this.changeLineDDPC.push({compumethod:this.element.ddpc[i].compumethod, dataconstr:this.element.ddpc[i].dataconstr, endLineCom:endLineCom, endLineData:endLineData})
                    }
                }

                this.element.ddpc = this.element.ddpc.filter(item => {
                         return this.selectDelectDDPCItem.indexOf(item) < 0 })

                let idx = 0 
                for(let n=0; n<this.element.ddpc.length; n++) {
                    let rigth= true
                    while (rigth) {
                        //console.log('while'+ idx+'+'+this.changeLineDDPC[idx].compumethod +'+'+this.changeLineDDPC[idx].dataconstr)
                        //console.log('while'+ idx+'+'+this.element.ddpc[n].compumethod +'+'+this.element.ddpc[n].dataconstr)
                        if (this.element.ddpc[n].compumethod == this.changeLineDDPC[idx].compumethod &&
                            this.element.ddpc[n].dataconstr == this.changeLineDDPC[idx].dataconstr) {
                                rigth = false
                                idx--
                        }
                        idx++
                    }
                    //console.log('escape')
                    if (this.element.ddpc[n].compumethod != null) {
                        this.newLine(this.element.uuid+'/ddpccompu-'+n, this.element.uuid+'/DDPC', this.changeLineDDPC[idx].endLineCom)
                    }
                    if (this.element.ddpc[n].dataconstr != null) {
                        this.newLine(this.element.uuid+'/ddpcdata-'+n, this.element.uuid+'/DDPC', this.changeLineDDPC[idx].endLineData)
                    }
                }

                this.isdeleteDDPCItem = false
                this.selectDelectDDPCItem = []
                this.changeLineDDPC = []
            } 
        },
        openDDPC(idx) {
            this.selCompuMethod = this.$store.getters.getCompuMethod
            this.selDataConstr =  this.$store.getters.getDataConstr

            if (this.element.ddpc[idx].compumethod != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+idx)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getCompuMethodPath(this.element.ddpc[idx].compumethod)
                }
                this.editDDPCItem.compumethod = { name :this.element.ddpc[idx].compumethod, uuid: endLineC }
            }
            if (this.element.ddpc[idx].dataconstr != null) {
                var endLineD = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+idx)
                if (endLineD == undefined) {
                    endLineD = this.$store.getters.getDataConstrPath(this.element.ddpc[idx].dataconstr)
                }
                this.editDDPCItem.dataconstr = { name :this.element.ddpc[idx].dataconstr, uuid: endLineD }
            }
        },
        addDDPC() {
            var datacount = this.element.ddpc.length

            if( this.editDDPCItem.compumethod != null) {
                this.newLine(this.element.uuid+'/ddpccompu-'+datacount, this.element.uuid+'/DDPC', this.editDDPCItem.compumethod.uuid)
                this.editDDPCItem.compumethod = this.editDDPCItem.compumethod.name
            }
            if( this.editDDPCItem.dataconstr != null) {
                this.newLine(this.element.uuid+'/ddpcdata-'+datacount, this.element.uuid+'/DDPC', this.editDDPCItem.dataconstr.uuid)
                this.editDDPCItem.dataconstr = this.editDDPCItem.dataconstr.name
            }
            const addObj = Object.assign({}, this.editDDPCItem)
            this.element.ddpc.push(addObj)
            this.cancelDDPC()
        },
        editDDPC(idx) {
            var endcompuLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+idx)
            if (endcompuLine != undefined && this.editDDPCItem.compumethod == null) {
                this.deleteLine(this.element.uuid+'/ddpccompu-'+idx)
                this.element.ddpc[idx].compumethod = null
            } else if (endcompuLine != undefined && endcompuLine != this.editDDPCItem.compumethod.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/ddpccompu-'+idx)
                this.newLine(this.element.uuid+'/ddpccompu-'+idx, this.element.uuid+'/DDPC', this.editDDPCItem.compumethod.uuid)
                this.element.ddpc[idx].compumethod = this.editDDPCItem.compumethod.name
            } else if(endcompuLine == undefined && this.editDDPCItem.compumethod != null) {
                if (this.editDDPCItem.compumethod != null) {
                    // input으로 들어왔을 때 uuid값이 없는 경우가 있는데 compo/datcon 둘중 하나만 edit하면 한쪽이 uuid값이 없어서 에러남
                    this.newLine(this.element.uuid+'/ddpccompu-'+idx, this.element.uuid+'/DDPC', this.editDDPCItem.compumethod.uuid)
                }
                this.element.ddpc[idx].compumethod = this.editDDPCItem.compumethod.name
            }

            var enddataLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+idx)
            console.log('editDDPC      '+ enddataLine)
            if (enddataLine != undefined && this.editDDPCItem.dataconstr == null) {
                this.deleteLine(this.element.uuid+'/ddpcdata-'+idx)
                this.element.ddpc[idx].dataconstr = null
            } else if (enddataLine != undefined && enddataLine != this.editDDPCItem.dataconstr.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/ddpcdata-'+idx)
                this.newLine(this.element.uuid+'/ddpcdata-'+idx, this.element.uuid+'/DDPC', this.editDDPCItem.dataconstr.uuid)
                this.element.ddpc[idx].dataconstr = this.editDDPCItem.dataconstr.name
            } else if (enddataLine == undefined && this.editDDPCItem.dataconstr != undefined) {
                if (this.editDDPCItem.dataconstr != null) {
                    this.newLine(this.element.uuid+'/ddpcdata-'+idx, this.element.uuid+'/DDPC', this.editDDPCItem.dataconstr.uuid)
                }
                this.element.ddpc[idx].dataconstr = this.editDDPCItem.dataconstr.name
            }
            
            this.cancelDDPC()
        },
        cancelDDPC() {
            this.editDDPCItem = Object.assign({}, this.defaultDDPCItem)
            this.setactiveUUID()
        },
        setCompuMethodList() {
            this.selCompuMethod = this.$store.getters.getCompuMethod
            this.setactiveUUID()
        },
        setDataConstrList() {
            this.selDataConstr =  this.$store.getters.getDataConstr
            this.setactiveUUID()
        },
        newCompuMethod() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementCompuMehtod', {
                    name: this.$store.getters.getNameCompuMethod,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, category:null, scales:[], icon:"mdi-clipboard-outline", validation: false
                })
            EventBus.$emit('add-element', constant.CompuMethod_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newDataConstr() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)


            this.$store.commit('addElementDataConstr', {
                    name: this.$store.getters.getNameDataConstr, input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, lowerlimit:null, upperlimit:null, icon:"mdi-clipboard-outline", validation: false })
            EventBus.$emit('add-element', constant.DataConstr_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setCompuMethodSelect() {
            if (this.isEditingCompuMethod == true) { 
                // new에서 들어왔을 때 이게 뭔지 보고싶을때 이건 연결한 상태가 아니기 때문에 enduuid로 찾을수가없다. 
                // edit할때랑 new할때랑 생각해봐야함
                if (this.editDDPCItem.compumethod != null) {
                    if (this.editDDPCItem.compumethod.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editDDPCItem.compumethod.uuid, element: constant.CompuMethod_str} )
                    }
                }
                this.setCompuMethodList()
                this.isEditingCompuMethod = false
            } else {
                this.isEditingCompuMethod = true
            }
        },
        setDataConstrSelect() {
            if (this.isEditingDataConstr == true) {
                if (this.editDDPCItem.dataconstr != null) {
                    if (this.editDDPCItem.dataconstr.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editDDPCItem.dataconstr.uuid, element: constant.DataConstr_str} )
                    }
                }
                this.setDataConstrList()
                this.isEditingDataConstr = false
            } else {
                this.isEditingDataConstr = true
            }
        },
        clearCompuMethodRef() {
            this.isEditingCompuMethod = true
            this.editDDPCItem.compumethod = null
        },
        clearDataConstrRef() {
            this.isEditingDataConstr = true
            this.editDDPCItem.dataconstr = null
        },

        isCheckIDTElement() {
            if (this.isdeleteIDTElementItem == true) {
                this.isdeleteIDTElementItem = false
                this.selectDelectIDTElementItem = []
            } else {
                this.isdeleteIDTElementItem = true
            }
        },
        deleteIDTElement() {
            if (this.isdeleteIDTElementItem == true) {
                for(let i=0; i<this.element.idtelement.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+i)
                    if(endLine != undefined) {
                        this.changeLineImp.push({name:this.element.idtelement[i].name, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/idtetable-'+i)
                    }
                }

                this.element.idtelement = this.element.idtelement.filter(item => {
                         return this.selectDelectIDTElementItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.idtelement.length; n++) {
                    for(let idx=0; idx<this.changeLineImp.length; idx++) {
                        if (this.element.idtelement[n].name == this.changeLineImp[idx].name) {
                            this.newLine(this.element.uuid+'/idtetable-'+n, this.element.uuid+'/idtetable', this.changeLineImp[idx].endLine)
                        }
                    }
                }

                this.isdeleteIDTElementItem = false
                this.selectDelectIDTElementItem = []
                this.changeLineImp = []
            }
        },
        openIDTElement(idx) {
            this.selTemplateType = this.$store.getters.getImplementationDataType
            this.editIDTElementItem.name = this.element.idtelement[idx].name
            if ( this.element.idtelement[idx].typeref != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.idtelement[idx].typeref)
                }
                this.editIDTElementItem.typeref = { name: this.element.idtelement[idx].typeref, uuid: endLine }
            }
            this.editIDTElementItem.inplace = this.element.idtelement[idx].inplace
            this.editIDTElementItem.desc = this.element.idtelement[idx].desc
        },
        addIDTElement() {
            if( this.editIDTElementItem.typeref != null) {
                var datacount = this.element.idtelement.length
                
                this.newLine(this.element.uuid+'/idtetable-'+datacount, this.element.uuid+'/idtetable', this.editIDTElementItem.typeref.uuid)
                this.editIDTElementItem.typeref = this.editIDTElementItem.typeref.name
            }
            const addObj = Object.assign({}, this.editIDTElementItem);
            this.element.idtelement.push(addObj);
            this.cancelIDTElement()
        },
        editIDTElement(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+idx)
            if (endLine != undefined && this.editIDTElementItem.typeref == null) {
                this.deleteLine(this.element.uuid+'/idtetable-'+idx)
                this.element.idtelement[idx].typeref = null
            } else if (endLine != undefined && endLine != this.editIDTElementItem.typeref.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/idtetable-'+idx)
                this.newLine(this.element.uuid+'/idtetable-'+idx, this.element.uuid+'/idtetable', this.editIDTElementItem.typeref.uuid)
                this.element.idtelement[idx].typeref = this.editIDTElementItem.typeref.name
            }else if (endLine == undefined && this.editIDTElementItem.typeref != null) {
                this.newLine(this.element.uuid+'/idtetable-'+idx, this.element.uuid+'/idtetable', this.editIDTElementItem.typeref.uuid)
                this.element.idtelement[idx].typeref = this.editIDTElementItem.typeref.name
            }

            this.element.idtelement[idx].name = this.editIDTElementItem.name
            this.element.idtelement[idx].inplace = this.editIDTElementItem.inplace
            this.element.idtelement[idx].desc = this.editIDTElementItem.desc
            this.cancelIDTElement()
        },
        cancelIDTElement() {
            this.editIDTElementItem = Object.assign({}, this.defaultIDTElementItem)
            this.setactiveUUID()
        },
        setIDTElementSelect() {
            //console.log('setIDTElementSelect   ' + this.isEditingIDTETypeRef)
            if (this.isEditingIDTETypeRef == true) {
                 if (this.editIDTElementItem.typeref != null) {
                    if (this.editIDTElementItem.typeref.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editIDTElementItem.typeref.uuid, element: constant.Implementation_str} )
                    }
                }
                this.setTemplateTypeList()
                this.isEditingIDTETypeRef = false
            } else {
                this.isEditingIDTETypeRef = true
            }
        },
        clearIDTETypeRef() {
            this.isEditingIDTETypeRef = true
            this.editIDTElementItem.typeref = null
        },

        setTypeRefSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
            if (endLine == undefined) {
                endLine = this.$store.getters.getImplementationPath(this.element.typeref)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Implementation_str} )
            }
        },
        setTemplateTypeSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType')
            if (endLine == undefined) {
                endLine = this.$store.getters.getImplementationPath(this.element.templatetype)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Implementation_str} )
            }
        },
        setTemplateTypeList() {
            this.selTemplateType = this.$store.getters.getImplementationDataType
            this.setactiveUUID()
        },
        setTemplateType(item){
            console.log(item)
            if( this.element.templatetype != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/templateType')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/templateType', this.element.uuid+'/templateType', item.uuid)
                this.element.templatetype = item.name
            }
            this.setactiveUUID()
        },
        setTypeRef(item){
            //console.log(item)
            if( this.element.typeref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/typeref')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/typeref', this.element.uuid+'/typeref', item.uuid)
                this.element.typeref = item.name
            }
            this.setactiveUUID()
        },
        newTemplateType() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation,  input: false, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', 
                    typeref: null, templatetype:null, desc:'', ddpc:[], idtelement:[],
                })
            EventBus.$emit('add-element', constant.Implementation_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
        deleteLine(fineLine) {
            var linenum = this.$store.getters.getconnectLineNum(fineLine)
            //console.log(linenum)
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