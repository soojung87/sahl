<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SW Component Type</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSWComponentName' outlined dense></v-text-field>
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
                                                    <v-select v-model="tab.selectI" :items="selectPInterfaceList" @change="inputSelectPInterf" clearable @click:clear='clearPInterface()' label="Select Provided Interface" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    <v-row>
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.interface" readonly @click="setPInterfaceSelect()" clearable @click:clear='clearPInterface()' label="Interface TReference" style="height:45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                            <v-data-table v-model="selectDelectPQSC" :headers="headerPQSC" :items="tab.queued" :items-per-page='20'
                                                                    :show-select="isdeletePQSC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeletePQSC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openPQSC(num)" @cancel="editPQSCItem(num)" @save="cancelPQSC" large >
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
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addPQSC()" @save="cancelPQSC"> 
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
                                                            <v-data-table v-model="selectDelectPFSC" :headers="headerPFSC" :items="tab.field" :items-per-page='20'
                                                                    :show-select="isdeletePFSC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeletePFSC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openPFSC(num)" @cancel="editPFSCItem(num)" @save="cancelPFSC" large >
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
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addPFSC()" @save="cancelPFSC"> 
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
                                                            <v-data-table v-model="selectDelectSC" :headers="headerSC" :items="tab.server" :items-per-page='20'
                                                                    :show-select="isdeleteSC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteSC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openSC(num)" @cancel="editSCItem(num)" @save="cancelSC" large >
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
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addSC()" @save="cancelSC"> 
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
                                                    <v-select v-model="tab.selectI" :items="selectPRInterfaceList" @change="inputSelectPRInterf" clearable @click:clear='clearPRInterface()' label="Select Provided Required Interface" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    <v-row>
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.interface" readonly @click="setPRInterfaceSelect()" clearable @click:clear='clearPRInterface()' label="Interface TReference" style="height:45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/prporttab'+tab.id">
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
                                                            <v-data-table v-model="selectDelectPRProvide" :headers="headerPRProvide" :items="tab.provide" :items-per-page='20'
                                                                    :show-select="isdeletePRProvide" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeletePRProvide" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openPRProvide(num)" @cancel="editPRProvideItem(num)" @save="cancelPRProvide" large >
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
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addPRProvide()" @save="cancelPRProvide"> 
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
                                                    <v-select v-model="tab.selectI" :items="selectRInterfaceList" @change="inputSelectRInterf" clearable @click:clear='clearRInterface()' label="Select Required Interface" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    <v-row>
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.interface" readonly @click="setRInterfaceSelect()" clearable @click:clear='clearRInterface()' label="Interface TReference" style="height:45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                            <v-data-table v-model="selectDelectRQRC" :headers="headerRQRC" :items="tab.queued" :items-per-page='20'
                                                                    :show-select="isdeleteRQRC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteRQRC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openRQRC(num)" @cancel="editRQRCItem(num)" @save="cancelRQRC" large >
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
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addRQRC()" @save="cancelRQRC"> 
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
                                                            <v-data-table v-model="selectDelectRCC" :headers="headerRCC" :items="tab.client" :items-per-page='20'
                                                                    :show-select="isdeleteRCC" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteRCC" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openRCC(num)" @cancel="editRCCItem(num)" @save="cancelRCC" large >
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
                                                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addRCC()" @save="cancelRCC"> 
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
            iselementOpenClose: this.minimaptoolbar,
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
                { text: 'Data Element Ref', sortable: false, value: 'dataE' },
                { text: 'Sender Capability', sortable: false, value: 'senderCapa' },
            ],
            editPQSC: { dataE: null, senderCapa:null, id: ''},
            isEditingPQSC: true,

            isPFSCOpenClose: true,
            isdeletePFSC: false,
            selectDelectPFSC: [],
            headerPFSC: [
                { text: 'Data Element Ref', sortable: false, value: 'dataE' },
                { text: 'Sender Capability', sortable: false, value: 'senderCapa' },
            ],
            editPFSC: { dataE: null, senderCapa:null, id: ''},
            isEditingPFSC: true,

            isSCOpenClose: true,
            isdeleteSC: false,
            selectDelectSC: [],
            headerSC: [
                { text: 'Operation Ref', sortable: false, value: 'oper' },
            ],
            editSC: { oper: null, id: ''},
            isEditingSC: true,

            PRportTab: null,
            isPRProvideOpenClose: true,
            isdeletePRProvide: false,
            selectDelectPRProvide: [],
            headerPRProvide: [
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
            beforeRport: ''
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
        showSWComponent() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
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
        },
        showPPort() {
            this.isPPortOpenClose = this.isPPortOpenClose ? false : true
            if(this.element.pport.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isPPortOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, this.PportTab, this.element.pport[this.PportTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showPQSC() {
            this.isPQSCOpenClose = this.isPQSCOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showPFSC() {
            this.isPFSCOpenClose = this.isPFSCOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showSC() {
            this.isSCOpenClose = this.isSCOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showPRPort() {
            this.isPRPortOpenClose = this.isPRPortOpenClose ? false : true
            if(this.element.prport.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isPRPortOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, this.PRportTab, this.element.prport[this.PRportTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }

        },
        showPRProvide() {
            this.isPRProvideOpenClose = this.isPRProvideOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showRPort() {
            this.isRPortOpenClose = this.isRPortOpenClose ? false : true
            if(this.element.rport.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isRPortOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, this.RportTab, this.element.rport[this.RportTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }

        },
        showRQRC() {
            this.isRQRCOpenClose = this.isRQRCOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        showRCC() {
            this.isRCCOpenClose = this.isRCCOpenClose ? false : true
            EventBus.$emit('drawLine')
        },
        inputSWComponentName() {
            this.$store.commit('editSWComponents', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickPportName(name) {
            this.beforePport = name
        },
        clickPRportName(name) {
            this.beforePRport = name
        },
        clickRportName(name) {
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
        },
        setPInterfaceSelect() {
            if (this.element.pport[this.PportTab].selectI != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
                if (endLine == undefined) {
                    if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].interface)
                    } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                        endLine = this.$store.getters.getPHMRecoveryPath(this.element.pport[this.PportTab].interface)
                    } 
                }
                if (endLine != null) {
                    if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                    } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.RecoveryVA_str} )
                    }
                    document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)
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
            if( this.element.pport[this.PportTab].interface != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    this.deleteLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id)
                }
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, this.element.uuid+'/PPortI-'+ this.element.pport[this.PportTab].id, item.uuid)
                }
                this.element.pport[this.PportTab].interface = item.name
            }
            this.setactiveUUID()
        },
        newPInterface() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            if (this.element.pport[this.PportTab].selectI == "SERVICE-INTERFACE") {
                this.newServiceInterface()
            } else if (this.element.pport[this.PportTab].selectI == "PHM-RECOVERY-ACTION-INTERFACE") {
                this.$store.commit('addElementPHMRecovery', {
                    name: this.$store.getters.getNamePHMRecovery, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    reconame: '', faf: null
                })                
                EventBus.$emit('add-element', constant.RecoveryVA_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.Platform_str)

            } 
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addPport() {
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
            if(this.element.pport.length > 0 && this.location == 1 && this.PportTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'pport', this.element.uuid, this.PportTab, this.element.pport[this.PportTab].id)}, 300);
            }
        },
        deletePport(idx) {
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
            if (this.isdeletePQSC == true) {
                this.isdeletePQSC = false
                this.selectDelectPQSC = []
            } else {
                this.isdeletePQSC = true
            }
        },
        deletePQSC() {
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
                this.newLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, this.editPQSC.dataE.uuid)
                this.element.pport[this.PportTab].queued[idx].dataE = this.editPQSC.dataE.name
            } else if (endLine == undefined && this.editPQSC.dataE != null && this.editPQSC.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].queued[idx].id+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, this.editPQSC.dataE.uuid)
                this.element.pport[this.PportTab].queued[idx].dataE = this.editPQSC.dataE.name
            } else if (this.editPQSC.dataE != null && endLine == this.editPQSC.dataE.uuid && this.element.pport[this.PportTab].queued[idx].dataE != this.editPQSC.dataE.name) {
                this.element.pport[this.PportTab].queued[idx].dataE = this.editPQSC.dataE.name
            }
            this.element.pport[this.PportTab].queued[idx].senderCapa = this.editPQSC.senderCapa
            this.cancelPQSC()
        },
        cancelPQSC() {
            this.editPQSC = {dataE: null, senderCapa: null}
            this.setactiveUUID()
        },
        addPQSC() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport[this.PportTab].queued.some(item => item.id === n)
            }
            this.editPQSC.id = n

            if( this.editPQSC.dataE != null) {
                this.newLine(this.element.uuid+'/pportQSC-'+n+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportQSC-'+this.element.pport[this.PportTab].id, this.editPQSC.dataE.uuid)
                this.editPQSC.dataE = this.editPQSC.dataE.name
            }

            const addObj = Object.assign({}, this.editPQSC)
            this.element.pport[this.PportTab].queued.push(addObj);
            this.cancelPQSC()
        },
        setPQSCSelect() {
            if (this.isEditingPQSC == true) {
                if (this.editPQSC.dataE != null && this.editPQSC.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPQSC.dataE.uuid, element: constant.ServiceInterface_str} )
                    document.getElementById(this.editPQSC.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editPQSC.dataE.uuid)
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
            if (this.isdeletePFSC == true) {
                this.isdeletePFSC = false
                this.selectDelectPFSC = []
            } else {
                this.isdeletePFSC = true
            }
        },
        deletePFSC() {
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
                this.newLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, this.editPFSC.dataE.uuid)
                this.element.pport[this.PportTab].field[idx].dataE = this.editPFSC.dataE.name
            } else if (endLine == undefined && this.editPFSC.dataE != null && this.editPFSC.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].field[idx].id+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, this.editPFSC.dataE.uuid)
                this.element.pport[this.PportTab].field[idx].dataE = this.editPFSC.dataE.name
            } else if (this.editPFSC.dataE != null && endLine == this.editPFSC.dataE.uuid && this.element.pport[this.PportTab].field[idx].dataE != this.editPFSC.dataE.name) {
                this.element.pport[this.PportTab].field[idx].dataE = this.editPFSC.dataE.name
            }
            this.element.pport[this.PportTab].field[idx].senderCapa = this.editPFSC.senderCapa
            this.cancelPFSC()
        },
        cancelPFSC() {
            this.editPFSC = {dataE: null, senderCapa: null}
            this.setactiveUUID()
        },
        addPFSC() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport[this.PportTab].field.some(item => item.id === n)
            }
            this.editPFSC.id = n

            if( this.editPFSC.dataE != null) {
                this.newLine(this.element.uuid+'/pportFSC-'+n+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportFSC-'+this.element.pport[this.PportTab].id, this.editPFSC.dataE.uuid)
                this.editPFSC.dataE = this.editPFSC.dataE.name
            }

            const addObj = Object.assign({}, this.editPFSC)
            this.element.pport[this.PportTab].field.push(addObj);
            this.cancelPFSC()
        },
        setPFSCSelect() {
            if (this.isEditingPFSC == true) {
                if (this.editPFSC.dataE != null && this.editPFSC.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPFSC.dataE.uuid, element: constant.ServiceInterface_str} )
                    document.getElementById(this.editPFSC.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editPFSC.dataE.uuid)
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
            if (this.isdeleteSC == true) {
                this.isdeleteSC = false
                this.selectDelectSC = []
            } else {
                this.isdeleteSC = true
            }
        },
        deleteSC() {
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
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.pport[this.PportTab].server[idx].oper, 2)
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
                this.newLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, this.editSC.oper.uuid)
                this.element.pport[this.PportTab].server[idx].oper = this.editSC.oper.name
            } else if (endLine == undefined && this.editSC.oper != null && this.editSC.oper.uuid != null) {
                this.newLine(this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].server[idx].id+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, this.editSC.oper.uuid)
                this.element.pport[this.PportTab].server[idx].oper = this.editSC.oper.name
            } else if (this.editSC.oper != null && endLine == this.editSC.oper.uuid && this.element.pport[this.PportTab].server[idx].oper != this.editSC.oper.name) {
                this.element.pport[this.PportTab].server[idx].oper = this.editSC.oper.name
            }
            this.cancelSC()
        },
        cancelSC() {
            this.editSC = {oper: null}
            this.setactiveUUID()
        },
        addSC() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.pport[this.PportTab].server.some(item => item.id === n)
            }
            this.editSC.id = n

            if( this.editSC.oper != null) {
                this.newLine(this.element.uuid+'/pportSC-'+n+'-'+this.element.pport[this.PportTab].id, this.element.uuid+'/pportSC-'+this.element.pport[this.PportTab].id, this.editSC.oper.uuid)
                this.editSC.oper = this.editSC.oper.name
            }

            const addObj = Object.assign({}, this.editSC)
            this.element.pport[this.PportTab].server.push(addObj);
            this.cancelSC()
        },
        setSCSelect() {
            if (this.isEditingSC == true) {
                if (this.editSC.oper != null && this.editSC.oper.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editSC.oper.uuid, element: constant.ServiceInterface_str} )
                    document.getElementById(this.editSC.oper.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editSC.oper.uuid)
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
        },
        setPRInterfaceSelect() {
            if (this.element.prport[this.PRportTab].selectI != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
                if (endLine == undefined) {
                    if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.prport[this.PRportTab].interface)
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                        endLine = this.$store.getters.getPERFileProxyPath(this.element.prport[this.PRportTab].interface)
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                        endLine = this.$store.getters.getPERKeyValueDIPath(this.element.prport[this.PRportTab].interface)
                    }
                }
                if (endLine != null) {
                    if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.FileProxyInterf_str} )
                    } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.KeyValueDI_str} )
                    }
                    document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)
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
            if( this.element.prport[this.PRportTab].interface != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    this.deleteLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id)
                }
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/PRPortI-'+ this.element.prport[this.PRportTab].id, this.element.uuid+'/PRPortI-'+this.element.prport[this.PRportTab].id, item.uuid)
                }
                this.element.prport[this.PRportTab].interface = item.name
            }
            this.setactiveUUID()
        },
        newPRInterface() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            if (this.element.prport[this.PRportTab].selectI == "SERVICE-INTERFACE") {
                this.newServiceInterface()
            } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-FILE-PROXY-INTERFACE") {
                this.$store.commit('addElementPERFileProxy', {
                    name: this.$store.getters.getNamePERFileProxy, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category: '', minisize: '', redundancy: null, updateS: null, encoding: '', proxy: [], maxfiles: ''
                })
                EventBus.$emit('add-element', constant.FileProxyInterf_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.Platform_str)

            } else if (this.element.prport[this.PRportTab].selectI == "PERSISTENCY-KEY-VALUE-DATABASE-INTERFACE") {
                this.$store.commit('addElementPERKeyValueDI', {
                    name: this.$store.getters.getNamePERKeyValueDI, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    minisize: '', redundancy: null, updateS: null, data: [], serialization: []
                })
                EventBus.$emit('add-element', constant.KeyValueDI_str)
                EventBus.$emit('add-element', constant.PER_str)
                EventBus.$emit('add-element', constant.Platform_str)
            }
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addPRport() {
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
            if(this.element.prport.length > 0 && this.location == 1 && this.PRportTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'prport', this.element.uuid, this.PRportTab, this.element.prport[this.PRportTab].id)}, 300);
            }
        },
        deletePRport(idx) {
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
            if (this.isdeletePRProvide == true) {
                this.isdeletePRProvide = false
                this.selectDelectPRProvide = []
            } else {
                this.isdeletePRProvide = true
            }
        },
        deletePRProvide() {
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
                this.newLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id, this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, this.editPRProvide.dataE.uuid)
                this.element.prport[this.PRportTab].provide[idx].dataE = this.editPRProvide.dataE.name
            } else if (endLine == undefined && this.editPRProvide.dataE != null && this.editPRProvide.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/prporttab-'+this.element.prport[this.PRportTab].provide[idx].id+'-'+this.element.prport[this.PRportTab].id, this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, this.editPRProvide.dataE.uuid)
                this.element.prport[this.PRportTab].provide[idx].dataE = this.editPRProvide.dataE.name
            } else if (this.editPRProvide.dataE != null && endLine == this.editPRProvide.dataE.uuid && this.element.prport[this.PRportTab].provide[idx].dataE != this.editPRProvide.dataE.name) {
                this.element.prport[this.PRportTab].provide[idx].dataE = this.editPRProvide.dataE.name
            }

            this.cancelPRProvide()
        },
        cancelPRProvide() {
            this.editPRProvide = {dataE: null}
            this.setactiveUUID()
        },
        addPRProvide() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.prport[this.PRportTab].provide.some(item => item.id === n)
            }
            this.editPRProvide.id = n

            if( this.editPRProvide.dataE != null) {
                this.newLine(this.element.uuid+'/prporttab-'+n+'-'+this.element.prport[this.PRportTab].id, this.element.uuid+'/prporttab'+this.element.prport[this.PRportTab].id, this.editPRProvide.dataE.uuid)
                this.editPRProvide.dataE = this.editPRProvide.dataE.name
            }

            const addObj = Object.assign({}, this.editPRProvide)
            this.element.prport[this.PRportTab].provide.push(addObj);
            this.cancelPRProvide()
        },
        setPRProvideSelect() {
            if (this.isEditingPRProvide == true) {
                if (this.editPRProvide.dataE != null && this.editPRProvide.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editPRProvide.dataE.uuid, element: constant.KeyValueDI_str} )
                    document.getElementById(this.editPRProvide.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editPRProvide.dataE.uuid)
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
        },
        setRInterfaceSelect() {
            if (this.element.rport[this.RportTab].selectI != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
                if (endLine == undefined) {
                    if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.rport[this.RportTab].interface)
                    } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                        endLine = this.$store.getters.getPHMHealthPath(this.element.rport[this.RportTab].interface)
                    } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                        endLine = this.$store.getters.getPHMSupervisedPath(this.element.rport[this.RportTab].interface)
                    } 
                }
                if (endLine != null) {
                    if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                    } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.HealthChannel_str} )
                    } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                        this.$store.commit('setDetailView', {uuid: endLine, element: constant.PHMSupervised_str} )
                    }
                    document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)
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
            if( this.element.rport[this.RportTab].interface != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    this.deleteLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id)
                }
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, this.element.uuid+'/RPortI-'+ this.element.rport[this.RportTab].id, item.uuid)
                }
                this.element.rport[this.RportTab].interface = item.name
            }
            this.setactiveUUID()
        },
        newRInterface() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            if (this.element.rport[this.RportTab].selectI == "SERVICE-INTERFACE") {
                this.newServiceInterface()
            } else if (this.element.rport[this.RportTab].selectI == "PHM-HEALTH-CHANNEL-INTERFACE") {
                this.$store.commit('addElementPHMHealth', {
                    name: this.$store.getters.getNamePHMHealth, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    status: []
                })
                EventBus.$emit('add-element', constant.HealthChannel_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.Platform_str)
            } else if (this.element.rport[this.RportTab].selectI == "PHM-SUPERVISED-ENTITY-INTERFACE") {
                this.$store.commit('addElementPHMSupervised', {
                    name: this.$store.getters.getNamePHMSupervised, path: '',
                    top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    checkpoint: []
                })              
                EventBus.$emit('add-element', constant.PHMSupervised_str)
                EventBus.$emit('add-element', constant.PHM_str)
                EventBus.$emit('add-element', constant.Platform_str)
            } 
            this.$store.commit('editSWComponents', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addRport() {
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
            if(this.element.rport.length > 0 && this.location == 1 && this.RportTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'rport', this.element.uuid, this.RportTab, this.element.rport[this.RportTab].id)}, 300);
            }
        },
        deleteRport(idx) {
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
            }

            this.element.rport.splice(idx, 1)
        },
        isCheckRQRC() {
            if (this.isdeleteRQRC == true) {
                this.isdeleteRQRC = false
                this.selectDelectRQRC = []
            } else {
                this.isdeleteRQRC = true
            }
        },
        deleteRQRC() {
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
                this.newLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, this.editRQRC.dataE.uuid)
                this.element.rport[this.RportTab].queued[idx].dataE = this.editRQRC.dataE.name
            } else if (endLine == undefined && this.editRQRC.dataE != null && this.editRQRC.dataE.uuid != null) {
                this.newLine(this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].queued[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, this.editRQRC.dataE.uuid)
                this.element.rport[this.RportTab].queued[idx].dataE = this.editRQRC.dataE.name
            } else if (this.editRQRC.dataE != null && endLine == this.editRQRC.dataE.uuid && this.element.rport[this.RportTab].queued[idx].dataE != this.editRQRC.dataE.name) {
                this.element.rport[this.RportTab].queued[idx].dataE = this.editRQRC.dataE.name
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
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.rport[this.RportTab].queued.some(item => item.id === n)
            }
            this.editRQRC.id = n

            if( this.editRQRC.dataE != null) {
                this.newLine(this.element.uuid+'/rportQRC-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportQRC-'+this.element.rport[this.RportTab].id, this.editRQRC.dataE.uuid)
                this.editRQRC.dataE = this.editRQRC.dataE.name
            }

            const addObj = Object.assign({}, this.editRQRC)
            this.element.rport[this.RportTab].queued.push(addObj);
            this.cancelRQRC()
        },
        setRQRCSelect() {
            if (this.isEditingRQRC == true) {
                if (this.editRQRC.dataE != null && this.editRQRC.dataE.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRQRC.dataE.uuid, element: constant.ServiceInterface_str} )
                    document.getElementById(this.editRQRC.dataE.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editRQRC.dataE.uuid)
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
            if (this.isdeleteRCC == true) {
                this.isdeleteRCC = false
                this.selectDelectRCC = []
            } else {
                this.isdeleteRCC = true
            }
        },
        deleteRCC() {
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
                this.newLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.operation.uuid)
                this.element.rport[this.RportTab].client[idx].operation = this.editRCC.operation.name
            } else if (endLine == undefined && this.editRCC.operation != null && this.editRCC.operation.uuid != null) {
                this.newLine(this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.operation.uuid)
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
                this.newLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.getter.uuid)
                this.element.rport[this.RportTab].client[idx].getter = this.editRCC.getter.name
            } else if (endLineG == undefined && this.editRCC.getter != null) {
                this.newLine(this.element.uuid+'/rportCCG-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.getter.uuid)
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
                this.newLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.setter.uuid)
                this.element.rport[this.RportTab].client[idx].setter = this.editRCC.setter.name
            } else if (endLineS == undefined && this.editRCC.setter != null) {
                this.newLine(this.element.uuid+'/rportCCS-'+this.element.rport[this.RportTab].client[idx].id+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.setter.uuid)
                this.element.rport[this.RportTab].client[idx].setter = this.editRCC.setter.name
            } else if (this.editRCC.setter != null && endLine == this.editRCC.setter.uuid && this.element.rport[this.RportTab].client[idx].setter != this.editRCC.setter.name) {
                this.element.rport[this.RportTab].client[idx].setter = this.editRCC.setter.name
            }
            this.element.rport[this.RportTab].client[idx].clientCapa = this.editRCC.clientCapa
            this.cancelRCC()
        },
        cancelRCC() {
            this.editRCC = {operation: null, clientCapa: null, getter: null, setter: null}
            this.setactiveUUID()
        },
        addRCC() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.rport[this.RportTab].client.some(item => item.id === n)
            }
            this.editRCC.id = n

            if( this.editRCC.operation != null) {
                this.newLine(this.element.uuid+'/rportCC-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.operation.uuid)
                this.editRCC.operation = this.editRCC.operation.name
            }
            if( this.editRCC.getter != null) {
                this.newLine(this.element.uuid+'/rportCCG-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.getter.uuid)
                this.editRCC.getter = this.editRCC.getter.name
            }
            if( this.editRCC.setter != null) {
                this.newLine(this.element.uuid+'/rportCCS-'+n+'-'+this.element.rport[this.RportTab].id, this.element.uuid+'/rportCC-'+this.element.rport[this.RportTab].id, this.editRCC.setter.uuid)
                this.editRCC.setter = this.editRCC.setter.name
            }

            const addObj = Object.assign({}, this.editRCC)
            this.element.rport[this.RportTab].client.push(addObj);
            this.cancelRCC()
        },
        setRCCSelect() {
            if (this.isEditingRCC == true) {
                if (this.editRCC.operation != null && this.editRCC.operation.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editRCC.operation.uuid, element: constant.ServiceInterface_str} )
                    document.getElementById(this.editRCC.operation.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editRCC.operation.uuid)
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
                    document.getElementById(this.editRCC.getter.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editRCC.getter.uuid)
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
                    document.getElementById(this.editRCC.setter.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editRCC.setter.uuid)
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
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementService', {
                    name: this.$store.getters.getNameServiceInterface, path: '',
                    top: elementY, left: elementX, zindex: 10,  icon:"mdi-clipboard-outline", validation: false,
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
