<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showVehiclePackage">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Software Package</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Software Package</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputVehiclePackageName' outlined dense></v-text-field>
                    <v-text-field v-model="element.reposi" label="Repository" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/PERArraySDG'" style="height:20px">
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
                                    :show-select="isdeleteSDGSItem" item-key="id" height="100px" dense hide-default-footer >
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
                                                            <v-text-field v-model="editSDGSItem.sd" label="Vehicle Description" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                            <v-text-field v-model="editSDGSItem.sd" label="Vehicle Description" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                <v-btn text @click="showDriver" x-small color="indigo">
                                    <v-icon>{{ isDriverOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Driver Notifications
                            <v-btn @click="isCheckDriver" text x-small color="indigo" v-if="isDriverOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isDriverOpenClose && isdeleteDriverItem" @click="deletDriver" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isDriverOpenClose">
                            <v-data-table v-model="selectDelectDriver" :headers="headerDriver" :items="element.driver" :items-per-page='20'
                                    :show-select="isdeleteDriverItem" item-key="id" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteDriverItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openDriver(idx)" @cancel="editDriver(idx)" @save="cancelDriver" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-select v-model="editDriveItem.appro" :items="enumAppro" clearable label="Approval Required" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-select v-model="editDriveItem.notify" :items="enumNotification" clearable label="Notification State" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addDriver()" @save="cancelDriver"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-select v-model="editDriveItem.appro" :items="enumAppro" clearable label="Approval Required" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-select v-model="editDriveItem.notify" :items="enumNotification" clearable label="Notification State" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                                <v-btn text @click="showRollout" x-small color="indigo">
                                    <v-icon>{{ isRolloutOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Rollout Qualifications
                            <v-btn @click="isCheckRollout" text x-small color="indigo" v-if="isRolloutOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isRolloutOpenClose && isdeleteRolloutItem" @click="deletRollout" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isRolloutOpenClose">
                            <v-data-table v-model="selectDelectRollout" :headers="headerRollout" :items="element.rollout" :items-per-page='20'
                                    :show-select="isdeleteRolloutItem" item-key="id" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteRolloutItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openRollout(idx)" @cancel="editRollout(idx)" @save="cancelRollout" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editRolloutItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editRolloutItem.policy" label="Safety Policy" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addRollout()" @save="cancelRollout"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editRolloutItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editRolloutItem.policy" label="Safety Policy" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                        <div class="subtitle-2" :id="element.uuid+'/UCMModule'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showUCMS" x-small color="indigo">
                                    <v-icon>{{ isUCMSOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            UCMS
                            <v-btn @click="isCheckUCMS" text x-small color="indigo" v-if="isUCMSOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isUCMSOpenClose && isdeleteUCMSItem" @click="deletUCMS" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isUCMSOpenClose">
                            <v-data-table v-model="selectDelectUCMS" :headers="headerUCMS" :items="element.ucms" :items-per-page='20'
                                    :show-select="isdeleteUCMSItem" item-key="id" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteUCMSItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editUCMS(idx)" @open="openUCMS(idx)" @save="cancelUCMS" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editUCMSItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editUCMSItem.ident" label="Identifier" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editUCMSItem.module' label='UCM Module Instantiation Ref' :items='selModule' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingModule" clearable @click="setModuleSelect()" 
                                                                    @click:clear='clearModuleRef' @blur="isEditingModule=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newUCMModule">
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
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addUCMS()" @save="cancelUCMS"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon>mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editUCMSItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editUCMSItem.ident" label="Identifier" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editUCMSItem.module' label='UCM Module Instantiation Ref' :items='selModule' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingModule" clearable @click="setModuleSelect()" 
                                                                    @click:clear='clearModuleRef' @blur="isEditingModule=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newUCMModule">
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

            isSDGSOpenClose: true,
            isdeleteSDGSItem: false,
            selectDelectSDGS: [],
            headerSDGS: [
                { text: 'Vehicle Description', align: 'start', sortable: false, value: 'sd' },
            ],
            editSDGSItem: { sd : null, id: ''},

            isDriverOpenClose: true,
            isdeleteDriverItem: false,
            selectDelectDriver: [],
            headerDriver: [
                { text: 'Approval Required', align: 'start', sortable: false, value: 'appro' },
                { text: 'Notification State', align: 'start', sortable: false, value: 'notify' },
            ],
            editDriveItem: { appro : null, notify: null, id: ''},
            enumAppro: ['Yes', 'No'],
            enumNotification: ['transfer','process', 'activate', 'rollBack', 'finish'],

            isRolloutOpenClose: true,
            isdeleteRolloutItem: false,
            selectDelectRollout: [],
            headerRollout: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Safety Policy', align: 'start', sortable: false, value: 'policy' },
            ],
            editRolloutItem: { name : '', policy: '', id: ''},

            isUCMSOpenClose: true,
            isEditingModule: true,
            isdeleteUCMSItem: false,
            selModule: this.$store.getters.getModuleInstant,
            selectDelectUCMS: [],
            headerUCMS: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Identifier', align: 'start', sortable: false, value: 'ident' },
                { text: 'UCM Module Instantiation Ref', align: 'start', width: '200px', sortable: false, value: 'module' },
            ],
            editUCMSItem: { name: '', ident: '', module : null, id: ''},
            deleteChangeLineUCMS : [],
        }
    },
    methods: {
        submitDialog(element) {
            this.element.path = element
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
        showVehiclePackage() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showSDGS() {
            this.isSDGSOpenClose = this.isSDGSOpenClose ? false : true
        },
        showDriver() {
            this.isDriverOpenClose = this.isDriverOpenClose ? false : true
        },
        showRollout() {
            this.isRolloutOpenClose = this.isRolloutOpenClose ? false : true
        },
        showUCMS() {
            this.isUCMSOpenClose = this.isUCMSOpenClose ? false : true
        },
        inputVehiclePackageName() {
            this.$store.commit('editVehiclePackage', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
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
                this.element.sdgs = this.element.sdgs.filter(item => {
                        return this.selectDelectSDGS.indexOf(item) < 0 })

                this.isdeleteSDGSItem = false
                this.selectDelectSDGS = []
            } 
        },
        editSDGS(idx) {
            this.element.sdgs[idx].sd = this.editSDGSItem.sd
            this.cancelSDGS()
        },
        cancelSDGS() {
            this.editSDGSItem.sd = null
            this.editSDGSItem.id = ''
            this.setactiveUUID()
        },
        openSDGS(idx) {
            this.editSDGSItem.sd = this.element.sdgs[idx].sd
        },
        addSDGS() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.sdgs.some(item => item.id === n)
            }
            this.editSDGSItem.id = n
            const addObj = Object.assign({}, this.editSDGSItem)
            this.element.sdgs.push(addObj)
            this.cancelSDGS()
        },
        clearSDGS() {
            this.editSDGSItem.sdg = null
        },

        isCheckDriver() {
            if (this.isdeleteDriverItem == true) {
                this.isdeleteDriverItem = false
                this.selectDelectDriver = []
            } else {
                this.isdeleteDriverItem = true
            }
        },
        deletDriver() {
            if (this.isdeleteDriverItem == true) {
                this.element.driver = this.element.driver.filter(item => {
                        return this.selectDelectDriver.indexOf(item) < 0 })

                this.isdeleteDriverItem = false
                this.selectDelectDriver = []
            } 
        },
        editDriver(idx) {
            this.element.driver[idx].appro = this.editDriveItem.appro
            this.element.driver[idx].notify = this.editDriveItem.notify
            this.cancelDriver()
        },
        cancelDriver() {
            this.editDriveItem.appro = null
            this.editDriveItem.notify = null
            this.setactiveUUID()
        },
        openDriver(idx) {
            this.editDriveItem.appro = this.element.driver[idx].appro
            this.editDriveItem.notify = this.element.driver[idx].notify
        },
        addDriver() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.driver.some(item => item.id === n)
            }
            this.editDriveItem.id = n
            const addObj = Object.assign({}, this.editDriveItem)
            this.element.driver.push(addObj)
            this.cancelDriver()
        },

        isCheckRollout() {
            if (this.isdeleteRolloutItem == true) {
                this.isdeleteRolloutItem = false
                this.selectDelectRollout = []
            } else {
                this.isdeleteRolloutItem = true
            }
        },
        deletRollout() {
            if (this.isdeleteRolloutItem == true) {
                this.element.rollout = this.element.rollout.filter(item => {
                        return this.selectDelectRollout.indexOf(item) < 0 })

                this.isdeleteRolloutItem = false
                this.selectDelectRollout = []
            } 
        },
        editRollout(idx) {
            if (this.element.rollout[idx].name != this.editRolloutItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'UCMRollout', listname: this.editRolloutItem.name} )
            }
            this.element.rollout[idx].name = this.editRolloutItem.name
            this.element.rollout[idx].policy = this.editRolloutItem.policy
            this.cancelRollout()
        },
        cancelRollout() {
            this.editRolloutItem.name = ''
            this.editRolloutItem.policy = ''
            this.setactiveUUID()
        },
        openRollout(idx) {
            this.editRolloutItem.name = this.element.rollout[idx].name
            this.editRolloutItem.policy = this.element.rollout[idx].policy
        },
        addRollout() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.rollout.some(item => item.id === n)
            }
            this.editRolloutItem.id = n

            const addObj = Object.assign({}, this.editRolloutItem)
            this.element.rollout.push(addObj)
            this.cancelRollout()
        },

        isCheckUCMS() {
            if (this.isdeleteUCMSItem == true) {
                this.isdeleteUCMSItem = false
                this.selectDelectUCMS = []
            } else {
                this.isdeleteUCMSItem = true
            }
        },
        deletUCMS() {
            if (this.isdeleteUCMSItem == true) {
                for(let i=0; i<this.element.ucms.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/UCMModule-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineUCMS.push({id:this.element.ucms[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/UCMModule-'+i)
                    }
                }

                this.element.ucms = this.element.ucms.filter(item => {
                        return this.selectDelectUCMS.indexOf(item) < 0 })

                for(let n=0; n<this.element.ucms.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineUCMS.length; idx++) {
                        if (this.element.ucms[n].id == this.deleteChangeLineUCMS[idx].id) {
                            this.newLine(this.element.uuid+'/UCMModule-'+n, this.element.uuid+'/UCMModule', this.deleteChangeLineUCMS[idx].endLine)
                        }
                    }
                }

                this.isdeleteUCMSItem = false
                this.selectDelectUCMS = []
                this.deleteChangeLineUCMS = []
            } 
        },
        openUCMS(idx) {
            this.selModule = this.$store.getters.getModuleInstant
            if ( this.element.ucms[idx].module != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/UCMModule-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getModuleInstantPath(this.element.ucms[idx].module)
                }
                this.editUCMSItem.module = { name: this.element.ucms[idx].module, uuid: endLine }
            }
            this.editUCMSItem.name = this.element.ucms[idx].name
            this.editUCMSItem.ident = this.element.ucms[idx].ident
        },
        editUCMS(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/UCMModule-'+idx)
            if (endLine != undefined && this.editUCMSItem.module == null) {
                this.deleteLine(this.element.uuid+'/UCMModule-'+idx)
                this.element.ucms[idx].module = null
            } else if (endLine != undefined && endLine != this.editUCMSItem.module.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/UCMModule-'+idx)
                this.newLine(this.element.uuid+'/UCMModule-'+idx, this.element.uuid+'/UCMModule', this.editUCMSItem.module.uuid)
                this.element.ucms[idx].module = this.editUCMSItem.module.name
            } else if (endLine == undefined && this.editUCMSItem.module != null) {
                this.newLine(this.element.uuid+'/UCMModule-'+idx, this.element.uuid+'/UCMModule', this.editUCMSItem.module.uuid)
                this.element.ucms[idx].module = this.editUCMSItem.module.name
            }
            this.element.ucms[idx].name = this.editUCMSItem.name
            this.element.ucms[idx].ident = this.editUCMSItem.ident
            this.cancelUCMS()
        },
        cancelUCMS() {
            this.editUCMSItem.name = ''
            this.editUCMSItem.ident = ''
            this.editUCMSItem.module = null
            this.setactiveUUID()
        },
        addUCMS() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.ucms.some(item => item.id === n)
            }
            this.editUCMSItem.id = n

            if( this.editUCMSItem.module != null) {
                var datacount = this.element.ucms.length
                this.newLine(this.element.uuid+'/UCMModule-'+datacount, this.element.uuid+'/UCMModule', this.editUCMSItem.module.uuid)
                this.editUCMSItem.module = this.editUCMSItem.module.name
            }
            const addObj = Object.assign({}, this.editUCMSItem)
            this.element.ucms.push(addObj);
            this.cancelUCMS()
        },

        clearModuleRef() {
            this.isEditingModule = true
            this.editUCMSItem.module = null
        },
        setModuleSelect() {
            if (this.isEditingModule == true) {
                if (this.editUCMSItem.module != null && this.editUCMSItem.module.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editUCMSItem.module.uuid, element: constant.ModuleInstantiation_str} )
                }
                this.setModuleList()
                this.isEditingModule = false
            } else {
                this.isEditingModule = true
            }
        },
        setModuleList() {
            this.selModule = this.$store.getters.getModuleInstant
            this.setactiveUUID()
        },
        newUCMModule() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementModuleInstant', {
                name: this.$store.getters.getNameModuleInstant, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                ident: '',
            })
            EventBus.$emit('add-element', constant.ModuleInstantiation_str)
            this.$store.commit('editVehiclePackage', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editVehiclePackage', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
