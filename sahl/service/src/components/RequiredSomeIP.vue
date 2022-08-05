<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showRequiredSomeIP">
                                    <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Required SomeIP Service Instance</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Required SomeIP Service Instance</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputRequiredSomeIPName' outlined dense></v-text-field>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.deployref" readonly @click="setSIDeploymentSelect()" clearable @click:clear='clearSIDeployment()' label="Service Interface Deployment Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredDeploy'" dark icon v-bind="attrs" v-on="on" @click="setSIDeploymentList()">
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
                            <v-text-field v-model="element.minorver" label="Required Minor Version" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.serviceInsid" label="Required Service Instance ID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.someipclient" readonly @click="setSomeIPClientSelect()" clearable @click:clear='clearSomeIPClient()' label="SD Client Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredSomeIPC'" dark icon v-bind="attrs" v-on="on" @click="setSomeIPClientList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selSomeIPClient" :key="i" link @click="setSomeIPClient(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newSomeIPClient" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-select v-model="element.version" :items="enumVersion" clearable label="Version Driven Find Behavior" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/requiredMethod'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showMethodRef" x-small color="indigo">
                                            <v-icon>{{ isMethodRefOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Method Request Props
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
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/requiredE'">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showRequiredEvent" x-small color="indigo">
                                            <v-icon>{{ isRequiredEventOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    SomeIP Required Event Group
                                    <v-btn v-if="isRequiredEventOpenClose" @click="addRequiredEvent" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='eventGroupTab' v-show="isRequiredEventOpenClose" show-arrows @change="changeEeventGroupTab()">
                                    <v-tab v-for="(tab, idx) in element.requiredevent" :key="idx" @click="clickEeventGroupTab()"> 
                                        {{tab.name}}
                                        <v-btn text x-small @click="deleteEventGroup(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="eventGroupTab" v-show="isRequiredEventOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.requiredevent" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.name" label="name" :rules="rules.name" @input='inputEventGName(tab.name)' @click="setactiveUUID" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.eventG" readonly @click="setEventGSelect(tab)" clearable @click:clear='clearEventG(tab)' label="Event Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredEventG'+tab.id" icon v-bind="attrs" v-on="on" @click="setEventGList()">
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
                                                <v-row>
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.client" readonly @click="setClientSelect(tab)" clearable @click:clear='clearClient(tab)' label="SD Client Event Group Timing Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredClient'+tab.id" icon v-bind="attrs" v-on="on" @click="setClientList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item v-for="(item, i) in selClient" :key="i" link @click="setClient(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-btn outlined color="indigo" dense text small block @click="newClient" >
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
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/E2EE'">
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
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2ePro-'+tab.id" icon v-bind="attrs" v-on="on" @click="setE2EProfileList()">
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
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2eEvent-'+tab.id" icon v-bind="attrs" v-on="on" @click="setEventList()">
                                                                    <v-icon>mdi-menu-down-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-list>
                                                                <v-list-item v-for="(item, i) in selEvent" :key="i" link @click="setEvent(item, tab)">
                                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item v-if="selEvent.length == 0">
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
                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/E2EM'">
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
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2eProM-'+tab.id" icon v-bind="attrs" v-on="on" @click="setE2EProfileMList()">
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
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/e2eMethod-'+tab.id" icon v-bind="attrs" v-on="on" @click="setE2EMethodList()">
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
                            if(this.element.requiredevent.length > 0 && this.location == 1) {
                                if (this.isRequiredEventOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, this.eventGroupTab, this.element.requiredevent[this.eventGroupTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, null)
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
            isMethodRefOpenClose: true,
            isRequiredEventOpenClose: true,
            isE2EEventOpenClose: true,
            isE2EMethodOpenClose: true,
            selSIDeployment: this.$store.getters.getSIDeployment,
            selSomeIPClient: this.$store.getters.getSomeIPClient,
            enumVersion: ['MINIMUM-MINOR-VERSION', 'EXACT-OF-ANY-MINOR-VERSION'],

            selectMethodRef: [],
            headerMethodRef: [
                { text: 'SomeIP Method Props', align: 'start', sortable: false, value: 'method' },
            ],
            editMethodItem: { method : null, id: ''},
            isdeleteMethodRef: false,
            selMethodref: this.$store.getters.getSomeIPMethodDeployment,
            isEditingMethod: true,
            deleteMethodLine: [],

            eventGroupTab: 0,
            selEventG: this.$store.getters.getEventGroup,
            selClient: this.$store.getters.getClient,

            E2EEventTab: 0,
            selE2EProfile: this.$store.getters.getE2EProfileConfig,
            selEvent: this.$store.getters.getEventDeployment,
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
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: true} )
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
        showRequiredSomeIP () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.element.requiredevent.length > 0 && this.location == 1) {
                        if (this.isRequiredEventOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, this.eventGroupTab, this.element.requiredevent[this.eventGroupTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, null)
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
        showRequiredEvent() {
            this.isRequiredEventOpenClose = this.isRequiredEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            if(this.element.requiredevent.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isRequiredEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, this.eventGroupTab, this.element.requiredevent[this.eventGroupTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, null)
                    }
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
        inputRequiredSomeIPName () {
            this.$store.commit('editRequiredSomeIP', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: true} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },

        clearSIDeployment() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
            if (endLine != undefined) {
                this.element.deployref = null
                this.deleteLine(this.element.uuid+'/requiredDeploy')
            }
        },
        setSIDeploymentSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredDeploy')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredDeploy', this.element.uuid+'/requiredDeploy', item.uuid)
                }
                this.element.deployref = item.name
            }
            this.setactiveUUID()
        },
        newSIDeployment() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementSomeIPService', {
                name: this.$store.getters.getNameSomeIPService, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                service: null, majversion:'', minversion:'', id: '', eventG:[], eventD: [], methodD:[], fieldD:[],
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInterfaces_str)
            EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearSomeIPClient() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
            if (endLine != undefined) {
                this.element.someipclient = null
                this.deleteLine(this.element.uuid+'/requiredSomeIPC')
            }
        },
        setSomeIPClientSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
            if (endLine == undefined) {
                endLine = this.$store.getters.getSomeIPClientPath(this.element.someipclient)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPClient_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setSomeIPClientList() {
            this.selSomeIPClient = this.$store.getters.getSomeIPClient
            this.setactiveUUID()
        },
        setSomeIPClient(item){
            if( this.element.someipclient != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredSomeIPC')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredSomeIPC', this.element.uuid+'/requiredSomeIPC', item.uuid)
                }
                this.element.someipclient = item.name
            }
            this.setactiveUUID()
        },
        newSomeIPClient() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementSomeIPClient', { 
                name: this.$store.getters.getNameSomeIPClient, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                findtime: '', inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInstances_str)
            EventBus.$emit('add-element', constant.SomeIPClient_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
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
                for(let i=0; i<this.element.method.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+i)
                    if(endLine != undefined) {
                        this.deleteMethodLine.push({id:this.element.method[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/requiredMethod-'+i)
                    }
                }

                this.element.method = this.element.method.filter(item => {
                        return this.selectMethodRef.indexOf(item) < 0 })

                for(let n=0; n<this.element.method.length; n++) {
                    for(let idx=0; idx<this.deleteMethodLine.length; idx++) {
                        if (this.element.method[n].id == this.deleteMethodLine[idx].id) {
                            this.newLine(this.element.uuid+'/requiredMethod-'+n, this.element.uuid+'/requiredMethod', this.deleteMethodLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteMethodRef = false
                this.selectMethodRef = []
                this.deleteMethodLine = []
            } 
        },
        openMethodRef(idx) {
            this.selMethodref = this.$store.getters.getSomeIPMethodDeployment

            if ( this.element.method[idx].method != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSomeIPMethodDeploymentPath(this.element.method[idx].method)
                }
                this.editMethodItem.method = { name: this.element.method[idx].method, uuid: endLine }
            }
        },
        editMethodRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+idx)
            if (endLine != undefined && this.editMethodItem.method == null) {
                this.deleteLine(this.element.uuid+'/requiredMethod-'+idx)
                this.element.method[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodItem.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/requiredMethod-'+idx)
                this.newLine(this.element.uuid+'/requiredMethod-'+idx, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid)
                this.element.method[idx].method = this.editMethodItem.method.name
            } else if (endLine == undefined && this.editMethodItem.method != null) {
                this.newLine(this.element.uuid+'/requiredMethod-'+idx, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid)
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
                var datacount = this.element.method.length
                this.newLine(this.element.uuid+'/requiredMethod-'+datacount, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid)
                this.editMethodItem.method = this.editMethodItem.method.name
            }
            const addObj = Object.assign({}, this.editMethodItem)
            this.element.method.push(addObj);

            this.cancelMethodRef()
        },
        setMethodSelect() {
            if (this.isEditingMethod == true) {
                if (this.editMethodItem.method != null && this.editMethodItem.method.uuid != null) {
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

        addRequiredEvent() {
            const editItem = { name: '', eventG: null, client: null, id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Event Group_' + n++;
                res = this.element.requiredevent.some(ele => ele.name === addObj.name)
            }
            addObj.id = n

            this.element.requiredevent.push(addObj)
            this.eventGroupTab = this.element.requiredevent.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, null)
            }
        },
        clickEeventGroupTab() {},
        changeEeventGroupTab() {
            if(this.element.requiredevent.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, this.eventGroupTab, this.element.requiredevent[this.eventGroupTab].id)}, 300);
            }
        },
        deleteEventGroup(idx) {
            //console.log('deleteEventGroup')
            var endLine, endE, endC
            if (this.element.requiredevent[idx].eventG != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+idx)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+idx)
                }
            }
            if (this.element.requiredevent[idx].client != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+idx)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredClient-'+idx)
                }
            }
            for(let i=idx+1; i<this.element.requiredevent.length; i++){
                endE = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+i)
                endC = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+i)
                if (endE != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+i)
                    this.newLine(this.element.uuid+'/requiredEventG-'+(i-1), this.element.uuid+'/requiredE', endE)
                }
                if (endC != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredClient-'+i)
                    this.newLine(this.element.uuid+'/requiredClient-'+(i-1), this.element.uuid+'/requiredE', endC)
                }
            }

            this.element.requiredevent.splice(idx, 1)
            this.changeEeventGroupTab()
        },
        clearEventG(item) {
            item.eventG = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
            }
        },
        setEventGSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredEventG-'+this.eventGroupTab, this.element.uuid+'/requiredEventG'+this.element.requiredevent[this.eventGroupTab].id, item.uuid)
                }
                tab.eventG = item.name
            }
            this.setactiveUUID()
        },
        clearClient(item) {
            item.client = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
            }
        },
        setClientSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getClientPath(item.client)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.Client_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setClientList() {
            this.selClient =  this.$store.getters.getClient
            this.setactiveUUID()
        },
        setClient(item, tab){
            if( tab.client != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/requiredClient-'+this.eventGroupTab, this.element.uuid+'/requiredClient'+this.element.requiredevent[this.eventGroupTab].id, item.uuid)
                }
                tab.client = item.name
            }
            this.setactiveUUID()
        },
        newClient() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementClient', { 
                name: this.$store.getters.getNameClient, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                delay: '', max: '', timetolive: '', delaymax: '', delaymin:''
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPEvents_str)
            EventBus.$emit('add-element', constant.Client_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
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
            if(this.element.E2EEvent.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)}, 300);
            }
        },
        deleteE2EEvent(idx) {
            var endLine
            if (this.element.E2EEvent[idx].e2e != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[idx].id)
                }
            }
            if (this.element.E2EEvent[idx].event != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[idx].id)
                }
            }

            this.element.E2EEvent.splice(idx, 1)
            this.changeE2EEventTab()
        },
        clearE2EProfile(item) {
            item.e2e = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEvent].id)
            }
        },
        setE2ESelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getE2EProfileConfigPath(item.e2e, 1)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, item.uuid)
                }
                tab.e2e = item.name
            }
            this.setactiveUUID()
        },
        clearEvent(item) {
            item.event = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
            }
        },
        setEventSelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.event,2)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                EventBus.$emit('active-element', endLine)
            }
        },
        setEventList() {
            this.selEvent =  this.$store.getters.getEventDeployment
            this.setactiveUUID()
        },
        setEvent(item, tab){
            if( tab.event != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, item.uuid)
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
            if(this.element.E2EMethod.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)}, 300);
            }
        },
        deleteE2EMethod(idx) {
            var endLine
            if (this.element.E2EMethod[idx].e2e != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[idx].id)
                }
            }
            if (this.element.E2EMethod[idx].event != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[idx].id)
                }
            }

            this.element.E2EMethod.splice(idx, 1)
            this.changeE2EMethodTab()
        },
        clearE2EProfileM(item) {
            item.e2e = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
            }
        },
        setE2ESelectM(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine == undefined) {
                endLine = this.$store.getters.getE2EProfileConfigPath(item.e2e, 1)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, item.uuid)
                }
                tab.e2e = item.name
            }
            this.setactiveUUID()
        },
        clearE2EMethod(item) {
            item.method = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
            }
        },
        setE2EMethodelect(item) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, item.uuid)
                }
                tab.method = item.name
            }
            this.setactiveUUID()
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:10} )
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