<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Process</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputProcessName' outlined dense  @click="clickOtherFields()"></v-text-field>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.prodesign" readonly @click="setProcessDesignSelect()" :style="refDesign ? 'height: 43px;border:solid red 2px' : ''" 
                                                 clearable @click:clear='clearProcessDesign()' label="Design Reference" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-text-field v-model="element.determin" readonly @click="setDeterminSelect()" :style="refDeterministric ? 'height: 43px;border:solid red 2px' : ''" 
                                                 clearable @click:clear='clearDetermin()' label="Deterministric Client Reference" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-text-field v-model="element.execut" readonly @click="setExecutableSelect()" :style="refExecutable ? 'height: 43px;border:solid red 2px' : ''" 
                                                 clearable @click:clear='clearExecutable()' label="Executable Reference" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <v-select v-model="element.logLevel" :items="logLevel" label="Log Trace Default log Level" @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" clearable outlined dense return-object style="height: 45px;" class="lable-placeholer-color"></v-select>
                            <v-text-field v-model="element.logPath" label="Log Trace File Path" @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-select v-model="element.logMode" :items="logMode" label="Log Trace log Mode" chips @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" style="height: 70px;" outlined multiple class="lable-placeholer-color"></v-select>
                            <v-text-field v-model="element.logProDesc" label="Log Trace Process Desc" @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-text-field v-model="element.logProID" label="Log Trace Process ID" @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-text-field v-model="element.restart" label="Number Of Restart Attempts" @click="clickOtherFields()" placeholder="Int" style="height: 25px;" class="lable-placeholer-color" outlined dense></v-text-field>
                            <v-checkbox v-model="element.preMapping" label="Pre Mapping" value="element.preMapping" :indeterminate="element.preMapping==null? true:false" true-value="true" false-value="false" style="height: 35px;"></v-checkbox>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showStateMachine" x-small color="indigo">
                                            <v-icon>{{ isStateMachineOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Process State Machine
                                </div>
                                <v-card-text v-show="isStateMachineOpenClose">
                                    <v-text-field v-model="element.machinname" label="name" :rules="rules.name" @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                    <v-row style="height: 70px">
                                        <v-col cols="10">
                                            <v-text-field v-model="element.machinetype" readonly @click="setModeDeclarationSelect()" :style="refType ? 'height: 43px;border:solid red 2px' : ''" 
                                                         clearable @click:clear='clearModeDeclaration()' label="Type TReference" outlined dense class="lable-placeholer-color"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/processmodedeclar'" dark icon v-bind="attrs" v-on="on" @click="setModeDeclarationList()">
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
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/edtable'+tab.id">
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
                                                        <v-data-table v-model="selectDelectExecutionDItem" :headers="headerFunctionG" :items="tab.execution" :items-per-page='$setNumTableList'
                                                                :show-select="isdeleteExecutionD" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteExecutionD" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,num) in items" :key="num" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refExecution === item.id ? 'red' : null " @click="rowExecutionClick(num)">mdi-pencil</v-icon>
                                                                            <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openExecutionD(num)" @cancel="cancelExecutionD" @save="editExecutionD(num)" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br> <!--v-autocomplete 여기에서 item의 uuid가 같을경우 item-text='name' item-value="uuid"로 해주면 uuid값이 같기 때문에 item의 list가 다 나오지 않는다 name으로 바꿔야지만 list가 잘나옴 -->
                                                                                    <v-autocomplete v-model='editExecutionDItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingCM" @click="setCMSelect()" @blur="isEditingCM=true" 
                                                                                            clearable @click:clear='clearCMRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editExecutionDItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingTM"  @click="setTMSelect()" @blur="isEditingTM=true" 
                                                                                            clearable @click:clear='clearTMRef'>
                                                                                    </v-autocomplete>
                                                                                </template>
                                                                            </v-edit-dialog>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th colspan="3">
                                                                            <v-edit-dialog  large persistent @open="newOpenDependent()" @cancel="cancelExecutionD" @save="addExecutionD()"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editExecutionDItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingCM" @click="setCMSelect()" @blur="isEditingCM=true" 
                                                                                            clearable @click:clear='clearCMRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editExecutionDItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="name" class="lable-placeholer-color"
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
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/fgtable'+tab.id">
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
                                                        <v-data-table v-model="selectDelectFunctionGItem" :headers="headerFunctionG" :items="tab.functionItem" :items-per-page='$setNumTableList'
                                                                :show-select="isdeleteFunctionG" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteFunctionG" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,num) in items" :key="num" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refFunction === item.id ? 'red' : null " @click="rowFunctionClick(num)">mdi-pencil</v-icon>
                                                                            <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openFunctionG(num)" @cancel="cancelFunctionG" @save="editFunctionG(num)" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br> <!--v-autocomplete 여기에서 item의 uuid가 같을경우 item-text='name' item-value="uuid"로 해주면 uuid값이 같기 때문에 item의 list가 다 나오지 않는다 name으로 바꿔야지만 list가 잘나옴 -->
                                                                                    <v-autocomplete v-model='editFunctionGItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingContextMode" @click="setContextModeSelect()" @blur="isEditingContextMode=true" 
                                                                                            clearable @click:clear='clearContextModeRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editFunctionGItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingTargetMode"  @click="setTargetModeSelect()" @blur="isEditingTargetMode=true" 
                                                                                            clearable @click:clear='clearTargetModeRef'>
                                                                                    </v-autocomplete>
                                                                                </template>
                                                                            </v-edit-dialog>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th colspan="3">
                                                                            <v-edit-dialog  large persistent @open="newOpenDependent()" @cancel="cancelFunctionG" @save="addFunctionG()"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editFunctionGItem.contextMode' label='Context Mode Declaration Group Prototype Ref' :items='selContextMode' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingContextMode" @click="setContextModeSelect()" @blur="isEditingContextMode=true" 
                                                                                            clearable @click:clear='clearContextModeRef'>
                                                                                    </v-autocomplete>
                                                                                    <v-autocomplete v-model='editFunctionGItem.targetMode' label='Target Mode Declaration Ref' :items='selTargetMode' item-text='name' item-value="name" class="lable-placeholer-color"
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
                                                        <v-text-field v-model="tab.resourceRef" readonly @click="setResourceGSelect(tab)" :style="refResource ? 'height: 43px;border:solid red 2px' : ''" 
                                                                     clearable @click:clear='clearResourceG(tab)' label="Resource Group Reference" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/processresorce'+tab.id" icon v-bind="attrs" v-on="on" @click="setResourceGList()">
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
                                                        <v-text-field v-model="tab.startupConfigRef" readonly @click="setStartupCSelect(tab)" :style="refStartupC ? 'height: 43px;border:solid red 2px' : ''" 
                                                                     clearable @click:clear='clearStartupC(tab)' label="Startup Config Reference" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/processstartup'+tab.id" dark icon v-bind="attrs" v-on="on" @click="setStartupCList()">
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
                        <v-card-text v-show="!iselementOpenClose|| !minimaptoolbar">
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
                            <label style="padding:10px;">&#60;DESIGN-REF&#62;</label>
                            <v-text-field v-model="editARXML.prodesign" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;DESIGN-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;EXECUTABLE-REF&#62;</label>
                            <v-text-field v-model="editARXML.execut" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;EXECUTABLE-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;DETERMINISTIC-CLIENT-REF&#62;</label>
                            <v-text-field v-model="editARXML.determin" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;DETERMINISTIC-CLIENT-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;LOG-TRACE-DEFAULT-LOG-LEVEL&#62;</label>
                            <v-text-field v-model="editARXML.logLevel" placeholder="FATAL or ERROR or WARN or INFO or DEBUG or VERBOSE" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOG-TRACE-DEFAULT-LOG-LEVEL&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;LOG-TRACE-FILE-PATH&#62;</label>
                            <v-text-field v-model="editARXML.logPath" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOG-TRACE-FILE-PATH&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;LOG-TRACE-LOG-MODES&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextLogMode()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 100px;">
                            <v-row v-for="(item, i) in editARXML.logMode" :key="i" style="height: 25px;">
                                <div>
                                    <br>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextLogMode(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;LOG-TRACE-LOG-MODE&#62;</label>
                                        <v-text-field v-model="editARXML.logMode[i]" style="width:280px" placeholder="CONSOLE or FILE or NETWORK" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;LOG-TRACE-LOG-MODE&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div> 
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;&#47;LOG-TRACE-LOG-MODES&#62;</label>
                        </v-row>              
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;LOG-TRACE-PROCESS-DESC&#62;</label>
                            <v-text-field v-model="editARXML.logProDesc" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOG-TRACE-PROCESS-DESC&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;LOG-TRACE-PROCESS-ID&#62;</label>
                            <v-text-field v-model="editARXML.logProID" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOG-TRACE-PROCESS-ID&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;NUMBER-OF-RESTART-ATTEMPTS&#62;</label>
                            <v-text-field v-model="editARXML.restart" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;NUMBER-OF-RESTART-ATTEMPTS&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;PRE-MAPPING&#62;</label>
                            <v-text-field v-model="editARXML.preMapping" placeholder="true or false" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;PRE-MAPPING&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;PROCESS-STATE-MACHINE&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;margin-left:10px">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.machinname" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin-left:10px">&#60;TYPE-TREF&#62;</label>
                            <v-text-field v-model="editARXML.machinetype" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;TYPE-TREF&#62;</label>
                        </v-row>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;PROCESS-STATE-MACHINE&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;STATE-DEPENDENT-STARTUP-CONFIGS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextDependent()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 550px;">
                            <v-row v-for="(item, i) in editARXML.dependent" :key="i" style="height: 520px;">
                                <div>
                                    <v-row style="height: 10px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextDependent(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;STATE-DEPENDENT-STARTUP-CONFIG&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;EXECUTION-DEPENDENCYS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextExecution(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 180px;">
                                        <v-row v-for="(exe, e) in item.execution" :key="e" style="height: 140px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextExecution(e,i)" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;EXECUTION-DEPENDENCY&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;PROCESS-STATE-IREF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-col cols="6">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;CONTEXT-MODE-DECLARATION-GROUP-REF&#62;</label>
                                                    </v-col><v-col cols="4">
                                                    <v-text-field v-model="exe.contextMode" placeholder="Path" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                                    </v-col><v-col cols="2">
                                                    <label style="padding:10px;">&#60;&#47;CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF&#62;</label>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-col cols="5">
                                                    <label style="padding:10px;margin:2px 0px 2px 140px;">&#60;TARGET-MODE-DECLARATION-REF&#62;</label>
                                                    </v-col><v-col cols="4">
                                                    <v-text-field v-model="exe.targetMode" placeholder="Path" style="margin: -5px 0px 0px 80px" class="lable-placeholer-color" dense></v-text-field>
                                                    </v-col><v-col cols="3">
                                                    <label style="padding:10px;">&#60;&#47;TARGET-MODE-DECLARATION-REF&#62;</label>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 130px;">&#60;&#47;PROCESS-STATE-IREF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 30px;margin:0px;">
                                                    <label style="padding:10px;margin-left:115px;">&#60;&#47;EXECUTION-DEPENDENCY&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;EXECUTION-DEPENDENCYS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;FUNCTION-GROUP-STATE-IREFS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextFunction(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(fun, f) in item.functionItem" :key="f" style="height: 90px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextFunction(f,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;FUNCTION-GROUP-STATE-IREF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-col cols="6">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;CONTEXT-MODE-DECLARATION-GROUP-REF&#62;</label>
                                                    </v-col><v-col cols="4">
                                                    <v-text-field v-model="fun.contextMode" placeholder="Path" style="margin: -5px 0px 0px 70px" class="lable-placeholer-color" dense></v-text-field>
                                                    </v-col><v-col cols="2">
                                                    <label style="padding:10px;">&#60;&#47;CONTEXT-MODE-DECLARATION-GROUP-PROTOTYPE-REF&#62;</label>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-col cols="5">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;TARGET-MODE-DECLARATION-REF&#62;</label>
                                                    </v-col><v-col cols="4">
                                                    <v-text-field v-model="fun.targetMode" placeholder="Path" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                                    </v-col><v-col cols="3">
                                                    <label style="padding:10px;">&#60;&#47;TARGET-MODE-DECLARATION-REF&#62;</label>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="height: 30px;margin:0px;">
                                                    <label style="padding:10px;margin-left:110px;">&#60;&#47;FUNCTION-GROUP-STATE-IREF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 35px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;FUNCTION-GROUP-STATE-IREFS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;RESOURCE-GROUP-REF&#62;</label>
                                        <v-text-field v-model="item.resourceRef" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;RESOURCE-GROUP-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;STARTUP-CONFIG-REF&#62;</label>
                                        <v-text-field v-model="item.startupConfigRef" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;STARTUP-CONFIG-REF&#62;</label>
                                    </v-row>                               
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin-left:55px;">&#60;&#47;STATE-DEPENDENT-STARTUP-CONFIG&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;STATE-DEPENDENT-STARTUP-CONFIGS&#62;</label>
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
    props: ['element', 'isDatailView', 'minimaptoolbar', 'location'],
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
                        if(this.iselementOpenClose) {
                            if(this.element.dependent.length > 0 && this.location == 1) {
                                if (this.isDependentStartupOpenClose) {
                                    EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.element.dependent[this.dependentStartupTab].id)
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
            iselementOpenClose: true,//this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                    prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []},
            editTextDependent: {execution: [], functionItem: [], resourceRef: null, startupConfigRef: null, id: ''},
            editTextExecution: {contextMode: null, targetMode: null, id: ''},
            editTextFunction: {contextMode: null, targetMode: null, id: ''},
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
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Context Mode Ref', align: 'start', sortable: false, value: 'contextMode' },
                { text: 'Target Mode Ref', sortable: false, value: 'targetMode' },
            ],
            isEditingContextMode: true,
            isEditingTargetMode: true,
            defaultItem: { contextMode: null, targetMode: null, id: '' },
            editFunctionGItem: { contextMode: null, targetMode: null, id: '' },
            selContextMode: this.$store.getters.getMachineFG,
            selTargetMode: this.$store.getters.getModeDeclaration,

            isdeleteExecutionD: false,
            selectDelectExecutionDItem: [],
            isEditingCM: true,
            isEditingTM: true,
            editExecutionDItem: { contextMode: null, targetMode: null, id: '' },

            refDesign: false,
            refDeterministric: false,
            refExecutable: false,
            refType: false,
            refExecution: '',
            refFunction: '',
            refResource: false,
            refStartupC: false,

        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID, id, isDeleteItem, item, idxRow) => {
            console.log('## '+id+' / '+isDeleteItem+ ' / ' + item+ ' / '+tabID)
            if (isDeleteItem) {
                if (this.resourceRef && this.element.dependent[this.dependentStartupTab].id == tabID && item == 'resource') {
                    this.clickOtherFields()
                } else if (this.refStartupC && this.element.dependent[this.dependentStartupTab].id == tabID && item == 'startup') {
                    this.clickOtherFields()
                } else if (this.refExecution == id && item == 'Execution' && this.element.dependent[this.dependentStartupTab].id == tabID) {
                    this.refExecution = id + 1
                    this.rowExecutionClick(idxRow)
                } else if (this.refFunction == id && item == 'Function' && this.element.dependent[this.dependentStartupTab].id == tabID) {
                    this.refFunction = id + 1
                    this.rowFunctionClick(idxRow)
                }
            } else {
                this.refDesign = false
                this.refDeterministric = false
                this.refExecutable = false
                this.refType = false
                this.refResource = false
                this.refStartupC = false
                this.refExecution = null
                this.refFunction = null

                if (refNum == 1) {
                    this.refDesign = true
                } else if (refNum == 2) {
                    this.refDeterministric = true
                } else if (refNum == 3) {
                    this.refExecutable = true
                } else if (refNum == 4) {
                    this.refType = true
                } else if (refNum == 5) {
                    this.dependentStartupTab = tabID
                    this.refExecution = idxID
                } else if (refNum == 6) {
                    this.dependentStartupTab = tabID
                    this.refFunction = idxID
                } else if (refNum == 7) {
                    this.dependentStartupTab = tabID
                    this.refResource = idxID
                } else if (refNum == 8) {
                    this.dependentStartupTab = tabID
                    this.refStartupC = idxID
                }
            }
        })
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showStateMachine() {
            this.clickOtherFields()
            this.isStateMachineOpenClose = this.isStateMachineOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showDependentStartup() {
            this.clickOtherFields()
            this.isDependentStartupOpenClose = this.isDependentStartupOpenClose ? false : true
           /* if(this.element.dependent.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isDependentStartupOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.element.dependent[this.dependentStartupTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showFunctionG() {
            this.clickOtherFields()
            this.isFunctionGOpenClose = this.isFunctionGOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showExecutionD() {
            this.clickOtherFields()
            this.isExecutionDOpenClose = this.isExecutionDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        inputProcessName() {
            this.$store.commit('editProcess', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refDesign || this.refDeterministric ||this.refExecutable ||this.refType ||
                this.refResource ||this.refStartupC || this.refExecution != null || this.refFunction != null) {
                this.deleteOpenElement()
                this.refDesign = false
                this.refDeterministric = false
                this.refExecutable = false
                this.refType = false
                this.refResource = false
                this.refStartupC = false
                this.refExecution = null
                this.refFunction = null
            }
        },
        rowExecutionClick(idx) {
            console.log('rowClick ' + idx+' / '+ this.refExecution)
            if (this.refExecution != this.element.dependent[this.dependentStartupTab].execution[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLineContext = null, endLineTarget = null
                console.log(this.element.dependent[this.dependentStartupTab].execution[idx].contextMode)
                if (this.element.dependent[this.dependentStartupTab].execution[idx].targetMode != null) {
                    endLineTarget = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                    if (endLineTarget == undefined) {
                        endLineTarget = this.$store.getters.getModeDeclarationPath(this.element.dependent[this.dependentStartupTab].execution[idx].targetMode, 1)
                    }
                    if (endLineTarget != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: endLineTarget, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: endLineTarget, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineTarget, 
                                        iscircle:false, refNum:5, idxID: this.element.dependent[this.dependentStartupTab].execution[idx].id, tabID: this.dependentStartupTab})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineTarget)
                            EventBus.$emit('new-line', this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, endLineTarget)
                        })
                    }
                }
                if (this.element.dependent[this.dependentStartupTab].execution[idx].contextMode != null) {
                    endLineContext = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                    if (endLineContext == undefined) {
                        endLineContext = this.$store.getters.getMachinePath(this.element.dependent[this.dependentStartupTab].execution[idx].contextMode, 2)
                    }
                    if (endLineContext != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var top = 200
                        if (endLineTarget != null) {
                            top = 600
                        }
                        this.$store.commit('editMachine', {compo:"drag", uuid: endLineContext, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: endLineContext, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineContext,
                                         iscircle:false, refNum:5, idxID: this.element.dependent[this.dependentStartupTab].execution[idx].id, tabID: this.dependentStartupTab})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineContext)
                            EventBus.$emit('new-line', this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, endLineContext)
                        })
                    }
                }

                this.$nextTick(() => { 
                    if (endLineContext != null && endLineTarget == null) {
                        EventBus.$emit('Element-open', true, endLineContext)
                    } else if (endLineContext == null && endLineTarget != null) {
                        EventBus.$emit('Element-open', true, endLineTarget)
                    } 
                })
                this.refExecution = this.element.dependent[this.dependentStartupTab].execution[idx].id
            }
        },
        rowFunctionClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refFunction != this.element.dependent[this.dependentStartupTab].functionItem[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLineContext = null, endLineTarget = null
                if (this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode != null) {
                    endLineTarget = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                    if (endLineTarget == undefined) {
                        endLineTarget = this.$store.getters.getModeDeclarationPath(this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode, 1)
                    }
                    if (endLineTarget != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: endLineTarget, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: endLineTarget, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineTarget, 
                                    iscircle:false, refNum:6, idxID: this.element.dependent[this.dependentStartupTab].functionItem[idx].id, tabID: this.dependentStartupTab})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineTarget)
                           EventBus.$emit('new-line', this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, endLineTarget)
                        })
                    }
                }
                if (this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode != null) {
                    endLineContext = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                    if (endLineContext == undefined) {
                        endLineContext = this.$store.getters.getMachinePath(this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode, 2)
                    }
                    if (endLineContext != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var top = 200
                        if (endLineTarget != null) {
                            top = 600
                        }
                        this.$store.commit('editMachine', {compo:"drag", uuid: endLineContext, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: endLineContext, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineContext,
                                     iscircle:false, refNum:6, idxID: this.element.dependent[this.dependentStartupTab].functionItem[idx].id, tabID: this.dependentStartupTab})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineContext)
                           EventBus.$emit('new-line', this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, endLineContext)
                        })
                    }
                }

                this.$nextTick(() => { 
                    if (endLineContext != null && endLineTarget == null) {
                        EventBus.$emit('Element-open', true, endLineContext)
                    } else if (endLineContext == null && endLineTarget != null) {
                        EventBus.$emit('Element-open', true, endLineTarget)
                    } 
                })
                this.refFunction = this.element.dependent[this.dependentStartupTab].functionItem[idx].id
            }
        },

        clearProcessDesign() {
            this.element.prodesign = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processprodesign')
            }
            this.clickOtherFields()
        },
        setProcessDesignSelect() {
            this.clickOtherFields()
            if (this.element.prodesign != null) {this.refDesign = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getProcessDesignPath(this.element.prodesign)
                }
                if (endLine != null) {
                    this.$store.commit('editProcessDesign', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ProcessDesign_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/processprodesign', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processprodesign', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ProcessDesign_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setProcessDesignList() {
            this.selProcessDesign = this.$store.getters.getProcessDesign
            this.setactiveUUID()
        },
        setProcessDesign(item) {
            this.clickOtherFields()
            if(this.element.prodesign != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processprodesign')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refDesign = true
                    this.$store.commit('editProcessDesign', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ProcessDesign_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/processprodesign', this.element.uuid+'/processprodesign', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processprodesign', end:item.uuid, iscircle:false, refNum:1})
                }
                this.element.prodesign = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refDesign = true
                    this.$store.commit('editProcessDesign', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ProcessDesign_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/processprodesign', this.element.uuid+'/processprodesign', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processprodesign', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        newProcessDesign() {
            this.$store.commit('addElementProcessDesign', { //executableref 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameProcessDesign, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
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
            this.clickOtherFields()
        },
        setDeterminSelect() {
            this.clickOtherFields()
            if (this.element.determin != null) {this.refDeterministric = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getDeterministicClientPath(this.element.determin)
                }
                if (endLine != null) {
                    this.$store.commit('editDeterministicClien', {compo:"drag", uuid: endLine, top: this.element.top + 60, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.DeterministicClient_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/processdetermin', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processdetermin', end:endLine, iscircle:false, refNum:2})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.DeterministicClient_str} )
                    /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)*/
                }
            }
        },
        setDeterminList() {
            this.selDeterministic = this.$store.getters.getDeterministicClient
            this.setactiveUUID()
        },
        setDeterministicClient(item) {
            this.clickOtherFields()
            if(this.element.determin != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processdetermin')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refDeterministric = true
                    this.$store.commit('editDeterministicClien', {compo:"drag", uuid: item.uuid, top: this.element.top + 60, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.DeterministicClient_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/processdetermin', this.element.uuid+'/processdetermin', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processdetermin', end:item.uuid, iscircle:false, refNum:2})
                }
                this.element.determin = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refDeterministric = true
                    this.$store.commit('editDeterministicClien', {compo:"drag", uuid: item.uuid, top: this.element.top + 60, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.DeterministicClient_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/processdetermin', this.element.uuid+'/processdetermin', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processdetermin', end:item.uuid, iscircle:false, refNum:2})
                }
            }
            this.setactiveUUID()
        },
        newDeterministicClient() {
            this.$store.commit('addElementDeterministicClien', {
                name: this.$store.getters.getNameDeterministicClient, path: '', input: false,
                top: this.element.top + 60, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
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
            this.clickOtherFields()
        },
        setExecutableSelect() {
            this.clickOtherFields()
            if (this.element.execut != null) {this.refExecutable = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getExecutablePath(this.element.execut)
                }
                if (endLine != null) {
                    this.$store.commit('editExecutable', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Executable_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/processexecut', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processexecut', end:endLine, iscircle:false, refNum:3})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.Executable_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setExecutableList() {
            this.selExecutable = this.$store.getters.getExecutable
            this.setactiveUUID()
        },
        setExecutable(item) {
            this.clickOtherFields()
            if(this.element.execut != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processexecut')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refExecutable = true
                    this.$store.commit('editExecutable', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Executable_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/processexecut', this.element.uuid+'/processexecut', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processexecut', end:item.uuid, iscircle:false, refNum:3})
                }
                this.element.execut = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refExecutable = true
                    this.$store.commit('editExecutable', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Executable_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/processexecut', this.element.uuid+'/processexecut', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processexecut', end:item.uuid, iscircle:false, refNum:3})
                }
            }
            this.setactiveUUID()
        },
        newExecutable() {
            this.$store.commit('addElementExecutable', { //applicationtyperef 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameExecutable, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
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
            this.clickOtherFields()
        },
        setModeDeclarationSelect() {
            this.clickOtherFields()
            if (this.element.machinetype != null) {this.refType = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getModeDeclarationPath(this.element.machinetype, 0)
                }
                if (endLine != null) {
                    this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: endLine, top: this.element.top + 480, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLine)
                        EventBus.$emit('new-line', this.element.uuid+'/processmodedeclar', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processmodedeclar', end:endLine, iscircle:false, refNum:4})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ModeDeclarationGroup_str} )
                    /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)*/
                }
            }
        },
        setModeDeclarationList() {
            this.selModeDeclaration = this.$store.getters.getModeDeclarationG
            this.setactiveUUID()
        },
        setModeDeclaration(item) {
            this.clickOtherFields()
            if(this.element.machinetype != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processmodedeclar')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refType = true
                    this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: item.uuid, top: this.element.top + 480, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/processmodedeclar', this.element.uuid+'/processmodedeclar', item.uuid, true) 
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processmodedeclar', end:item.uuid, iscircle:false, refNum:4})
                }
                this.element.machinetype = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refType = true
                    this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: item.uuid, top: this.element.top + 480, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/processmodedeclar', this.element.uuid+'/processmodedeclar', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processmodedeclar', end:item.uuid, iscircle:false, refNum:4})
                }
            }
            this.setactiveUUID()
        },
        newModeDeclarationGroup() {
            this.$store.commit('addElementModeDeclarationGroup', {
                name: this.$store.getters.getNameModeDeclarationGroup, path: '', input: false,
                top: this.element.top + 480, left: this.element.left + this.$setPositionLeft, zindex: 10, 
                modedeclaration:[{name: 'Off', value: ''},{name: 'Startup', Value: ''}], initmode:'Off', icon:"mdi-clipboard-outline", validation: false
            })
            EventBus.$emit('add-element', constant.ModeDeclarationGroup_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addDependentStartup() {
            this.clickOtherFields()
            const editItem = { execution: [], functionItem: [], resourceRef: null, startupConfigRef: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.element.dependent.some(item => item.id == n)
            }
            editItem.id = n
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
            if (this.refExecution != null || this.refFunction != null || this.refResource || this.refStartupC) {
                this.deleteOpenElement()
                this.refExecution = null
                this.refFunction = null
                this.refResource = false
                this.refStartupC = false
            }
            //console.log('changeDependentStartupTab' +this.dependentStartupTab)
            /*if(this.element.dependent.length > 0 && this.location == 1 && this.dependentStartupTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.dependentStartupTab, this.element.dependent[this.dependentStartupTab].id)}, 300);
            }*/
        },
        deleteDependentStartup(idx) {
            this.clickOtherFields()
            console.log('deleteDependentStartup' + idx)
            this.element.dependent[idx].functionItem.forEach(item => {
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+item.id+'-'+this.element.dependent[idx].id)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/fgcontext-'+item.id+'-'+this.element.dependent[idx].id)
                }
                var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+item.id+'-'+this.element.dependent[idx].id)
                if(endLinetarg != undefined) {
                    this.deleteLine(this.element.uuid+'/fgtarget-'+item.id+'-'+this.element.dependent[idx].id)
                }
            })
            this.element.dependent[idx].execution.forEach(item => {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+item.id+'-'+this.element.dependent[idx].id)
                if(endLineC != undefined) {
                    this.deleteLine(this.element.uuid+'/edcontext-'+item.id+'-'+this.element.dependent[idx].id)
                }
                var endLinet = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+item.id+'-'+this.element.dependent[idx].id)
                if(endLinet != undefined) {
                    this.deleteLine(this.element.uuid+'/edtarget-'+item.id+'-'+this.element.dependent[idx].id)
                }
            })
            var endLine
            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.element.dependent[idx].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processresorce-'+this.element.dependent[idx].id)
            }
            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.element.dependent[idx].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processstartup-'+this.element.dependent[idx].id)
            }
            
            this.element.dependent.splice(idx, 1)
        },
        isCheckFunctionG() {
            this.clickOtherFields()
            if (this.isdeleteFunctionG == true) {
                this.isdeleteFunctionG = false
                this.selectDelectFunctionGItem = []
            } else {
                this.isdeleteFunctionG = true
            }
        },
        deleteFunctionG() {
            this.clickOtherFields()
            if (this.isdeleteFunctionG == true) {
                this.selectDelectFunctionGItem.forEach(item => {
                    for(let i=0; i<this.element.dependent[this.dependentStartupTab].functionItem.length; i++){
                        if (item.id == this.element.dependent[this.dependentStartupTab].functionItem[i].id) {
                            var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            if(endLineCon != undefined) {
                                this.deleteLine(this.element.uuid+'/fgcontext-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            }
                            var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            if(endLinetarg != undefined) {
                                this.deleteLine(this.element.uuid+'/fgtarget-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            }
                        }
                    }
                })

                this.element.dependent[this.dependentStartupTab].functionItem = this.element.dependent[this.dependentStartupTab].functionItem.filter(item => {
                         return this.selectDelectFunctionGItem.indexOf(item) < 0 })

                this.isdeleteFunctionG = false
                this.selectDelectFunctionGItem = []
            }
        },
        openFunctionG(idx) {
            this.selContextMode = this.$store.getters.getMachineFG
            this.selTargetMode = this.$store.getters.getModeDeclaration

            if (this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getMachinePath(this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode, 2)
                }
                this.editFunctionGItem.contextMode = { name :this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode, uuid: endLineC }
            }
            if (this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode != null) {
                var endLineT = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLineT == undefined) {
                    endLineT = this.$store.getters.getModeDeclarationPath(this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode, 1)
                }
                this.editFunctionGItem.targetMode = { name :this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode, uuid: endLineT }
            }
        },
        editFunctionG(idx) {
            var endcontextMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
            if (endcontextMLine != undefined && this.editFunctionGItem.contextMode == null) {
                this.deleteLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = null
            } else if (endcontextMLine != undefined && endcontextMLine != this.editFunctionGItem.contextMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.newLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id, 
                                this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, this.editFunctionGItem.contextMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            } else if(endcontextMLine == undefined && this.editFunctionGItem.contextMode != null && this.editFunctionGItem.contextMode.uuid != null) {
                this.newLine(this.element.uuid+'/fgcontext-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id,
                                 this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, this.editFunctionGItem.contextMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            } else if (this.editFunctionGItem.contextMode != null && endcontextMLine == this.editFunctionGItem.contextMode.uuid && this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode != this.editFunctionGItem.contextMode.name) {
                this.element.dependent[this.dependentStartupTab].functionItem[idx].contextMode = this.editFunctionGItem.contextMode.name
            }

            var endtargetMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
            if (endtargetMLine != undefined && this.editFunctionGItem.targetMode == null) {
                this.deleteLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = null
            } else if (endtargetMLine != undefined && endtargetMLine != this.editFunctionGItem.targetMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.newLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id, 
                                this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, this.editFunctionGItem.targetMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            } else if (endtargetMLine == undefined && this.editFunctionGItem.targetMode != undefined && this.editFunctionGItem.targetMode.uuid != undefined) {
                this.newLine(this.element.uuid+'/fgtarget-'+this.element.dependent[this.dependentStartupTab].functionItem[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id,
                                 this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, this.editFunctionGItem.targetMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            } else if (this.editFunctionGItem.targetMode != undefined && endtargetMLine == this.editFunctionGItem.targetMode.uuid && this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode != this.editFunctionGItem.targetMode.name) {
                this.element.dependent[this.dependentStartupTab].functionItem[idx].targetMode = this.editFunctionGItem.targetMode.name
            }

            var endLineContext = null, endLineTarget = null
            if (this.refFunction == this.element.dependent[this.dependentStartupTab].functionItem[idx].id) {
                this.deleteOpenElement()
                if (this.editFunctionGItem.targetMode != null && this.editFunctionGItem.targetMode.uuid != null) {
                    endLineTarget = this.editFunctionGItem.targetMode.uuid
                    this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: this.editFunctionGItem.targetMode.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: this.editFunctionGItem.targetMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineTarget, 
                                    iscircle:false, refNum:6, idxID: this.refFunction, tabID: this.dependentStartupTab})
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', false, this.editFunctionGItem.targetMode.uuid)
                        EventBus.$emit('new-line', this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, endLineTarget)
                    })

                }
                if (this.editFunctionGItem.contextMode != null && this.editFunctionGItem.contextMode.uuid != null) {
                    endLineContext = this.editFunctionGItem.contextMode.uuid
                    var top = 200
                    if (endLineTarget != null) {
                        top = 600
                    }
                    this.$store.commit('editMachine', {compo:"drag", uuid: this.editFunctionGItem.contextMode.uuid, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: this.editFunctionGItem.contextMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, 
                                    end:endLineContext, iscircle:false, refNum:6, idxID: this.refFunction, tabID: this.dependentStartupTab})
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', false, this.editFunctionGItem.contextMode.uuid)
                        EventBus.$emit('new-line', this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, endLineContext)
                    })

                }

                this.$nextTick(() => { 
                    if (endLineContext != null && endLineTarget == null) {
                        EventBus.$emit('Element-open', true, endLineContext)
                    } else if (endLineContext == null && endLineTarget != null) {
                        EventBus.$emit('Element-open', true, endLineTarget)
                    } 
                })
            }
            
            this.cancelFunctionG()
        },
        cancelFunctionG() {
            this.editFunctionGItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        addFunctionG() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.dependent[this.dependentStartupTab].functionItem.some(item => item.id === n)
            }
            this.editFunctionGItem.id = n
            var endLineContext = null, endLineTarget = null
            if( this.editFunctionGItem.targetMode != null) {
                endLineTarget = this.editFunctionGItem.targetMode.uuid
                this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: this.editFunctionGItem.targetMode.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: this.editFunctionGItem.targetMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editFunctionGItem.targetMode = this.editFunctionGItem.targetMode.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineTarget, 
                                    iscircle:false, refNum:6, idxID: this.editFunctionGItem.id, tabID: this.dependentStartupTab})
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, this.editFunctionGItem.targetMode.uuid)
                    this.newLine(this.element.uuid+'/fgtarget-'+n+'-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id,
                                 endLineTarget, true)
                })
            }
            if( this.editFunctionGItem.contextMode != null) {
                endLineContext = this.editFunctionGItem.contextMode.uuid
                var top = 200
                if (endLineTarget != null) {
                    top = 600
                }
                this.$store.commit('editMachine', {compo:"drag", uuid: this.editFunctionGItem.contextMode.uuid, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: this.editFunctionGItem.contextMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editFunctionGItem.contextMode = this.editFunctionGItem.contextMode.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineContext, 
                                    iscircle:false, refNum:6, idxID: this.editFunctionGItem.id, tabID: this.dependentStartupTab})
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, this.editFunctionGItem.contextMode.uuid)
                    this.newLine(this.element.uuid+'/fgcontext-'+n+'-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/fgtable'+this.element.dependent[this.dependentStartupTab].id, 
                                endLineContext, true)
                })
            }

            this.$nextTick(() => { 
                if (endLineContext != null && endLineTarget == null) {
                    EventBus.$emit('Element-open', true, endLineContext)
                } else if (endLineContext == null && endLineTarget != null) {
                    EventBus.$emit('Element-open', true, endLineTarget)
                } 
            })
            
            const addObj = Object.assign({}, this.editFunctionGItem)
            this.element.dependent[this.dependentStartupTab].functionItem.push(addObj)
            this.refFunction = n
            this.cancelFunctionG()
        },
        setContextModeSelect() {
            if (this.isEditingContextMode == true) { 
                if (this.editFunctionGItem.contextMode != null && this.editFunctionGItem.contextMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFunctionGItem.contextMode.uuid, element: constant.Machine_str} )
                    // document.getElementById(this.editFunctionGItem.contextMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editFunctionGItem.contextMode.uuid)
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
                    // document.getElementById(this.editFunctionGItem.targetMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editFunctionGItem.targetMode.uuid)
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
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id)
            }
            this.clickOtherFields()
        },
        setResourceGSelect(item) {
            this.clickOtherFields()
            if (item.resourceRef != null) {this.refResource = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getMachinePath(item.resourceRef, 1)
                }
                if (endLine != null) {
                    this.$store.commit('editMachine', {compo:"drag", uuid: endLine, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        EventBus.$emit('Element-open', true, endLine)
                        EventBus.$emit('new-line', this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:endLine, iscircle:false, refNum: 7, idxID: 0, tabID: this.dependentStartupTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.Machine_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setResourceGList() {
            this.selResourceG = this.$store.getters.getResourceGroup
            this.setactiveUUID()
        },
        setResourceG(item, tab) {
            this.clickOtherFields()
            if(tab.resourceRef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refResource = true
                    this.$store.commit('editMachine', {compo:"drag", uuid: item.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/processresorce'+this.element.dependent[this.dependentStartupTab].id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processresorce'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:item.uuid, iscircle:false, refNum:7, idxID: 0, tabID: this.dependentStartupTab})
                }
                tab.resourceRef = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refResource = true
                    this.$store.commit('editMachine', {compo:"drag", uuid: item.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/processresorce-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/processresorce'+this.element.dependent[this.dependentStartupTab].id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processresorce'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:item.uuid, iscircle:false, refNum:7, idxID: 0, tabID: this.dependentStartupTab})
                }
            }
            this.setactiveUUID()
        },

        clearStartupC(item) {
            item.startupConfigRef = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id)
            }
            this.clickOtherFields()
        },
        setStartupCSelect(item) {
            this.clickOtherFields()
            if (item.startupConfigRef != null) {this.refStartupC = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getStartupConfigPath(item.startupConfigRef)
                }
                if (endLine != null) {
                    this.$store.commit('editStartupConfig', {compo:"drag", uuid: endLine, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.StartupConfig_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        EventBus.$emit('new-line', this.element.uuid+'/processstartup'+this.element.dependent[this.dependentStartupTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id, end:endLine, 
                                        iscircle:false, refNum:8, idxID: 0, tabID: this.dependentStartupTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.StartupConfig_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setStartupCList() {
            this.selStartupC = this.$store.getters.getStartupConfig
            this.setactiveUUID()
        },
        setStartupC(item, tab) {
            this.clickOtherFields()
            if(tab.startupConfigRef != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refStartupC = true
                    this.$store.commit('editStartupConfig', {compo:"drag", uuid: item.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.StartupConfig_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        this.newLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/processstartup'+this.element.dependent[this.dependentStartupTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processstartup'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:item.uuid, iscircle:false, refNum:8, idxID: 0, tabID: this.dependentStartupTab})
                }
                tab.startupConfigRef = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refStartupC = true
                    this.$store.commit('editStartupConfig', {compo:"drag", uuid: item.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.StartupConfig_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => {
                        this.newLine(this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/processstartup'+this.element.dependent[this.dependentStartupTab].id, 
                                  item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/processstartup-'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:item.uuid, iscircle:false, refNum:8, idxID: 0, tabID: this.dependentStartupTab})
                }
            }
            this.setactiveUUID()
        },
        newStartupC() {
            this.$store.commit('addElementStartupConfig', {
                name: this.$store.getters.getNameStartupConfig, path: '', input: false,
                top: this.element.top + 1145, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                config: []
            })
            EventBus.$emit('add-element', constant.StartupConfig_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editProcess', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckExecutionD() {
            this.clickOtherFields()
            if (this.isdeleteExecutionD == true) {
                this.isdeleteExecutionD = false
                this.selectDelectExecutionDItem = []
            } else {
                this.isdeleteExecutionD = true
            }
        },
        deleteExecutionD() {
            this.clickOtherFields()
            if (this.isdeleteExecutionD == true) {
                this.selectDelectExecutionDItem.forEach(item => {
                    for(let i=0; i<this.element.dependent[this.dependentStartupTab].execution.length; i++){
                        if (item.id == this.element.dependent[this.dependentStartupTab].execution[i].id) {
                            var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            if(endLineCon != undefined) {
                                this.deleteLine(this.element.uuid+'/edcontext-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            }
                            var endLinetarg = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            if(endLinetarg != undefined) {
                                this.deleteLine(this.element.uuid+'/edtarget-'+item.id+'-'+this.element.dependent[this.dependentStartupTab].id)
                            }
                        }
                    }
                })

                this.element.dependent[this.dependentStartupTab].execution = this.element.dependent[this.dependentStartupTab].execution.filter(item => {
                         return this.selectDelectExecutionDItem.indexOf(item) < 0 })

                this.isdeleteExecutionD = false
                this.selectDelectExecutionDItem = []
            }
        },
        openExecutionD(idx) {
            this.selContextMode = this.$store.getters.getMachineFG
            this.selTargetMode = this.$store.getters.getModeDeclaration

            if (this.element.dependent[this.dependentStartupTab].execution[idx].contextMode != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getMachinePath(this.element.dependent[this.dependentStartupTab].execution[idx].contextMode, 2)
                }
                this.editExecutionDItem.contextMode = { name :this.element.dependent[this.dependentStartupTab].execution[idx].contextMode, uuid: endLineC }
            } 

            if (this.element.dependent[this.dependentStartupTab].execution[idx].targetMode != null) {
                var endLineT = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                if (endLineT == undefined) {
                    endLineT = this.$store.getters.getModeDeclarationPath(this.element.dependent[this.dependentStartupTab].execution[idx].targetMode, 1)
                }
                this.editExecutionDItem.targetMode = { name :this.element.dependent[this.dependentStartupTab].execution[idx].targetMode, uuid: endLineT }
            } 
        },
        editExecutionD(idx) {
            var endcontextMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
            if (endcontextMLine != undefined && this.editExecutionDItem.contextMode == null) {
                this.deleteLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.element.dependent[this.dependentStartupTab].execution[idx].contextMode = null
            } else if (endcontextMLine != undefined && endcontextMLine != this.editExecutionDItem.contextMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.newLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id, 
                                this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, this.editExecutionDItem.contextMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].execution[idx].contextMode = this.editExecutionDItem.contextMode.name
            } else if(endcontextMLine == undefined && this.editExecutionDItem.contextMode != null && this.editExecutionDItem.contextMode.uuid != null) {
                this.newLine(this.element.uuid+'/edcontext-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id,
                                 this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, this.editExecutionDItem.contextMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].execution[idx].contextMode = this.editExecutionDItem.contextMode.name
            } else if (this.editExecutionDItem.contextMode!= null && endcontextMLine == this.editExecutionDItem.contextMode.uuid && this.element.dependent[this.dependentStartupTab].execution[idx].contextMode != this.editExecutionDItem.contextMode.name) {
                this.element.dependent[this.dependentStartupTab].execution[idx].contextMode = this.editExecutionDItem.contextMode.name
            }

            var endtargetMLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
            if (endtargetMLine != undefined && this.editExecutionDItem.targetMode == null) {
                this.deleteLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.element.dependent[this.dependentStartupTab].execution[idx].targetMode = null
            } else if (endtargetMLine != undefined && endtargetMLine != this.editExecutionDItem.targetMode.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id)
                this.newLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id,
                                this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, this.editExecutionDItem.targetMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].execution[idx].targetMode = this.editExecutionDItem.targetMode.name
            } else if (endtargetMLine == undefined && this.editExecutionDItem.targetMode != undefined && this.editExecutionDItem.targetMode.uuid != null) {
                this.newLine(this.element.uuid+'/edtarget-'+this.element.dependent[this.dependentStartupTab].execution[idx].id+'-'+this.element.dependent[this.dependentStartupTab].id,
                                 this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, this.editExecutionDItem.targetMode.uuid, false)
                this.element.dependent[this.dependentStartupTab].execution[idx].targetMode = this.editExecutionDItem.targetMode.name
            } else if (this.editExecutionDItem.targetMode != null && endtargetMLine == this.editExecutionDItem.targetMode.uuid && this.element.dependent[this.dependentStartupTab].execution[idx].targetMode != this.editExecutionDItem.targetMode.name) {
                this.element.dependent[this.dependentStartupTab].execution[idx].targetMode = this.editExecutionDItem.targetMode.name
            }
            
            var endLineContext = null, endLineTarget = null
            if (this.refExecution == this.element.dependent[this.dependentStartupTab].execution[idx].id) {
                this.deleteOpenElement()
                if ( this.editExecutionDItem.targetMode != undefined && this.editExecutionDItem.targetMode.uuid != null) {
                    endLineTarget = this.editExecutionDItem.targetMode.uuid
                    this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: this.editExecutionDItem.targetMode.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: this.editExecutionDItem.targetMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/dtable'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:endLineTarget, iscircle:false, refNum:5, idxID: this.refExecution, tabID: this.dependentStartupTab})
                    this.$nextTick(() => {
                        EventBus.$emit('Element-open', false, this.editExecutionDItem.targetMode.uuid)
                        EventBus.$emit('new-line', this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, endLineTarget)
                    })
                }
                if (this.editExecutionDItem.contextMode != null && this.editExecutionDItem.contextMode.uuid != null) {
                    endLineContext = this.editExecutionDItem.contextMode.uuid
                    var top = 200
                    if (endLineTarget != null) {
                        top = 600
                    }
                    this.$store.commit('editMachine', {compo:"drag", uuid: this.editExecutionDItem.contextMode.uuid, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: this.editExecutionDItem.contextMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, 
                                        end:endLineContext, iscircle:false, refNum:5, idxID: this.refExecution, tabID: this.dependentStartupTab})
                    this.$nextTick(() => {
                        EventBus.$emit('Element-open', false, this.editExecutionDItem.contextMode.uuid)
                        EventBus.$emit('new-line', this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, endLineContext)
                    })
                }

                this.$nextTick(() => {
                    if (endLineContext != null && endLineTarget == null) {
                        EventBus.$emit('Element-open', true, endLineContext)
                    } else if (endLineContext == null && endLineTarget != null) {
                        EventBus.$emit('Element-open', true, endLineTarget)
                    } 
                })
            }

            this.cancelExecutionD()
        },
        cancelExecutionD() {
            this.editExecutionDItem = Object.assign({}, this.defaultItem)
            this.setactiveUUID()
        },
        newOpenDependent() {
            this.selContextMode = this.$store.getters.getMachineFG
            this.selTargetMode = this.$store.getters.getModeDeclaration
            this.clickOtherFields()
        },
        addExecutionD() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.dependent[this.dependentStartupTab].execution.some(item => item.id === n)
            }
            this.editExecutionDItem.id = n

            var endLineContext = null, endLineTarget = null 
            if( this.editExecutionDItem.targetMode != null) {
                endLineTarget = this.editExecutionDItem.targetMode.uuid
                this.$store.commit('editModeDeclarationGroup', {compo:"drag", uuid: this.editExecutionDItem.targetMode.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ModeDeclarationGroup_str, uuid: this.editExecutionDItem.targetMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editExecutionDItem.targetMode = this.editExecutionDItem.targetMode.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineTarget, 
                                    iscircle:false, refNum:5, idxID: this.editExecutionDItem.id, tabID: this.dependentStartupTab})
                this.$nextTick(() => {
                    EventBus.$emit('Element-open', false, endLineTarget)
                    this.newLine(this.element.uuid+'/edtarget-'+n+'-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id,
                                 endLineTarget, true)
                })
            }
            if( this.editExecutionDItem.contextMode != null) {
                var top = 200
                if (endLineTarget != null) {
                    top = 600
                }
                endLineContext = this.editExecutionDItem.contextMode.uuid
                this.$store.commit('editMachine', {compo:"drag", uuid: this.editExecutionDItem.contextMode.uuid, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.Machine_str, uuid: this.editExecutionDItem.contextMode.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editExecutionDItem.contextMode = this.editExecutionDItem.contextMode.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id, end:endLineContext, 
                                    iscircle:false, refNum:5, idxID: this.editExecutionDItem.id, tabID: this.dependentStartupTab})
                this.$nextTick(() => {
                    EventBus.$emit('Element-open', false, endLineContext)
                    this.newLine(this.element.uuid+'/edcontext-'+n+'-'+this.element.dependent[this.dependentStartupTab].id, this.element.uuid+'/edtable'+this.element.dependent[this.dependentStartupTab].id,
                                 endLineContext, true)
                })
            }

            this.$nextTick(() => {
                if (endLineContext != null && endLineTarget == null) {
                    EventBus.$emit('Element-open', true, endLineContext)
                } else if (endLineContext == null && endLineTarget != null) {
                    EventBus.$emit('Element-open', true, endLineTarget)
                } 
            })
            const addObj = Object.assign({}, this.editExecutionDItem)
            this.element.dependent[this.dependentStartupTab].execution.push(addObj)
            this.refExecution = n
            this.cancelExecutionD()
        },
        setCMSelect() {
            if (this.isEditingCM == true) { 
                if (this.editExecutionDItem.contextMode != null && this.editExecutionDItem.contextMode.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editExecutionDItem.contextMode.uuid, element: constant.Machine_str} )
                    // document.getElementById(this.editExecutionDItem.contextMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editExecutionDItem.contextMode.uuid)
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
                    // document.getElementById(this.editExecutionDItem.targetMode.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editExecutionDItem.targetMode.uuid)
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
                this.$store.commit('deletConnectionline', {startnum: linenum} )
                this.deleteOpenElement()
            }
        },
        deleteOpenElement() {
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
            this.editARXML.logLevel = this.element.logLevel
            this.editARXML.logPath = this.element.logPath
            this.editARXML.logProDesc = this.element.logProDesc
            this.editARXML.logProID = this.element.logProID
            this.editARXML.restart = this.element.restart
            this.editARXML.preMapping = this.element.preMapping
            this.editARXML.prodesign = this.element.prodesign
            this.editARXML.determin = this.element.determin
            this.editARXML.execut = this.element.execut
            this.editARXML.machinname = this.element.machinname
            this.editARXML.machinetype = this.element.machinetype
            this.editARXML.logMode = JSON.parse(JSON.stringify(this.element.logMode))
            this.editARXML.dependent = JSON.parse(JSON.stringify(this.element.dependent))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editProcess', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.logPath = this.editARXML.logPath
            this.element.logProDesc = this.editARXML.logProDesc
            this.element.logProID = this.editARXML.logProID
            this.element.restart = this.editARXML.restart
            this.element.preMapping = this.editARXML.preMapping
            this.element.machinname = this.editARXML.machinname

            this.editARXML.logLevel = this.editARXML.logLevel.toUpperCase()
            if(this.editARXML.logLevel == 'FATAL' || this.editARXML.logLevel == 'ERROR' || this.editARXML.logLevel == 'WARN' 
               || this.editARXML.logLevel == 'INFO' || this.editARXML.logLevel == 'DEBUG' || this.editARXML.logLevel == 'VERBOSE') {
                this.element.logLevel = this.editARXML.logLevel
            }

            var endLine = null, changEndLine = null

            if (this.editARXML.prodesign != this.element.prodesign) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processprodesign')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/processprodesign')
                }
                changEndLine = this.$store.getters.getProcessDesignPath(this.editARXML.prodesign)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/processprodesign', this.element.uuid+'/processprodesign', changEndLine, false)
                }
            }
            this.element.prodesign = this.editARXML.prodesign

            if (this.editARXML.determin != this.element.determin) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processdetermin')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/processdetermin')
                }
                changEndLine = this.$store.getters.getDeterministicClientPath(this.editARXML.determin)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/processdetermin', this.element.uuid+'/processdetermin', changEndLine, false)
                }
            }
            this.element.determin = this.editARXML.determin

            if (this.editARXML.execut != this.element.execut) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processexecut')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/processexecut')
                }
                changEndLine = this.$store.getters.getExecutablePath(this.editARXML.execut)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/processexecut', this.element.uuid+'/processexecut', changEndLine, false)
                }
            }
            this.element.execut = this.editARXML.execut

            if (this.editARXML.machinetype != this.element.machinetype) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processmodedeclar')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/processmodedeclar')
                }
                changEndLine = this.$store.getters.getModeDeclarationPath(this.editARXML.machinetype, 0)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/processmodedeclar', this.element.uuid+'/processmodedeclar', changEndLine, false)
                }
            }
            this.element.machinetype = this.editARXML.machinetype

            if (this.editARXML.dependent.length > 0) {
                this.editARXML.dependent.forEach(item => {
                    item.execution.forEach(data => {
                        var isHaveTableC = false, isHaveTableT = false
                        this.element.dependent.forEach(dep => {
                            dep.execution.forEach(exe => {
                                if (exe.id == data.id) {
                                    if (exe.contextMode == data.contextMode) {
                                        isHaveTableC = true
                                    }
                                    if (exe.targetMode == data.targetMode) {
                                        isHaveTableT = true
                                    }
                                }
                            })
                        })
                        if (!isHaveTableC) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getMachinePath(data.contextMode, 2)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id, this.element.uuid+'/processStarupC', changEndLine, false)
                            }
                        }
                        if (!isHaveTableT) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getModeDeclarationPath(data.targetMode, 1)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id, this.element.uuid+'/processStarupC', changEndLine, false)
                            }
                        }
                    })
                    item.functionItem.forEach(data => {
                        var isHaveTableC = false, isHaveTableT = false
                        this.element.dependent.forEach(dep => {
                            dep.functionItem.forEach(fun => {
                                if (fun.id == data.id ) {
                                    if (fun.contextMode == data.contextMode) {
                                        isHaveTableC = true
                                    }
                                    if (fun.targetMode == data.targetMode) {
                                        isHaveTableT = true
                                    }
                                }
                            })
                        })
                        if (!isHaveTableC) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getMachinePath(data.contextMode, 2)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id, this.element.uuid+'/processStarupC', changEndLine, false)
                            }
                        }
                        if (!isHaveTableT) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getModeDeclarationPath(data.targetMode, 1)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id, this.element.uuid+'/processStarupC', changEndLine, false)
                            }
                        }
                    })
                    var isHaveTableR = false, isHaveTableS = false
                    this.element.dependent.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.resourceRef == item.resourceRef) {
                                isHaveTableR = true
                            }
                            if (ele.startupConfigRef == item.startupConfigRef) {
                                isHaveTableS = true
                            }
                        }
                    })
                    if (!isHaveTableR) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/processresorce-'+item.id)
                        }
                        changEndLine = this.$store.getters.getMachinePath(item.resourceRef, 1)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/processresorce-'+item.id, this.element.uuid+'/processStarupC', changEndLine, false)
                        }
                    }
                    if (!isHaveTableS) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/processstartup-'+item.id)
                        }
                        changEndLine = this.$store.getters.getStartupConfigPath(item.startupConfigRef)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/processstartup-'+item.id, this.element.uuid+'/processStarupC', changEndLine, false)
                        }
                    }
                })
                this.element.dependent.forEach(item => {
                    var isHaveTable = false
                    item.execution.forEach(data => {
                        isHaveTable = false
                        this.editARXML.dependent.forEach(edit => {
                            edit.execution.forEach(editA => {
                                if (editA.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.contextMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.targetMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    item.functionItem.forEach(data => {
                        isHaveTable = false
                        this.editARXML.dependent.forEach(edit => {
                            edit.functionItem.forEach(editE => {
                                if (editE.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.contextMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.targetMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    isHaveTable = false
                    this.editARXML.dependent.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.resourceRef != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/processresorce-'+item.id)
                            }
                        }
                        if (item.startupConfigRef != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/processstartup-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.dependent.length > 0) {
                    this.element.dependent.forEach(item => {
                        item.execution.forEach(data => {
                            if (data.contextMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/edcontext-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.targetMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/edtarget-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        item.functionItem.forEach(data => {
                            if (data.contextMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.targetMode != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        if (item.resourceRef != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processresorce-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/processresorce-'+item.id)
                            }
                        }
                        if (item.startupConfigRef != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/processstartup-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/processstartup-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.dependent = JSON.parse(JSON.stringify(this.editARXML.dependent))

            for(let i=0; i<this.editARXML.logMode.length; i++) {
                if (!(this.editARXML.logMode[i] == 'CONSOLE' || this.editARXML.logMode[i] == 'FILE' ||
                    this.editARXML.logMode[i] == 'NETWORK')) {
                        this.editARXML.logMode.splice(i ,1)
                }
            }
            this.element.logMode = JSON.parse(JSON.stringify(this.editARXML.logMode))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                    prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []}
            this.editTextDependent = {execution: [], functionItem: [], resourceRef: null, startupConfigRef: null, id: ''}
            this.editTextExecution = {contextMode: null, targetMode: null, id: ''}
            this.editTextFunction = {contextMode: null, targetMode: null, id: ''}
            this.dialogText = false
        },
        newTextDependent() {
            this.editTextDependent = {execution: [], functionItem: [], resourceRef: null, startupConfigRef: null, id: ''}
            let res = true, n = 0
            while (res) {
                 n++;
                res = this.editARXML.dependent.some(item => item.id === n)
            }
            this.editTextDependent.id = n

            const addObj = Object.assign({}, this.editTextDependent)
            this.editARXML.dependent.push(addObj);
        },
        deletTextDependent(idx) {
            this.editARXML.dependent.splice(idx,1)
        },
        newTextExecution(idxD) {
            this.editTextExecution = {contextMode: null, targetMode: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.dependent[idxD].execution.some(item => item.id === n)
            }
            this.editTextExecution.id = n

            const addObj = Object.assign({}, this.editTextExecution)
            this.editARXML.dependent[idxD].execution.push(addObj);
        },
        deletTextExecution(idx, idxD) {
            this.editARXML.dependent[idxD].execution.splice(idx,1)
        },
        newTextFunction(idxD) {
            this.editTextFunction = {contextMode: null, targetMode: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.dependent[idxD].functionItem.some(item => item.id === n)
            }
            this.editTextFunction.id = n

            const addObj = Object.assign({}, this.editTextFunction)
            this.editARXML.dependent[idxD].functionItem.push(addObj);
        },
        deletTextFunction(idx, idxD) {
            this.editARXML.dependent[idxD].functionItem.splice(idx,1)
        },
        newTextLogMode() {
            if (this.editARXML.logMode.length < 3) {
                this.editARXML.logMode.push('')
            }
        },
        deletTextLogMode(idx) {
            this.editARXML.logMode.splice(idx,1)
        }

    },
}
</script>
