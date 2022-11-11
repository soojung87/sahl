<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showHWCategory">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>HW Category</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>HW Category</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputHWCategoryName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/attribute'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showAttribute" x-small color="indigo">
                                            <v-icon>{{ isAttributeOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    HW Attribute-Defs
                                    <v-btn @click="isCheckAttribute" text x-small color="indigo" v-if="isAttributeOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isAttributeOpenClose && isdeleteAttribute" @click="deleteAttribute" text x-small color="indigo" >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isAttributeOpenClose">  
                                    <v-data-table v-model="selectDelectAttribute" :headers="headerAttribute" :items="element.attribute"  :items-per-page='$setNumTableList'
                                            :show-select="isdeleteAttribute" item-key="id" height="150px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteAttribute" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="openAttribute(idx)" @cancel="cancelAttribute" @save="editAttribute(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editAttriItem.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editAttriItem.category" label="Category" placeholder="String" @click="setactiveUUID" style="height: 35px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-checkbox v-model="editAttriItem.isrequired" label="Is Required" value="editAttriItem.isrequired" :indeterminate="editAttriItem.isrequired==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()" style="height: 35px;"></v-checkbox>
                                                                <v-text-field v-model="editAttriItem.literal" label="HW Attribute Literals" placeholder="String/Stirng/String/..." @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @cancel="cancelAttribute" @save="addAttribute()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editAttriItem.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editAttriItem.category" label="Category" placeholder="String" @click="setactiveUUID" style="height: 35px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-checkbox v-model="editAttriItem.isrequired" label="Is Required" value="editAttriItem.isrequired" :indeterminate="editAttriItem.isrequired==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()" style="height: 35px;"></v-checkbox>
                                                                <v-text-field v-model="editAttriItem.literal" label="HW Attribute Literals" placeholder="String/Stirng/String/..." @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                        <v-row>
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 50px;">&#60;HW-ATTRIBUTE-DEFS&#62;
                                <v-btn @click="newTextAttribute()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <v-row>
                            <div class="text-editDialog" style="height: 300px;">
                                <v-row v-for="(item, i) in editARXML.attribute" :key="i" style="height: 150px;">
                                    <div>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 10px;">
                                                <v-btn @click="deletTextAttribute(i)" text x-small color="indigo">
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                                &#60;HW-ATTRIBUTE-DEF&#62;
                                            </label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.name" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;CATEGORY&#62;</label>
                                            <v-text-field v-model="item.category" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;CATEGORY&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;IS-REQUIRED&#62;</label>
                                            <v-text-field v-model="item.isrequired" placeholder=" true or false"  class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;IS-REQUIRED&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left: 100px;">&#60;HW-ATTRIBUTE-LITERALS&#62;</label>
                                            <v-text-field v-model="item.literal" placeholder="String/Stirng/String/..." style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                                            <label style="padding:10px;">&#60;&#47;HW-ATTRIBUTE-LITERALS&#62;</label>
                                        </v-row>
                                        <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;HW-ATTRIBUTE-DEF&#62;</label>
                                        </v-row>
                                    </div>
                                </v-row>
                            </div>
                        </v-row>
                        <v-row>
                            <label style="padding:10px;height: 20px;" >&#60;&#47;HW-ATTRIBUTE-DEFS&#62;</label>
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
//import constant from "../store/constants.js"
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
            iselementOpenClose: true, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', attribute: []},
            editTextItem: { name : '', category: '', isrequired: '', literal: '', id: ''},
            isAttributeOpenClose: true,
            isdeleteAttribute: false,
            headerAttribute: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Category', sortable: false, value: 'category' },
                { text: 'Is Required', sortable: false, value: 'isrequired' },
                { text: 'HW Attribute Literals', sortable: false, value: 'literal' },
            ],
            selectDelectAttribute: [],
            defaultAttriItem: { name: '', category:'', isrequired: null, literal: '', id:''},
            editAttriItem: {name: '', category:'', isrequired: null, literal: '', id: '' },
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
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
        showHWCategory () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showAttribute () {
            this.isAttributeOpenClose = this.isAttributeOpenClose ? false : true
        },
        inputHWCategoryName () {
            this.$store.commit('editHWCategory', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        isCheckAttribute() {
            if (this.isdeleteAttribute == true) {
                this.isdeleteAttribute = false
                this.selectDelectAttribute = []
            } else {
                this.isdeleteAttribute = true
            }
        },
        deleteAttribute () {
            if (this.isdeleteAttribute == true) {
                this.$store.commit('deleteRefTable', {deleteName:'attribute', deletItemList: this.selectDelectAttribute, path: this.element.path, name: this.element.name})
                this.element.attribute = this.element.attribute.filter(item => {
                         return this.selectDelectAttribute.indexOf(item) < 0 })
                this.isdeleteAttribute = false
                this.selectDelectAttribute = []
            }
        },
        openAttribute (idx) {
            this.editAttriItem.name = this.element.attribute[idx].name
            this.editAttriItem.category = this.element.attribute[idx].category
            this.editAttriItem.isrequired = this.element.attribute[idx].isrequired
            this.editAttriItem.literal = this.element.attribute[idx].literal
        },
        addAttribute () {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.attribute.some(item => item.id === n)
            }
            this.editAttriItem.id = n

            const addObj = Object.assign({}, this.editAttriItem);
            this.element.attribute.push(addObj);
            this.cancelAttribute()
        },
        editAttribute (idx) {
            if (this.element.attribute[idx].name != this.editAttriItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'attribute', listname: this.editAttriItem.name, beforename: this.element.attribute[idx].name} )
            }
            this.element.attribute[idx].name = this.editAttriItem.name
            this.element.attribute[idx].category = this.editAttriItem.category
            this.element.attribute[idx].isrequired = this.editAttriItem.isrequired
            this.element.attribute[idx].literal = this.editAttriItem.literal
            this.cancelAttribute()
        },
        cancelAttribute () {
            this.editAttriItem = Object.assign({}, this.defaultAttriItem)
            this.setactiveUUID()
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editHWCategory', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.attribute = JSON.parse(JSON.stringify(this.element.attribute))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editHWCategory', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name

            if (this.editARXML.attribute.length > 0) {
                var deleteItem = []
                this.element.attribute.forEach(item => {
                    var isExistence = false
                    this.editARXML.attribute.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'attribute', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'attribute', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.attribute.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'attribute', deletItemList: this.element.attribute, path: this.element.path, name: this.element.name})
                }
            }
            this.element.attribute = JSON.parse(JSON.stringify(this.editARXML.attribute))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', attribute: []}
            this.editTextItem = { name : '', category: '', isrequired: '', literal: '', id: ''}
            this.dialogText = false
        },
        newTextAttribute() {
            this.editTextItem = { name : '', category: '', isrequired: '', literal: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.attribute.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.attribute.push(addObj);
        },
        deletTextAttribute(idx) {
            this.editARXML.attribute.splice(idx,1)
        },
    },

}
</script>