<template>
    <div :id="element.uuid">
        <v-container> 
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar"> <!-- style='height:300px' 이렇게 하면 접었을때 배경이 하얗게 나옴 max-height해야지 접었을때 배경안나옴 -->
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showMachine">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>Machine</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>Machine</v-toolbar-title>
                </v-toolbar>
                <v-card-text  v-if="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputMachineName' outlined dense></v-text-field>
                    <v-row style="height: 70px">
                        <v-col cols="10">
                            <v-text-field v-model="element.machinedesign" readonly @click="setMachineDesignSelect()" clearable @click:clear='clearMachineDesign()' label="Machine Design" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/machinedesign'" dark icon v-bind="attrs" v-on="on" @click="setMachineDesignList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selMachineDesign" :key="i" link @click="setMachineDesign(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newMachineDesign" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="element.timeout" label="Default-Application-TimeOut" placeholder="Numeric Only(Unit Second)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-select v-model="element.executable" :items="executableLaunch" clearable label="Executable Launch Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                    <v-text-field v-model="element.admin" label="Admin Data" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/hwelement'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showHWElement" x-small color="indigo">
                                    <v-icon>{{ isHWElementOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            HW-Element
                            <v-btn @click="isCheckHWElement" text x-small color="indigo" v-if="isHWElementOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isHWElementOpenClose && isdeleteHWElementItem" @click="deletHWElement" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isHWElementOpenClose">
                            <v-data-table v-model="selectDelectHWElement" :headers="headerHWElement" :items="element.hwelement" :items-per-page='20'
                                    :show-select="isdeleteHWElementItem" item-key="hwelement" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteHWElementItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openHWElement(idx)" @cancel="editHWElement(idx)" @save="cancelHWElement" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editHWItem.hwelement' label='HW-Element Reference' :items='selHWElement' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingHWElement" clearable @click="setHWElementSelect()" 
                                                                    @click:clear='clearHWElement' @blur="isEditingHWElement=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newHWElement">
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
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addHWElement()" @save="cancelHWElement"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-autocomplete v-model='editHWItem.hwelement' label='HW-Element Reference' :items='selHWElement' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingHWElement" clearable @click="setHWElementSelect()" 
                                                                    @click:clear='clearHWElement' @blur="isEditingHWElement=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newHWElement">
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
                        <div class="subtitle-2" :id="element.uuid+'/functiontable'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showFunctionGroupItem" x-small color="indigo">
                                    <v-icon>{{ isFunctionGroupOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Function Groups
                            <v-btn @click="isCheckFunctionGroup" text x-small color="indigo" v-if="isFunctionGroupOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isFunctionGroupOpenClose && isdeleteFunctionGroupItem" @click="deleteFunctionGroup" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-if="isFunctionGroupOpenClose">
                            <v-data-table v-model="selectDelectFunctionItem" :headers="headerFunctionGroup" :items="element.functiongroup" :items-per-page='20'
                                    :show-select="isdeleteFunctionGroupItem" item-key="name" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteFunctionGroupItem" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openFunctionGroup(idx)" @cancel="editFunctionGroup(idx)" @save="cancelFunctionGroup" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editFunctionItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editFunctionItem.type' label='Mode Declaration Group' :items='selModeDeclaration' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingModeDeclarationRef" clearable @click="setModeDeclarationSelect()" 
                                                                    @click:clear='clearModeDeclarRef' @blur="isEditingModeDeclarationRef=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newModeDeclaration">
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
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addFunctionGroup()" @save="cancelFunctionGroup"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editFunctionItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editFunctionItem.type' label='Mode Declaration Group' :items='selModeDeclaration' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingModeDeclarationRef" clearable @click="setModeDeclarationSelect()" 
                                                                    @click:clear='clearModeDeclarRef' @blur="isEditingModeDeclarationRef=true" outlined dense style="height: 45px;">
                                                            <template v-slot:append-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newModeDeclaration">
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
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showProcessorItem" x-small color="indigo">
                                    <v-icon>{{ isProcessorOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Processors
                            <v-btn v-if="isProcessorOpenClose" @click="addProcessor" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-tabs v-model='processortab' height="30px" v-if="isProcessorOpenClose">
                            <v-tab v-for="(tab, idx) in element.processor" :key="idx" @click="clickProcessortab()"> 
                                {{tab.name}}
                                <v-btn text x-small @click="deleteProcessor(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="processortab" v-if="isProcessorOpenClose">
                            <v-tab-item v-for="(tab, idx) in element.processor" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        <div class="subtitle-2" style="height:20px">
                                            <v-hover v-slot="{ hover }">
                                                <v-btn text @click="showCore" x-small color="indigo">
                                                    <v-icon>{{ isCoreOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                </v-btn>
                                            </v-hover>
                                            Core 
                                            <v-btn v-if="isCoreOpenClose" @click="isCheckCore" text x-small color="indigo">
                                                <v-icon>mdi-check</v-icon>
                                            </v-btn>
                                            <v-btn v-if="isCoreOpenClose && isdeleteCoreItem" @click="deleteCore" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                        </div>
                                        <v-data-table v-if="isCoreOpenClose" v-model="selectDelectCoreItem" :headers="headerCore" :items="tab.core" :id="element.uuid+'/processorCore-'"
                                                :show-select="isdeleteCoreItem" item-key="name" height="100px" dense hide-default-footer :items-per-page='20'>
                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                            </template>
                                            <template v-if="!isdeleteCoreItem" v-slot:body="{ items, headers }">
                                                <tbody>
                                                    <tr v-for="(item,num) in items" :key="num">
                                                        <td v-for="(header,key) in headers" :key="key">
                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openCore(num, items)" @cancel="editCore(num, items)" @save="cancelCore" large >
                                                                {{item[header.value]}}
                                                                <template v-slot:input>
                                                                    <br>
                                                                    <v-text-field v-model="editCoreItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editCoreItem.id" label="Core ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                </template>
                                                            </v-edit-dialog>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="3">
                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addCore(idx)" @save="cancelCore"> 
                                                                <v-btn outlined color="indigo" dense text small block width="270px">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                                <template v-slot:input>
                                                                    <br>
                                                                    <v-text-field v-model="editCoreItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editCoreItem.id" label="Core ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                </template>
                                                            </v-edit-dialog>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showModuleInsItem" x-small color="indigo">
                                    <v-icon>{{ isModuleInsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Module Instantiation
                            <v-btn v-if="isModuleInsOpenClose" @click="addModuleIns" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-tabs v-model='ModuleInstab' height="30px" v-if="isModuleInsOpenClose">
                            <v-tab v-for="(tab, idx) in element.moduleinstant" :key="idx" @click="clickModuleInstab()"> 
                                {{tab.name}}
                                <v-btn text x-small @click="deleteModuleIns(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="ModuleInstab" v-if="isModuleInsOpenClose">
                            <v-tab-item v-for="(tab, idx) in element.moduleinstant" :key="idx">
                                <v-card flat>
                                    <v-card-text>
                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputModuleInsName()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        <div class="subtitle-2" style="height:20px">
                                            <v-hover v-slot="{ hover }">
                                                <v-btn text @click="showResourceG" x-small color="indigo">
                                                    <v-icon>{{ isResourceGOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                </v-btn>
                                            </v-hover>
                                            Resource Group 
                                            <v-btn v-if="isResourceGOpenClose" @click="isCheckResourceG" text x-small color="indigo">
                                                <v-icon>mdi-check</v-icon>
                                            </v-btn>
                                            <v-btn v-if="isResourceGOpenClose && isdeleteResourceGItem" @click="deleteResourceG" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                        </div>
                                        <v-data-table v-if="isResourceGOpenClose" v-model="selectDelectModuleInsItem" :headers="headerModuleIns" :items="tab.resource" :id="element.uuid+'/moduleInsable'"
                                                :show-select="isdeleteResourceGItem" item-key="name" height="100px" dense hide-default-footer :items-per-page='20'>
                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                <v-simple-checkbox color="green" :value="isSelected" @input="select($event)" :ripple="false"></v-simple-checkbox>
                                            </template>
                                            <template v-if="!isdeleteResourceGItem" v-slot:body="{ items, headers }">
                                                <tbody>
                                                    <tr v-for="(item,num) in items" :key="num">
                                                        <td v-for="(header,key) in headers" :key="key">
                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openResourceG(num, items)" @cancel="editResourceG(num, items)" @save="cancelResourceG" large >
                                                                {{item[header.value]}}
                                                                <template v-slot:input>
                                                                    <br>
                                                                    <v-text-field v-model="editModuleInsItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editModuleInsItem.cpuUsage" label="CPU Usage" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editModuleInsItem.memoryUsage" label="Memory Usage" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                </template>
                                                            </v-edit-dialog>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="3">
                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addResourceG(idx)" @save="cancelResourceG"> 
                                                                <v-btn outlined color="indigo" dense text small block width="270px">
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                                <template v-slot:input>
                                                                    <br>
                                                                    <v-text-field v-model="editModuleInsItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editModuleInsItem.cpuUsage" label="CPU Usage" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editModuleInsItem.memoryUsage" label="Memory Usage" placeholder="int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                </template>
                                                            </v-edit-dialog>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
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
    props: ['element', 'isDatailView','minimaptoolbar'],
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
            iselementOpenClose: this.minimaptoolbar,
            isEditingHWElement: true,
            isEditingModeDeclarationRef: true,
            selMachineDesign: this.$store.getters.getMachineDesign,
            selHWElement: this.$store.getters.getHWElement,
            selModeDeclaration: this.$store.getters.getModeDeclarationG,
            executableLaunch: [ 'STRICT-MODE', 'MONITOR-MODE', 'NO-TRUSTED-PLATFORM-SUPPORT'],

            isHWElementOpenClose: true,
            isdeleteHWElementItem: false,
            selectDelectHWElement: [],
            headerHWElement: [
                { text: 'HW Element Ref', align: 'start', sortable: false, value: 'hwelement' },
            ],
            editHWItem: { hwelement : null},
            deleteHWLine : [],

            isFunctionGroupOpenClose: true,
            isdeleteFunctionGroupItem: false,
            selectDelectFunctionItem: [],
            headerFunctionGroup: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Type', sortable: false, value: 'type' },
            ],
            editFunctionItem: {
                name: '',
                type: null,
            },
            defaultfunctionItem: {
                name: '',
                type: null,
            },
            deleteChangeLine : [],

            processortab: null,
            isProcessorOpenClose: true,
            isCoreOpenClose: true,
            isdeleteCoreItem: false,
            selectDelectCoreItem: [],
            headerCore: [
                { text: 'Name', align: 'start', sortable: false, value: 'name'},
                { text: 'Core ID', sortable: false, value: 'id'},
            ],
            editCoreItem: {
                name: '',
                id: '',
            },
            defaultCoreItem: {
                name: '',
                id: '',
            },

            ModuleInstab: null,
            isModuleInsOpenClose: true,
            isResourceGOpenClose: true,
            isdeleteResourceGItem: false,
            selectDelectModuleInsItem: [],
            headerModuleIns: [
                { text: 'Resource Group Name', width:'160px', align: 'start', sortable: false, value: 'name' },
                { text: 'CPU Usage', width:'100px', sortable: false, value: 'cpuUsage' },
                { text: 'Memory Usage', width:'120px', sortable: false, value: 'memoryUsage' },
            ],
            editModuleInsItem: {
                name: '',
                cpuUsage: '',
                memoryUsage: ''
            },
            defaultModuleInsItem: {
                name: '',
                cpuUsage: '',
                memoryUsage: ''
            },
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
        showMachine () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showHWElement() {
            this.isHWElementOpenClose = this.isHWElementOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showFunctionGroupItem() {
            this.isFunctionGroupOpenClose = this.isFunctionGroupOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showProcessorItem() {
            this.isProcessorOpenClose = this.isProcessorOpenClose ? false : true
        },
        showCore() {
            this.isCoreOpenClose = this.isCoreOpenClose ? false : true
        },
        showModuleInsItem() {
            this.isModuleInsOpenClose = this.isModuleInsOpenClose ? false : true
        },
        showResourceG() {
            this.isResourceGOpenClose = this.isResourceGOpenClose ? false : true
        },
        inputMachineName() {
            this.$store.commit('editMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputModuleInsName() {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'ModuleIns', listname: this.element.moduleinstant[this.ModuleInstab].name} )
        },


        setMachineDesignSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinDesignPath(this.element.machinedesign, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.MachineDesigne_str} )
            }
        },
        setMachineDesignList() {
            this.selMachineDesign = this.$store.getters.getMachineDesign
            this.setactiveUUID()
        },
        setMachineDesign(item) {
            if( this.element.machinedesign != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/machinedesign')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/machinedesign', this.element.uuid+'/machinedesign', item.uuid)
                this.element.machinedesign = item.name
            }
            this.setactiveUUID()
        },
        clearMachineDesign() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
            if (endLine != undefined) {
                this.element.machinedesign = null
                this.deleteLine(this.element.uuid+'/machinedesign')
            }
        },

        setModeDeclarationSelect() {
            if (this.isEditingModeDeclarationRef == true) {
                if (this.editFunctionItem.type != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionItem.type.uuid, element: constant.ModeDeclarationGroup_str} )
                }
                this.setModeDeclarationList()
                this.isEditingModeDeclarationRef = false
            } else {
                this.isEditingModeDeclarationRef = true
            }
        },
        setModeDeclarationList() {
            this.selModeDeclaration = this.$store.getters.getModeDeclarationG
            this.setactiveUUID()
        },
        clearModeDeclarRef() {
            this.isEditingModeDeclarationRef = true
            this.editFunctionItem.type = null
        },
        newMachineDesign() {
            //machine design
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementMachineDesign', {
                name: this.$store.getters.getNameMachineDesign, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                access:null, resettimer: '', connector:[], servicediscover:[], 
            })
            EventBus.$emit('add-element', constant.MachineDesigne_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newHWElement() {
            //HW Element
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementHWElement', { //category 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameHWElement, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, category:null, attribute:[], icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.HWElement_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newModeDeclaration() {
            //Mode Declaration
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * (1400 - 11)) + 10)
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * (200 - 6)) + 5)

            this.$store.commit('addElementModeDeclarationGroup', {
                name: this.$store.getters.getNameModeDeclarationGroup, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, modedeclaration:[], initmode:null, icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )

        },

        isCheckHWElement() {
            if (this.isdeleteHWElementItem == true) {
                this.isdeleteHWElementItem = false
                this.selectDelectHWElement = []
            } else {
                this.isdeleteHWElementItem = true
            }
        },
        deletHWElement() {
            if (this.isdeleteHWElementItem == true) {
                for(let i=0; i<this.element.hwelement.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+i)
                    if(endLine != undefined) {
                        this.deleteHWLine.push({name:this.element.hwelement[i].hwelement, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/hwelement-'+i)
                    }
                }

                this.element.hwelement = this.element.hwelement.filter(item => {
                        return this.selectDelectHWElement.indexOf(item) < 0 })

                for(let n=0; n<this.element.hwelement.length; n++) {
                    for(let idx=0; idx<this.deleteHWLine.length; idx++) {
                        if (this.element.hwelement[n].hwelement == this.deleteHWLine[idx].name) {
                            this.newLine(this.element.uuid+'/hwelement-'+n, this.element.uuid+'/hwelement', this.deleteHWLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteHWElementItem = false
                this.selectDelectHWElement = []
                this.deleteHWLine = []
            } 
        },
        openHWElement(idx) {
            this.selHWElement = this.$store.getters.getHWElement
            if ( this.element.hwelement[idx].hwelement != null) {
                this.editHWItem.hwelement = { name: this.element.hwelement[idx].hwelement, uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+idx) }
            }
        },
        editHWElement(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+idx)
            if (endLine != undefined && this.editHWItem.hwelement == null) {
                this.deleteLine(this.element.uuid+'/hwelement-'+idx)
                this.element.hwelement[idx].hwelement = null
            } else if (endLine != undefined && endLine != this.editHWItem.hwelement.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/hwelement-'+idx)
                this.newLine(this.element.uuid+'/hwelement-'+idx, this.element.uuid+'/hwelement', this.editHWItem.hwelement.uuid)
                this.element.hwelement[idx].hwelement = this.editHWItem.hwelement.name
            } else if (endLine == undefined && this.editHWItem.hwelement != null) {
                this.newLine(this.element.uuid+'/hwelement-'+idx, this.element.uuid+'/hwelement', this.editHWItem.hwelement.uuid)
                this.element.hwelement[idx].hwelement = this.editHWItem.hwelement.name
            }
            
            this.cancelHWElement()
        },
        cancelHWElement() {
            this.editHWItem.hwelement = null
            this.setactiveUUID()
        },
        addHWElement() {
            if( this.editHWItem.hwelement != null) {
                var datacount = this.element.hwelement.length
                this.newLine(this.element.uuid+'/hwelement-'+datacount, this.element.uuid+'/hwelement', this.editHWItem.hwelement.uuid)
                this.editHWItem.hwelement = this.editHWItem.hwelement.name
            }
            const addObj = Object.assign({}, this.editHWItem)
            this.element.hwelement.push(addObj);

            this.cancelHWElement()
        },
        setHWElementSelect() {
            if (this.isEditingHWElement == true) {
                if (this.editHWItem.hwelement !=null) {
                    this.$store.commit('setDetailView', {uuid: this.editHWItem.hwelement.uuid, element: constant.HWElement_str} )
                }
                this.setHWElementList()
                this.isEditingHWElement = false
            } else {
                this.isEditingHWElement = true
            }
        },
        setHWElementList() {
            this.selHWElement = this.$store.getters.getHWElement
            this.setactiveUUID()
        },
        clearHWElement() {
            this.isEditingHWElement = true
            this.editHWItem.hwelement = null
        },

        
        isCheckFunctionGroup() {
            if (this.isdeleteFunctionGroupItem == true) {
                this.isdeleteFunctionGroupItem = false
                this.selectDelectFunctionItem = []
            } else {
                this.isdeleteFunctionGroupItem = true
            }
        },
        deleteFunctionGroup() {
            if (this.isdeleteFunctionGroupItem == true) {
                for(let i=0; i<this.element.functiongroup.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLine.push({name:this.element.functiongroup[i].name, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/functiontable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'functionG', deletItemList: this.selectDelectFunctionItem, path: this.element.path, name: this.element.name})
                this.element.functiongroup = this.element.functiongroup.filter(item => {
                        return this.selectDelectFunctionItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.functiongroup.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.functiongroup[n].name == this.deleteChangeLine[idx].name) {
                            this.newLine(this.element.uuid+'/functiontable-'+n, this.element.uuid+'/functiontable', this.deleteChangeLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteFunctionGroupItem = false
                this.selectDelectFunctionItem = []
                this.deleteChangeLine = []
            } 
        },
        openFunctionGroup(idx) {
            this.selModeDeclaration = this.$store.getters.getModeDeclarationG
            this.editFunctionItem.name = this.element.functiongroup[idx].name
            if ( this.element.functiongroup[idx].type != null) {
                this.editFunctionItem.type = { name: this.element.functiongroup[idx].type, uuid: this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+idx) }
            }
        },
        editFunctionGroup(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+idx)
            if (endLine != undefined && this.editFunctionItem.type == null) {
                this.deleteLine(this.element.uuid+'/functiontable-'+idx)
                this.element.functiongroup[idx].type = null
            } else if (endLine != undefined && endLine != this.editFunctionItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/functiontable-'+idx)
                this.newLine(this.element.uuid+'/functiontable-'+idx, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid)
                this.element.functiongroup[idx].type = this.editFunctionItem.type.name
            } else if (endLine == undefined && this.editFunctionItem.type != null) {
                this.newLine(this.element.uuid+'/functiontable-'+idx, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid)
                this.element.functiongroup[idx].type = this.editFunctionItem.type.name
            }

            if (this.element.functiongroup[idx].name != this.editFunctionItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'functionG', listname: this.editFunctionItem.name} )
            }

            this.element.functiongroup[idx].name = this.editFunctionItem.name
            
            this.cancelFunctionGroup()
        },
        cancelFunctionGroup() {
            this.editFunctionItem = Object.assign({}, this.defaultfunctionItem)
            this.setactiveUUID()
        },
        addFunctionGroup() {
            if( this.editFunctionItem.type != null) {
                var datacount = this.element.functiongroup.length
                this.newLine(this.element.uuid+'/functiontable-'+datacount, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid)
                this.editFunctionItem.type = this.editFunctionItem.type.name
            }

            const addObj = Object.assign({}, this.editFunctionItem)
            this.element.functiongroup.push(addObj);
            this.cancelFunctionGroup()
        },

        clickProcessortab() {
            this.isdeleteCoreItem = false
            this.selectDelectCoreItem = []
        },
        deleteProcessor(idx) {
            this.element.processor.splice(idx, 1)
            this.inputProcessor()
        },
        addProcessor() {
            const editItem = {name: '', core: []}
            const addObj = new Object(editItem)
            addObj.name = 'Processor_'+(this.element.processor.length+1)
            this.element.processor.push(addObj)
            this.processortab = this.element.processor.length-1
            this.isdeleteCoreItem = false
            this.selectDelectCoreItem = []
        },
        isCheckCore() {
            if (this.isdeleteCoreItem == true) {
                this.isdeleteCoreItem = false
                this.selectDelectCoreItem = []
            } else {
                this.isdeleteCoreItem = true
            }
        },
        deleteCore() {
            if (this.isdeleteCoreItem == true) {
                this.element.processor[this.processortab].core = this.element.processor[this.processortab].core.filter(item => {
                         return this.selectDelectCoreItem.indexOf(item) < 0 })
                this.isdeleteCoreItem = false
                this.selectDelectCoreItem = []
            }
        },
        openCore(idx, core) {
            this.editCoreItem.name = core[idx].name
            this.editCoreItem.id = core[idx].id
        },
        editCore(idx,core) {
            core[idx].name = this.editCoreItem.name
            core[idx].id = this.editCoreItem.id
            this.cancelCore()
        },
        cancelCore() {
            this.editCoreItem = Object.assign({}, this.defaultCoreItem)
            this.setactiveUUID()
        },
        addCore(idx) {
            const addObj = Object.assign({}, this.editCoreItem)
            console.log("addCore/// "+ idx+'//'+this.element.processor[idx].name)
            this.element.processor[idx].core.push(addObj)
            this.cancelCore()
        },

        addModuleIns() {
            const editItem = {name: '', resource: []}
            const addObj = new Object(editItem)
            addObj.name = 'Module Instance_'+(this.element.moduleinstant.length+1)
            this.element.moduleinstant.push(addObj)
            this.ModuleInstab = this.element.moduleinstant.length-1
            this.isdeleteResourceGItem = false
            this.selectDelectModuleInsItem = []
        },
        clickModuleInstab() {
            this.isdeleteResourceGItem = false
            this.selectDelectModuleInsItem = []
        },
        deleteModuleIns(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'ModuleIns', deleteTab: true, tabName: this.element.moduleinstant[idx].name, path: this.element.path, name: this.element.name})
            this.element.moduleinstant.splice(idx, 1)
        },
        isCheckResourceG() {
            if (this.isdeleteResourceGItem == true) {
                this.isdeleteResourceGItem = false
                this.selectDelectModuleInsItem = []
            } else {
                this.isdeleteResourceGItem = true
            }
        },
        deleteResourceG() {
            if (this.isdeleteResourceGItem == true) {
                this.element.moduleinstant[this.ModuleInstab].resource = this.element.moduleinstant[this.ModuleInstab].resource.filter(item => {
                         return this.selectDelectModuleInsItem.indexOf(item) < 0 })
                this.isdeleteResourceGItem = false
                this.selectDelectModuleInsItem = []
            } 
        },
        openResourceG(idx, resource) {
            this.editModuleInsItem.name = resource[idx].name
            this.editModuleInsItem.cpuUsage = resource[idx].cpuUsage
            this.editModuleInsItem.memoryUsage = resource[idx].memoryUsage
        },
        editResourceG(idx, resource) {
            resource[idx].name = this.editModuleInsItem.name
            resource[idx].cpuUsage = this.editModuleInsItem.cpuUsage
            resource[idx].memoryUsage = this.editModuleInsItem.memoryUsage
            this.cancelResourceG()
        },
        cancelResourceG() {
            this.editModuleInsItem = Object.assign({}, this.defaultModuleInsItem)
            this.setactiveUUID()
        },
        addResourceG(idx) {
            const addObj = Object.assign({}, this.editModuleInsItem)
            this.element.moduleinstant[idx].resource.push(addObj)
            this.cancelResourceG()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
