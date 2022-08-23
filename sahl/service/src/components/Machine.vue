<template>
    <div :id="element.uuid">
        <v-container> 
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on"> <!-- style='height:300px' 이렇게 하면 접었을때 배경이 하얗게 나옴 max-height해야지 접었을때 배경안나옴 -->
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Machine</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text  v-show="iselementOpenClose && zoomvalue > $setZoominElement">
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
                                            :show-select="isdeleteHWElementItem" item-key="id" height="140px" dense hide-default-footer >
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
                                            :show-select="isdeleteFunctionGroupItem" item-key="id" height="140px" dense hide-default-footer >
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
                                    <v-data-table v-model="selectDelectEnvironmentV" :headers="headerEnvironmentV" :items="element.environ" :items-per-page='20'
                                            :show-select="isdeleteEnvironmentV" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteEnvironmentV" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openEnvironmentV(idx)" @cancel="editEnvironmentV(idx)" @save="cancelEnvironmentV" large >
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
                                <v-tabs v-model='processortab' height="30px" v-if="isProcessorOpenClose" show-arrows>
                                    <v-tab v-for="(tab, idx) in element.processor" :key="idx" @click="clickProcessortab()"> 
                                        {{tab.name}}
                                        <v-btn text x-small @click="deleteProcessor(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="processortab" v-if="isProcessorOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.processor" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.name" @input="inputProcessorName()" @click="clickProcessorName(tab.name)" :rules="rules.name" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                        :show-select="isdeleteCoreItem" item-key="id" height="140px" dense hide-default-footer :items-per-page='20'>
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
                                                                            <v-text-field v-model="editCoreItem.idCore" label="Core ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                            <v-text-field v-model="editCoreItem.idCore" label="Core ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                <div class="subtitle-2" :id="element.uuid+'/moduleIns'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showModuleInsItem" x-small color="indigo">
                                            <v-icon>{{ isModuleInsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Module Instantiations
                                </div>
                                <v-card outlined class="mx-auto" v-if="isModuleInsOpenClose">
                                    <div class="subtitle-2" style="height:20px">
                                        <v-hover v-slot="{ hover }">
                                            <v-btn text @click="showOSModuleInsItem" x-small color="indigo" style="margin-left:15px">
                                                <v-icon>{{ isOSModuleInsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                            </v-btn>
                                        </v-hover>
                                        OS Module Instantiation
                                        <v-btn v-if="isOSModuleInsOpenClose" @click="addModuleIns" text x-small color="indigo">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-tabs v-model='ModuleInstab' height="30px" v-if="isOSModuleInsOpenClose">
                                        <v-tab v-for="(tab, idx) in element.moduleinstant" :key="idx" @click="clickModuleInstab()"> 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deleteModuleIns(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="ModuleInstab" v-if="isOSModuleInsOpenClose">
                                        <v-tab-item v-for="(tab, idx) in element.moduleinstant" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputModuleInsName()" @click="clickModuleInsName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                    <v-data-table v-if="isResourceGOpenClose" v-model="selectDelectModuleInsItem" :headers="headerModuleIns" :items="tab.resource"
                                                            :show-select="isdeleteResourceGItem" item-key="id" height="140px" dense hide-default-footer :items-per-page='20'>
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
                                <v-card outlined class="mx-auto" v-if="isModuleInsOpenClose">
                                    <div class="subtitle-2" style="height:20px">
                                        <v-hover v-slot="{ hover }">
                                            <v-btn text @click="showUCMModule" x-small color="indigo" style="margin-left:15px">
                                                <v-icon>{{ isUCMModuleOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                            </v-btn>
                                        </v-hover>
                                        UCM Module Instantiation
                                        <v-btn @click="isCheckUCMModule" text x-small color="indigo" v-if="isUCMModuleOpenClose">
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                        <v-btn v-if="isUCMModuleOpenClose && isdeleteUCMModule" @click="deleteUCMModule" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-card-text v-if="isUCMModuleOpenClose">
                                        <v-data-table v-model="selectDelectUCMModule" :headers="headerUCMModule" :items="element.ucm" :items-per-page='20'
                                                :show-select="isdeleteUCMModule" item-key="id" height="140px" dense hide-default-footer >
                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                            </template>
                                            <template v-if="!isdeleteUCMModule" v-slot:body="{ items, headers }">
                                                <tbody>
                                                    <tr v-for="(item,idx) in items" :key="idx">
                                                        <td v-for="(header,key) in headers" :key="key">
                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openUCMModule(idx)" @cancel="editUCMModule(idx)" @save="cancelUCMModule" large >
                                                                {{item[header.value]}}
                                                                <template v-slot:input>
                                                                    <br>
                                                                    <v-text-field v-model="editUCMModuleItem.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editUCMModuleItem.ident" label="Identifier" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                </template>
                                                            </v-edit-dialog>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="3">
                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addUCMModule()" @save="cancelUCMModule"> 
                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                </v-btn>
                                                                <template v-slot:input>
                                                                    <br>
                                                                    <v-text-field v-model="editUCMModuleItem.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                    <v-text-field v-model="editUCMModuleItem.ident" label="Identifier" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                </template>
                                                            </v-edit-dialog>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                                <v-card outlined class="mx-auto" v-if="isModuleInsOpenClose">
                                    <div class="subtitle-2" :id="element.uuid+'/iamM'" style="height:20px">
                                        <v-hover v-slot="{ hover }">
                                            <v-btn text @click="showIamModule" x-small color="indigo"  style="margin-left:15px">
                                                <v-icon>{{ isIamModuleOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                            </v-btn>
                                        </v-hover>
                                        IAM Module Instantiation
                                        <v-btn v-if="isIamModuleOpenClose" @click="addIamModule()" text x-small color="indigo">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-card-text v-show="isIamModuleOpenClose">
                                        <v-tabs v-model='IamModuleTab' height="30px" show-arrows @change="changeIamModuleTab()">
                                            <v-tab v-for="(tab, idx) in element.iam" :key="idx" @click="clickIamModuletab()"> 
                                                {{tab.name}}
                                                <v-btn text x-small @click="deleteIamModule(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                        </v-tabs>
                                        <v-tabs-items v-model="IamModuleTab">
                                            <v-tab-item v-for="(tab, idx) in element.iam" :key="idx">
                                                <v-card flat>
                                                    <v-card-text>
                                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputIamModuleName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-card outlined class="mx-auto">
                                                            <div class="subtitle-2" style="height:20px" :id="element.uuid+'/grandtab-'+tab.id">
                                                                <v-hover v-slot="{ hover }">
                                                                    <v-btn text @click="showGrantRef" x-small color="indigo">
                                                                        <v-icon>{{ isGrantRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                    </v-btn>
                                                                </v-hover>
                                                                Grant Refs
                                                                <v-btn @click="isCheckGrantRef" text x-small color="indigo" v-if="isGrantRefOpenClose">
                                                                    <v-icon>mdi-check</v-icon>
                                                                </v-btn>
                                                                <v-btn v-if="isGrantRefOpenClose && isdeleteGrantRef" @click="deleteGrantRef" text x-small color="indigo">
                                                                    <v-icon>mdi-minus</v-icon>
                                                                </v-btn>
                                                            </div>
                                                            <v-card-text v-show="isGrantRefOpenClose">
                                                                <v-data-table v-model="selectDelectGrantRef" :headers="headerGrantRef" :items="tab.grants" :items-per-page='20'
                                                                        :show-select="isdeleteGrantRef" item-key="id" height="140px" dense hide-default-footer >
                                                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                    </template>
                                                                    <template v-if="!isdeleteGrantRef" v-slot:body="{ items, headers }">
                                                                        <tbody>
                                                                            <tr v-for="(item,num) in items" :key="num">
                                                                                <td v-for="(header,key) in headers" :key="key">
                                                                                    <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openGrantRef(num)" @cancel="editGrantRefItem(num)" @save="cancelGrantRef" large >
                                                                                        {{item[header.value]}}
                                                                                        <template v-slot:input>
                                                                                            <br>
                                                                                            <v-select v-model="editGrant.select" :items="selectGrant" clearable @click:clear='clearGrantSelect()' label="Data Element" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                            <v-autocomplete v-if="editGrant.select != null" v-model='editGrant.grant' label='Data Element Reference' :items='selGrant' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                                return-object :readonly="!isEditingGrant" clearable @click="setGrantSelect()" 
                                                                                                @click:clear='clearGrant' @blur="isEditingGrant=true" outlined dense style="height: 45px;">
                                                                                                <template v-slot:append-item>
                                                                                                    <v-btn outlined color="indigo" dense text small block @click="newGrant()">
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
                                                                                    <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addGrantRef()" @save="cancelGrantRef"> 
                                                                                        <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                                        </v-btn>
                                                                                        <template v-slot:input>
                                                                                            <br>
                                                                                            <v-select v-model="editGrant.select" :items="selectGrant" clearable @click:clear='clearGrantSelect()' label="Grant Select" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                            <v-autocomplete v-if="editGrant.select != null" v-model='editGrant.grant' label='Grant Reference' :items='selGrant' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                                return-object :readonly="!isEditingGrant" clearable @click="setGrantSelect()" 
                                                                                                @click:clear='clearGrant' @blur="isEditingGrant=true" outlined dense style="height: 45px;">
                                                                                                <template v-slot:append-item>
                                                                                                    <v-btn outlined color="indigo" dense text small block @click="newGrant()">
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
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </v-card-text>
                                </v-card>
                                <v-card outlined class="mx-auto" v-if="isModuleInsOpenClose">
                                    <div class="subtitle-2" style="height:20px">
                                        <v-hover v-slot="{ hover }">
                                            <v-btn text @click="showCrypto" x-small color="indigo"  style="margin-left:15px">
                                                <v-icon>{{ isCryptoOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                            </v-btn>
                                        </v-hover>
                                        Crypto Module Instantiation
                                        <v-btn v-if="isCryptoOpenClose" @click="addCrypto()" text x-small color="indigo">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-card-text v-show="isCryptoOpenClose">
                                        <v-tabs v-model='CryptoTab' height="30px" show-arrows @change="changeCryptoTab()">
                                            <v-tab v-for="(tab, idx) in element.crypto" :key="idx" @click="clickCryptoTab()"> 
                                                {{tab.name}}
                                                <v-btn text x-small @click="deleteCrypto(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                        </v-tabs>
                                        <v-tabs-items v-model="CryptoTab">
                                            <v-tab-item v-for="(tab, idx) in element.crypto" :key="idx">
                                                <v-card flat>
                                                    <v-card-text>
                                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-card outlined class="mx-auto">
                                                            <div class="subtitle-2" style="height:20px" >
                                                                <v-btn color="indigo" text x-small @click="dialogEditSDG=true">
                                                                    <v-icon>mdi-pencil</v-icon>
                                                                </v-btn>
                                                                Admin Data
                                                                <v-dialog v-model='dialogEditSDG' width="600" persistent scrollable>
                                                                    <v-card>
                                                                        <v-card-title class="text-h7 green accent-1"> 
                                                                            Edit SDGS  
                                                                            <v-btn :disabled="isAddItem==false ? true : false" @click="addSDGItem()" text x-small color="indigo">
                                                                                <v-icon>mdi-plus</v-icon>
                                                                            </v-btn>
                                                                            <v-btn :disabled="isDeletItem==false ? true : false" @click="deleteSDGItem()" text x-small color="indigo">
                                                                                <v-icon>mdi-minus</v-icon>
                                                                            </v-btn>
                                                                        </v-card-title>
                                                                        <v-card-text>
                                                                            <br>
                                                                            <v-row>
                                                                                <v-col cols="4">
                                                                                    <v-select v-model="editSDGItem.ele" :disabled="selectSDG[0] == null ? true : false" :items="selSDGEleItem" @input="inputSDGEle()" clearable @click:clear="clearSDGEle()" label="Element Select" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                </v-col>
                                                                                <v-col cols="4">
                                                                                    <v-select v-model="editSDGItem.gid" :disabled="editSDGItem.ele == null ? true : false" :items="selSDGGidItem"  @input="inputSDGGid()" clearable @click:clear="clearSDGGid()" label="GID Select" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                </v-col>
                                                                                <v-col cols="4">
                                                                                    <v-text-field v-model="editSDGItem.item" :disabled="isSDGItem==true? false : true" label="Item" @input="inputSDGItem(editSDGItem.item)" @click="setactiveUUID" outlined dense style="height: 45px;"></v-text-field>
                                                                                </v-col>
                                                                            </v-row>
                                                                            <v-row>
                                                                                <v-treeview :items="tab.sdgs" item-key="id" activatable :open-on-click="false" return-object dense @update:active="activeElement">
                                                                                </v-treeview>
                                                                            </v-row>
                                                                        </v-card-text>
                                                                        <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn color="primary" text @click="closdSDGS()">
                                                                                Close
                                                                            </v-btn>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </div>
                                                            <v-card-text>
                                                                <v-treeview :items="tab.sdgs" activatable return-object :open-on-click="true" dense @update:active="activeElement" class="caption">
                                                                </v-treeview>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </v-card-text>
                                </v-card>
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
    props: ['element', 'isDatailView','minimaptoolbar', 'location'],
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
                        if(this.iselementOpenClose && this.location == 1) {
                            if(this.element.iam.length > 0) {
                                if (this.isModuleInsOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, this.isIamModuleOpenClose)
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
            editFunctionItem: { name: '', type: null, id: '' },
            defaultfunctionItem: { name: '', type: null, id: '' },
            deleteChangeLine : [],

            isEnvironmentVOpenClose: true,
            isdeleteEnvironmentV: false,
            selectDelectEnvironmentV: [],
            headerEnvironmentV: [
                { text: 'Key', align: 'start', sortable: false, value: 'key' },
                { text: 'Value', sortable: false, value: 'value' },
            ],
            editEnvironItem: { key: '', value: '', id: '' },
            defaultEnvironItem: { key: '', value: '', id: '' },

            processortab: null,
            isProcessorOpenClose: true,
            isCoreOpenClose: true,
            isdeleteCoreItem: false,
            selectDelectCoreItem: [],
            headerCore: [
                { text: 'Name', align: 'start', sortable: false, value: 'name'},
                { text: 'Core ID', sortable: false, value: 'idCore'},
            ],
            editCoreItem: { name: '', idCore: '', id: '' },
            defaultCoreItem: { name: '', idCore: '', id: '' },

            isModuleInsOpenClose: true,
            ModuleInstab: null,
            isOSModuleInsOpenClose: true,
            isResourceGOpenClose: true,
            isdeleteResourceGItem: false,
            selectDelectModuleInsItem: [],
            headerModuleIns: [
                { text: 'Resource Group Name', width:'160px', align: 'start', sortable: false, value: 'name' },
                { text: 'CPU Usage', width:'100px', sortable: false, value: 'cpuUsage' },
                { text: 'Memory Usage', width:'120px', sortable: false, value: 'memoryUsage' },
            ],
            editModuleInsItem: { name: '',cpuUsage: '', memoryUsage: '', id: '' },
            defaultModuleInsItem: { name: '', cpuUsage: '', memoryUsage: '', id: '' },

            isUCMModuleOpenClose: true,
            isdeleteUCMModule: false,
            selectDelectUCMModule: [],
            headerUCMModule: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Identifier', sortable: false, value: 'ident' },
            ],
            editUCMModuleItem: { name: '', ident: '', id: '' },
            defaultUCMModuleItem: { name: '', ident: '', id: '' },

            IamModuleTab: null,
            isIamModuleOpenClose: true,
            isGrantRefOpenClose: true,
            isdeleteGrantRef: false,
            selectDelectGrantRef: [],
            headerGrantRef: [
                { text: 'Grant Ref', sortable: false, value: 'grant' },
            ],
            selectGrant: ['COM-EVENT-GRANT','COM-FIELD-GRANT', 'COM-METHOD-GRANT'],
            editGrant: { grant: null, select: null, id: ''},
            selGrant:this.$store.getters.getEventGrant,
            isEditingGrant: true,

            isCryptoOpenClose: true,
            CryptoTab: 0,
            idCrypto: 4,
            selectSDG: [],
            editSDGItem: { ele: null, gid: null, item: null},
            selProvider: ["RELATED-PROCESS", "RELATED-PORT", "CRYPTO-INSTANTIATION-KEY-SLOT", ],
            selCerification: ["RELATED-PROCESS", "RELATED-PORT", "CRYPTO-CERTIFICATE-KEY-SLOT"],
            selKeySlot: ["RELATED-PROCESS", "RELATED-PORT", "CRYPTO-KEY-SLOT-CONTENT-ALLOWED-USAGE", "CRYPTO-KEY-SLOT-ALLOWED-MODIFICATION"],
            selSDKeySlot: ["SHORT-NAME", "CRYPTO-KEY-SLOT-ALG-ID", "CRYPTO-KEY-SLOT-OBJECT-TYPE", "CRYPTO-KEY-SLOT-SLOT-TYPE", "CRYPTO-KEY-SLOT-SLOT-CAPACITY"],
            selSDUsage: ["CRYPTO-KEY-SLOT-CONTENT-ALLOWED-USAGE", "CRYPTO-KEY-SLOT-CONTENT-ALLOWED-USAGE"],
            selSDModification: ["CRYPTO-KEY-SLOT-ALLOW-CONTENT-TYPE-CHANGE", "CRYPTO-KEY-SLOT-EXPORT-ABILITY", "CRYPTO-KEY-SLOT-MAX-NUMBER-OF-ALLOWED-UPDATES", "CRYPTO-KEY-SLOT-RESTRICT-UPDATE"],
            selFirstSDG: ['SDG-CAPTION', 'SDG', 'SD'],
            selFirstSD: ['SHORT-NAME'],
            selRef: ['SDX-REF', 'SDG-CAPTION'],
            selKeySlotAllowed: ['SD'],
            selSDGEleItem: [],
            selSDGGidItem: [],
            isSDGItem: false,
            isAddItem: false,
            isDeletItem: false,
            dialogEditSDG: false,

            beforeProcess: '',
            beforeModule: ''
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
        showMachine () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.element.iam.length > 0) {
                        if (this.isModuleInsOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, this.isIamModuleOpenClose)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
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
        showEnvironmentV() {
            this.isEnvironmentVOpenClose = this.isEnvironmentVOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showProcessorItem() {
            this.isProcessorOpenClose = this.isProcessorOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showCore() {
            this.isCoreOpenClose = this.isCoreOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showModuleInsItem() {
            this.isModuleInsOpenClose = this.isModuleInsOpenClose ? false : true
            this.$nextTick(() => {
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.element.iam.length > 0) {
                        if (this.isModuleInsOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, this.isIamModuleOpenClose)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showOSModuleInsItem() {
            this.isOSModuleInsOpenClose = this.isOSModuleInsOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showResourceG() {
            this.isResourceGOpenClose = this.isResourceGOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showUCMModule() {
            this.isUCMModuleOpenClose = this.isUCMModuleOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showIamModule() {
            this.isIamModuleOpenClose = this.isIamModuleOpenClose ? false : true
            if (this.element.iam.length > 0) {
                EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, this.isIamModuleOpenClose)
            }
        },
        showCrypto() {
            this.isCryptoOpenClose = this.isCryptoOpenClose ? false : true
            },
        showGrantRef() {
            this.isGrantRefOpenClose = this.isGrantRefOpenClose ? false : true 
        },
        inputMachineName() {
            this.$store.commit('editMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickProcessorName(name) {
            this.beforeProcess = name
        },
        clickModuleInsName(name) {
            this.beforeModule = name
        },
        inputProcessorName() {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'Processor', listname: this.element.processor[this.processortab].name, beforename: this.beforeProcess} )
            this.beforeProcess = this.element.processor[this.processortab].name
        },
        inputModuleInsName() {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'ModuleIns', listname: this.element.moduleinstant[this.ModuleInstab].name, beforename: this.beforeModule} )
            this.beforeModule = this.element.moduleinstant[this.ModuleInstab].name
        },


        setMachineDesignSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
            if (endLine == undefined) {
                endLine = this.$store.getters.getMachinDesignPath(this.element.machinedesign, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.MachineDesigne_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
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
                    document.getElementById(this.editFunctionItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editFunctionItem.type.uuid)
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
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementMachineDesign', {
                name: this.$store.getters.getNameMachineDesign, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                access:null, resettimer: '', connector:[], servicediscover:[], 
            })
            EventBus.$emit('add-element', constant.MachineDesigne_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newHWElement() {
            //HW Element
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementHWElement', { //category 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameHWElement, path: '',
                top: elementY, left: elementX, zindex: 10, category:null, attribute:[], icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.HWElement_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newModeDeclaration() {
            //Mode Declaration
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            this.$store.commit('addElementModeDeclarationGroup', {
                name: this.$store.getters.getNameModeDeclarationGroup, path: '',
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
                        this.deleteHWLine.push({id:this.element.hwelement[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/hwelement-'+i)
                    }
                }

                this.element.hwelement = this.element.hwelement.filter(item => {
                        return this.selectDelectHWElement.indexOf(item) < 0 })

                for(let n=0; n<this.element.hwelement.length; n++) {
                    for(let idx=0; idx<this.deleteHWLine.length; idx++) {
                        if (this.element.hwelement[n].id == this.deleteHWLine[idx].id) {
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
            } else if (endLine == undefined && this.editHWItem.hwelement != null && this.editHWItem.hwelement.uuid != null) {
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
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.hwelement.some(item => item.id === n)
            }
            this.editHWItem.id = n

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
                    document.getElementById(this.editHWItem.hwelement.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editHWItem.hwelement.uuid)
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
                        this.deleteChangeLine.push({id:this.element.functiongroup[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/functiontable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'functionG', deletItemList: this.selectDelectFunctionItem, path: this.element.path, name: this.element.name})
                this.element.functiongroup = this.element.functiongroup.filter(item => {
                        return this.selectDelectFunctionItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.functiongroup.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLine.length; idx++) {
                        if (this.element.functiongroup[n].id == this.deleteChangeLine[idx].id) {
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
            } else if (endLine == undefined && this.editFunctionItem.type != null && this.editFunctionItem.type.uuid != null) {
                this.newLine(this.element.uuid+'/functiontable-'+idx, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid)
                this.element.functiongroup[idx].type = this.editFunctionItem.type.name
            }

            if (this.element.functiongroup[idx].name != this.editFunctionItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'functionG', listname: this.editFunctionItem.name, beforename: this.element.functiongroup[idx].name} )
            }

            this.element.functiongroup[idx].name = this.editFunctionItem.name
            
            this.cancelFunctionGroup()
        },
        cancelFunctionGroup() {
            this.editFunctionItem = Object.assign({}, this.defaultfunctionItem)
            this.setactiveUUID()
        },
        addFunctionGroup() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.functiongroup.some(item => item.id === n)
            }
            this.editFunctionItem.id = n

            if( this.editFunctionItem.type != null) {
                var datacount = this.element.functiongroup.length
                this.newLine(this.element.uuid+'/functiontable-'+datacount, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid)
                this.editFunctionItem.type = this.editFunctionItem.type.name
            }

            const addObj = Object.assign({}, this.editFunctionItem)
            this.element.functiongroup.push(addObj);
            this.cancelFunctionGroup()
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
                this.element.environ = this.element.environ.filter(item => {
                        return this.selectDelectEnvironmentV.indexOf(item) < 0 })

                this.isdeleteEnvironmentV = false
                this.selectDelectEnvironmentV = []
            } 
        },
        openEnvironmentV(idx) {
            this.editEnvironItem.key = this.element.environ[idx].key
            this.editEnvironItem.value = this.element.environ[idx].value
        },
        editEnvironmentV(idx) {
            this.element.environ[idx].key = this.editEnvironItem.key
            this.element.environ[idx].value = this.editEnvironItem.value
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
                res = this.element.environ.some(item => item.id === n)
            }
            this.editEnvironItem.id = n

            const addObj = Object.assign({}, this.editEnvironItem)
            this.element.environ.push(addObj);
            this.cancelEnvironmentV()
        },

        clickProcessortab() {
            this.isdeleteCoreItem = false
            this.selectDelectCoreItem = []
        },
        deleteProcessor(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'Processor', deleteTab: true, tabName: this.element.processor[idx].name, path: this.element.path, name: this.element.name})

            this.element.processor.splice(idx, 1)
            this.clickProcessortab()
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
                this.$store.commit('deleteRefTable', {deleteName:'proCore', deletItemList: this.selectDelectCoreItem, path: this.element.path, name: this.element.name, tabname: this.element.processor[this.processortab].name})

                this.element.processor[this.processortab].core = this.element.processor[this.processortab].core.filter(item => {
                         return this.selectDelectCoreItem.indexOf(item) < 0 })
                this.isdeleteCoreItem = false
                this.selectDelectCoreItem = []
            }
        },
        openCore(idx, core) {
            this.editCoreItem.name = core[idx].name
            this.editCoreItem.idCore = core[idx].idCore
        },
        editCore(idx,core) {
            if (this.editCoreItem.name != core[idx].name) {
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'proCore', listname: this.editCoreItem.name, tabname: this.element.processor[this.processortab].name, beforename: core[idx].name} )
            }
            core[idx].name = this.editCoreItem.name
            core[idx].idCore = this.editCoreItem.idCore
            this.cancelCore()
        },
        cancelCore() {
            this.editCoreItem = Object.assign({}, this.defaultCoreItem)
            this.setactiveUUID()
        },
        addCore(idx) {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.processor[idx].core.some(item => item.id === n)
            }
            this.editCoreItem.id = n

            const addObj = Object.assign({}, this.editCoreItem)
            this.element.processor[idx].core.push(addObj)
            this.cancelCore()
        },

        addModuleIns() {
            const editItem = {name: '', resource: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Module Instance_' + n++;
                res = this.element.eventG.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
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
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.moduleinstant[idx].resource.some(item => item.id === n)
            }
            this.editModuleInsItem.id = n

            const addObj = Object.assign({}, this.editModuleInsItem)
            this.element.moduleinstant[idx].resource.push(addObj)
            this.cancelResourceG()
        },

        isCheckUCMModule() {
            if (this.isdeleteUCMModule == true) {
                this.isdeleteUCMModule = false
                this.selectDelectUCMModule = []
            } else {
                this.isdeleteUCMModule = true
            }
        },
        deleteUCMModule() {
            if (this.isdeleteUCMModule == true) {
                this.element.ucm = this.element.ucm.filter(item => {
                        return this.selectDelectUCMModule.indexOf(item) < 0 })

                this.isdeleteUCMModule = false
                this.selectDelectUCMModule = []
            } 
        },
        openUCMModule(idx) {
            this.editUCMModuleItem.name = this.element.ucm[idx].name
            this.editUCMModuleItem.ident = this.element.ucm[idx].ident
        },
        editUCMModule(idx) {
            if (this.element.ucm[idx].name != this.editUCMModuleItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'ucm', listname: this.editUCMModuleItem.name, beforename: this.element.ucm[idx].name } )
            }
            this.element.ucm[idx].name = this.editUCMModuleItem.name
            this.element.ucm[idx].ident = this.editUCMModuleItem.ident
            this.cancelUCMModule()
        },
        cancelUCMModule() {
            this.editUCMModuleItem = Object.assign({}, this.defaultUCMModuleItem)
            this.setactiveUUID()
        },
        addUCMModule() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.ucm.some(item => item.id === n)
            }
            this.editUCMModuleItem.id = n

            const addObj = Object.assign({}, this.editUCMModuleItem)
            this.element.ucm.push(addObj);
            this.cancelUCMModule()
        },

        addIamModule() {
            const editItem = {name: '', grants: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'IAM_Instantiation_' + n++;
                res = this.element.iam.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.iam.push(addObj)
            this.IamModuleTab = this.element.iam.length-1
            if(this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, false)
            }
        },
        clickIamModuletab() {
            this.isdeleteGrantRef = false
            this.selectDelectGrantRef = []
        },
        changeIamModuleTab() {
            if(this.element.iam.length > 0 && this.location == 1 && this.IamModuleTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, true)}, 300);
            }
        },
        deleteIamModule(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'iam', deleteTab: true, tabName: this.element.iam[idx].name, path: this.element.path, name: this.element.name})
            for(let i=0; i<this.element.iam[idx].grants.length; i++){
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[i].id+'-'+this.element.iam[idx].id)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/iamM-'+this.element.iam[i].id+'-'+this.element.iam[idx].id)
                }
            }
            this.element.iam.splice(idx, 1)
        },
        isCheckGrantRef() {
            if (this.isdeleteGrantRef == true) {
                this.isdeleteGrantRef = false
                this.selectDelectGrantRef = []
            } else {
                this.isdeleteGrantRef = true
            }
        },
        deleteGrantRef() {
            if (this.isdeleteGrantRef == true) {
                this.selectDelectGrantRef.forEach( item => {
                    for(let i=0; i<this.element.iam[this.IamModuleTab].grants.length; i++){
                        if (item.id == this.element.iam[this.IamModuleTab].grants[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[i].id+'-'+this.element.iam[this.IamModuleTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[i].id+'-'+this.element.iam[this.IamModuleTab].id)
                            }
                        }
                    }
                })

                this.element.iam[this.IamModuleTab].grants = this.element.iam[this.IamModuleTab].grants.filter(item => {
                        return this.selectDelectGrantRef.indexOf(item) < 0 })

                this.isdeleteGrantRef = false
                this.selectDelectGrantRef = []
            } 
        },
        openGrantRef(idx) { 
            var endLine = null
            this.editGrant.select = this.element.iam[this.IamModuleTab].grants[idx].select
            if (this.editGrant.select == "COM-EVENT-GRANT") {
                this.selGrant = this.$store.getters.getEventGrant

                if (this.element.iam[this.IamModuleTab].grants[idx].grant != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getEventPath(this.element.iam[this.IamModuleTab].grants[idx].grant, 1)
                    }
                    this.editGrant.grant = { name: this.element.iam[this.IamModuleTab].grants[idx].grant, uuid: endLine}
                }
            } else if (this.editGrant.select == "COM-FIELD-GRANT") {
                this.selGrant = this.$store.getters.getFieldGrant

                if (this.element.iam[this.IamModuleTab].grants[idx].grant != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getFieldPath(this.element.iam[this.IamModuleTab].grants[idx].grant, 2)
                    }
                    this.editGrant.grant = { name: this.element.iam[this.IamModuleTab].grants[idx].grant, uuid: endLine}
                }
            } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                this.selGrant = this.$store.getters.getMethodGrant

                if (this.element.iam[this.IamModuleTab].grants[idx].grant != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getMethodPath(this.element.iam[this.IamModuleTab].grants[idx].grant, 2)
                    }
                    this.editGrant.grant = { name: this.element.iam[this.IamModuleTab].grants[idx].grant, uuid: endLine}
                }
            }
        },
        editGrantRefItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
            if (endLine != undefined && this.editGrant.grant == null) {
                this.deleteLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                this.element.iam[this.IamModuleTab].grants[idx].grant = null
            } else if (endLine != undefined && endLine != this.editGrant.grant.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                this.newLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id, this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, this.editGrant.grant.uuid)
                this.element.iam[this.IamModuleTab].grants[idx].grant = this.editGrant.grant.name
            } else if (endLine == undefined && this.editGrant.grant != null && this.editGrant.grant.uuid != null) {
                this.newLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id, this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, this.editGrant.grant.uuid)
                this.element.iam[this.IamModuleTab].grants[idx].grant = this.editGrant.grant.name
            }
            this.element.iam[this.IamModuleTab].grants[idx].select = this.editGrant.select
            this.cancelGrantRef()
        },
        cancelGrantRef() {
            this.editGrant = {grant: null, select: null}
            this.setactiveUUID()
        },
        addGrantRef() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.iam[this.IamModuleTab].grants.some(item => item.id === n)
            }
            this.editGrant.id = n

            if( this.editGrant.grant != null) {
                this.newLine(this.element.uuid+'/iamM-'+n+'-'+this.element.iam[this.IamModuleTab].id, this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, this.editGrant.grant.uuid)
                this.editGrant.grant = this.editGrant.grant.name
            }

            const addObj = Object.assign({}, this.editGrant)
            this.element.iam[this.IamModuleTab].grants.push(addObj);
            this.cancelGrantRef()
        },
        clearGrantSelect() {
            this.editGrant.grant = null
            this.editGrant.select = null
        },
        setGrantSelect() {
            if (this.isEditingGrant == true) {
                if (this.editGrant.grant != null && this.editGrant.grant.uuid != null) {
                    if (this.editGrant.select == "COM-EVENT-GRANT") {
                        this.$store.commit('setDetailView', {uuid: this.editGrant.grant.uuid, element: constant.ComEventGrant_str} )
                    }else if (this.editGrant.select == "COM-FIELD-GRANT") {
                        this.$store.commit('setDetailView', {uuid: this.editGrant.grant.uuid, element: constant.ComFieldGrant_str} )
                    } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                        this.$store.commit('setDetailView', {uuid: this.editGrant.grant.uuid, element: constant.ComMethodGrant_str} )
                    }
                    document.getElementById(this.editGrant.grant.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editGrant.grant.uuid)
                }
                this.setGrantList()
                this.isEditingGrant = false
            } else {
                this.isEditingGrant = true
            }
        },
        setGrantList() {
            if (this.editGrant.select == "COM-EVENT-GRANT") {
                this.selGrant = this.$store.getters.getEventGrant
            } else if (this.editGrant.select == "COM-FIELD-GRANT") {
                this.selGrant = this.$store.getters.getFieldGrant
            } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                this.selGrant = this.$store.getters.getMethodGrant
            }
            this.setactiveUUID()
        },
        clearGrant() {
            this.isEditingGrant = true
            this.editGrant.grant = null
        },
        newGrant() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            if (this.editGrant.select == "COM-EVENT-GRANT") {
                this.$store.commit('addElementEventG', {
                    name: this.$store.getters.getNameEventG, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    eventD: null, provide: null,
                })
                EventBus.$emit('add-element', constant.ComEventGrant_str)
            } else if (this.editGrant.select == "COM-FIELD-GRANT") {
                this.$store.commit('addElementFieldG', {
                    name: this.$store.getters.getNameFieldG, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    fieldD: null, provide: null, role: null
                })
                EventBus.$emit('add-element', constant.ComFieldGrant_str)
            } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                this.$store.commit('addElementMethodG', {
                    name: this.$store.getters.getNameMethodG, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    methodD: null, provide: null,
                })
                EventBus.$emit('add-element', constant.ComMethodGrant_str)
            }
            EventBus.$emit('add-element', constant.IAM_str)
            EventBus.$emit('add-element', constant.Platform_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addCrypto() {
            const editItem = {name: '', id: '', sdgs: []}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'crypto_' + n++;
                res = this.element.crypto.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.crypto.push(addObj)
            this.CryptoTab = this.element.crypto.length-1
            this.element.crypto[this.CryptoTab].sdgs.push({
                name : 'SDGS',
                id : 1,
                children: [
                    {name: 'SDG GID="CRYPTO-INSTANTIATION-PROVIDER"', id : 2, ele:'SDG', gid:'CRYPTO-INSTANTIATION-PROVIDER', item: '', children: []},
                    {name: 'SDG GID="CRYPTO-INSTANTIATION-CERTIFICATE"', id : 3, ele:'SDG', gid:'CRYPTO-INSTANTIATION-CERTIFICATE', item: '', children: []}
                ]
            })
        },
        changeCryptoTab() {},
        clickCryptoTab() {},
        deleteCrypto(idx) {
            this.element.crypto.splice(idx, 1)
        },
        closdSDGS() {
            this.dialogEditSDG = false
            this.initSDGS()
        },
        initSDGS() {
            if (this.selectSDG[0] == null) {
                this.isDeletItem = false
            }
            this.isSDGItem = false
            this.isAddItem = false
            this.selSDGGidItem = []
            this.editSDGItem = { ele: null, gid: null, item: ''}
        },
        addSDGItem() {
            console.log()
            if (this.editSDGItem.ele == 'SDG') {
                this.selectSDG[0].children.push(
                    { name: this.editSDGItem.ele+' GID='+this.editSDGItem.gid,
                        ele: this.editSDGItem.ele, gid: this.editSDGItem.gid, item: this.editSDGItem.item, id : this.idCrypto++, children: []}
                )
            } else if (this.editSDGItem.ele == 'SD'){
                this.selectSDG[0].children.push(
                    { name: this.editSDGItem.ele+' GID='+this.editSDGItem.gid + ' '+ this.editSDGItem.item,
                        ele: this.editSDGItem.ele, gid: this.editSDGItem.gid, item: this.editSDGItem.item, id : this.idCrypto++, }
                )
            } else if (this.editSDGItem.ele == 'SDX-REF'){
                if (this.selectSDG[0].gid == 'RELATED-PROCESS') {
                    this.editSDGItem.item = 'PROCESS'
                } else if (this.selectSDG[0].gid == 'RELATED-PORT') {
                    this.editSDGItem.item = 'R-PORT-PROTOTYPE'
                } else if (this.selectSDG[0].gid == 'CRYPTO-CERTIFICATE-KEY-SLOT') {
                    this.editSDGItem.item = 'SDG-CAPTION'
                }
                this.selectSDG[0].children.push(
                    { name: this.editSDGItem.ele+' '+ this.editSDGItem.gid,
                        ele: this.editSDGItem.ele, gid: this.editSDGItem.gid, item: this.editSDGItem.item, id : this.idCrypto++, }
                )
            } else if (this.editSDGItem.ele == 'SDG-CAPTION'){
                this.selectSDG[0].children.push(
                    { name: this.editSDGItem.ele+' '+ this.editSDGItem.item,
                        ele: this.editSDGItem.ele, gid: this.editSDGItem.gid, item: this.editSDGItem.item, id : this.idCrypto++, }
                )
            }
            this.initSDGS()
        },
        deleteSDGItem() {
            this.initSDGS()
            this.deleteNodeFromTree(this.element.crypto[this.CryptoTab].sdgs[0], this.selectSDG[0].id)            
            this.selectSDG[0] = []
        },
        deleteNodeFromTree(node, nodeId) {
            if (node.children != null) {
                for (let i = 0; i < node.children.length; i++) {
                    let filtered = node.children.filter(f => f.id == nodeId);
                    if (filtered && filtered.length > 0) {
                        node.children = node.children.filter(f => f.id != nodeId);
                        return;
                    }
                    this.deleteNodeFromTree(node.children[i], nodeId,);
                }
            }
        },
        activeElement(node) {
            this.selectSDG = node
            this.selSDGEleItem = []
            if (this.selectSDG[0] == null || this.selectSDG[0].name == 'SDGS') {
                this.selSDGEleItem = []
            } else if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-PROVIDER' || 
                        this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-CERTIFICATE' || 
                        this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-KEY-SLOT') {
                this.selSDGEleItem = this.selFirstSDG
            } else if (this.selectSDG[0].gid == 'RELATED-PROCESS' || this.selectSDG[0].gid == 'RELATED-PORT' 
                        || this.selectSDG[0].gid == 'CRYPTO-CERTIFICATE-KEY-SLOT') {
                this.selSDGEleItem = this.selRef
            } else if (this.selectSDG[0].gid == 'CRYPTO-KEY-SLOT-CONTENT-ALLOWED-USAGE' ||
                        this.selectSDG[0].gid == 'CRYPTO-KEY-SLOT-ALLOWED-MODIFICATION') {
                this.selSDGEleItem = this.selKeySlotAllowed
            }

            if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-PROVIDER' || 
                this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-CERTIFICATE' ||
                this.selectSDG[0].name == 'SDGS') {
                this.isDeletItem = false
            } else {
                this.isDeletItem = true
            }
            this.isSDGItem = false
        },
        inputSDGEle() {
            this.selSDGGidItem = []
            if (this.editSDGItem.ele != null && this.selectSDG[0].ele == 'SDG') {
                if (this.editSDGItem.ele == 'SD') {
                    if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-PROVIDER' || 
                        this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-CERTIFICATE') {
                            this.selSDGGidItem = this.selFirstSD
                    }  else if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-KEY-SLOT') {
                        this.selSDGGidItem = this.selSDKeySlot
                    } else if (this.selectSDG[0].gid == 'CRYPTO-KEY-SLOT-CONTENT-ALLOWED-USAGE'){
                        this.selSDGGidItem = this.selSDUsage
                    } else if (this.selectSDG[0].gid == 'CRYPTO-KEY-SLOT-ALLOWED-MODIFICATION') {
                        this.selSDGGidItem = this.selSDModification
                    }
                } else if (this.editSDGItem.ele == 'SDG') {
                    if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-PROVIDER') {
                        this.selSDGGidItem = this.selProvider
                    } else if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-CERTIFICATE') {
                        this.selSDGGidItem = this.selCerification
                    } else if (this.selectSDG[0].gid == 'CRYPTO-INSTANTIATION-KEY-SLOT') {
                        this.selSDGGidItem = this.selKeySlot
                    } else if (this.selectSDG[0].gid == 'CRYPTO-CERTIFICATE-KEY-SLOT') {
                        this.selSDGGidItem = this.selSDModification
                    } 
                } else if (this.editSDGItem.ele == 'SDG-CAPTION') {
                    this.isSDGItem = true
                } else if (this.editSDGItem.ele == 'SDX-REF') {
                    if (this.selectSDG[0].gid == 'RELATED-PROCESS') {
                        this.selSDGGidItem = this.$store.getters.getProcessSDG
                    } else if (this.selectSDG[0].gid == 'RELATED-PORT') {
                        this.selSDGGidItem = this.$store.getters.getRPortPrototypeSDG
                    } else if (this.selectSDG[0].gid == 'CRYPTO-CERTIFICATE-KEY-SLOT') {
                        console.log(this.element.crypto[this.CryptoTab].sdgs)
                        this.element.crypto[this.CryptoTab].sdgs.forEach(sdg => {
                            sdg.children.forEach(sdgC => {
                                if (sdgC.gid == 'CRYPTO-INSTANTIATION-PROVIDER') {
                                    sdgC.children.forEach(item => {
                                        if (item.ele == 'SDG' && item.gid == 'CRYPTO-INSTANTIATION-KEY-SLOT') {
                                            item.children.forEach(slot => {
                                                if (slot.ele == 'SDG-CAPTION') {
                                                    this.selSDGGidItem.push(slot.item)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }
                }
            }
        },
        inputSDGGid() {
            if (this.editSDGItem.ele == 'SDG') {
                this.isSDGItem = false
            } else if (this.editSDGItem.gid != null) {
                this.isSDGItem = true
            }

            if (this.editSDGItem.gid != null 
                && (this.editSDGItem.ele == 'SDG'  || this.editSDGItem.ele == 'SDX-REF')) {
                    this.isAddItem = true
            }
        },
        inputSDGItem(str) {
            if (str != '') {
                if (this.editSDGItem.ele == 'SD' ||  this.editSDGItem.ele == 'SDG-CAPTION') {
                    this.isAddItem = true
                }
            } else {
                this.isAddItem = false
            }
        },
        clearSDGEle() {
            this.isSDGItem = false
            this.selSDGGidItem = []
        },
        clearSDGGid() {
            this.isSDGItem = false
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
