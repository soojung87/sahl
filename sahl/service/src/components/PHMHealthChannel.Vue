<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showPHMHealth">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>PHM Health Channel Interface</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>PHM Health Channel Interface</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputPHMHealthName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showStatuss" x-small color="indigo">
                                            <v-icon>{{ isStatussOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Statuss
                                    <v-btn @click="isCheckStatuss" text x-small color="indigo" v-if="isStatussOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isStatussOpenClose && isdeleteStatussItem" @click="deletStatuss" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isStatussOpenClose">
                                    <v-data-table v-model="selectDelectStatuss" :headers="headerStatus" :items="element.status" :items-per-page='20'
                                            :show-select="isdeleteStatussItem" item-key="id" height="100px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteStatussItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openStatuss(idx)" @cancel="editStatuss(idx)" @save="cancelStatuss" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editItem.status" label="Status ID" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addStatuss()" @save="cancelStatuss"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-text-field v-model="editItem.status" label="Status ID" placeholder="Integer" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
            isStatussOpenClose: true,
            isdeleteStatussItem: false,
            selectDelectStatuss: [],
            headerStatus: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Status ID', align: 'start', sortable: false, value: 'status' },
            ],
            editItem: { name : '', status: ''},
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
        showPHMHealth () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        showStatuss() {
            this.isStatussOpenClose = this.isStatussOpenClose ? false : true
        },
        inputPHMHealthName () {
            this.$store.commit('editPHMHealth', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        isCheckStatuss() {
            if (this.isdeleteStatussItem == true) {
                this.isdeleteStatussItem = false
                this.selectDelectStatuss = []
            } else {
                this.isdeleteStatussItem = true
            }
        },
        deletStatuss() {
            if (this.isdeleteStatussItem == true) {
                this.element.status = this.element.status.filter(item => {
                        return this.selectDelectStatuss.indexOf(item) < 0 })

                this.isdeleteStatussItem = false
                this.selectDelectStatuss = []
            } 
        },
        editStatuss(idx) {
            if (this.element.status[idx].name != this.editItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'PHMHealth', listname: this.editItem.name} )
            }
            this.element.status[idx].name = this.editItem.name
            this.element.status[idx].status = this.editItem.status
            this.cancelStatuss()
        },
        cancelStatuss() {
            this.editItem.name = ''
            this.editItem.status = ''
            this.setactiveUUID()
        },
        openStatuss(idx) {
            this.editItem.name = this.element.status[idx].name
            this.editItem.status = this.element.status[idx].status
        },
        addStatuss() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.status.some(item => item.id === n)
            }
            this.editItem.id = n

            const addObj = Object.assign({}, this.editItem)
            this.element.status.push(addObj);
            this.cancelStatuss()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editPHMHealth', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    },

}
</script>