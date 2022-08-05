<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn  icon @click="showSoftwareCluster">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Software Cluster</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Software Cluster</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSoftwareClusterName' outlined dense></v-text-field>
                            <v-text-field v-model="element.category" label="Category" placeholder="string" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.idVendor" label="Vendor ID" placeholder="Integer" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.version" label="Version" placeholder="string" style="height: 45px;"  outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px">
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
                                            :show-select="isdeleteSDGSItem" item-key="id" height="140px" dense hide-default-footer >
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
                                                                <v-select v-model="editSDGSItem.sdg" :items="selSDG" label="SDG" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editSDGSItem.sd" label="SD" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                                <v-select v-model="editSDGSItem.sdg" :items="selSDG" label="SDG" @click="setactiveUUID()" outlined dense style="height: 45px;"></v-select>
                                                                <v-text-field v-model="editSDGSItem.sd" label="SD" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                <div class="subtitle-2" :id="element.uuid+'/SCExecutable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showExecutable" x-small color="indigo">
                                            <v-icon>{{ isExecutableOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Contained AR Element Refs
                                    <v-btn @click="isCheckExecutable" text x-small color="indigo" v-if="isExecutableOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isExecutableOpenClose && isdeleteExecutableItem" @click="deletExecutable" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isExecutableOpenClose">
                                    <v-data-table v-model="selectDelectExecutable" :headers="headerExecutable" :items="element.executable" :items-per-page='20'
                                            :show-select="isdeleteExecutableItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteExecutableItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editExecutable(idx)" @open="openExecutable(idx)" @save="cancelExecutable" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editExecutableItem.execut' label='Contained AR Element Ref' :items='selExecutable' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingExecutable" clearable @click="setExecutableSelect()" 
                                                                            @click:clear='clearExecutableRef' @blur="isEditingExecutable=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newExecutable">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addExecutable()" @save="cancelExecutable"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editExecutableItem.execut' label='Contained AR Element Ref' :items='selExecutable' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingExecutable" clearable @click="setExecutableSelect()" 
                                                                            @click:clear='clearExecutableRef' @blur="isEditingExecutable=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newExecutable">
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
                                <div class="subtitle-2" :id="element.uuid+'/SCMachineD'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showMachineD" x-small color="indigo">
                                            <v-icon>{{ isMachineDOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Contained Fibex Element Refs
                                    <v-btn @click="isCheckMachineD" text x-small color="indigo" v-if="isMachineDOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isMachineDOpenClose && isdeleteMachineDItem" @click="deletMachineD" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isMachineDOpenClose">
                                    <v-data-table v-model="selectDelectMachineD" :headers="headerMachineD" :items="element.machineD" :items-per-page='20'
                                            :show-select="isdeleteMachineDItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteMachineDItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editMachineD(idx)" @open="openMachineD(idx)" @save="cancelMachineD" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editMachineDItem.machine' label='Contained Fibex Element Ref' :items='selMachineD' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingMachineD" clearable @click="setMachineDSelect()" 
                                                                            @click:clear='clearMachineDRef' @blur="isEditingMachineD=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newMachineD">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addMachineD()" @save="cancelMachineD"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editMachineDItem.machine' label='Contained Fibex Element Ref' :items='selMachineD' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingMachineD" clearable @click="setMachineDSelect()" 
                                                                            @click:clear='clearMachineDRef' @blur="isEditingMachineD=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newMachineD">
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
                                <div class="subtitle-2" :id="element.uuid+'/SCtoMachine'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showToMachineM" x-small color="indigo">
                                            <v-icon>{{ isToMachineMOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Contained Package Element Refs
                                    <v-btn @click="isCheckToMachineM" text x-small color="indigo" v-if="isToMachineMOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isToMachineMOpenClose && isdeleteToMachineMItem" @click="deletToMachineM" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isToMachineMOpenClose">
                                    <v-data-table v-model="selectDelectToMachineM" :headers="headerToMachineM" :items="element.toMachine" :items-per-page='20'
                                            :show-select="isdeleteToMachineMItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteToMachineMItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editToMachineM(idx)" @open="openToMachineM(idx)" @save="cancelToMachineM" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editToMachineMItem.mapping' label='Contained Package Element Ref' :items='selToMachineM' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingToMachineM" clearable @click="setToMachineMSelect()" 
                                                                            @click:clear='clearToMachineMRef' @blur="isEditingToMachineM=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newToMachineM">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addToMachineM()" @save="cancelToMachineM"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editToMachineMItem.mapping' label='Contained Package Element Ref' :items='selToMachineM' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingToMachineM" clearable @click="setToMachineMSelect()" 
                                                                            @click:clear='clearToMachineMRef' @blur="isEditingToMachineM=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newToMachineM">
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
                                <div class="subtitle-2" :id="element.uuid+'/SCProcess'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showProcess" x-small color="indigo">
                                            <v-icon>{{ isProcessOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Contained Process Refs
                                    <v-btn @click="isCheckProcess" text x-small color="indigo" v-if="isProcessOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isProcessOpenClose && isdeleteProcessItem" @click="deletProcess" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isProcessOpenClose">
                                    <v-data-table v-model="selectDelectProcess" :headers="headerProcess" :items="element.process" :items-per-page='20'
                                            :show-select="isdeleteProcessItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteProcessItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editProcess(idx)" @open="openProcess(idx)" @save="cancelProcess" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editProcessItem.pro' label='Contained Process Ref' :items='selProcess' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingProcess" clearable @click="setProcessSelect()" 
                                                                            @click:clear='clearProcessRef' @blur="isEditingProcess=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newProcess">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addProcess()" @save="cancelProcess"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editProcessItem.pro' label='Contained Process Ref' :items='selProcess' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingProcess" clearable @click="setProcessSelect()" 
                                                                            @click:clear='clearProcessRef' @blur="isEditingProcess=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newProcess">
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
                                <div class="subtitle-2" :id="element.uuid+'/SCswc'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showSWCluster" x-small color="indigo">
                                            <v-icon>{{ isSWClusterOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Sub Software Cluster Refs
                                    <v-btn @click="isCheckSWCluster" text x-small color="indigo" v-if="isSWClusterOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isSWClusterOpenClose && isdeleteSWClusterItem" @click="deletSWCluster" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isSWClusterOpenClose">
                                    <v-data-table v-model="selectDelectSWCluster" :headers="headerSWCluster" :items="element.sswc" :items-per-page='20'
                                            :show-select="isdeleteSWClusterItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteSWClusterItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @cancel="editSWCluster(idx)" @open="openSWCluster(idx)" @save="cancelSWCluster" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSWClusterItem.swc' label='Sub Software Cluster Ref' :items='selSWCluster' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingSWCluster" clearable @click="setSWClusterSelect()" 
                                                                            @click:clear='clearSWClusterRef' @blur="isEditingSWCluster=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newSWCluster">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addSWCluster()" @save="cancelSWCluster"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon>mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editSWClusterItem.swc' label='Sub Software Cluster Ref' :items='selSWCluster' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingSWCluster" clearable @click="setSWClusterSelect()" 
                                                                            @click:clear='clearSWClusterRef' @blur="isEditingSWCluster=true" outlined dense style="height: 45px;">
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newSWCluster">
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
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogPath: false,
            isSDGSOpenClose: true,
            isdeleteSDGSItem: false,
            selectDelectSDGS: [],
            headerSDGS: [
                { text: 'SDG', align: 'start', sortable: false, value: 'sdg' },
                { text: 'SD', align: 'start', sortable: false, value: 'sd' },
            ],
            editSDGSItem: { sdg: null, sd : null, id: ''},
            selSDG: ["R20-11-CATEGORY", "LICENSES"],

            isExecutableOpenClose: true,
            isEditingExecutable: true,
            isdeleteExecutableItem: false,
            selectDelectExecutable: [],
            selExecutable: this.$store.getters.getExecutable,
            headerExecutable: [
                { text: 'Contained AR Element Ref', align: 'start', sortable: false, value: 'execut' },
            ],
            editExecutableItem: { execut : null, id:''},
            deleteChangeLineExecutable : [],

            isMachineDOpenClose: true,
            isEditingMachineD: true,
            isdeleteMachineDItem: false,
            selectDelectMachineD: [],
            selMachineD: this.$store.getters.getMachineDesign,
            headerMachineD: [
                { text: 'Contained Fibex Element Ref', align: 'start', sortable: false, value: 'machine' },
            ],
            editMachineDItem: { machine : null, id:''},
            deleteChangeLineMachineD : [],

            isToMachineMOpenClose: true,
            isEditingToMachineM: true,
            isdeleteToMachineMItem: false,
            selectDelectToMachineM: [],
            selToMachineM: this.$store.getters.getSomeIPToMachineMapping,
            headerToMachineM: [
                { text: 'Contained Package Element Ref', align: 'start', sortable: false, value: 'mapping' },
            ],
            editToMachineMItem: { mapping : null, id:''},
            deleteChangeLineToMachineM : [],

            isProcessOpenClose: true,
            isEditingProcess: true,
            isdeleteProcessItem: false,
            selectDelectProcess: [],
            selProcess: this.$store.getters.getProcess,
            headerProcess: [
                { text: 'Contained Process Ref', align: 'start', sortable: false, value: 'pro' },
            ],
            editProcessItem: { pro : null, id:''},
            deleteChangeLineProcess : [],

            isSWClusterOpenClose: true,
            isEditingSWCluster: true,
            isdeleteSWClusterItem: false,
            selectDelectSWCluster: [],
            selSWCluster: this.$store.getters.getSWCluster,
            headerSWCluster: [
                { text: 'Sub Software Cluster Ref', align: 'start', sortable: false, value: 'swc' },
            ],
            editSWClusterItem: { swc : null, id:''},
            deleteChangeLineSWCluster : [],


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
        showSoftwareCluster () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
            })
        },
        showSDGS() {
            this.isSDGSOpenClose = this.isSDGSOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showExecutable() {
            this.isExecutableOpenClose = this.isExecutableOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showMachineD() {
            this.isMachineDOpenClose = this.isMachineDOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showToMachineM() {
            this.isToMachineMOpenClose = this.isToMachineMOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showProcess() {
            this.isProcessOpenClose = this.isProcessOpenClose ? false : true
        },
        showSWCluster() {
            this.isSWClusterOpenClose = this.isSWClusterOpenClose ? false : true
        },

        inputSoftwareClusterName () {
            this.$store.commit('editSoftWareCluster', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
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
            this.element.sdgs[idx].sdg = this.editSDGSItem.sdg
            this.element.sdgs[idx].sd = this.editSDGSItem.sd
            this.cancelSDGS()
        },
        cancelSDGS() {
            this.editSDGSItem.sdg = null
            this.editSDGSItem.sd = null
            this.editSDGSItem.id = ''
            this.setactiveUUID()
        },
        openSDGS(idx) {
            this.editSDGSItem.sdg = this.element.sdgs[idx].sdg
            this.editSDGSItem.sd =  this.element.sdgs[idx].sd
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

        isCheckExecutable() {
            if (this.isdeleteExecutableItem == true) {
                this.isdeleteExecutableItem = false
                this.selectDelectExecutable = []
            } else {
                this.isdeleteExecutableItem = true
            }
        },
        deletExecutable() {
            if (this.isdeleteExecutableItem == true) {
                for(let i=0; i<this.element.executable.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCExecutable-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineExecutable.push({id:this.element.executable[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/SCExecutable-'+i)
                    }
                }

                this.element.executable = this.element.executable.filter(item => {
                        return this.selectDelectExecutable.indexOf(item) < 0 })

                for(let n=0; n<this.element.executable.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineExecutable.length; idx++) {
                        if (this.element.executable[n].id == this.deleteChangeLineExecutable[idx].id) {
                            this.newLine(this.element.uuid+'/SCExecutable-'+n, this.element.uuid+'/SCExecutable', this.deleteChangeLineExecutable[idx].endLine)
                        }
                    }
                }

                this.isdeleteExecutableItem = false
                this.selectDelectExecutable = []
                this.deleteChangeLineExecutable = []
            } 
        },
        openExecutable(idx) {
            this.selExecutable = this.$store.getters.getExecutable
            if ( this.element.executable[idx].execut != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCExecutable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.executable[idx].execut)
                }
                this.editExecutableItem.execut = { name: this.element.executable[idx].execut, uuid: endLine }
            }
        },
        editExecutable(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCExecutable-'+idx)
            if (endLine != undefined && this.editExecutableItem.execut == null) {
                this.deleteLine(this.element.uuid+'/SCExecutable-'+idx)
                this.element.executable[idx].execut = null
            } else if (endLine != undefined && endLine != this.editExecutableItem.execut.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/SCExecutable-'+idx)
                this.newLine(this.element.uuid+'/SCExecutable-'+idx, this.element.uuid+'/SCExecutable', this.editExecutableItem.execut.uuid)
                this.element.executable[idx].execut = this.editExecutableItem.execut.name
            } else if (endLine == undefined && this.editExecutableItem.execut != null) {
                this.newLine(this.element.uuid+'/SCExecutable-'+idx, this.element.uuid+'/SCExecutable', this.editExecutableItem.execut.uuid)
                this.element.executable[idx].execut = this.editExecutableItem.execut.name
            }

            this.cancelExecutable()
        },
        cancelExecutable() {
            this.editExecutableItem.execut = null
            this.setactiveUUID()
        },
        addExecutable() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.executable.some(item => item.id === n)
            }
            this.editExecutableItem.id = n

            if( this.editExecutableItem.execut != null) {
                var datacount = this.element.executable.length
                this.newLine(this.element.uuid+'/SCExecutable-'+datacount, this.element.uuid+'/SCExecutable', this.editExecutableItem.execut.uuid)
                this.editExecutableItem.execut = this.editExecutableItem.execut.name
            }
            const addObj = Object.assign({}, this.editExecutableItem)
            this.element.executable.push(addObj);
            this.cancelExecutable()
        },
        clearExecutableRef() {
            this.isEditingExecutable = true
            this.editExecutableItem.execut = null
        },
        setExecutableSelect() {
            if (this.isEditingExecutable == true) {
                if (this.editExecutableItem.execut != null && this.editExecutableItem.execut.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editExecutableItem.execut.uuid, element: constant.Executable_str} )
                    document.getElementById(this.editExecutableItem.execut.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editExecutableItem.execut.uuid)
                }
                this.setExecutableList()
                this.isEditingExecutable = false
            } else {
                this.isEditingExecutable = true
            }
        },
        setExecutableList() {
            this.selExecutable = this.$store.getters.getExecutable
            this.setactiveUUID()
        },
        newExecutable() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementExecutable', { //applicationtyperef 는 null해줘야한다. clearable하면 값이 null변하기 때문에 
                name: this.$store.getters.getNameExecutable, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                version: '', category:'', buildType:null, loggingBehabior:null, reportingBehabior:null, swname:'', applicationtyperef: null,
            })
            EventBus.$emit('add-element', constant.Executable_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editSoftWareCluster', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckMachineD() {
            if (this.isdeleteMachineDItem == true) {
                this.isdeleteMachineDItem = false
                this.selectDelectMachineD = []
            } else {
                this.isdeleteMachineDItem = true
            }
        },
        deletMachineD() {
            if (this.isdeleteMachineDItem == true) {
                for(let i=0; i<this.element.machineD.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCMachineD-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineMachineD.push({id:this.element.machineD[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/SCMachineD-'+i)
                    }
                }

                this.element.machineD = this.element.machineD.filter(item => {
                        return this.selectDelectMachineD.indexOf(item) < 0 })

                for(let n=0; n<this.element.machineD.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineMachineD.length; idx++) {
                        if (this.element.machineD[n].id == this.deleteChangeLineMachineD[idx].id) {
                            this.newLine(this.element.uuid+'/SCMachineD-'+n, this.element.uuid+'/SCMachineD', this.deleteChangeLineMachineD[idx].endLine)
                        }
                    }
                }

                this.isdeleteMachineDItem = false
                this.selectDelectMachineD = []
                this.deleteChangeLineMachineD = []
            } 
        },
        openMachineD(idx) {
            this.selMachineD = this.$store.getters.getMachineDesign
            if ( this.element.machineD[idx].machine != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCMachineD-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.machineD[idx].machine)
                }
                this.editMachineDItem.machine = { name: this.element.machineD[idx].machine, uuid: endLine }
            }
        },
        editMachineD(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCMachineD-'+idx)
            if (endLine != undefined && this.editMachineDItem.machine == null) {
                this.deleteLine(this.element.uuid+'/SCMachineD-'+idx)
                this.element.machineD[idx].machine = null
            } else if (endLine != undefined && endLine != this.editMachineDItem.machine.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/SCMachineD-'+idx)
                this.newLine(this.element.uuid+'/SCMachineD-'+idx, this.element.uuid+'/SCMachineD', this.editMachineDItem.machine.uuid)
                this.element.machineD[idx].machine = this.editMachineDItem.machine.name
            } else if (endLine == undefined && this.editMachineDItem.machine != null) {
                this.newLine(this.element.uuid+'/SCMachineD-'+idx, this.element.uuid+'/SCMachineD', this.editMachineDItem.machine.uuid)
                this.element.machineD[idx].machine = this.editMachineDItem.machine.name
            }

            this.cancelMachineD()
        },
        cancelMachineD() {
            this.editMachineDItem.machine = null
            this.setactiveUUID()
        },
        addMachineD() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.machineD.some(item => item.id === n)
            }
            this.editMachineDItem.id = n

            if( this.editMachineDItem.machine != null) {
                var datacount = this.element.machineD.length
                this.newLine(this.element.uuid+'/SCMachineD-'+datacount, this.element.uuid+'/SCMachineD', this.editMachineDItem.machine.uuid)
                this.editMachineDItem.machine = this.editMachineDItem.machine.name
            }
            const addObj = Object.assign({}, this.editMachineDItem)
            this.element.machineD.push(addObj);
            this.cancelMachineD()
        },
        clearMachineDRef() {
            this.isEditingMachineD = true
            this.editMachineDItem.machine = null
        },
        setMachineDSelect() {
            if (this.isEditingMachineD == true) {
                if (this.editMachineDItem.machine != null && this.editMachineDItem.machine.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editMachineDItem.machine.uuid, element: constant.MachineDesigne_str} )
                    document.getElementById(this.editMachineDItem.machine.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editMachineDItem.machine.uuid)
                }
                this.setMachineDList()
                this.isEditingMachineD = false
            } else {
                this.isEditingMachineD = true
            }
        },
        setMachineDList() {
            this.selMachineD = this.$store.getters.getMachineDesign
            this.setactiveUUID()
        },
        newMachineD() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementMachineDesign', {
                name: this.$store.getters.getNameMachineDesign, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                access:null, resettimer: '', connector:[], servicediscover:[], 
            })
            EventBus.$emit('add-element', constant.MachineDesigne_str)
            EventBus.$emit('add-element', constant.Machines_str)
            this.$store.commit('editSoftWareCluster', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckToMachineM() {
            if (this.isdeleteToMachineMItem == true) {
                this.isdeleteToMachineMItem = false
                this.selectDelectToMachineM = []
            } else {
                this.isdeleteToMachineMItem = true
            }
        },
        deletToMachineM() {
            if (this.isdeleteToMachineMItem == true) {
                for(let i=0; i<this.element.toMachine.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCtoMachine-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineToMachineM.push({id:this.element.toMachine[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/SCtoMachine-'+i)
                    }
                }

                this.element.toMachine = this.element.toMachine.filter(item => {
                        return this.selectDelectToMachineM.indexOf(item) < 0 })

                for(let n=0; n<this.element.toMachine.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineToMachineM.length; idx++) {
                        if (this.element.toMachine[n].id == this.deleteChangeLineToMachineM[idx].id) {
                            this.newLine(this.element.uuid+'/SCtoMachine-'+n, this.element.uuid+'/SCtoMachine', this.deleteChangeLineToMachineM[idx].endLine)
                        }
                    }
                }

                this.isdeleteToMachineMItem = false
                this.selectDelectToMachineM = []
                this.deleteChangeLineToMachineM = []
            } 
        },
        openToMachineM(idx) {
            this.selToMachineM = this.$store.getters.getSomeIPToMachineMapping
            if ( this.element.toMachine[idx].mapping != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCtoMachine-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.toMachine[idx].mapping)
                }
                this.editToMachineMItem.mapping = { name: this.element.toMachine[idx].mapping, uuid: endLine }
            }
        },
        editToMachineM(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCtoMachine-'+idx)
            if (endLine != undefined && this.editToMachineMItem.mapping == null) {
                this.deleteLine(this.element.uuid+'/SCtoMachine-'+idx)
                this.element.toMachine[idx].mapping = null
            } else if (endLine != undefined && endLine != this.editToMachineMItem.mapping.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/SCtoMachine-'+idx)
                this.newLine(this.element.uuid+'/SCtoMachine-'+idx, this.element.uuid+'/SCtoMachine', this.editToMachineMItem.mapping.uuid)
                this.element.toMachine[idx].mapping = this.editToMachineMItem.mapping.name
            } else if (endLine == undefined && this.editToMachineMItem.mapping != null) {
                this.newLine(this.element.uuid+'/SCtoMachine-'+idx, this.element.uuid+'/SCtoMachine', this.editToMachineMItem.mapping.uuid)
                this.element.toMachine[idx].mapping = this.editToMachineMItem.mapping.name
            }

            this.cancelToMachineM()
        },
        cancelToMachineM() {
            this.editToMachineMItem.mapping = null
            this.setactiveUUID()
        },
        addToMachineM() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.toMachine.some(item => item.id === n)
            }
            this.editToMachineMItem.id = n

            if( this.editToMachineMItem.mapping != null) {
                var datacount = this.element.toMachine.length
                this.newLine(this.element.uuid+'/SCtoMachine-'+datacount, this.element.uuid+'/SCtoMachine', this.editToMachineMItem.mapping.uuid)
                this.editToMachineMItem.mapping = this.editToMachineMItem.mapping.name
            }
            const addObj = Object.assign({}, this.editToMachineMItem)
            this.element.toMachine.push(addObj);
            this.cancelToMachineM()
        },
        clearToMachineMRef() {
            this.isEditingToMachineM = true
            this.editToMachineMItem.mapping = null
        },
        setToMachineMSelect() {
            if (this.isEditingToMachineM == true) {
                if (this.editToMachineMItem.mapping != null && this.editToMachineMItem.mapping.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editToMachineMItem.mapping.uuid, element: constant.SomeIPToMachineMapping_str} )
                    document.getElementById(this.editToMachineMItem.mapping.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editToMachineMItem.mapping.uuid)
                }
                this.setToMachineMList()
                this.isEditingToMachineM = false
            } else {
                this.isEditingToMachineM = true
            }
        },
        setToMachineMList() {
            this.selToMachineM = this.$store.getters.getSomeIPToMachineMapping
            this.setactiveUUID()
        },
        newToMachineM() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementSomeIPtoMachine', {
                name: this.$store.getters.getNameSomeIPtoMachine, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                ccref: null, siref: null, tcp:'', udp: '',
            })
            EventBus.$emit('add-element', constant.SomeIPToMachineMapping_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSoftWareCluster', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckProcess() {
            if (this.isdeleteProcessItem == true) {
                this.isdeleteProcessItem = false
                this.selectDelectProcess = []
            } else {
                this.isdeleteProcessItem = true
            }
        },
        deletProcess() {
            if (this.isdeleteProcessItem == true) {
                for(let i=0; i<this.element.process.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCProcess-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineProcess.push({id:this.element.process[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/SCProcess-'+i)
                    }
                }

                this.element.process = this.element.process.filter(item => {
                        return this.selectDelectProcess.indexOf(item) < 0 })

                for(let n=0; n<this.element.process.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineProcess.length; idx++) {
                        if (this.element.process[n].id == this.deleteChangeLineProcess[idx].id) {
                            this.newLine(this.element.uuid+'/SCProcess-'+n, this.element.uuid+'/SCProcess', this.deleteChangeLineProcess[idx].endLine)
                        }
                    }
                }

                this.isdeleteProcessItem = false
                this.selectDelectProcess = []
                this.deleteChangeLineProcess = []
            } 
        },
        openProcess(idx) {
            this.selProcess = this.$store.getters.getProcess
            if ( this.element.process[idx].pro != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCProcess-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getProcessPath(this.element.process[idx].pro)
                }
                this.editProcessItem.pro = { name: this.element.process[idx].pro, uuid: endLine }
            }
        },
        editProcess(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCProcess-'+idx)
            if (endLine != undefined && this.editProcessItem.pro == null) {
                this.deleteLine(this.element.uuid+'/SCProcess-'+idx)
                this.element.process[idx].pro = null
            } else if (endLine != undefined && endLine != this.editProcessItem.pro.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/SCProcess-'+idx)
                this.newLine(this.element.uuid+'/SCProcess-'+idx, this.element.uuid+'/SCProcess', this.editProcessItem.pro.uuid)
                this.element.process[idx].pro = this.editProcessItem.pro.name
            } else if (endLine == undefined && this.editProcessItem.pro != null) {
                this.newLine(this.element.uuid+'/SCProcess-'+idx, this.element.uuid+'/SCProcess', this.editProcessItem.pro.uuid)
                this.element.process[idx].pro = this.editProcessItem.pro.name
            }

            this.cancelProcess()
        },
        cancelProcess() {
            this.editProcessItem.pro = null
            this.setactiveUUID()
        },
        addProcess() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.process.some(item => item.id === n)
            }
            this.editProcessItem.id = n

            if( this.editProcessItem.pro != null) {
                var datacount = this.element.process.length
                this.newLine(this.element.uuid+'/SCProcess-'+datacount, this.element.uuid+'/SCProcess', this.editProcessItem.pro.uuid)
                this.editProcessItem.pro = this.editProcessItem.pro.name
            }
            const addObj = Object.assign({}, this.editProcessItem)
            this.element.process.push(addObj);
            this.cancelProcess()
        },
        clearProcessRef() {
            this.isEditingProcess = true
            this.editProcessItem.pro = null
        },
        setProcessSelect() {
            if (this.isEditingProcess == true) {
                if (this.editProcessItem.pro != null && this.editProcessItem.pro.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editProcessItem.pro.uuid, element: constant.Process_str} )
                    document.getElementById(this.editProcessItem.pro.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editProcessItem.pro.uuid)
                }
                this.setProcessList()
                this.isEditingProcess = false
            } else {
                this.isEditingProcess = true
            }
        },
        setProcessList() {
            this.selProcess = this.$store.getters.getProcess
            this.setactiveUUID()
        },
        newProcess() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementProcess', {
                name: this.$store.getters.getNameProcess, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                logLevel: null, logPath: '', logProDesc: '', logProID: '', restart: '', preMapping: null, logMode: [],
                prodesign: null, determin: null, execut: null, machinname: '', machinetype: null, dependent: []
            })
            EventBus.$emit('add-element', constant.Process_str)
            EventBus.$emit('add-element', constant.AdaptiveApplication_str)
            this.$store.commit('editSoftWareCluster', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckSWCluster() {
            if (this.isdeleteSWClusterItem == true) {
                this.isdeleteSWClusterItem = false
                this.selectDelectSWCluster = []
            } else {
                this.isdeleteSWClusterItem = true
            }
        },
        deletSWCluster() {
            if (this.isdeleteSWClusterItem == true) {
                for(let i=0; i<this.element.sswc.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCswc-'+i)
                    if(endLine != undefined) {
                        this.deleteChangeLineSWCluster.push({id:this.element.sswc[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/SCswc-'+i)
                    }
                }

                this.element.sswc = this.element.sswc.filter(item => {
                        return this.selectDelectSWCluster.indexOf(item) < 0 })

                for(let n=0; n<this.element.sswc.length; n++) {
                    for(let idx=0; idx<this.deleteChangeLineSWCluster.length; idx++) {
                        if (this.element.sswc[n].id == this.deleteChangeLineSWCluster[idx].id) {
                            this.newLine(this.element.uuid+'/SCswc-'+n, this.element.uuid+'/SCswc', this.deleteChangeLineSWCluster[idx].endLine)
                        }
                    }
                }

                this.isdeleteSWClusterItem = false
                this.selectDelectSWCluster = []
                this.deleteChangeLineSWCluster = []
            } 
        },
        openSWCluster(idx) {
            this.selSWCluster = this.$store.getters.getSWCluster
            if ( this.element.sswc[idx].swc != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCswc-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSWClusterPath(this.element.sswc[idx].swc)
                }
                this.editSWClusterItem.swc = { name: this.element.sswc[idx].swc, uuid: endLine }
            }
        },
        editSWCluster(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/SCswc-'+idx)
            if (endLine != undefined && this.editSWClusterItem.swc == null) {
                this.deleteLine(this.element.uuid+'/SCswc-'+idx)
                this.element.sswc[idx].swc = null
            } else if (endLine != undefined && endLine != this.editSWClusterItem.swc.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/SCswc-'+idx)
                this.newLine(this.element.uuid+'/SCswc-'+idx, this.element.uuid+'/SCswc', this.editSWClusterItem.swc.uuid)
                this.element.sswc[idx].swc = this.editSWClusterItem.swc.name
            } else if (endLine == undefined && this.editSWClusterItem.swc != null) {
                this.newLine(this.element.uuid+'/SCswc-'+idx, this.element.uuid+'/SCswc', this.editSWClusterItem.swc.uuid)
                this.element.sswc[idx].swc = this.editSWClusterItem.swc.name
            }

            this.cancelSWCluster()
        },
        cancelSWCluster() {
            this.editSWClusterItem.swc = null
            this.setactiveUUID()
        },
        addSWCluster() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.sswc.some(item => item.id === n)
            }
            this.editSWClusterItem.id = n

            if( this.editSWClusterItem.swc != null) {
                var datacount = this.element.sswc.length
                this.newLine(this.element.uuid+'/SCswc-'+datacount, this.element.uuid+'/SCswc', this.editSWClusterItem.swc.uuid)
                this.editSWClusterItem.swc = this.editSWClusterItem.swc.name
            }
            const addObj = Object.assign({}, this.editSWClusterItem)
            this.element.sswc.push(addObj);
            this.cancelSWCluster()
        },
        clearSWClusterRef() {
            this.isEditingSWCluster = true
            this.editSWClusterItem.swc = null
        },
        setSWClusterSelect() {
            if (this.isEditingSWCluster == true) {
                if (this.editSWClusterItem.swc != null && this.editSWClusterItem.swc.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSWClusterItem.swc.uuid, element: constant.SWCluster_str} )
                    document.getElementById(this.editSWClusterItem.swc.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSWClusterItem.swc.uuid)
                }
                this.setSWClusterList()
                this.isEditingSWCluster = false
            } else {
                this.isEditingSWCluster = true
            }
        },
        setSWClusterList() {
            this.selSWCluster = this.$store.getters.getSWCluster
            this.setactiveUUID()
        },
        newSWCluster() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementSoftWareCluster', {
                name: this.$store.getters.getNameSoftWareCluster, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                category: '', inVendor: '', version: '', sdgs: [], executable: [], machineD: [], toMachine: [], process: [], sswc: [],
            })
            this.$store.commit('editSoftWareCluster', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSoftWareCluster', {compo:"z", uuid:this.element.uuid, zindex:10} )
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