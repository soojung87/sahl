<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showSWComponent">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>SW Component Type</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SW Component Type</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose || isDatailView">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSWComponentName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/pport'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showPPort" x-small color="indigo">
                                            <v-icon>{{ isPPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    P Port Prototype
                                    <v-btn v-if="isPPortOpenClose" @click="addPport()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isPPortOpenClose">
                                    <v-tabs v-model='PportTab' height="30px" show-arrows @change="changePportTab()">
                                        <v-tab v-for="(tab, idx) in element.pport" :key="idx" @click="clickPporttab()"> 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deletePport(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="PportTab">
                                        <v-tab-item v-for="(tab, idx) in element.pport" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputPportName(tab.name)" @click="clickPportName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-select v-model="tab.selectI" :items="selectPInterfaceList" @change="inputSelectPInterf" @click="[clickOtherFields(),setactiveUUID()]" clearable @click:clear='clearPInterface()' label="Select Provided Interface" outlined dense style="height: 45px;"></v-select>
                                                    <v-row>
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.interface" readonly @click="setPInterfaceSelect()" :style="refPInterfase ? 'height: 43px;border:solid red 2px' : ''" 
                                                                         clearable @click:clear='clearPInterface()' label="Interface TReference" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-menu>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/PPortI-'+tab.id" icon v-bind="attrs" v-on="on" @click="setPInterfaceList()">
                                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-list v-if="tab.selectI != null">
                                                                    <v-list-item v-for="(item, i) in selPInterface" :key="i" link @click="setPInterface(item)">
                                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                    </v-list-item>
                                                                    <v-btn outlined color="indigo" dense text small block @click="newPInterface" >
                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                    </v-btn>
                                                                </v-list>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                    <v-card outlined class="mx-auto">
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/pportQSC-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showPQSC" x-small color="indigo">
                                                                    <v-icon>{{ isPQSCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Queued Sender Com Spec
                                                            <v-btn @click="isCheckPQSC" text x-small color="indigo" v-if="isPQSCOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isPQSCOpenClose && isdeletePQSC" @click="deletePQSC" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isPQSCOpenClose">
                                                            <v-data-table v-model="selectDelectPQSC" :headers="headerPQSC" :items="tab.queued" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeletePQSC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeletePQSC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refPQueued === item.id ? 'red' : null " @click="rowPQueuedClick(num)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openPQSC(num)" @cancel="cancelPQSC" @save="editPQSCItem(num)" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editPQSC.dataE' label='Data Element Reference' :items='selSIEvent' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingPQSC" clearable @click="setPQSCSelect()" 
                                                                                            @click:clear='clearPQSC' @blur="isEditingPQSC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editPQSC.senderCapa" :items="selectSenderCapa" clearable @click:clear='editPQSC.senderCapa = null' label="Sender Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelPQSC" @save="addPQSC()"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editPQSC.dataE' label='Data Element Reference' :items='selSIEvent' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingPQSC" clearable @click="setPQSCSelect()" 
                                                                                            @click:clear='clearPQSC' @blur="isEditingPQSC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editPQSC.senderCapa" :items="selectSenderCapa" clearable @click:clear='editPQSC.senderCapa = null' label="Sender Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/pportFSC-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showPFSC" x-small color="indigo">
                                                                    <v-icon>{{ isPFSCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Field Sender Com Specs
                                                            <v-btn @click="isCheckPFSC" text x-small color="indigo" v-if="isPFSCOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isPFSCOpenClose && isdeletePFSC" @click="deletePFSC" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isPFSCOpenClose">
                                                            <v-data-table v-model="selectDelectPFSC" :headers="headerPFSC" :items="tab.field" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeletePFSC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeletePFSC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refPFieldS === item.id ? 'red' : null " @click="rowPFieldSClick(num)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openPFSC(num)" @cancel="cancelPFSC" @save="editPFSCItem(num)" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editPFSC.dataE' label='Data Element Reference' :items='selSIField' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingPFSC" clearable @click="setPFSCSelect()" 
                                                                                            @click:clear='clearPFSC' @blur="isEditingPFSC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="clearPFSC.senderCapa" :items="selectSenderCapa" clearable @click:clear='clearPFSC.senderCapa = null' label="Sender Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelPFSC" @save="addPFSC()"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editPFSC.dataE' label='Data Element Reference' :items='selSIField' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingPFSC" clearable @click="setPFSCSelect()" 
                                                                                            @click:clear='clearPFSC' @blur="isEditingPFSC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editPFSC.senderCapa" :items="selectSenderCapa" clearable @click:clear='editPFSC.senderCapa = null' label="Sender Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/pportSC-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showSC" x-small color="indigo">
                                                                    <v-icon>{{ isSCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Server Com Specs
                                                            <v-btn @click="isCheckSC" text x-small color="indigo" v-if="isSCOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isSCOpenClose && isdeleteSC" @click="deleteSC" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isSCOpenClose">
                                                            <v-data-table v-model="selectDelectSC" :headers="headerSC" :items="tab.server" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeleteSC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteSC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refPServerC === item.id ? 'red' : null " @click="rowPServerCClick(num)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openSC(num)" @cancel="cancelSC" @save="editSCItem(num)" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editSC.oper' label='Data Element Reference' :items='selSIMethod' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingSC" clearable @click="setSCSelect()" 
                                                                                            @click:clear='clearSC' @blur="isEditingSC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelSC" @save="addSC()"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editSC.oper' label='Data Element Reference' :items='selSIMethod' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingSC" clearable @click="setSCSelect()" 
                                                                                            @click:clear='clearSC' @blur="isEditingSC=true" outlined dense style="height: 45px;">
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
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/prport'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showPRPort" x-small color="indigo">
                                            <v-icon>{{ isPRPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    PR Port Prototype
                                    <v-btn v-if="isPRPortOpenClose" @click="addPRport()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isPRPortOpenClose">
                                    <v-tabs v-model='PRportTab' height="30px" show-arrows @change="changePRportTab()">
                                        <v-tab v-for="(tab, idx) in element.prport" :key="idx" @click="clickPRporttab()"> 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deletePRport(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="PRportTab">
                                        <v-tab-item v-for="(tab, idx) in element.prport" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputPRportName(tab.name)" @click="clickPRportName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-select v-model="tab.selectI" :items="selectPRInterfaceList" @change="inputSelectPRInterf" clearable @click:clear='clearPRInterface()' label="Select Provided Required Interface" @click="[clickOtherFields(),setactiveUUID()]" outlined dense style="height: 45px;"></v-select>
                                                    <v-row>
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.interface" readonly @click="setPRInterfaceSelect()" :style="refPRInterfase ? 'height: 43px;border:solid red 2px' : ''" 
                                                                         clearable @click:clear='clearPRInterface()' label="Interface TReference" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-menu>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/PRPortI-'+tab.id" icon v-bind="attrs" v-on="on" @click="setPRInterfaceList()">
                                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-list v-if="tab.selectI != null">
                                                                    <v-list-item v-for="(item, i) in selPRInterface" :key="i" link @click="setPRInterface(item)">
                                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                    </v-list-item>
                                                                    <v-btn outlined color="indigo" dense text small block @click="newPRInterface" >
                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                    </v-btn>
                                                                </v-list>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                    <v-card outlined class="mx-auto">
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/prporttab-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showPRProvide" x-small color="indigo">
                                                                    <v-icon>{{ isPRProvideOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Provided Com Specs
                                                            <v-btn @click="isCheckPRProvide" text x-small color="indigo" v-if="isPRProvideOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isPRProvideOpenClose && isdeletePRProvide" @click="deletePRProvide" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isPRProvideOpenClose">
                                                            <v-data-table v-model="selectDelectPRProvide" :headers="headerPRProvide" :items="tab.provide" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeletePRProvide" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeletePRProvide" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refPRProvided === item.id ? 'red' : null " @click="rowPRProvidedClick(num)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openPRProvide(num)" @cancel="cancelPRProvide" @save="editPRProvideItem(num)" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editPRProvide.dataE' label='Data Element Reference' :items='selPerData' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingPRProvide" clearable @click="setPRProvideSelect()" 
                                                                                            @click:clear='clearPRProvide' @blur="isEditingPRProvide=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelPRProvide" @save="addPRProvide()"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editPRProvide.dataE' label='Data Element Reference' :items='selPerData' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingPRProvide" clearable @click="setPRProvideSelect()" 
                                                                                            @click:clear='clearPRProvide' @blur="isEditingPRProvide=true" outlined dense style="height: 45px;">
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
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/rport'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showRPort" x-small color="indigo">
                                            <v-icon>{{ isRPortOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    R Port Prototype
                                    <v-btn v-if="isRPortOpenClose" @click="addRport()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isRPortOpenClose">  
                                    <v-tabs v-model='RportTab' height="30px" show-arrows @change="changeRportTab()">
                                        <v-tab v-for="(tab, idx) in element.rport" :key="idx" @click="clickRporttab()"> 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deleteRport(idx)"><v-icon x-small>mdi-close</v-icon></v-btn>
                                        </v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="RportTab">
                                        <v-tab-item v-for="(tab, idx) in element.rport" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputRportName(tab.name)" @click="clickRportName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-select v-model="tab.selectI" :items="selectRInterfaceList" @change="inputSelectRInterf" clearable @click:clear='clearRInterface()' label="Select Required Interface" @click="[clickOtherFields(),setactiveUUID()]" outlined dense style="height: 45px;"></v-select>
                                                    <v-row>
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.interface" readonly @click="setRInterfaceSelect()" :style="refRInterfase ? 'height: 43px;border:solid red 2px' : ''" 
                                                                         clearable @click:clear='clearRInterface()' label="Interface TReference" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-menu>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/RPortI-'+tab.id" icon v-bind="attrs" v-on="on" @click="setRInterfaceList()">
                                                                        <v-icon>mdi-menu-down-outline</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-list v-if="tab.selectI != null">
                                                                    <v-list-item v-for="(item, i) in selRInterface" :key="i" link @click="setRInterface(item)">
                                                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                    </v-list-item>
                                                                    <v-btn outlined color="indigo" dense text small block @click="newRInterface" >
                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                    </v-btn>
                                                                </v-list>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                    <v-card outlined class="mx-auto">
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/rportQRC-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showRQRC" x-small color="indigo">
                                                                    <v-icon>{{ isRQRCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Queued Receiver Com Spec
                                                            <v-btn @click="isCheckRQRC" text x-small color="indigo" v-if="isRQRCOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isRQRCOpenClose && isdeleteRQRC" @click="deleteRQRC" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isRQRCOpenClose">
                                                            <v-data-table v-model="selectDelectRQRC" :headers="headerRQRC" :items="tab.queued" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeleteRQRC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteRQRC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refRQueued === item.id ? 'red' : null " @click="rowRQueuedClick(num)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openRQRC(num)" @cancel="cancelRQRC" @save="editRQRCItem(num)" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-select v-model="editRQRC.select" :items="selectRQRC" clearable @click:clear='clearRQRCSelect()' label="Data Element" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                        <v-autocomplete v-if="editRQRC.select != null" v-model='editRQRC.dataE' label='Data Element Reference' :items='selSIQRC' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingRQRC" clearable @click="setRQRCSelect()" 
                                                                                            @click:clear='clearRQRC' @blur="isEditingRQRC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editRQRC.receiveCapa" :items="selectReceiverCapa" clearable @click:clear='editRQRC.receiveCapa = null' label="Receiver Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelRQRC" @save="addRQRC()"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-select v-model="editRQRC.select" :items="selectRQRC" clearable @click:clear='clearRQRCSelect' label="Data Element" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                        <v-autocomplete v-if="editRQRC.select != null" v-model='editRQRC.dataE' label='Data Element Reference' :items='selSIQRC' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingRQRC" clearable @click="setRQRCSelect()" 
                                                                                            @click:clear='clearRQRC' @blur="isEditingRQRC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editRQRC.receiveCapa" :items="selectReceiverCapa" clearable @click:clear='editRQRC.receiveCapa = null' label="Receiver Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/rportCC-'+tab.id">
                                                            <v-hover v-slot="{ hover }">
                                                                <v-btn text @click="showRCC" x-small color="indigo">
                                                                    <v-icon>{{ isRCCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                                </v-btn>
                                                            </v-hover>
                                                            Client Com Spec
                                                            <v-btn @click="isCheckRCC" text x-small color="indigo" v-if="isRCCOpenClose">
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="isRCCOpenClose && isdeleteRCC" @click="deleteRCC" text x-small color="indigo">
                                                                <v-icon>mdi-minus</v-icon>
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text v-show="isRCCOpenClose">
                                                            <v-data-table v-model="selectDelectRCC" :headers="headerRCC" :items="tab.client" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeleteRCC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteRCC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refRClient === item.id ? 'red' : null " @click="rowRClientClick(num)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openRCC(num)" @cancel="cancelRCC" @save="editRCCItem(num)" large >
                                                                                    {{item[header.value]}}
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editRCC.operation' label='Data Element Reference' :items='selSIMethod' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingRCC" clearable @click="setRCCSelect()" 
                                                                                            @click:clear='clearRCC' @blur="isEditingRCC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editRCC.clientCapa" :items="selectClientCapa" clearable @click:clear='editRCC.clientCapa = null' label="Receiver Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                        <v-autocomplete v-model='editRCC.getter' label='Getter Reference' :items='selSIField' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingGetter" clearable @click="setGetterSelect()" 
                                                                                            @click:clear='clearGetter' @blur="isEditingGetter=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-autocomplete v-model='editRCC.setter' label='Setter Reference' :items='selSIField' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingSetter" clearable @click="setSetterSelect()" 
                                                                                            @click:clear='clearSetter' @blur="isEditingSetter=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                    </template>
                                                                                </v-edit-dialog>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colspan="3">
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelRCC" @save="addRCC()"> 
                                                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                        <v-icon >mdi-plus</v-icon>New Item
                                                                                    </v-btn>
                                                                                    <template v-slot:input>
                                                                                        <br>
                                                                                        <v-autocomplete v-model='editRCC.operation' label='Data Element Reference' :items='selSIMethod' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingRCC" clearable @click="setRCCSelect()" 
                                                                                            @click:clear='clearRCC' @blur="isEditingRCC=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-select v-model="editRCC.clientCapa" :items="selectClientCapa" clearable @click:clear='editRCC.clientCapa = null' label="Receiver Capability" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                        <v-autocomplete v-model='editRCC.getter' label='Getter Reference' :items='selSIField' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingGetter" clearable @click="setGetterSelect()" 
                                                                                            @click:clear='clearGetter' @blur="isEditingGetter=true" outlined dense style="height: 45px;">
                                                                                        </v-autocomplete>
                                                                                        <v-autocomplete v-model='editRCC.setter' label='Setter Reference' :items='selSIField' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                            return-object :readonly="!isEditingSetter" clearable @click="setSetterSelect()" 
                                                                                            @click:clear='clearSetter' @blur="isEditingSetter=true" outlined dense style="height: 45px;">
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
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.name" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;PORTS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;margin-left:10px;">&#60;P-PORT-PROTOTYPE&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextPport()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 600px;">
                            <v-row v-for="(item, i) in editARXML.pport" :key="i" style="height: 590px;">
                                <div>
                                    <br>
                                    <v-row style="height: 10px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextPport(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;PROVIDED-COM-SPECS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;QUEUED-SENDER-COM-SPEC&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextQSender(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(qu, q) in item.queued" :key="q" style="height: 50px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextQSender(q,i)" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;DATA-ELEMENT-REF&#62;</label>
                                                    <v-text-field v-model="qu.dataE" placeholder="Path" style="width:300px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;DATA-ELEMENT-REF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;SENDER-CAPABILITY&#62;</label>
                                                    <v-text-field v-model="qu.senderCapa" placeholder="WILL-SEND or WONT-SEND" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SENDER-CAPABILITY&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;QUEUED-SENDER-COM-SPEC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;FIELD-SENDER-COM-SPEC&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextField(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 120px;">
                                        <v-row v-for="(fil, f) in item.field" :key="f" style="height: 50px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextField(f,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;DATA-ELEMENT-REF&#62;</label>
                                                    <v-text-field v-model="fil.dataE" placeholder="Path" style="width:300px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;DATA-ELEMENT-REF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;SENDER-CAPABILITY&#62;</label>
                                                    <v-text-field v-model="fil.senderCapa" placeholder="WILL-SEND or WONT-SEND" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SENDER-CAPABILITY&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;FIELD-SENDER-COM-SPEC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;SERVER-COM-SPEC&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextServer(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 100px;">
                                        <v-row v-for="(ser, s) in item.server" :key="s" style="height: 30px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextServer(s,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;OPERATION-REF&#62;</label>
                                                    <v-text-field v-model="ser.oper" placeholder="Path" style="width:350px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;OPERATION-REF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 25px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;SERVER-COM-SPEC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;&#47;PROVIDED-COM-SPECS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 50px;">&#60;PROVIDED-INTERFACE-TREF&#62;</label>
                                        <v-text-field v-model="item.interface" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;PROVIDED-INTERFACE-TREF&#62;</label>
                                    </v-row>                               
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;margin-left:10px;">&#60;&#47;P-PORT-PROTOTYPE&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;margin-left:10px;">&#60;PR-PORT-PROTOTYPE&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextPRport()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.prport" :key="i" style="height: 250px;">
                                <div>
                                    <br>
                                    <v-row style="height: 10px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextPRport(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;PROVIDED-COM-SPECS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextProvided(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(pro, p) in item.provide" :key="p" style="height: 70px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -70px 0px 70px" @click="deletTextProvided(p,i)" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;PERSISTENCY-DATA-PROVIDED-COM-SPEC&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;DATA-ELEMENT-REF&#62;</label>
                                                    <v-text-field v-model="pro.dataE" placeholder="Path" style="width:280px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;DATA-ELEMENT-REF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 105px;">&#60;&#47;PERSISTENCY-DATA-PROVIDED-COM-SPEC&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 65px;">&#60;&#47;PROVIDED-COM-SPECS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                        <v-col cols="4">
                                        <label style="padding:10px;margin:2px 0px 2px 40px;">&#60;PROVIDED-REQUIRED-INTERFACE-TREF&#62;</label>
                                        </v-col><v-col cols="5">
                                        <v-text-field v-model="item.interface" placeholder="Path" style="margin: -5px 0px 0px 70px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;PROVIDED-REQUIRED-INTERFACE-TREF&#62;</label>
                                        </v-col>
                                    </v-row>                               
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;margin-left:10px;">&#60;&#47;PR-PORT-PROTOTYPE&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;margin-left:10px;">&#60;R-PORT-PROTOTYPE&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextRport()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 530px;">
                            <v-row v-for="(item, i) in editARXML.rport" :key="i" style="height: 490px;">
                                <div>
                                    <br>
                                    <v-row style="height: 10px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextRport(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SHORT-NAME&#62;</label>
                                            <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;REQUIRED-COM-SPECS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;QUEUED-RECEIVER-COM-SPEC&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextQReceiver(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(qu, q) in item.queued" :key="q" style="height: 60px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextQReceiver(q,i)" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;DATA-ELEMENT-REF&#62;</label>
                                                    <v-text-field v-model="qu.dataE" placeholder="Path" style="width:300px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;DATA-ELEMENT-REF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;RECEIVER-CAPABILITY&#62;</label>
                                                    <v-text-field v-model="qu.receiveCapa" placeholder="WILL-RECEIVE or WONT-RECEIVE" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;RECEIVER-CAPABILITY&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;QUEUED-RECEIVER-COM-SPEC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;CLIENT-COM-SPEC&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextClient(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(cli, c) in item.client" :key="c" style="height: 100px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -80px 0px 80px" @click="deletTextClient(c,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;CLIENT-CAPABILITY&#62;</label>
                                                    <v-text-field v-model="cli.clientCapa" placeholder="WILL-CALL or WONT-CALL" style="width:300px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;CLIENT-CAPABILITY&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;OPERATION-REF&#62;</label>
                                                    <v-text-field v-model="cli.operation" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;OPERATION-REF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;GETTER-REF&#62;</label>
                                                    <v-text-field v-model="cli.getter" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;GETTER-REF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 110px;">&#60;SETTER-REF&#62;</label>
                                                    <v-text-field v-model="cli.setter" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SETTER-REF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 20px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;CLIENT-COM-SPEC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin-left:65px;">&#60;&#47;REQUIRED-COM-SPECS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 55px;">&#60;REQUIRED-INTERFACE-TREF&#62;</label>
                                        <v-text-field v-model="item.interface" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;REQUIRED-INTERFACE-TREF&#62;</label>
                                    </v-row>                               
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;margin-left:10px;">&#60;&#47;R-PORT-PROTOTYPE&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;PORTS&#62;</label>
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
                            if(this.element.pport.length > 0 && this.location == 1) {
                                if(this.isPPortOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, this.PportTab, this.element.pport[this.PportTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, null)
                                }
                            }
                            if(this.element.prport.length > 0 && this.location == 1) {
                                if(this.isPRPortOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, this.PRportTab, this.element.prport[this.PRportTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, null)
                                }
                            }
                            if(this.element.rport.length > 0 && this.location == 1) {
                                if(this.isRPortOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, this.RportTab, this.element.rport[this.RportTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, null)
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
            iselementOpenClose: true,//this.minimaptoolbar,
            dialogText: false,
            editARXML: {name:'', pport: [], rport: [], prport: []},
            editTextPport: {name: '', selectI: null, interface: null, queued: [], field: [], server: [], id: ''},
            editTextRport: {name: '', selectI: null, interface: null, queued: [], client: [], id: ''},
            editTextPRport: {name: '', selectI: null, interface: null, provide: [], id: ''},
            editTextQSender: {dataE: null, senderCapa:null, id: ''},
            editTextField: {dataE: null, senderCapa:null, id: ''},
            editTextServer: {oper: null, id: ''},
            editTextProvided: {dataE: null, id: ''},
            editTextQReceiver: {select: null, dataE: null, receiveCapa:null, id: ''},
            editTextClient: {operation: null, clientCapa:null, getter: null, setter: null, id: ''},
            isPPortOpenClose: true,
            isPRPortOpenClose: true,
            isRPortOpenClose: true,

            selSIEvent: this.$store.getters.getVariableDataPrototype,
            selSIField: this.$store.getters.getField,
            selectPInterfaceList: ['SERVICE-INTERFACE','PHM-RECOVERY-ACTION-INTERFACE'],
            selectSenderCapa: ['WILL-SEND', 'WONT-SEND'],
            selPInterface: null,
            PportTab: null,
            isPQSCOpenClose: true,
            isdeletePQSC: false,
            selectDelectPQSC: [],
            headerPQSC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Data Element Ref', sortable: false, value: 'dataE' },
                { text: 'Sender Capability', sortable: false, value: 'senderCapa' },
            ],
            editPQSC: { dataE: null, senderCapa:null, id: ''},
            isEditingPQSC: true,

            isPFSCOpenClose: true,
            isdeletePFSC: false,
            selectDelectPFSC: [],
            headerPFSC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Data Element Ref', sortable: false, value: 'dataE' },
                { text: 'Sender Capability', sortable: false, value: 'senderCapa' },
            ],
            editPFSC: { dataE: null, senderCapa:null, id: ''},
            isEditingPFSC: true,

            isSCOpenClose: true,
            isdeleteSC: false,
            selectDelectSC: [],
            headerSC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Operation Ref', sortable: false, value: 'oper' },
            ],
            editSC: { oper: null, id: ''},
            isEditingSC: true,

            PRportTab: null,
            isPRProvideOpenClose: true,
            isdeletePRProvide: false,
            selectDelectPRProvide: [],
            headerPRProvide: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Data Element Ref', sortable: false, value: 'dataE' },
            ],
            editPRProvide: { dataE: null, id: ''},
            isEditingPRProvide: true,
            selPerData: this.$store.getters.getPERKeyValueDIData,
            selectPRInterfaceList: ['SERVICE-INTERFACE','PERSISTENCY-FILE-PROXY-INTERFACE', 'PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE'],
            selPRInterface: null,

            RportTab: null,
            selectRInterfaceList: ['SERVICE-INTERFACE','PHM-HEALTH-CHANNEL-INTERFACE', 'PHM-SUPERVISED-ENTITY-INTERFACE'],
            selRInterface: null,
            isRQRCOpenClose: true,
            isdeleteRQRC: false,
            selectDelectRQRC: [],
            headerRQRC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Data Element Ref', sortable: false, value: 'dataE' },
                { text: 'Receiver Capability', sortable: false, value: 'receiveCapa' },
            ],
            selectRQRC: ['VARIABLE-DATA-PROTOTYPE','FIELD'],
            selectReceiverCapa: ['WILL-RECEIVE', 'WONT-RECEIVE'],
            selectClientCapa: ['WILL-CALL', 'WONT-CALL'],
            editRQRC: { select: null, dataE: null, receiveCapa:null, id: ''},
            isEditingRQRC: true,
            isRCCOpenClose: true,
            isdeleteRCC: false,
            selectDelectRCC: [],
            headerRCC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Operation Ref', sortable: false, value: 'operation' },
                { text: 'Client Capability', sortable: false, value: 'clientCapa' },
                { text: 'Getter Ref', sortable: false, value: 'getter' },
                { text: 'Setter Ref', sortable: false, value: 'setter' },
            ],
            editRCC: { operation: null, clientCapa:null, getter: null, setter: null, id: ''},
            isEditingRCC: true,
            isEditingGetter: true,
            isEditingSetter: true,
            selSIQRC: this.$store.getters.getVariableDataPrototype,
            selSIMethod: this.$store.getters.getClientServer,

            beforePport: '',
            beforePRport: '',
            beforeRport: '',
            
            refPInterfase: false,
            refPQueued: null,
            refPFieldS: null,
            refPServerC: null,
            refPRInterfase: false,
            refPRProvided: null,
            refRInterfase: false,
            refRQueued: null,
            refRClient: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID, id, isDeleteItem, item, idxRow) => {
            this.refPInterfase = false
            if (isDeleteItem) {
                if (this.refPQueued == id && item == 'PQueued' && this.element.pport[this.PportTab].id == tabID) {
                    this.refPQueued = id + 1
                    this.rowPQueuedClick(idxRow)
                } else if (this.refPFieldS == id && item == 'PField' && this.element.pport[this.PportTab].id == tabID) {
                    this.refPFieldS = id + 1
                    this.rowPFieldSClick(idxRow)
                } else if (this.refPServerC == id && item == 'PServer' && this.element.pport[this.PportTab].id == tabID) {
                    this.refPServerC = id + 1
                    this.rowPServerCClick(idxRow)
                } else if (this.refPRProvided == id && item == 'PRProvide' && this.element.prport[this.PRportTab].id == tabID) {
                    this.refPRProvided = id + 1
                    this.rowPRProvidedClick(idxRow)
                } else if (this.refRQueued == id && item == 'RQueued' && this.element.rport[this.RportTab].id == tabID) {
                    this.refRQueued = id + 1
                    this.rowRQueuedClick(idxRow)
                } else if (this.refRClient == id && item == 'RClient' && this.element.rport[this.RportTab].id == tabID) {
                    this.refRClient = id + 1
                    this.rowRClientClick(idxRow)
                }
            } else {
                this.refPInterfase = false
                this.refPRInterfase = false
                this.refRInterfase = false
                this.refPQueued = null
                this.refPFieldS = null
                this.refPServerC = null
                this.refPRProvided = null
                this.refRQueued = null
                this.refRClient = null

                if (refNum == 1) {
                    this.PportTab = tabID
                    this.refPInterfase = true
                } else if (refNum == 2) {
                    this.PportTab = tabID
                    this.refPQueued = idxID
                } else if (refNum == 3) {
                    this.PportTab = tabID
                    this.refPFieldS = idxID
                } else if (refNum == 4) {
                    this.PportTab = tabID
                    this.refPServerC = idxID
                } else if (refNum == 5) {
                    this.PRportTab = tabID
                    this.refPRInterfase = true
                } else if (refNum == 6) {
                    this.PRportTab = tabID
                    this.refPRProvided = idxID
                } else if (refNum == 7) {
                    this.RportTab = tabID
                    this.refRInterfase = true
                } else if (refNum == 8) {
                    this.RportTab = tabID
                    this.refRQueued = idxID
                } else if (refNum == 9) {
                    this.RportTab = tabID
                    this.refRClient = idxID
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
        showSWComponent() {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
            /*this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.element.pport.length > 0 && this.location == 1) {
                        if(this.isPPortOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, this.PportTab, this.element.pport[this.PportTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, null)
                        }
                    }
                    if(this.element.prport.length > 0 && this.location == 1) {
                        if(this.isPRPortOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, this.PRportTab, this.element.prport[this.PRportTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, null)
                        }
                    }
                    if(this.element.rport.length > 0 && this.location == 1) {
                        if(this.isRPortOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, this.RportTab, this.element.rport[this.RportTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, null)
                        }
                    }
                }
            })*/
        },
        showPPort() {
            this.clickOtherFields()
            this.isPPortOpenClose = this.isPPortOpenClose ? false : true
            /*if(this.element.pport.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isPPortOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, this.PportTab, this.element.pport[this.PportTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showPQSC() {
            this.clickOtherFields()
            this.isPQSCOpenClose = this.isPQSCOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showPFSC() {
            this.clickOtherFields()
            this.isPFSCOpenClose = this.isPFSCOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showSC() {
            this.clickOtherFields()
            this.isSCOpenClose = this.isSCOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showPRPort() {
            this.clickOtherFields()
            this.isPRPortOpenClose = this.isPRPortOpenClose ? false : true
            /*if(this.element.prport.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isPRPortOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, this.PRportTab, this.element.prport[this.PRportTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showPRProvide() {
            this.clickOtherFields()
            this.isPRProvideOpenClose = this.isPRProvideOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showRPort() {
            this.clickOtherFields()
            this.isRPortOpenClose = this.isRPortOpenClose ? false : true
            /*if(this.element.rport.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isRPortOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, this.RportTab, this.element.rport[this.RportTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showRQRC() {
            this.clickOtherFields()
            this.isRQRCOpenClose = this.isRQRCOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showRCC() {
            this.clickOtherFields()
            this.isRCCOpenClose = this.isRCCOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        inputSWComponentName() {
            this.$store.commit('editSWComponents', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refPInterfase || this.refPRInterfase || this.refRInterfase ||
                this.refPQueued != null || this.refPFieldS != null || this.refPServerC != null ||
                this.refPRProvided != null || this.refRQueued != null || this.refRClient != null) {
                this.deleteOpenElement()
                this.refPInterfase = false
                this.refPRInterfase = false
                this.refRInterfase = false
                this.refPQueued = null
                this.refPFieldS = null
                this.refPServerC = null
                this.refPRProvided = null
                this.refRQueued = null
                this.refRClient = null
            }
        },
        rowPQueuedClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refPQueued != this.element.pport[this.PportTab].queued[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.pport[this.PportTab].queued[idx].dataE != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].queued[idx].dataE, 1)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, end:endLine, iscircle:false, 
                                            refNum:2, idxID: this.element.pport[this.PportTab].queued[idx].id, tabID: this.PportTab})
                    }
                }
                this.refPQueued = this.element.pport[this.PportTab].queued[idx].id
            }
        },
        rowPFieldSClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refPFieldS != this.element.pport[this.PportTab].field[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.pport[this.PportTab].field[idx].dataE != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].field[idx].dataE, 2)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, end:endLine, 
                                            iscircle:false, refNum:3, idxID: this.element.pport[this.PportTab].field[idx].id, tabID: this.PportTab})
                    }
                }
                this.refPFieldS = this.element.pport[this.PportTab].field[idx].id
            }
        },
        rowPServerCClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refPServerC != this.element.pport[this.PportTab].server[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.pport[this.PportTab].server[idx].oper != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].server[idx].oper, 3)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, end:endLine, 
                                            iscircle:false, refNum:4, idxID: this.element.pport[this.PportTab].server[idx].id, tabID: this.PportTab})
                    }
                }
                this.refPServerC = this.element.pport[this.PportTab].server[idx].id
            }
        },
        rowPRProvidedClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refPRProvided != this.element.prport[this.PRportTab].provide[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.prport[this.PRportTab].provide[idx].dataE) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getPERKeyValueDIPath(this.element.prport[this.PRportTab].provide[idx].dataE)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editPERKeyValueDI', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.KeyValueDI_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, end:endLine, 
                                            iscircle:false, refNum:5, idxID: this.element.prport[this.PRportTab].provide[idx].id, tabID: this.PRportTab})
                    }
                }
            }
            this.refPRProvided = this.element.prport[this.PRportTab].provide[idx].id
        },
        rowRQueuedClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refRQueued != this.element.rport[this.RportTab].queued[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.rport[this.RportTab].queued[idx].dataE != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].queued[idx].dataE, 2)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top + 300, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, end:endLine, 
                                            iscircle:false, refNum:8, idxID: this.element.rport[this.RportTab].queued[idx].id, tabID: this.RportTab})
                    }
                }
            }
            this.refRQueued = this.element.rport[this.RportTab].queued[idx].id
        },
        rowRClientClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refRClient != this.element.rport[this.RportTab].client[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLineOpration, endLineGetter, endLineSetter
                if (this.element.rport[this.RportTab].client[idx].operation != null) {
                    endLineOpration = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                    if (endLineOpration == undefined) {
                        endLineOpration = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].client[idx].operation, 3)
                    }
                    if (endLineOpration != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var isExist = true
                        if (this.$store.getters.getDeleteOpenElement(endLineOpration) == -1) {
                            this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLineOpration, top: this.element.top + 400, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLineOpration, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineOpration, 
                                            iscircle:false, refNum:9, idxID: this.element.rport[this.RportTab].client[idx].id, tabID: this.RportTab})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineOpration)
                            EventBus.$emit('new-line', this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, endLineOpration, isExist)
                        })
                    }
                }
                if (this.element.rport[this.RportTab].client[idx].getter != null) {
                    endLineGetter = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                    if (endLineGetter == undefined) {
                        endLineGetter = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].client[idx].getter, 2)
                    }
                    if (endLineGetter != null && endLineGetter != endLineOpration) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var top = 400
                        if (endLineOpration != null) {
                            top = 600
                        }
                        var isExistGetter = true
                        if (this.$store.getters.getDeleteOpenElement(endLineGetter) == -1) {
                            this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLineGetter, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                            isExistGetter = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLineGetter, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        if (!isExistGetter) {
                            this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineGetter, 
                                                iscircle:false, refNum: 9, idxID: this.element.rport[this.RportTab].client[idx].id, tabID: this.RportTab})
                        }
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineGetter)
                            EventBus.$emit('new-line', this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, endLineGetter, isExistGetter)
                        })
                    }
                }
                if (this.element.rport[this.RportTab].client[idx].setter != null) {
                    endLineSetter = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                    if (endLineSetter == undefined) {
                        endLineSetter = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].client[idx].setter, 2)
                    }
                    if (endLineSetter != null && endLineGetter != endLineSetter && endLineSetter != endLineOpration) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var topSetter = 600
                        if (endLineGetter != endLineOpration && endLineOpration != null && endLineGetter != null) {
                            topSetter = 800
                        } else if (endLineOpration == null || endLineGetter == null) {
                            topSetter = 400
                        }
                        var isExistSetter = true
                        if (this.$store.getters.getDeleteOpenElement(endLineSetter) == -1) {
                            this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLineSetter, top: this.element.top + topSetter, left: this.element.left + this.$setPositionLeft} )
                            isExistSetter = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLineSetter, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        if (!isExistSetter) {
                            this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineSetter, 
                                                iscircle:false, refNum:9, idxID: this.element.rport[this.RportTab].client[idx].id, tabID: this.RportTab})
                        }
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineSetter)
                            EventBus.$emit('new-line', this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, endLineSetter, isExistSetter)
                        })
                    }
                }
                
                this.setOpenCloseViewUUID(endLineOpration, endLineGetter, endLineSetter)
            }
            this.refRClient = this.element.rport[this.RportTab].client[idx].id
        },


        clickPportName(name) {
            this.clickOtherFields()
            this.beforePport = name
        },
        clickPRportName(name) {
            this.clickOtherFields()
            this.beforePRport = name
        },
        clickRportName(name) {
            this.clickOtherFields()
            this.beforeRport = name
        },
        inputPportName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'pPort', listname: name, beforename: this.beforePport} )
            this.beforePport = name
        }, 
        inputPRportName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'prPort', listname: name, beforename: this.beforePRport} )
            this.beforePRport = name
        },
        inputRportName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'rPort', listname: name, beforename: this.beforeRport} )
            this.beforeRport = name
        }, 

        inputSelectPInterf() {
            this.clearPInterface()
            this.setPInterfaceSelect()

        },
        clearPInterface() {
            this.element.pport[this.PportTab].interface = null
            this.selPInterface = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
            }
            this.clickOtherFields()
        },
        setPInterfaceSelect() {
            this.clickOtherFields()
            if (this.element.pport[this.PportTab].interface != null) {this.refPInterfase = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                if (this.element.pport[this.PportTab].selectI != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
                    if (endLine == undefined) {
                        if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                            endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].interface,0)
                        } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                            endLine = this.$store.getters.getPHMRecoveryPath(this.element.pport[this.PportTab].interface)
                        } 
                    }
                    if (endLine != null) {
                        if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                            this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                        } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                            this.$store.commit('editPHMRecoveryVia', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.RecoveryVA_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.RecoveryVA_str} )
                        }
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, end:endLine, iscircle:false, refNum:1, idxID: 0, tabID: this.PportTab})
                        // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        // EventBus.$emit('active-element', endLine)
                    }
                }
            }
        },
        setPInterfaceList() {
            if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                this.selPInterface = this.$store.getters.getServiceInterface
            } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                this.selPInterface = this.$store.getters.getPHMRecovery
            } 
            this.setactiveUUID()
        },
        setPInterface(item){
            this.clickOtherFields()
            if( this.element.pport[this.PportTab].interface != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    this.deleteLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
                }
                if (endLine != item.uuid) {
                    if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                        this.refPInterfase = true
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )

                    } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                        this.refPInterfase = true
                        this.$store.commit('editPHMRecoveryVia', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.RecoveryVA_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, end:item.uuid, iscircle:false, refNum:1, idxID: 0, tabID: this.PportTab})
                }
                this.element.pport[this.PportTab].interface = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                        this.refPInterfase = true
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                        this.refPInterfase = true
                        this.$store.commit('editPHMRecoveryVia', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.RecoveryVA_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }) 
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, end:item.uuid, iscircle:false, refNum:1, idxID: 0, tabID: this.PportTab})
                }
            }
            this.setactiveUUID()
        },
        newPInterface() {
            if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                this.newServiceInterface()
            } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                this.$store.commit('addElementPHMRecovery', {
                    name: this.$store.getters.getNamePHMRecovery, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    reconame: '', faf: null
                })                
                EventBus.$emit('add-element', constant.RecoveryVA_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.Platform_str)

            } 
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addPport() {
            this.clickOtherFields()
            const editItem = {name: '', selectI: null, interface: null, queued: [], field: [], server: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'PPort_' + n++;
                res = this.element.pport.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.pport.push(addObj)
            this.PportTab = this.element.pport.length-1
            this.clickPporttab()
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, null)
            }
        },
        clickPporttab() {
            this.isdeletePQSC = false
            this.selectDelectPQSC = []
            this.isdeletePFSC = false
            this.selectDelectPFSC = []
            this.isdeleteSC = false
            this.selectDelectSC = []
        },
        changePportTab() {
            if (this.refPInterfase || this.refPQueued != null || this.refPFieldS != null || this.refPServerC != null) {
                this.deleteOpenElement()
                this.refPInterfase = false
                this.refPQueued = null
                this.refPFieldS = null
                this.refPServerC = null
            }
            /*if(this.element.pport.length > 0 && this.location == 1 && this.PportTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, this.PportTab, this.element.pport[this.PportTab].id)}, 300);
            }*/
        },
        deletePport(idx) {
            this.clickOtherFields()
            this.$store.commit('deleteRefTable', {deleteName:'ptab', deleteTab: true, tabName: this.element.pport[idx].name, path: this.element.path, name: this.element.name})
            if (this.element.pport[idx].interface != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+ this.element.pport[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/PPortI-'+ this.element.pport[idx].id)
                }
            }

            for(let i=0; i<this.element.pport[idx].queued.length; i++){
                var endLineQ = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+this.element.pport[idx].queued[i].id+'-'+this.element.pport[idx].id)
                if(endLineQ != undefined) {
                    this.deleteLine(this.element.uuid+'/pportQSC-'+this.element.pport[idx].queued[i].id+'-'+this.element.pport[idx].id)
                }
            }
            for(let i=0; i<this.element.pport[idx].field.length; i++){
                var endLineF = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+this.element.pport[idx].field[i].id+'-'+this.element.pport[idx].id)
                if(endLineF != undefined) {
                    this.deleteLine(this.element.uuid+'/pportFSC-'+this.element.pport[idx].field[i].id+'-'+this.element.pport[idx].id)
                }
            }
            for(let i=0; i<this.element.pport[idx].server.length; i++){
                var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+this.element.pport[idx].server[i].id+'-'+this.element.pport[idx].id)
                if(endLineS != undefined) {
                    this.deleteLine(this.element.uuid+'/pportSC-'+this.element.pport[idx].server[i].id+'-'+this.element.pport[idx].id)
                }
            }

            this.element.pport.splice(idx, 1)
        },
        isCheckPQSC() {
            this.clickOtherFields()
            if (this.isdeletePQSC == true) {
                this.isdeletePQSC = false
                this.selectDelectPQSC = []
            } else {
                this.isdeletePQSC = true
            }
        },
        deletePQSC() {
            this.clickOtherFields()
            if (this.isdeletePQSC == true) {
                this.selectDelectPQSC.forEach( item => {
                    for(let i=0; i<this.element.pport[this.PportTab].queued.length; i++){
                        if (item.id == this.element.pport[this.PportTab].queued[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[i].id+'-'+this.element.pport[this.PportTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[i].id+'-'+this.element.pport[this.PportTab].id)
                            }
                        }
                    }
                })

                this.element.pport[this.PportTab].queued = this.element.pport[this.PportTab].queued.filter(item => {
                        return this.selectDelectPQSC.indexOf(item) < 0 })

                this.isdeletePQSC = false
                this.selectDelectPQSC = []
            } 
        },
        openPQSC(idx) { 
            this.selSIEvent = this.$store.getters.getVariableDataPrototype

            if ( this.element.pport[this.PportTab].queued[idx].dataE != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].queued[idx].dataE, 1)
                }
                this.editPQSC.dataE = { name: this.element.pport[this.PportTab].queued[idx].dataE, uuid: endLine}
            }
            this.editPQSC.senderCapa = this.element.pport[this.PportTab].queued[idx].senderCapa
        },
        editPQSCItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id)
            if (endLine != undefined && this.editPQSC.dataE == null) {
                this.deleteLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id)
                this.element.pport[this.PportTab].queued[idx].dataE = null
            } else if (endLine != undefined && endLine != this.editPQSC.dataE.uuid) {
                this.deleteLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id)
                this.newLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id, 
                                this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, this.editPQSC.dataE.uuid, false)
                this.element.pport[this.PportTab].queued[idx].dataE = this.editPQSC.dataE.name
            } else if (endLine == undefined && this.editPQSC.dataE != null && this.editPQSC.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id, 
                                this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, this.editPQSC.dataE.uuid, false)
                this.element.pport[this.PportTab].queued[idx].dataE = this.editPQSC.dataE.name
            } else if (this.editPQSC.dataE != null && endLine == this.editPQSC.dataE.uuid && this.element.pport[this.PportTab].queued[idx].dataE != this.editPQSC.dataE.name) {
                this.element.pport[this.PportTab].queued[idx].dataE = this.editPQSC.dataE.name
            }

            if (this.refPQueued == this.element.pport[this.PportTab].queued[idx].id) {
                this.deleteOpenElement()
                if (this.editPQSC.dataE != null && this.editPQSC.dataE.uuid != null) {
                    var endLineChange = this.editPQSC.dataE.uuid 
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editPQSC.dataE.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editPQSC.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLineChange)
                        EventBus.$emit('new-line', this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, end:endLineChange, 
                                        iscircle:false, refNum:2, idxID: this.refPQueued, tabID: this.PportTab})
                }
            }
            this.element.pport[this.PportTab].queued[idx].senderCapa = this.editPQSC.senderCapa
            this.cancelPQSC()
        },
        cancelPQSC() {
            this.editPQSC = {dataE: null, senderCapa: null}
            this.setactiveUUID()
        },
        addPQSC() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport[this.PportTab].queued.some(item => item.id === n)
            }
            this.editPQSC.id = n
            var serViewUUID = null
            if( this.editPQSC.dataE != null) {
                serViewUUID = this.editPQSC.dataE.uuid
                this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editPQSC.dataE.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editPQSC.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editPQSC.dataE = this.editPQSC.dataE.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, end:serViewUUID, 
                                    iscircle:false, refNum:2, idxID: this.editPQSC.id, tabID: this.PportTab})
            }

            const addObj = Object.assign({}, this.editPQSC)
            this.element.pport[this.PportTab].queued.push(addObj);
            this.refPQueued = n
            this.cancelPQSC()
            if (serViewUUID != null) {
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', true, serViewUUID)
                    this.newLine(this.element.uuid+'/pportQSC-'+n+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, 
                                serViewUUID, true)
                    document.getElementById(serViewUUID+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
        },
        setPQSCSelect() {
            if (this.isEditingPQSC == true) {
                if (this.editPQSC.dataE != null && this.editPQSC.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPQSC.dataE.uuid, element: constant.ServiceInterface_str} )
                    // document.getElementById(this.editPQSC.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editPQSC.dataE.uuid)
                }
                this.setPQSCList()
                this.isEditingPQSC = false
            } else {
                this.isEditingPQSC = true
            }
        },
        setPQSCList() {
            this.selSIEvent = this.$store.getters.getVariableDataPrototype
            this.setactiveUUID()
        },
        clearPQSC() {
            this.isEditingPQSC = true
            this.editPQSC.dataE = null
        },
        isCheckPFSC() {
            this.clickOtherFields()
            if (this.isdeletePFSC == true) {
                this.isdeletePFSC = false
                this.selectDelectPFSC = []
            } else {
                this.isdeletePFSC = true
            }
        },
        deletePFSC() {
            this.clickOtherFields()
            if (this.isdeletePFSC == true) {
                this.selectDelectPFSC.forEach( item => {
                    for(let i=0; i<this.element.pport[this.PportTab].field.length; i++){
                        if (item.id == this.element.pport[this.PportTab].field[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[i].id+'-'+this.element.pport[this.PportTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[i].id+'-'+this.element.pport[this.PportTab].id)
                            }
                        }
                    }
                })

                this.element.pport[this.PportTab].field = this.element.pport[this.PportTab].field.filter(item => {
                        return this.selectDelectPFSC.indexOf(item) < 0 })


                this.isdeletePFSC = false
                this.selectDelectPFSC = []
            } 
        },
        openPFSC(idx) { 
            this.selSIField = this.$store.getters.getField

            if ( this.element.pport[this.PportTab].field[idx].dataE != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].field[idx].dataE, 2)
                }
                this.editPFSC.dataE = { name: this.element.pport[this.PportTab].field[idx].dataE, uuid: endLine}
            }
            this.editPFSC.senderCapa = this.element.pport[this.PportTab].field[idx].senderCapa
        },
        editPFSCItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id)
            if (endLine != undefined && this.editPFSC.dataE == null) {
                this.deleteLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id)
                this.element.pport[this.PportTab].field[idx].dataE = null
            } else if (endLine != undefined && endLine != this.editPFSC.dataE.uuid) {
                this.deleteLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id)
                this.newLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id, 
                                this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, this.editPFSC.dataE.uuid, false)
                this.element.pport[this.PportTab].field[idx].dataE = this.editPFSC.dataE.name
            } else if (endLine == undefined && this.editPFSC.dataE != null && this.editPFSC.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id, 
                                this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, this.editPFSC.dataE.uuid, false)
                this.element.pport[this.PportTab].field[idx].dataE = this.editPFSC.dataE.name
            } else if (this.editPFSC.dataE != null && endLine == this.editPFSC.dataE.uuid && this.element.pport[this.PportTab].field[idx].dataE != this.editPFSC.dataE.name) {
                this.element.pport[this.PportTab].field[idx].dataE = this.editPFSC.dataE.name
            }

            if (this.refPFieldS == this.element.pport[this.PportTab].field[idx].id) {
                this.deleteOpenElement()
                if (this.editPFSC.dataE != null && this.editPFSC.dataE.uuid != null) {
                    var endLineChange = this.editPFSC.dataE.uuid
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editPFSC.dataE.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editPFSC.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLineChange)
                        EventBus.$emit('new-line', this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, end:endLineChange, 
                                        iscircle:false, refNum:3, idxID: this.refPFieldS, tabID: this.PportTab})
                }
            }
            this.element.pport[this.PportTab].field[idx].senderCapa = this.editPFSC.senderCapa
            this.cancelPFSC()
        },
        cancelPFSC() {
            this.editPFSC = {dataE: null, senderCapa: null}
            this.setactiveUUID()
        },
        addPFSC() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport[this.PportTab].field.some(item => item.id === n)
            }
            this.editPFSC.id = n
            var serViewUUID = null
            if( this.editPFSC.dataE != null) {
                serViewUUID = this.editPFSC.dataE.uuid
                this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editPFSC.dataE.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editPFSC.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editPFSC.dataE = this.editPFSC.dataE.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, end:serViewUUID, 
                                    iscircle:false, refNum:3, idxID: this.editPFSC.id, tabID: this.PportTab})
            }

            const addObj = Object.assign({}, this.editPFSC)
            this.element.pport[this.PportTab].field.push(addObj);
            this.refPFieldS = n
            this.cancelPFSC()
            if (serViewUUID != null) {
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', true, serViewUUID)
                    this.newLine(this.element.uuid+'/pportFSC-'+n+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id,
                                 serViewUUID, true)
                    document.getElementById(serViewUUID+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
        },
        setPFSCSelect() {
            if (this.isEditingPFSC == true) {
                if (this.editPFSC.dataE != null && this.editPFSC.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPFSC.dataE.uuid, element: constant.ServiceInterface_str} )
                    // document.getElementById(this.editPFSC.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editPFSC.dataE.uuid)
                }
                this.setPFSCList()
                this.isEditingPFSC = false
            } else {
                this.isEditingPFSC = true
            }
        },
        setPFSCList() {
            this.selSIField = this.$store.getters.getField
            this.setactiveUUID()
        },
        clearPFSC() {
            this.isEditingPFSC = true
            this.editPFSC.dataE = null
        },
        isCheckSC() {
            this.clickOtherFields()
            if (this.isdeleteSC == true) {
                this.isdeleteSC = false
                this.selectDelectSC = []
            } else {
                this.isdeleteSC = true
            }
        },
        deleteSC() {
            this.clickOtherFields()
            if (this.isdeleteSC == true) {
                this.selectDelectSC.forEach( item => {
                    for(let i=0; i<this.element.pport[this.PportTab].server.length; i++){
                        if (item.id == this.element.pport[this.PportTab].server[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[i].id+'-'+this.element.pport[this.PportTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[i].id+'-'+this.element.pport[this.PportTab].id)
                            }
                        }
                    }
                })

                this.element.pport[this.PportTab].server = this.element.pport[this.PportTab].server.filter(item => {
                        return this.selectDelectSC.indexOf(item) < 0 })


                this.isdeleteSC = false
                this.selectDelectSC = []
            } 
        },
        openSC(idx) { 
            this.selSIMethod = this.$store.getters.getClientServer

            if ( this.element.pport[this.PportTab].server[idx].oper != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].server[idx].oper, 3)
                }
                this.editSC.oper = { name: this.element.pport[this.PportTab].server[idx].oper, uuid: endLine}
            }
        },
        editSCItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id)
            if (endLine != undefined && this.editSC.oper == null) {
                this.deleteLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id)
                this.element.pport[this.PportTab].server[idx].oper = null
            } else if (endLine != undefined && endLine != this.editSC.oper.uuid) {
                this.deleteLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id)
                this.newLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id, 
                                this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, this.editSC.oper.uuid, false)
                this.element.pport[this.PportTab].server[idx].oper = this.editSC.oper.name
            } else if (endLine == undefined && this.editSC.oper != null && this.editSC.oper.uuid != null) {
                this.newLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id, 
                                this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, this.editSC.oper.uuid, false)
                this.element.pport[this.PportTab].server[idx].oper = this.editSC.oper.name
            } else if (this.editSC.oper != null && endLine == this.editSC.oper.uuid && this.element.pport[this.PportTab].server[idx].oper != this.editSC.oper.name) {
                this.element.pport[this.PportTab].server[idx].oper = this.editSC.oper.name
            }

            if (this.refPServerC == this.element.pport[this.PportTab].server[idx].id) {
                this.deleteOpenElement()
                if (this.editSC.oper != null && this.editSC.oper.uuid != null) {
                    var endLineChange = this.editSC.oper.uuid
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editSC.oper.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editSC.oper.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLineChange)
                        EventBus.$emit('new-line', this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, end:endLineChange, 
                                        iscircle:false, refNum:4, idxID: this.refPServerC, tabID: this.PportTab})
                }
            }
            this.cancelSC()
        },
        cancelSC() {
            this.editSC = {oper: null}
            this.setactiveUUID()
        },
        addSC() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport[this.PportTab].server.some(item => item.id === n)
            }
            this.editSC.id = n
            var serViewUUID = null
            if( this.editSC.oper != null) {
                serViewUUID = this.editSC.oper.uuid
                this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editSC.oper.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editSC.oper.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editSC.oper = this.editSC.oper.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, end:serViewUUID, 
                                    iscircle:false, refNum:4, idxID: this.editSC.id, tabID: this.PportTab})
            }

            const addObj = Object.assign({}, this.editSC)
            this.element.pport[this.PportTab].server.push(addObj);
            this.refPServerC = n
            this.cancelSC()
            if (serViewUUID != null) {
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', true, serViewUUID)
                    this.newLine(this.element.uuid+'/pportSC-'+n+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, 
                                serViewUUID, true)
                    document.getElementById(serViewUUID+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
        },
        setSCSelect() {
            if (this.isEditingSC == true) {
                if (this.editSC.oper != null && this.editSC.oper.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSC.oper.uuid, element: constant.ServiceInterface_str} )
                    //document.getElementById(this.editSC.oper.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    //EventBus.$emit('active-element', this.editSC.oper.uuid)
                }
                this.setSCList()
                this.isEditingSC = false
            } else {
                this.isEditingSC = true
            }
        },
        setSCList() {
            this.selSIMethod = this.$store.getters.getClientServer
            this.setactiveUUID()
        },
        clearSC() {
            this.isEditingSC = true
            this.editSC.oper = null
        },

        inputSelectPRInterf() {
            this.clearPRInterface()
            this.setPRInterfaceSelect()
        },
        clearPRInterface() {
            this.element.prport[this.PRportTab].interface = null
            this.selPRInterface = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
            }
            this.clickOtherFields()
        },
        setPRInterfaceSelect() {
            this.clickOtherFields()
            if (this.element.prport[this.PRportTab].interface != null) {this.refPRInterfase = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                if (this.element.prport[this.PRportTab].selectI != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
                    if (endLine == undefined) {
                        if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                            endLine = this.$store.getters.getServiceInterfacePath(this.element.prport[this.PRportTab].interface, 0)
                        } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                            endLine = this.$store.getters.getPERFileProxyPath(this.element.prport[this.PRportTab].interface)
                        } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                            endLine = this.$store.getters.getPERKeyValueDIPath(this.element.prport[this.PRportTab].interface)
                        }
                    }
                    if (endLine != null) {
                        if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                            this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                        } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                            this.$store.commit('editPERFileProxy', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.FileProxyInterf_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.FileProxyInterf_str} )
                        } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                            this.$store.commit('editPERKeyValueDI', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.KeyValueDI_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.KeyValueDI_str} )
                        }
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, end:endLine, iscircle:false, refNum:5, idxID: 0, tabID: this.PRportTab})
                        //document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        //EventBus.$emit('active-element', endLine)
                    }
                }
            }
        },
        setPRInterfaceList() {
            if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                this.selPRInterface = this.$store.getters.getServiceInterface
            } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                this.selPRInterface = this.$store.getters.getPERFileProxy
            } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                this.selPRInterface = this.$store.getters.getPERKeyValueDI
            }
            this.setactiveUUID()
        },
        setPRInterface(item){
            this.clickOtherFields()
            if( this.element.prport[this.PRportTab].interface != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    this.deleteLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
                }
                if (endLine != item.uuid) {
                    if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                        this.refPRInterfase = true
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                        this.refPRInterfase = true
                        this.$store.commit('editPERFileProxy', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.FileProxyInterf_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                        this.refPRInterfase = true
                        this.$store.commit('editPERKeyValueDI', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.KeyValueDI_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id, 
                                        this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, end:item.uuid, iscircle:false, refNum:5, idxID: 0, tabID: this.PRportTab})
                }
                this.element.prport[this.PRportTab].interface = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                        this.refPRInterfase = true
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                        this.refPRInterfase = true
                        this.$store.commit('editPERFileProxy', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.FileProxyInterf_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                        this.refPRInterfase = true
                        this.$store.commit('editPERKeyValueDI', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.KeyValueDI_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id, 
                                        this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, end:item.uuid, iscircle:false, refNum:5, idxID: 0, tabID: this.PRportTab})
                }
            }
            this.setactiveUUID()
        },
        newPRInterface() {
            if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                this.newServiceInterface()
            } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                this.$store.commit('addElementPERFileProxy', {
                    name: this.$store.getters.getNamePERFileProxy, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category: '', minisize: '', redundancy: null, updateS: null, encoding: '', proxy: [], maxfiles: ''
                })
                EventBus.$emit('add-element', constant.FileProxyInterf_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.Platform_str)

            } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                this.$store.commit('addElementPERKeyValueDI', {
                    name: this.$store.getters.getNamePERKeyValueDI, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    minisize: '', redundancy: null, updateS: null, data: [], serialization: []
                })
                EventBus.$emit('add-element', constant.KeyValueDI_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.Platform_str)
            }
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addPRport() {
            this.clickOtherFields()
            const editItem = {name: '', selectI: null, interface: null, provide: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'PRPort_' + n++;
                res = this.element.prport.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.prport.push(addObj)
            this.PRportTab = this.element.prport.length-1
            this.clickPRporttab()
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, null)
            }
        },
        clickPRporttab() {
            this.isdeletePRProvide = false
            this.selectDelectPRProvide = []
        },
        changePRportTab() {
            if (this.refPRInterfase || this.refPRProvided != null) {
                this.deleteOpenElement()
                this.refPRInterfase = false
                this.refPRProvided = null
            }
            /*if(this.element.prport.length > 0 && this.location == 1 && this.PRportTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, this.PRportTab, this.element.prport[this.PRportTab].id)}, 300);
            }*/
        },
        deletePRport(idx) {
            this.clickOtherFields()
            this.$store.commit('deleteRefTable', {deleteName:'prtab', deleteTab: true, tabName: this.element.prport[idx].name, path: this.element.path, name: this.element.name})
            if (this.element.prport[idx].interface != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+ this.element.prport[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/PRPortI-'+ this.element.prport[idx].id)
                }
            }

            for(let i=0; i<this.element.prport[idx].provide.length; i++){
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+this.element.prport[idx].provide[i].id+'-'+this.element.prport[idx].id)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/prporttab-'+this.element.prport[idx].provide[i].id+'-'+this.element.prport[idx].id)
                }
            }

            this.element.prport.splice(idx, 1)
        },
        isCheckPRProvide() {
            this.clickOtherFields()
            if (this.isdeletePRProvide == true) {
                this.isdeletePRProvide = false
                this.selectDelectPRProvide = []
            } else {
                this.isdeletePRProvide = true
            }
        },
        deletePRProvide() {
            this.clickOtherFields()
            if (this.isdeletePRProvide == true) {
                this.selectDelectPRProvide.forEach( item => {
                    for(let i=0; i<this.element.prport[this.PRportTab].provide.length; i++){
                        if (item.id == this.element.prport[this.PRportTab].provide[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[i].id+'-'+this.element.prport[this.PRportTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[i].id+'-'+this.element.prport[this.PRportTab].id)
                            }
                        }
                    }
                })

                this.element.prport[this.PRportTab].provide = this.element.prport[this.PRportTab].provide.filter(item => {
                        return this.selectDelectPRProvide.indexOf(item) < 0 })

                this.isdeletePRProvide = false
                this.selectDelectPRProvide = []
            } 
        },
        openPRProvide(idx) { 
            this.selPerData = this.$store.getters.getPERKeyValueDIData

            if ( this.element.prport[this.PRportTab].provide[idx].dataE != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getPERKeyValueDIPath(this.element.prport[this.PRportTab].provide[idx].dataE)
                }
                this.editPRProvide.dataE = { name: this.element.prport[this.PRportTab].provide[idx].dataE, uuid: endLine}
            }
        },
        editPRProvideItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id)
            if (endLine != undefined && this.editPRProvide.dataE == null) {
                this.deleteLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id)
                this.element.prport[this.PRportTab].provide[idx].dataE = null
            } else if (endLine != undefined && endLine != this.editPRProvide.dataE.uuid) {
                this.deleteLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id)
                this.newLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id, 
                                this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, this.editPRProvide.dataE.uuid, false)
                this.element.prport[this.PRportTab].provide[idx].dataE = this.editPRProvide.dataE.name
            } else if (endLine == undefined && this.editPRProvide.dataE != null && this.editPRProvide.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id, 
                                this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, this.editPRProvide.dataE.uuid, false)
                this.element.prport[this.PRportTab].provide[idx].dataE = this.editPRProvide.dataE.name
            } else if (this.editPRProvide.dataE != null && endLine == this.editPRProvide.dataE.uuid && this.element.prport[this.PRportTab].provide[idx].dataE != this.editPRProvide.dataE.name) {
                this.element.prport[this.PRportTab].provide[idx].dataE = this.editPRProvide.dataE.name
            }

            if (this.refPRProvided == this.element.prport[this.PRportTab].provide[idx].id) {
                this.deleteOpenElement()
                if (this.editPRProvide.dataE != null && this.editPRProvide.dataE.uuid != null) {
                    var endLineChange = this.editPRProvide.dataE.uuid
                    this.$store.commit('editPERKeyValueDI', {compo:"drag", uuid: this.editPRProvide.dataE.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.KeyValueDI_str, uuid: this.editPRProvide.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, end:endLineChange, 
                                        iscircle:false, refNum:6, idxID: this.refPRProvided, tabID: this.PRportTab})
                }
            }

            this.cancelPRProvide()
        },
        cancelPRProvide() {
            this.editPRProvide = {dataE: null}
            this.setactiveUUID()
        },
        addPRProvide() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.prport[this.PRportTab].provide.some(item => item.id === n)
            }
            this.editPRProvide.id = n
            var serViewUUID = null
            if( this.editPRProvide.dataE != null) {
                serViewUUID = this.editPRProvide.dataE.uuid
                this.$store.commit('editPERKeyValueDI', {compo:"drag", uuid: this.editPRProvide.dataE.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.KeyValueDI_str, uuid: this.editPRProvide.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editPRProvide.dataE = this.editPRProvide.dataE.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, end:serViewUUID, iscircle:false, refNum:6, idxID: this.editPRProvide.id, tabID: this.PRportTab})
            }

            const addObj = Object.assign({}, this.editPRProvide)
            this.element.prport[this.PRportTab].provide.push(addObj);
            this.refPRProvided = n
            this.cancelPRProvide()
            if (serViewUUID != null) {
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/prporttab-'+n+'-'+this.element.prport[this.PRportTab].id, this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, 
                                serViewUUID, true)
                    document.getElementById(serViewUUID+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
        },
        setPRProvideSelect() {
            if (this.isEditingPRProvide == true) {
                if (this.editPRProvide.dataE != null && this.editPRProvide.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPRProvide.dataE.uuid, element: constant.KeyValueDI_str} )
                    //document.getElementById(this.editPRProvide.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    //EventBus.$emit('active-element', this.editPRProvide.dataE.uuid)
                }
                this.setPRProvideList()
                this.isEditingPRProvide = false
            } else {
                this.isEditingPRProvide = true
            }
        },
        setPRProvideList() {
            this.selPerData = this.$store.getters.getPERKeyValueDIData
            this.setactiveUUID()
        },
        clearPRProvide() {
            this.isEditingPRProvide = true
            this.editPRProvide.dataE = null
        },

        inputSelectRInterf() {
            this.clearRInterface()
            this.setRInterfaceSelect()
        },
        clearRInterface() {
            this.element.rport[this.RportTab].interface = null
            this.selRInterface = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
            }
            this.clickOtherFields()
        },
        setRInterfaceSelect() {
            this.clickOtherFields()
            if (this.element.rport[this.RportTab].interface != null) {this.refRInterfase = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                if (this.element.rport[this.RportTab].selectI != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
                    if (endLine == undefined) {
                        if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                            endLine = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].interface, 0)
                        } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                            endLine = this.$store.getters.getPHMHealthPath(this.element.rport[this.RportTab].interface)
                        } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                            endLine = this.$store.getters.getPHMSupervisedPath(this.element.rport[this.RportTab].interface)
                        } 
                    }
                    if (endLine != null) {
                        if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                            this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                        } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                            this.$store.commit('editPHMHealth', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.HealthChannel_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.HealthChannel_str} )
                        } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                            this.$store.commit('editPHMSupervised', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            this.$store.commit('setzIndexVisible', {parent:constant.PHMSupervised_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                            //this.$store.commit('setDetailView', {uuid: endLine, element: constant.PHMSupervised_str} )
                        }
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, end:endLine, iscircle:false, refNum:7, idxID: 0, tabID: this.RportTab})
                        //document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        //EventBus.$emit('active-element', endLine)
                    }
                }
            }
        },
        setRInterfaceList() {
            if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                this.selRInterface = this.$store.getters.getServiceInterface
            } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                this.selRInterface = this.$store.getters.getPHMHealth
            } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                this.selRInterface = this.$store.getters.getPHMSupervised
            } 
            this.setactiveUUID()
        },
        setRInterface(item){
            this.clickOtherFields()
            if( this.element.rport[this.RportTab].interface != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    this.deleteLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
                }
                if (endLine != item.uuid) {
                    if (this.element.rport[this.RportTab].selectI == 'SERVICE-INTERFACE') {
                        this.refRInterfase = true
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                        this.refRInterfase = true
                        this.$store.commit('editPHMHealth', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.HealthChannel_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                        this.refRInterfase = true
                        this.$store.commit('editPHMSupervised', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.PHMSupervised_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id,
                                         item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, end:item.uuid, iscircle:false, refNum:7, idxID: 0, tabID: this.RportTab})
                }
                this.element.rport[this.RportTab].interface = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    if (this.element.rport[this.RportTab].selectI == 'SERVICE-INTERFACE') {
                        this.refRInterfase = true
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                        this.refRInterfase = true
                        this.$store.commit('editPHMHealth', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.HealthChannel_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                        this.refRInterfase = true
                        this.$store.commit('editPHMSupervised', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.PHMSupervised_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    }
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id,
                                         item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, end:item.uuid, iscircle:false, refNum:7, idxID: 0, tabID: this.RportTab})
                }
            }
            this.setactiveUUID()
        },
        newRInterface() {
            if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                this.newServiceInterface()
            } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                this.$store.commit('addElementPHMHealth', {
                    name: this.$store.getters.getNamePHMHealth, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    status: []
                })
                EventBus.$emit('add-element', constant.HealthChannel_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.Platform_str)
            } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                this.$store.commit('addElementPHMSupervised', {
                    name: this.$store.getters.getNamePHMSupervised, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    checkpoint: []
                })              
                EventBus.$emit('add-element', constant.PHMSupervised_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.Platform_str)
            } 
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addRport() {
            this.clickOtherFields()
            const editItem = {name: '', selectI: null, interface: null, queued: [], client: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'RPort_' + n++;
                res = this.element.rport.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.rport.push(addObj)
            this.RportTab = this.element.rport.length-1
            this.clickRporttab()
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, null)
            }
        },
        clickRporttab() {
            this.isdeleteRQRC = false
            this.selectDelectRQRC = []
            this.isdeleteRCC = false
            this.selectDelectRCC = []
        },
        changeRportTab() {
            if (this.refRInterfase || this.refRQueued != null || this.refRClient != null) {
                this.deleteOpenElement()
                this.refRInterfase = false
                this.refRQueued = null
                this.refRClient = null
            }
            /*if(this.element.rport.length > 0 && this.location == 1 && this.RportTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, this.RportTab, this.element.rport[this.RportTab].id)}, 300);
            }*/
        },
        deleteRport(idx) {
            this.clickOtherFields()
            this.$store.commit('deleteRefTable', {deleteName:'rtab', deleteTab: true, tabName: this.element.rport[idx].name, path: this.element.path, name: this.element.name})
            if (this.element.rport[idx].interface != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+ this.element.rport[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/RPortI-'+ this.element.rport[idx].id)
                }
            }

            for(let i=0; i<this.element.rport[idx].queued.length; i++){
                var endLineQ = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+this.element.rport[idx].queued[i].id+'-'+this.element.rport[idx].id)
                if(endLineQ != undefined) {
                    this.deleteLine(this.element.uuid+'/rportQRC-'+this.element.rport[idx].queued[i].id+'-'+this.element.rport[idx].id)
                }
            }
            for(let i=0; i<this.element.rport[idx].client.length; i++){
                var endLineF = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCC-'+this.element.rport[idx].client[i].id+'-'+this.element.rport[idx].id)
                if(endLineF != undefined) {
                    this.deleteLine(this.element.uuid+'/rportCC-'+this.element.rport[idx].client[i].id+'-'+this.element.rport[idx].id)
                }
                var endLineG = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCG-'+this.element.rport[idx].client[i].id+'-'+this.element.rport[idx].id)
                if(endLineG != undefined) {
                    this.deleteLine(this.element.uuid+'/rportCCG-'+this.element.rport[idx].client[i].id+'-'+this.element.rport[idx].id)
                }
                var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCS-'+this.element.rport[idx].client[i].id+'-'+this.element.rport[idx].id)
                if(endLineS != undefined) {
                    this.deleteLine(this.element.uuid+'/rportCCS-'+this.element.rport[idx].client[i].id+'-'+this.element.rport[idx].id)
                }
            }
            this.element.rport.splice(idx, 1)
        },
        isCheckRQRC() {
            this.clickOtherFields()
            if (this.isdeleteRQRC == true) {
                this.isdeleteRQRC = false
                this.selectDelectRQRC = []
            } else {
                this.isdeleteRQRC = true
            }
        },
        deleteRQRC() {
            this.clickOtherFields()
            if (this.isdeleteRQRC == true) {
                this.selectDelectRQRC.forEach( item => {
                    for(let i=0; i<this.element.rport[this.RportTab].queued.length; i++){
                        if (item.id == this.element.rport[this.RportTab].queued[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[i].id+'-'+this.element.rport[this.RportTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[i].id+'-'+this.element.rport[this.RportTab].id)
                            }
                        }
                    }
                })

                this.element.rport[this.RportTab].queued = this.element.rport[this.RportTab].queued.filter(item => {
                        return this.selectDelectRQRC.indexOf(item) < 0 })

                this.isdeleteRQRC = false
                this.selectDelectRQRC = []
            } 
        },
        openRQRC(idx) {
            var endLine = null
            this.editRQRC.select = this.element.rport[this.RportTab].queued[idx].select
            if (this.element.rport[this.RportTab].queued[idx].select == "VARIABLE-DATA-PROTOTYPE") {
                this.selSIQRC = this.$store.getters.getVariableDataPrototype

                if ( this.element.rport[this.RportTab].queued[idx].dataE != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].queued[idx].dataE, 1)
                    }
                    this.editRQRC.dataE = { name: this.element.rport[this.RportTab].queued[idx].dataE, uuid: endLine}
                }
            } else if (this.element.rport[this.RportTab].queued[idx].select == "FIELD") {
                this.selSIQRC = this.$store.getters.getField

                if ( this.element.rport[this.RportTab].queued[idx].dataE != null) {
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].queued[idx].dataE, 2)
                    }
                    this.editRQRC.dataE = { name: this.element.rport[this.RportTab].queued[idx].dataE, uuid: endLine}
                }
            }
            this.editRQRC.receiveCapa = this.element.rport[this.RportTab].queued[idx].receiveCapa
        },
        editRQRCItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id)
            if (endLine != undefined && this.editRQRC.dataE == null) {
                this.deleteLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.element.rport[this.RportTab].queued[idx].dataE = null
            } else if (endLine != undefined && endLine != this.editRQRC.dataE.uuid) {
                this.deleteLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.newLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, this.editRQRC.dataE.uuid, false)
                this.element.rport[this.RportTab].queued[idx].dataE = this.editRQRC.dataE.name
            } else if (endLine == undefined && this.editRQRC.dataE != null && this.editRQRC.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, this.editRQRC.dataE.uuid, false)
                this.element.rport[this.RportTab].queued[idx].dataE = this.editRQRC.dataE.name
            } else if (this.editRQRC.dataE != null && endLine == this.editRQRC.dataE.uuid && this.element.rport[this.RportTab].queued[idx].dataE != this.editRQRC.dataE.name) {
                this.element.rport[this.RportTab].queued[idx].dataE = this.editRQRC.dataE.name
            } 

            if (this.refRQueued == this.element.rport[this.RportTab].queued[idx].id) {
                this.deleteOpenElement()
                if (this.editRQRC.dataE != null && this.editRQRC.dataE.uuid != null) {
                    var endLineChange = this.editRQRC.dataE.uuid
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRQRC.dataE.uuid, top: this.element.top + 300, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRQRC.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLineChange)
                        EventBus.$emit('new-line', this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, end:endLineChange, 
                                        iscircle:false, refNum:8, idxID: this.refRQueued, tabID: this.RportTab})
                }
            }
            this.element.rport[this.RportTab].queued[idx].select = this.editRQRC.select
            this.element.rport[this.RportTab].queued[idx].receiveCapa = this.editRQRC.receiveCapa
            this.cancelRQRC()
        },
        cancelRQRC() {
            this.editRQRC = {select: null, dataE: null, receiveCapa: null}
            this.setactiveUUID()
        },
        clearRQRCSelect() {
            this.editRQRC.select = null
            this.clearRQRC()
        },
        addRQRC() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.rport[this.RportTab].queued.some(item => item.id === n)
            }
            this.editRQRC.id = n
            var serViewUUID = null
            if( this.editRQRC.dataE != null) {
                serViewUUID = this.editRQRC.dataE.uuid
                this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRQRC.dataE.uuid, top: this.element.top + 300, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRQRC.dataE.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editRQRC.dataE = this.editRQRC.dataE.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, end:serViewUUID, 
                                    iscircle:false, refNum:8, idxID: this.editRQRC.id, tabID: this.RportTab})
            }

            const addObj = Object.assign({}, this.editRQRC)
            this.element.rport[this.RportTab].queued.push(addObj);
            this.refRQueued = n
            this.cancelRQRC()
            if (serViewUUID != null) {
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', true, serViewUUID)
                    this.newLine(this.element.uuid+'/rportQRC-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, 
                                serViewUUID, true)
                    document.getElementById(serViewUUID+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
        },
        setRQRCSelect() {
            if (this.isEditingRQRC == true) {
                if (this.editRQRC.dataE != null && this.editRQRC.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRQRC.dataE.uuid, element: constant.ServiceInterface_str} )
                    //document.getElementById(this.editRQRC.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    //EventBus.$emit('active-element', this.editRQRC.dataE.uuid)
                }
                this.setRQRCList()
                this.isEditingRQRC = false
            } else {
                this.isEditingRQRC = true
            }
        },
        setRQRCList() {
            if (this.editRQRC.select == "VARIABLE-DATA-PROTOTYPE") {
                this.selSIQRC = this.$store.getters.getVariableDataPrototype
            } else if (this.editRQRC.select == "FIELD") {
                this.selSIQRC = this.$store.getters.getField
            }
            this.setactiveUUID()
        },
        clearRQRC() {
            this.isEditingRQRC = true
            this.editRQRC.dataE = null
        },

        isCheckRCC() {
            this.clickOtherFields()
            if (this.isdeleteRCC == true) {
                this.isdeleteRCC = false
                this.selectDelectRCC = []
            } else {
                this.isdeleteRCC = true
            }
        },
        deleteRCC() {
            this.clickOtherFields()
            if (this.isdeleteRCC == true) {
                this.selectDelectRCC.forEach( item => {
                    for(let i=0; i<this.element.rport[this.RportTab].client.length; i++){
                        if (item.id == this.element.rport[this.RportTab].client[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[i].id+'-'+this.element.rport[this.RportTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[i].id+'-'+this.element.rport[this.RportTab].id)
                            }
                            var endLineG = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[i].id+'-'+this.element.rport[this.RportTab].id)
                            if(endLineG != undefined) {
                                this.deleteLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[i].id+'-'+this.element.rport[this.RportTab].id)
                            }
                            var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[i].id+'-'+this.element.rport[this.RportTab].id)
                            if(endLineS != undefined) {
                                this.deleteLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[i].id+'-'+this.element.rport[this.RportTab].id)
                            }
                        }
                    }
                })

                this.element.rport[this.RportTab].client = this.element.rport[this.RportTab].client.filter(item => {
                        return this.selectDelectRCC.indexOf(item) < 0 })


                this.isdeleteRCC = false
                this.selectDelectRCC = []
            } 
        },
        openRCC(idx) { 
            this.selSIMethod = this.$store.getters.getClientServer
            this.selSIField = this.$store.getters.getField

            if ( this.element.rport[this.RportTab].client[idx].operation != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].client[idx].operation, 3)
                }
                this.editRCC.operation = { name: this.element.rport[this.RportTab].client[idx].operation, uuid: endLine}
            }
            if ( this.element.rport[this.RportTab].client[idx].getter != null) {
                var endLineG = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                if (endLineG == undefined) {
                    endLineG = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].client[idx].getter, 2)
                }
                this.editRCC.getter = { name: this.element.rport[this.RportTab].client[idx].getter, uuid: endLineG}
            }
            if ( this.element.rport[this.RportTab].client[idx].setter != null) {
                var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                if (endLineS == undefined) {
                    endLineS = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].client[idx].setter, 2)
                }
                this.editRCC.setter = { name: this.element.rport[this.RportTab].client[idx].setter, uuid: endLineS}
            }
            this.editRCC.clientCapa = this.element.rport[this.RportTab].client[idx].clientCapa
        },
        editRCCItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
            if (endLine != undefined && this.editRCC.operation == null) {
                this.deleteLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.element.rport[this.RportTab].client[idx].operation = null
            } else if (endLine != undefined && endLine != this.editRCC.operation.uuid) {
                this.deleteLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.newLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.operation.uuid, false)
                this.element.rport[this.RportTab].client[idx].operation = this.editRCC.operation.name
            } else if (endLine == undefined && this.editRCC.operation != null && this.editRCC.operation.uuid != null) {
                this.newLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.operation.uuid, false)
                this.element.rport[this.RportTab].client[idx].operation = this.editRCC.operation.name
            } else if (this.editRCC.operation != null && endLine == this.editRCC.operation.uuid && this.element.rport[this.RportTab].client[idx].operation != this.editRCC.operation.name) {
                this.element.rport[this.RportTab].client[idx].operation = this.editRCC.operation.name
            }

            var endLineG = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
            if (endLineG != undefined && this.editRCC.getter == null) {
                this.deleteLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.element.rport[this.RportTab].client[idx].getter = null
            } else if (endLineG != undefined && endLineG != this.editRCC.getter.uuid) {
                this.deleteLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.newLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.getter.uuid, false)
                this.element.rport[this.RportTab].client[idx].getter = this.editRCC.getter.name
            } else if (endLineG == undefined && this.editRCC.getter != null) {
                this.newLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.getter.uuid, false)
                this.element.rport[this.RportTab].client[idx].getter = this.editRCC.getter.name
            } else if (this.editRCC.getter != null && endLine == this.editRCC.getter.uuid && this.element.rport[this.RportTab].client[idx].getter != this.editRCC.getter.name) {
                this.element.rport[this.RportTab].client[idx].getter = this.editRCC.getter.name
            }

            var endLineS = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
            if (endLineS != undefined && this.editRCC.setter == null) {
                this.deleteLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.element.rport[this.RportTab].client[idx].setter = null
            } else if (endLineS != undefined && endLineS != this.editRCC.setter.uuid) {
                this.deleteLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id)
                this.newLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.setter.uuid, false)
                this.element.rport[this.RportTab].client[idx].setter = this.editRCC.setter.name
            } else if (endLineS == undefined && this.editRCC.setter != null) {
                this.newLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, 
                                this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.setter.uuid, false)
                this.element.rport[this.RportTab].client[idx].setter = this.editRCC.setter.name
            } else if (this.editRCC.setter != null && endLine == this.editRCC.setter.uuid && this.element.rport[this.RportTab].client[idx].setter != this.editRCC.setter.name) {
                this.element.rport[this.RportTab].client[idx].setter = this.editRCC.setter.name
            }

            if (this.refRClient == this.element.rport[this.RportTab].client[idx].id) {
                var endLineOpration = null, endLineGetter = null, endLineSetter = null
                this.deleteOpenElement()
                if (this.editRCC.operation != null && this.editRCC.operation.uuid != null) {
                    endLineOpration = this.editRCC.operation.uuid
                    var isExist = true
                    if (this.$store.getters.getDeleteOpenElement(this.editRCC.operation.uuid) == -1) {
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRCC.operation.uuid, top: this.element.top + 400, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRCC.operation.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:this.editRCC.operation.uuid, 
                                        iscircle:false, refNum:9, idxID: this.refRClient, tabID: this.RportTab})
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', false, endLineOpration)
                        EventBus.$emit('new-line', this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, endLineOpration, isExist)
                    })
                }
                if (this.editRCC.getter != null && this.editRCC.getter.uuid != null) {
                    endLineGetter = this.editRCC.getter.uuid
                    var top = 400
                    if (endLineOpration != null) {
                        top = 600
                    } 
                    var isExistGetter = true
                    if (this.$store.getters.getDeleteOpenElement(this.editRCC.getter.uuid) == -1) {
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRCC.getter.uuid, top: this.element.top + top, left: this.element.left + this.$setPositionLeft} )
                        isExistGetter = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRCC.getter.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    if (endLineOpration != endLineGetter) {
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineGetter)
                            EventBus.$emit('new-line', this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, endLineGetter, isExistGetter)
                        })
                    }
                    if (!isExistGetter) {
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineGetter, 
                                            iscircle:false, refNum:9, idxID: this.refRClient, tabID: this.RportTab})
                    }
                }
                if (this.editRCC.setter != null && this.editRCC.setter.uuid != null) {
                    endLineSetter = this.editRCC.setter.uuid
                    var topSetter = 600
                    if (endLineGetter != endLineOpration && endLineOpration != null && endLineGetter != null) {
                        topSetter = 800
                    } else if (endLineOpration == null || endLineGetter == null) {
                        topSetter = 400
                    }
                    var isExistSetter = true
                    if (this.$store.getters.getDeleteOpenElement(endLineSetter) == -1) {
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLineSetter, top: this.element.top + topSetter, left: this.element.left + this.$setPositionLeft} )
                        isExistSetter = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLineSetter, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    if (endLineOpration != endLineSetter && endLineSetter != endLineGetter) {
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineSetter)
                            EventBus.$emit('new-line', this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, endLineSetter,isExistSetter)
                        })
                    }
                    if (!isExistSetter) {
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineSetter, 
                                            iscircle:false, refNum:9, idxID: this.refRClient, tabID: this.RportTab})
                    }
                    
                }
                this.setOpenCloseViewUUID(endLineOpration, endLineGetter, endLineSetter)
            }
            this.element.rport[this.RportTab].client[idx].clientCapa = this.editRCC.clientCapa
            this.cancelRCC()
        },
        cancelRCC() {
            this.editRCC = {operation: null, clientCapa: null, getter: null, setter: null}
            this.setactiveUUID()
        },
        addRCC() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.rport[this.RportTab].client.some(item => item.id === n)
            }
            this.editRCC.id = n
            var endLineOpration = null, endLineGetter = null, endLineSetter = null
            if( this.editRCC.operation != null) {
                endLineOpration = this.editRCC.operation.uuid
                var isExist = true
                if (this.$store.getters.getDeleteOpenElement(endLineOpration) == -1) {
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRCC.operation.uuid, top: this.element.top + 400, left: this.element.left + this.$setPositionLeft} )
                    isExist = false
                }
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRCC.operation.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, endLineOpration)
                    this.newLine(this.element.uuid+'/rportCC-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, 
                                  endLineOpration, true, isExist)
                })
                this.editRCC.operation = this.editRCC.operation.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineOpration,
                                    iscircle:false, refNum:9, idxID: this.editRCC.id, tabID: this.RportTab})
            }
            if( this.editRCC.getter != null) {
                endLineGetter = this.editRCC.getter.uuid
                console.log('11 '+ endLineOpration)
                var isUUIDSameGetter = false, isExistGetter = undefined
                if (endLineOpration != this.editRCC.getter.uuid) {
                    var topGetter = 400
                    if (endLineOpration != null) {
                        topGetter = 600
                    }
                    isUUIDSameGetter = true
                    isExistGetter = true
                    if (this.$store.getters.getDeleteOpenElement(endLineGetter) == -1) {
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRCC.getter.uuid, top: this.element.top + topGetter, left: this.element.left + this.$setPositionLeft} )
                        isExistGetter = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRCC.getter.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                }
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, endLineGetter)
                    this.newLine(this.element.uuid+'/rportCCG-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id,
                                    endLineGetter, isUUIDSameGetter, isExistGetter)
                })
                this.editRCC.getter = this.editRCC.getter.name
                if (!isExistGetter) {
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineGetter, 
                                        iscircle:false, refNum:9, idxID: this.editRCC.id, tabID: this.RportTab})
                }
            }
            if( this.editRCC.setter != null) {
                endLineSetter = this.editRCC.setter.uuid
                var isUUIDSameSetter = false, isExistSetter = undefined
                if (endLineGetter != this.editRCC.setter.uuid && this.editRCC.setter.uuid != endLineOpration) {
                    var topSetter = 600
                    console.log('22 '+ endLineOpration+ ' / '+ endLineGetter)
                    if (endLineGetter != endLineOpration && endLineOpration != null && endLineGetter != null) {
                        topSetter = 800
                    } else if (endLineOpration == null || endLineGetter == null) {
                        topSetter = 400
                        
                    }
                    isExistSetter = true
                    if (this.$store.getters.getDeleteOpenElement(this.editRCC.setter.uuid) == -1) {
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editRCC.setter.uuid, top: this.element.top + topSetter, left: this.element.left + this.$setPositionLeft} )
                        isExistSetter = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editRCC.setter.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    isUUIDSameSetter = true
                }
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, endLineSetter)
                    this.newLine(this.element.uuid+'/rportCCS-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, 
                                    endLineSetter, isUUIDSameSetter, isExistSetter)
                })
                this.editRCC.setter = this.editRCC.setter.name
                if (!isExistSetter) {
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, end:endLineSetter, 
                                        iscircle:false, refNum:9, idxID: this.editRCC.id, tabID: this.RportTab})
                }
            }

            this.setOpenCloseViewUUID(endLineOpration, endLineGetter, endLineSetter)
            const addObj = Object.assign({}, this.editRCC)
            this.element.rport[this.RportTab].client.push(addObj);
            this.refRClient = n
            this.cancelRCC()
        },
        setOpenCloseViewUUID(opration, getter, setter) {
            this.$nextTick(() => { 
                if (opration != null && getter == null && setter == null) {
                    EventBus.$emit('Element-open', true, opration)
                } else if (opration == null && getter != null && setter == null) {
                    EventBus.$emit('Element-open', true, getter)
                } else if (opration == null && getter == null && setter != null) {
                    EventBus.$emit('Element-open', true, setter)
                } else if (opration == getter && setter == getter) {
                    EventBus.$emit('Element-open', true, setter)
                }
                var setViewUUID = null
                if (opration != null) {
                    setViewUUID = opration
                } else if (getter != null) {
                    setViewUUID = getter
                } else if (setter != null) {
                    setViewUUID = setter
                }
                if (setViewUUID != null) {
                    document.getElementById(setViewUUID+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            })
        },
        setRCCSelect() {
            if (this.isEditingRCC == true) {
                if (this.editRCC.operation != null && this.editRCC.operation.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRCC.operation.uuid, element: constant.ServiceInterface_str} )
                    //document.getElementById(this.editRCC.operation.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    //EventBus.$emit('active-element', this.editRCC.operation.uuid)
                }
                this.setRCCList()
                this.isEditingRCC = false
            } else {
                this.isEditingRCC = true
            }
        },
        setRCCList() {
            this.selSIMethod = this.$store.getters.getClientServer
            this.setactiveUUID()
        },
        clearRCC() {
            this.isEditingRCC = true
            this.editRCC.operation = null
        },
        setGetterSelect() {
            if (this.isEditingGetter == true) {
                if (this.editRCC.getter != null && this.editRCC.getter.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRCC.getter.uuid, element: constant.ServiceInterface_str} )
                    //document.getElementById(this.editRCC.getter.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    //EventBus.$emit('active-element', this.editRCC.getter.uuid)
                }
                this.setPFSCList()
                this.isEditingGetter = false
            } else {
                this.isEditingGetter = true
            }
        },
        clearGetter() {
            this.isEditingGetter = true
            this.editRCC.getter = null
        },
        setSetterSelect() {
            if (this.isEditingSetter == true) {
                if (this.editRCC.setter != null && this.editRCC.setter.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRCC.setter.uuid, element: constant.ServiceInterface_str} )
                    //document.getElementById(this.editRCC.setter.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    //EventBus.$emit('active-element', this.editRCC.setter.uuid)
                }
                this.setPFSCList()
                this.isEditingSetter = false
            } else {
                this.isEditingSetter = true
            }
        },
        clearSetter() {
            this.isEditingSetter = true
            this.editRCC.setter = null
        },

        newServiceInterface() {
            this.$store.commit('addElementService', {
                    name: this.$store.getters.getNameServiceInterface, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10,  icon:"mdi-clipboard-outline", validation: false,
                    versionMaj:'', versionMin:'', namespace:'', events:[], fields:[], methods:[], isservice: null,
                })
            EventBus.$emit('add-element', constant.ServiceInterface_str)
            EventBus.$emit('add-element', constant.Service_str)
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
            this.editARXML.pport = JSON.parse(JSON.stringify(this.element.pport))
            this.editARXML.rport = JSON.parse(JSON.stringify(this.element.rport))
            this.editARXML.prport = JSON.parse(JSON.stringify(this.element.prport))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editSWComponents', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.editTableList()
            var endLine = null, changEndLine = null

            if (this.editARXML.pport.length > 0) {
                this.editARXML.pport.forEach(item => {
                    item.queued.forEach(data => {
                        var isHaveTable = false
                        this.element.pport.forEach(port => {
                            port.queued.forEach(que => {
                                if (que.id == data.id&& que.dataE == data.dataE) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.dataE, 1)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id, this.element.uuid+'/pport', changEndLine, false)
                            }
                        }

                        if (data.senderCapa != null) {
                            data.senderCapa = data.senderCapa.toUpperCase()
                            if(!(data.senderCapa == 'WILL-SEND' || data.senderCapa == 'WONT-SEND')) {
                                data.senderCapa = null
                            }
                        }
                    })
                    item.field.forEach(data => {
                        var isHaveTable = false
                        this.element.pport.forEach(port => {
                            port.field.forEach(fie => {
                                if (fie.id == data.id && fie.dataE == data.dataE) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.dataE, 2)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id, this.element.uuid+'/pport', changEndLine, false)
                            }
                        }

                        if (data.senderCapa != null) {
                            data.senderCapa = data.senderCapa.toUpperCase()
                            if(!(data.senderCapa == 'WILL-SEND' || data.senderCapa == 'WONT-SEND')) {
                                data.senderCapa = null
                            }
                        }
                    })
                    item.server.forEach(data => {
                        var isHaveTable = false
                        this.element.pport.forEach(port => {
                            port.server.forEach(ser => {
                                if (ser.id == data.id && ser.oper == data.oper) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.oper, 3)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id, this.element.uuid+'/pport', changEndLine, false)
                            }
                        }
                    })
                    var isHaveTableR = false
                    this.element.pport.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.interface == item.interface) {
                                isHaveTableR = true
                            }
                            if (ele.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                changeName: 'pPort', listname: item.name, beforename: ele.name} )
                            }
                        }
                    })
                    if (!isHaveTableR) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/PPortI-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfacePath(item.interface, 0)
                        if (changEndLine != null) {
                            item.selectI = "SERVICE-INTERFACE"
                            this.newLine(this.element.uuid+'/PPortI-'+item.id, this.element.uuid+'/pport', changEndLine, false)
                        } else {
                            changEndLine = this.$store.getters.getPHMRecoveryPath(item.interface)
                            if (changEndLine != null) {
                                item.selectI = "PHM-RECOVERY-ACTION-INTERFACE"
                                this.newLine(this.element.uuid+'/PPortI-'+item.id, this.element.uuid+'/pport', changEndLine, false)
                            }
                        }
                    }
                })
                this.element.pport.forEach(item => {
                    var isHaveTable = false
                    item.queued.forEach(data => {
                        isHaveTable = false
                        this.editARXML.pport.forEach(edit => {
                            edit.queued.forEach(editA => {
                                if (editA.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    item.field.forEach(data => {
                        isHaveTable = false
                        this.editARXML.pport.forEach(edit => {
                            edit.field.forEach(editE => {
                                if (editE.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    item.server.forEach(data => {
                        isHaveTable = false
                        this.editARXML.pport.forEach(edit => {
                            edit.server.forEach(editE => {
                                if (editE.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.oper != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    isHaveTable = false
                    this.editARXML.pport.forEach(edit => {
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
                    }
                })
            } else {
                if (this.element.pport.length > 0) {
                    this.element.pport.forEach(item => {
                        item.queued.forEach(data => {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/pportQSC-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        item.field.forEach(data => {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/pportFSC-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        item.server.forEach(data => {
                            if (data.oper != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/pportSC-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        if (item.interface != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/PPortI-'+item.id)
                            }
                        }
                    })
                }
            }

            if (this.editARXML.rport.length > 0) {
                this.editARXML.rport.forEach(item => {
                    item.queued.forEach(data => {
                        var isHaveTable = false
                        this.element.rport.forEach(port => {
                            port.queued.forEach(que => {
                                if (que.id == data.id && que.dataE == data.dataE) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.dataE, 1)
                            if (changEndLine != null) {
                                data.select = "VARIABLE-DATA-PROTOTYPE"
                                this.newLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                            } else {
                                changEndLine = this.$store.getters.getServiceInterfacePath(data.dataE, 2)
                                if (changEndLine != null) {
                                    data.select = "FIELD"
                                    this.newLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                                }
                            }
                        }

                        if (data.receiveCapa != null) {
                            data.receiveCapa = data.receiveCapa.toUpperCase()
                            if(!(data.receiveCapa == 'WILL-RECEIVE' || data.receiveCapa == 'WONT-RECEIVE')) {
                                data.receiveCapa = null
                            }
                        }
                    })
                    item.client.forEach(data => {
                        var isHaveTableC = false, isHaveTableT = false
                        this.element.rport.forEach(port => {
                            port.client.forEach(cli => {
                                if (cli.id == data.id ) {
                                    if (cli.operation == data.operation) {
                                        isHaveTableC = true
                                    }
                                    if (cli.getter == data.getter) {
                                        isHaveTableT = true
                                    }
                                    if (cli.setter == data.setter) {
                                        isHaveTableT = true
                                    }
                                }
                            })
                        })
                        if (!isHaveTableC) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCC-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/rportCC-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.operation, 3)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/rportCC-'+data.id+'-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                            }
                        }
                        if (!isHaveTableT) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCG-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/rportCCG-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.getter, 2)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/rportCCG-'+data.id+'-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                            }
                        }
                        if (!isHaveTableT) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportCCS-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/rportCCS-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getServiceInterfacePath(data.setter, 2)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/rportCCS-'+data.id+'-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                            }
                        }

                        if (data.clientCapa != null) {
                            data.clientCapa = data.clientCapa.toUpperCase()
                            if(!(data.clientCapa == 'WILL-CALL' || data.clientCapa == 'WONT-CALL')) {
                                data.clientCapa = null
                            }
                        }
                    })
                    var isHaveTableI = false
                    this.element.rport.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.interface == item.interface) {
                                isHaveTableI = true
                            }
                            if (ele.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                changeName: 'rPort', listname: item.name, beforename: ele.name} )
                            }
                        }
                    })
                    if (!isHaveTableI) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/RPortI-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfacePath(item.interface, 0)
                        if (changEndLine != null) {
                            item.selectI = "SERVICE-INTERFACE"
                            this.newLine(this.element.uuid+'/RPortI-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                        } else {
                            changEndLine = this.$store.getters.getPHMHealthPath(item.interface)
                            if (changEndLine != null) {
                                item.selectI = "PHM-HEALTH-CHANNEL-INTERFACE"
                                this.newLine(this.element.uuid+'/RPortI-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                            } else {
                                changEndLine = this.$store.getters.getPHMSupervisedPath(item.interface)
                                if (changEndLine != null) {
                                    item.selectI = "PHM-SUPERVISED-ENTITY-INTERFACE"
                                    this.newLine(this.element.uuid+'/RPortI-'+item.id, this.element.uuid+'/rport', changEndLine, false)
                                }
                            }
                        }
                    }
                })
                this.element.rport.forEach(item => {
                    var isHaveTable = false
                    item.queued.forEach(data => {
                        isHaveTable = false
                        this.editARXML.rport.forEach(edit => {
                            edit.queued.forEach(editA => {
                                if (editA.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    item.client.forEach(data => {
                        isHaveTable = false
                        this.editARXML.rport.forEach(edit => {
                            edit.client.forEach(editE => {
                                if (editE.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.operation != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportCC-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.getter != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportCCG-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.setter != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportCCS-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    isHaveTable = false
                    this.editARXML.rport.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.interface != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/RPortI-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.rport.length > 0) {
                    this.element.rport.forEach(item => {
                        item.queued.forEach(data => {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportQRC-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        item.client.forEach(data => {
                            if (data.operation != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgcontext-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportCC-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.getter != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportCCG-'+data.id+'-'+item.id)
                                }
                            }
                            if (data.setter != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/fgtarget-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/rportCCS-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        if (item.interface != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/RPortI-'+item.id)
                            }
                        }
                    })
                }
            }

            if (this.editARXML.prport.length > 0) {
                this.editARXML.prport.forEach(item => {
                    item.provide.forEach(data => {
                        var isHaveTable = false
                        this.element.prport.forEach(port => {
                            port.provide.forEach(pro => {
                                if (pro.id == data.id && pro.dataE == data.dataE) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getPERKeyValueDIPath(data.dataE)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id, this.element.uuid+'/prport', changEndLine, false)
                            }
                        }
                    })
                    var isHaveTableR = false
                    this.element.prport.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.interface == item.interface) {
                                isHaveTableR = true
                            }
                             if (ele.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                changeName: 'prPort', listname: item.name, beforename: ele.name} )
                            }
                        }
                    })
                    if (!isHaveTableR) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/PRPortI-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfacePath(item.interface, 0)
                        if (changEndLine != null) {
                            item.selectI = "SERVICE-INTERFACE"
                            this.newLine(this.element.uuid+'/PRPortI-'+item.id, this.element.uuid+'/prport', changEndLine, false)
                        } else {
                            changEndLine = this.$store.getters.getPERFileProxyPath(item.interface)
                            if (changEndLine != null) {
                                item.selectI = "PERSISTENCY-FILE-PROXY-INTERFACE"
                                this.newLine(this.element.uuid+'/PRPortI-'+item.id, this.element.uuid+'/prport', changEndLine, false)
                            } else {
                                changEndLine = this.$store.getters.getPERKeyValueDIPath(item.interface)
                                if (changEndLine != null) {
                                    item.selectI = "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE"
                                    this.newLine(this.element.uuid+'/PRPortI-'+item.id, this.element.uuid+'/prport', changEndLine, false)
                                }
                            }
                        }
                    }
                })
                this.element.prport.forEach(item => {
                    var isHaveTable = false
                    item.provide.forEach(data => {
                        isHaveTable = false
                        this.editARXML.prport.forEach(edit => {
                            edit.provide.forEach(editA => {
                                if (editA.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id)
                                }
                            }
                        }
                    })
                    isHaveTable = false
                    this.editARXML.prport.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.interface != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/PRPortI-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.prport.length > 0) {
                    this.element.prport.forEach(item => {
                        item.provide.forEach(data => {
                            if (data.dataE != null) {
                                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/prporttab-'+data.id+'-'+item.id)
                                }
                            }
                        })
                        if (item.interface != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/PRPortI-'+item.id)
                            }
                        }
                    })
                }
            }

            this.element.pport = JSON.parse(JSON.stringify(this.editARXML.pport))
            this.element.rport = JSON.parse(JSON.stringify(this.editARXML.rport))
            this.element.prport = JSON.parse(JSON.stringify(this.editARXML.prport))
            this.cancelARXML()
        },
        editTableList() {
            if (this.editARXML.pport.length > 0) {
                this.element.pport.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.pport.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'ptab', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    }
                })
            } else {
                if (this.element.pport.length > 0) {
                    this.element.pport.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'ptab', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    })
                }
            }

            if (this.editARXML.rport.length > 0) {
                this.element.rport.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.rport.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'rtab', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    }
                })
            } else {
                if (this.element.rport.length > 0) {
                    this.element.rport.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'rtab', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    })
                }
            }

            if (this.editARXML.prport.length > 0) {
                this.element.prport.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.prport.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'prtab', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    }
                })
            } else {
                if (this.element.prport.length > 0) {
                    this.element.prport.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'prtab', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    })
                }
            }

        },
        cancelARXML() {
            this.editARXML = {name:'', pport: [], rport: [], prport: []}
            this.editTextPport = {name: '', selectI: null, interface: null, queued: [], field: [], server: [], id: ''}
            this.editTextRport = {name: '', selectI: null, interface: null, queued: [], client: [], id: ''}
            this.editTextPRport = {name: '', selectI: null, interface: null, provide: [], id: ''}
            this.editTextQSender = {dataE: null, senderCapa:null, id: ''}
            this.editTextField = {dataE: null, senderCapa:null, id: ''}
            this.editTextServer = {oper: null, id: ''}
            this.editTextProvided = {dataE: null, id: ''}
            this.editTextQReceiver = {select: null, dataE: null, receiveCapa:null, id: ''}
            this.editTextClient = {operation: null, clientCapa:null, getter: null, setter: null, id: ''}
            this.dialogText = false
        },
        newTextPport() {
            this.editTextPport = {name: '', selectI: null, interface: null, queued: [], field: [], server: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextPport.name = 'PPort_' + n++;
                res = this.editARXML.pport.some(item => item.id === n)
            }
            this.editTextPport.id = n

            const addObj = Object.assign({}, this.editTextPport)
            this.editARXML.pport.push(addObj);
        },
        deletTextPport(idx) {
            this.editARXML.pport.splice(idx,1)
        },
        newTextPRport() {
            this.editTextPRport = {name: '', selectI: null, interface: null, provide: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextPRport.name = 'PRPort_' + n++;
                res = this.editARXML.prport.some(item => item.id === n)
            }
            this.editTextPRport.id = n

            const addObj = Object.assign({}, this.editTextPRport)
            this.editARXML.prport.push(addObj);
        },
        deletTextPRport(idx) {
            this.editARXML.prport.splice(idx,1)
        },
        newTextRport() {
            this.editTextRport = {name: '', selectI: null, interface: null, queued: [], client: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextRport.name = 'RPort_' + n++;
                res = this.editARXML.rport.some(item => item.id === n)
            }
            this.editTextRport.id = n

            const addObj = Object.assign({}, this.editTextRport)
            this.editARXML.rport.push(addObj);
        },
        deletTextRport(idx) {
            this.editARXML.rport.splice(idx,1)
        },
        newTextQSender(idxP) {
            this.editTextQSender = {dataE: null, senderCapa: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.pport[idxP].queued.some(item => item.id === n)
            }
            this.editTextQSender.id = n

            const addObj = Object.assign({}, this.editTextQSender)
            this.editARXML.pport[idxP].queued.push(addObj);
        },
        deletTextQSender(idx, idxP) {
            this.editARXML.pport[idxP].queued.splice(idx,1)
        },
        newTextField(idxP) {
            this.editTextField = {dataE: null, senderCapa: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.pport[idxP].field.some(item => item.id === n)
            }
            this.editTextField.id = n

            const addObj = Object.assign({}, this.editTextField)
            this.editARXML.pport[idxP].field.push(addObj);
        },
        deletTextField(idx, idxP) {
            this.editARXML.pport[idxP].field.splice(idx,1)
        },
        newTextServer(idxP) {
            this.editTextServer = {oper: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.pport[idxP].server.some(item => item.id === n)
            }
            this.editTextServer.id = n

            const addObj = Object.assign({}, this.editTextServer)
            this.editARXML.pport[idxP].server.push(addObj);
        },
        deletTextServer(idx, idxP) {
            this.editARXML.pport[idxP].server.splice(idx,1)
        },
        newTextQReceiver(idxP) {
            this.editTextQReceiver = {select: null, dataE: null, receiveCapa:null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.rport[idxP].queued.some(item => item.id === n)
            }
            this.editTextQReceiver.id = n

            const addObj = Object.assign({}, this.editTextQReceiver)
            this.editARXML.rport[idxP].queued.push(addObj);
        },
        deletTextQReceiver(idx, idxP) {
            this.editARXML.rport[idxP].queued.splice(idx,1)
        },
        newTextClient(idxP) {
            this.editTextClient = {operation: null, clientCapa:null, getter: null, setter: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.rport[idxP].client.some(item => item.id === n)
            }
            this.editTextClient.id = n

            const addObj = Object.assign({}, this.editTextClient)
            this.editARXML.rport[idxP].client.push(addObj);
        },
        deletTextClient(idx, idxP) {
            this.editARXML.rport[idxP].client.splice(idx,1)
        },
        newTextProvided(idxP) {
            this.editTextProvided = {dataE: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.prport[idxP].provide.some(item => item.id === n)
            }
            this.editTextProvided.id = n

            const addObj = Object.assign({}, this.editTextProvided)
            this.editARXML.prport[idxP].provide.push(addObj);
        },
        deletTextProvided(idx, idxP) {
            this.editARXML.prport[idxP].provide.splice(idx,1)
        },
    },
}
</script>
