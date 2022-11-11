<template>
    <div :id="element.uuid">
        <v-container> 
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on"> <!-- style='height:300px' 이렇게 하면 접었을때 배경이 하얗게 나옴 max-height해야지 접었을때 배경안나옴 -->
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Machine</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text  v-show="iselementOpenClose || isDatailView">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputMachineName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.machinedesign" readonly @click="setMachineDesignSelect()" :style="refMachineD ? 'height: 43px;border:solid red 2px' : ''" 
                                                 clearable @click:clear='clearMachineDesign()' label="Machine Design" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <v-text-field v-model="element.enterTimeout" label="Enter TimeOut Value" @click="clickOtherFields()" placeholder="Numeric Only(Unit Second)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.exitTimeout" label="Exit TimeOut Value" @click="clickOtherFields()" placeholder="Numeric Only(Unit Second)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-select v-model="element.executable" :items="executableLaunch" @click="[clickOtherFields(),setactiveUUID()]" clearable label="Executable Launch Behavior" @click:clear="clickOtherFields()" outlined dense style="height: 45px;"></v-select>
                            <v-text-field v-model="element.admin" label="Admin Data" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-data-table v-model="selectDelectHWElement" :headers="headerHWElement" :items="element.hwelement" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteHWElementItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteHWElementItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refHWElement === item.id ? 'red' : null " @click="rowHWElementClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openHWElement(idx)" @cancel="cancelHWElement" @save="editHWElement(idx)" large >
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelHWElement" @save="addHWElement()"> 
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
                                    <v-data-table v-model="selectDelectFunctionItem" :headers="headerFunctionGroup" :items="element.functiongroup" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteFunctionGroupItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteFunctionGroupItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refModeDeclara === item.id ? 'red' : null " @click="rowModeDeclarationClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openFunctionGroup(idx)" @cancel="cancelFunctionGroup" @save="editFunctionGroup(idx)" large >
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelFunctionGroup" @save="addFunctionGroup()"> 
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
                                    <v-data-table v-model="selectDelectEnvironmentV" :headers="headerEnvironmentV" :items="element.environ" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteEnvironmentV" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteEnvironmentV" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="openEnvironmentV(idx)" @cancel="cancelEnvironmentV" @save="editEnvironmentV(idx)" large >
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
                                                        :show-select="isdeleteCoreItem" item-key="id" height="140px" dense hide-default-footer :items-per-page='$setNumTableList'>
                                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                    </template>
                                                    <template v-if="!isdeleteCoreItem" v-slot:body="{ items, headers }">
                                                        <tbody>
                                                            <tr v-for="(item,num) in items" :key="num">
                                                                <td v-for="(header,key) in headers" :key="key">
                                                                    <v-edit-dialog persistent @open="openCore(num, items)" @cancel="cancelCore" @save="editCore(num, items)" large >
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
                                                                    <v-edit-dialog  large persistent @cancel="cancelCore" @save="addCore(idx)"> 
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
                                                            :show-select="isdeleteResourceGItem" item-key="id" height="140px" dense hide-default-footer :items-per-page='$setNumTableList'>
                                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                                            <v-simple-checkbox color="green" :value="isSelected" @input="select($event)" :ripple="false"></v-simple-checkbox>
                                                        </template>
                                                        <template v-if="!isdeleteResourceGItem" v-slot:body="{ items, headers }">
                                                            <tbody>
                                                                <tr v-for="(item,num) in items" :key="num">
                                                                    <td v-for="(header,key) in headers" :key="key">
                                                                        <v-edit-dialog persistent @open="openResourceG(num, items)" @cancel="cancelResourceG" @save="editResourceG(num, items)" large >
                                                                            {{item[header.value]}}
                                                                            <template v-slot:input>
                                                                                <br>
                                                                                <v-text-field v-model="editModuleInsItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                <v-text-field v-model="editModuleInsItem.cpuUsage" label="CPU Usage" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                <v-text-field v-model="editModuleInsItem.memoryUsage" label="Memory Usage" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                            </template>
                                                                        </v-edit-dialog>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th colspan="3">
                                                                        <v-edit-dialog  large persistent @cancel="cancelResourceG" @save="addResourceG(idx)"> 
                                                                            <v-btn outlined color="indigo" dense text small block width="270px">
                                                                                <v-icon >mdi-plus</v-icon>New Item
                                                                            </v-btn>
                                                                            <template v-slot:input>
                                                                                <br>
                                                                                <v-text-field v-model="editModuleInsItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                <v-text-field v-model="editModuleInsItem.cpuUsage" label="CPU Usage" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                <v-text-field v-model="editModuleInsItem.memoryUsage" label="Memory Usage" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                        <v-data-table v-model="selectDelectUCMModule" :headers="headerUCMModule" :items="element.ucm" :items-per-page='$setNumTableList'
                                                :show-select="isdeleteUCMModule" item-key="id" height="140px" dense hide-default-footer >
                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                            </template>
                                            <template v-if="!isdeleteUCMModule" v-slot:body="{ items, headers }">
                                                <tbody>
                                                    <tr v-for="(item,idx) in items" :key="idx">
                                                        <td v-for="(header,key) in headers" :key="key">
                                                            <v-edit-dialog persistent @open="openUCMModule(idx)" @cancel="cancelUCMModule" @save="editUCMModule(idx)" large >
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
                                                            <v-edit-dialog  large persistent @cancel="cancelUCMModule" @save="addUCMModule()"> 
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
                                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                <v-data-table v-model="selectDelectGrantRef" :headers="headerGrantRef" :items="tab.grants" :items-per-page='$setNumTableList'
                                                                        :show-select="isdeleteGrantRef" item-key="id" height="140px" dense hide-default-footer >
                                                                    <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                        <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                    </template>
                                                                    <template v-if="!isdeleteGrantRef" v-slot:body="{ items, headers }">
                                                                        <tbody>
                                                                            <tr v-for="(item,num) in items" :key="num">
                                                                                <td v-for="(header,key) in headers" :key="key">
                                                                                    <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refGrant === item.id ? 'red' : null " @click="rowGrantClick(idx)">mdi-pencil</v-icon>
                                                                                    <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openGrantRef(num)" @cancel="cancelGrantRef" @save="editGrantRefItem(num)" large >
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
                                                                                    <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelGrantRef" @save="addGrantRef()"> 
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
                                                        <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-card outlined class="mx-auto">
                                                            <div class="subtitle-2" style="height:20px" >
                                                                <v-btn color="indigo" text x-small @click="clickCryptoDialog()">
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
                        <v-card-text v-show="!iselementOpenClose || !minimaptoolbar">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        readonly outlined dense></v-text-field>
                        </v-card-text>
                    </v-card>
                </template>
                <span>{{ element.name }}</span>
            </v-tooltip>
            <v-dialog v-model="dialogText" persistent width="800">
                <v-card >
                    <v-card-title class="text-h6 green accent-1"> Edit Text </v-card-title>
                    <v-card-text>
                        <br>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;ADMIN-DATA&#62;</label>
                            <v-text-field v-model="editARXML.admin" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;ADMIN-DATA&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;DEFAULT-APPLICATION-TIMEOUT&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin-left:10px">&#60;ENTER-TIMEOUT-VALUE&#62;</label>
                            <v-text-field v-model="editARXML.enterTimeout" placeholder="Numeric Only(Unit Second)"  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;EXIT-TIMEOUT-VALUE&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin-left:10px">&#60;EXIT-TIMEOUT-VALUE&#62;</label>
                            <v-text-field v-model="editARXML.exitTimeout" placeholder="Numeric Only(Unit Second)"  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;EXIT-TIMEOUT-VALUE&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;DEFAULT-APPLICATION-TIMEOUT&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;ENVIRONMENT-VARIABLES&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEnviron()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.environ" :key="i" style="height: 100px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextEnviron(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;TAG-WITH-OPTIONAL-VALUE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;KEY&#62;</label>
                                        <v-text-field v-model="item.key" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;KEY&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;VALUE&#62;</label>
                                        <v-text-field v-model="item.value" placeholder="String" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;VALUE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;TAG-WITH-OPTIONAL-VALUE&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;ENVIRONMENT-VARIABLES&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;FUNCTION-GROUPS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextFunG()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.functiongroup" :key="i" style="height: 100px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextFunG(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;MODE-DECLARATION-GROUP-PROTOTYPE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;TYPE-REF&#62;</label>
                                        <v-text-field v-model="item.type" placeholder="Path" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TYPE-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;MODE-DECLARATION-GROUP-PROTOTYPE&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;FUNCTION-GROUPS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;HW-ELEMENT-REFS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextHWElement()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 100px;">
                            <v-row v-for="(item, i) in editARXML.hwelement" :key="i" style="height: 25px;">
                                <div>
                                    <br>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextHWElement(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;HW-ELEMENT-REF&#62;</label>
                                        <v-text-field v-model="item.hwelement" placeholder="Path" style="width:300px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;HW-ELEMENT-REF&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;&#47;HW-ELEMENT-REFS&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;MACHINE-DESIGN-REF&#62;</label>
                            <v-text-field v-model="editARXML.machinedesign" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MACHINE-DESIGN-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;MODULE-INSTANTIATIONS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;margin-left:10px">
                            <label style="padding:10px;">&#60;IAM-MODULE-INSTANTIATION&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextIAM()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 250px;">
                            <v-row v-for="(item, i) in editARXML.iam" :key="i" style="height: 170px;">
                                <div>
                                    <br>
                                    <v-row style="height: 5px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextIAM(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;GRANT-REFS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextGrant(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 100px;">
                                        <v-row v-for="(gra, g) in item.grants" :key="g" style="height: 25px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -70px 0px 70px" @click="deletTextGrant(g,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;GRANT-REF&#62;</label>
                                                    <v-text-field v-model="gra.grant" style="width:400px" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;GRANT-REF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 65px;">&#60;&#47;GRANT-REFS&#62;</label>
                                    </v-row>                                    
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;margin-left:10px">
                            <label style="padding:10px;">&#60;&#47;IAM-MODULE-INSTANTIATION&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;margin-left:10px">
                            <label style="padding:10px;">&#60;OS-MODULE-INSTANTIATION&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextOS()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.moduleinstant" :key="i" style="height: 250px;">
                                <div>
                                    <br>
                                    <v-row style="height: 5px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextOS(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;RESOURCE-GROUPS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextResource(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 180px;">
                                        <v-row v-for="(res, r) in item.resource" :key="r" style="height: 120px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                     <v-btn style="margin: 15px -90px 0px 90px" @click="deletTextResource(r,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;RESOURCE-GROUP&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;SHORT-NAME&#62;</label>
                                                    <v-text-field v-model="res.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;CPU-USAGE&#62;</label>
                                                    <v-text-field v-model="res.cpuUsage" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;CPU-USAGE&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;MEM-USAGE&#62;</label>
                                                    <v-text-field v-model="res.memoryUsage" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;MEM-USAGE&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 125px;">&#60;&#47;RESOURCE-GROUP&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 65px;">&#60;&#47;RESOURCE-GROUPS&#62;</label>
                                    </v-row>                                    
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;margin-left:10px">
                            <label style="padding:10px;">&#60;&#47;OS-MODULE-INSTANTIATION&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;margin-left:10px">
                            <label style="padding:10px;">&#60;UCM-MODULE-INSTANTIATION&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextUCM()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 150px;">
                            <v-row v-for="(item, i) in editARXML.ucm" :key="i" style="height: 50px;">
                                <div>
                                    <br>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextUCM(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 55px;">&#60;IDENTIFIER&#62;</label>
                                        <v-text-field v-model="item.ident" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;IDENTIFIER&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;margin-left:10px">
                            <label style="padding:10px;">&#60;&#47;UCM-MODULE-INSTANTIATION&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;MODULE-INSTANTIATIONS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;PROCESSORS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextProcessor()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.processor" :key="i" style="height: 250px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextProcessor(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;PROCESSOR&#62;</label>
                                    </v-row>
                                    <v-row style="height: 5px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;CORES&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextCore(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(cor,p) in item.core" :key="p" style="height: 100px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -90px 0px 90px" @click="deletTextCore(p,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;PROCESSOR-CORE&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;SHORT-NAME&#62;</label>
                                                    <v-text-field v-model="cor.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;CORE-ID&#62;</label>
                                                    <v-text-field v-model="cor.idCore" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;CORE-ID&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin-left:125px;">&#60;&#47;PROCESSOR-CORE&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;CORES&#62;</label>
                                    </v-row>                                    
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;PROCESSOR&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;PROCESSORS&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <v-text-field v-model="editARXML.executable" style="margin: 0px 0px 0px 30px" placeholder="STRICT-MODE or MONITOR-MODE or NO-TRUSTED-PLATFORM-SUPPORT" class="lable-placeholer-color" dense></v-text-field>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;&#47;TRUSTED-PLATFORM-EXECUTABLE-LAUNCH-BEHAVIOR&#62;</label>
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
            iselementOpenClose: true,
            dialogText: false,
            editARXML: {name:'', machinedesign:null, enterTimeout:'', exitTimeout:'', hwelement:[], executable:null, admin: '',
                    functiongroup:[], environ: [], processor: [], moduleinstant: [], ucm: [], iam: [], crypto: []},
            editTextHWElement: {hwelement: null, id: ''},
            editTextFunG: {name:'', type: null, id:''},
            editTextEnviron: {key: '', value: '',id: ''},
            editTextProcessor: {name: '', core: [], id: ''},
            editTextCore: {name: '', idCore: '', id: ''},
            editTextOS: {name: '',resource: [], id: ''},
            editTextResource: {name: '', cpuUsage: '', memoryUsage: '', id: ''},
            editTextUCM: {name: '', ident: '', id: ''},
            editTextIAM: {name: '', grants: [], id: ''},
            editTextGrant: {grant: null, select: null, id: ''},
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
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'HW Element Ref', align: 'start', sortable: false, value: 'hwelement' },
            ],
            editHWItem: { hwelement : null},

            isFunctionGroupOpenClose: true,
            isdeleteFunctionGroupItem: false,
            selectDelectFunctionItem: [],
            headerFunctionGroup: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Type', sortable: false, value: 'type' },
            ],
            editFunctionItem: { name: '', type: null, id: '' },
            defaultfunctionItem: { name: '', type: null, id: '' },

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
                { text: '', sortable: false, value: 'refView', width: '5px' },
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
            beforeModule: '',

            refMachineD: false,
            refHWElement: null,
            refModeDeclara: null,
            refGrant: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        if (this.element.functiongroup.length > 0 && this.element.path == '') { //file input시 machine만들어질때 여기도 타서 일단 path로 막았음
            this.element.functiongroup.forEach(item => {
                if (item.type != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+item.id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getModeDeclarationPath(item.type, 0)
                    }
                    if (endLine != undefined && this.$store.getters.getconnectLineNum(this.element.uuid + '/functiontable-'+item.id) == -1) {
                        //this.newLine(this.element.uuid+'/functiontable-'+item.id, this.element.uuid+'/functiontable', endLine)
                        this.newLine(this.element.uuid+'/functiontable-'+item.id, this.element.uuid, endLine, false)
                    }
                }
            })
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID) => {
            this.refMachineD = false
            this.refHWElement = null
            this.refModeDeclara = null
            this.refGrant = null

            if (refNum == 1) {
                this.refMachineD = true
            } else if (refNum == 2) {
                this.refHWElement = idxID
            } else if (refNum == 3) {
                this.refModeDeclara = idxID
            } else if (refNum == 4) {
                this.IamModuleTab = tabID
                this.refGrant = idxID
            }
        })
        EventBus.$on('Element-open', (isopen, uuid) => {
            if (this.element.uuid == uuid) {
                console.log(isopen)
                this.iselementOpenClose = isopen
            }
        })
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            if (this.iselementOpenClose) { //SWComponent RClient에서 3개가 같이 뜰수있음 그때 하나만 펼치고 나머지 다 접으려고
                this.$store.commit('setOpenCloseCompuDataStrMachineModeD', {
                                uuid: this.element.uuid, left: this.element.left, top: this.element.top,
                                beforElement: constant.Process_str, closeElement: constant.ModeDeclarationGroup_str})
            }
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
                document.getElementById(this.element.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
            /*this.$nextTick(() => {
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
            })*/
        },
        showHWElement() {
            this.clickOtherFields()
            this.isHWElementOpenClose = this.isHWElementOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showFunctionGroupItem() {
            this.clickOtherFields()
            this.isFunctionGroupOpenClose = this.isFunctionGroupOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showEnvironmentV() {
            this.clickOtherFields()
            this.isEnvironmentVOpenClose = this.isEnvironmentVOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showProcessorItem() {
            this.clickOtherFields()
            this.isProcessorOpenClose = this.isProcessorOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showCore() {
            this.clickOtherFields()
            this.isCoreOpenClose = this.isCoreOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showModuleInsItem() {
            this.clickOtherFields()
            this.isModuleInsOpenClose = this.isModuleInsOpenClose ? false : true
            /*this.$nextTick(() => {
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.element.iam.length > 0) {
                        if (this.isModuleInsOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, this.isIamModuleOpenClose)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
            })*/
        },
        showOSModuleInsItem() {
            this.clickOtherFields()
            this.isOSModuleInsOpenClose = this.isOSModuleInsOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showResourceG() {
            this.clickOtherFields()
            this.isResourceGOpenClose = this.isResourceGOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showUCMModule() {
            this.clickOtherFields()
            this.isUCMModuleOpenClose = this.isUCMModuleOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showIamModule() {
            this.clickOtherFields()
            this.isIamModuleOpenClose = this.isIamModuleOpenClose ? false : true
            /*if (this.element.iam.length > 0) {
                EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, this.isIamModuleOpenClose)
            }*/
        },
        showCrypto() {
            this.clickOtherFields()
            this.isCryptoOpenClose = this.isCryptoOpenClose ? false : true
        },
        showGrantRef() {
            this.clickOtherFields()
            this.isGrantRefOpenClose = this.isGrantRefOpenClose ? false : true 
        },
        inputMachineName() {
            this.$store.commit('editMachine', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refMachineD || this.refHWElement != null || this.refModeDeclara != null || this.refGrant != null) {
                this.deleteOpenElement()
                this.refMachineD = false
                this.refHWElement = null
                this.refModeDeclara = null
                this.refGrant = null
            }
        },
        rowHWElementClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refHWElement != this.element.hwelement[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getHWElementPath(this.element.hwelement[idx].hwelement)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    this.$store.commit('editHWElement', {compo:"drag", uuid: endLine, top: this.element.top + 155, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWElement_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/hwelement', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/hwelement', end:endLine, iscircle:false, refNum:2, idxID: this.element.hwelement[idx].id})
                }
                this.refHWElement = this.element.hwelement[idx].id
            }
        },
        rowModeDeclarationClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refModeDeclara != this.element.functiongroup[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getModeDeclarationPath(this.element.functiongroup[idx].type, 0)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    var isExist = true
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: endLine, top: this.element.top + 350, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        if (!isExist) {
                            EventBus.$emit('Element-open', true, endLine)
                        }
                        EventBus.$emit('new-line', this.element.uuid+'/functiontable', endLine, isExist)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/functiontable', end:endLine, iscircle:isExist, refNum:3, idxID: this.element.functiongroup[idx].id})
                }
                this.refModeDeclara = this.element.functiongroup[idx].id
            }
        },
        rowGrantClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refGrant != this.element.iam[this.IamModuleTab].grants[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine
                if (this.element.iam[this.IamModuleTab].grants[idx].select == "COM-EVENT-GRANT") {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getEventPath(this.element.iam[this.IamModuleTab].grants[idx].grant)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editEventG', {compo:"drag", uuid: endLine, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ComEventGrant_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, end:endLine, iscircle:false, refNum:4, idxID: this.element.iam[this.IamModuleTab].grants[idx].id, tabID: this.IamModuleTab})
                    }
                } else if (this.element.iam[this.IamModuleTab].grants[idx].select == "COM-FIELD-GRANT") {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getFieldPath(this.element.iam[this.IamModuleTab].grants[idx].grant)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editFieldG', {compo:"drag", uuid: endLine, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ComFieldGrant_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, end:endLine, iscircle:false, refNum:4, idxID: this.element.iam[this.IamModuleTab].grants[idx].id, tabID: this.IamModuleTab})
                    }
                } else if (this.element.iam[this.IamModuleTab].grants[idx].select == "COM-METHOD-GRANT") {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getMethodPath(this.element.iam[this.IamModuleTab].grants[idx].grant)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editMethodG', {compo:"drag", uuid: endLine, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ComMethodGrant_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, end:endLine, iscircle:false, refNum:4, idxID: this.element.iam[this.IamModuleTab].grants[idx].id})
                    }
                }
                this.refGrant = this.element.iam[this.IamModuleTab].grants[idx].id
            }
        },

        clickProcessorName(name) {
            this.beforeProcess = name
            this.clickOtherFields()
        },
        clickModuleInsName(name) {
            this.clickOtherFields()
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
            this.clickOtherFields()
            if (this.element.machinedesign != null) {this.refMachineD = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachineDesignPath(this.element.machinedesign, 0)
                }
                if (endLine != null) {
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/machinedesign', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/machinedesign', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.MachineDesigne_str} )
                    /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)*/
                }
            }
        },
        setMachineDesignList() {
            this.selMachineDesign = this.$store.getters.getMachineDesign
            this.setactiveUUID()
        },
        setMachineDesign(item) {
            this.clickOtherFields()
            if( this.element.machinedesign != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/machinedesign')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refMachineD = true
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/machinedesign', this.element.uuid+'/machinedesign', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/machinedesign', end:item.uuid, iscircle:false, refNum:1})
                }
                this.element.machinedesign = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refMachineD = true
                    this.$store.commit('editMachineDesign', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.MachineDesigne_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/machinedesign', this.element.uuid+'/machinedesign', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/machinedesign', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        clearMachineDesign() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
            if (endLine != undefined) {
                this.element.machinedesign = null
                this.deleteLine(this.element.uuid+'/machinedesign')
            }
            this.clickOtherFields()
        },

        setModeDeclarationSelect() {
            if (this.isEditingModeDeclarationRef == true) {
                if (this.editFunctionItem.type != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionItem.type.uuid, element: constant.ModeDeclarationGroup_str} )
                    /*document.getElementById(this.editFunctionItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editFunctionItem.type.uuid)*/
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
            var nameMachineD
            if (this.element.name.includes('Machine')) {
                nameMachineD = this.element.name.replace(/Machine/gi, 'MachineDesign')
            } else {
                nameMachineD = this.element.name +'_MachineDesign'
            }
            this.$store.commit('addElementMachineDesign', {
                name: nameMachineD, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                access:null, resettimer: '', connector:[], servicediscover:[], 
            })
            EventBus.$emit('add-element', constant.MachineDesigne_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newHWElement() {
            //HW Element
            this.$store.commit('addElementHWElement', { //category 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameHWElement, path: '', input: false,
                top: this.element.top + 155, left: this.element.left + this.$setPositionLeft, zindex: 10, category:null, attribute:[], icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.HWElement_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newModeDeclaration() {
            //Mode Declaration
            this.$store.commit('addElementModeDeclarationGroup', {
                name: this.$store.getters.getNameModeDeclarationGroup, path: '', input: false,
                top: this.element.top+350, left: this.element.left + this.$setPositionLeft, zindex: 10, modedeclaration:[{name: 'Off', value: ''},{name: 'Startup', Value: ''}], initmode:'Off', icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )

        },

        isCheckHWElement() {
            this.clickOtherFields()
            if (this.isdeleteHWElementItem == true) {
                this.isdeleteHWElementItem = false
                this.selectDelectHWElement = []
            } else {
                this.isdeleteHWElementItem = true
            }
        },
        deletHWElement() {
            this.clickOtherFields()
            if (this.isdeleteHWElementItem == true) {
                this.selectDelectHWElement.forEach(item => {
                    for(let i=0; i<this.element.hwelement.length; i++){
                        if (item.id == this.element.hwelement[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+this.element.hwelement[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/hwelement-'+this.element.hwelement[i].id)
                            }
                        }
                    }
                })

                this.element.hwelement = this.element.hwelement.filter(item => {
                        return this.selectDelectHWElement.indexOf(item) < 0 })

                this.isdeleteHWElementItem = false
                this.selectDelectHWElement = []
            } 
        },
        openHWElement(idx) {
            this.selHWElement = this.$store.getters.getHWElement
            if ( this.element.hwelement[idx].hwelement != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getHWElementPath(this.element.hwelement[idx].hwelement)
                }
                this.editHWItem.hwelement = { name: this.element.hwelement[idx].hwelement, uuid: endLine }
            }
        },
        editHWElement(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id)
            if (endLine != undefined && this.editHWItem.hwelement == null) {
                this.deleteLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id)
                this.element.hwelement[idx].hwelement = null
            } else if (endLine != undefined && endLine != this.editHWItem.hwelement.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id)
                this.newLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id, this.element.uuid+'/hwelement', this.editHWItem.hwelement.uuid, false)
                this.element.hwelement[idx].hwelement = this.editHWItem.hwelement.name
            } else if (endLine == undefined && this.editHWItem.hwelement != null && this.editHWItem.hwelement.uuid != null) {
                this.newLine(this.element.uuid+'/hwelement-'+this.element.hwelement[idx].id, this.element.uuid+'/hwelement', this.editHWItem.hwelement.uuid, false)
                this.element.hwelement[idx].hwelement = this.editHWItem.hwelement.name
            }

            if (this.refHWElement == this.element.hwelement[idx].id) {
                this.deleteOpenElement()
                if (this.editHWItem.hwelement != null && this.editHWItem.hwelement.uuid != null) {
                    var endLineChange = this.editHWItem.hwelement.uuid
                    this.$store.commit('editHWElement', {compo:"drag", uuid: this.editHWItem.hwelement.uuid, top: this.element.top + 155, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.HWElement_str, uuid: this.editHWItem.hwelement.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/hwelement', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/hwelement', end:endLineChange, iscircle:false, refNum:2, idxID: this.refHWElement})
                }
            }
            
            this.cancelHWElement()
        },
        cancelHWElement() {
            this.editHWItem.hwelement = null
            this.setactiveUUID()
        },
        addHWElement() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.hwelement.some(item => item.id === n)
            }
            this.editHWItem.id = n
            var endLine = null
            if( this.editHWItem.hwelement != null) {
                endLine = this.editHWItem.hwelement.uuid
                this.$store.commit('editHWElement', {compo:"drag", uuid: this.editHWItem.hwelement.uuid, top: this.element.top + 155, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.HWElement_str, uuid: this.editHWItem.hwelement.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editHWItem.hwelement = this.editHWItem.hwelement.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/hwelement-'+this.editHWItem.id, this.element.uuid+'/hwelement', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/hwelement', end:endLine, iscircle:false, refNum:2, idxID: this.editHWItem.id})
            }
            const addObj = Object.assign({}, this.editHWItem)
            this.element.hwelement.push(addObj);
            this.refHWElement = n
            this.cancelHWElement()
        },
        setHWElementSelect() {
            if (this.isEditingHWElement == true) {
                if (this.editHWItem.hwelement !=null) {
                    this.$store.commit('setDetailView', {uuid: this.editHWItem.hwelement.uuid, element: constant.HWElement_str} )
                    /*document.getElementById(this.editHWItem.hwelement.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editHWItem.hwelement.uuid)*/
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
            this.clickOtherFields()
            if (this.isdeleteFunctionGroupItem == true) {
                this.isdeleteFunctionGroupItem = false
                this.selectDelectFunctionItem = []
            } else {
                this.isdeleteFunctionGroupItem = true
            }
        },
        deleteFunctionGroup() {
            this.clickOtherFields()
            if (this.isdeleteFunctionGroupItem == true) {
                this.selectDelectFunctionItem.forEach(item => {
                    for(let i=0; i<this.element.functiongroup.length; i++){
                        if (item.id == this.element.functiongroup[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[i].id)
                            }
                        }
                    }
                })

                this.$store.commit('deleteRefTable', {deleteName:'functionG', deletItemList: this.selectDelectFunctionItem, path: this.element.path, name: this.element.name})
                this.element.functiongroup = this.element.functiongroup.filter(item => {
                        return this.selectDelectFunctionItem.indexOf(item) < 0 })

                this.isdeleteFunctionGroupItem = false
                this.selectDelectFunctionItem = []
            } 
        },
        openFunctionGroup(idx) {
            this.selModeDeclaration = this.$store.getters.getModeDeclarationG
            this.editFunctionItem.name = this.element.functiongroup[idx].name
            if ( this.element.functiongroup[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getModeDeclarationPath(this.element.functiongroup[idx].type, 0)
                }
                this.editFunctionItem.type = { name: this.element.functiongroup[idx].type, uuid: endLine }
            }
        },
        editFunctionGroup(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id)
            if (endLine != undefined && this.editFunctionItem.type == null) {
                this.deleteLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id)
                this.element.functiongroup[idx].type = null
            } else if (endLine != undefined && endLine != this.editFunctionItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id)
                this.newLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid, false)
                this.element.functiongroup[idx].type = this.editFunctionItem.type.name
            } else if (endLine == undefined && this.editFunctionItem.type != null && this.editFunctionItem.type.uuid != null) {
                this.newLine(this.element.uuid+'/functiontable-'+this.element.functiongroup[idx].id, this.element.uuid+'/functiontable', this.editFunctionItem.type.uuid, false)
                this.element.functiongroup[idx].type = this.editFunctionItem.type.name
            }

            if (this.element.functiongroup[idx].name != this.editFunctionItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'functionG', listname: this.editFunctionItem.name, beforename: this.element.functiongroup[idx].name} )
            }

            if (this.refModeDeclara == this.element.functiongroup[idx].id) {
                this.deleteOpenElement()
                if (this.editFunctionItem.type != null && this.editFunctionItem.type.uuid != null) {
                    var isExist = true, endLineChange = this.editFunctionItem.type.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editFunctionItem.type.uuid) == -1) {
                        this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: this.editFunctionItem.type.uuid, top: this.element.top + 350, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: this.editFunctionItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        if (!isExist) {
                            EventBus.$emit('Element-open', true, endLineChange)
                        }
                        EventBus.$emit('new-line', this.element.uuid+'/functiontable', endLineChange, isExist)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/functiontable', end:endLineChange, iscircle:isExist, refNum:3, idxID: this.refModeDeclara})
                }
            }
            this.element.functiongroup[idx].name = this.editFunctionItem.name
            
            this.cancelFunctionGroup()
        },
        cancelFunctionGroup() {
            this.editFunctionItem = Object.assign({}, this.defaultfunctionItem)
            this.setactiveUUID()
        },
        addFunctionGroup() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.functiongroup.some(item => item.id === n)
            }
            this.editFunctionItem.id = n
            var endLine = null
            if( this.editFunctionItem.type != null) {
                var isExist = true
                endLine = this.editFunctionItem.type.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editFunctionItem.type.uuid) == -1) {
                    this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: this.editFunctionItem.type.uuid, top: this.element.top + 350, left: this.element.left + this.$setPositionLeft} )
                    isExist = false
                }
                this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: this.editFunctionItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editFunctionItem.type = this.editFunctionItem.type.name
                this.$nextTick(() => { 
                    if (!isExist) {
                        EventBus.$emit('Element-open', true, endLine)
                    }
                    this.newLine(this.element.uuid+'/functiontable-'+n, this.element.uuid+'/functiontable', endLine, true, isExist)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/functiontable', end:endLine, iscircle:false, refNum:3, idxID: this.editFunctionItem.id})
            }

            const addObj = Object.assign({}, this.editFunctionItem)
            this.element.functiongroup.push(addObj);
            this.refModeDeclara = n
            this.cancelFunctionGroup()
        },

        isCheckEnvironmentV() {
            this.clickOtherFields()
            if (this.isdeleteEnvironmentV == true) {
                this.isdeleteEnvironmentV = false
                this.selectDelectEnvironmentV = []
            } else {
                this.isdeleteEnvironmentV = true
            }
        },
        deleteEnvironmentV() {
            this.clickOtherFields()
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
            this.clickOtherFields()
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
            this.clickOtherFields()
            this.$store.commit('deleteRefTable', {deleteName:'Processor', deleteTab: true, tabName: this.element.processor[idx].name, path: this.element.path, name: this.element.name})

            this.element.processor.splice(idx, 1)
            this.clickProcessortab()
        },
        addProcessor() {
            this.clickOtherFields()
            const editItem = {name: '', core: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Processor__' + n++;
                res = this.element.processor.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.processor.push(addObj)
            this.processortab = this.element.processor.length-1
            this.isdeleteCoreItem = false
            this.selectDelectCoreItem = []
        },
        isCheckCore() {
            this.clickOtherFields()
            if (this.isdeleteCoreItem == true) {
                this.isdeleteCoreItem = false
                this.selectDelectCoreItem = []
            } else {
                this.isdeleteCoreItem = true
            }
        },
        deleteCore() {
            this.clickOtherFields()
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
            this.clickOtherFields()
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
            this.clickOtherFields()
            const editItem = {name: '', resource: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Module Instance_' + n++;
                res = this.element.moduleinstant.some(ele => ele.name === addObj.name)
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
            this.clickOtherFields()
            this.$store.commit('deleteRefTable', {deleteName:'ModuleIns', deleteTab: true, tabName: this.element.moduleinstant[idx].name, path: this.element.path, name: this.element.name})
            this.element.moduleinstant.splice(idx, 1)
        },
        isCheckResourceG() {
            this.clickOtherFields()
            if (this.isdeleteResourceGItem == true) {
                this.isdeleteResourceGItem = false
                this.selectDelectModuleInsItem = []
            } else {
                this.isdeleteResourceGItem = true
            }
        },
        deleteResourceG() {
            this.clickOtherFields()
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
            this.clickOtherFields()
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
            this.clickOtherFields()
            if (this.isdeleteUCMModule == true) {
                this.isdeleteUCMModule = false
                this.selectDelectUCMModule = []
            } else {
                this.isdeleteUCMModule = true
            }
        },
        deleteUCMModule() {
            this.clickOtherFields()
            if (this.isdeleteUCMModule == true) {
                this.$store.commit('deleteRefTable', {deleteName:'ucm', deletItemList: this.selectDelectUCMModule, path: this.element.path, name: this.element.name})
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
            this.clickOtherFields()
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
            this.clickOtherFields()
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
            if (this.refGrant != null) {
                this.deleteOpenElement()
                this.refGrant = null
            }
            /*if(this.element.iam.length > 0 && this.location == 1 && this.IamModuleTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'module', this.element.uuid, this.IamModuleTab, this.element.iam[this.IamModuleTab].id, true)}, 300);
            }*/
        },
        deleteIamModule(idx) {
            this.clickOtherFields()
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
            this.clickOtherFields()
            if (this.isdeleteGrantRef == true) {
                this.isdeleteGrantRef = false
                this.selectDelectGrantRef = []
            } else {
                this.isdeleteGrantRef = true
            }
        },
        deleteGrantRef() {
            this.clickOtherFields()
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
                        endLine = this.$store.getters.getEventPath(this.element.iam[this.IamModuleTab].grants[idx].grant)
                    }
                    this.editGrant.grant = { name: this.element.iam[this.IamModuleTab].grants[idx].grant, uuid: endLine}
                }
            } else if (this.editGrant.select == "COM-FIELD-GRANT") {
                this.selGrant = this.$store.getters.getFieldGrant

                if (this.element.iam[this.IamModuleTab].grants[idx].grant != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getFieldPath(this.element.iam[this.IamModuleTab].grants[idx].grant)
                    }
                    this.editGrant.grant = { name: this.element.iam[this.IamModuleTab].grants[idx].grant, uuid: endLine}
                }
            } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                this.selGrant = this.$store.getters.getMethodGrant

                if (this.element.iam[this.IamModuleTab].grants[idx].grant != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getMethodPath(this.element.iam[this.IamModuleTab].grants[idx].grant)
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
                this.newLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id, this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, this.editGrant.grant.uuid, false)
                this.element.iam[this.IamModuleTab].grants[idx].grant = this.editGrant.grant.name
            } else if (endLine == undefined && this.editGrant.grant != null && this.editGrant.grant.uuid != null) {
                this.newLine(this.element.uuid+'/iamM-'+this.element.iam[this.IamModuleTab].grants[idx].id+'-'+this.element.iam[this.IamModuleTab].id, this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, this.editGrant.grant.uuid, false)
                this.element.iam[this.IamModuleTab].grants[idx].grant = this.editGrant.grant.name
            }

            if (this.refGrant == this.element.iam[this.IamModuleTab].grants[idx].id) {
                this.deleteOpenElement()
                if (this.editGrant.grant != null && this.editGrant.grant.uuid != null) {
                    var endLineChange = this.editGrant.grant.uuid
                    if (this.element.iam[this.IamModuleTab].grants[idx].select == "COM-EVENT-GRANT") {
                        this.$store.commit('editEventG', {compo:"drag", uuid: this.editGrant.grant.uuid, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ComEventGrant_str, uuid: this.editGrant.grant.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.iam[this.IamModuleTab].grants[idx].select == "COM-FIELD-GRANT") {
                        this.$store.commit('editFieldG', {compo:"drag", uuid: this.editGrant.grant.uuid, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ComFieldGrant_str, uuid: this.editGrant.grant.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.iam[this.IamModuleTab].grants[idx].select == "COM-METHOD-GRANT") {
                        this.$store.commit('editMethodG', {compo:"drag", uuid: this.editGrant.grant.uuid, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ComMethodGrant_str, uuid: this.editGrant.grant.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, end:endLineChange, iscircle:false, refNum:4, idxID: this.refGrant, tabID: this.IamModuleTab})
                }
            }

            this.element.iam[this.IamModuleTab].grants[idx].select = this.editGrant.select
            this.cancelGrantRef()
        },
        cancelGrantRef() {
            this.editGrant = {grant: null, select: null}
            this.setactiveUUID()
        },
        addGrantRef() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.iam[this.IamModuleTab].grants.some(item => item.id === n)
            }
            this.editGrant.id = n
            var endLine
            if( this.editGrant.grant != null) {
                endLine = this.editGrant.grant.uuid
                if (this.editGrant.select == "COM-EVENT-GRANT") {
                    this.$store.commit('editEventG', {compo:"drag", uuid: this.editGrant.grant.uuid, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ComEventGrant_str, uuid: this.editGrant.grant.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                } else if (this.editGrant.select == "COM-FIELD-GRANT") {
                    this.$store.commit('editFieldG', {compo:"drag", uuid: this.editGrant.grant.uuid, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ComFieldGrant_str, uuid: this.editGrant.grant.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                    this.$store.commit('editMethodG', {compo:"drag", uuid: this.editGrant.grant.uuid, top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ComMethodGrant_str, uuid: this.editGrant.grant.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                }
                this.editGrant.grant = this.editGrant.grant.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/iamM-'+n+'-'+this.element.iam[this.IamModuleTab].id, this.element.uuid+'/grandtab-'+this.element.iam[this.IamModuleTab].id, endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/iamM', end:endLine, iscircle:false, refNum:4, idxID: this.editGrant.id, tabID: this.IamModuleTab})
            }

            const addObj = Object.assign({}, this.editGrant)
            this.element.iam[this.IamModuleTab].grants.push(addObj);
            this.refGrant = n
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
                    /*document.getElementById(this.editGrant.grant.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editGrant.grant.uuid)*/
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
            if (this.editGrant.select == "COM-EVENT-GRANT") {
                this.$store.commit('addElementEventG', {
                    name: this.$store.getters.getNameEventG, path: '', input: false,
                    top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    eventD: null, provide: null,
                })
                EventBus.$emit('add-element', constant.ComEventGrant_str)
            } else if (this.editGrant.select == "COM-FIELD-GRANT") {
                this.$store.commit('addElementFieldG', {
                    name: this.$store.getters.getNameFieldG, path: '', input: false,
                    top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    fieldD: null, provide: null, role: null
                })
                EventBus.$emit('add-element', constant.ComFieldGrant_str)
            } else if (this.editGrant.select == "COM-METHOD-GRANT") {
                this.$store.commit('addElementMethodG', {
                    name: this.$store.getters.getNameMethodG, path: '', input: false,
                    top: this.element.top + 1255, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    methodD: null, provide: null,
                })
                EventBus.$emit('add-element', constant.ComMethodGrant_str)
            }
            EventBus.$emit('add-element', constant.IAM_str)
            EventBus.$emit('add-element', constant.Platform_str)
            this.$store.commit('editMachine', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addCrypto() {
            this.clickOtherFields()
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
            this.clickOtherFields()
            this.element.crypto.splice(idx, 1)
        },
        clickCryptoDialog() {
            this.dialogEditSDG=true
            this.clickOtherFields()
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
                this.$store.commit('deletConnectionline', {startnum: linenum} )
                this.deleteOpenElement()
            }
        },
        deleteOpenElement() {
            console.log('deleteOpenElement()')
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
            this.editARXML.machinedesign = this.element.machinedesign
            this.editARXML.enterTimeout = this.element.enterTimeout
            this.editARXML.exitTimeout = this.element.exitTimeout
            this.editARXML.executable = this.element.executable
            this.editARXML.admin = this.element.admin
            this.editARXML.hwelement = JSON.parse(JSON.stringify(this.element.hwelement))
            this.editARXML.functiongroup = JSON.parse(JSON.stringify(this.element.functiongroup))
            this.editARXML.environ = JSON.parse(JSON.stringify(this.element.environ))
            this.editARXML.processor = JSON.parse(JSON.stringify(this.element.processor))
            this.editARXML.moduleinstant = JSON.parse(JSON.stringify(this.element.moduleinstant))
            this.editARXML.ucm = JSON.parse(JSON.stringify(this.element.ucm))
            this.editARXML.iam = JSON.parse(JSON.stringify(this.element.iam))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editMachine', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name, 
                                                        changeName: 'Name', pathLength:this.element.path.split('/').length, beforename: this.element.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.enterTimeout = this.editARXML.enterTimeout
            this.element.exitTimeout = this.editARXML.exitTimeout
            this.element.admin = this.editARXML.admin
            if (this.editARXML.executable != null) {
                this.editARXML.executable = this.editARXML.executable.toUpperCase()
                if(!(this.editARXML.executable == 'STRICT-MODE' || this.editARXML.executable == 'MONITOR-MODE' ||
                     this.editARXML.executable == 'NO-TRUSTED-PLATFORM-SUPPORT')) {
                    this.editARXML.executable = null
                }
            }
            this.element.executable = this.editARXML.executable

            this.editTableList()
            var endLine = null, changEndLine = null

            if (this.editARXML.machinedesign != this.element.machinedesign) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/machinedesign')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/machinedesign')
                }
                changEndLine = this.$store.getters.getMachineDesignPath(this.editARXML.machinedesign, 0)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/machinedesign', this.element.uuid+'/machinedesign', changEndLine, false)
                }
            }
            this.element.machinedesign = this.editARXML.machinedesign

            if (this.editARXML.hwelement.length > 0) {
                this.editARXML.hwelement.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.hwelement.length; n++){
                        if (this.element.hwelement[n].id == item.id &&
                            this.element.hwelement[n].hwelement == item.hwelement ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/hwelement-'+item.id)
                        }
                        changEndLine = this.$store.getters.getHWElementPath(item.hwelement)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/hwelement-'+item.id, this.element.uuid+'/hwelement', changEndLine, false)
                        }
                    }
                })
                this.element.hwelement.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.hwelement.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/hwelement-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.hwelement.length > 0) {
                    this.element.hwelement.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/hwelement-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/hwelement-'+item.id)
                        }
                    })
                }
            }
            this.element.hwelement = JSON.parse(JSON.stringify(this.editARXML.hwelement))

            if (this.editARXML.functiongroup.length > 0) {
                this.editARXML.functiongroup.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.functiongroup.length; n++){
                        if (this.element.functiongroup[n].id == item.id &&
                            this.element.functiongroup[n].type == item.type ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/functiontable-'+item.id)
                        }
                        changEndLine = this.$store.getters.getModeDeclarationPath(item.type, 0)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/functiontable-'+item.id, this.element.uuid+'/functiontable', changEndLine, false)
                        }
                    }
                })
                this.element.functiongroup.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.functiongroup.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/functiontable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.functiongroup.length > 0) {
                    this.element.functiongroup.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/functiontable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/functiontable-'+item.id)
                        }
                    })
                }
            }
            this.element.functiongroup = JSON.parse(JSON.stringify(this.editARXML.functiongroup))

            if (this.editARXML.iam.length > 0) {
                this.editARXML.iam.forEach(item => {
                    item.grants.forEach(data => {
                        var isHaveTable = false
                        this.element.iam.forEach(iam => {
                            iam.grants.forEach(gra => {
                                if (gra.id == data.id && gra.grant == data.grant) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getEventPath(data.grant)
                            if (changEndLine != null) {
                                data.select = "COM-EVENT-GRANT"
                                this.newLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id, this.element.uuid+'/iamM', changEndLine, false)
                            } else {
                                changEndLine = this.$store.getters.getFieldPath(data.grant)
                                if (changEndLine != null) {
                                    data.select = "COM-FIELD-GRANT"
                                    this.newLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id, this.element.uuid+'/iamM', changEndLine, false)
                                } else {
                                    changEndLine = this.$store.getters.getMethodPath(data.grant)
                                    if (changEndLine != null) {
                                        data.select = "COM-METHOD-GRANT"
                                        this.newLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id, this.element.uuid+'/iamM', changEndLine, false)
                                    }
                                }
                            }
                        }
                    })
                })
                this.element.iam.forEach(item => {
                    item.grants.forEach(data => {
                        var isHaveTable = false
                        this.editARXML.iam.forEach(edit => {
                            edit.grants.forEach(editG => {
                                if (editG.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id)
                            }
                        }
                    })
                })
            } else {
                if (this.element.iam.length > 0) {
                    this.element.iam.forEach(item => {
                        item.grants.forEach(data => {
                            if (data.grant != null) {
                                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/iamM-'+data.id+'-'+item.id)
                                }
                            }
                        })
                    })
                }
            }
            this.element.iam = JSON.parse(JSON.stringify(this.editARXML.iam))
            this.element.ucm = JSON.parse(JSON.stringify(this.editARXML.ucm))
            this.element.environ = JSON.parse(JSON.stringify(this.editARXML.environ))
            this.element.processor = JSON.parse(JSON.stringify(this.editARXML.processor))
            this.element.moduleinstant = JSON.parse(JSON.stringify(this.editARXML.moduleinstant))
            this.cancelARXML()
        },
        editTableList() {
            var deleteItem = []
            if (this.editARXML.functiongroup.length > 0) {
                deleteItem = []
                this.element.functiongroup.forEach(item => {
                    var isExistence = false
                    this.editARXML.functiongroup.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'functionG', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'functionG', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.functiongroup.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'functionG', deletItemList: this.element.functiongroup, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.ucm.length > 0) {
                deleteItem = []
                this.element.ucm.forEach(item => {
                    var isExistence = false
                    this.editARXML.ucm.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'ucm', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'ucm', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.ucm.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'ucm', deletItemList: this.element.ucm, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.moduleinstant.length > 0) {
                this.element.moduleinstant.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.moduleinstant.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'ModuleIns', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'ModuleIns', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})

                    }
                })
            } else {
                if (this.element.moduleinstant.length > 0) {
                    this.element.moduleinstant.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'ModuleIns', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})

                    })
                }
            }

            if (this.editARXML.processor.length > 0) {
                this.element.processor.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.processor.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'Processor', listname: data.name, beforename: item.name} )
                            }
                            var isHaveTableC = false
                            deleteItem = []
                            item.core.forEach(cor => {
                                data.core.forEach(editC => {
                                    if (cor.id == editC.id ) {
                                        isHaveTableC = true
                                        if (cor.name != editC.name) {
                                            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'proCore', listname: editC.name, tabname: data.name, beforename: cor.name} )
                                        }
                                    }
                                })
                            })
                            if (!isHaveTableC) {
                                deleteItem.push(item.cor)
                            }
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'Processor', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                        deleteItem = []
                    }
                    if (deleteItem.length > 0)
                    {
                        this.$store.commit('deleteRefTable', {deleteName:'proCore', deletItemList: deleteItem, path: this.element.path, name: this.element.name, tabname: item.name})
                    }
                })
            } else {
                if (this.element.processor.length > 0) {
                    this.element.processor.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'Processor', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    })
                }
            }
        },
        cancelARXML() {
            this.editARXML = {name:'', machinedesign:null, enterTimeout:'', exitTimeout:'', hwelement:[], executable:null, admin: '',
                    functiongroup:[], environ: [], processor: [], moduleinstant: [], ucm: [], iam: [], crypto: []}
            this.editTextHWElement = {hwelement: null, id: ''}
            this.editTextFunG = {name:'', type: null, id:''}
            this.editTextEnviron = {key: '', value: '',id: ''}
            this.editTextProcessor = {name: '', core: [], id: ''}
            this.editTextCore = {name: '', idCore: '', id: ''}
            this.editTextOS = {name: '',resource: [], id: ''}
            this.editTextResource = {name: '', cpuUsage: '', memoryUsage: '', id: ''}
            this.editTextUCM = {name: '', ident: '', id: ''}
            this.editTextIAM = {name: '', grants: [], id: ''}
            this.editTextGrant = {grant: null, select: null, id: ''}
            this.dialogText = false
        },
        newTextHWElement() {
            this.editTextHWElement = {hwelement: null, id: ''}
            let res = true, n = 0
            while (res) {
                 n++;
                res = this.editARXML.hwelement.some(item => item.id === n)
            }
            this.editTextHWElement.id = n

            const addObj = Object.assign({}, this.editTextHWElement)
            this.editARXML.hwelement.push(addObj);
        },
        deletTextHWElement(idx) {
            this.editARXML.hwelement.splice(idx,1)
        },
        newTextFunG() {
            this.editTextFunG = {name: '', type: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.functiongroup.some(item => item.id === n)
            }
            this.editTextFunG.id = n

            const addObj = Object.assign({}, this.editTextFunG)
            this.editARXML.functiongroup.push(addObj);
        },
        deletTextFunG(idx) {
            this.editARXML.functiongroup.splice(idx,1)
        },
        newTextEnviron() {
            this.editTextEnviron = {key: '', value: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.environ.some(item => item.id === n)
            }
            this.editTextEnviron.id = n

            const addObj = Object.assign({}, this.editTextEnviron)
            this.editARXML.environ.push(addObj);
        },
        deletTextEnviron(idx) {
            this.editARXML.environ.splice(idx,1)
        },
        newTextProcessor() {
            this.editTextProcessor = {name: '', core: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextProcessor.name = 'Processor_' + n++
                res = this.editARXML.processor.some(item => item.id === n)
            }
            this.editTextProcessor.id = n

            const addObj = Object.assign({}, this.editTextProcessor)
            this.editARXML.processor.push(addObj);
        },
        deletTextProcessor(idx) {
            this.editARXML.processor.splice(idx,1)
        },
        newTextCore(idxP) {
            this.editTextCore = {name: '', idCore: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.processor[idxP].core.some(item => item.id === n)
            }
            this.editTextCore.id = n

            const addObj = Object.assign({}, this.editTextCore)
            this.editARXML.processor[idxP].core.push(addObj);
        },
        deletTextCore(idx, idxP) {
            this.editARXML.processor[idxP].core.splice(idx,1)
        },
        newTextOS() {
            this.editTextOS = {name: '', resource: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextOS.name = 'Module Instance_' + n++
                res = this.editARXML.moduleinstant.some(item => item.id === n)
            }
            this.editTextOS.id = n

            const addObj = Object.assign({}, this.editTextOS)
            this.editARXML.moduleinstant.push(addObj);
        },
        deletTextOS(idx) {
            this.editARXML.moduleinstant.splice(idx,1)
        },
        newTextResource(idxM) {
            this.editTextResource = {name: '', cpuUsage: '', memoryUsage: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.moduleinstant[idxM].resource.some(item => item.id === n)
            }
            this.editTextResource.id = n

            const addObj = Object.assign({}, this.editTextResource)
            this.editARXML.moduleinstant[idxM].resource.push(addObj);
        },
        deletTextResource(idx, idxM) {
            this.editARXML.moduleinstant[idxM].resource.splice(idx,1)
        },
        newTextUCM() {
            this.editTextUCM = {name: '', ident: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.ucm.some(item => item.id === n)
            }
            this.editTextUCM.id = n

            const addObj = Object.assign({}, this.editTextUCM)
            this.editARXML.ucm.push(addObj);
        },
        deletTextUCM(idx) {
            this.editARXML.ucm.splice(idx,1)
        },
        newTextIAM() {
            this.editTextIAM = {name: '', grants: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextIAM.name = 'IAM_Instantiation_' + n++
                res = this.editARXML.iam.some(item => item.id === n)
            }
            this.editTextIAM.id = n

            const addObj = Object.assign({}, this.editTextIAM)
            this.editARXML.iam.push(addObj);
        },
        deletTextIAM(idx) {
            this.editARXML.iam.splice(idx,1)
        },
        newTextGrant(idxI) {
            this.editTextGrant = {grant: null, select: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.iam[idxI].grants.some(item => item.id === n)
            }
            this.editTextGrant.id = n

            const addObj = Object.assign({}, this.editTextGrant)
            this.editARXML.iam[idxI].grants.push(addObj);
        },
        deletTextGrant(idx, idxI) {
            this.editARXML.iam[idxI].grants.splice(idx,1)
        },

    },
}
</script>
