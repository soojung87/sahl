<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showHWElement">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>HW Element</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>HW Element</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text  v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputHWElementName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.category" readonly @click="setHWCategorySelect()" :style="refHWCatrgory ? 'height: 43px;border:solid red 2px' : ''" 
                                                clearable @click:clear='clearHWCategoryRef()' label="HW Category" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/hwcatrory'" dark icon v-bind="attrs" v-on="on" @click="setHWCategoryList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selHWCategory" :key="i" link @click="setHWCategory(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newHWCategory()" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/attributetable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showAttributeItem" x-small color="indigo">
                                            <v-icon>{{ isAttributeOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    HW Attribute Value
                                    <v-btn @click="isCheckAttribute" text x-small color="indigo" v-if="isAttributeOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn  v-if="isAttributeOpenClose && isdeleteAttributeItem" @click="deleteAttribute" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isAttributeOpenClose">  
                                    <v-data-table v-model="selectdeleteAttribut" :headers="headersAttribut" :items="element.attribute" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteAttributeItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteAttributeItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx" >
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refAtrribute === item.id ? 'red' : null " @click="rowClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openAttribute(idx)" @cancel="cancelAttribute" @save="editAttribute(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editAttributeItem.attr' label='HW Attribute' :items='selHWAttribute' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingHWAttribute" @click="setHWAttributeSelect()" @blur="isEditingHWAttribute=true" 
                                                                        @click:clear='clearHWAttribute' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-model="editAttributeItem.vt" :items="attributeType" label="type" @click:clear='editAttributeItem.vt = null' clearable @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editAttributeItem.v" label="Size" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelAttribute" @save="addAttribute()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editAttributeItem.attr' label='HW Attribute' :items='selHWAttribute' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingHWAttribute" @click="setHWAttributeSelect()" @blur="isEditingHWAttribute=true" 
                                                                        @click:clear='clearHWAttribute' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-model="editAttributeItem.vt" :items="attributeType" label="type" @click:clear='editAttributeItem.vt = null' clearable @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editAttributeItem.v" label="Size" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
            <v-dialog v-model="dialogText" persistent scrollable width="800">
                <v-card >
                    <v-card-title class="text-h6 green accent-1"> Edit Text </v-card-title>
                    <v-card-text>
                        <br>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;HW-CATEGORY-REFS&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin:2px 0px 2px 20px;">&#60;HW-CATEGORY-REF&#62;</label>
                            <v-text-field v-model="editARXML.category" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;HW-CATEGORY-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;HW-CATEGORY-REFSF&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;HW-ATTRIBUTE-VALUES&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextAttribute()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.attribute" :key="i" style="height: 130px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextAttribute(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;HW-ATTRIBUTE-VALUE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:2px 0px 2px 70px;">
                                        <v-col cols="4">
                                        <label>&#60;HW-ATTRIBUTE-DEF-REF&#62;</label>
                                        </v-col><v-col cols="5">
                                        <v-text-field v-model="item.attr" placeholder="Path" style="margin:-5px 0px 0px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;HW-ATTRIBUTE-DEF-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;VT&#62;</label>
                                        <v-text-field v-model="item.vt" placeholder="EEPROM or FLASH or RAM or ROM"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;VT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;V&#62;</label>
                                        <v-text-field v-model="item.v" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;V&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;HW-ATTRIBUTE-VALUE&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;HW-ATTRIBUTE-VALUES&#62;</label>
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
import { EventBus } from "../main.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'
import constant from "../store/constants.js"

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar','location'],
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
            editARXML: {name:'', category: '', attribute: []},
            editTextItem: { attr: null, vt: null, v:'', id: ''},
            selHWCategory: this.$store.getters.getHWCategory,
            selHWAttribute: this.$store.getters.getHWAttributeDef,
            isAttributeOpenClose: true,
            isdeleteAttributeItem: false,
            headersAttribut: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'HW Attribute', align: 'start', sortable: false, value: 'attr' },
                { text: 'Type',  sortable: false, value: 'vt' },
                { text: 'Size', sortable: false, value: 'v' },
            ],
            attributeType: [ 'EEPROM', 'FLASH', 'RAM','ROM',],
            selectdeleteAttribut: [],
            editAttributeItem: { attr: null, vt:null, v:'', id: ''},
            defaultAttributeItem: { attr: null, vt:null, v:'', id: ''},
            isEditingHWAttribute: true,
            refHWCatrgory: false,
            refAtrribute: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, id, isDeleteItem) => {
            if (isDeleteItem) {
                if (this.refAtrribute == id) {
                    this.clickOtherFields()
                }
            } else {
                this.refHWCatrgory = false
                this.refAtrribute = null

                if (refNum == 1) {
                    this.refHWCatrgory = true
                }else if (refNum == 2) {
                    this.refAtrribute = idxID
                }
            }
        })
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
        showHWElement() {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showAttributeItem() {
            this.clickOtherFields()
            this.isAttributeOpenClose = this.isAttributeOpenClose ? false : true
        },
        inputHWElementName() {
            this.$store.commit('editHWElement', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refHWCatrgory || this.refAtrribute != null) {
                this.deleteOpenElement()
                this.refHWCatrgory = false
                this.refAtrribute = null
            }
        },
        rowClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refAtrribute != this.element.attribute[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getHWCategoryPath(this.element.attribute[idx].attr, 1)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    this.$store.commit('editHWCategory', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWCategory_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/attributetable', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/attributetable', end:endLine, iscircle:false, refNum:2, idxID: this.element.attribute[idx].id})
                }
                this.refAtrribute = this.element.attribute[idx].id
            }
        },

        setHWCategorySelect() {
            this.clickOtherFields()
            if (this.element.category != null) {this.refHWCatrgory = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getHWCategoryPath(this.element.category, 0)
                }
                if (endLine != null) {
                    this.$store.commit('editHWCategory', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWCategory_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/hwcatrory', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/hwcatrory', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.HWCategory_str} )
                    /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)*/
                }
            }
        },
        clearHWCategoryRef() {
            this.element.category = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/hwcatrory')
            }
            this.clickOtherFields()
        },
        setHWCategoryList() {
            this.selHWCategory = this.$store.getters.getHWCategory
            this.setactiveUUID()
        },
        setHWCategory(item) {
            this.clickOtherFields()
            if(this.element.category != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/hwcatrory')
                }
                //다른 ref에서 선 나갔으면 지워야한다.
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refHWCatrgory = true
                    this.$store.commit('editHWCategory', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWCategory_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/hwcatrory', this.element.uuid+'/hwcatrory', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/hwcatrory', end:item.uuid, iscircle:false, refNum:1})
                }
                this.element.category = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refHWCatrgory = true
                    this.$store.commit('editHWCategory', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWCategory_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/hwcatrory', this.element.uuid+'/hwcatrory', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/hwcatrory', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        newHWCategory() {
            this.$store.commit('addElementHWCategory', { 
                name: this.$store.getters.getNameHWCategory, path: '', input: false,
                top: this.element.top - 47, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                attribute: []
            })
            EventBus.$emit('add-element', constant.HWCategory_str)
            this.$store.commit('editHWElement', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckAttribute() {
            this.clickOtherFields()
            if (this.isdeleteAttributeItem == true) {
                this.isdeleteAttributeItem = false
                this.selectdeleteAttribut = []
            } else {
                this.isdeleteAttributeItem = true
            }
        },
        deleteAttribute() {
            this.clickOtherFields()
            if (this.isdeleteAttributeItem == true) {
                this.selectdeleteAttribut.forEach(item => {
                    for(let i=0; i<this.element.attribute.length; i++){
                        if (item.id == this.element.attribute[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+this.element.attribute[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/attributetable-'+this.element.attribute[i].id)
                            }
                        }
                    }
                })

                this.element.attribute = this.element.attribute.filter(item => {
                         return this.selectdeleteAttribut.indexOf(item) < 0 })
                this.isdeleteAttributeItem = false
                this.selectdeleteAttribut = []
            } 
        },
        setHWAttributeSelect() {
            if (this.isEditingHWAttribute == true) { 
                if (this.editAttributeItem.attr != null) {
                    if (this.editAttributeItem.attr.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editAttributeItem.attr.uuid, element: constant.HWCategory_index} )
                        /*document.getElementById(this.editAttributeItem.attr.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        EventBus.$emit('active-element', this.editAttributeItem.attr.uuid)*/
                    }
                }
                this.setHWAttributeList()
                this.isEditingHWAttribute = false
            } else {
                this.isEditingHWAttribute = true
            }
        },
        setHWAttributeList() {
            this.selHWAttribute = this.$store.getters.getHWAttributeDef
            this.setactiveUUID()
        },
        clearHWAttribute() {
            this.editAttributeItem.attr = null
        },
        cancelAttribute() {
            this.editAttributeItem = Object.assign({}, this.defaultAttributeItem)
            this.setactiveUUID()
        },
        editAttribute(idx) {
            console.log(this.editAttributeItem.attr)
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id)
            if (endLine != undefined && this.editAttributeItem.attr == null) {
                this.deleteLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id)
                this.element.attribute[idx].attr = null
            } else if (endLine != undefined && endLine != this.editAttributeItem.attr.uuid) {
                this.deleteLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id)
                this.newLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id, this.element.uuid+'/attributetable', this.editAttributeItem.attr.uuid, false)
                this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            } else if (endLine == undefined && this.editAttributeItem.attr != null && this.editAttributeItem.attr.uuid != null) {
                this.newLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id, this.element.uuid+'/attributetable', this.editAttributeItem.attr.uuid, false)
                this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            } else if (this.editAttributeItem.attr != null && endLine == this.editAttributeItem.attr.uuid && this.element.attribute[idx].name != this.editAttributeItem.attr.name) {
                this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            }

            if (this.refAtrribute == this.element.attribute[idx].id) {
                this.deleteOpenElement()
                if (this.editAttributeItem.attr != null && this.editAttributeItem.attr.uuid != null) {
                    var endLineChang = this.editAttributeItem.attr.uuid
                    this.$store.commit('editHWCategory', {compo:"drag", uuid: this.editAttributeItem.attr.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWCategory_str, uuid: this.editAttributeItem.attr.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/attributetable', endLineChang)
                        document.getElementById(endLineChang+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/attributetable', end:endLineChang, iscircle:false, refNum:2, idxID: this.refAtrribute})
                }
            }

            this.element.attribute[idx].vt = this.editAttributeItem.vt
            this.element.attribute[idx].v = this.editAttributeItem.v
            this.cancelAttribute()
        },
        openAttribute(idx) {
            if (this.element.attribute[idx].attr != null) {
                var endLineD = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id)
                if (endLineD == undefined) {
                    endLineD = this.$store.getters.getHWCategoryPath(this.element.attribute[idx].attr, 1)
                }
                this.editAttributeItem.attr = { name :this.element.attribute[idx].attr, uuid: endLineD }
            }

            this.editAttributeItem.vt = this.element.attribute[idx].vt
            this.editAttributeItem.v = this.element.attribute[idx].v
        },
        addAttribute() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.attribute.some(item => item.id === n)
            }
            this.editAttributeItem.id = n
            var endLine = null
            if( this.editAttributeItem.attr != null) {
                endLine = this.editAttributeItem.attr.uuid
                this.$store.commit('editHWCategory', {compo:"drag", uuid: this.editAttributeItem.attr.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.HWCategory_str, uuid: this.editAttributeItem.attr.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editAttributeItem.attr = this.editAttributeItem.attr.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/attributetable-'+n, this.element.uuid+'/attributetable', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/attributetable', end:endLine, iscircle:false, refNum:2, idxID: this.editAttributeItem.id})
            }
            const addObj = Object.assign({}, this.editAttributeItem);
            this.element.attribute.push(addObj);
            this.refAtrribute = n
            this.cancelAttribute()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editHWElement', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
        newLine(startLine, drawLine, endLine, isView) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine)
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.category = this.element.category
            this.editARXML.attribute = JSON.parse(JSON.stringify(this.element.attribute))
            this.dialogText= true
        },
        saveARXML() {
            var isHaveTable
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editHWElement', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            
            if (this.element.category != this.editARXML.category) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/hwcatrory')
                }
                var changEndLine = this.$store.getters.getHWCategoryPath(this.editARXML.category, 0)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/hwcatrory', this.element.uuid+'/hwcatrory', changEndLine, false)
                }
            }
            this.element.category = this.editARXML.category

            if (this.editARXML.attribute.length > 0) {
                this.editARXML.attribute.forEach(item => {
                    isHaveTable = false
                    for(let n=0; n<this.element.attribute.length; n++){
                        if (this.element.attribute[n].id == item.id && 
                            this.element.attribute[n].attr == item.attr) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+item.id)
                        if (endLineS != undefined) {
                            this.deleteLine(this.element.uuid+'/attributetable-'+item.id)
                        }
                        var changEndLineA = this.$store.getters.getHWCategoryPath(item.attr, 1)
                        if (changEndLineA != null) {
                            this.newLine(this.element.uuid+'/attributetable-'+item.id, this.element.uuid+'/attributetable', changEndLineA, false)
                        }
                    }
                    if (item.vt != null) {
                        item.vt = item.vt.toUpperCase()
                        if(!(item.vt == 'EEPROM' || item.vt == 'FLASH' || item.vt == 'RAM' || item.vt == 'ROM')) {
                            item.vt = null
                        }
                    }
                })
                this.element.attribute.forEach(item => {
                    isHaveTable = false
                    this.editARXML.attribute.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+item.id)
                        if (endLineS != undefined) {
                            this.deleteLine(this.element.uuid+'/attributetable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.attribute.length > 0) {
                    this.element.attribute.forEach(item => {
                        if (item.attr != null) {
                            var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+item.id)
                            if (endLineS != undefined) {
                                this.deleteLine(this.element.uuid+'/attributetable-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.attribute = JSON.parse(JSON.stringify(this.editARXML.attribute))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', category: '', attribute: []}
            this.editTextItem = { attr: null, vt:null, v:'', id: ''}
            this.dialogText = false
        },
        newTextAttribute() {
            this.editTextItem = { attr: null, vt: null, v:'', id: ''}
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

    }
}
</script>
