<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showCompuMethod">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Compu Method</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Compu Method</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputCompuMethodName' outlined dense></v-text-field>
                            <v-text-field v-model="element.category" label="Category" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.attributeName" label="Blueprint Policy Attribute Name " placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showScaleItem" x-small color="indigo">
                                            <v-icon>{{ isScaleOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Scale
                                    <v-btn @click="isCheckScale" text x-small color="indigo" v-if="isScaleOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isScaleOpenClose && isdeleteScaleItem" @click="deleteScale" text x-small color="indigo" >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isScaleOpenClose">  
                                    <v-data-table v-model="selectDelectScaleItem" :headers="headerScale" :items="element.scales"  :items-per-page='$setNumTableList'
                                            :show-select="isdeleteScaleItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteScaleItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="openScale(idx)" @cancel="cancelScale" @save="editScale(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editScaleItem.const" label="Compu Const" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.symbol" label="Symbol" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.lowerlimit" label="Lower Limit" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.upperlimit" label="Upper Limit" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.desc" label="Desc" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @cancel="cancelScale" @save="addScale()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editScaleItem.const" label="Compu Const" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.symbol" label="Symbol" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.lowerlimit" label="Lower Limit" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.upperlimit" label="Upper Limit" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editScaleItem.desc" label="Desc" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <label style="padding:10px;">&#60;CATEGORY&#62;</label>
                            <v-text-field v-model="editARXML.category" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;CATEGORY&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 25px;">&#60;BLUEPRINT-POLICYS&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;margin-left: 30px;height: 25px;">&#60;BLUEPRINT-POLICY-NOT-MODIFIABLE&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;margin-left: 60px;">&#60;ATTRIBUTE-NAME&#62;</label>
                            <v-text-field v-model="editARXML.attributeName" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;ATTRIBUTE-NAME&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;margin-left: 30px;height: 20px;">&#60;&#47;BLUEPRINT-POLICY-NOT-MODIFIABLE&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;height: 35px;">&#60;&#47;BLUEPRINT-POLICYS&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 15px;">&#60;COMPU-INTERNAL-TO-PHYS&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;margin-left: 30px;height: 50px;">&#60;COMPU-SCALES&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextCompu()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row>
                            <div class="text-editDialog" style="height: 200px;">
                                <v-row v-for="(item, i) in editARXML.scales" :key="i" style="height: 170px;">
                                    <div>
                                        <v-row style="height: 25px;margin:0px;">
                                            <v-btn style="margin: 15px -35px 0px 35px" @click="deletTextCompu(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <label style="padding:10px;margin:2px 0px 2px 30px;">&#60;COMPU-SCALE&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;COMPU-CONST&#62;</label>
                                            <label style="padding:10px;">&#60;VT&#62;</label>
                                            <v-text-field v-model="item.const" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;VT&#62;</label>
                                            <label style="padding:10px;">&#60;&#47;COMPU-CONST&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SYMBOL&#62;</label>
                                            <v-text-field v-model="item.symbol" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SYMBOL&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;LOWER-LIMIT&#62;</label>
                                            <v-text-field v-model="item.lowerlimit"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;LOWER-LIMIT&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 100px;">&#60;UPPER-LIMIT&#62;</label>
                                            <v-text-field v-model="item.upperlimit" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;UPPER-LIMIT&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 100px;">&#60;DESC&#62;</label>
                                            <v-text-field v-model="item.desc" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;DESC&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:80px;">&#60;&#47;COMPU-SCALE&#62;</label>
                                        </v-row>
                                    </div>
                                </v-row>
                            </div>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;margin-left:30px;height: 20px;" >&#60;&#47;COMPU-SCALES&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height:15px;height: 15px;">&#60;&#47;COMPU-INTERNAL-TO-PHYS&#62;</label>
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
import dialogPathSetting from '../components/dialogPathSetting.vue'
import { EventBus } from "../main.js"

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar'],
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
            editARXML: {name:'', category: '', scales: []},
            editTextItem: { const : '', symbol: '', lowerlimit: '', upperlimit: '', desc: '', id: ''},        
            isScaleOpenClose: true,
            isdeleteScaleItem: false,
            headerScale: [
                { text: 'Compu Const', align: 'start', sortable: false, value: 'const' },
                { text: 'Symbol', sortable: false, value: 'symbol' },
                { text: 'Lower Limit', sortable: false, value: 'lowerlimit' },
                { text: 'Upper Limit', sortable: false, value: 'upperlimit' },
                { text: 'Desc', sortable: false, value: 'desc' },
            ],
            selectDelectScaleItem: [],
            defaultScaleItem: { const: '', symbol:'', lowerlimit: '', upperlimit: '', desc: '', id: '' },
            editScaleItem: {const: '', symbol:'', lowerlimit: '', upperlimit: '', desc: '', id: '' },
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on('Element-open', (isopen, uuid) => {
            if (this.element.uuid == uuid) {
                this.iselementOpenClose = isopen
            }
        })
    },
    methods: {
        submitDialog(element) {
            //여기에 errorlist에 있는지 check해보자
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
        showCompuMethod () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            if (this.iselementOpenClose) { //SWComponent RClient에서 3개가 같이 뜰수있음 그때 하나만 펼치고 나머지 다 접으려고
                this.$store.commit('setOpenCloseCompuDataStrMachineModeD', {
                                uuid: this.element.uuid, left: this.element.left, top: this.element.top,
                                beforElement: constant.Implementation_str, closeElement: constant.DataConstr_str})
            }
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
                document.getElementById(this.element.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
        },
        showScaleItem () {
            this.isScaleOpenClose = this.isScaleOpenClose ? false : true
        },
        inputCompuMethodName () {
            this.$store.commit('editCompuMethod', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        isCheckScale() {
            if (this.isdeleteScaleItem == true) {
                this.isdeleteScaleItem = false
                this.selectDelectScaleItem = []
            } else {
                this.isdeleteScaleItem = true
            }
        },
        deleteScale () {
            if (this.isdeleteScaleItem == true) {
                this.element.scales = this.element.scales.filter(item => {
                         return this.selectDelectScaleItem.indexOf(item) < 0 })
                this.isdeleteScaleItem = false
                this.selectDelectScaleItem = []
            }
        },
        openScale (idx) {
            this.editScaleItem.const = this.element.scales[idx].const
            this.editScaleItem.symbol = this.element.scales[idx].symbol
            this.editScaleItem.lowerlimit = this.element.scales[idx].lowerlimit
            this.editScaleItem.upperlimit = this.element.scales[idx].upperlimit
            this.editScaleItem.desc = this.element.scales[idx].desc
        },
        addScale () {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.scales.some(item => item.id === n)
            }
            this.editScaleItem.id = n
            const addObj = Object.assign({}, this.editScaleItem);
            this.element.scales.push(addObj);
            this.cancelScale()
        },
        editScale (idx) {
            this.element.scales[idx].const = this.editScaleItem.const
            this.element.scales[idx].symbol = this.editScaleItem.symbol
            this.element.scales[idx].lowerlimit = this.editScaleItem.lowerlimit
            this.element.scales[idx].upperlimit = this.editScaleItem.upperlimit
            this.element.scales[idx].desc = this.editScaleItem.desc
            this.cancelScale()
        },
        cancelScale () {
            this.editScaleItem = Object.assign({}, this.defaultScaleItem)
            this.setactiveUUID()
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editCompuMethod', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.category = this.element.category
            this.editARXML.scales = JSON.parse(JSON.stringify(this.element.scales))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editCompuMethod', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.category = this.editARXML.category
            this.element.scales = JSON.parse(JSON.stringify(this.editARXML.scales))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', category: '', scales: []}
            this.editTextItem = { const : '', symbol: '', lowerlimit: '', upperlimit: '', desc: '', id: ''}   
            this.dialogText = false
        },
        newTextCompu() {
            this.editTextItem = { const : '', symbol: '', lowerlimit: '', upperlimit: '', desc: '', id: ''} 
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.scales.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.scales.push(addObj);
        },
        deletTextCompu(idx) {
            this.editARXML.scales.splice(idx,1)
        },
    },

}
</script>