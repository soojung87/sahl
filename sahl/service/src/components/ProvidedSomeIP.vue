<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showProvidedSomeIP">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Provided SomeIP Service Instance</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Provided SomeIP Service Instance</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputProvidedSomeIPName' outlined dense></v-text-field>
                            <v-row style="height: 45px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.deployref" readonly @click="setSIDeploymentSelect()" clearable @click:clear='clearSIDeployment()' label="Service Interface Deployment Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/providDeploy'" dark icon v-bind="attrs" v-on="on" @click="setSIDeploymentList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selSIDeployment" :key="i" link @click="setSIDeployment(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newSIDeployment" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.someipserver" readonly @click="setSomeIPServerSelect()" clearable @click:clear='clearSomeIPServer()' label="SD Server Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/providSomeIPS'" dark icon v-bind="attrs" v-on="on" @click="setSomeIPServerList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selSomeIPServer" :key="i" link @click="setSomeIPServer(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newSomeIPServer" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="element.instanceid" label="Service Instance ID" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.loadPriority" label="Load Balancing Priority" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.loadWeight" label="Load Balancing Weight" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/proviedEventP'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showEventP" x-small color="indigo">
                                            <v-icon>{{ isEventPOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Event Props
                                    <v-btn @click="isCheckEventP" text x-small color="indigo" v-if="isEventPOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isEventPOpenClose && isdeleteEventP" @click="deletEventP" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isEventPOpenClose">
                                    <v-data-table v-model="selectEventP" :headers="headerEventP" :items="element.eventP" :items-per-page='20'
                                            :show-select="isdeleteEventP" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteEventP" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openEventP(idx)" @cancel="editEventP(idx)" @save="cancelEventP" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editEventItem.event' label='Event Reference' :items='selEventProp' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingEventP" clearable @click="setEventPSelect()" 
                                                                            @click:clear='clearEventP' @blur="isEditingEventP=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addEventP()" @save="cancelEventP"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editEventItem.event' label='Event Reference' :items='selEventProp' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingEventP" clearable @click="setEventPSelect()" 
                                                                            @click:clear='clearEventP' @blur="isEditingEventP=true" outlined dense style="height: 45px;">
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
                                <div class="subtitle-2" :id="element.uuid+'/proviedMethod'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showMethodRef" x-small color="indigo">
                                            <v-icon>{{ isMethodRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Method Response Props
                                    <v-btn @click="isCheckMethodRef" text x-small color="indigo" v-if="isMethodRefOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isMethodRefOpenClose && isdeleteMethodRef" @click="deletMethodRef" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isMethodRefOpenClose">
                                    <v-data-table v-model="selectMethodRef" :headers="headerMethodRef" :items="element.method" :items-per-page='20'
                                            :show-select="isdeleteMethodRef" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteMethodRef" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openMethodRef(idx)" @cancel="editMethodRef(idx)" @save="cancelMethodRef" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editMethodItem.method' label='Method Reference' :items='selMethodref' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingMethod" clearable @click="setMethodSelect()" 
                                                                            @click:clear='clearMethodRef' @blur="isEditingMethod=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addMethodRef()" @save="cancelMethodRef"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editMethodItem.method' label='Method Reference' :items='selMethodref' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingMethod" clearable @click="setMethodSelect()" 
                                                                            @click:clear='clearMethodRef' @blur="isEditingMethod=true" outlined dense style="height: 45px;">
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
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/providE'" >
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showProvidEvent" x-small color="indigo">
                                            <v-icon>{{ isProvidEventOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    SomeIP Provided Event Group
                                    <v-btn v-if="isProvidEventOpenClose" @click="addProvidEvent" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='eventGroupTab' v-show="isProvidEventOpenClose" show-arrows @change="changeEeventGroupTab()">
                                    <v-tab v-for="(tab, idx) in element.eventG" :key="idx" @click="clickEeventGroupTab()"> 
                                        {{tab.name}}
                                        <v-btn text x-small @click="deleteEventGroup(idx)"><v-icon x-small>mdi-close</v-icon></v-btn>
                                    </v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="eventGroupTab" v-show="isProvidEventOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.eventG" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 70px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.eventG" readonly @click="setEventGSelect(tab)" clearable @click:clear='clearEventG(tab)' label="Event Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/providEventG-'+tab.id" icon v-bind="attrs" v-on="on" @click="setEventGList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list >
                                                                <v-list-item v-for="(item, i) in selEventG" :key="i" link @click="setEventG(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selEventG.length == 0">
                                                                    <v-list-item-title>No Data Available</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-text-field v-model="tab.udp" label="Event Multicast UDP Port" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.ipv4" label="IPV-4 Multicast IP Adderss" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.ipv6" label="IPV-6 Multicast IP Adderss" @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.threshold" label="Multicast Threshold" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row>
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.server" readonly @click="setServerSelect(tab)" clearable @click:clear='clearServer(tab)' label="SD Server Event Group Timing Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/providServer-'+tab.id" dark icon v-bind="attrs" v-on="on" @click="setServerList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item v-for="(item, i) in selServer" :key="i" link @click="setServer(item,tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newServer" >
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
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/E2EEpro'">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showE2EEvent" x-small color="indigo">
                                            <v-icon>{{ isE2EEventOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    E-2-E Event Protection Propss
                                    <v-btn v-if="isE2EEventOpenClose" @click="addE2EEvent()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='E2EEventTab' v-show="isE2EEventOpenClose" show-arrows @change="changeE2EEventTab()">
                                    <v-tab v-for="(tab, idx) in element.E2EEvent" :key="idx" @click="clickE2EEventTab()"> 
                                        {{tab.name}}
                                        <v-btn text x-small @click="deleteE2EEvent(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="E2EEventTab" v-show="isE2EEventOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.E2EEvent" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.name" label="name" :rules="rules.name" @input='inputEventGName(tab.name)' @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.dataIds" label="Data IDs" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.dataLength" label="Data Length" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.period" label="Data Update Period" @click="setactiveUUID" placeholder="Time" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.e2e" readonly @click="setE2ESelect(tab)" clearable @click:clear='clearE2EProfile(tab)' label="E-2-E Profile Configuration Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2ePropro-'+tab.id" icon v-bind="attrs" v-on="on" @click="setE2EProfileList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list >
                                                                <v-list-item v-for="(item, i) in selE2EProfile" :key="i" link @click="setE2EProfile(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selE2EProfile.length == 0">
                                                                    <v-list-item-title>No Data Available</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.event" readonly @click="setEventSelect(tab)" clearable @click:clear='clearEvent(tab)' label="Event Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2eEventpro-'+tab.id" icon v-bind="attrs" v-on="on" @click="setEventList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item v-for="(item, i) in selEventProp" :key="i" link @click="setEvent(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selEventProp.length == 0">
                                                                    <v-list-item-title>No Data Available</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-text-field v-model="tab.max" label="Max Data Length" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.min" label="Min Data Length" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/E2EMpro'">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showE2EMethod" x-small color="indigo">
                                            <v-icon>{{ isE2EMethodOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    E-2-E Method Protection Propss
                                    <v-btn v-if="isE2EMethodOpenClose" @click="addE2EMethod()" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='E2EMethodTab' v-show="isE2EMethodOpenClose" show-arrows @change="changeE2EMethodTab()">
                                    <v-tab v-for="(tab, idx) in element.E2EMethod" :key="idx" @click="clickE2EMethodtTab()"> 
                                        {{tab.id}}
                                        <v-btn text x-small @click="deleteE2EMethod(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="E2EMethodTab" v-show="isE2EMethodOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.E2EMethod" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.dataIds" label="Data IDs" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.dataLength" label="Data Length" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.period" label="Data Update Period" @click="setactiveUUID" placeholder="Time" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.e2e" readonly @click="setE2ESelectM(tab)" clearable @click:clear='clearE2EProfileM(tab)' label="E-2-E Profile Configuration Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2eProMpro-'+tab.id" icon v-bind="attrs" v-on="on" @click="setE2EProfileMList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list >
                                                                <v-list-item v-for="(item, i) in selE2EProfileM" :key="i" link @click="setE2EProfileM(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selE2EProfileM.length == 0">
                                                                    <v-list-item-title>No Data Available</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.method" readonly @click="setE2EMethodelect(tab)" clearable @click:clear='clearE2EMethod(tab)' label="Method Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2eMethodpro-'+tab.id" icon v-bind="attrs" v-on="on" @click="setE2EMethodList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item v-for="(item, i) in selMethod" :key="i" link @click="setE2EMethod(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selMethod.length == 0">
                                                                    <v-list-item-title>No Data Available</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-text-field v-model="tab.max" label="Max Data Length" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.min" label="Min Data Length" @click="setactiveUUID" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
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
                            <label style="padding:10px;">&#60;SERVICE-INTERFACE-DEPLOYMENT-REF&#62;</label>
                            <v-text-field v-model="editARXML.deployref" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SERVICE-INTERFACE...&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;LOAD-BALANCING-PRIORITY&#62;</label>
                            <v-text-field v-model="editARXML.loadPriority" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOAD-BALANCING-PRIORITY&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;LOAD-BALANCING-WEIGHT&#62;</label>
                            <v-text-field v-model="editARXML.loadWeight" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;LOAD-BALANCING-WEIGHT&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SD-SERVER-CONFIG-REF&#62;</label>
                            <v-text-field v-model="editARXML.someipserver" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SD-SERVER-CONFIG-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;SERVICE-INSTANCE-ID&#62;</label>
                            <v-text-field v-model="editARXML.instanceid" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SERVICE-INSTANCE-ID&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;E-2-E-EVENT-PROTECTION-PROPSS&#62;
                                <v-btn @click="newTextE2EE()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <div class="text-editDialog" style="height: 350px;">
                            <v-row v-for="(item, i) in editARXML.E2EEvent" :key="i" style="height: 250px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">
                                            <v-btn @click="deletTextE2EE(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            &#60;END-2-END-EVENT-PROTECTION-PROPS&#62;
                                        </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-IDS&#62;</label>
                                        <v-text-field v-model="item.dataIds" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-IDS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-LENGTH&#62;</label>
                                        <v-text-field v-model="item.dataLength" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-UPDATE-PERIOD&#62;</label>
                                        <v-text-field v-model="item.period" placeholder="Time" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-UPDATE-PERIOD&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;E-2-E-PROFILE-CONFIGURATION-REF&#62;</label>
                                        </v-col><v-col cols="5">
                                        <v-text-field v-model="item.e2e" placeholder="Path" style="margin:-5px 0px 0px 25px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="2">
                                        <label style="padding:10px;">&#60;&#47;E-2-E-PROFILE-CONFIGURATION-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-REF&#62;</label>
                                        <v-text-field v-model="item.event" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MAX-DATA-LENGTH&#62;</label>
                                        <v-text-field v-model="item.max" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MAX-DATA-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MIN-DATA-LENGTH&#62;</label>
                                        <v-text-field v-model="item.min" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MIN-DATA-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;END-2-END-EVENT-PROTECTION-PROPS&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;E-2-E-EVENT-PROTECTION-PROPSS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;E-2-E-METHOD-PROTECTION-PROPSS&#62;
                                <v-btn @click="newTextE2EM()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <div class="text-editDialog" style="height: 350px;">
                            <v-row v-for="(item, i) in editARXML.E2EMethod" :key="i" style="height: 220px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">
                                            <v-btn @click="deletTextE2EM(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            &#60;END-2-END-METHOD-PROTECTION-PROPS&#62;
                                        </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-IDS&#62;</label>
                                        <v-text-field v-model="item.dataIds" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-IDS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-LENGTH&#62;</label>
                                        <v-text-field v-model="item.dataLength" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-UPDATE-PERIOD&#62;</label>
                                        <v-text-field v-model="item.period" placeholder="Time" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-UPDATE-PERIOD&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;E-2-E-PROFILE-CONFIGURATION-REF&#62;</label>
                                        </v-col><v-col cols="5">
                                        <v-text-field v-model="item.e2e" placeholder="Path" style="margin:-5px 0px 0px 25px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="2">
                                        <label style="padding:10px;">&#60;&#47;E-2-E-PROFILE-CONFIGURATION-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;METHOD-REF&#62;</label>
                                        <v-text-field v-model="item.method" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;METHOD-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MAX-DATA-LENGTH&#62;</label>
                                        <v-text-field v-model="item.max" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MAX-DATA-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MIN-DATA-LENGTH&#62;</label>
                                        <v-text-field v-model="item.min" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MIN-DATA-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;END-2-END-METHOD-PROTECTION-PROPS&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;E-2-E-METHOD-PROTECTION-PROPSS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;EVENT-PROPSS&#62;
                                <v-btn @click="newTextEventP()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <div class="text-editDialog" style="height: 150px;">
                            <v-row v-for="(item, i) in editARXML.eventP" :key="i" style="height: 70px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">
                                            <v-btn @click="deletTextEventP(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            &#60;SOMEIP-EVENT-PROPS&#62;
                                        </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-REF&#62;</label>
                                        <v-text-field v-model="item.event" placeholder="Path" style="width: 350px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-EVENT-PROPS&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;EVENT-PROPSS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;METHOD-REQUEST-PROPSS&#62;
                                <v-btn @click="newTextMethod()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <div class="text-editDialog" style="height: 150px;">
                            <v-row v-for="(item, i) in editARXML.method" :key="i" style="height: 70px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">
                                            <v-btn @click="deletTextMethod(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            &#60;SOMEIP-METHOD-PROPS&#62;
                                        </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;METHOD-REF&#62;</label>
                                        <v-text-field v-model="item.method" placeholder="Path" style="width: 350px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;METHOD-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-METHOD-PROPS&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;METHOD-REQUEST-PROPSS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;PROVIDED-EVENT-GROUPS&#62;
                                <v-btn @click="newTextEvent()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                                </v-btn>
                            </label>
                        </v-row>
                        <div class="text-editDialog" style="height: 250px;">
                            <v-row v-for="(item, i) in editARXML.eventG" :key="i" style="height: 220px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">
                                            <v-btn @click="deletTextEvent(i)" text x-small color="indigo">
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            &#60;SOMEIP-PROVIDED-EVENT-GROUP&#62;
                                        </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" style="width:400px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-GROUP-REF&#62;</label>
                                        <v-text-field v-model="item.eventG" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-GROUP-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-MULTICAST-UDP-PORT&#62;</label>
                                        <v-text-field v-model="item.udp" placeholder="Int"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-MULTICAST-UDP-PORT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;IPV-4-MULTICAST-IP-ADDRESS&#62;</label>
                                        <v-text-field v-model="item.ipv4" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;IPV-4-MULTICAST-IP-ADDRESS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;IPV-6-MULTICAST-IP-ADDRESS&#62;</label>
                                        <v-text-field v-model="item.ipv6" placeholder="String"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;IPV-6-MULTICAST-IP-ADDRESS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MULTICAST-THRESHOLD&#62;</label>
                                        <v-text-field v-model="item.threshold" placeholder="Int"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MULTICAST-THRESHOLD&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="6">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.server" placeholder="Path" style="margin:-5px 0px 0px 25px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="2">
                                        <label style="padding:10px;">&#60;&#47;SD-SERVER-EVENT-GROUP-TIMING-CONFIG-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-PROVIDED-EVENT-GROUP&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;PROVIDED-EVENT-GROUPS&#62;</label>
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
                            if(this.element.eventG.length > 0 && this.location == 1) {
                                if (this.isProvidEventOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, null)
                                }
                            }
                            if(this.element.E2EEvent.length > 0 && this.location == 1) {
                                if(this.isE2EEventOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, null)
                                }
                            }
                            if(this.element.E2EMethod.length > 0 && this.location == 1) {
                                if(this.isE2EMethodOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, null)
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
            dialogText: false,
            editARXML: {name:'', deployref: null, loadPriority: '', instanceid: '', someipserver: null, loadWeight: '', eventP: [], method: [], eventG: [], E2EEvent: [], E2EMethod: []},
            editTextEventP: {event: null, id: ''},
            editTextMethod: {method: null, id: ''},
            editTextEvent: { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null, id: ''},
            editTextE2EE: { name: '', dataIds: '', dataLength: '', period: '', e2e: null, event: null, max: '', min: '', id: ''},
            editTextE2EM: { dataIds: '', dataLength: '', period: '', e2e: null, method: null, max: '', min: '', id: ''},

            isMethodRefOpenClose: true,
            isEventPOpenClose: true,
            isProvidEventOpenClose: true,
            isE2EEventOpenClose: true,
            isE2EMethodOpenClose: true,
            selSIDeployment: this.$store.getters.getSIDeployment,
            selSomeIPServer: this.$store.getters.getSomeIPServer,

            selectMethodRef: [],
            headerMethodRef: [
                { text: 'SomeIP Method Props', align: 'start', sortable: false, value: 'method' },
            ],
            editMethodItem: { method : null, id: ''},
            isdeleteMethodRef: false,
            selMethodref: this.$store.getters.getSomeIPMethodDeployment,
            isEditingMethod: true,

            selectEventP: [],
            headerEventP: [
                { text: 'SomeIP Event Props', align: 'start', sortable: false, value: 'event' },
            ],
            editEventItem: { event : null, id: ''},
            isdeleteEventP: false,
            selEventProp: this.$store.getters.getSomeIPEventDeployment,
            isEditingEventP: true,

            eventGroupTab: 0,
            selEventG: this.$store.getters.getEventGroup,
            selServer: this.$store.getters.getServer,

            E2EEventTab: 0,
            selE2EProfile: this.$store.getters.getE2EProfileConfig,
            E2EMethodTab: 0,
            selE2EProfileM: this.$store.getters.getE2EProfileConfig,
            selMethod: this.$store.getters.getDeploymentMethod,
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
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: false} )
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
        showProvidedSomeIP () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.element.eventG.length > 0 && this.location == 1) {
                        if (this.isProvidEventOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, null)
                        }
                    }
                    if(this.element.E2EEvent.length > 0 && this.location == 1) {
                        if(this.isE2EEventOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, null)
                        }
                    }
                    if(this.element.E2EMethod.length > 0 && this.location == 1) {
                        if(this.isE2EMethodOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showMethodRef() {
            this.isMethodRefOpenClose = this.isMethodRefOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showEventP() {
            this.isEventPOpenClose = this.isEventPOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showProvidEvent() {
            if(this.isDatailView == true) {
                this.element.eventG = this.element.eventG.slice()
            }
            this.isProvidEventOpenClose = this.isProvidEventOpenClose ? false : true
            if(this.element.eventG.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isProvidEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showE2EEvent() {
            this.isE2EEventOpenClose = this.isE2EEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            if(this.element.E2EEvent.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isE2EEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, null)
                    }
                })
            }
        },
        showE2EMethod() {
            this.isE2EMethodOpenClose = this.isE2EMethodOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            if(this.element.E2EMethod.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isE2EMethodOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, null)
                    }
                })
            }
        },
        inputProvidedSomeIPName () {
            this.$store.commit('editProvidedSomeIP', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: false} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearSIDeployment() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providDeploy')
            if (endLine != undefined) {
                this.element.deployref = null
                this.deleteLine(this.element.uuid+'/providDeploy')
            }
        },
        setSIDeploymentSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providDeploy')
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.element.deployref, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setSIDeploymentList() {
            this.selSIDeployment = this.$store.getters.getSIDeployment
            this.setactiveUUID()
        },
        setSIDeployment(item){
            if( this.element.deployref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providDeploy')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providDeploy')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providDeploy', this.element.uuid+'/providDeploy', item.uuid)
                }
                this.element.deployref = item.name
            }
            this.setactiveUUID()
        },
        newSIDeployment() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementSomeIPService', {
                name: this.$store.getters.getNameSomeIPService, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                service: null, majversion:'', minversion:'', id: '', eventG:[], eventD: [], methodD:[], fieldD:[],
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearSomeIPServer() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
            if (endLine != undefined) {
                this.element.someipserver = null
                this.deleteLine(this.element.uuid+'/providSomeIPS')
            }
        },
        setSomeIPServerSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSomeIPServerPath(this.element.someipserver)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServer_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setSomeIPServerList() {
            this.selSomeIPServer = this.$store.getters.getSomeIPServer
            this.setactiveUUID()
        },
        setSomeIPServer(item){
            if( this.element.someipserver != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providSomeIPS')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providSomeIPS', this.element.uuid+'/providSomeIPS', item.uuid)
                }
                this.element.someipserver = item.name
            }
            this.setactiveUUID()
        },
        newSomeIPServer() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementSomeIPServer', { 
                name: this.$store.getters.getNameSomeIPServer, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '', delaymax: '', delaymin: '',
                offer: '', tiemtolive: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPServer_str)
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckEventP() {
            if (this.isdeleteEventP == true) {
                this.isdeleteEventP = false
                this.selectEventP = []
            } else {
                this.isdeleteEventP = true
            }
        },
        deletEventP() {
            if (this.isdeleteEventP == true) {
                this.selectEventP.forEach(item => {
                    for(let i=0; i<this.element.eventP.length; i++){
                        if (item.id == this.element.eventP[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[i].id)
                            }
                        }
                    }
                })

                this.element.eventP = this.element.eventP.filter(item => {
                        return this.selectEventP.indexOf(item) < 0 })

                this.isdeleteEventP = false
                this.selectEventP = []
            } 
        },
        openEventP(idx) {
            this.selEventProp = this.$store.getters.getSomeIPEventDeployment
            if ( this.element.eventP[idx].event != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSomeIPEventDeploymentPath(this.element.eventP[idx].event)
                }
                this.editEventItem.event = { name: this.element.eventP[idx].event, uuid: endLine }
            }
        },
        editEventP(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[idx].id)
            if (endLine != undefined && this.editEventItem.event == null) {
                this.deleteLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[idx].id)
                this.element.eventP[idx].event = null
            } else if (endLine != undefined && endLine != this.editEventItem.event.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[idx].id)
                this.newLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[idx].id, this.element.uuid+'/proviedEventP', this.editEventItem.event.uuid)
                this.element.eventP[idx].event = this.editEventItem.event.name
            } else if (endLine == undefined && this.editEventItem.event != null && this.editEventItem.event.uuid != null) {
                this.newLine(this.element.uuid+'/proviedEventP-'+this.element.eventP[idx].id, this.element.uuid+'/proviedEventP', this.editEventItem.event.uuid)
                this.element.eventP[idx].event = this.editEventItem.event.name
            } else if (this.editEventItem.event != null && endLine == this.editEventItem.event.uuid && this.element.eventP[idx].event != this.editEventItem.event.name) {
                this.element.eventP[idx].event = this.editEventItem.event.name
            }
            
            this.cancelEventP()
        },
        cancelEventP() {
            this.editEventItem.event = null
            this.setactiveUUID()
        },
        addEventP() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.eventP.some(item => item.id === n)
            }
            this.editEventItem.id = n

            if( this.editEventItem.event != null) {
                this.newLine(this.element.uuid+'/proviedEventP-'+n, this.element.uuid+'/proviedEventP', this.editEventItem.event.uuid)
                this.editEventItem.event = this.editEventItem.event.name
            }
            const addObj = Object.assign({}, this.editEventItem)
            this.element.eventP.push(addObj);

            this.cancelEventP()
        },
        setEventPSelect() {
            if (this.isEditingEventP == true) {
                if (this.editEventItem.event != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEventItem.event.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    document.getElementById(this.editEventItem.event.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editEventItem.event.uuid)
                }
                this.setEventList()
                this.isEditingEventP = false
            } else {
                this.isEditingEventP = true
            }
        },
        setEventList() {
            this.selEventProp = this.$store.getters.getSomeIPEventDeployment
            this.setactiveUUID()
        },
        clearEventP() {
            this.isEditingEventP = true
            this.editEventItem.event = null
        },

        isCheckMethodRef() {
            if (this.isdeleteMethodRef == true) {
                this.isdeleteMethodRef = false
                this.selectMethodRef = []
            } else {
                this.isdeleteMethodRef = true
            }
        },
        deletMethodRef() {
            if (this.isdeleteMethodRef == true) {
                this.selectMethodRef.forEach(item => {
                    for(let i=0; i<this.element.method.length; i++){
                        if (item.id == this.element.method[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+this.element.method[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/proviedMethod-'+this.element.method[i].id)
                            }
                        }
                    }
                })

                this.element.method = this.element.method.filter(item => {
                        return this.selectMethodRef.indexOf(item) < 0 })

                this.isdeleteMethodRef = false
                this.selectMethodRef = []
            } 
        },
        openMethodRef(idx) {
            this.selMethodref = this.$store.getters.getSomeIPMethodDeployment
            if ( this.element.method[idx].method != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+this.element.method[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSomeIPMethodDeploymentPath(this.element.method[idx].method)
                }
                this.editMethodItem.method = { name: this.element.method[idx].method, uuid: endLine }
            }
        },
        editMethodRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+this.element.method[idx].id)
            if (endLine != undefined && this.editMethodItem.method == null) {
                this.deleteLine(this.element.uuid+'/proviedMethod-'+this.element.method[idx].id)
                this.element.method[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodItem.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/proviedMethod-'+this.element.method[idx].id)
                this.newLine(this.element.uuid+'/proviedMethod-'+this.element.method[idx].id, this.element.uuid+'/proviedMethod', this.editMethodItem.method.uuid)
                this.element.method[idx].method = this.editMethodItem.method.name
            } else if (endLine == undefined && this.editMethodItem.method != null && this.editMethodItem.method.uuid != null) {
                this.newLine(this.element.uuid+'/proviedMethod-'+this.element.method[idx].id, this.element.uuid+'/proviedMethod', this.editMethodItem.method.uuid)
                this.element.method[idx].method = this.editMethodItem.method.name
            } else if (this.editMethodItem.method != null && endLine == this.editMethodItem.method.uuid && this.element.method[idx].method != this.editMethodItem.method.name) {
                this.element.method[idx].method = this.editMethodItem.method.name
            }
            
            this.cancelMethodRef()
        },
        cancelMethodRef() {
            this.editMethodItem.method = null
            this.setactiveUUID()
        },
        addMethodRef() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.method.some(item => item.id === n)
            }
            this.editMethodItem.id = n

            if( this.editMethodItem.method != null) {
                this.newLine(this.element.uuid+'/proviedMethod-'+n, this.element.uuid+'/proviedMethod', this.editMethodItem.method.uuid)
                this.editMethodItem.method = this.editMethodItem.method.name
            }
            const addObj = Object.assign({}, this.editMethodItem)
            this.element.method.push(addObj);

            this.cancelMethodRef()
        },
        setMethodSelect() {
            if (this.isEditingMethod == true) {
                if (this.editMethodItem.method != null) {
                    this.$store.commit('setDetailView', {uuid: this.editMethodItem.method.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    document.getElementById(this.editMethodItem.method.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editMethodItem.method.uuid)
                }
                this.setMethodList()
                this.isEditingMethod = false
            } else {
                this.isEditingMethod = true
            }
        },
        setMethodList() {
            this.selMethodref = this.$store.getters.getSomeIPMethodDeployment
            this.setactiveUUID()
        },
        clearMethodRef() {
            this.isEditingMethod = true
            this.editMethodItem.method = null
        },

        addProvidEvent() {
            const editItem = { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null, id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Event Group_' + n++;
                res = this.element.eventG.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.eventG.push(addObj)
            this.eventGroupTab = this.element.eventG.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, null)
            }
        },
        clickEeventGroupTab() {
        },
        changeEeventGroupTab() {
            console.log('changeEeventGroupTab')
            if(this.element.eventG.length > 0 && this.location == 1 && this.eventGroupTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'ProvidEvent', this.element.uuid, this.eventGroupTab, this.element.eventG[this.eventGroupTab].id)}, 300);
            }
        },
        deleteEventGroup(idx) {
            var endLine
            if (this.element.eventG[idx].eventG != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+this.element.eventG[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/providEventG-'+this.element.eventG[idx].id)
                }
            }
            if (this.element.eventG[idx].server != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+this.element.eventG[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/providServer-'+this.element.eventG[idx].id)
                }
            }

            this.element.eventG.splice(idx, 1)
        },
        clearEventG(item) {
            item.eventG = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+item.id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/providEventG-'+item.id)
            }
        },
        setEventGSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+item.id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.eventG, 1)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setEventGList() {
            this.selEventG =  this.$store.getters.getEventGroup
            this.setactiveUUID()
        },
        setEventG(item, tab){
            if( tab.eventG != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+tab.id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providEventG-'+tab.id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providEventG-'+tab.id, this.element.uuid+'/providEventG-'+this.element.eventG[this.eventGroupTab].id, item.uuid)
                }
                tab.eventG = item.name
            }
            this.setactiveUUID()
        },
        clearServer(item) {
            item.server = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+item.id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/providServer-'+item.id)
            }
        },
        setServerSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+item.id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServerPath(item.server)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Server_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setServerList() {
            this.selServer =  this.$store.getters.getServer
            this.setactiveUUID()
        },
        setServer(item, tab){
            if( tab.server != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+tab.id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/providServer-'+tab.id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/providServer-'+tab.id, this.element.uuid+'/providServer-'+this.element.eventG[this.eventGroupTab].id, item.uuid)
                }
                tab.server = item.name
            }
            this.setactiveUUID()
        },
        newServer() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementServer', { 
                name: this.$store.getters.getNameServer,  path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                delaymax: '', delaymin: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Server_str)
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addE2EEvent() {
            const editItem = { name: '', dataIds: '', dataLength: '', period: '', e2e: null, event: null, max: '', min: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'E2EEvtProtProps_' + n++;
                res = this.element.E2EEvent.some(ele => ele.name === addObj.name)
            }
            addObj.id = n

            this.element.E2EEvent.push(addObj)
            this.E2EEventTab = this.element.E2EEvent.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, null)
            }
        },
        clickE2EEventTab() {},
        changeE2EEventTab() {
            if(this.element.E2EEvent.length > 0 && this.location == 1 && this.E2EEventTab != null) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)}, 300);
            }
        },
        deleteE2EEvent(idx) {
            var endLine
            if (this.element.E2EEvent[idx].e2e != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[idx].id)
                }
            }
            if (this.element.E2EEvent[idx].event != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[idx].id)
                }
            }

            this.element.E2EEvent.splice(idx, 1)
        },
        clearE2EProfile(item) {
            item.e2e = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEvent].id)
            }
        },
        setE2ESelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.E2EProfileConfig_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setE2EProfileList() {
            this.selE2EProfile =  this.$store.getters.getE2EProfileConfig
            this.setactiveUUID()
        },
        setE2EProfile(item, tab){
            if( tab.e2e != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEventTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2ePropro-'+this.element.E2EEvent[this.E2EEventTab].id, item.uuid)
                }
                tab.e2e = item.name
            }
            this.setactiveUUID()
        },
        clearEvent(item) {
            item.event = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id)
            }
        },
        setEventSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.event,2)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setEvent(item, tab){
            if( tab.event != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2eEventpro-'+this.element.E2EEvent[this.E2EEventTab].id, item.uuid)
                }
                tab.event = item.name
            }
            this.setactiveUUID()
        },

        addE2EMethod() {
            const editItem = { dataIds: '', dataLength: '', period: '', e2e: null, method: null, max: '', min: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                n++;
                res = this.element.E2EMethod.some(ele => ele.id === n)
            }
            addObj.id = n

            this.element.E2EMethod.push(addObj)
            this.E2EMethodTab = this.element.E2EMethod.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, null)
            }
        },
        clickE2EMethodtTab() {},
        changeE2EMethodTab() {
            if(this.element.E2EMethod.length > 0 && this.location == 1 && this.E2EMethodTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)}, 300);
            }
        },
        deleteE2EMethod(idx) {
            var endLine
            if (this.element.E2EMethod[idx].e2e != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[idx].id)
                }
            }
            if (this.element.E2EMethod[idx].event != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[idx].id)
                }
            }

            this.element.E2EMethod.splice(idx, 1)
        },
        clearE2EProfileM(item) {
            item.e2e = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
            }
        },
        setE2ESelectM(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.E2EProfileConfig_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setE2EProfileMList() {
            this.selE2EProfileM =  this.$store.getters.getE2EProfileConfig
            this.setactiveUUID()
        },
        setE2EProfileM(item, tab){
            if (tab.e2e != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eProMpro-'+this.element.E2EMethod[this.E2EMethodTab].id, item.uuid)
                }
                tab.e2e = item.name
            }
            this.setactiveUUID()
        },
        clearE2EMethod(item) {
            item.method = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
            }
        },
        setE2EMethodelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.event,3)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setE2EMethodList() {
            this.selMethod =  this.$store.getters.getDeploymentMethod
            this.setactiveUUID()
        },
        setE2EMethod(item, tab){
            if( tab.method != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eMethodpro-'+this.element.E2EMethod[this.E2EMethodTab].id, item.uuid)
                }
                tab.method = item.name
            }
            this.setactiveUUID()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editProvidedSomeIP', {compo:"z", uuid:this.element.uuid, zindex:10} )
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

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.deployref = this.element.deployref
            this.editARXML.loadPriority = this.element.loadPriority
            this.editARXML.instanceid = this.element.instanceid
            this.editARXML.someipserver = this.element.someipserver
            this.editARXML.loadWeight = this.element.loadWeight
            this.editARXML.method = JSON.parse(JSON.stringify(this.element.method))
            this.editARXML.eventP = JSON.parse(JSON.stringify(this.element.eventP))
            this.editARXML.eventG = JSON.parse(JSON.stringify(this.element.eventG))
            this.editARXML.E2EEvent = JSON.parse(JSON.stringify(this.element.E2EEvent))
            this.editARXML.E2EMethod = JSON.parse(JSON.stringify(this.element.E2EMethod))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editRequiredSomeIP', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name, req: true} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.loadPriority = this.editARXML.loadPriority
            this.element.instanceid = this.editARXML.instanceid
            this.element.loadWeight = this.editARXML.loadWeight

            var endLine = null, changEndLine = null
            if (this.editARXML.deployref != this.element.deployref) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/providDeploy')
                }
                changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.editARXML.deployref, 0)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/providDeploy', this.element.uuid+'/providDeploy', changEndLine)
                }
            }
            this.element.deployref = this.editARXML.deployref
            if (this.editARXML.someipserver != this.element.someipserver) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providSomeIPS')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/providSomeIPS')
                }
                changEndLine = this.$store.getters.getSomeIPServerPath(this.editARXML.someipserver)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/providSomeIPS', this.element.uuid+'/providSomeIPS', changEndLine)
                }
            }
            this.element.someipserver = this.editARXML.someipserver

            if (this.editARXML.eventP.length > 0) {
                this.editARXML.eventP.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.eventP.length; n++){
                        if (this.element.eventP[n].id == item.id &&
                            this.element.eventP[n].event == item.event ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/proviedEventP-'+item.id)
                        }
                        var changEndLine = this.$store.getters.getSomeIPEventDeploymentPath(item.event)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/proviedEventP-'+item.id, this.element.uuid+'/proviedEventP', changEndLine)
                        }
                    }
                })
                this.element.eventP.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.eventP.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/proviedEventP-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.eventP.length > 0) {
                    this.element.eventP.forEach(item => {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedEventP-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/proviedEventP-'+item.id)
                        }
                    })
                }
            }
            this.element.eventP = JSON.parse(JSON.stringify(this.editARXML.eventP))

            if (this.editARXML.method.length > 0) {
                this.editARXML.method.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.method.length; n++){
                        if (this.element.method[n].id == item.id &&
                            this.element.method[n].method == item.method ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/proviedMethod-'+item.id)
                        }
                        var changEndLine = this.$store.getters.getSomeIPMethodDeploymentPath(item.method)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/proviedMethod-'+item.id, this.element.uuid+'/proviedMethod', changEndLine)
                        }
                    }
                })
                this.element.method.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.method.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/proviedMethod-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.method.length > 0) {
                    this.element.method.forEach(item => {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/proviedMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/proviedMethod-'+item.id)
                        }
                    })
                }
            }
            this.element.method = JSON.parse(JSON.stringify(this.editARXML.method))

            if (this.editARXML.eventG.length > 0) {
                this.editARXML.eventG.forEach(item => {
                    var isHaveTableE = false, isHaveTableC = false
                    this.element.eventG.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.eventG == item.eventG) {
                                isHaveTableE = true
                            }
                            if (ele.server == item.server) {
                                isHaveTableC = true
                            }
                        }
                    })
                    if (!isHaveTableE) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/providEventG-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.eventG, 1)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/providEventG-'+item.id, this.element.uuid+'/providE', changEndLine)
                        }
                    }
                    if (!isHaveTableC) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/providServer-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServerPath(item.server)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/providServer-'+item.id, this.element.uuid+'/providE', changEndLine)
                        }
                    }
                })
                this.element.eventG.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.eventG.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.eventG != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/providEventG-'+item.id)
                            }
                        }
                        if (item.server != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/providServer-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.eventG.length > 0) {
                    this.element.eventG.forEach(item => {
                        if (item.eventG != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providEventG-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/providEventG-'+item.id)
                            }
                        }
                        if (item.server != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/providServer-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/providServer-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.eventG = JSON.parse(JSON.stringify(this.editARXML.eventG))

            if (this.editARXML.E2EEvent.length > 0) {
                this.editARXML.E2EEvent.forEach(item => {
                    var isHaveTable2 = false, isHaveTable2E = false
                    this.element.E2EEvent.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.e2e == item.e2e) {
                                isHaveTable2 = true
                            }
                            if (ele.event == item.event) {
                                isHaveTable2E = true
                            }
                        }
                    })
                    if (!isHaveTable2) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2ePropro-'+item.id)
                        }
                        console.log(item.e2e)
                        changEndLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
                        console.log(changEndLine)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2ePropro-'+item.id, this.element.uuid+'/E2EEpro', changEndLine)
                        }
                    }
                    if (!isHaveTable2E) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2eEventpro-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.event, 2)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2eEventpro-'+item.id, this.element.uuid+'/E2EEpro', changEndLine)
                        }
                    }
                })
                this.element.E2EEvent.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.E2EEvent.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.e2e != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2ePropro-'+item.id)
                            }
                        }
                        if (item.event != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eEventpro-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.E2EEvent.length > 0) {
                    this.element.E2EEvent.forEach(item => {
                        if (item.e2e != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePropro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2ePropro-'+item.id)
                            }
                        }
                        if (item.event != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEventpro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eEventpro-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.E2EEvent = JSON.parse(JSON.stringify(this.editARXML.E2EEvent))

            if (this.editARXML.E2EMethod.length > 0) {
                this.editARXML.E2EMethod.forEach(item => {
                    var isHaveTable2 = false, isHaveTableM = 0
                    this.element.E2EMethod.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.e2e == item.e2e) {
                                isHaveTable2 = true
                            }
                            if (ele.method == item.method) {
                                isHaveTableM = true
                            }
                        }
                    })
                    if (!isHaveTable2) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2eProMpro-'+item.id)
                        }
                        changEndLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2eProMpro-'+item.id, this.element.uuid+'/E2EMpro', changEndLine)
                        }
                    }
                    if (!isHaveTableM) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2eMethodpro-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.method, 3)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2eMethodpro-'+item.id, this.element.uuid+'/E2EMpro', changEndLine)
                        }
                    }
                })
                this.element.E2EMethod.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.E2EMethod.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.e2e != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eProMpro-'+item.id)
                            }
                        }
                        if (item.method != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eMethodpro-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.E2EMethod.length > 0) {
                    this.element.E2EMethod.forEach(item => {
                        if (item.e2e != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProMpro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eProMpro-'+item.id)
                            }
                        }
                        if (item.method != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethodpro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eMethodpro-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.E2EMethod = JSON.parse(JSON.stringify(this.editARXML.E2EMethod))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', deployref: null, loadPriority: '', id: '', someipserver: null, loadWeight: '', eventP: [], method: [], eventG: [], E2EEvent: [], E2EMethod: []}
            this.editTextEventP = {event: null, id: ''}
            this.editTextMethod = {method: null, id: ''}
            this.editTextEvent = { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null, id: ''}
            this.editTextE2EE = { name: '', dataIds: '', dataLength: '', period: '', e2e: null, event: null, max: '', min: '', id: ''}
            this.editTextE2EM = { dataIds: '', dataLength: '', period: '', e2e: null, method: null, max: '', min: '', id: ''}
            this.dialogText = false
        },
        newTextMethod() {
            this.editTextMethod = {method: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.method.some(item => item.id === n)
            }
            this.editTextMethod.id = n

            const addObj = Object.assign({}, this.editTextMethod)
            this.editARXML.method.push(addObj);
        },
        deletTextMethod(idx) {
            this.editARXML.method.splice(idx,1)
        },
        newTextEventP() {
            this.editTextEventP = {event: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.eventP.some(item => item.id === n)
            }
            this.editTextEventP.id = n

            const addObj = Object.assign({}, this.editTextEventP)
            this.editARXML.eventP.push(addObj);
        },
        deletTextEventP(idx) {
            this.editARXML.eventP.splice(idx,1)
        },
        newTextEvent() {
            this.editTextEvent = { name: '', eventG: null, udp: '', ipv4: '', ipv6: '', threshold: '', server: null, id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextEvent.name = 'Event Group_' + n++;
                res = this.editARXML.eventG.some(item => item.id === n)
            }
            this.editTextEvent.id = n

            const addObj = Object.assign({}, this.editTextEvent)
            this.editARXML.eventG.push(addObj);
        },
        deletTextEvent(idx) {
            this.editARXML.eventG.splice(idx,1)
        },
        newTextE2EE() {
            this.editTextE2EE = { name: '', dataIds: '', dataLength: '', period: '', e2e: null, event: null, max: '', min: '', id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextE2EE.name = 'E2EEvtProtProps_' + n++
                res = this.editARXML.E2EEvent.some(item => item.id === n)
            }
            this.editTextE2EE.id = n

            const addObj = Object.assign({}, this.editTextE2EE)
            this.editARXML.E2EEvent.push(addObj);
        },
        deletTextE2EE(idx) {
            this.editARXML.E2EEvent.splice(idx,1)
        },
        newTextE2EM() {
            this.editTextE2EM = {dataIds: '', dataLength: '', period: '', e2e: null, method: null, max: '', min: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.E2EMethod.some(item => item.id === n)
            }
            this.editTextE2EM.id = n

            const addObj = Object.assign({}, this.editTextE2EM)
            this.editARXML.E2EMethod.push(addObj);
        },
        deletTextE2EM(idx) {
            this.editARXML.E2EMethod.splice(idx,1)
        },
    },

}
</script>