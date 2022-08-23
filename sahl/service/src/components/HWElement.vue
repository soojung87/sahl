<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
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
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>HW Element</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text  v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputHWElementName' outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.category" readonly @click="setHWCategorySelect()" clearable @click:clear='clearHWCategoryRef()' label="HW Category" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-data-table v-model="selectdeleteAttribut" :headers="headersAttribut" :items="element.attribute" :items-per-page='20'
                                            :show-select="isdeleteAttributeItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteAttributeItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx" >
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openAttribute(idx)" @cancel="editAttribute(idx)" @save="cancelAttribute" large >
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addAttribute()" @save="cancelAttribute"> 
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
                        <v-card-text v-show="(!iselementOpenClose && zoomvalue > $setZoominElement) || !minimaptoolbar">
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
                            <label style="padding:10px;">&#60;HW-ATTRIBUTE-VALUES&#62;
                                <v-btn @click="newTextAttribute()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.attribute" :key="i" style="height: 130px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 30px;">
                                            <v-btn @click="deletTextAttribute(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            &#60;HW-ATTRIBUTE-VALUE&#62;
                                        </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:2px 0px 2px 100px;">
                                        <v-col cols="4">
                                        <label>&#60;HW-ATTRIBUTE-DEF-REF&#62;</label>
                                        </v-col><v-col cols="5">
                                        <v-text-field v-model="item.attr" placeholder="Path" style="margin:-5px 0px 0px 0px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;HW-ATTRIBUTE-DEF-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;VT&#62;</label>
                                        <v-text-field v-model="item.vt" placeholder="EEPROM or FLASH or RAM or ROM"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;VT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;V&#62;</label>
                                        <v-text-field v-model="item.v" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;V&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:80px;">&#60;&#47;HW-ATTRIBUTE-VALUE&#62;</label>
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
            iselementOpenClose: this.minimaptoolbar,
            dialogText: false,
            editARXML: {name:'', category: '', attribute: []},
            editTextItem: { attr: null, vt: null, v:'', id: ''},
            selHWCategory: this.$store.getters.getHWCategory,
            selHWAttribute: this.$store.getters.getHWAttributeDef,
            isAttributeOpenClose: true,
            isdeleteAttributeItem: false,
            headersAttribut: [
                { text: 'HW Attribute', align: 'start', sortable: false, value: 'attr' },
                { text: 'Type',  sortable: false, value: 'vt' },
                { text: 'Size', sortable: false, value: 'v' },
            ],
            attributeType: [ 'EEPROM', 'FLASH', 'RAM','ROM',],
            selectdeleteAttribut: [],
            editAttributeItem: { attr: null, vt:null, v:'', id: ''},
            defaultAttributeItem: { attr: null, vt:null, v:'', id: ''},
            isEditingHWAttribute: true,
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
        showHWElement() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showAttributeItem() {
            this.isAttributeOpenClose = this.isAttributeOpenClose ? false : true
        },
        inputHWElementName() {
            this.$store.commit('editHWElement', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        setHWCategorySelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
            if (endLine == undefined) {
                endLine = this.$store.getters.getHWCategoryPath(this.element.category, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.HWCategory_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        clearHWCategoryRef() {
            this.element.category = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/hwcatrory')
            }
        },
        setHWCategoryList() {
            this.selHWCategory = this.$store.getters.getHWCategory
            this.setactiveUUID()
        },
        setHWCategory(item) {
            if(this.element.category != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwcatrory')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/hwcatrory')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/hwcatrory', this.element.uuid+'/hwcatrory', item.uuid)
                }
                this.element.category = item.name
            }
            this.setactiveUUID()
        },
        newHWCategory() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementHWCategory', { 
                name: this.$store.getters.getNameHWCategory, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                attribute: []
            })
            EventBus.$emit('add-element', constant.HWCategory_str)
            this.$store.commit('editHWElement', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckAttribute() {
            if (this.isdeleteAttributeItem == true) {
                this.isdeleteAttributeItem = false
                this.selectdeleteAttribut = []
            } else {
                this.isdeleteAttributeItem = true
            }
        },
        deleteAttribute() {
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
                        document.getElementById(this.editAttributeItem.attr.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        EventBus.$emit('active-element', this.editAttributeItem.attr.uuid)
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
                this.newLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id, this.element.uuid+'/attributetable', this.editAttributeItem.attr.uuid)
                this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            } else if (endLine == undefined && this.editAttributeItem.attr != null && this.editAttributeItem.attr.uuid != null) {
                this.newLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id, this.element.uuid+'/attributetable', this.editAttributeItem.attr.uuid)
                this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            } else if (this.editAttributeItem.attr != null && endLine == this.editAttributeItem.attr.uuid && this.element.attribute[idx].name != this.editAttributeItem.attr.name) {
                this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            }

            this.element.attribute[idx].vt = this.editAttributeItem.vt
            this.element.attribute[idx].v = this.editAttributeItem.v
            this.cancelAttribute()
        },
        openAttribute(idx) {
            if (this.element.attribute[idx].attr != null) {
                var endLineD = this.$store.getters.getChangeEndLine(this.element.uuid+'/attributetable-'+this.element.attribute[idx].id)
                if (endLineD == undefined) {
                    endLineD = this.$store.getters.getDataConstrPath(this.element.attribute[idx].attr)
                }
                this.editAttributeItem.attr = { name :this.element.attribute[idx].attr, uuid: endLineD }
            }

            this.editAttributeItem.vt = this.element.attribute[idx].vt
            this.editAttributeItem.v = this.element.attribute[idx].v
        },
        addAttribute() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.attribute.some(item => item.id === n)
            }
            this.editAttributeItem.id = n
            if( this.editAttributeItem.attr != null) {
                this.newLine(this.element.uuid+'/attributetable-'+n, this.element.uuid+'/attributetable', this.editAttributeItem.attr.uuid)
                this.editAttributeItem.attr = this.editAttributeItem.attr.name
            }
            const addObj = Object.assign({}, this.editAttributeItem);
            this.element.attribute.push(addObj);
            this.cancelAttribute()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editHWElement', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
                    this.newLine(this.element.uuid+'/hwcatrory', this.element.uuid+'/hwcatrory', changEndLine)
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
                            this.newLine(this.element.uuid+'/attributetable-'+item.id, this.element.uuid+'/attributetable', changEndLineA)
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
