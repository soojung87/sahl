<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>SomeIP Service Interface Deployment</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputSomeIPServiceName' @click="clickSomeIPServiceName()" outlined dense></v-text-field>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="element.service" readonly @click="setServiceSelect()" :style="refServiceI ? 'height: 43px;border:solid red 2px' : ''" 
                                                 clearable @click:clear='clearService()' label="Service Interface Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <v-text-field v-model="element.id" label="Service Interface ID" @click="clickOtherFields()" placeholder="Int" style="height: 45px;margin:10px 0 0 0;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-row>
                                <v-col col="6">
                                <v-text-field v-model="element.majversion" label="Major Version" @click="clickOtherFields()" placeholder="number.number" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col col="6">
                                <v-text-field v-model="element.minversion" label="Minor Version" @click="clickOtherFields()" placeholder="number.number" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                        <v-tab v-for="(tab, idx) in element.eventG" :key="idx" @click="clickEventGtab()"> 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deleteEventG(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="eventGTab">
                                        <v-tab-item v-for="(tab, idx) in element.eventG" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputEventGName(tab.name)" @click="clickEventGName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-text-field v-model="tab.idG" label="Group Id" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-card outlined class="mx-auto">
                                                        <div class="subtitle-2" style="height:20px" :id="element.uuid+'/eventtab'+tab.id">
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
                                                            <v-data-table v-model="selectDelectEvent" :headers="headerEvent" :items="tab.event" :items-per-page='$setNumTableList'
                                                                    :show-select="isdeleteEvent" item-key="id" height="140px" dense hide-default-footer >
                                                                <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                    <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                                </template>
                                                                <template v-if="!isdeleteEvent" v-slot:body="{ items, headers }">
                                                                    <tbody>
                                                                        <tr v-for="(item,num) in items" :key="num">
                                                                            <td v-for="(header,key) in headers" :key="key">
                                                                                <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refEventG === item.id ? 'red' : null " @click="rowEventGClick(idx)">mdi-pencil</v-icon>
                                                                                <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openEvent(num)" @cancel="cancelEvent" @save="editEventItem(num)" large >
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
                                                                                <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelEvent" @save="addEvent()"> 
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
                                    <v-data-table v-model="selectDelectEventD" :headers="headerEventD" :items="element.eventD" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteEventD" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteEventD" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refEventD === item.id ? 'red' : null " @click="rowEventDClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openEventD(idx)" @cancel="cancelEventD" @save="editEventDItem(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editEventD.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editEventD.event' label='Event Reference' :items='selVariableData' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingVariableData" clearable @click="setVariableDataSelect()" 
                                                                            @click:clear='clearVariableData' @blur="isEditingVariableData=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                                <v-text-field v-model="editEventD.idE" label="Event ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelEventD" @save="addEventD()"> 
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
                                                                <v-text-field v-model="editEventD.idE" label="Event ID" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                    <v-data-table v-model="selectDelectMethodD" :headers="headerMethodD" :items="element.methodD" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteMethodD" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteMethodD" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refMethod === item.id ? 'red' : null " @click="rowMethodClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openMethodD(idx)" @cancel="cancelMethodD" @save="editMethodDItem(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editMethodD.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editMethodD.method' label='Method Reference' :items='selClientServer' item-text='name' item-value="name" class="lable-placeholer-color"
                                                                            return-object :readonly="!isEditingClientServer" clearable @click="setClientServerSelect()" 
                                                                            @click:clear='clearClientServer' @blur="isEditingClientServer=true" outlined dense style="height: 45px;">
                                                                </v-autocomplete>
                                                                <v-text-field v-model="editMethodD.idM" label="Method ID" placeholder="Int" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelMethodD" @save="addMethodD()"> 
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
                                                                <v-text-field v-model="editMethodD.idM" label="Method ID" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                        <v-tab v-for="(tab, idx) in element.fieldD" :key="idx" @click="clickFieldtab()" > 
                                            {{tab.name}}
                                            <v-btn text x-small @click="deleteField(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                    </v-tabs>
                                    <v-tabs-items v-model="fieldTab">
                                        <v-tab-item v-for="(tab, idx) in element.fieldD" :key="idx">
                                            <v-card flat>
                                                <v-card-text>
                                                    <v-text-field v-model="tab.name" @input="inputFieldName(tab.name)" 
                                                                 @click="clickFieldName(tab.name)" :rules="rules.name" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                    <v-row style="height: 70px">
                                                        <v-col cols="10">
                                                            <v-text-field v-model="tab.field" readonly @click="setFieldSelect()" :style="refField ? 'height: 43px;border:solid red 2px' : ''" 
                                                                         clearable @click:clear='clearField()' label="Field Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-menu>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="deep-purple accent-4" :id="element.uuid+'/fieldtab'+tab.id" icon v-bind="attrs" v-on="on" @click="setFieldList()">
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
                                                            <v-text-field v-model="tab.getname" @input="inputFieldGetName(tab.getname)" @click="clickFieldGetName(tab.getname)" label="Name" placeholder="String"  style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.getid" label="Method ID" placeholder="Int" @click="clickOtherFields()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.getmaxreq" label="Maximum Segment Length Request" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.getmaxres" label="Maximum Segment Length Response" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.gettimereq" label="Separation Time Request" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.gettimeres" label="Separation Time Response" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-select v-model="tab.getproto" clearable :items="selectProtocal" label="Transport Protocal" @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" outlined dense style="height: 45px;"></v-select>
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
                                                            <v-text-field v-model="tab.setname" @input="inputFieldSetName(tab.setname)" @click="clickFieldSetName(tab.setname)" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.setid" label="Method ID" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.setmaxreq" label="Maximum Segment Length Request" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.setmaxres" label="Maximum Segment Length Response" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.settimereq" label="Separation Time Request" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.settimeres" label="Separation Time Response" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-select v-model="tab.setproto" clearable :items="selectProtocal" label="Transport Protocal" @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" outlined dense style="height: 45px;"></v-select>
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
                                                            <v-text-field v-model="tab.notname" @input="inputFieldNotName(tab.notname)" @click="clickFieldNotName(tab.notname)" label="Name" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.notid" label="Event ID" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.notmax" label="Maximum Segment Length" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-text-field v-model="tab.nottime" label="Separation Time" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            <v-select v-model="tab.notserial" clearable :items="selectSerializer" label="Serializer" @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" outlined dense style="height: 45px;"></v-select>
                                                            <v-select v-model="tab.notproto" clearable :items="selectProtocal" label="Transport Protocal" @click="[clickOtherFields(),setactiveUUID()]" @click:clear="clickOtherFields()" outlined dense style="height: 45px;"></v-select>
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
                            <v-text-field id="serviceDeployment" v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
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
                            <label style="padding:10px;">&#60;SERVICE-INTERFACE-REF&#62;</label>
                            <v-text-field v-model="editARXML.service" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SERVICE-INTERFACE-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;SERVICE-INTERFACE-ID&#62;</label>
                            <v-text-field v-model="editARXML.id" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SERVICE-INTERFACE-ID&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;SERVICE-INTERFACE-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;margin-left:10px">&#60;MAJOR-VERSION&#62;</label>
                            <v-text-field v-model="editARXML.majversion" placeholder="number.number" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MAJOR-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin-left:10px">&#60;MINOR-VERSION&#62;</label>
                            <v-text-field v-model="editARXML.minversion" placeholder="number.number" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MINOR-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;SERVICE-INTERFACE-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;EVENT-DEPLOYMENTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEventD()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 250px;">
                            <v-row v-for="(item, i) in editARXML.eventD" :key="i" style="height: 220px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextEventD(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SOMEIP-EVENT-DEPLOYMENT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-REF&#62;</label>
                                        <v-text-field v-model="item.event" placeholder="Path" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-ID&#62;</label>
                                        <v-text-field v-model="item.idE" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-ID&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MAXIMUM-SEGMENT-LENGTH&#62;</label>
                                        <v-text-field v-model="item.maxlength" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SEPARATION-TIME&#62;</label>
                                        <v-text-field v-model="item.time" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIMEE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SERIALIZER&#62;</label>
                                        <v-text-field v-model="item.serializer" placeholder="SOMEIP or SIGNAL-BASED" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SERIALIZER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;TRANSPORT-PROTOCOL&#62;</label>
                                        <v-text-field v-model="item.protocal" placeholder="UDP or TCP" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TRANSPORT-PROTOCOL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-EVENT-DEPLOYMENT&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;EVENT-DEPLOYMENTS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;FIELD-DEPLOYMENTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextField()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 700px;">
                            <v-row v-for="(item, i) in editARXML.fieldD" :key="i" style="height: 750px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextField(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SOMEIP-FIELD-DEPLOYMENT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;FIELD-REF&#62;</label>
                                        <v-text-field v-model="item.field" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;FIELD-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;GET&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.getname" placeholder="String" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;MAXIMUM-SEGMENT-LENGTH-REQUEST&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.getmaxreq" placeholder="Int" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH-REQUEST&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.getmaxres" placeholder="Int" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;METHOD-ID&#62;</label>
                                        <v-text-field v-model="item.getid" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;METHOD-ID&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SEPARATION-TIME-REQUEST&#62;</label>
                                        <v-text-field v-model="item.gettimereq" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME-REQUEST&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SEPARATION-TIME-RESPONSE&#62;</label>
                                        <v-text-field v-model="item.gettimeres" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME-RESPONSE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;TRANSPORT-PROTOCOL&#62;</label>
                                        <v-text-field v-model="item.getproto" placeholder="UDP or TCP" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TRANSPORT-PROTOCOL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;GET&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;NOTIFIER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.notname" placeholder="String" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;EVENT-ID&#62;</label>
                                        <v-text-field v-model="item.notid" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-ID&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;MAXIMUM-SEGMENT-LENGTH&#62;</label>
                                        <v-text-field v-model="item.notmax" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SEPARATION-TIME&#62;</label>
                                        <v-text-field v-model="item.nottime" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SERIALIZER&#62;</label>
                                        <v-text-field v-model="item.notserial" placeholder="SOMEIP or SIGNAL-BASED" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SERIALIZER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;TRANSPORT-PROTOCOL&#62;</label>
                                        <v-text-field v-model="item.notproto" placeholder="UDP or TCP" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TRANSPORT-PROTOCOL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;NOTIFIER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SET&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.getname" placeholder="String" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;MAXIMUM-SEGMENT-LENGTH-REQUEST&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.setmaxreq" placeholder="Int" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.setmaxres" placeholder="Int" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;METHOD-ID&#62;</label>
                                        <v-text-field v-model="item.setid" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;METHOD-ID&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SEPARATION-TIME-REQUEST&#62;</label>
                                        <v-text-field v-model="item.settimereq" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME-REQUEST&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;SEPARATION-TIME-RESPONSE&#62;</label>
                                        <v-text-field v-model="item.settimeres" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME-RESPONSE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;TRANSPORT-PROTOCOL&#62;</label>
                                        <v-text-field v-model="item.setproto" placeholder="UDP or TCP" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TRANSPORT-PROTOCOL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;SET&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-FIELD-DEPLOYMENT&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;FIELD-DEPLOYMENTS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;METHOD-DEPLOYMENTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextMethod()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.methodD" :key="i" style="height: 240px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextMethod(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SOMEIP-METHOD-DEPLOYMENT&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;METHOD-REF&#62;</label>
                                        <v-text-field v-model="item.method" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;METHOD-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MAXIMUM-SEGMENT-LENGTH-REQUEST&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.maxrequest" placeholder="Int" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH-REQUEST&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-col cols="5">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col><v-col cols="4">
                                        <v-text-field v-model="item.maxresponse" placeholder="Int" style="margin: -5px 0px 0px 75px" class="lable-placeholer-color" dense></v-text-field>
                                        </v-col><v-col cols="3">
                                        <label style="padding:10px;">&#60;&#47;MAXIMUM-SEGMENT-LENGTH-RESPONSE&#62;</label>
                                        </v-col>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;METHOD-ID&#62;</label>
                                        <v-text-field v-model="item.idM" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;METHOD-ID&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SEPARATION-TIME-REQUEST&#62;</label>
                                        <v-text-field v-model="item.timerequest" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME-REQUEST&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SEPARATION-TIME-RESPONSE&#62;</label>
                                        <v-text-field v-model="item.timeresponse" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SEPARATION-TIME-RESPONSE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;TRANSPORT-PROTOCOL&#62;</label>
                                        <v-text-field v-model="item.protocal" placeholder="UDP or TCP" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TRANSPORT-PROTOCOL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-METHOD-DEPLOYMENT&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;METHOD-DEPLOYMENTS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;EVENT-GROUPS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEventG()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 300px;">
                            <v-row v-for="(item, i) in editARXML.eventG" :key="i" style="height: 230px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextEventG(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;"> &#60;SOMEIP-EVENT-GROUP&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 10px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-GROUP-ID&#62;</label>
                                        <v-text-field v-model="item.idG" placeholder="Int" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;EVENT-GROUP-ID&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:90px;">&#60;EVENT-REFS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEventR(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 100px;">
                                        <v-row v-for="(eve, e) in item.event" :key="e" style="height: 25px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -90px 0px 90px" @click="deletTextEventR(e,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;EVENT-REF&#62;</label>
                                                    <v-text-field v-model="eve.event" style="width:400px" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;EVENT-REF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 90px;">&#60;&#47;EVENT-REFS&#62;</label>
                                    </v-row>                                    
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;SOMEIP-EVENT-GROUP&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;EVENT-GROUPS&#62;</label>
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
                        if(this.iselementOpenClose && this.location == 1) {
                            if(this.element.fieldD.length > 0) {
                                if (this.isFieldDOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.element.fieldD[this.fieldTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
                                }
                            }
                            if(this.element.eventG.length > 0) {
                                console.log('222')
                                if (this.isEventGOpenClose) {
                                    EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.element.eventG[this.eventGTab].id)
                                } else {
                                    EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
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
            editARXML: {name:'', service: null, majversion:'', minversion:'', id: '', eventG:[], eventD: [], methodD:[], fieldD:[]},
            editTextEventD: {name:'', event: null, idE:'', maxlength:'', time:'', serializer:null, protocal:null, id: ''},
            editTextMethod: {name:'', method: null, idM:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null, id: ''},
            editTextField: {name: '', field:null,
                              getname: '',getid: '',getmaxreq: '',getmaxres: '',gettimereq: '',gettimeres: '',getproto: null,
                              setname: '',setid: '',setmaxreq: '',setmaxres: '',settimereq: '',settimeres: '',setproto: null,
                              notname: '',notid: '',notmax: '',nottime: '',notserial: null,notproto: null, id: ''},
            editTextEventG: {name: '', idG: '', event: [], id: ''},
            editTextEventRef: {event: null, id: ''},
            selService: this.$store.getters.getServiceInterface,
            isEventGOpenClose: true,
            isEventDOpenClose: true,
            isMethodDOpenClose: true,
            isFieldDOpenClose: true,

            eventGTab: null,
            isEventOpenClose: true,
            isdeleteEvent: false,
            selectDelectEvent: [],
            headerEvent: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Event Ref', sortable: false, value: 'event' },
            ],
            editEvent: { event: null, id: ''},
            isEditingEvent: true,
            selEvent: this.$store.getters.getSomeIPEventDeployment,

            isdeleteEventD: false,
            selVariableData: this.$store.getters.getVariableDataPrototype,
            selectDelectEventD: [],
            headerEventD: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Event Ref', sortable: false, value: 'event' },
                { text: 'Event ID', sortable: false, value: 'idE' },
                { text: 'Maximum Segment Length', sortable: false, width: '180px', value: 'maxlength' },
                { text: 'Separation Time', sortable: false, width: '130px', value: 'time' },
                { text: 'Serializer', sortable: false, value: 'serializer' },
                { text: 'Transport Protocal', sortable: false, width: '140px', value: 'protocal' },
            ],
            editEventD: { name:'', event: null, idE:'', maxlength:'', time:'', serializer:null, protocal:null, id: ''},
            defaultEventD: { name:'', event: null, idE:'', maxlength:'', time:'', serializer:null, protocal:null, id: '' },
            isEditingVariableData: true,
            selectSerializer: ['SOMEIP', 'SIGNAL-BASED'],
            selectProtocal: ['UDP', 'TCP',],

            isdeleteMethodD: false,
            selClientServer: this.$store.getters.getClientServer,
            selectDelectMethodD: [],
            headerMethodD: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Method Ref', sortable: false, value: 'method' },
                { text: 'Method ID', sortable: false, value: 'idM' },
                { text: 'Maximum Segment Length Request', sortable: false, width: '230px', value: 'maxrequest' },
                { text: 'Maximum Segment Length Response', sortable: false, width: '240px', value: 'maxresponse' },
                { text: 'Separation Time Request', sortable: false, width: '180px', value: 'timerequest' },
                { text: 'Separation Time Response', sortable: false, width: '180px', value: 'timeresponse' },
                { text: 'Transport Protocal', sortable: false, width: '140px', value: 'protocal' },
            ],
            editMethodD: { name:'', method: null, idM:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null, id: '' },
            defaultMethodD: {name:'', method: null, idM:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null, id: '' },
            isEditingClientServer: true,

            fieldTab: null,
            selField: this.$store.getters.getField,
            isGetOpenClose: true,
            isSetOpenClose: true,
            isNotifierOpenClose: true,

            beforeField: '',
            beforeGet: '',
            beforeSet: '',
            beforeNoti: '',
            beforeEventG: '',
            beforeName: '',
            beforePath: '',

            refServiceI: false,
            refEventG: null,
            refEventD: null,
            refMethod: null,
            refField: false,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID, id, isDeleteItem, item,  idxRow) => {
            if (isDeleteItem) {
                if (this.refEventG == id && item == 'eventG' && this.element.eventG[this.eventGTab].id == tabID) {
                    this.refEventG = id + 1
                    this.rowEventGClick(idxRow)
                } else if (this.refEventD == id && item == 'eventD') {
                    this.refEventD = id + 1
                    this.rowEventDClick(idxRow)
                } else if (this.refMethod == id && item == 'method') {
                    this.refMethod = id + 1
                    this.rowMethodClick(idxRow)
                } else if (this.refField && this.element.fieldD[this.fieldTab].id == id && item == 'field') {
                    this.clickOtherFields()
                }
            } else {
                this.refServiceI = false
                this.refEventG = null
                this.refEventD = null
                this.refMethod = null
                this.refField = false

                if (refNum == 1) {
                    this.refServiceI = true
                } else if (refNum == 2) {
                    this.eventGTab = tabID
                    this.refEventG = idxID
                } else if (refNum == 3) {
                    this.refEventD = idxID
                } else if (refNum == 4) {
                    this.refMethod = idxID
                }  else if (refNum == 5) {
                    this.fieldTab = tabID
                    this.refField = true
                }
            }
        })
    },
    methods: {
        submitDialog(element) {
            this.beforePath = this.element.path
            this.element.path = element
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,  
                                                        changeName: 'Path', beforename: this.beforePath} )
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
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
            /*this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose && this.location == 1) {
                    if(this.element.fieldD.length > 0) {
                        if (this.isFieldDOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.element.fieldD[this.fieldTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
                        }
                    }
                    if(this.element.eventG.length > 0) {
                        if (this.isEventGOpenClose) {
                            EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.element.eventG[this.eventGTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
                        }
                    }
                }
            })*/
        },
        showEventG() {
            this.clickOtherFields()
            this.isEventGOpenClose = this.isEventGOpenClose ? false : true
            /*if(this.element.eventG.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isEventGOpenClose) {
                        EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.element.eventG[this.eventGTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        showEvent() {
            this.clickOtherFields()
            this.isEventOpenClose = this.isEventOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showEventD() {
            this.clickOtherFields()
            this.isEventDOpenClose = this.isEventDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showMethodD() {
            this.clickOtherFields()
            this.isMethodDOpenClose = this.isMethodDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showFieldD() {
            this.clickOtherFields()
            this.isFieldDOpenClose = this.isFieldDOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            /*if(this.element.fieldD.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isFieldDOpenClose ) {
                        EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.element.fieldD[this.fieldTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
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
        clickOtherFields() {
            if (this.refServiceI || this.refEventG != null || this.refEventD != null || this.refMethod != null || this.refField) {
                this.deleteOpenElement()
                this.refServiceI = false
                this.refField = false
                this.refEventG = null
                this.refMethod = null
                this.refEventD = null
            }
        },
        rowEventGClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refEventG != this.element.eventG[this.eventGTab].event[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.eventG[this.eventGTab].event[idx].event != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getSomeIPEventDeploymentPath(this.element.eventG[this.eventGTab].event[idx].event)
                    }
                    if (endLine != null && endLine != this.element.uuid) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        var isExist = true
                        if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                            this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, endLine, isExist)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, end:endLine, 
                                        iscircle:false, refNum:2, idxID: this.element.eventG[this.eventGTab].event[idx].id, tabID: this.eventGTab})
                    } else if (endLine == this.element.uuid) {
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid, end:null, iscircle:false, refNum:2, idxID: this.element.eventG[this.eventGTab].event[idx].id, tabID: this.eventGTab})
                    }
                }
                this.refEventG = this.element.eventG[this.eventGTab].event[idx].id
            }
        },
        rowEventDClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refEventD != this.element.eventD[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.eventD[idx].event != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.eventD[idx].event, 1)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/serviceEventD', endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/serviceEventD', end:endLine, iscircle:false, refNum:3, idxID: this.element.eventD[idx].id})
                    }
                }
                this.refEventD = this.element.eventD[idx].id
            }
        },
        rowMethodClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refMethod != this.element.methodD[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                if (this.element.methodD[idx].method != null) {
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id)
                    if (endLine == undefined) {
                        endLine = this.$store.getters.getServiceInterfacePath(this.element.methodD[idx].method, 3)
                    }
                    if (endLine != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', true, endLine)
                            EventBus.$emit('new-line', this.element.uuid+'/serviceMethodD', endLine)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/serviceMethodD', end:endLine, iscircle:false, refNum:4, idxID: this.element.methodD[idx].id})
                    }
                }
                this.refMethod = this.element.methodD[idx].id
            }
        },

        clickSomeIPServiceName() {
            this.clickOtherFields()
            this.beforeName = this.element.name
        },
        inputSomeIPServiceName() {
            this.$store.commit('editSomeIPService', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name, 
                                                        changeName: 'Name', pathLength:this.element.path.split('/').length, beforename: this.beforeName} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
            this.beforeName = this.element.name
        },
        clickEventGName(name) {
            this.clickOtherFields()
            this.beforeEventG = name
        },
        inputEventGName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'EventG', listname: name, beforename: this.beforeEventG} )
            this.beforeEventG = name
        },

        addEventG() {
            this.clickOtherFields()
            const editItem = {name: '', idG: '', event: [], id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Event Group_' + n++;
                res = this.element.eventG.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.eventG.push(addObj)
            this.eventGTab = this.element.eventG.length-1
            if(this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, null)
            }
        },
        clickEventGtab() {
            this.isdeleteEvent = false
            this.selectDelectEvent = []
        },
        changeEventGTab() {
            if (this.refEventG != null) {
                this.deleteOpenElement()
                this.refEventG = null
            }
            /*if(this.element.eventG.length > 0 && this.location == 1 && this.eventGTab != undefined && this.iselementOpenClose) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'event', this.element.uuid, this.eventGTab, this.element.eventG[this.eventGTab].id)}, 300);
            }*/
        },
        deleteEventG(idx) {
            this.clickOtherFields()
            this.$store.commit('deleteRefTable', {deleteName:'eventG', deleteTab: true, tabName: this.element.eventG[idx].name, path: this.element.path, name: this.element.name})
            this.element.eventG[idx].event.forEach(item => {
                var endLineCon = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+item.id+'-'+this.element.eventG[idx].id)
                if(endLineCon != undefined) {
                    this.deleteLine(this.element.uuid+'/eventtab-'+item.id+'-'+this.element.eventG[idx].id)
                }
            })

            this.element.eventG.splice(idx, 1)
        },
        isCheckEvent() {
            this.clickOtherFields()
            if (this.isdeleteEvent == true) {
                this.isdeleteEvent = false
                this.selectDelectEvent = []
            } else {
                this.isdeleteEvent = true
            }
        },
        deleteEvent() {
            console.log(this.selectDelectEvent)
            this.clickOtherFields()
            if (this.isdeleteEvent == true) {
                this.selectDelectEvent.forEach(item => {
                    for(let i=0; i<this.element.eventG[this.eventGTab].event.length; i++){
                        if (item.id == this.element.eventG[this.eventGTab].event[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[i].id+'-'+this.element.eventG[this.eventGTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[i].id+'-'+this.element.eventG[this.eventGTab].id)
                            }
                        }
                    }
                })

                this.element.eventG[this.eventGTab].event = this.element.eventG[this.eventGTab].event.filter(item => {
                        return this.selectDelectEvent.indexOf(item) < 0 })

                this.isdeleteEvent = false
                this.selectDelectEvent = []
            } 
        },
        openEvent(idx) { 
            this.selEvent = this.$store.getters.getSomeIPEventDeployment

            if (this.element.eventG[this.eventGTab].event[idx].event != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getSomeIPEventDeploymentPath(this.element.eventG[this.eventGTab].event[idx].event)
                }
                this.editEvent.event = { name: this.element.eventG[this.eventGTab].event[idx].event, uuid: endLine}
            }
        },
        editEventItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id)
            if (endLine != undefined && this.editEvent.event == null) {
                this.deleteLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id)
                this.element.eventG[this.eventGTab].event[idx].event = null
            } else if (endLine != undefined && endLine != this.editEvent.event.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id)
                this.newLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id, 
                                this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, this.editEvent.event.uuid, false)
                this.element.eventG[this.eventGTab].event[idx].event = this.editEvent.event.name
            } else if (endLine == undefined && this.editEvent.event != null && this.editEvent.event.uuid != null) {
                this.newLine(this.element.uuid+'/eventtab-'+this.element.eventG[this.eventGTab].event[idx].id+'-'+this.element.eventG[this.eventGTab].id,
                                this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, this.editEvent.event.uuid, false)
                this.element.eventG[this.eventGTab].event[idx].event = this.editEvent.event.name
            } else if (this.editEvent.event != null && endLine == this.editEvent.event.uuid && this.element.eventG[this.eventGTab].event[idx].event != this.editEvent.event.name) {
                this.element.eventG[this.eventGTab].event[idx].event = this.editEvent.event.name
            }

            if (this.refEventG == this.element.eventG[this.eventGTab].event[idx].id) {
                this.deleteOpenElement()
                if (this.editEvent.event != null && this.editEvent.event.uuid != null && this.editEvent.event.uuid != this.element.uuid) {
                    var isExist = true, endLineChange = this.editEvent.event.uuid
                    if (this.$store.getters.getDeleteOpenElement(endLineChange) == -1) {
                        this.$store.commit('editSomeIPService', {compo:"drag", uuid: endLineChange, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: endLineChange, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, endLineChange, isExist)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, end:endLineChange, 
                                    iscircle:isExist, refNum:2, idxID: this.refEventG, tabID: this.eventGTab})
                } else if (endLine == this.element.uuid) {
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid, end:null, iscircle:false, refNum:2, idxID: this.refEventG, tabID: this.eventGTab})
                }
            }

            this.cancelEvent()
        },
        cancelEvent() {
            this.editEvent = {event: null}
            this.setactiveUUID()
        },
        addEvent() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.eventG[this.eventGTab].event.some(item => item.id === n)
            }
            this.editEvent.id = n
            var endLine = null
            if( this.editEvent.event != null) {
                var drawLine = false, isExist = true
                endLine = this.editEvent.event.uuid
                if (this.element.uuid != this.editEvent.event.uuid) {
                    if (this.$store.getters.getDeleteOpenElement(this.editEvent.event.uuid) == -1) {
                        this.$store.commit('editSomeIPService', {compo:"drag", uuid: this.editEvent.event.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.SomeIPServiceInterfaceDeployment_str, uuid: this.editEvent.event.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    drawLine = true
                }
                this.editEvent.event = this.editEvent.event.name
                if (drawLine) {
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/eventtab-'+n+'-'+this.element.eventG[this.eventGTab].id, this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, 
                                endLine, drawLine, isExist)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, end: endLine, 
                                    iscircle:isExist, refNum:2, idxID: this.editEvent.id, tabID: this.eventGTab})
                } else if (endLine == this.element.uuid) {
                    this.newLine(this.element.uuid+'/eventtab-'+n+'-'+this.element.eventG[this.eventGTab].id, this.element.uuid+'/eventtab'+this.element.eventG[this.eventGTab].id, 
                                endLine, drawLine, isExist)
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid, end:null, iscircle:false, refNum:2, idxID: this.editEvent.id, tabID: this.eventGTab})
                }
            }

            const addObj = Object.assign({}, this.editEvent)
            this.element.eventG[this.eventGTab].event.push(addObj);
            this.refEventG = n
            this.cancelEvent()
        },
        setEventSelect() {
            if (this.isEditingEvent == true) {
                if (this.editEvent.event != null && this.editEvent.event.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEvent.event.uuid, element: constant.SomeIPServiceInterfaceDeployment_str} )
                    // document.getElementById(this.editEvent.event.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editEvent.event.uuid)
                }
                this.setEventList()
                this.isEditingEvent = false
            } else {
                this.isEditingEvent = true
            }
        },
        setEventList() {
            this.selEvent = this.$store.getters.getSomeIPEventDeployment
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
            this.clickOtherFields()
        },
        setServiceSelect() {
            this.clickOtherFields()
            if (this.element.service != null) {this.refServiceI = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/service')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.service, 0)
                }
                if (endLine != null) {
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLine)
                        EventBus.$emit('new-line', this.element.uuid+'/service', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/service', end:endLine, iscircle:false, refNum:1})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setServiceList() {
            this.selService = this.$store.getters.getServiceInterface
            this.setactiveUUID()
        },
        setService(item) {
            this.clickOtherFields()
            if( this.element.service != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/service')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/service')
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refServiceI = true
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/service', this.element.uuid+'/service', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/service', end:item.uuid, iscircle:false, refNum:1 })
                }
                this.element.service = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refServiceI = true
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/service', this.element.uuid+'/service', item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/service', end:item.uuid, iscircle:false, refNum:1})
                }
            }
            this.setactiveUUID()
        },
        newService() {
            this.$store.commit('addElementService', {
                name: this.$store.getters.getNameServiceInterface, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                versionMaj:'', versionMin:'', namespace:'', events:[], fields:[], methods:[], isservice: null,
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.ServiceInterface_str)
            this.$store.commit('editSomeIPService', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckEventD() {
            this.clickOtherFields()
            if (this.isdeleteEventD == true) {
                this.isdeleteEventD = false
                this.selectDelectEventD = []
            } else {
                this.isdeleteEventD = true
            }
        },
        deleteEventD() {
            this.clickOtherFields()
            if (this.isdeleteEventD == true) {
                this.selectDelectEventD.forEach(item => {
                    for(let i=0; i<this.element.eventD.length; i++){
                        if (item.id == this.element.eventD[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[i].id)
                            }
                        }
                    }
                })

                this.$store.commit('deleteRefTable', {deleteName:'eventD', deletItemList: this.selectDelectEventD, path: this.element.path, name: this.element.name})
                this.element.eventD = this.element.eventD.filter(item => {
                        return this.selectDelectEventD.indexOf(item) < 0 })

                this.isdeleteEventD = false
                this.selectDelectEventD = []
            } 
        },
        openEventD(idx) {
            this.selVariableData = this.$store.getters.getVariableDataPrototype
            this.editEventD.name = this.element.eventD[idx].name
            if ( this.element.eventD[idx].event != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.eventD[idx].event, 1)
                }
                this.editEventD.event = { name: this.element.eventD[idx].event, uuid: endLine }
            }
            this.editEventD.idE = this.element.eventD[idx].idE
            this.editEventD.maxlength = this.element.eventD[idx].maxlength
            this.editEventD.time = this.element.eventD[idx].time
            this.editEventD.serializer = this.element.eventD[idx].serializer
            this.editEventD.protocal = this.element.eventD[idx].protocal
        },
        editEventDItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id)
            if (endLine != undefined && this.editEventD.event == null) {
                this.deleteLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id)
                this.element.eventD[idx].event = null
            } else if (endLine != undefined && endLine != this.editEventD.event.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id)
                this.newLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id, this.element.uuid+'/serviceEventD', this.editEventD.event.uuid, false)
                this.element.eventD[idx].event = this.editEventD.event.name
            } else if (endLine == undefined && this.editEventD.event != null && this.editEventD.event.uuid != null) {
                this.newLine(this.element.uuid+'/serviceEventD-'+this.element.eventD[idx].id, this.element.uuid+'/serviceEventD', this.editEventD.event.uuid, false)
                this.element.eventD[idx].event = this.editEventD.event.name
            } else if (this.editEventD.event != null && endLine == this.editEventD.event.uuid && this.element.eventD[idx].event != this.editEventD.event.name) {
                this.element.eventD[idx].event = this.editEventD.event.name
            }

            if (this.element.eventD[idx].name != this.editEventD.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'EventD', listname: this.editEventD.name, beforename:this.element.eventD[idx].name} )
            }

            if (this.refEventD == this.element.eventD[idx].id) {
                this.deleteOpenElement()
                if (this.editEventD.event != null && this.editEventD.event.uuid != null) {
                    var endLineChange = this.editEventD.event.uuid
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editEventD.event.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editEventD.event.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLineChange)
                        EventBus.$emit('new-line', this.element.uuid+'/serviceEventD', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/serviceEventD', end:endLineChange, iscircle:false, 
                                        refNum:3, idxID: this.refEventD})
                }
            }

            this.element.eventD[idx].name = this.editEventD.name
            this.element.eventD[idx].idE = this.editEventD.idE
            this.element.eventD[idx].maxlength = this.editEventD.maxlength
            this.element.eventD[idx].time = this.editEventD.time
            this.element.eventD[idx].serializer = this.editEventD.serializer
            this.element.eventD[idx].protocal = this.editEventD.protocal
            
            this.cancelEventD()
        },
        cancelEventD() {
            this.editEventD = Object.assign({}, this.defaultEventD)
            this.setactiveUUID()
        },
        addEventD() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.eventD.some(item => item.id === n)
            }
            this.editEventD.id = n
            var endLine = null
            if( this.editEventD.event != null) {
                endLine = this.editEventD.event.uuid
                this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editEventD.event.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editEventD.event.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editEventD.event = this.editEventD.event.name
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', true, endLine)
                    this.newLine(this.element.uuid+'/serviceEventD-'+n, this.element.uuid+'/serviceEventD', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/serviceEventD', end:endLine, iscircle:false, refNum:3, idxID: this.editEventD.id})
            }

            const addObj = Object.assign({}, this.editEventD)
            this.element.eventD.push(addObj);
            this.refEventD = n
            this.cancelEventD()
        },
        setVariableDataSelect() {
            if (this.isEditingVariableData == true) {
                if (this.editEventD.event != null && this.editEventD.event.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEventD.event.uuid, element: constant.ServiceInterface_str} )
                    // document.getElementById(this.editEventD.event.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editEventD.event.uuid)
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
            this.clickOtherFields()
            if (this.isdeleteMethodD == true) {
                this.isdeleteMethodD = false
                this.selectDelectMethodD = []
            } else {
                this.isdeleteMethodD = true
            }
        },
        deleteMethodD() {
            this.clickOtherFields()
            if (this.isdeleteMethodD == true) {
                this.selectDelectMethodD.forEach(item => {
                    for(let i=0; i<this.element.methodD.length; i++){
                        if (item.id == this.element.methodD[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[i].id)
                            }
                        }
                    }
                })

                this.$store.commit('deleteRefTable', {deleteName:'methodD', deletItemList: this.selectDelectMethodD, path: this.element.path, name: this.element.name})
                this.element.methodD = this.element.methodD.filter(item => {
                        return this.selectDelectMethodD.indexOf(item) < 0 })

                this.isdeleteMethodD = false
                this.selectDelectMethodD = []
            } 
        },
        openMethodD(idx) {
            this.selClientServer = this.$store.getters.getClientServer,

            this.editMethodD.name = this.element.methodD[idx].name
            if ( this.element.methodD[idx].method != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.methodD[idx].method, 3)
                }
                this.editMethodD.method = { name: this.element.methodD[idx].method, uuid: endLine}
            }
            this.editMethodD.idM = this.element.methodD[idx].idM
            this.editMethodD.maxrequest = this.element.methodD[idx].maxrequest
            this.editMethodD.maxresponse = this.element.methodD[idx].maxresponse
            this.editMethodD.timerequest = this.element.methodD[idx].timerequest
            this.editMethodD.timeresponse = this.element.methodD[idx].timeresponse
            this.editMethodD.protocal = this.element.methodD[idx].protocal
        },
        editMethodDItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id)
            if (endLine != undefined && this.editMethodD.method == null) {
                this.deleteLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id)
                this.element.methodD[idx].method = null
            } else if (endLine != undefined && endLine != this.editMethodD.method.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id)
                this.newLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id, this.element.uuid+'/serviceMethodD', this.editMethodD.method.uuid, false)
                this.element.methodD[idx].method = this.editMethodD.method.name
            } else if (endLine == undefined && this.editMethodD.method != null && this.editMethodD.method.uuid != null) {
                this.newLine(this.element.uuid+'/serviceMethodD-'+this.element.methodD[idx].id, this.element.uuid+'/serviceMethodD', this.editMethodD.method.uuid, false)
                this.element.methodD[idx].method = this.editMethodD.method.name
            } else if (this.editMethodD.method != null && endLine == this.editMethodD.method.uuid && this.element.methodD[idx].method != this.editMethodD.method.name) {
                this.element.methodD[idx].method = this.editMethodD.method.name
            }

            if (this.element.methodD[idx].name != this.editMethodD.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'MethodD', listname: this.editMethodD.name, beforename: this.element.methodD[idx].name} )
            }

            if (this.refMethod == this.element.methodD[idx].id) {
                this.deleteOpenElement()
                if (this.editMethodD.method != null && this.editMethodD.method.uuid != null) {
                    var endLineChange = this.editMethodD.method.uuid
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editMethodD.method.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editMethodD.method.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLineChange)
                        EventBus.$emit('new-line', this.element.uuid+'/serviceMethodD', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/serviceMethodD', end:endLineChange, iscircle:false, 
                                                refNum:4, idxID: this.refMethod})
                }
            }

            this.element.methodD[idx].name = this.editMethodD.name
            this.element.methodD[idx].idM = this.editMethodD.idM
            this.element.methodD[idx].maxrequest = this.editMethodD.maxrequest
            this.element.methodD[idx].maxresponse = this.editMethodD.maxresponse
            this.element.methodD[idx].timerequest = this.editMethodD.timerequest
            this.element.methodD[idx].timeresponse = this.editMethodD.timeresponse
            this.element.methodD[idx].protocal = this.editMethodD.protocal
            
            this.cancelMethodD()
        },
        cancelMethodD() {
            this.editMethodD = Object.assign({}, this.defaultMethodD)
            this.setactiveUUID()
        },
        addMethodD() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methodD.some(item => item.id === n)
            }
            this.editMethodD.id = n
            var endLine = null
            if( this.editMethodD.method != null) {
                endLine = this.editMethodD.method.uuid
                this.$store.commit('editServiceInterface', {compo:"drag", uuid: this.editMethodD.method.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: this.editMethodD.method.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editMethodD.method = this.editMethodD.method.name
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', true, endLine)
                    this.newLine(this.element.uuid+'/serviceMethodD-'+n, this.element.uuid+'/serviceMethodD', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/serviceMethodD', end:endLine, iscircle:false, 
                                        refNum:4, idxID: this.editMethodD.id})
            }

            const addObj = Object.assign({}, this.editMethodD)
            this.element.methodD.push(addObj);
            this.refMethod = n
            this.cancelMethodD()
        },
        setClientServerSelect() {
            if (this.isEditingClientServer == true) {
                if (this.editMethodD.method != null && this.editMethodD.method.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editMethodD.method.uuid, element: constant.ServiceInterface_str} )
                    // document.getElementById(this.editMethodD.method.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editMethodD.method.uuid)
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

        clickFieldName(name) {
            this.clickOtherFields()
            this.beforeField = name
        },
        clickFieldGetName(name) {
            this.clickOtherFields()
            this.beforeGet = name
        },
        clickFieldSetName(name) {
            this.clickOtherFields()
            this.beforeSet = name
        },
        clickFieldNotName(name) {
            this.clickOtherFields()
            this.beforeNoti = name
        },
        inputFieldName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'fileName', listname: name, beforename: this.beforeField} )
            this.beforeField = name
        },
        inputFieldGetName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'getName', listname: name, beforename: this.beforeGet} )
            this.beforeGet = name
        },
        inputFieldSetName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'setName', listname: name, beforename: this.beforeSet} )
            this.beforeSet = name
        },
        inputFieldNotName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'notName', listname: name, beforename: this.beforeNoti} )
            this.beforeNoti = name
        },
        addField() {
            this.clickOtherFields()
            const editItem = {name: '', field:null,
                              getname: '',getid: '',getmaxreq: '',getmaxres: '',gettimereq: '',gettimeres: '',getproto: null,
                              setname: '',setid: '',setmaxreq: '',setmaxres: '',settimereq: '',settimeres: '',setproto: null,
                              notname: '',notid: '',notmax: '',nottime: '',notserial: null,notproto: null, id: ''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Field_Deployment_' + n++;
                res = this.element.fieldD.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.fieldD.push(addObj)
            this.fieldTab = this.element.fieldD.length-1
            if(this.location == 1) {
                EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, null)
            }
        },
        clickFieldtab() {
            //console.log(idx)
            this.isGetOpenClose = true
            this.isSetOpenClose = true
            this.isNotifierOpenClose = true
        },
        changeFieldTab() {
            //console.log('change'+' / ')
            if (this.refField) {
                this.deleteOpenElement()
                this.refField = false
            }
            //이렇게 해줘야지 tab에 있는것을 다 그린다음에 선을 다시 그려줄수있다.
            /*if(this.element.fieldD.length > 0 && this.location == 1 && this.fieldTab != undefined){
                setTimeout(() => {EventBus.$emit('changeLine-someipService', 'field', this.element.uuid, this.fieldTab, this.element.fieldD[this.fieldTab].id)}, 300);
            }*/
        },
        deleteField(idx) {
            this.clickOtherFields()
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.element.fieldD[idx].id)
            if(endLine != undefined) {
                this.deleteLine(this.element.uuid+'/field-'+this.element.fieldD[idx].id)
            }
            this.$store.commit('deleteRefTable', {deleteName:'FieldD', deleteTab: true, tabName: this.element.fieldD[idx].name, path: this.element.path, name: this.element.name,
                                                    getname: this.element.fieldD[idx].getname, setname: this.element.fieldD[idx].setname, notname: this.element.fieldD[idx].notname})

            this.element.fieldD.splice(idx, 1)
        },
        setFieldSelect() {
            this.clickOtherFields()
            if (this.element.fieldD[this.fieldTab].field != null) {this.refField = true}
            if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getServiceInterfacePath(this.element.fieldD[this.fieldTab].field, 2)
                }
                if (endLine != null) {
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: endLine, top: this.element.top + 600, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, endLine)
                        EventBus.$emit('new-line', this.element.uuid+'/fieldtab'+this.element.fieldD[this.fieldTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fieldtab'+this.element.fieldD[this.fieldTab].id, end:endLine, 
                                            iscircle:false, refNum:5, idxID: 0, tabID: this.fieldTab})
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.ServiceInterface_str} )
                    // document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', endLine)
                }
            }
        },
        setServiceRef(item) {
            //console.log(item)
            this.clickOtherFields()
            if( this.element.fieldD[this.fieldTab].field != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id)
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id)
                }
                //새로 추가해준다
                if (endLine != item.uuid) {
                    this.refField = true
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top + 600, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id, this.element.uuid+'/fieldtab'+this.element.fieldD[this.fieldTab].id,
                                     item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fieldtab'+this.element.fieldD[this.fieldTab].id, end:item.uuid, iscircle:false, 
                                            refNum:5, idxID: 0, tabID: this.fieldTab})
                }
                this.element.fieldD[this.fieldTab].field = item.name
            } else {
                if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refField = true
                    this.$store.commit('editServiceInterface', {compo:"drag", uuid: item.uuid, top: this.element.top + 600, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.ServiceInterface_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', true, item.uuid)
                        this.newLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id, this.element.uuid+'/fieldtab'+this.element.fieldD[this.fieldTab].id,
                                     item.uuid, true)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/fieldtab'+this.element.fieldD[this.fieldTab].id, end:item.uuid, iscircle:false, 
                                        refNum:5, idxID: 0, tabID: this.fieldTab})
                }
            }
            this.setactiveUUID()
        },
        setFieldList() {
            this.selField = this.$store.getters.getField
            this.setactiveUUID()
        },
        clearField() {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id)
            if (endLine != undefined) {
                this.element.fieldD[this.fieldTab].field = null
                this.deleteLine(this.element.uuid+'/field-'+this.element.fieldD[this.fieldTab].id)
            }
            this.clickOtherFields()
        },


        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editSomeIPService', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
        newLine(startLine, drawLine, endLine, isView, isExist) {
            this.$store.commit('setConnectionline', {start: startLine, end: endLine} )
            if (isView) {
                EventBus.$emit('new-line', drawLine, endLine, isExist)
            }
        },

        viewARXML() {
            this.editARXML.name = this.element.name
            this.editARXML.majversion = this.element.majversion
            this.editARXML.minversion = this.element.minversion
            this.editARXML.id = this.element.id
            this.editARXML.service = this.element.service
            this.editARXML.eventG = JSON.parse(JSON.stringify(this.element.eventG))
            this.editARXML.eventD = JSON.parse(JSON.stringify(this.element.eventD))
            this.editARXML.methodD = JSON.parse(JSON.stringify(this.element.methodD))
            this.editARXML.fieldD = JSON.parse(JSON.stringify(this.element.fieldD))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editSomeIPService', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name, 
                                                        changeName: 'Name', pathLength:this.element.path.split('/').length, beforename: this.element.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.majversion = this.editARXML.majversion
            this.element.minversion = this.editARXML.minversion
            this.element.id = this.editARXML.id

            this.editTableList()
            var endLine = null, changEndLine = null

            if (this.editARXML.service != this.element.service) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/service')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/service')
                }
                changEndLine = this.$store.getters.getServiceInterfacePath(this.editARXML.service, 0)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/service', this.element.uuid+'/service', changEndLine, false)
                }
            }
            this.element.service = this.editARXML.service

            if (this.editARXML.eventD.length > 0) {
                this.editARXML.eventD.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.eventD.length; n++){
                        if (this.element.eventD[n].id == item.id &&
                            this.element.eventD[n].event == item.event ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/serviceEventD-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfacePath(item.event, 1)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/serviceEventD-'+item.id, this.element.uuid+'/serviceEventD', changEndLine, false)
                        }
                    }

                    if (item.serializer != null) {
                        item.serializer = item.serializer.toUpperCase()
                        if(!(item.serializer == 'SOMEIP' || item.serializer == 'SIGNAL-BASED')) {
                            item.serializer = null
                        }
                    }
                    if (item.protocal != null) {
                        item.protocal = item.protocal.toUpperCase()
                        if(!(item.protocal == 'UDP' || item.protocal == 'TCP')) {
                            item.protocal = null
                        }
                    }
                })
                this.element.eventD.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.eventD.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceEventD-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/serviceEventD-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.eventD.length > 0) {
                    this.element.eventD.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/serviceEventD-'+item.id)
                        }
                    })
                }
            }
            this.element.eventD = JSON.parse(JSON.stringify(this.editARXML.eventD))

            if (this.editARXML.methodD.length > 0) {
                this.editARXML.methodD.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.methodD.length; n++){
                        if (this.element.methodD[n].id == item.id &&
                            this.element.methodD[n].method == item.method ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/serviceMethodD-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfacePath(item.method, 3)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/serviceMethodD-'+item.id, this.element.uuid+'/serviceMethodD', changEndLine, false)
                        }
                    }

                    if (item.protocal != null) {
                        item.protocal = item.protocal.toUpperCase()
                        if(!(item.protocal == 'UDP' || item.protocal == 'TCP')) {
                            item.protocal = null
                        }
                    }
                })
                this.element.methodD.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.methodD.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/serviceMethodD-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.methodD.length > 0) {
                    this.element.methodD.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/serviceMethodD-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/serviceMethodD-'+item.id)
                        }
                    })
                }
            }
            this.element.methodD = JSON.parse(JSON.stringify(this.editARXML.methodD))

            if (this.editARXML.fieldD.length > 0) {
                this.editARXML.fieldD.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.fieldD.length; n++){
                        if (this.element.fieldD[n].id == item.id &&
                            this.element.fieldD[n].field == item.field ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/field-'+item.id)
                        }
                        changEndLine = this.$store.getters.getServiceInterfacePath(item.field, 2)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/field-'+item.id, this.element.uuid+'/field', changEndLine, false)
                        }
                    }

                    if (item.getproto != null) {
                        item.getproto = item.getproto.toUpperCase()
                        if(!(item.getproto == 'UDP' || item.getproto == 'TCP')) {
                            item.getproto = null
                        }
                    }
                    if (item.setproto != null) {
                        item.setproto = item.setproto.toUpperCase()
                        if(!(item.setproto == 'UDP' || item.setproto == 'TCP')) {
                            item.setproto = null
                        }
                    }
                    if (item.notproto != null) {
                        item.notproto = item.notproto.toUpperCase()
                        if(!(item.notproto == 'UDP' || item.notproto == 'TCP')) {
                            item.notproto = null
                        }
                    }
                    if (item.notserial != null) {
                        item.notserial = item.notserial.toUpperCase()
                        if(!(item.notserial == 'SOMEIP' || item.notserial == 'SIGNAL-BASED')) {
                            item.notserial = null
                        }
                    }
                })
                this.element.fieldD.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.fieldD.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/field-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.fieldD.length > 0) {
                    this.element.fieldD.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/field-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/field-'+item.id)
                        }
                    })
                }
            }
            this.element.fieldD = JSON.parse(JSON.stringify(this.editARXML.fieldD))

            if (this.editARXML.eventG.length > 0) {
                this.editARXML.eventG.forEach(item => {
                    item.event.forEach(data => {
                        var isHaveTable = false
                        this.element.eventG.forEach(ev => {
                            ev.event.forEach(eve => {
                                if (eve.id == data.id && eve.event == data.event) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getSomeIPEventDeploymentPath(data.event)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id, this.element.uuid+'/event', changEndLine, false)
                            }
                        }
                    })
                })
                this.element.eventG.forEach(item => {
                    item.event.forEach(data => {
                        var isHaveTable = false
                        this.editARXML.eventG.forEach(edit => {
                            edit.event.forEach(editE => {
                                if (editE.id == data.id) {
                                    isHaveTable = true
                                }
                            })
                        })
                        if (!isHaveTable) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id)
                            }
                        }
                    })
                })
            } else {
                if (this.element.eventG.length > 0) {
                    this.element.eventG.forEach(item => {
                        item.event.forEach(data => {
                            if (data.event != null) {
                                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/eventtab-'+data.id+'-'+item.id)
                                }
                            }
                        })
                    })
                }
            }
            this.element.eventG = JSON.parse(JSON.stringify(this.editARXML.eventG))
            this.cancelARXML()
        },
        editTableList() {
            var deleteItem = []
            if (this.editARXML.eventD.length > 0) {
                deleteItem = []
                this.element.eventD.forEach(item => {
                    var isExistence = false
                    this.editARXML.eventD.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'EventD', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'eventD', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.eventD.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'eventD', deletItemList: this.element.eventD, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.methodD.length > 0) {
                deleteItem = []
                this.element.methodD.forEach(item => {
                    var isExistence = false
                    this.editARXML.methodD.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'MethodD', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'methodD', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.methodD.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'methodD', deletItemList: this.element.methodD, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.fieldD.length > 0) {
                this.element.fieldD.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.fieldD.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'fileName', listname: data.name, beforename: item.name} )
                            }
                            if (data.getname != item.getname) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'getName', listname: data.getname, beforename: item.getname} )
                            }
                            if (data.setname != item.setname) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'setName', listname: data.setname, beforename: item.setname} )
                            }
                            if (data.notname != item.notname) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'notName', listname: data.notname, beforename: item.notname} )
                            }
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'FieldD', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name,
                                        getname: item.getname, setname: item.setname, notname: item.notname})

                    }
                })
            } else {
                if (this.element.fieldD.length > 0) {
                    this.element.fieldD.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'FieldD', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name,
                                        getname: item.getname, setname: item.setname, notname: item.notname})

                    })
                }
            }

            if (this.editARXML.eventG.length > 0) {
                this.element.eventG.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.eventG.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'EventG', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'eventG', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    }
                })
            } else {
                if (this.element.eventG.length > 0) {
                    this.element.eventG.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'eventG', deleteTab: true, tabName: item.name, path: this.element.path, name: this.element.name})
                    })
                }
            }
        },
        cancelARXML() {
            this.editARXML = {name:'', service: null, majversion:'', minversion:'', id: '', eventG:[], eventD: [], methodD:[], fieldD:[]}
            this.editTextEventD = {name:'', event: null, idE:'', maxlength:'', time:'', serializer:null, protocal:null, id: ''}
            this.editTextMethod = {name:'', method: null, idM:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null, id: ''}
            this.editTextField = {name: '', field:null,
                              getname: '',getid: '',getmaxreq: '',getmaxres: '',gettimereq: '',gettimeres: '',getproto: null,
                              setname: '',setid: '',setmaxreq: '',setmaxres: '',settimereq: '',settimeres: '',setproto: null,
                              notname: '',notid: '',notmax: '',nottime: '',notserial: null,notproto: null, id: ''}
            this.editTextEventG = {name: '', idG: '', event: [], id: ''}
            this.editTextEventRef = { event: null, id: ''}
            this.dialogText = false
        },
        newTextMethod() {
            this.editTextMethod = {name:'', method: null, idM:'', maxrequest:'', maxresponse:'', timerequest:'', timeresponse:'', protocal:null, id: ''}
            let res = true, n = 0
            while (res) {
                 n++;
                res = this.editARXML.methodD.some(item => item.id === n)
            }
            this.editTextMethod.id = n

            const addObj = Object.assign({}, this.editTextMethod)
            this.editARXML.methodD.push(addObj);
        },
        deletTextMethod(idx) {
            this.editARXML.methodD.splice(idx,1)
        },
        newTextEventD() {
            this.editTextEventD = {name: '', type: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.eventD.some(item => item.id === n)
            }
            this.editTextEventD.id = n

            const addObj = Object.assign({}, this.editTextEventD)
            this.editARXML.eventD.push(addObj);
        },
        deletTextEventD(idx) {
            this.editARXML.eventD.splice(idx,1)
        },
        newTextField() {
            this.editTextField = {name: '', field:null,
                              getname: '',getid: '',getmaxreq: '',getmaxres: '',gettimereq: '',gettimeres: '',getproto: null,
                              setname: '',setid: '',setmaxreq: '',setmaxres: '',settimereq: '',settimeres: '',setproto: null,
                              notname: '',notid: '',notmax: '',nottime: '',notserial: null,notproto: null, id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextField.name = 'Field_Deployment_'+n++;
                res = this.editARXML.fieldD.some(item => item.id === n)
            }
            this.editTextField.id = n

            const addObj = Object.assign({}, this.editTextField)
            this.editARXML.fieldD.push(addObj);
        },
        deletTextField(idx) {
            this.editARXML.fieldD.splice(idx,1)
        },
        newTextEventG() {
            this.editTextEventG = {name: '', idG: '', event: [], id: ''}
            let res = true, n = 0
            while (res) {
                this.editTextEventG.name = 'Event Group_' + n++
                res = this.editARXML.eventG.some(item => item.id === n)
            }
            this.editTextEventG.id = n

            const addObj = Object.assign({}, this.editTextEventG)
            this.editARXML.eventG.push(addObj);
        },
        deletTextEventG(idx, ) {
            this.editARXML.eventG.splice(idx,1)
        },
        newTextEventR(idxEventG) {
            this.editTextEventRef = {event: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.eventG[idxEventG].event.some(item => item.id === n)
            }
            this.editTextEventRef.id = n

            const addObj = Object.assign({}, this.editTextEventRef)
            this.editARXML.eventG[idxEventG].event.push(addObj);
        },
        deletTextEventR(idx, idxEventG) {
            this.editARXML.eventG[idxEventG].event.splice(idx,1)
        },

    },

}
</script>