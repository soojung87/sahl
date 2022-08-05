<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showStartupConfigset">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Startup Config Set</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Startup Config Set</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputStartupConfigName' outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showStartupConfig" x-small color="indigo">
                                            <v-icon>{{ isStartupConfigOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Startup Config
                                    <v-btn v-if="isStartupConfigOpenClose" @click="addStartUpConfig()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isStartupConfigOpenClose">
                                    <v-tabs v-model='startupCTab' height="30px" show-arrows @change="changeStartUpConfigTab()">
                                        <v-tab v-for="(tab, idx) in element.config" :key="idx" @click="clickStartUpConfigtab()"> 
                                            {{tab.configname}}
                                            <v-btn text x-small @click="deleteStartUpConfig(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="startupCTab">
                                        <v-tab-item v-for="(tab, idx) in element.config" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.configname" label="name" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                    <v-select :items="schedulingPolicy" label="Scheduling Policy" @click="setactiveUUID()" v-model="tab.policy" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                                                    <v-text-field v-model="tab.priority" label="Scheduling Priority" placeholder="int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.entertimeout" label="Enter Timeout" placeholder="Time Value" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.exittimeout" label="Exit Timeout" placeholder="Time Value" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-card outlined class="mx-auto">
                                                        <div class="subtitle-2" style="height:20px">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showOptions" x-small color="indigo">
                                                                    <v-icon>{{ isOptionsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Startup Options
                                                            <v-btn @click="isCheckOptions" text x-small color="indigo" v-if="isOptionsOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isOptionsOpenClose && isdeleteOptions" @click="deleteOptions" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isOptionsOpenClose">
                                                            <v-data-table v-model="selectDelectOptions" :headers="headerOptions" :items="tab.option" :items-per-page='20'
                                                                    :show-select="isdeleteOptions" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteOptions" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openOptions(num)" @cancel="editOptionsItem(num)" @save="cancelOptions" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-text-field v-model="editOptions.arg" label="Option Argument" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                        <v-select :items="optionKind" label="Option Kind" @click="setactiveUUID()" v-model="editOptions.kind" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                                                                                        <v-text-field v-model="editOptions.name" label="Option Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addOptions()" @save="cancelOptions"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-text-field v-model="editOptions.arg" label="Option Argument" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                        <v-select :items="optionKind" label="Option Kind" @click="setactiveUUID()" v-model="editOptions.kind" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                                                                                        <v-text-field v-model="editOptions.name" label="Option Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                <v-btn text @click="showEnvironmentV" x-small color="indigo">
                                                                    <v-icon>{{ isEnvironmentVOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Environment Variables
                                                            <v-btn @click="isCheckEnvironmentV" text x-small color="indigo" v-if="isEnvironmentVOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isEnvironmentVOpenClose && isdeleteEnvironmentV" @click="deleteEnvironmentV" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-if="isEnvironmentVOpenClose">
                                                            <v-data-table v-model="selectDelectEnvironmentV" :headers="headerEnvironmentV" :items="tab.environ" :items-per-page='20'
                                                                    :show-select="isdeleteEnvironmentV" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteEnvironmentV" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openEnvironmentV(num)" @cancel="editEnvironmentV(num)" @save="cancelEnvironmentV" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-text-field v-model="editEnvironItem.key" label="Key" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                        <v-text-field v-model="editEnvironItem.value" label="Value" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addEnvironmentV()" @save="cancelEnvironmentV"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-text-field v-model="editEnvironItem.key" label="Key" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                        <v-text-field v-model="editEnvironItem.value" label="Value" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                        <v-card-text v-else-if="zoomvalue > $setZoominElement  || !minimaptoolbar">
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
            isStartupConfigOpenClose : true,
            schedulingPolicy: ['SCHEDULING-POLICY-FIFO', 'SCHEDULING-POLICY-ROUND-ROBIN',],
            optionKind: ['COMMAND-LINE-SIMPLE-FORM', 'COMMAND-LINE-SHORT-FORM', 'COMMAND-LINE-LONG-FORM'],
            startupCTab: null,
            isOptionsOpenClose: true,
            isdeleteOptions: false,
            selectDelectOptions: [],
            headerOptions: [
                { text: 'Option Argument', sortable: false, value: 'arg' },
                { text: 'Option Kind', sortable: false, value: 'kind' },
                { text: 'Option Name', sortable: false, value: 'name' },
            ],
            editOptions: { arg: '', kind: null, name: '', id: ''},

            isEnvironmentVOpenClose: true,
            isdeleteEnvironmentV: false,
            selectDelectEnvironmentV: [],
            headerEnvironmentV: [
                { text: 'Key', align: 'start', sortable: false, value: 'key' },
                { text: 'Value', sortable: false, value: 'value' },
            ],
            editEnvironItem: { key: '', value: '', id: '' },
            defaultEnvironItem: { key: '', value: '', id: '' },

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
        showStartupConfigset() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
        },
        showStartupConfig() {
            this.isStartupConfigOpenClose = this.isStartupConfigOpenClose ? false : true
        },
        showOptions() {
            this.isOptionsOpenClose = this.isOptionsOpenClose ? false : true
        },
        showEnvironmentV() {
            this.isEnvironmentVOpenClose = this.isEnvironmentVOpenClose ? false : true
        },
        inputStartupConfigName() {
            this.$store.commit('editStartupConfig', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        addStartUpConfig() {
            const editItem = {configname: '', policy: null, priority: '', entertimeout: '', exittimeout: '', option: [], environ: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.configname = 'StartupConfig_' + n++;
                res = this.element.config.some(ele => ele.configname === addObj.configname)
            }
            addObj.id = n
            this.element.config.push(addObj)
            this.startupCTab = this.element.config.length-1
        },
        clickStartUpConfigtab() {
            this.isdeleteOptions = false
            this.selectDelectOptions = []
        },
        changeStartUpConfigTab() {
        },
        deleteStartUpConfig(idx) {
            this.element.config.splice(idx, 1)
        },
        isCheckOptions() {
            if (this.isdeleteOptions == true) {
                this.isdeleteOptions = false
                this.selectDelectOptions = []
            } else {
                this.isdeleteOptions = true
            }
        },
        deleteOptions() {
            if (this.isdeleteOptions == true) {
                this.element.config[this.startupCTab].option = this.element.config[this.startupCTab].option.filter(item => {
                        return this.selectDelectOptions.indexOf(item) < 0 })

                this.isdeleteOptions = false
                this.selectDelectOptions = []
            } 
        },
        openOptions(idx) {
            this.editOptions.arg = this.element.config[this.startupCTab].option[idx].arg
            this.editOptions.kind = this.element.config[this.startupCTab].option[idx].kind
            this.editOptions.name = this.element.config[this.startupCTab].option[idx].name
        },
        editOptionsItem(idx) {
            this.element.config[this.startupCTab].option[idx].arg = this.editOptions.arg
            this.element.config[this.startupCTab].option[idx].kind = this.editOptions.kind
            this.element.config[this.startupCTab].option[idx].name = this.editOptions.name
            this.cancelOptions()
        },
        cancelOptions() {
            this.editOptions = {arg: '', kind: null, name: '', id: ''}
            this.setactiveUUID()
        },
        addOptions() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.config[this.startupCTab].option.some(item => item.id === n)
            }
            this.editOptions.id = n

            const addObj = Object.assign({}, this.editOptions)
            this.element.config[this.startupCTab].option.push(addObj);
            this.cancelOptions()
        },

        isCheckEnvironmentV() {
            if (this.isdeleteEnvironmentV == true) {
                this.isdeleteEnvironmentV = false
                this.selectDelectEnvironmentV = []
            } else {
                this.isdeleteEnvironmentV = true
            }
        },
        deleteEnvironmentV() {
            if (this.isdeleteEnvironmentV == true) {
                this.element.config[this.startupCTab].environ = this.element.config[this.startupCTab].environ.filter(item => {
                        return this.selectDelectEnvironmentV.indexOf(item) < 0 })

                this.isdeleteEnvironmentV = false
                this.selectDelectEnvironmentV = []
            } 
        },
        openEnvironmentV(idx) {
            this.editEnvironItem.key = this.element.config[this.startupCTab].environ[idx].key
            this.editEnvironItem.value = this.element.config[this.startupCTab].environ[idx].value
        },
        editEnvironmentV(idx) {
            this.element.config[this.startupCTab].environ[idx].key = this.editEnvironItem.key
            this.element.config[this.startupCTab].environ[idx].value = this.editEnvironItem.value
            this.cancelEnvironmentV()
        },
        cancelEnvironmentV() {
            this.editEnvironItem = Object.assign({}, this.defaultEnvironItem)
            this.setactiveUUID()
        },
        addEnvironmentV() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.config[this.startupCTab].environ.some(item => item.id === n)
            }
            this.editEnvironItem.id = n

            const addObj = Object.assign({}, this.editEnvironItem)
            this.element.config[this.startupCTab].environ.push(addObj);
            this.cancelEnvironmentV()
        },

        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editStartupConfig', {compo:"z", uuid:this.element.uuid, zindex:10} )
        },
    },
}
</script>
