<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showProcess">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Process</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Process</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputProcessName' outlined dense  @click="setactiveUUID"></v-text-field>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.prodesign" readonly @click="setProcessDesignSelect()" clearable @click:clear='clearProcessDesign()' label="Design Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/processprodesign'" dark icon v-bind="attrs" v-on="on" @click="setProcessDesignList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selProcessDesign" :key="i" link @click="setProcessDesign(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newProcessDesign" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.determin" readonly @click="setDeterminSelect()" clearable @click:clear='clearDetermin()' label="Deterministric Client Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/processdetermin'" dark icon v-bind="attrs" v-on="on" @click="setDeterminList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selDeterministic" :key="i" link @click="setDeterministicClient(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newDeterministicClient" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.execut" readonly @click="setExecutableSelect()" clearable @click:clear='clearExecutable()' label="Executable Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/processexecut'" dark icon v-bind="attrs" v-on="on" @click="setExecutableList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selExecutable" :key="i" link @click="setExecutable(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newExecutable" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-select v-model="element.logLevel" :items="logLevel" label="Log Trace Default log Level" @click="setactiveUUID()" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-text-field v-model="element.logPath" label="Log Trace File Path" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-select v-model="element.logMode" :items="logMode" label="Log Trace log Mode" chips @click="setactiveUUID()" style="height: 70px;" outlined multiple class="lable-placeholer-color"></v-select>
                            <v-text-field v-model="element.logProDesc" label="Log Trace Process Desc" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-text-field v-model="element.logProID" label="Log Trace Process ID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-text-field v-model="element.restart" label="Number Of Restart Attempts" placeholder="Int" style="height: 25px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-checkbox v-model="element.preMapping" label="Pre Mapping" value="element.preMapping" :indeterminate="element.preMapping==null? true:false" true-value="true" false-value="false" style="height: 35px;"></v-checkbox>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/processmodedeclar'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showStateMachine" x-small color="indigo">
                                            <v-icon>{{ isStateMachineOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Process State Machine
                                </div>
                                <v-card-text v-show="isStateMachineOpenClose">
                                    <v-text-field v-model="element.machinname" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                    <v-row style="height: 70px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.machinetype" readonly @click="setModeDeclarationSelect()" clearable @click:clear='clearModeDeclaration()' label="Type TReference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" dark icon v-bind="attrs" v-on="on" @click="setModeDeclarationList()">
                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(item, i) in selModeDeclaration" :key="i" link @click="setModeDeclaration(item)">
                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-btn outlined color="indigo" dense text small block @click="newModeDeclarationGroup" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/processStarupC'">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showDependentStartup" x-small color="indigo">
                                            <v-icon>{{ isDependentStartupOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    State Dependent Startup Config
                                    <v-btn v-if="isDependentStartupOpenClose" @click="addDependentStartup" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='dependentStartupTab' v-show="isDependentStartupOpenClose" show-arrows @change="changeDependentStartupTab()">
                                    <v-tab v-for="(tab, idx) in element.dependent" :key="idx" @click="clickDependentStartuptab()"> 
                                        {{idx}}
                                        <v-btn text x-small @click="deleteDependentStartup(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="dependentStartupTab" v-show="isDependentStartupOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.dependent" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-card outlined class="mx-auto">
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/edtable'+idx">
                                                        <v-hover v-slot="{ hover }">
                                                            <v-btn text @click="showExecutionD" x-small color="indigo">
                                                                <v-icon>{{ isExecutionDOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                            </v-btn>
                                                        </v-hover>
                                                        Execution Dependencys
                                                        <v-btn  v-if="isExecutionDOpenClose" @click="isCheckExecutionD" text x-small color="indigo">
                                                            <v-icon>mdi-check</v-icon>
                                                        </v-btn>
                                                        <v-btn  v-if="isdeleteExecutionD && isExecutionDOpenClose" @click="deleteExecutionD" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </div>
                                                    <v-card-text v-show="isExecutionDOpenClose">
                                                        <v-data-table v-model="selectDelectExecutionDItem" :headers="headerFunctionG" :items="tab.exection" :items-per-page='20'
                                                                :show-select="isdeleteExecutionD" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteExecutionD" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,idx) in items" :key="idx" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <!-- <v-icon v-if="header.value == 'sort'" small class="sortHandle" >mdi-arrow-all</v-icon> -->
                                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openExecutionD(idx)" @cancel="editExecutionD(idx)" @save="cancelExecutionD" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br> <!--v-autocomplete 여기에서 item의 uuid가 같을경우 item-text='name' item-value="uuid"로 해주면 uuid값이 같기 때문에 item의 list가 다 나오지 않는다 name으로 바꿔야지만 list가 잘나옴 -->
                                                                                    <v-autocomplete v-model='editExecutionDItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingCM" @click="setCMSelect()" @blur="isEditingCM=true" 
                                                                                            clearable @click:clear='clearCMRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editExecutionDItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="id" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingTM"  @click="setTMSelect()" @blur="isEditingTM=true" 
                                                                                            clearable @click:clear='clearTMRef'>
                                                                                    </v-autocomplete>
                                                                                </template>
                                                                            </v-edit-dialog>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th colspan="3">
                                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addExecutionD()" @save="cancelExecutionD"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editExecutionDItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingCM" @click="setCMSelect()" @blur="isEditingCM=true" 
                                                                                            clearable @click:clear='clearCMRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editExecutionDItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="id" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingTM"  @click="setTMSelect()" @blur="isEditingTM=true" 
                                                                                            clearable @click:clear='clearTMRef'>
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
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/fgtable'+idx">
                                                        <v-hover v-slot="{ hover }">
                                                            <v-btn text @click="showFunctionG" x-small color="indigo">
                                                                <v-icon>{{ isFunctionGOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                            </v-btn>
                                                        </v-hover>
                                                        Function Group State
                                                        <v-btn  v-if="isFunctionGOpenClose" @click="isCheckFunctionG" text x-small color="indigo">
                                                            <v-icon>mdi-check</v-icon>
                                                        </v-btn>
                                                        <v-btn  v-if="isdeleteFunctionG && isFunctionGOpenClose" @click="deleteFunctionG" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </div>
                                                    <v-card-text v-show="isFunctionGOpenClose">
                                                        <v-data-table v-model="selectDelectFunctionGItem" :headers="headerFunctionG" :items="tab.functionItem" :items-per-page='20'
                                                                :show-select="isdeleteFunctionG" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteFunctionG" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,idx) in items" :key="idx" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <!-- <v-icon v-if="header.value == 'sort'" small class="sortHandle" >mdi-arrow-all</v-icon> -->
                                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openFunctionG(idx)" @cancel="editFunctionG(idx)" @save="cancelFunctionG" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br> <!--v-autocomplete 여기에서 item의 uuid가 같을경우 item-text='name' item-value="uuid"로 해주면 uuid값이 같기 때문에 item의 list가 다 나오지 않는다 name으로 바꿔야지만 list가 잘나옴 -->
                                                                                    <v-autocomplete v-model='editFunctionGItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingContextMode" @click="setContextModeSelect()" @blur="isEditingContextMode=true" 
                                                                                            clearable @click:clear='clearContextModeRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editFunctionGItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="id" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingTargetMode"  @click="setTargetModeSelect()" @blur="isEditingTargetMode=true" 
                                                                                            clearable @click:clear='clearTargetModeRef'>
                                                                                    </v-autocomplete>
                                                                                </template>
                                                                            </v-edit-dialog>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th colspan="3">
                                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addFunctionG()" @save="cancelFunctionG"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editFunctionGItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingContextMode" @click="setContextModeSelect()" @blur="isEditingContextMode=true" 
                                                                                            clearable @click:clear='clearContextModeRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editFunctionGItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="id" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingTargetMode"  @click="setTargetModeSelect()" @blur="isEditingTargetMode=true" 
                                                                                            clearable @click:clear='clearTargetModeRef'>
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
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.resourceRef" readonly @click="setResourceGSelect(tab)" clearable @click:clear='clearResourceG(tab)' label="Resource Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/processresorce'+idx" icon v-bind="attrs" v-on="on" @click="setResourceGList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list >
                                                                <v-list-item v-for="(item, i) in selResourceG" :key="i" link @click="setResourceG(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selResourceG.length == 0">
                                                                    <v-list-item-title>No Data Available</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="height: 70px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.startupConfigRef" readonly @click="setStartupCSelect(tab)" clearable @click:clear='clearStartupC(tab)' label="Startup Config Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/processstartup'+idx" dark icon v-bind="attrs" v-on="on" @click="setStartupCList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item v-for="(item, i) in selStartupC" :key="i" link @click="setStartupC(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newStartupC" >
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
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
        </v-container>
    </div>
</template>

<script>
import constant from "../store/constants.js"
import { EventBus } from "../main.js"
import dialogPathSetting from '../components/dialogPathSetting.vue'

export default {
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
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
                        if(this.iselementOpenClose) {
                            if(this.element.dependent.length > 0 && this.location == 1) {
                                if (this.isDependentStartupOpenClose) {
                                    EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)
                                } else {
                                    EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                                }
                            }
                        }
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
            rules: {
                name:  [val => (val || '').length > 0 ],
            },
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isStateMachineOpenClose: true,
            isDependentStartupOpenClose: true,
            isFunctionGOpenClose : true,
            isExecutionDOpenClose : true,
            selProcessDesign: this.$store.getters.getProcessDesign,
            selDeterministic: this.$store.getters.getDeterministicClient,
            selExecutable: this.$store.getters.getExecutable,
            selModeDeclaration: this.$store.getters.getModeDeclarationG,
            selResourceG: this.$store.getters.getResourceGroup,
            selStartupC: this.$store.getters.getStartupConfig,
            dependentStartupTab: 0,

            logLevel: ['FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'VERBOSE'],
            logMode: [ 'CONSOLE', 'FILE', 'NETWORK'],
            isdeleteFunctionG: false,
            selectDelectFunctionGItem: [],
            headerFunctionG: [
                { text: 'Context Mode Ref', align: 'start', sortable: false, value: 'contextMode' },
                { text: 'Target Mode Ref', sortable: false, value: 'targetMode' },
            ],
            isEditingContextMode: true,
            isEditingTargetMode: true,
            defaultItem: { contextMode: null, targetMode: null, id: '' },
            editFunctionGItem: { contextMode: null, targetMode: null, id: '' },
            selContextMode: this.$store.getters.getMachineFG,
            selTargetMode: this.$store.getters.getModeDeclaration,
            changeLineFunc: [],

            isdeleteExecutionD: false,
            selectDelectExecutionDItem: [],
            isEditingCM: true,
            isEditingTM: true,
            editExecutionDItem: { contextMode: null, targetMode: null, id: '' },
            changeLineExecut: [],

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
        showProcess() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.element.dependent.length > 0 && this.location == 1) {
                        if (this.isDependentStartupOpenClose) {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showStateMachine() {
            this.isStateMachineOpenClose = this.isStateMachineOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showDependentStartup() {
            this.isDependentStartupOpenClose = this.isDependentStartupOpenClose ? false : true
            if(this.element.dependent.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isDependentStartupOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showFunctionG() {
            this.isFunctionGOpenClose = this.isFunctionGOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showExecutionD() {
            this.isExecutionDOpenClose = this.isExecutionDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        inputProcessName() {
            this.$store.commit('editProcess', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearProcessDesign() {
            this.element.prodesign = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processprodesign')
            }
        },
        setProcessDesignSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
            if (endLine == undefined) {
                endLine = this.$store.getters.getProcessDesignPath(this.element.prodesign)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProcessDesign_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setProcessDesignList() {
            this.selProcessDesign = this.$store.getters.getProcessDesign
            this.setactiveUUID()
        },
        setProcessDesign(item) {
            if(this.element.prodesign != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processprodesign')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processprodesign', this.element.uuid+'/processprodesign', item.uuid)
                this.element.prodesign = item.name
            }
            this.setactiveUUID()
        },
        newProcessDesign() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            this.$store.commit('addElementProcessDesign', { //executableref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameProcessDesign, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                executableref: null, determin: [],
            })
            EventBus.$emit('add-element', constant.ProcessDesign_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearDetermin() {
            this.element.determin = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processdetermin')
            }
        },
        setDeterminSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
            if (endLine == undefined) {
                endLine = this.$store.getters.getDeterministicClientPath(this.element.determin)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.DeterministicClient_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setDeterminList() {
            this.selDeterministic = this.$store.getters.getDeterministicClient
            this.setactiveUUID()
        },
        setDeterministicClient(item) {
            if(this.element.determin != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processdetermin')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processdetermin', this.element.uuid+'/processdetermin', item.uuid)
                this.element.determin = item.name
            }
            this.setactiveUUID()
        },
        newDeterministicClient() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementDeterministicClien', {
                name: this.$store.getters.getNameDeterministicClient, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                cycletiem: '', numofworkers: '',
            })
            EventBus.$emit('add-element', constant.DeterministicClient_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearExecutable() {
            this.element.execut = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processexecut')
            }
        },
        setExecutableSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
            if (endLine == undefined) {
                endLine = this.$store.getters.getExecutablePath(this.element.execut)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Executable_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setExecutableList() {
            this.selExecutable = this.$store.getters.getExecutable
            this.setactiveUUID()
        },
        setExecutable(item) {
            if(this.element.execut != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processexecut')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processexecut', this.element.uuid+'/processexecut', item.uuid)
                this.element.execut = item.name
            }
            this.setactiveUUID()
        },
        newExecutable() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementExecutable', { //applicationtyperef 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameExecutable, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                version: '', category:'', buildType:null, loggingBehabior:null, reportingBehabior:null, swname:'', applicationtyperef: null,
            })
            EventBus.$emit('add-element', constant.Executable_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearModeDeclaration() {
            this.element.machinetype = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processmodedeclar')
            }
        },
        setModeDeclarationSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
            if (endLine == undefined) {
                endLine = this.$store.getters.getModeDeclarationPath(this.element.machinetype, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ModeDeclarationGroup_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setModeDeclarationList() {
            this.selModeDeclaration = this.$store.getters.getModeDeclarationG
            this.setactiveUUID()
        },
        setModeDeclaration(item) {
            if(this.element.machinetype != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processmodedeclar')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processmodedeclar', this.element.uuid+'/processmodedeclar', item.uuid)
                this.element.machinetype = item.name
            }
            this.setactiveUUID()
        },
        newModeDeclarationGroup() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementModeDeclarationGroup', {
                name: this.$store.getters.getNameModeDeclarationGroup, path: '',
                top: elementY, left: elementX, zindex: 10, 
                modedeclaration:[], initmode:null, icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addDependentStartup() {
            const editItem = { exection: [], functionItem: [], resourceRef: null, startupConfigRef: null}
            const addObj = new Object(editItem)
            this.element.dependent.push(addObj)
            this.dependentStartupTab = this.element.dependent.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
            }
        },
        clickDependentStartuptab() {
            //console.log('clickDependentStartuptab')
            this.isdeleteFunctionG = false
            this.isdeleteExecutionD = false
            this.selectDelectFunctionGItem = []
            this.selectDelectExecutionDItem = []
        },
        changeDependentStartupTab() {
            //console.log('changeDependentStartupTab' +this.dependentStartupTab)
            if(this.element.dependent.length > 0 && this.location == 1 && this.dependentStartupTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.dependentStartupTab)}, 300);
            }
        },
        deleteDependentStartup(idx) {
            console.log('deleteDependentStartup' + idx)
            for(let i=0; i<this.element.dependent[idx].functionItem.length; i++){
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+i+'-'+idx)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/fgcontext-'+i+'-'+idx)
                }
                var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+i+'-'+idx)
                if(endLinetarg != undefined) {
                    this.deleteLine(this.element.uuid+'/fgtarget-'+i+'-'+idx)
                }
            }
            for(let i=0; i<this.element.dependent[idx].execution.length; i++){
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+i+'-'+idx)
                if(endLineC != undefined) {
                    this.deleteLine(this.element.uuid+'/edcontext-'+i+'-'+idx)
                }
                var endLinet = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+i+'-'+idx)
                if(endLinet != undefined) {
                    this.deleteLine(this.element.uuid+'/edtarget-'+i+'-'+idx)
                }
            }
            var endLine, endR, endS
            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+idx)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processresorce-'+idx)
            }
            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+idx)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processstartup-'+idx)
            }
            for(let i=idx+1; i<this.element.dependent.length; i++){
                endR = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+i)
                endS = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+i)
                for(let n=0; n<this.element.dependent[i].functionItem.length; n++){
                    var endC = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+n+'-'+i)
                    if(endC != undefined) {
                        this.deleteLine(this.element.uuid+'/fgcontext-'+n+'-'+i)
                        this.newLine(this.element.uuid+'/fgcontext-'+n+'-'+(i-1), this.element.uuid+'/processStarupC', endC)
                    }
                    var endT = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+n+'-'+i)
                    if(endT != undefined) {
                        this.deleteLine(this.element.uuid+'/fgtarget-'+n+'-'+i)
                        this.newLine(this.element.uuid+'/fgtarget-'+n+'-'+(i-1), this.element.uuid+'/processStarupC', endT)
                    }
                }
                for(let n=0; n<this.element.dependent[i].execution.length; n++){
                    var endEC = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+n+'-'+i)
                    if(endEC != undefined) {
                        this.deleteLine(this.element.uuid+'/edcontext-'+n+'-'+i)
                        this.newLine(this.element.uuid+'/edcontext-'+n+'-'+(i-1), this.element.uuid+'/processStarupC', endC)
                    }
                    var endET = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+n+'-'+i)
                    if(endET != undefined) {
                        this.deleteLine(this.element.uuid+'/edtarget-'+n+'-'+i)
                        this.newLine(this.element.uuid+'/edtarget-'+n+'-'+(i-1), this.element.uuid+'/processStarupC', endT)
                    }
                }
                if (endR != undefined) {
                    this.deleteLine(this.element.uuid+'/processresorce-'+i)
                    this.newLine(this.element.uuid+'/processresorce-'+(i-1), this.element.uuid+'/processStarupC', endR)
                }
                if (endS != undefined) {
                    this.deleteLine(this.element.uuid+'/processstartup-'+i)
                    this.newLine(this.element.uuid+'/processstartup-'+(i-1), this.element.uuid+'/processStarupC', endS)
                }
            }

            this.element.dependent.splice(idx, 1)
        },
        isCheckFunctionG() {
            if (this.isdeleteFunctionG == true) {
                this.isdeleteFunctionG = false
                this.selectDelectFunctionGItem = []
            } else {
                this.isdeleteFunctionG = true
            }
        },
        deleteFunctionG() {
            if (this.isdeleteFunctionG == true) {
                for(let i=0; i<this.element.dependent[this.dependentStartupTab].functionItem.length; i++){
                    var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+i+'-'+this.dependentStartupTab)
                    if(endLineCon != undefined) {
                        this.deleteLine(this.element.uuid+'/fgcontext-'+i+'-'+this.dependentStartupTab)
                    }
                    var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+i+'-'+this.dependentStartupTab)
                    if(endLinetarg != undefined) {
                        this.deleteLine(this.element.uuid+'/fgtarget-'+i+'-'+this.dependentStartupTab)
                    }
                    if(endLineCon != undefined || endLinetarg != undefined) {
                        this.changeLineFunc.push({id:this.element.dependent[this.dependentStartupTab].functionItem[i].id, endLineCon:endLineCon, endLineTarg:endLinetarg})
                    }
                }

                this.element.dependent[this.dependentStartupTab].functionItem = this.element.dependent[this.dependentStartupTab].functionItem.filter(item => {
                         return this.selectDelectFunctionGItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.dependent[this.dependentStartupTab].functionItem.length; n++) {
                    for(let idx=0; idx<this.changeLineFunc.length; idx++) {
                        if (this.element.dependent[this.dependentStartupTab].functionItem[n].id == this.changeLineFunc[idx].id) {
                            if (this.element.dependent[this.dependentStartupTab].functionItem[n].contextMode != null) {
                                this.newLine(this.element.uuid+'/fgcontext-'+n+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.changeLineFunc[idx].endLineCon)
                            }
                            if (this.element.dependent[this.dependentStartupTab].functionItem[n].targetMode != null) {
                                this.newLine(this.element.uuid+'/fgtarget-'+n+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.changeLineFunc[idx].endLineTarg)
                            }
                        }
                    }
                }

                this.isdeleteFunctionG = false
                this.selectDelectFunctionGItem = []
                this.changeLineFunc = []
            }
        },
        openFunctionG(idx) {
            this.selContextMode = this.$store.getters.getMachineFG
            this.selTargetMode = this.$store.getters.getModeDeclaration

            if (this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+this.dependentStartupTab+'/'+idx)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getMachinePath(this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode, 2)
                }
                this.editFunctionGItem.contextMode = { name :this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode, uuid: endLineC }
            }
            if (this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode != null) {
                var endLineT = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+this.dependentStartupTab+'/'+idx)
                if (endLineT == undefined) {
                    endLineT = this.$store.getters.getModeDeclarationPath(this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode, 1)
                }
                this.editFunctionGItem.targetMode = { name :this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode, uuid: endLineT }
            }
        },
        editFunctionG(idx) {
            var endcontextMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab)
            if (endcontextMLine != undefined && this.editFunctionGItem.contextMode == null) {
                this.deleteLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = null
            } else if (endcontextMLine != undefined && endcontextMLine != this.editFunctionGItem.contextMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab)
                this.newLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.contextMode.uuid)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            } else if(endcontextMLine == undefined && this.editFunctionGItem.contextMode != null && this.editFunctionGItem.contextMode.uuid != null) {
                this.newLine(this.element.uuid+'/fgcontext-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.contextMode.uuid)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            } else if (this.editFunctionGItem.contextMode != null && endcontextMLine == this.editFunctionGItem.contextMode.uuid && this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode != this.editFunctionGItem.contextMode.name) {
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            }

            var endtargetMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab)
            if (endtargetMLine != undefined && this.editFunctionGItem.targetMode == null) {
                this.deleteLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = null
            } else if (endtargetMLine != undefined && endtargetMLine != this.editFunctionGItem.targetMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab)
                this.newLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.targetMode.uuid)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            } else if (endtargetMLine == undefined && this.editFunctionGItem.targetMode != undefined && this.editFunctionGItem.targetMode.uuid != undefined) {
                this.newLine(this.element.uuid+'/fgtarget-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.targetMode.uuid)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            } else if (this.editFunctionGItem.targetMode != undefined && endtargetMLine == this.editFunctionGItem.targetMode.uuid && this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode != this.editFunctionGItem.targetMode.name) {
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            }
            
            this.cancelFunctionG()
        },
        cancelFunctionG() {
            this.editFunctionGItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        addFunctionG() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.dependent[this.dependentStartupTab].functionItem.some(item => item.id === n)
            }
            this.editFunctionGItem.id = n

            var datacount
            if(this.element.dependent[this.dependentStartupTab].functionItem == undefined) {
                datacount = 0
            }else {
                datacount = this.element.dependent[this.dependentStartupTab].functionItem.length
            }

            if( this.editFunctionGItem.contextMode != null) {
                this.newLine(this.element.uuid+'/fgcontext-'+datacount+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.contextMode.uuid)
                this.editFunctionGItem.contextMode = this.editFunctionGItem.contextMode.name
            }
            if( this.editFunctionGItem.targetMode != null) {
                this.newLine(this.element.uuid+'/fgtarget-'+datacount+'-'+this.dependentStartupTab, this.element.uuid+'/fgtable'+this.dependentStartupTab, this.editFunctionGItem.targetMode.uuid)
                this.editFunctionGItem.targetMode = this.editFunctionGItem.targetMode.name
            }
            const addObj = Object.assign({}, this.editFunctionGItem)
            this.element.dependent[this.dependentStartupTab].functionItem.push(addObj)
            this.cancelFunctionG()
        },
        setContextModeSelect() {
            if (this.isEditingContextMode == true) { 
                if (this.editFunctionGItem.contextMode != null && this.editFunctionGItem.contextMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionGItem.contextMode.uuid, element: constant.Machine_str} )
                    document.getElementById(this.editFunctionGItem.contextMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editFunctionGItem.contextMode.uuid)
                }
                this.setContextMList()
                this.isEditingContextMode = false
            } else {
                this.isEditingContextMode = true
            }
        },
        setContextMList() {
            this.selContextMode =  this.$store.getters.getMachineFG
            this.setactiveUUID()
        },
        clearContextModeRef() {
            this.isEditingContextMode = true
            this.editFunctionGItem.contextMode = null
        },
        setTargetModeSelect() {
            if (this.isEditingTargetMode == true) { 
                if (this.editFunctionGItem.targetMode != null && this.editFunctionGItem.targetMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionGItem.targetMode.uuid, element: constant.ModeDeclarationGroup_str} )
                    document.getElementById(this.editFunctionGItem.targetMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editFunctionGItem.targetMode.uuid)
                }
                this.setTargetMList()
                this.isEditingTargetMode = false
            } else {
                this.isEditingTargetMode = true
            }
        },
        setTargetMList() {
            this.selTargetMode =  this.$store.getters.getModeDeclaration
            console.log('setTargetMList'+this.selTargetMode.length)
            this.setactiveUUID()
        },
        clearTargetModeRef() {
            this.isEditingTargetMode = true
            this.editFunctionGItem.targetMode = null
        },


        clearResourceG(item) {
            item.resourceRef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
            }
        },
        setResourceGSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinePath(item.resourceRef, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Machine_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setResourceGList() {
            this.selResourceG = this.$store.getters.getResourceGroup
            this.setactiveUUID()
        },
        setResourceG(item, tab) {
            if(tab.resourceRef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/processresorce-'+this.dependentStartupTab, this.element.uuid+'/processresorce'+this.dependentStartupTab, item.uuid)
                }
                tab.resourceRef = item.name
            }
            this.setactiveUUID()
        },

        clearStartupC(item) {
            item.startupConfigRef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
            }
        },
        setStartupCSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getStartupConfigPath(item.startupConfigRef)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.StartupConfig_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setStartupCList() {
            this.selStartupC = this.$store.getters.getStartupConfig
            this.setactiveUUID()
        },
        setStartupC(item, tab) {
            if(tab.startupConfigRef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab)
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/processstartup-'+this.dependentStartupTab, this.element.uuid+'/processstartup'+this.dependentStartupTab, item.uuid)
                tab.startupConfigRef = item.name
            }
            this.setactiveUUID()
        },
        newStartupC() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementStartupConfig', {
                name: this.$store.getters.getNameStartupConfig, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                config: []
            })
            EventBus.$emit('add-element', constant.StartupConfig_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckExecutionD() {
            if (this.isdeleteExecutionD == true) {
                this.isdeleteExecutionD = false
                this.selectDelectExecutionDItem = []
            } else {
                this.isdeleteExecutionD = true
            }
        },
        deleteExecutionD() {
            if (this.isdeleteExecutionD == true) {
                for(let i=0; i<this.element.dependent[this.dependentStartupTab].exection.length; i++){
                    var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+i+'-'+this.dependentStartupTab)
                    if(endLineCon != undefined) {
                        this.deleteLine(this.element.uuid+'/edcontext-'+i+'-'+this.dependentStartupTab)
                    }
                    var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+i+'-'+this.dependentStartupTab)
                    if(endLinetarg != undefined) {
                        this.deleteLine(this.element.uuid+'/edtarget-'+i+'-'+this.dependentStartupTab)
                    }
                    if(endLineCon != undefined || endLinetarg != undefined) {
                        this.changeLineExecut.push({id:this.element.dependent[this.dependentStartupTab].exection[i].id, endLineCon:endLineCon, endLineTarg:endLinetarg})
                    }
                }

                this.element.dependent[this.dependentStartupTab].exection = this.element.dependent[this.dependentStartupTab].exection.filter(item => {
                         return this.selectDelectExecutionDItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.dependent[this.dependentStartupTab].exection.length; n++) {
                    for(let idx=0; idx<this.changeLineExecut.length; idx++) {
                        if (this.element.dependent[this.dependentStartupTab].exection[n].id == this.changeLineExecut[idx].id) {
                            if (this.element.dependent[this.dependentStartupTab].exection[n].contextMode != null) {
                                this.newLine(this.element.uuid+'/edcontext-'+n+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.changeLineExecut[idx].endLineCon)
                            }
                            if (this.element.dependent[this.dependentStartupTab].exection[n].targetMode != null) {
                                this.newLine(this.element.uuid+'/edtarget-'+n+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.changeLineExecut[idx].endLineTarg)
                            }
                        }
                    }
                }

                this.isdeleteExecutionD = false
                this.selectDelectExecutionDItem = []
                this.changeLineExecut = []
            }
        },
        openExecutionD(idx) {
            this.selContextMode = this.$store.getters.getMachineFG
            this.selTargetMode = this.$store.getters.getModeDeclaration

            if (this.element.dependent[this.dependentStartupTab].exection[idx].contextMode != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+this.dependentStartupTab+'/'+idx)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getMachinePath(this.element.dependent[this.dependentStartupTab].exection[idx].contextMode, 2)
                }
                this.editExecutionDItem.contextMode = { name :this.element.dependent[this.dependentStartupTab].exection[idx].contextMode, uuid: endLineC }
            } 

            if (this.element.dependent[this.dependentStartupTab].exection[idx].targetMode != null) {
                var endLineT = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+this.dependentStartupTab+'/'+idx)
                if (endLineT == undefined) {
                    endLineT = this.$store.getters.getModeDeclarationPath(this.element.dependent[this.dependentStartupTab].exection[idx].targetMode, 1)
                }
                this.editExecutionDItem.targetMode = { name :this.element.dependent[this.dependentStartupTab].exection[idx].targetMode, uuid: endLineT }
            } 
        },
        editExecutionD(idx) {
            var endcontextMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+idx+'-'+this.dependentStartupTab)
            if (endcontextMLine != undefined && this.editExecutionDItem.contextMode == null) {
                this.deleteLine(this.element.uuid+'/edcontext-'+idx+'-'+this.dependentStartupTab)
                this.element.dependent[this.dependentStartupTab].exection[idx].contextMode = null
            } else if (endcontextMLine != undefined && endcontextMLine != this.editExecutionDItem.contextMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/edcontext-'+idx+'-'+this.dependentStartupTab)
                this.newLine(this.element.uuid+'/edcontext-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.editExecutionDItem.contextMode.uuid)
                this.element.dependent[this.dependentStartupTab].exection[idx].contextMode = this.editExecutionDItem.contextMode.name
            } else if(endcontextMLine == undefined && this.editExecutionDItem.contextMode != null && this.editExecutionDItem.contextMode.uuid != null) {
                this.newLine(this.element.uuid+'/edcontext-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.editExecutionDItem.contextMode.uuid)
                this.element.dependent[this.dependentStartupTab].exection[idx].contextMode = this.editExecutionDItem.contextMode.name
            } else if (this.editExecutionDItem.contextMode!= null && endcontextMLine == this.editExecutionDItem.contextMode.uuid && this.element.dependent[this.dependentStartupTab].exection[idx].contextMode != this.editExecutionDItem.contextMode.name) {
                this.element.dependent[this.dependentStartupTab].exection[idx].contextMode = this.editExecutionDItem.contextMode.name
            }

            var endtargetMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+idx+'-'+this.dependentStartupTab)
            if (endtargetMLine != undefined && this.editExecutionDItem.targetMode == null) {
                this.deleteLine(this.element.uuid+'/edtarget-'+idx+'-'+this.dependentStartupTab)
                this.element.dependent[this.dependentStartupTab].exection[idx].targetMode = null
            } else if (endtargetMLine != undefined && endtargetMLine != this.editExecutionDItem.targetMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/edtarget-'+idx+'-'+this.dependentStartupTab)
                this.newLine(this.element.uuid+'/edtarget-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.editExecutionDItem.targetMode.uuid)
                this.element.dependent[this.dependentStartupTab].exection[idx].targetMode = this.editExecutionDItem.targetMode.name
            } else if (endtargetMLine == undefined && this.editExecutionDItem.targetMode != undefined && this.editExecutionDItem.targetMode.uuid != null) {
                this.newLine(this.element.uuid+'/edtarget-'+idx+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.editExecutionDItem.targetMode.uuid)
                this.element.dependent[this.dependentStartupTab].exection[idx].targetMode = this.editExecutionDItem.targetMode.name
            } else if (this.editExecutionDItem.targetMode != null && endtargetMLine == this.editExecutionDItem.targetMode.uuid && this.element.dependent[this.dependentStartupTab].exection[idx].targetMode != this.editExecutionDItem.targetMode.name) {
                this.element.dependent[this.dependentStartupTab].exection[idx].targetMode = this.editExecutionDItem.targetMode.name
            }
            
            this.cancelExecutionD()
        },
        cancelExecutionD() {
            this.editExecutionDItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        addExecutionD() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.dependent[this.dependentStartupTab].exection.some(item => item.id === n)
            }
            this.editExecutionDItem.id = n

            var datacount
            if(this.element.dependent[this.dependentStartupTab].exection == undefined) {
                datacount = 0
            }else {
                datacount = this.element.dependent[this.dependentStartupTab].exection.length
            }

            if( this.editExecutionDItem.contextMode != null) {
                this.newLine(this.element.uuid+'/edcontext-'+datacount+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.editExecutionDItem.contextMode.uuid)
                this.editExecutionDItem.contextMode = this.editExecutionDItem.contextMode.name
            }
            if( this.editExecutionDItem.targetMode != null) {
                this.newLine(this.element.uuid+'/edtarget-'+datacount+'-'+this.dependentStartupTab, this.element.uuid+'/edtable'+this.dependentStartupTab, this.editExecutionDItem.targetMode.uuid)
                this.editExecutionDItem.targetMode = this.editExecutionDItem.targetMode.name
            }
            const addObj = Object.assign({}, this.editExecutionDItem)
            this.element.dependent[this.dependentStartupTab].exection.push(addObj)
            this.cancelExecutionD()
        },
        setCMSelect() {
            if (this.isEditingCM == true) { 
                if (this.editExecutionDItem.contextMode != null && this.editExecutionDItem.contextMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editExecutionDItem.contextMode.uuid, element: constant.Machine_str} )
                    document.getElementById(this.editExecutionDItem.contextMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editExecutionDItem.contextMode.uuid)
                }
                this.setContextMList()
                this.isEditingCM = false
            } else {
                this.isEditingCM = true
            }
        },
        clearCMRef() {
            this.isEditingCM = true
            this.editExecutionDItem.contextMode = null
        },
        setTMSelect() {
            if (this.isEditingTM == true) { 
                if (this.editExecutionDItem.targetMode != null && this.editExecutionDItem.targetMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editExecutionDItem.targetMode.uuid, element: constant.ModeDeclarationGroup_str} )
                    document.getElementById(this.editExecutionDItem.targetMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editExecutionDItem.targetMode.uuid)
                }
                this.setTargetMList()
                this.isEditingTM = false
            } else {
                this.isEditingTM = true
            }
        },
        clearTMRef() {
            this.isEditingTM = true
            this.editExecutionDItem.targetMode = null
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
