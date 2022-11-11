<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Startup Config Set</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
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
                                                    <v-text-field v-model="tab.configname" label="name" :rules="rules.name" @input="inputConfigName()" @click="clickConfigName(tab.configname)" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
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
                                                            <v-data-table v-model="selectDelectOptions" :headers="headerOptions" :items="tab.option" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeleteOptions" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteOptions" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent @open="openOptions(num)" @cancel="cancelOptions" @save="editOptionsItem(num)" large >
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
                                                                                <v-edit-dialog  large persistent @cancel="cancelOptions" @save="addOptions()"> 
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
                                                            <v-data-table v-model="selectDelectEnvironmentV" :headers="headerEnvironmentV" :items="tab.environ" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeleteEnvironmentV" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteEnvironmentV" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent @open="openEnvironmentV(num)" @cancel="cancelEnvironmentV" @save="editEnvironmentV(num)" large >
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
                                                                                <v-edit-dialog  large persistent @cancel="cancelEnvironmentV" @save="addEnvironmentV()"> 
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
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;STARTUP-CONFIGS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextStartup()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 600px;">
                            <v-row v-for="(item, i) in editARXML.config" :key="i" style="height: 550px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextStartup(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;STARTUP-CONFIG&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.configname" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SCHEDULING-POLICY&#62;</label>
                                        <v-text-field v-model="item.schedulingPolicy" placeholder="SCHEDULING-POLICY-FIFO or SCHEDULING-POLICY-ROUND-ROBIN"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SCHEDULING-POLICY&#62;</label>
                                    </v-row>
                                    <v-row style="height: 15px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SCHEDULING-PRIORITY&#62;</label>
                                        <v-text-field v-model="item.priority" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SCHEDULING-PRIORITY&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;ENVIRONMENT-VARIABLES&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEnviro(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 120px;">
                                        <v-row v-for="(en, e) in item.environ" :key="e" style="height: 100px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextEnviro(e,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;TAG-WITH-OPTIONAL-VALUE&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;KEY&#62;</label>
                                                    <v-text-field v-model="en.key" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;KEY&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;VALUE&#62;</label>
                                                    <v-text-field v-model="en.value" placeholder="Integer" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;VALUE&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                        <label style="padding:10px;margin-left:115px;">&#60;&#47;TAG-WITH-OPTIONAL-VALUE&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;ENVIRONMENT-VARIABLES&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;STARTUP-OPTIONS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextOption(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 120px;">
                                        <v-row v-for="(op, o) in item.option" :key="o" style="height: 120px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextOption(o,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;STARTUP-OPTION&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;OPTION-ARGUMENT&#62;</label>
                                                    <v-text-field v-model="op.arg" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;OPTION-ARGUMENT&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;OPTION-KIND&#62;</label>
                                                    <v-text-field v-model="op.kind" placeholder="COMMAND-LINE-SIMPLE-FORM or COMMAND-LINE-SHORT-FORM or COMMAND-LINE-LONG-FORM" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;OPTION-KIND&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;OPTION-NAME&#62;</label>
                                                    <v-text-field v-model="op.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;OPTION-NAME&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                        <label style="padding:10px;margin-left:115px;">&#60;&#47;STARTUP-OPTION&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div>
                                    <v-row style="height: 25px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;&#47;STARTUP-OPTIONS&#62;</label>
                                    </v-row>
                                    <v-row>
                                        <label style="height: 25px;margin:2px 0px 2px 100px;">&#60;TIMEOUT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;ENTER-TIMEOUT-VALUE&#62;</label>
                                        <v-text-field v-model="item.entertimeout" placeholder="Time Value"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;ENTER-TIMEOUT-VALUE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;EXIT-TIMEOUT-VALUE&#62;</label>
                                        <v-text-field v-model="item.exittimeout" placeholder="Time Value"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EXIT-TIMEOUT-VALUE&#62;</label>
                                    </v-row>
                                    <v-row>
                                        <label style="height: 25px;margin:2px 0px 2px 100px;">&#60;&#47;TIMEOUT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;STARTUP-CONFIG&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;STARTUP-CONFIGS&#62;</label>
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
            editARXML: {name:'', config: []},
            editTextConfig: {configname: '', policy:  null, priority: '', entertimeout: '', exittimeout: '', option: [], environ: [], id: ''},
            editTextOption: {arg: '', kind: null, name: '', id: ''},
            editTextEnviro: { key: '', value: '', id: '' },
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

            beforeConfig: null,

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
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
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
        inputConfigName() {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'ConfigName', listname: this.element.config[this.startupCTab].configname, beforename: this.beforeConfig} )
            this.beforeConfig = this.element.config[this.startupCTab].configname
        },
        clickConfigName(name) {
            this.beforeConfig = name
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
            this.$store.commit('deleteRefTable', {deleteName:'StartupC', deleteTab: true, tabName: this.element.config[idx].configname, path: this.element.path, name: this.element.name})
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

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.config = JSON.parse(JSON.stringify(this.element.config))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editStartupConfig', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name

            this.editARXML.config.forEach(item => {
                if (item.policy != null) {
                    item.policy = item.policy.toUpperCase()
                    if(!(item.policy == 'SCHEDULING-POLICY-FIFO' || item.policy == 'SCHEDULING-POLICY-ROUND-ROBIN')) {
                        item.policy = null
                    }
                }
                item.option.forEach(data => {
                    if (data.kind != null) {
                        data.kind = data.kind.toUpperCase()
                        if(!(data.kind == 'COMMAND-LINE-SIMPLE-FORM' || data.kind == 'COMMAND-LINE-SHORT-FORM' || data.kind == 'COMMAND-LINE-LONG-FORM')) {
                            data.kind = null
                        }
                    }
                })
            })
            this.element.config = JSON.parse(JSON.stringify(this.editARXML.config))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', config: []}
            this.editTextItem = {configname: '', policy: null, priority: '', entertimeout: '', exittimeout: '', option: [], environ: [], id: ''}
            this.editTextOption = {arg: '', kind: null, name: '', id: ''}
            this.editTextEnviro = { key: '', value: '', id: '' }
            this.dialogText = false
        },
        newTextStartup() {
            this.editTextItem = {configname: '', policy: null, priority: '', entertimeout: '', exittimeout: '', option: [], environ: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextItem.configname = 'StartupConfig_' + n++;
                res = this.editARXML.config.some(item => item.id === n)
            }
            this.editTextItem.id = n

            const addObj = Object.assign({}, this.editTextItem)
            this.editARXML.config.push(addObj);
        },
        deletTextStartup(idx) {
            this.editARXML.config.splice(idx,1)
        },
        newTextOption(idxConfig) {
            this.editTextOption = {arg: '', kind: null, name: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.config[idxConfig].option.some(item => item.id === n)
            }
            this.editTextOption.id = n

            const addObj = Object.assign({}, this.editTextOption)
            this.editARXML.config[idxConfig].option.push(addObj);
        },
        deletTextOption(idxOption, idxConfig) {
            this.editARXML.config[idxConfig].option.splice(idxOption,1)
        },
        newTextEnviro(idxConfig) {
            this.editTextEnviro = { key: '', value: '', id: '' }
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.config[idxConfig].environ.some(item => item.id === n)
            }
            this.editTextEnviro.id = n

            const addObj = Object.assign({}, this.editTextEnviro)
            this.editARXML.config[idxConfig].environ.push(addObj);
        },
        deletTextEnviro(idxEnviro, idxConfig) {
            this.editARXML.config[idxConfig].environ.splice(idxEnviro,1)
        },
    },
}
</script>
