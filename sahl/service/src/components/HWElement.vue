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
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>HW Element</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text  v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputHWElementName' outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.category" readonly clearable @click:clear='clearHWCategoryRef()' label="HW Category" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/hwcatrory'" dark icon v-bind="attrs" v-on="on">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selHWCategory" :key="i" link @click="setHWCategory(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
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
                                            :show-select="isdeleteAttributeItem" item-key="id" height="100px" dense hide-default-footer >
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
                                                                        return-object @click:clear='clearHWAttribute' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-if="editAttributeItem.attr !=null && editAttributeItem.attr.uuid == 1" v-model="editAttributeItem.vt" :items="attributeType" label="type" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-if="editAttributeItem.attr !=null && editAttributeItem.attr.uuid == 2" v-model="editAttributeItem.v" label="Size" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                        return-object @click:clear='clearHWAttribute' clearable>
                                                                </v-autocomplete>
                                                                <v-select v-if="editAttributeItem.attr !=null && editAttributeItem.attr.uuid == 1" v-model="editAttributeItem.vt" :items="attributeType" label="type" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-if="editAttributeItem.attr !=null && editAttributeItem.attr.uuid == 2"  v-model="editAttributeItem.v" label="Size" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
            rules: { name:  [val => (val || '').length > 0 ], },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: this.minimaptoolbar,
            selHWCategory: [{name:"/AUTOSAR/MemorySegment", uuid:null},],
            selHWAttribute: [{name:"/AUTOSAR/MemorySegment/memoryType", uuid:1},{name:"/AUTOSAR/MemorySegment/memorySize", uuid:2},],
            isAttributeOpenClose: true,
            isdeleteAttributeItem: false,
            headersAttribut: [
                { text: 'HW Attribute', align: 'start', sortable: false, value: 'attr' },
                { text: 'Type',  sortable: false, value: 'vt' },
                { text: 'Size', sortable: false, value: 'v' },
            ],
            attributeType: [ 'EEPROM', 'FLASH', 'RAM','ROM',],
            selectdeleteAttribut: [],
            editAttributeItem: { attr: null, vt:'', v:'', id: ''},
            defaultAttributeItem: { attr: null, vt:'', v:'', id: ''}

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
        setHWCategory(item) {
            this.element.category = item.name
            this.setactiveUUID()
        },
        clearHWCategoryRef() {
            this.element.category = null
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
                this.element.attribute = this.element.attribute.filter(item => {
                         return this.selectdeleteAttribut.indexOf(item) < 0 })
                this.isdeleteAttributeItem = false
                this.selectdeleteAttribut = []
            } 
        },
        clearHWAttribute() {
            this.editAttributeItem.attr = null
        },
        cancelAttribute() {
            this.editAttributeItem = Object.assign({}, this.defaultAttributeItem)
            this.setactiveUUID()
        },
        editAttribute(idx) {
            this.element.attribute[idx].attr = this.editAttributeItem.attr.name
            if (this.element.attribute[idx].attr == "/AUTOSAR/MemorySegment/memoryType") {
                this.element.attribute[idx].v = ''
                this.element.attribute[idx].vt = this.editAttributeItem.vt
            } else if (this.element.attribute[idx].attr == "/AUTOSAR/MemorySegment/memorySize"){
                this.element.attribute[idx].vt = ''
                this.element.attribute[idx].v = this.editAttributeItem.v
            }
            this.cancelAttribute()
        },
        openAttribute(idx) {
            console.log(this.element.attribute[idx].attr)
            var id = null
            if (this.element.attribute[idx].attr == "/AUTOSAR/MemorySegment/memoryType") {
                id = 1
            } else if (this.element.attribute[idx].attr == "/AUTOSAR/MemorySegment/memorySize"){
                id = 2
            }
            this.editAttributeItem.attr = { name: this.element.attribute[idx].attr, uuid: id}
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
            this.editAttributeItem.attr = this.editAttributeItem.attr.name
            const addObj = Object.assign({}, this.editAttributeItem);
            this.element.attribute.push(addObj);
            this.cancelAttribute()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editHWElement', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    }
}
</script>
