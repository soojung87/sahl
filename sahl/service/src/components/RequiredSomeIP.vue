<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Required SomeIP Service Instance</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputRequiredSomeIPName'  @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.deployref" readonly @click="setSIDeploymentSelect()" :style="refServiceID ? 'height: 43px;border:solid red 2px' : ''"
                                                 clearable @click:clear='clearSIDeployment()' label="Service Interface Deployment Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <v-text-field v-model="element.minorver" label="Required Minor Version"  @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.serviceInsid" label="Required Service Instance ID"  @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.someipclient" readonly @click="setSomeIPClientSelect()" :style="refSDClient ? 'height: 43px;border:solid red 2px' : ''"
                                                 clearable @click:clear='clearSomeIPClient()' label="SD Client Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <v-select v-model="element.version" :items="enumVersion" clearable label="Version Driven Find Behavior" @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" outlined dense style="height: 45px;"></v-select>
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
                                    <v-data-table v-model="selectMethodRef" :headers="headerMethodRef" :items="element.method" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteMethodRef" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteMethodRef" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refMethod === item.id ? 'red' : null " @click="rowClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openMethodRef(idx)" @cancel="cancelMethodRef" @save="editMethodRef(idx)" large >
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelMethodRef" @save="addMethodRef()"> 
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
                                                <v-text-field v-model="tab.name" label="name" :rules="rules.name" @input='inputEventGName(tab.name)' @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.eventG" readonly @click="setEventGSelect(tab)" :style="refEventG ? 'height: 43px;border:solid red 2px' : ''"
                                                                     clearable @click:clear='clearEventG(tab)' label="Event Group Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredEventG-'+tab.id" icon v-bind="attrs" v-on="on" @click="setEventGList()">
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
                                                        <v-text-field v-model="tab.client" readonly @click="setClientSelect(tab)" :style="refSDClientE ? 'height: 43px;border:solid red 2px' : ''"
                                                                     clearable @click:clear='clearClient(tab)' label="SD Client Event Group Timing Config Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2">
                                                        <v-menu>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="deep-purple accent-4" :id="element.uuid+'/requiredClient-'+tab.id" icon v-bind="attrs" v-on="on" @click="setClientList()">
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
                                                <v-text-field v-model="tab.name" label="name" :rules="rules.name" @input='inputEventGName(tab.name)' @click="clickOtherFields()" placeholder="String" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.dataIds" label="Data IDs" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.dataLength" label="Data Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.period" label="Data Update Period" @click="clickOtherFields()" placeholder="Time" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.e2e" readonly @click="setE2ESelect(tab)" :style="refE2EEventPro ? 'height: 43px;border:solid red 2px' : ''"
                                                                     clearable @click:clear='clearE2EProfile(tab)' label="E-2-E Profile Configuration Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                        <v-text-field v-model="tab.event" readonly @click="setEventSelect(tab)" :style="refE2EEventR ? 'height: 43px;border:solid red 2px' : ''"
                                                                     clearable @click:clear='clearEvent(tab)' label="Event Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                <v-text-field v-model="tab.max" label="Max Data Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.min" label="Min Data Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
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
                                                <v-text-field v-model="tab.dataIds" label="Data IDs" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.dataLength" label="Data Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.period" label="Data Update Period" @click="clickOtherFields()" placeholder="Time" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-row style="height: 45px">
                                                    <v-col cols="10">
                                                        <v-text-field v-model="tab.e2e" readonly @click="setE2ESelectM(tab)" :style="refE2EMethodPro ? 'height: 43px;border:solid red 2px' : ''"
                                                                     clearable @click:clear='clearE2EProfileM(tab)' label="E-2-E Profile Configuration Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                        <v-text-field v-model="tab.method" readonly @click="setE2EMethodSelect(tab)" :style="refE2EMethodR ? 'height: 43px;border:solid red 2px' : ''"
                                                                     clearable @click:clear='clearE2EMethod(tab)' label="Method Reference" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                <v-text-field v-model="tab.max" label="Max Data Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
                                                <v-text-field v-model="tab.min" label="Min Data Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" class="lable-placeholer-color" outlined dense></v-text-field>
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
                            <label style="padding:10px;">&#60;REQUIRED-MINOR-VERSION&#62;</label>
                            <v-text-field v-model="editARXML.minorver" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;REQUIRED-MINOR-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;REQUIRED-SERVICE-INSTANCE-ID&#62;</label>
                            <v-text-field v-model="editARXML.serviceInsid" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;REQUIRED-SERVICE-INSTANCE-ID&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SD-CLIENT-CONFIG-REF&#62;</label>
                            <v-text-field v-model="editARXML.someipclient" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SD-CLIENT-CONFIG-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;VERSION-DRIVEN-FIND-BEHAVIOR&#62;</label>
                            <v-text-field v-model="editARXML.version" placeholder="MINIMUM-MINOR-VERSION or EXACT-OF-ANY-MINOR-VERSION" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;VERSION-DRIVEN-FIND-BEHAVIOR&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;E-2-E-EVENT-PROTECTION-PROPSS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextE2EE()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 350px;">
                            <v-row v-for="(item, i) in editARXML.E2EEvent" :key="i" style="height: 250px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextE2EE(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;END-2-END-EVENT-PROTECTION-PROPS&#62;</label>
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
                            <label style="padding:10px;">&#60;E-2-E-METHOD-PROTECTION-PROPSS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextE2EM()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 350px;">
                            <v-row v-for="(item, i) in editARXML.E2EMethod" :key="i" style="height: 220px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextE2EM(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;END-2-END-METHOD-PROTECTION-PROPS&#62;</label>
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
                            <label style="padding:10px;">&#60;METHOD-REQUEST-PROPSS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextMethod()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 150px;">
                            <v-row v-for="(item, i) in editARXML.method" :key="i" style="height: 70px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextMethod(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SOMEIP-METHOD-PROPS&#62;</label>
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
                            <label style="padding:10px;">&#60;REQUIRED-EVENT-GROUPS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEvent()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.requiredevent" :key="i" style="height: 120px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextEvent(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SOMEIP-REQUIRED-EVENT-GROUP&#62;</label>
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
                                        <v-col cols="6">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.client" placeholder="Path" style="margin:-5px 0px 0px 25px;" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="2">
                                        <label style="padding:10px;">&#60;&#47;SD-CLIENT-EVENT-GROUP-TIMING-CONFIG-REF&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-REQUIRED-EVENT-GROUP&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;REQUIRED-EVENT-GROUPS&#62;</label>
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
            iselementOpenClose: true,//this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            dialogText: false,
            editARXML: {name:'', deployref: null, minover: '', id: '', someipclient: null, ver: null, method: [], requiredevent: [], E2EEvent: [], E2EMethod: []},
            editTextMethod: {method: null, id: ''},
            editTextEvent: { name: '', eventG: null, client: null, id: ''},
            editTextE2EE: { name: '', dataIds: '', dataLength: '', period: '', e2e: null, event: null, max: '', min: '', id: ''},
            editTextE2EM: { dataIds: '', dataLength: '', period: '', e2e: null, method: null, max: '', min: '', id: ''},
            isMethodRefOpenClose: true,
            isRequiredEventOpenClose: true,
            isE2EEventOpenClose: true,
            isE2EMethodOpenClose: true,
            selSIDeployment: this.$store.getters.getSIDeployment,
            selSomeIPClient: this.$store.getters.getSomeIPClient,
            enumVersion: ['MINIMUM-MINOR-VERSION', 'EXACT-OF-ANY-MINOR-VERSION'],

            selectMethodRef: [],
            headerMethodRef: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'SomeIP Method Props', align: 'start', sortable: false, value: 'method' },
            ],
            editMethodItem: { method : null, id: ''},
            isdeleteMethodRef: false,
            selMethodref: this.$store.getters.getSomeIPMethodDeployment,
            isEditingMethod: true,

            eventGroupTab: 0,
            selEventG: this.$store.getters.getEventGroup,
            selClient: this.$store.getters.getClient,

            E2EEventTab: 0,
            selE2EProfile: this.$store.getters.getE2EProfileConfig,
            selEvent: this.$store.getters.getEventDeployment,
            E2EMethodTab: 0,
            selE2EProfileM: this.$store.getters.getE2EProfileConfig,
            selMethod: this.$store.getters.getDeploymentMethod,

            refServiceID: false,
            refSDClient: false,
            refMethod: null,
            refEventG: false,
            refSDClientE: false,
            refE2EEventPro: false,
            refE2EEventR: false,
            refE2EMethodPro: false,
            refE2EMethodR: false,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID, id, isDeleteItem, item, idxRow) => {
                        console.log('## '+id+' / '+isDeleteItem+ ' / ' + item+ ' / '+tabID)
                        console.log(this.refMethod)
            if (isDeleteItem) {
                if (this.refMethod == id && item == 'method') {
                    this.refMethod = id + 1
                    this.rowClick(idxRow)
                } else if (this.refE2EEventR && this.element.E2EEvent[this.E2EEventTab].id == tabID && item == 'E2EEvent') {
                    this.clickOtherFields()
                } else if (this.refE2EMethodR && this.element.E2EMethod[this.E2EMethodTab].id == tabID && item == 'E2EMethod') {
                    this.clickOtherFields()
                } else if (this.refE2EEventPro && this.element.E2EEvent[this.E2EEventTab].id == tabID && item == 'E2EEventPro') {
                    this.clickOtherFields()
                } else if (this.refE2EMethodPro && this.element.E2EMethod[this.E2EMethodTab].id == tabID && item == 'E2EMethodPro') {
                    this.clickOtherFields()
                } else if (this.refEventG && this.element.requiredevent[this.eventGroupTab].id == tabID && item == 'eventG') {
                    this.clickOtherFields()
                }
            } else {
                this.refServiceID = false
                this.refSDClient = false
                this.refMethod = null
                this.refEventG = false
                this.refSDClientE = false
                this.refE2EEventPro = false
                this.refE2EEventR = false
                this.refE2EMethodPro = false
                this.refE2EMethodR = false

                if (refNum == 1) {
                    this.refServiceID = true
                } else if (refNum == 2) {
                    this.refSDClient = true
                } else if (refNum == 3) {
                    this.refMethod = idxID
                } else if (refNum == 4) {
                    this.eventGroupTab = tabID
                    this.refEventG = true
                } else if (refNum == 5) {
                    this.eventGroupTab = tabID
                    this.refSDClientE = true
                } else if (refNum == 6) {
                    this.E2EEventTab = tabID
                    this.refE2EEventPro = true
                } else if (refNum == 7) {
                    this.E2EEventTab = tabID
                    this.refE2EEventR = true
                } else if (refNum == 8) {
                    this.E2EMethodTab = tabID
                    this.refE2EMethodPro = true
                } else if (refNum == 9) {
                    this.E2EMethodTab = tabID
                    this.refE2EMethodR = true
                } 
            }
        })
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
            /*this.$nextTick(() => {
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
            })*/
        },
        showMethodRef() {
            this.clickOtherFields()
            this.isMethodRefOpenClose = this.isMethodRefOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showRequiredEvent() {
            this.clickOtherFields()
            this.isRequiredEventOpenClose = this.isRequiredEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            /*if(this.element.requiredevent.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isRequiredEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, this.eventGroupTab, this.element.requiredevent[this.eventGroupTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, null)
                    }
                })
            }*/
        },
        showE2EEvent() {
            this.clickOtherFields()
            this.isE2EEventOpenClose = this.isE2EEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            /*if(this.element.E2EEvent.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isE2EEventOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, null)
                    }
                })
            }*/
        },
        showE2EMethod() {
            this.clickOtherFields()
            this.isE2EMethodOpenClose = this.isE2EMethodOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            /*if(this.element.E2EMethod.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isE2EMethodOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, null)
                    }
                })
            }*/
        },
        inputRequiredSomeIPName () {
            this.$store.commit('editRequiredSomeIP', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, req: true} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        clickOtherFields() {
            if (this.refServiceID || this.refSDClient || this.refMethod != null || this.refEventG || this.refSDClientE ||
                this.refE2EEventPro || this.refE2EEventR || this.refE2EMethodPro || this.refE2EMethodR) {
                this.deleteOpenElement()
                this.refServiceID = false
                this.refSDClient = false
                this.refEventG = false
                this.refSDClientE = false
                this.refE2EEventPro = false
                this.refE2EEventR = false
                this.refE2EMethodPro = false
                this.refE2EMethodR = false
                this.refMethod = null
            }
        },
        rowClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refMethod != this.element.method[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.method[idx].method != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getSomeIPMethodDeploymentPath(this.element.method[idx].method)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/requiredMethod', endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredMethod', end:endLine, iscircle:false, refNum:3, idxID: this.element.method[idx].id})
                    }
                }
                this.refMethod = this.element.method[idx].id
            }
        },

        clearSIDeployment() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
            if (endLine != undefined) {
                this.element.deployref = null
                this.deleteLine(this.element.uuid+'/requiredDeploy')
            }
            this.clickOtherFields()
        },
        setSIDeploymentSelect() {
            this.clickOtherFields()
            if (this.element.deployref != null) {this.refServiceID = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.element.deployref, 0)
                }
                if (endLine != null) {
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/requiredDeploy', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredDeploy', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setSIDeploymentList() {
            this.selSIDeployment = this.$store.getters.getSIDeployment
            this.setactiveUUID()
        },
        setSIDeployment(item){
            this.clickOtherFields()
            if( this.element.deployref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredDeploy')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refServiceID = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredDeploy', this.element.uuid+'/requiredDeploy', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredDeploy', end:item.uuid, iscircle:false, refNum:1})
                }
                this.element.deployref = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refServiceID = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredDeploy', this.element.uuid+'/requiredDeploy', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredDeploy', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        newSIDeployment() {
            this.$store.commit('addElementSomeIPService', {
                name: this.$store.getters.getNameSomeIPService, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                service: null, majversion:'', minversion:'', id: '', eventG:[], eventD: [], methodD:[], fieldD:[],
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPServiceInterfaceDeployment_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        clearSomeIPClient() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
            if (endLine != undefined) {
                this.element.someipclient = null
                this.deleteLine(this.element.uuid+'/requiredSomeIPC')
            }
            this.clickOtherFields()
        },
        setSomeIPClientSelect() {
            this.clickOtherFields()
            if (this.element.someipclient != null) {this.refSDClient = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSomeIPClientPath(this.element.someipclient)
                }
                if (endLine != null) {
                    this.$store.commit('editSomeIPClient', {compo:"drag", uuid: endLine, top: this.element.top + 50, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPClient_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/requiredSomeIPC', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredSomeIPC', end:endLine, iscircle:false, refNum:2})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPClient_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setSomeIPClientList() {
            this.selSomeIPClient = this.$store.getters.getSomeIPClient
            this.setactiveUUID()
        },
        setSomeIPClient(item){
            this.clickOtherFields()
            if( this.element.someipclient != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredSomeIPC')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refSDClient = true
                    this.$store.commit('editSomeIPClient', {compo:"drag", uuid: item.uuid, top: this.element.top + 50, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPClient_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredSomeIPC', this.element.uuid+'/requiredSomeIPC', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredSomeIPC', end:item.uuid, iscircle:false, refNum:2})
                }
                this.element.someipclient = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refSDClient = true
                    this.$store.commit('editSomeIPClient', {compo:"drag", uuid: item.uuid, top: this.element.top + 50, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPClient_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredSomeIPC', this.element.uuid+'/requiredSomeIPC', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredSomeIPC', end:item.uuid, iscircle:false, refNum:2})
                }
            }
            this.setactiveUUID()
        },
        newSomeIPClient() {
            this.$store.commit('addElementSomeIPClient', { 
                name: this.$store.getters.getNameSomeIPClient, path: '', input: false,
                top: this.element.top + 50, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                findtime: '', inidelaymax: '', inidelaymin: '', inibasedelay: '', inirepetimax: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.SomeIPClient_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckMethodRef() {
            this.clickOtherFields()
            if (this.isdeleteMethodRef == true) {
                this.isdeleteMethodRef = false
                this.selectMethodRef = []
            } else {
                this.isdeleteMethodRef = true
            }
        },
        deletMethodRef() {
            this.clickOtherFields()
            if (this.isdeleteMethodRef == true) {
                this.selectMethodRef.forEach(item => {
                    for(let i=0; i<this.element.method.length; i++){
                        if (item.id == this.element.method[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+this.element.method[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/requiredMethod-'+this.element.method[i].id)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSomeIPMethodDeploymentPath(this.element.method[idx].method)
                }
                this.editMethodItem.method = { name: this.element.method[idx].method, uuid: endLine }
            }
        },
        editMethodRef(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id)
            if (endLine != undefined && this.editMethodItem.method == null) {
                this.deleteLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id)
                this.element.method[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodItem.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id)
                this.newLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid, false)
                this.element.method[idx].method = this.editMethodItem.method.name
            } else if (endLine == undefined && this.editMethodItem.method != null && this.editMethodItem.method.uuid != null) {
                this.newLine(this.element.uuid+'/requiredMethod-'+this.element.method[idx].id, this.element.uuid+'/requiredMethod', this.editMethodItem.method.uuid, false)
                this.element.method[idx].method = this.editMethodItem.method.name
            } else if (this.editMethodItem.method != null && endLine == this.editMethodItem.method.uuid && this.element.method[idx].method != this.editMethodItem.method.name) {
                this.element.method[idx].method = this.editMethodItem.method.name
            }

            if (this.refMethod == this.element.method[idx].id) {
                this.deleteOpenElement()
                if (this.editMethodItem.method != null && this.editMethodItem.method.uuid != null) {
                    var endLineChange = this.editMethodItem.method.uuid
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: this.editMethodItem.method.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: this.editMethodItem.method.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/requiredMethod', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredMethod', end:endLineChange, iscircle:false, refNum:3, idxID: this.refMethod})
                }
            }
            
            this.cancelMethodRef()
        },
        cancelMethodRef() {
            this.editMethodItem.method = null
            this.setactiveUUID()
        },
        addMethodRef() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.method.some(item => item.id === n)
            }
            this.editMethodItem.id = n
            var endLine = null
            if( this.editMethodItem.method != null) {
                endLine = this.editMethodItem.method.uuid
                this.$store.commit('editSomeIPService', {compo:"drag", uuid: this.editMethodItem.method.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: this.editMethodItem.method.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                
                this.editMethodItem.method = this.editMethodItem.method.name
                if (endLine != null) {
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredMethod-'+n, this.element.uuid+'/requiredMethod', endLine, true)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                }
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredMethod', end:endLine, iscircle:false, refNum:3, idxID: this.editMethodItem.id})
            }
            const addObj = Object.assign({}, this.editMethodItem)
            this.element.method.push(addObj);
            this.refMethod = n

            this.cancelMethodRef()
        },
        setMethodSelect() {
            if (this.isEditingMethod == true) {
                if (this.editMethodItem.method != null && this.editMethodItem.method.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editMethodItem.method.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    // document.getElementById(this.editMethodItem.method.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editMethodItem.method.uuid)
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
            this.clickOtherFields()
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
            if (this.refEventG || this.refSDClientE) {
                this.deleteOpenElement()
                this.refEventG = false
                this.refSDClientE = false
            }
            /*if(this.element.requiredevent.length > 0 && this.location == 1 && this.eventGroupTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'requiredEvent', this.element.uuid, this.eventGroupTab, this.element.requiredevent[this.eventGroupTab].id)}, 300);
            }*/
        },
        deleteEventGroup(idx) {
            this.clickOtherFields()
            var endLine
            if (this.element.requiredevent[idx].eventG != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+this.element.requiredevent[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+this.element.requiredevent[idx].id)
                }
            }
            if (this.element.requiredevent[idx].client != null) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+this.element.requiredevent[idx].id)
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredClient-'+this.element.requiredevent[idx].id)
                }
            }
            this.element.requiredevent.splice(idx, 1)
        },
        clearEventG(item) {
            item.eventG = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+item.id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/requiredEventG-'+item.id)
            }
            this.clickOtherFields()
        },
        setEventGSelect(item) {
            this.clickOtherFields()
            if (item.eventG != null) {this.refEventG = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+item.id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.eventG, 1)
                }
                if (endLine != null) {
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/requiredEventG-'+item.id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredEventG-'+item.id, end:endLine, 
                                        iscircle:false, refNum:4, idxID: 0, tabID: this.eventGroupTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setEventGList() {
            this.selEventG =  this.$store.getters.getEventGroup
            this.setactiveUUID()
        },
        setEventG(item, tab){
            this.clickOtherFields()
            if( tab.eventG != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+tab.id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredEventG-'+tab.id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refEventG = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredEventG-'+tab.id, this.element.uuid+'/requiredEventG-'+tab.id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredEventG-'+tab.id, end:item.uuid, iscircle:false, 
                                        refNum:4, idxID: 0, tabID: this.eventGroupTab})
                }
                tab.eventG = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refEventG = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredEventG-'+tab.id, this.element.uuid+'/requiredEventG-'+tab.id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredEventG-'+tab.id, end:item.uuid, iscircle:false, 
                                        refNum:4, idxID: 0, tabID: this.eventGroupTab})
                }
            }
            this.setactiveUUID()
        },
        clearClient(item) {
            item.client = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+item.id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/requiredClient-'+item.id)
            }
            this.clickOtherFields()
        },
        setClientSelect(item) {
            this.clickOtherFields()
            if (item.client != null) {this.refSDClientE = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+item.id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getClientPath(item.client)
                }
                if (endLine != null) {
                    this.$store.commit('editClient', {compo:"drag", uuid: endLine, top: this.element.top + 510, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Client_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/requiredClient-'+item.id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredClient-'+item.id, end:endLine, 
                                        iscircle:false, refNum:5, idxID: 0, tabID: this.eventGroupTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.Client_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setClientList() {
            this.selClient =  this.$store.getters.getClient
            this.setactiveUUID()
        },
        setClient(item, tab){
            this.clickOtherFields()
            if( tab.client != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+tab.id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/requiredClient-'+tab.id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refSDClientE = true
                    this.$store.commit('editClient', {compo:"drag", uuid: item.uuid, top: this.element.top + 510, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Client_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredClient-'+tab.id, this.element.uuid+'/requiredClient-'+tab.id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredClient-'+tab.id, end:item.uuid, 
                                        iscircle:false, refNum:5, idxID: 0, tabID: this.eventGroupTab})
                }
                tab.client = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refSDClientE = true
                    this.$store.commit('editClient', {compo:"drag", uuid: item.uuid, top: this.element.top + 510, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.Client_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/requiredClient-'+tab.id, this.element.uuid+'/requiredClient-'+tab.id, item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/requiredClient-'+tab.id, end:item.uuid, 
                                        iscircle:false, refNum:5, idxID: 0, tabID: this.eventGroupTab})
                }
            }
            this.setactiveUUID()
        },
        newClient() {
            this.$store.commit('addElementClient', { 
                name: this.$store.getters.getNameClient, path: '', input: false,
                top: this.element.top + 510, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                delay: '', max: '', timetolive: '', delaymax: '', delaymin:''
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Client_str)
            this.$store.commit('editRequiredSomeIP', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        addE2EEvent() {
            this.clickOtherFields()
            const editItem = { name: '', dataIds: '', dataLength: '', period: '', e2e: null, event: null, max: '', min: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            if (this.element.E2EEvent.length == 0) {
                res = false
                addObj.name = 'E2EEvtProtProps_' + n
            } else {
                while (res) {
                    addObj.name = 'E2EEvtProtProps_' + n++;
                    res = this.element.E2EEvent.some(ele => ele.name === addObj.name)
                }
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
            if (this.refE2EEventPro || this.refE2EEventR) {
                this.deleteOpenElement()
                this.refE2EEventPro = false
                this.refE2EEventR = false
            }
            /*if(this.element.E2EEvent.length > 0 && this.location == 1 && this.E2EEventTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'E2EEvent', this.element.uuid, this.E2EEventTab, this.element.E2EEvent[this.E2EEventTab].id)}, 300);
            }*/
        },
        deleteE2EEvent(idx) {
            this.clickOtherFields()
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
        },
        clearE2EProfile(item) {
            item.e2e = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
            }
            this.clickOtherFields()
        },
        setE2ESelect(item) {
            this.clickOtherFields()
            if (item.e2e != null) {this.refE2EEventPro = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
                }
                if (endLine != null) {
                    this.$store.commit('editE2EProfileConfig', {compo:"drag", uuid: endLine, top: this.element.top + 410, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.E2EProfileConfig_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, end:endLine, 
                                        iscircle:false, refNum:6, idxID: 0, tabID: this.E2EEventTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.E2EProfileConfig_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setE2EProfileList() {
            this.selE2EProfile =  this.$store.getters.getE2EProfileConfig
            this.setactiveUUID()
        },
        setE2EProfile(item, tab){
            this.clickOtherFields()
            if( tab.e2e != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refE2EEventPro = true
                    this.$store.commit('editE2EProfileConfig', {compo:"drag", uuid: item.uuid, top: this.element.top + 410, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.E2EProfileConfig_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, end:item.uuid, 
                                        iscircle:false, refNum:6, idxID: 0, tabID: this.E2EEventTab})
                }
                tab.e2e = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refE2EEventPro = true
                    this.$store.commit('editE2EProfileConfig', {compo:"drag", uuid: item.uuid, top: this.element.top + 410, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.E2EProfileConfig_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2ePro-'+this.element.E2EEvent[this.E2EEventTab].id, end:item.uuid, 
                                        iscircle:false, refNum:6, idxID: 0, tabID: this.E2EEventTab})
                }
            }
            this.setactiveUUID()
        },
        clearEvent(item) {
            item.event = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
            }
            this.clickOtherFields()
        },
        setEventSelect(item) {
            this.clickOtherFields()
            if (item.event != null) {this.refE2EEventR = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.event,2)
                }
                if (endLine != null) {
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLine, top: this.element.top + 80, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, end:endLine, 
                                        iscircle:false, refNum:7, idxID: 0, tabID:this.E2EEventTab })
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setEventList() {
            this.selEvent =  this.$store.getters.getEventDeployment
            this.setactiveUUID()
        },
        setEvent(item, tab){
            this.clickOtherFields()
            if( tab.event != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refE2EEventR = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top + 80, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, end:item.uuid, 
                                        iscircle:false, refNum:7, idxID: 0, tabID: this.E2EEventTab})
                }
                tab.event = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refE2EEventR = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top + 80, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, 
                                    item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eEvent-'+this.element.E2EEvent[this.E2EEventTab].id, end:item.uuid,
                                        iscircle:false, refNum:7, idxID: 0, tabID: this.E2EEventTab})
                }
            }
            this.setactiveUUID()
        },

        addE2EMethod() {
            this.clickOtherFields()
            const editItem = { dataIds: '', dataLength: '', period: '', e2e: null, method: null, max: '', min: '', id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            if (this.element.E2EMethod.length == 0) {
                res = false
            } 
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
            if (this.refE2EMethodPro || this.refE2EMethodR) {
                this.deleteOpenElement()
                this.refE2EMethodPro = false
                this.refE2EMethodR = false
            }
            /*if(this.element.E2EMethod.length > 0 && this.location == 1 && this.E2EMethodTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'E2EMethod', this.element.uuid, this.E2EMethodTab, this.element.E2EMethod[this.E2EMethodTab].id)}, 300);
            }*/
        },
        deleteE2EMethod(idx) {
            this.clickOtherFields()
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
        },
        clearE2EProfileM(item) {
            item.e2e = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
            }
            this.clickOtherFields()
        },
        setE2ESelectM(item) {
            this.clickOtherFields()
            if (item.e2e != null) {this.refE2EMethodPro = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
                }
                if (endLine != null) {
                    this.$store.commit('editE2EProfileConfig', {compo:"drag", uuid: endLine, top: this.element.top + 720, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.E2EProfileConfig_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, end:endLine, 
                                        iscircle:false, refNum:8, idxID: 0, tabID: this.E2EMethodTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.E2EProfileConfig_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setE2EProfileMList() {
            this.selE2EProfileM =  this.$store.getters.getE2EProfileConfig
            this.setactiveUUID()
        },
        setE2EProfileM(item, tab){
            this.clickOtherFields()
            if (tab.e2e != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refE2EMethodPro = true
                    this.$store.commit('editE2EProfileConfig', {compo:"drag", uuid: item.uuid, top: this.element.top + 725, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.E2EProfileConfig_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id,
                                     item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, end:item.uuid, 
                                        iscircle:false, refNum:8, idxID: 0, tabID: this.E2EMethodTab})
                }
                tab.e2e = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refE2EMethodPro = true
                    this.$store.commit('editE2EProfileConfig', {compo:"drag", uuid: item.uuid, top: this.element.top + 725, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.E2EProfileConfig_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id,
                                     item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eProM-'+this.element.E2EMethod[this.E2EMethodTab].id, end:item.uuid, 
                                        iscircle:false, refNum:8, idxID: 0, tabID: this.E2EMethodTab})
                }
            }
            this.setactiveUUID()
        },
        clearE2EMethod(item) {
            item.method = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
            }
            this.clickOtherFields()
        },
        setE2EMethodSelect(item) {
            this.clickOtherFields()
            if (item.method != null) {this.refE2EMethodR = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.method,3)
                }
                if (endLine != null) {
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLine, top: this.element.top + 500, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, end:endLine, 
                                        iscircle:false, refNum:9, idxID: 0, tabID: this.E2EMethodTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setE2EMethodList() {
            this.selMethod =  this.$store.getters.getDeploymentMethod
            this.setactiveUUID()
        },
        setE2EMethod(item, tab){
            this.clickOtherFields()
            if( tab.method != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refE2EMethodR = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top + 500, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id,
                                     item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, end:item.uuid, 
                                        iscircle:false, refNum:9, idxID: 0, tabID: this.E2EMethodTab})
                }
                tab.method = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refE2EMethodR = true
                    this.$store.commit('editSomeIPService', {compo:"drag", uuid: item.uuid, top: this.element.top + 500, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id,
                                     item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/e2eMethod-'+this.element.E2EMethod[this.E2EMethodTab].id, end:item.uuid, 
                                        iscircle:false, refNum:9, idxID: 0, tabID: this.E2EMethodTab})
                }
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
            this.editARXML.deployref = this.element.deployref
            this.editARXML.minover = this.element.minover
            this.editARXML.id = this.element.id
            this.editARXML.someipclient = this.element.someipclient
            this.editARXML.ver = this.element.ver
            this.editARXML.method = JSON.parse(JSON.stringify(this.element.method))
            this.editARXML.requiredevent = JSON.parse(JSON.stringify(this.element.requiredevent))
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
            this.element.minover = this.editARXML.minover
            this.element.id = this.editARXML.id
            this.editARXML.ver = this.editARXML.ver.toUpperCase()
            if(this.editARXML.ver == 'MINIMUM-MINOR-VERSION' || this.editARXML.ver == 'EXACT-OF-ANY-MINOR-VERSION') {
                this.element.ver = this.editARXML.ver
            }

            var endLine = null, changEndLine = null
            if (this.editARXML.deployref != this.element.deployref) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredDeploy')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredDeploy')
                }
                changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.editARXML.deployref, 0)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/requiredDeploy', this.element.uuid+'/requiredDeploy', changEndLine, false)
                }
            }
            this.element.deployref = this.editARXML.deployref
            if (this.editARXML.someipclient != this.element.someipclient) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredSomeIPC')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/requiredSomeIPC')
                }
                changEndLine = this.$store.getters.getSomeIPClientPath(this.editARXML.someipclient)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/requiredSomeIPC', this.element.uuid+'/requiredSomeIPC', changEndLine, false)
                }
            }
            this.element.someipclient = this.editARXML.someipclient

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
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/requiredMethod-'+item.id)
                        }
                        var changEndLine = this.$store.getters.getSomeIPMethodDeploymentPath(item.method)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/requiredMethod-'+item.id, this.element.uuid+'/requiredMethod', changEndLine, false)
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
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/requiredMethod-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.method.length > 0) {
                    this.element.method.forEach(item => {
                        var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/requiredMethod-'+item.id)
                        }
                    })
                }
            }
            this.element.method = JSON.parse(JSON.stringify(this.editARXML.method))

            if (this.editARXML.requiredevent.length > 0) {
                this.editARXML.requiredevent.forEach(item => {
                    var isHaveTableE = false, isHaveTableC = false
                    this.element.requiredevent.forEach(ele => {
                        if (ele.id == item.id) {
                            if (ele.eventG == item.eventG) {
                                isHaveTableE = true
                            }
                            if (ele.client == item.client) {
                                isHaveTableC = true
                            }
                        }
                    })
                    if (!isHaveTableE) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/requiredEventG-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.eventG, 1)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/requiredEventG-'+item.id, this.element.uuid+'/requiredE', changEndLine, false)
                        }
                    }
                    if (!isHaveTableC) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/requiredClient-'+item.id)
                        }
                        changEndLine = this.$store.getters.getClientPath(item.client)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/requiredClient-'+item.id, this.element.uuid+'/requiredE', changEndLine, false)
                        }
                    }
                })
                this.element.requiredevent.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.requiredevent.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.eventG != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/requiredEventG-'+item.id)
                            }
                        }
                        if (item.client != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/requiredClient-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.requiredevent.length > 0) {
                    this.element.requiredevent.forEach(item => {
                        if (item.eventG != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredEventG-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/requiredEventG-'+item.id)
                            }
                        }
                        if (item.client != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/requiredClient-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/requiredClient-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.requiredevent = JSON.parse(JSON.stringify(this.editARXML.requiredevent))

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
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2ePro-'+item.id)
                        }
                        console.log(item.e2e)
                        changEndLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
                        console.log(changEndLine)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2ePro-'+item.id, this.element.uuid+'/E2EE', changEndLine, false)
                        }
                    }
                    if (!isHaveTable2E) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2eEvent-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.event, 2)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2eEvent-'+item.id, this.element.uuid+'/E2EE', changEndLine, false)
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
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2ePro-'+item.id)
                            }
                        }
                        if (item.event != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eEvent-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.E2EEvent.length > 0) {
                    this.element.E2EEvent.forEach(item => {
                        if (item.e2e != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2ePro-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2ePro-'+item.id)
                            }
                        }
                        if (item.event != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eEvent-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eEvent-'+item.id)
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
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2eProM-'+item.id)
                        }
                        changEndLine = this.$store.getters.getE2EProfileConfigPath(item.e2e)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2eProM-'+item.id, this.element.uuid+'/E2EM', changEndLine, false)
                        }
                    }
                    if (!isHaveTableM) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/e2eMethod-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfaceDeploymentPath(item.method, 3)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/e2eMethod-'+item.id, this.element.uuid+'/E2EM', changEndLine, false)
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
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eProM-'+item.id)
                            }
                        }
                        if (item.method != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eMethod-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.E2EMethod.length > 0) {
                    this.element.E2EMethod.forEach(item => {
                        if (item.e2e != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eProM-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eProM-'+item.id)
                            }
                        }
                        if (item.method != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/e2eMethod-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/e2eMethod-'+item.id)
                            }
                        }
                    })
                }
            }
            this.element.E2EMethod = JSON.parse(JSON.stringify(this.editARXML.E2EMethod))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', deployref: null, minover: '', id: '', someipclient: null, ver: null, method: [], requiredevent: [], E2EEvent: [], E2EMethod: []}
            this.editTextMethod = {method: null, id: ''}
            this.editTextEvent = { name: '', eventG: null, client: null, id: ''}
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
        newTextEvent() {
            this.editTextEvent = {name: '', eventG: null, client: null, id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextEvent.name = 'Event Group_' + n++;
                res = this.editARXML.requiredevent.some(item => item.id === n)
            }
            this.editTextEvent.id = n

            const addObj = Object.assign({}, this.editTextEvent)
            this.editARXML.requiredevent.push(addObj);
        },
        deletTextEvent(idx) {
            this.editARXML.requiredevent.splice(idx,1)
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