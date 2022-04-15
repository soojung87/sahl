<template>
    <div :id="element.uuid">
        <v-container>
            <v-card outlined :color="minimaptoolbar ? null : colorToolbar">
                <v-toolbar v-if="!isDatailView" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                    <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                        <v-btn icon @click="showSomeIPService">
                            <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                        </v-btn>
                    </v-hover>
                    <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                        <v-icon> mdi-routes</v-icon>
                    </v-btn>
                    <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                    <v-toolbar-title>SomeIP Service Interface Deployment</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-toolbar v-else hide-on-scroll dense flat>
                    <v-toolbar-title>SomeIP Service Interface Deployment</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-show="iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                @input='inputSomeIPServiceName' outlined dense></v-text-field>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="element.service" readonly @click="setServiceSelect()" clearable @click:clear='clearService()' label="Service Interface Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/service'" dark icon v-bind="attrs" v-on="on" @click="setServiceList()">
                                        <v-icon>mdi-menu-down-outline</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, i) in selService" :key="i" link @click="setService(item)">
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                    </v-list-item>
                                    <v-btn outlined color="indigo" dense text small block @click="newService" >
                                        <v-icon >mdi-plus</v-icon>New Item
                                    </v-btn>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="element.id" label="Service Interface ID" placeholder="Int" style="height: 45px;margin:10px 0 0 0;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-row>
                        <v-col col="6">
                        <v-text-field v-model="element.majversion" label="Major Version" placeholder="number.number" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                        <v-col col="6">
                        <v-text-field v-model="element.minversion" label="Minor Version" placeholder="number.number" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card outlined class="mx-auto">
                        <div class="subtitle-2" :id="element.uuid+'/event'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showEventG" x-small color="indigo">
                                    <v-icon>{{ isEventGOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Event Groups
                            <v-btn v-if="isEventGOpenClose" @click="addEventG()" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isEventGOpenClose">
                            <v-tabs v-model='eventGTab' height="30px" show-arrows @change="changeEventGTab()">
                                <v-tab v-for="(tab, idx) in EventGItem" :key="idx" @click="clickEventGtab()"> 
                                    {{tab.name}}
                                    <v-btn text x-small @click="deleteEventG(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="eventGTab">
                                <v-tab-item v-for="(tab, idx) in EventGItem" :key="idx">
                                    <v-card flat>
                                        <v-card-text>
                                            <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputEventGName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            <v-text-field v-model="tab.size" label="Size" placeholder="Int" @input="inputEventGSize(tab.size)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            <v-card outlined class="mx-auto">
                                                <div class="subtitle-2" style="height:20px" :id="element.uuid+'/eventtab'+tab.name">
                                                    <v-hover v-slot="{ hover }">
                                                        <v-btn text @click="showEvent" x-small color="indigo">
                                                            <v-icon>{{ isEventOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                        </v-btn>
                                                    </v-hover>
                                                    Event Reference
                                                    <v-btn @click="isCheckEvent" text x-small color="indigo" v-if="isEventOpenClose">
                                                        <v-icon>mdi-check</v-icon>
                                                    </v-btn>
                                                    <v-btn v-if="isEventOpenClose && isdeleteEvent" @click="deleteEvent" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                </div>
                                                <v-card-text v-show="isEventOpenClose">
                                                    <v-data-table v-model="selectDelectEvent" :headers="headerEvent" :items="tab.event"
                                                            :show-select="isdeleteEvent" item-key="name" height="100px" dense hide-default-footer >
                                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                        </template>
                                                        <template v-if="!isdeleteEvent" v-slot:body="{ items, headers }">
                                                            <tbody>
                                                                <tr v-for="(item,num) in items" :key="num">
                                                                    <td v-for="(header,key) in headers" :key="key">
                                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openEvent(num)" @cancel="editEventItem(num)" @save="cancelEvent" large >
                                                                            {{item[header.value]}}
                                                                            <template v-slot:input>
                                                                                <br>
                                                                                <v-autocomplete v-model='editEvent.event' label='Event Reference' :items='selEvent' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                    return-object :readonly="!isEditingEvent" clearable @click="setEventSelect()" 
                                                                                    @click:clear='clearEvent' @blur="isEditingEvent=true" outlined dense style="height: 45px;">
                                                                                </v-autocomplete>
                                                                            </template>
                                                                        </v-edit-dialog>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th colspan="3">
                                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addEvent()" @save="cancelEvent"> 
                                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                <v-icon >mdi-plus</v-icon>New Item
                                                                            </v-btn>
                                                                            <template v-slot:input>
                                                                                <br>
                                                                                <v-autocomplete v-model='editEvent.event' label='Event Reference' :items='selEvent' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                                    return-object :readonly="!isEditingEvent" clearable @click="setEventSelect()" 
                                                                                    @click:clear='clearEvent' @blur="isEditingEvent=true" outlined dense style="height: 45px;">
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
                        <div class="subtitle-2" :id="element.uuid+'/serviceEventD'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showEventD" x-small color="indigo">
                                    <v-icon>{{ isEventDOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Event Deployments
                            <v-btn @click="isCheckEventD" text x-small color="indigo" v-if="isEventDOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isEventDOpenClose && isdeleteEventD" @click="deleteEventD" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isEventDOpenClose">
                            <v-data-table v-model="selectDelectEventD" :headers="headerEventD" :items="EventDItem" 
                                    :show-select="isdeleteEventD" item-key="name" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteEventD" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openEventD(idx)" @cancel="editEventDItem(idx)" @save="cancelEventD" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editEventD.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editEventD.event' label='Event Reference' :items='selVariableData' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingVariableData" clearable @click="setVariableDataSelect()" 
                                                                    @click:clear='clearVariableData' @blur="isEditingVariableData=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                        <v-text-field v-model="editEventD.id" label="Event ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editEventD.maxlength" label="Maximum Segment Length" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editEventD.time" label="Separation Time" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editEventD.serializer" clearable :items="selectSerializer" label="Serializer" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-select v-model="editEventD.protocal" clearable :items="selectProtocal" label="Transport Protocal" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addEventD()" @save="cancelEventD"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editEventD.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editEventD.event' label='Event Reference' :items='selVariableData' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingVariableData" clearable @click="setVariableDataSelect()" 
                                                                    @click:clear='clearVariableData' @blur="isEditingVariableData=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                        <v-text-field v-model="editEventD.id" label="Event ID" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editEventD.maxlength" label="Maximum Segment Length" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editEventD.time" label="Separation Time" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editEventD.serializer" clearable :items="selectSerializer" label="Serializer" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                        <v-select v-model="editEventD.protocal" clearable :items="selectProtocal" label="Transport Protocal" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                        <div class="subtitle-2" :id="element.uuid+'/serviceMethodD'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showMethodD" x-small color="indigo">
                                    <v-icon>{{ isMethodDOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Method Deployments
                            <v-btn @click="isCheckMethodD" text x-small color="indigo" v-if="isMethodDOpenClose">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn v-if="isMethodDOpenClose && isdeleteMethodD" @click="deleteMethodD" text x-small color="indigo">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isMethodDOpenClose">
                            <v-data-table v-model="selectDelectMethodD" :headers="headerMethodD" :items="MethodDItem"
                                    :show-select="isdeleteMethodD" item-key="name" height="100px" dense hide-default-footer >
                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                </template>
                                <template v-if="!isdeleteMethodD" v-slot:body="{ items, headers }">
                                    <tbody>
                                        <tr v-for="(item,idx) in items" :key="idx">
                                            <td v-for="(header,key) in headers" :key="key">
                                                <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openMethodD(idx)" @cancel="editMethodDItem(idx)" @save="cancelMethodD" large >
                                                    {{item[header.value]}}
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editMethodD.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editMethodD.method' label='Method Reference' :items='selClientServer' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingClientServer" clearable @click="setClientServerSelect()" 
                                                                    @click:clear='clearClientServer' @blur="isEditingClientServer=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                        <v-text-field v-model="editMethodD.id" label="Method ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.maxrequest" label="Maximum Segment Length Request" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.maxresponse" label="Maximum Segment Length Response" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.timerequest" label="Separation Time Request" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.timeresponse" label="Separation Time Response" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editMethodD.protocal" clearable :items="selectProtocal" label="Transport Protocal" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    </template>
                                                </v-edit-dialog>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th colspan="3">
                                                <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addMethodD()" @save="cancelMethodD"> 
                                                    <v-btn outlined color="indigo" dense text small block width="270px" >
                                                        <v-icon >mdi-plus</v-icon>New Item
                                                    </v-btn>
                                                    <template v-slot:input>
                                                        <br>
                                                        <v-text-field v-model="editMethodD.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-autocomplete v-model='editMethodD.method' label='Method Reference' :items='selClientServer' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                    return-object :readonly="!isEditingClientServer" clearable @click="setClientServerSelect()" 
                                                                    @click:clear='clearClientServer' @blur="isEditingClientServer=true" outlined dense style="height: 45px;">
                                                        </v-autocomplete>
                                                        <v-text-field v-model="editMethodD.id" label="Method ID" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.maxrequest" label="Maximum Segment Length Request" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.maxresponse" label="Maximum Segment Length Response" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.timerequest" label="Separation Time Request" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-text-field v-model="editMethodD.timeresponse" label="Separation Time Response" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        <v-select v-model="editMethodD.protocal" clearable :items="selectProtocal" label="Transport Protocal" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
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
                        <div class="subtitle-2" :id="element.uuid+'/field'" style="height:20px">
                            <v-hover v-slot="{ hover }">
                                <v-btn text @click="showFieldD" x-small color="indigo">
                                    <v-icon>{{ isFieldDOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            Field Deployments 
                            <v-btn v-if="isFieldDOpenClose" @click="addField" text x-small color="indigo">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text v-show="isFieldDOpenClose">
                            <v-tabs v-model='fieldTab' height="30px" show-arrows @change="changeFieldTab()">
                                <v-tab v-for="(tab, idx) in FieldDItem" :key="idx" @click="clickFieldtab()" > 
                                    {{tab.name}}
                                    <v-btn text x-small @click="deleteField(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="fieldTab">
                                <v-tab-item v-for="(tab, idx) in FieldDItem" :key="idx">
                                    <v-card flat>
                                        <v-card-text>
                                            <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputFieldDName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            <v-row style="height: 70px">
                                                <v-col cols="10">
                                                    <v-text-field v-model="tab.field" readonly @click="setFieldSelect()" clearable @click:clear='clearField()' label="Field Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-menu>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/fieldtab'+tab.name" icon v-bind="attrs" v-on="on" @click="setFieldList()">
                                                                <v-icon>mdi-menu-down-outline</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-list >
                                                            <v-list-item v-for="(item, i) in selField" :key="i" link @click="setServiceRef(item)">
                                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                            </v-list-item>
                                                            <v-list-item v-if="selField.length == 0">
                                                                <v-list-item-title>No Data Available</v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-card outlined class="mx-auto">
                                                <div class="subtitle-2" style="height:20px">
                                                    <v-hover v-slot="{ hover }">
                                                        <v-btn text @click="showGet" x-small color="indigo">
                                                            <v-icon>{{ isGetOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                        </v-btn>
                                                    </v-hover>
                                                    Get
                                                </div>
                                                <v-card-text v-if="isGetOpenClose">
                                                    <v-text-field v-model="tab.getname" :rules="rules.name" label="Name" placeholder="String" @input="inputGetName(tab.getname)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.getid" label="Method ID" placeholder="Int" @input="inputGetID(tab.getid)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.getmaxreq" label="Maximum Segment Length Request" placeholder="Int" @input="inputGetMaxReq(tab.getmaxreq)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.getmaxres" label="Maximum Segment Length Response" placeholder="Int" @input="inputGetMaxRes(tab.getmaxres)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.gettimereq" label="Separation Time Request" placeholder="String" @input="inputGetTimeReq(tab.gettimereq)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.gettimeres" label="Separation Time Response" placeholder="String" @input="inputGetTimeRes(tab.gettimeres)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-select v-model="tab.getproto" clearable :items="selectProtocal" label="Transport Protocal" @input="inputGetProto(tab.getproto)" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                </v-card-text>
                                            </v-card>
                                            <v-card outlined class="mx-auto">
                                                <div class="subtitle-2" style="height:20px">
                                                    <v-hover v-slot="{ hover }">
                                                        <v-btn text @click="showSet" x-small color="indigo">
                                                            <v-icon>{{ isSetOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                        </v-btn>
                                                    </v-hover>
                                                    Set
                                                </div>
                                                <v-card-text v-if="isSetOpenClose">
                                                    <v-text-field v-model="tab.setname" :rules="rules.name" label="Name" placeholder="String" @input="inputSetName(tab.setname)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.setid" label="Method ID" placeholder="Int" @input="inputSetID(tab.setid)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.setmaxreq" label="Maximum Segment Length Request" placeholder="Int" @input="inputSetMaxReq(tab.setmaxreq)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.setmaxres" label="Maximum Segment Length Response" placeholder="Int" @input="inputSetMaxRes(tab.setmaxres)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.settimereq" label="Separation Time Request" placeholder="String" @input="inputSetTimeReq(tab.settimereq)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.settimeres" label="Separation Time Response" placeholder="String" @input="inputSetTimeRes(tab.settimeres)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-select v-model="tab.setproto" clearable :items="selectProtocal" label="Transport Protocal" @input="inputSetProto(tab.setproto)" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                </v-card-text>
                                            </v-card>
                                            <v-card outlined class="mx-auto">
                                                <div class="subtitle-2" style="height:20px">
                                                    <v-hover v-slot="{ hover }">
                                                        <v-btn text @click="showNotifier" x-small color="indigo">
                                                            <v-icon>{{ isNotifierOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                        </v-btn>
                                                    </v-hover>
                                                    Notifier
                                                </div>
                                                <v-card-text v-if="isNotifierOpenClose">
                                                    <v-text-field v-model="tab.notname" :rules="rules.name" label="Name" placeholder="String" @input="inputNotName(tab.notname)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.notid" label="Event ID" placeholder="Int" @input="inputNotID(tab.notid)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.notmax" label="Maximum Segment Length" placeholder="Int" @input="inputNotMax(tab.notmax)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.nottime" label="Separation Time" placeholder="String" @input="inputNotTime(tab.nottime)" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-select v-model="tab.notserial" clearable :items="selectSerializer" label="Serializer" @input="inputNotSerial(tab.notserial)" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                    <v-select v-model="tab.notproto" clearable :items="selectProtocal" label="Transport Protocal" @input="inputNotProto(tab.notproto)" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                </v-card-text>
                                            </v-card>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-text v-show="!iselementOpenClose">
                    <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                readonly outlined dense></v-text-field>
                </v-card-text>
            </v-card>
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
        }
    },
    watch: {
        activeUUID(val) {
            this.setToolbarColor(val)
        },
        detailViewUUID(val) {
            this.setToolbarColorDetailView(val)
        }
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
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            selService: this.$store.getters.getServiceInterface,
            isEventGOpenClose: true,
            isEventDOpenClose: true,
            isMethodDOpenClose: true,
            isFieldDOpenClose: true,

            eventGTab: null,
            EventGItem: [],
            isEventOpenClose: true,
            isdeleteEvent: false,
            selectDelectEvent: [],
            deleteEventLine: [],
            headerEvent: [
                { text: 'Event Ref', sortable: false, value: 'event' },
            ],
            editEvent: { event: null},
            isEditingEvent: true,
            selEvent: this.$store.getters.getEventDeployment,

            isdeleteEventD: false,
            selVariableData: this.$store.getters.getVariableDataPrototype,
            EventDItem: [],
            selectDelectEventD: [],
            headerEventD: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Event Ref', sortable: false, value: 'event' },
                { text: 'Event ID', sortable: false, value: 'id' },
                { text: 'Maximum Segment Length', sortable: false, width: '180px', value: 'maxlength' },
                { text: 'Separation Time', sortable: false, width: '130px', value: 'time' },
                { text: 'Serializer', sortable: false, value: 'serializer' },
                { text: 'Transport Protocal', sortable: false, width: '140px', value: 'protocal' },
            ],
            editEventD: { name:'', event: null, id:'', maxlength:'', time:'', serializer:null, protocal:null },
            defaultEventD: { name:'', event: null, id:'', maxlength:'', time:'', serializer:null, protocal:null },
            deleteEventDLine : [],
            isEditingVariableData: true,
            selectSerializer: ['SOMEIP',],
            selectProtocal: ['TCP','UDP',],

            isdeleteMethodD: false,
            selClientServer: this.$store.getters.getClientServer,
            MethodDItem: [],
            selectDelectMethodD: [],
            headerMethodD: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Method Ref', sortable: false, value: 'method' },
                { text: 'Method ID', sortable: false, value: 'id' },
                { text: 'Maximum Segment Length Request', sortable: false, width: '230px', value: 'maxrequest' },
                { text: 'Maximum Segment Length Response', sortable: false, width: '240px', value: 'maxresponse' },
                { text: 'Separation Time Request', sortable: false, width: '180px', value: 'timerequest' },
                { text: 'Separation Time Response', sortable: false, width: '180px', value: 'timeresponse' },
                { text: 'Transport Protocal', sortable: false, width: '140px', value: 'protocal' },
            ],
            editMethodD: { name:'', method: null, id:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null },
            defaultMethodD: {name:'', method: null, id:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null },
            deleteMethodDLine: [],
            isEditingClientServer: true,

            fieldTab: null,
            FieldDItem: [],
            selField: this.$store.getters.getField,
            isGetOpenClose: true,
            isSetOpenClose: true,
            isNotifierOpenClose: true,
        }
    },
    mounted () {
        this.$nextTick(() => {
            if(this.element.eventG != undefined) {
                this.EventGItem = this.element.eventG.slice()
            }
            if(this.element.eventD != undefined) {
                this.EventDItem = this.element.eventD.slice()
            }
            if(this.element.methodD != undefined) {
                this.MethodDItem = this.element.methodD.slice()
            }
            if(this.element.fieldD != undefined) {
                this.FieldDItem = this.element.fieldD.slice()
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
        showSomeIPService () {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.FieldDItem.length > 0) {
                        if (this.isFieldDOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.FieldDItem[this.fieldTab].name)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
                        }
                    }
                    if(this.EventGItem.length > 0) {
                        if (this.isEventGOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.EventGItem[this.eventGTab].name)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showEventG() {
            this.isEventGOpenClose = this.isEventGOpenClose ? false : true
            if(this.EventGItem.length > 0) {
                this.$nextTick(() => {
                    if(this.isEventGOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.EventGItem[this.eventGTab].name)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showEvent() {
            this.isEventOpenClose = this.isEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showEventD() {
            this.isEventDOpenClose = this.isEventDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showMethodD() {
            this.isMethodDOpenClose = this.isMethodDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showFieldD() {
            this.isFieldDOpenClose = this.isFieldDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            if(this.FieldDItem.length > 0) {
                this.$nextTick(() => {
                    if(this.isFieldDOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.FieldDItem[this.fieldTab].name)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        showGet() {
            this.isGetOpenClose = this.isGetOpenClose ? false : true
        },
        showSet() {
            this.isSetOpenClose = this.isSetOpenClose ? false : true
        },
        showNotifier() {
            this.isNotifierOpenClose = this.isNotifierOpenClose ? false : true
        },

        inputSomeIPServiceName() {
            this.$store.commit('editSomeIPService', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputEventG() {
            this.$store.commit('editSomeIPService', {compo:"Event Group", uuid:this.element.uuid, eventG:this.EventGItem} )
        },
        inputEventGName(name) {
            this.$store.commit('editSomeIPService', {compo:"EventG name", uuid:this.element.uuid, name: name, eventGtab: this.eventGTab} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'EventG', listname: name} )
        },
        inputEventGSize(size) {
            this.$store.commit('editSomeIPService', {compo:"EventG size", uuid:this.element.uuid, size: size, eventGtab: this.eventGTab} )
        },
        inputEventD() {
            this.$store.commit('editSomeIPService', {compo:"Event Deployment", uuid:this.element.uuid, eventD:this.EventDItem} )
        },
        inputMethodD() {
            this.$store.commit('editSomeIPService', {compo:"Method Deployment", uuid:this.element.uuid, methodD:this.MethodDItem} )
        },
        inputFieldD() {
            this.$store.commit('editSomeIPService', {compo:"Field Deployment", uuid:this.element.uuid, fieldD:this.FieldDItem} )
        },
        inputFieldDName(name) {
            this.$store.commit('editSomeIPService', {compo:"Field name", uuid:this.element.uuid, name: name, fieldtab: this.fieldTab} )
        },
        inputGetName(str) {
            this.$store.commit('editSomeIPService', {compo:"get name", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputGetID(str) {
            this.$store.commit('editSomeIPService', {compo:"get id", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputGetMaxReq(str) {
            this.$store.commit('editSomeIPService', {compo:"get MaxReq", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputGetMaxRes(str) {
            this.$store.commit('editSomeIPService', {compo:"get MaxRes", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputGetTimeReq(str) {
            this.$store.commit('editSomeIPService', {compo:"get TimeReq", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputGetTimeRes(str) {
            this.$store.commit('editSomeIPService', {compo:"get TimeRes", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputGetProto(str) {
            this.$store.commit('editSomeIPService', {compo:"get Proto", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetName(str) {
            this.$store.commit('editSomeIPService', {compo:"set Name", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetID(str) {
            this.$store.commit('editSomeIPService', {compo:"set id", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetMaxReq(str) {
            this.$store.commit('editSomeIPService', {compo:"set MaxReq", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetMaxRes(str) {
            this.$store.commit('editSomeIPService', {compo:"set MaxRes", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetTimeReq(str) {
            this.$store.commit('editSomeIPService', {compo:"set TimeReq", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetTimeRes(str) {
            this.$store.commit('editSomeIPService', {compo:"set TimeRes", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputSetProto(str) {
            this.$store.commit('editSomeIPService', {compo:"set Proto", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputNotName(str) {
            this.$store.commit('editSomeIPService', {compo:"notifier name", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputNotID(str) {
            this.$store.commit('editSomeIPService', {compo:"notifier id", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputNotMax(str) {
            this.$store.commit('editSomeIPService', {compo:"notifier max", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputNotTime(str) {
            this.$store.commit('editSomeIPService', {compo:"notifier time", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputNotSerial(str) {
            this.$store.commit('editSomeIPService', {compo:"notifier serial", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },
        inputNotProto(str) {
            this.$store.commit('editSomeIPService', {compo:"notifier proto", uuid:this.element.uuid, str: str, fieldtab: this.fieldTab} )
        },

        addEventG() {
            const editItem = {name: '', size: '', event: []}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Event Group_' + n++;
                res = this.EventGItem.some(ele => ele.name === addObj.name)
            }
            this.EventGItem.push(addObj)
            this.eventGTab = this.EventGItem.length-1
            this.inputEventG()
            EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
        },
        clickEventGtab() {
            this.isdeleteEvent = false
            this.selectDelectEvent = []
        },
        changeEventGTab() {
            if(this.EventGItem.length > 0) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.EventGItem[this.eventGTab].name)}, 300);
            }
        },
        deleteEventG(idx) {
            this.$store.commit('deleteRefTable', {deleteName:'eventG', deleteTab: true, tabName: this.EventGItem[idx].name, path: this.element.path, name: this.element.name})
            this.selectDelectEvent = this.EventGItem[idx].event.slice()
            this.isdeleteEvent = true
            this.deleteEvent()
            this.EventGItem.splice(idx, 1)
            this.inputEventG()
        },
        isCheckEvent() {
            if (this.isdeleteEvent == true) {
                this.isdeleteEvent = false
                this.selectDelectEvent = []
            } else {
                this.isdeleteEvent = true
            }
        },
        deleteEvent() {
            console.log(this.selectDelectEvent)
            if (this.isdeleteEvent == true) {
                for(let i=0; i<this.EventGItem[this.eventGTab].event.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/event-'+i+'-'+this.eventGTab)
                    if(endLine != undefined) {
                        this.deleteEventLine.push({name: this.EventGItem[this.eventGTab].event[i].event, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/event-'+i+'-'+this.eventGTab)
                    }
                }

                this.EventGItem[this.eventGTab].event = this.EventGItem[this.eventGTab].event.filter(item => {
                        return this.selectDelectEvent.indexOf(item) < 0 })

                for(let n=0; n<this.EventGItem[this.eventGTab].event.length; n++) {
                    for(let idx=0; idx<this.deleteEventLine.length; idx++) {
                        if (this.EventGItem[this.eventGTab].event[n].event == this.deleteEventLine[idx].name) {
                            this.newLine(this.element.uuid+'/event-'+n+'-'+this.eventGTab, this.element.uuid+'/event'+this.EventGItem[this.eventGTab].name, this.deleteEventLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteEvent = false
                this.selectDelectEvent = []
                this.deleteEventLine = []
                this.inputEventG()
            } 
        },
        openEvent(idx) { 
            this.selEvent = this.$store.getters.getEventDeployment

            if ( this.EventGItem[this.eventGTab].event[idx].event != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/event-'+idx+'-'+this.eventGTab)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfaceDeploymentPath(this.EventGItem[this.eventGTab].event[idx].event, 1)
                }
                this.editEvent.event = { name: this.EventGItem[this.eventGTab].event[idx].event, uuid: endLine}
            }
        },
        editEventItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/event-'+idx+'-'+this.eventGTab)
            if (endLine != undefined && this.editEvent.event == null) {
                this.deleteLine(this.element.uuid+'/event-'+idx+'-'+this.eventGTab)
                this.EventGItem[this.eventGTab].event[idx].event = null
            } else if (endLine != undefined && endLine != this.editEvent.event.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/event-'+idx+'-'+this.eventGTab)
                this.newLine(this.element.uuid+'/event-'+idx+'-'+this.eventGTab, this.element.uuid+'/event'+this.EventGItem[this.eventGTab].name, this.editEvent.event.uuid)
                this.EventGItem[this.eventGTab].event[idx].event = this.editEvent.event.name
            } else if (endLine == undefined && this.editEvent.event != null) {
                this.newLine(this.element.uuid+'/event-'+idx+'-'+this.eventGTab, this.element.uuid+'/event'+this.EventGItem[this.eventGTab].name, this.editEvent.event.uuid)
                this.EventGItem[this.eventGTab].event[idx].event = this.editEvent.event.name
            }

            this.cancelEvent()
            this.inputEventG()
        },
        cancelEvent() {
            this.editEvent = {event: null}
            this.setactiveUUID()
        },
        addEvent() {
            if( this.editEvent.event != null) {
                var datacount
                if(this.EventGItem[this.eventGTab].event == undefined) {
                    datacount = 0
                }else {
                    datacount = this.EventGItem[this.eventGTab].event.length
                }
                this.newLine(this.element.uuid+'/event-'+datacount+'-'+this.eventGTab, this.element.uuid+'/eventtab'+this.EventGItem[this.eventGTab].name, this.editEvent.event.uuid)
                this.editEvent.event = this.editEvent.event.name
            }

            const addObj = Object.assign({}, this.editEvent)
            this.EventGItem[this.eventGTab].event.push(addObj);
            this.cancelEvent()
            this.inputEventG()
        },
        setEventSelect() {
            if (this.isEditingEvent == true) {
                if (this.editEvent.event != null && this.editEvent.event.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEvent.event.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                }
                this.setEventList()
                this.isEditingEvent = false
            } else {
                this.isEditingEvent = true
            }
        },
        setEventList() {
            this.selEvent = this.$store.getters.getEventDeployment
            this.setactiveUUID()
        },
        clearEvent() {
            this.isEditingEvent = true
            this.editEvent.event = null
        },


        clearService() {
            this.element.service = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/service')
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/service')
            }
        },
        setServiceSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/service')
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfacePath(this.element.service, 0)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
            }
        },
        setServiceList() {
            this.selService = this.$store.getters.getServiceInterface
            this.setactiveUUID()
        },
        setService(item) {
            if( this.element.service != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/service')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/service')
                }
                //새로 추가해준다
                this.newLine(this.element.uuid+'/service', this.element.uuid+'/service', item.uuid)
                this.element.service = item.name
            }
            this.setactiveUUID()
        },
        newService() {
            this.$store.commit('addElementService', {
                name: this.$store.getters.getNameServiceInterface, input: false, path: '',
                top: this.element.top+100, left: this.element.left+ 300, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                versionMaj:'', versionMin:'', namespace:'', events:null, fields:null, methods:null, isservice: '',
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInterfaces_str)
            EventBus.$emit('add-element', constant.ServiceInterface_str)
            this.$store.commit('editSomeIPService', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckEventD() {
            if (this.isdeleteEventD == true) {
                this.isdeleteEventD = false
                this.selectDelectEventD = []
            } else {
                this.isdeleteEventD = true
            }
        },
        deleteEventD() {
            if (this.isdeleteEventD == true) {
                for(let i=0; i<this.EventDItem.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+i)
                    if(endLine != undefined) {
                        this.deleteEventDLine.push({name:this.EventDItem[i].name, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/serviceEventD-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'eventD', deletItemList: this.selectDelectEventD, path: this.element.path, name: this.element.name})
                this.EventDItem = this.EventDItem.filter(item => {
                        return this.selectDelectEventD.indexOf(item) < 0 })

                for(let n=0; n<this.EventDItem.length; n++) {
                    for(let idx=0; idx<this.deleteEventDLine.length; idx++) {
                        if (this.EventDItem[n].name == this.deleteEventDLine[idx].name) {
                            this.newLine(this.element.uuid+'/serviceEventD-'+n, this.element.uuid+'/serviceEventD', this.deleteEventDLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteEventD = false
                this.selectDelectEventD = []
                this.deleteEventDLine = []
                this.inputEventD()
            } 
        },
        openEventD(idx) {
            this.selVariableData = this.$store.getters.getVariableDataPrototype
            this.editEventD.name = this.EventDItem[idx].name
            if ( this.EventDItem[idx].event != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.EventDItem[idx].event, 1)
                }
                this.editEventD.event = { name: this.EventDItem[idx].event, uuid: endLine }
            }
            this.editEventD.id = this.EventDItem[idx].id
            this.editEventD.maxlength = this.EventDItem[idx].maxlength
            this.editEventD.time = this.EventDItem[idx].time
            this.editEventD.serializer = this.EventDItem[idx].serializer
            this.editEventD.protocal = this.EventDItem[idx].protocal
        },
        editEventDItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+idx)
            if (endLine != undefined && this.editEventD.event == null) {
                this.deleteLine(this.element.uuid+'/serviceEventD-'+idx)
                this.EventDItem[idx].event = null
            } else if (endLine != undefined && endLine != this.editEventD.event.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/serviceEventD-'+idx)
                this.newLine(this.element.uuid+'/serviceEventD-'+idx, this.element.uuid+'/serviceEventD', this.editEventD.event.uuid)
                this.EventDItem[idx].event = this.editEventD.event.name
            } else if (endLine == undefined && this.editEventD.event != null) {
                this.newLine(this.element.uuid+'/serviceEventD-'+idx, this.element.uuid+'/serviceEventD', this.editEventD.event.uuid)
                this.EventDItem[idx].event = this.editEventD.event.name
            }

            if (this.EventDItem[idx].name != this.editEventD.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'EventD', listname: this.editEventD.name} )
            }

            this.EventDItem[idx].name = this.editEventD.name
            this.EventDItem[idx].id = this.editEventD.id
            this.EventDItem[idx].maxlength = this.editEventD.maxlength
            this.EventDItem[idx].time = this.editEventD.time
            this.EventDItem[idx].serializer = this.editEventD.serializer
            this.EventDItem[idx].protocal = this.editEventD.protocal
            
            this.cancelEventD()
            this.inputEventD()
        },
        cancelEventD() {
            this.editEventD = Object.assign({}, this.defaultEventD)
            this.setactiveUUID()
        },
        addEventD() {
            if( this.editEventD.event != null) {
                var datacount
                if(this.EventDItem == undefined) {
                    datacount = 0
                }else {
                    datacount = this.EventDItem.length
                }
                this.newLine(this.element.uuid+'/serviceEventD-'+datacount, this.element.uuid+'/serviceEventD', this.editEventD.event.uuid)
                this.editEventD.event = this.editEventD.event.name
            }

            const addObj = Object.assign({}, this.editEventD)
            this.EventDItem.push(addObj);
            this.cancelEventD()
            this.inputEventD()
        },
        setVariableDataSelect() {
            if (this.isEditingVariableData == true) {
                if (this.editEventD.event != null && this.editEventD.event.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEventD.event.uuid, element: constant.ServiceInterface_str} )
                }
                this.setVariableDataList()
                this.isEditingVariableData = false
            } else {
                this.isEditingVariableData = true
            }
        },
        setVariableDataList() {
            this.selVariableData = this.$store.getters.getVariableDataPrototype
            this.setactiveUUID()
        },
        clearVariableData() {
            this.isEditingVariableData = true
            this.editEventD.event = null
        },

        isCheckMethodD() {
            if (this.isdeleteMethodD == true) {
                this.isdeleteMethodD = false
                this.selectDelectMethodD = []
            } else {
                this.isdeleteMethodD = true
            }
        },
        deleteMethodD() {
            if (this.isdeleteMethodD == true) {
                for(let i=0; i<this.MethodDItem.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+i)
                    if(endLine != undefined) {
                        this.deleteMethodDLine.push({name:this.MethodDItem[i].name, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/serviceMethodD-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'methodD', deletItemList: this.MethodDItem, path: this.element.path, name: this.element.name})
                this.MethodDItem = this.MethodDItem.filter(item => {
                        return this.selectDelectMethodD.indexOf(item) < 0 })

                for(let n=0; n<this.MethodDItem.length; n++) {
                    for(let idx=0; idx<this.deleteMethodDLine.length; idx++) {
                        if (this.MethodDItem[n].name == this.deleteMethodDLine[idx].name) {
                            this.newLine(this.element.uuid+'/serviceMethodD-'+n, this.element.uuid+'/serviceMethodD', this.deleteMethodDLine[idx].endLine)
                        }
                    }
                }

                this.isdeleteMethodD = false
                this.selectDelectMethodD = []
                this.deleteMethodDLine = []
                this.inputMethodD()
            } 
        },
        openMethodD(idx) {
            this.selClientServer = this.$store.getters.getClientServer,

            this.editMethodD.name = this.MethodDItem[idx].name
            if ( this.MethodDItem[idx].method != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.MethodDItem[idx].method, 3)
                }
                this.editMethodD.method = { name: this.MethodDItem[idx].method, uuid: endLine}
            }
            this.editMethodD.id = this.MethodDItem[idx].id
            this.editMethodD.maxrequest = this.MethodDItem[idx].maxrequest
            this.editMethodD.maxresponse = this.MethodDItem[idx].maxresponse
            this.editMethodD.timerequest = this.MethodDItem[idx].timerequest
            this.editMethodD.timeresponse = this.MethodDItem[idx].timeresponse
            this.editMethodD.protocal = this.MethodDItem[idx].protocal
        },
        editMethodDItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+idx)
            if (endLine != undefined && this.editMethodD.method == null) {
                this.deleteLine(this.element.uuid+'/serviceMethodD-'+idx)
                this.MethodDItem[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodD.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/serviceMethodD-'+idx)
                this.newLine(this.element.uuid+'/serviceMethodD-'+idx, this.element.uuid+'/serviceMethodD', this.editMethodD.method.uuid)
                this.MethodDItem[idx].method = this.editMethodD.method.name
            } else if (endLine == undefined && this.editMethodD.method != null) {
                this.newLine(this.element.uuid+'/serviceMethodD-'+idx, this.element.uuid+'/serviceMethodD', this.editMethodD.method.uuid)
                this.MethodDItem[idx].method = this.editMethodD.method.name
            }

            if (this.MethodDItem[idx].name != this.editMethodD.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'MethodD', listname: this.editMethodD.name} )
            }

            this.MethodDItem[idx].name = this.editMethodD.name
            this.MethodDItem[idx].id = this.editMethodD.id
            this.MethodDItem[idx].maxrequest = this.editMethodD.maxrequest
            this.MethodDItem[idx].maxresponse = this.editMethodD.maxresponse
            this.MethodDItem[idx].timerequest = this.editMethodD.timerequest
            this.MethodDItem[idx].timeresponse = this.editMethodD.timeresponse
            this.MethodDItem[idx].protocal = this.editMethodD.protocal
            
            this.cancelMethodD()
            this.inputMethodD()
        },
        cancelMethodD() {
            this.editMethodD = Object.assign({}, this.defaultMethodD)
            this.setactiveUUID()
        },
        addMethodD() {
            if( this.editMethodD.method != null) {
                var datacount
                if(this.MethodDItem == undefined) {
                    datacount = 0
                }else {
                    datacount = this.MethodDItem.length
                }
                this.newLine(this.element.uuid+'/serviceMethodD-'+datacount, this.element.uuid+'/serviceMethodD', this.editMethodD.method.uuid)
                this.editMethodD.method = this.editMethodD.method.name
            }

            const addObj = Object.assign({}, this.editMethodD)
            this.MethodDItem.push(addObj);
            this.cancelMethodD()
            this.inputMethodD()
        },
        setClientServerSelect() {
            if (this.isEditingClientServer == true) {
                if (this.editMethodD.method != null && this.editMethodD.method.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editMethodD.method.uuid, element: constant.ServiceInterface_str} )
                }
                this.setClientServerList()
                this.isEditingClientServer = false
            } else {
                this.isEditingClientServer = true
            }
        },
        setClientServerList() {
            this.selClientServer = this.$store.getters.getClientServer
            this.setactiveUUID()
        },
        clearClientServer() {
            this.isEditingClientServer = true
            this.editMethodD.method = null
        },

        addField() {
            const editItem = {name: '', field:null,
                              getname: '',getid: '',getmaxreq: '',getmaxres: '',gettimereq: '',gettimeres: '',getproto: null,
                              setname: '',setid: '',setmaxreq: '',setmaxres: '',settimereq: '',settimeres: '',setproto: null,
                              notname: '',notid: '',notmax: '',nottime: '',notserial: null,notproto: null,}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Field Deployment_' + n++;
                res = this.FieldDItem.some(ele => ele.name === addObj.name)
            }
            this.FieldDItem.push(addObj)
            this.fieldTab = this.FieldDItem.length-1
            this.inputFieldD()
            EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
        },
        clickFieldtab() {
            //console.log(idx)
            this.isGetOpenClose = true
            this.isSetOpenClose = true
            this.isNotifierOpenClose = true
        },
        changeFieldTab() {
            //console.log('change'+' / ')
            //이렇게 해줘야지 tab에 있는것을 다 그린다음에 선을 다시 그려줄수있다.
            if(this.FieldDItem.length > 0){
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.FieldDItem[this.fieldTab].name)}, 300);
            }
        },
        deleteField(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+idx)
            if(endLine != undefined) {
                this.deleteLine(this.element.uuid+'/field-'+idx)
            }
            this.FieldDItem.splice(idx, 1)
            this.inputFieldD()
        },
        setFieldSelect() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.fieldTab)
            if (endLine == undefined) {
                endLine = this.$store.getters.getServiceInterfacePath(this.FieldDItem[this.fieldTab].field, 2)
            }
            if (endLine != null) {
                this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
            }
        },
        setServiceRef(item) {
            //console.log(item)
            if( this.FieldDItem[this.fieldTab].field != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.fieldTab)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/field-'+this.fieldTab)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.newLine(this.element.uuid+'/field-'+this.fieldTab, this.element.uuid+'/fieldtab'+this.FieldDItem[this.fieldTab].name, item.uuid)
                }
                this.FieldDItem[this.fieldTab].field = item.name
                this.inputFieldD()
            }
            this.setactiveUUID()
        },
        setFieldList() {
            this.selField = this.$store.getters.getField
            this.setactiveUUID()
        },
        clearField() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.fieldTab)
            if (endLine != undefined) {
                this.FieldDItem[this.fieldTab].field = null
                this.deleteLine(this.element.uuid+'/field-'+this.fieldTab)
            }
            this.inputFieldD()
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSomeIPService', {compo:"z", uuid:this.element.uuid, zindex:10} )
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