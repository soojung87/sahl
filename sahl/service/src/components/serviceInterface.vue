<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView && zoomvalue > $setZoominElement" :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                            <v-btn icon @click="showServiceInterface">
                                <v-icon>{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                            </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Service Interface</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-toolbar v-else-if="zoomvalue < $setZoominElement" :color=colorToolbar dark hide-on-scroll height="50px" class="drag-handle">
                            <v-toolbar-title>{{ element.name }}</v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Service Interface</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-show="iselementOpenClose && zoomvalue > $setZoominElement"> <!-- edit -->
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputServiceInfName' outlined dense></v-text-field>
                            <v-text-field v-model="element.namespace" label="Name Spaces" @input='inputNameSpace' placeholder="String/String/..." style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-row>
                                <v-col col="6">
                                    <v-text-field v-model="element.majversion" label="Major Version" placeholder="number.number" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col col="6">
                                    <v-text-field v-model="element.minversion" label="Minor Version" placeholder="number.number" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-checkbox v-model="element.isservice" label="Is Service" style="height: 33px;"></v-checkbox>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/Eventtable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showEventItem" x-small color="indigo">
                                            <v-icon>{{ isEventsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Event
                                    <v-btn @click="isEventCheckbox" text x-small color="indigo" v-if="isEventsOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isEventsOpenClose && isdeleteEventItem" @click="deleteEventItem" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isEventsOpenClose">  
                                    <v-data-table v-model="selectDelectEventItem" :headers="headerEvents" :items="element.events" :items-per-page='20'
                                            :show-select="isdeleteEventItem" item-key="id" height="100px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteEventItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog v-if="header.value != 'sort'" persistent cancel-text='Ok' save-text="Cancel" @open="openEventItem(idx)" @cancel="editEventItem(idx)" @save="cancelEventItem" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editEventsItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editEventsItem.type' label='Date Type' :items='seltype' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingEventDataType"  @click="setEventDataTypeSelect()" @blur="isEditingEventDataType=true"
                                                                        @click:clear='clearEventDataType' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newDataType">
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
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addEventItem()" @save="cancelEventItem"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editEventsItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editEventsItem.type' label='Date Type' :items='seltype' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingEventDataType"  @click="setEventDataTypeSelect()" @blur="isEditingEventDataType=true"
                                                                        @click:clear='clearEventDataType' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newDataType">
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
                                <div class="subtitle-2" :id="element.uuid+'/Fieldtable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showFieldItem" x-small color="indigo">
                                            <v-icon>{{ isFieldOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Field
                                    <v-btn @click="isFieldCheckbox" text x-small color="indigo" v-if="isFieldOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isFieldOpenClose && isdeleteFieldItem" @click="deleteFieldItem" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isFieldOpenClose">                            
                                    <v-data-table v-model="selectDelectFieldItem" :headers="headerField" :items="element.fields" :items-per-page='20'
                                                :show-select="isdeleteFieldItem" item-key="id" height="100px" dense hide-default-footer>
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteFieldItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openFieldItem(idx)" @cancel="editFieldItem(idx)" @save="cancelFieldItem" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editFieldsItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editFieldsItem.type' label='Date Type' :items='seltype' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingFieldDataType"  @click="setFieldDataTypeSelect()" @blur="isEditingFieldDataType=true"
                                                                        @click:clear='clearFieldDataType' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newDataType">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-row>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.getter" label="getter" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.setter" label="setter" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.notifier" label="notifier" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                </v-row>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="5">
                                                        <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addFieldItem()" @save="cancelFieldItem"> <!--lager 빼면 cancel save없어진다 근데 없으면 select하고나서 엔터 안치면 값이 안바뀜 -->
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editFieldsItem.name" label="name" :rules="rules.name" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editFieldsItem.type' label='Date Type' :items='seltype' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingFieldDataType"  @click="setFieldDataTypeSelect()" @blur="isEditingFieldDataType=true"
                                                                        @click:clear='clearFieldDataType' clearable>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newDataType">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-row>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.getter" label="getter" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.setter" label="setter" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.notifier" label="notifier" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                </v-row>
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
                                <div class="subtitle-2" :id="element.uuid+'/methods'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showMethodItem" x-small color="indigo">
                                            <v-icon>{{ isMethodsOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Method
                                    <v-btn v-if="isMethodsOpenClose" @click="addMethod" text x-small color="indigo">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                                <v-tabs v-model='methodTab' v-show="isMethodsOpenClose" show-arrows @change="changeMethodTab()">
                                    <v-tab v-for="(tab, idx) in element.methods" :key="idx" @click="clickMethodtab()"> 
                                        {{tab.name}}
                                        <v-btn text x-small @click="deleteMethod(idx)"><v-icon x-small>mdi-close</v-icon></v-btn></v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="methodTab" v-show="isMethodsOpenClose">
                                    <v-tab-item v-for="(tab, idx) in element.methods" :key="idx">
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputMethodName(tab.name)" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-checkbox v-model="tab.fireforget" label='Fire & Forget'></v-checkbox>
                                                <v-card outlined class="mx-auto">
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/argtable'+tab.id">
                                                        <v-hover v-slot="{ hover }">
                                                            <v-btn text @click="showArgument" x-small color="indigo">
                                                                <v-icon>{{ isArgumentOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                            </v-btn>
                                                        </v-hover>
                                                        Argument Data Prototype
                                                        <v-btn v-if="isArgumentOpenClose" @click="isCheckArg" text x-small color="indigo">
                                                            <v-icon>mdi-check</v-icon>
                                                        </v-btn>
                                                        <v-btn  v-if="isdeleteArg && isArgumentOpenClose" @click="deleteArg" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </div>
                                                    <v-card-text v-show="isArgumentOpenClose">
                                                        <v-data-table v-model="selDeleteArgItem" :headers="headerArg" :items="tab.argument" :items-per-page='20'
                                                                :show-select="isdeleteArg" item-key="id" height="100px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteArg" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,idx) in items" :key="idx" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openArg(idx)" @cancel="editArg(idx)" @save="cancelArg" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br> 
                                                                                    <v-text-field v-model="editArgItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                    <v-autocomplete v-model='editArgItem.type' label='Data Type' :items='seltype' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                        return-object :readonly="!isEditingArgType" clearable @click:clear='clearArgType()' 
                                                                                        @click="setArgTypeSelect()" @blur="isEditingArgType=true" outlined dense style="height: 45px;">
                                                                                        <template v-slot:append-item>
                                                                                            <v-btn outlined color="indigo" dense text small block @click="newDataType" >
                                                                                                <v-icon >mdi-plus</v-icon>New Item
                                                                                            </v-btn>
                                                                                        </template>
                                                                                    </v-autocomplete>
                                                                                    <v-select v-model="editArgItem.dir" clearable :items="argDirection" label="Direction" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                    <v-text-field v-model="editArgItem.descrip" label="Description" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                </template>
                                                                            </v-edit-dialog>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th colspan="3">
                                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addArg()" @save="cancelArg"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-text-field v-model="editArgItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                                    <v-autocomplete v-model='editArgItem.type' label='Data Type' :items='seltype' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                        return-object :readonly="!isEditingArgType" clearable @click:clear='clearArgType(tab)' 
                                                                                        @click="setArgTypeSelect(tab)" @blur="isEditingArgType=true" outlined dense style="height: 45px;">
                                                                                        <template v-slot:append-item>
                                                                                            <v-btn outlined color="indigo" dense text small block @click="newDataType" >
                                                                                                <v-icon >mdi-plus</v-icon>New Item
                                                                                            </v-btn>
                                                                                        </template>
                                                                                    </v-autocomplete>
                                                                                    <v-select v-model="editArgItem.dir" clearable :items="argDirection" label="Direction" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                                    <v-text-field v-model="editArgItem.descrip" label="Description" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/methoderrors'+tab.id">
                                                        <v-hover v-slot="{ hover }">
                                                            <v-btn text @click="showErrorSet" x-small color="indigo">
                                                                <v-icon>{{ isErrorSetOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                            </v-btn>
                                                        </v-hover>
                                                        Possible Error Sets
                                                        <v-btn v-if="isErrorSetOpenClose" @click="isCheckErrorSet" text x-small color="indigo">
                                                            <v-icon>mdi-check</v-icon>
                                                        </v-btn>
                                                        <v-btn  v-if="isdeleteErrorSet && isErrorSetOpenClose" @click="deleteErrorSet" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </div>
                                                    <v-card-text v-show="isErrorSetOpenClose">
                                                        <v-data-table v-model="selDeleteErrorSet" :headers="headerErrorSet" :items="tab.errorSet" :items-per-page='20'
                                                                :show-select="isdeleteErrorSet" item-key="id" height="100px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteErrorSet" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,idx) in items" :key="idx" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openErrorSet(idx)" @cancel="editErrorSet(idx)" @save="cancelErrorSet" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br> 
                                                                                    <v-autocomplete v-model='editErrorSetItem.error' label='Error Reference' :items='selErrorSet' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                        return-object :readonly="!isEditingErrorSet" clearable @click:clear='clearErrorSet()' 
                                                                                        @click="setErrorSetSelect()" @blur="isEditingErrorSet=true" outlined dense style="height: 45px;">
                                                                                        <template v-slot:append-item>
                                                                                            <v-btn outlined color="indigo" dense text small block @click="newErrorSet" >
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
                                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addErrorSet()" @save="cancelErrorSet"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editErrorSetItem.error' label='Error Reference' :items='selErrorSet' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                        return-object :readonly="!isEditingErrorSet" clearable @click:clear='clearErrorSet()' 
                                                                                        @click="setErrorSetSelect()" @blur="isEditingErrorSet=true" outlined dense style="height: 45px;">
                                                                                        <template v-slot:append-item>
                                                                                            <v-btn outlined color="indigo" dense text small block @click="newErrorSet" >
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
                                                    <div class="subtitle-2" style="height:20px" :id="element.uuid+'/methoderror'+tab.id">
                                                        <v-hover v-slot="{ hover }">
                                                            <v-btn text @click="showError" x-small color="indigo">
                                                                <v-icon>{{ isErrorOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                                            </v-btn>
                                                        </v-hover>
                                                        Possible Errors
                                                        <v-btn v-if="isErrorOpenClose" @click="isCheckError" text x-small color="indigo">
                                                            <v-icon>mdi-check</v-icon>
                                                        </v-btn>
                                                        <v-btn  v-if="isdeleteError && isErrorOpenClose" @click="deleteError" text x-small color="indigo">
                                                            <v-icon>mdi-minus</v-icon>
                                                        </v-btn>
                                                    </div>
                                                    <v-card-text v-show="isErrorOpenClose">
                                                        <v-data-table v-model="selDeleteError" :headers="headerError" :items="tab.error" :items-per-page='20'
                                                                :show-select="isdeleteError" item-key="id" height="100px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteError" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,idx) in items" :key="idx" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-edit-dialog persistent cancel-text='Ok' save-text="Cancel" @open="openError(idx)" @cancel="editError(idx)" @save="cancelError" large >
                                                                                {{item[header.value]}}
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editErrorItem.error' label='Error Reference' :items='selError' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                                return-object :readonly="!isEditingError" clearable @click="setErrorSelect()" 
                                                                                                @click:clear='clearErrorRef' @blur="isEditingError=true" outlined dense style="height: 45px;">
                                                                                        <template v-slot:append-item>
                                                                                            <v-btn outlined color="indigo" dense text small block @click="newError">
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
                                                                            <v-edit-dialog  large persistent cancel-text='Ok' save-text="Cancel" @cancel="addError()" @save="cancelError"> 
                                                                                <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                                    <v-icon >mdi-plus</v-icon>New Item
                                                                                </v-btn>
                                                                                <template v-slot:input>
                                                                                    <br>
                                                                                    <v-autocomplete v-model='editErrorItem.error' label='Error Reference' :items='selError' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                                                return-object :readonly="!isEditingError" clearable @click="setErrorSelect()" 
                                                                                                @click:clear='clearErrorRef' @blur="isEditingError=true" outlined dense style="height: 45px;">
                                                                                        <template v-slot:append-item>
                                                                                            <v-btn outlined color="indigo" dense text small block @click="newError">
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
                                                <br>
                                                <v-text-field v-model="tab.descrip" label="Description" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </v-card-text>
                        <v-card-text v-show="(!iselementOpenClose && zoomvalue > $setZoominElement) || !minimaptoolbar">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                    outlined dense readonly></v-text-field>
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
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex() {
            return this.$store.state.openProjectIndex
        },
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
            dialogPath : false,
            colorToolbar: "#6A5ACD",
            zoomvalue: this.$store.state.setting.zoomMain,
            isTooltip: this.minimaptoolbar,
            iselementOpenClose: this.minimaptoolbar, //toolbar만 보여줄것이냐 아니냐 설정 true: 전체 다 보여줌 / false : toolbar만 보여줌
            isEventsOpenClose: true,
            isFieldOpenClose: true,
            isMethodsOpenClose: true,
            isEditingEventDataType: true,
            isEditingFieldDataType: true,
            headerEvents: [
                { text: '', sortable: false, value: 'sort' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Data Type', sortable: false, value: 'type' },
            ],
            defaultEventsItem: { name: '', type: null, id: '' },
            editEventsItem: {name: '', type: null, id: '' },
            isdeleteEventItem: false,
            headerField: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Type', sortable: false, value: 'type' },
                { text: 'Getter', sortable: false, value: 'getter' },
                { text: 'Setter', sortable: false, value: 'setter' },
                { text: 'Notifier', sortable: false, value: 'notifier' },
            ],
            defaultFieldsItem: { name: '', type: null, getter: null, setter: null, notifier: null, id: '' },
            editFieldsItem: { name: '', type: null, getter: null, setter: null, notifier: null, id: '' },
            isdeleteFieldItem: false,
            selectDelectEventItem: [],
            selectDelectFieldItem: [],
            enumTrueFalse: [ 'true', 'false'],
            seltype: this.$store.getters.getImplementationDataType,
            changeLineEvent : [],
            changeLineField : [],

            methodTab: 0,
            isArgumentOpenClose: true,
            isErrorSetOpenClose: true,
            isErrorOpenClose: true,
            isdeleteArg: false,
            isdeleteErrorSet: false,
            isdeleteError: false,
            selDeleteArgItem: [],
            selDeleteErrorSet:[],
            selDeleteError: [],
            headerArg: [
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Data Type', sortable: false, value: 'type' },
                { text: 'Direction', sortable: false, value: 'dir' },
                { text: 'Description', sortable: false, value: 'descrip' },
            ],
            headerErrorSet: [
                { text: 'Possible AP Error Set Ref', align: 'start', sortable: false, value: 'error' },
            ],
            headerError: [
                { text: 'Possible AP Error Ref', align: 'start', sortable: false, value: 'error' },
            ],
            argDirection: ['IN', 'OUT', 'INOUT'],
            editArgItem: { name: '', type: null, dir: null, descrip: '', id: ''},
            defaultArg: { name: '', type: null, dir: null, descrip: '', id: ''},
            editErrorSetItem: { error: null, id: ''},
            editErrorItem: { error: null, id: ''},
            isEditingArgType: true,
            isEditingErrorSet: true,
            isEditingError: true,
            selErrorSet : this.$store.getters.getErrorSet,
            selError : this.$store.getters.getError,
            changeLineArg: [],
            changeLineES: [],
            changeLineE: [],
        }
    },
    mounted() {
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
        showServiceInterface() {
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLineTitleBar', this.element.uuid, this.iselementOpenClose)
                if(this.iselementOpenClose) {
                    if(this.element.methods.length > 0 && this.location == 1) {
                        if(this.isMethodsOpenClose) {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.methodTab, this.element.methods[this.methodTab].id)
                        } else {
                            EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                        }
                    }
                }
            })
        },
        showEventItem() {
            this.isEventsOpenClose =  this.isEventsOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showFieldItem() {
            this.isFieldOpenClose = this.isFieldOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showMethodItem() { 
            this.isMethodsOpenClose = this.isMethodsOpenClose ? false : true
            if(this.element.methods.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isMethodsOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.methodTab, this.element.methods[this.methodTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }
        },
        addEventItem() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.events.some(item => item.id === n)
            }
            this.editEventsItem.id = n

            var datacount = this.element.events.length
            if( this.editEventsItem.type != null) {
                this.newLine(this.element.uuid+'/Eventtable-'+datacount, this.element.uuid+'/Eventtable', this.editEventsItem.type.uuid)
                this.editEventsItem.type = this.editEventsItem.type.name
            }
            const addObj = Object.assign({}, this.editEventsItem);
            this.element.events.push(addObj);
            this.cancelEventItem()
        },
        addFieldItem() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.fields.some(item => item.id === n)
            }
            this.editFieldsItem.id = n

            var datacount = this.element.fields.length
            if( this.editFieldsItem.type != null) {
                this.newLine(this.element.uuid+'/Fieldtable-'+datacount, this.element.uuid+'/Fieldtable', this.editFieldsItem.type.uuid)
                this.editFieldsItem.type = this.editFieldsItem.type.name
            }
            const addObj = Object.assign({}, this.editFieldsItem);
            this.element.fields.push(addObj);
            this.cancelFieldItem()
        },
        cancelEventItem() {
            this.editEventsItem = Object.assign({}, this.defaultEventsItem)
            this.setactiveUUID()
        },
        cancelFieldItem() {
            this.editFieldsItem = Object.assign({}, this.defaultFieldsItem)
            this.setactiveUUID()
        },
        isEventCheckbox() {
            if (this.isdeleteEventItem == true) {
                this.selectDelectEventItem = []
                this.isdeleteEventItem = false
            } else {
                this.isdeleteEventItem = true
            }
        },
        deleteEventItem() {
            if (this.isdeleteEventItem == true) {
                for(let i=0; i<this.element.events.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+i)
                    if(endLine != undefined) {
                        this.changeLineEvent.push({id:this.element.events[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/Eventtable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'eventSI', deletItemList: this.selectDelectEventItem, path: this.element.path, name: this.element.name})
                this.element.events = this.element.events.filter(item => {
                         return this.selectDelectEventItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.events.length; n++) {
                    for(let idx=0; idx<this.changeLineEvent.length; idx++) {
                        if (this.element.events[n].id == this.changeLineEvent[idx].id) {
                            this.newLine(this.element.uuid+'/Eventtable-'+n, this.element.uuid+'/Eventtable', this.changeLineEvent[idx].endLine)
                        }
                    }
                }

                this.isdeleteEventItem = false
                this.selectDelectEventItem = []
                this.changeLineEvent = []
            } 
        },
        isFieldCheckbox() {
            if (this.isdeleteFieldItem == true) {
                this.selectDelectFieldItem = []
                this.isdeleteFieldItem = false
            } else {
                this.isdeleteFieldItem = true
            }
        },
        deleteFieldItem() {
            if (this.isdeleteFieldItem == true) {
                for(let i=0; i<this.element.fields.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+i)
                    if(endLine != undefined) {
                        this.changeLineField.push({id:this.element.fields[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/Fieldtable-'+i)
                    }
                }

                this.$store.commit('deleteRefTable', {deleteName:'fieldSI', deletItemList: this.selectDelectFieldItem, path: this.element.path, name: this.element.name})
                this.element.fields = this.element.fields.filter(item => {
                         return this.selectDelectFieldItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.fields.length; n++) {
                    for(let idx=0; idx<this.changeLineField.length; idx++) {
                        if (this.element.fields[n].id == this.changeLineField[idx].id) {
                            this.newLine(this.element.uuid+'/Fieldtable-'+n, this.element.uuid+'/Fieldtable', this.changeLineField[idx].endLine)
                        }
                    }
                }
         
                this.isdeleteFieldItem = false
                this.selectDelectFieldItem = []
                this.changeLineField = []
            } 
        },
        openEventItem(idx) {
            this.seltype = this.$store.getters.getImplementationDataType,
            this.editEventsItem.name = this.element.events[idx].name
            if ( this.element.events[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.events[idx].type)
                }
                this.editEventsItem.type = { name :this.element.events[idx].type, uuid: endLine }
            }

        },
        openFieldItem(idx) {
            this.seltype = this.$store.getters.getImplementationDataType,

            this.editFieldsItem.name = this.element.fields[idx].name
            if ( this.element.fields[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.fields[idx].type)
                }
                this.editFieldsItem.type = { name :this.element.fields[idx].type, uuid: endLine }
            }
            this.editFieldsItem.getter = this.element.fields[idx].getter
            this.editFieldsItem.setter = this.element.fields[idx].setter
            this.editFieldsItem.notifier = this.element.fields[idx].notifier
        },
        editEventItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+idx)
            if (endLine != undefined && this.editEventsItem.type == null) {
                this.deleteLine(this.element.uuid+'/Eventtable-'+idx)
                this.element.events[idx].type = null
            } else if (endLine != undefined && endLine != this.editEventsItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/Eventtable-'+idx)
                this.newLine(this.element.uuid+'/Eventtable-'+idx, this.element.uuid+'/Eventtable', this.editEventsItem.type.uuid)
                this.element.events[idx].type = this.editEventsItem.type.name
            } else if (endLine == undefined && this.editEventsItem.type != null) {
                this.newLine(this.element.uuid+'/Eventtable-'+idx, this.element.uuid+'/Eventtable', this.editEventsItem.type.uuid)
                this.element.events[idx].type = this.editEventsItem.type.name
            }

            if (this.element.events[idx].name != this.editEventsItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'serviceEventD', listname: this.editEventsItem.name} )
            }
            this.element.events[idx].name = this.editEventsItem.name
            this.cancelEventItem()
        },
        editFieldItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+idx)
            if (endLine != undefined && this.editFieldsItem.type == null) {
                this.deleteLine(this.element.uuid+'/Fieldtable-'+idx)
                this.element.fields[idx].type = null
            } else if (endLine != undefined && endLine != this.editFieldsItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/Fieldtable-'+idx)
                this.newLine(this.element.uuid+'/Fieldtable-'+idx, this.element.uuid+'/Fieldtable', this.editFieldsItem.type.uuid)
                this.element.fields[idx].type = this.editFieldsItem.type.name
            }else if (endLine == undefined && this.editFieldsItem.type != null) {
                this.newLine(this.element.uuid+'/Fieldtable-'+idx, this.element.uuid+'/Fieldtable', this.editFieldsItem.type.uuid)
                this.element.fields[idx].type = this.editFieldsItem.type.name
            }

            if (this.element.fields[idx].name != this.editFieldsItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'field', listname: this.editFieldsItem.name} )
            }

            this.element.fields[idx].name = this.editFieldsItem.name
            this.element.fields[idx].getter = this.editFieldsItem.getter
            this.element.fields[idx].setter = this.editFieldsItem.setter
            this.element.fields[idx].notifier = this.editFieldsItem.notifier
            this.cancelFieldItem()
        },

        setDataTypeList() {
            this.seltype = this.$store.getters.getImplementationDataType
            this.setactiveUUID()
        },
        inputServiceInfName() {
            this.$store.commit('editServiceInterface', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputNameSpace() {
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, namespace:this.element.namespace, path:this.element.path})
        },
        newDataType() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation, input: false, path: '',
                    top: elementY, left: elementX,  zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', 
                    typeref: null, templatetype:null, desc:'', ddpc:[], idtelement:[],
            })
            EventBus.$emit('add-element', constant.Implementation_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editServiceInterface', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setEventDataTypeSelect() {
            //console.log('setEventDataTypeSelect   ' + this.isEditingEventDataType)
            if (this.isEditingEventDataType == true) {
                if (this.editEventsItem.type != null && this.editEventsItem.type.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editEventsItem.type.uuid, element: constant.Implementation_str} )
                    document.getElementById(this.editEventsItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editEventsItem.type.uuid)
                }
                this.setDataTypeList()
                this.isEditingEventDataType = false
            } else {
                this.isEditingEventDataType = true
            }
        },
        clearEventDataType() {
            this.isEditingEventDataType = true
            this.editEventsItem.type = null
        },
        clearFieldDataType() {
            this.isEditingFieldDataType = true
            this.editFieldsItem.type = null
        },
        setFieldDataTypeSelect() {
            //console.log('setFieldDataTypeSelect   ' + this.isEditingFieldDataType)
            if (this.isEditingFieldDataType == true) {
                if (this.editFieldsItem.type != null && this.editFieldsItem.type.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editFieldsItem.type.uuid, element: constant.Implementation_str} )
                    document.getElementById(this.editFieldsItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editFieldsItem.type.uuid)
                }
                this.setDataTypeList()
                this.isEditingFieldDataType = false
            } else {
                this.isEditingFieldDataType = true
            }
        },

        showArgument() {
            this.isArgumentOpenClose = this.isArgumentOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showErrorSet() {
            this.isErrorSetOpenClose = this.isErrorSetOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },
        showError() {
            this.isErrorOpenClose = this.isErrorOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            EventBus.$emit('drawLine')
        },

        addMethod() {
            const editItem = { name: '', fireforget: null, argument: [], errorSet: [], error: [], descrip: '', id:''}
            const addObj = new Object(editItem)
            let res = true, n = 0

            while (res) {
                addObj.name = 'Method_' + n++;
                res = this.element.methods.some(ele => ele.name === addObj.name)
            }
            addObj.id = n
            this.element.methods.push(addObj)
            this.methodTab = this.element.methods.length-1
            if (this.location == 1) {
                EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
            }
        },
        clickMethodtab() {
            this.selDeleteArgItem = []
            this.selDeleteErrorSet = []
            this.selDeleteError = []
            this.isdeleteArg = false
            this.isdeleteErrorSet = false
            this.isdeleteError = false
        },
        changeMethodTab() {
            if(this.element.methods.length > 0 && this.location == 1) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.methodTab, this.element.methods[this.methodTab].id)}, 300);
            }
        },
        deleteMethod(idx) {
            var endLine
            this.$store.commit('deleteRefTable', {deleteName:'methodSI', deleteTab:true, tabName: this.element.methods[idx].name, path: this.element.path, name: this.element.name})

            for(let i=0; i<this.element.methods[idx].argument.length; i++){
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+i+'-'+idx)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/argtable-'+i+'-'+idx)
                }
            }
            for(let i=0; i<this.element.methods[idx].errorSet.length; i++){
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+i+'-'+idx)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/methoderrors-'+i+'-'+idx)
                }
            }
            for(let i=0; i<this.element.methods[idx].error.length; i++){
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+i+'-'+idx)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/methoderror-'+i+'-'+idx)
                }
            }

            for(let n=idx+1; n<this.element.methods.length; n++){
                for(let i=0; i<this.element.methods[n].argument.length; i++){
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+i+'-'+n)
                    if(endLine != undefined) {
                        this.deleteLine(this.element.uuid+'/argtable-'+i+'-'+n)
                        this.newLine(this.element.uuid+'/argtable-'+i+'-'+(n-1), this.element.uuid+'/methods', endLine)
                    }
                }
                for(let i=0; i<this.element.methods[n].errorSet.length; i++){
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+i+'-'+n)
                    if(endLine != undefined) {
                        this.deleteLine(this.element.uuid+'/methoderrors-'+i+'-'+n)
                        this.newLine(this.element.uuid+'/methoderrors-'+i+'-'+(n-1), this.element.uuid+'/methods', endLine)
                    }
                }
                for(let i=0; i<this.element.methods[n].error.length; i++){
                    endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+i+'-'+n)
                    if(endLine != undefined) {
                        this.deleteLine(this.element.uuid+'/methoderror-'+i+'-'+n)
                        this.newLine(this.element.uuid+'/methoderror-'+i+'-'+(n-1), this.element.uuid+'/methods', endLine)
                    }
                }
            }
            this.element.methods.splice(idx, 1)
            this.changeMethodTab()
        },
        inputMethodName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'serviceMethodD', listname: name} )
        },

        isCheckArg() {
            if (this.isdeleteArg == true) {
                this.isdeleteArg = false
                this.selDeleteArgItem = []
            } else {
                this.isdeleteArg = true
            }
        },
        deleteArg() {
            if (this.isdeleteArg == true) {
                for(let i=0; i<this.element.methods[this.methodTab].argument.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+i+'-'+this.methodTab)
                    if(endLine != undefined) {
                        this.changeLineArg.push({id:this.element.methods[this.methodTab].argument[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/argtable-'+i+'-'+this.methodTab)
                    }
                }

                this.element.methods[this.methodTab].argument = this.element.methods[this.methodTab].argument.filter(item => {
                         return this.selDeleteArgItem.indexOf(item) < 0 })

                for(let n=0; n<this.element.methods[this.methodTab].argument.length; n++) {
                    for(let idx=0; idx<this.changeLineArg.length; idx++) {
                        if (this.element.methods[this.methodTab].argument[n].id == this.changeLineArg[idx].id) {
                            this.newLine(this.element.uuid+'/argtable-'+n+'-'+this.methodTab, this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, this.changeLineArg[idx].endLine)
                        }
                    }
                }

                this.isdeleteArg = false
                this.selDeleteArgItem = []
                this.changeLineArg = []
            }
        },
        openArg(idx) {
            this.seltype = this.$store.getters.getImplementationDataType,
            this.editArgItem.name = this.element.methods[this.methodTab].argument[idx].name
            if ( this.element.methods[this.methodTab].argument[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.methods[this.methodTab].argument[idx].type)
                }
                this.editArgItem.type = { name: this.element.methods[this.methodTab].argument[idx].type, uuid: endLine }
            }
            this.editArgItem.dir = this.element.methods[this.methodTab].argument[idx].dir
            this.editArgItem.descrip = this.element.methods[this.methodTab].argument[idx].descrip
        },
        editArg(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+idx+'-'+this.methodTab)
            if (endLine != undefined && this.editArgItem.type == null) {
                this.deleteLine(this.element.uuid+'/argtable-'+idx+'-'+this.methodTab)
                this.element.methods[this.methodTab].argument[idx].type = null
            } else if (endLine != undefined && endLine != this.editArgItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/argtable-'+idx+'-'+this.methodTab)
                this.newLine(this.element.uuid+'/argtable-'+idx+'-'+this.methodTab, this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, this.editArgItem.type.uuid)
                this.element.methods[this.methodTab].argument[idx].type = this.editArgItem.type.name
            }else if (endLine == undefined && this.editArgItem.type != null) {
                this.newLine(this.element.uuid+'/argtable-'+idx+'-'+this.methodTab, this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, this.editArgItem.type.uuid)
                this.element.methods[this.methodTab].argument[idx].type = this.editArgItem.type.name
            }

            this.element.methods[this.methodTab].argument[idx].name = this.editArgItem.name
            this.element.methods[this.methodTab].argument[idx].dir = this.editArgItem.dir
            this.element.methods[this.methodTab].argument[idx].descrip = this.editArgItem.descrip
            this.cancelArg()
        },
        cancelArg() {
            this.editArgItem = Object.assign({}, this.defaultArg)
            this.setactiveUUID()
        },
        addArg() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methods[this.methodTab].argument.some(item => item.id === n)
            }
            this.editArgItem.id = n

            if( this.editArgItem.type != null) {
                var datacount = this.element.methods[this.methodTab].argument.length
                this.newLine(this.element.uuid+'/argtable-'+datacount+'-'+this.methodTab, this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, this.editArgItem.type.uuid)
                this.editArgItem.type = this.editArgItem.type.name
            }
            const addObj = Object.assign({}, this.editArgItem);
            this.element.methods[this.methodTab].argument.push(addObj);
            this.cancelArg()
        },
        clearArgType() {
            this.isEditingArgType = true
            this.editArgItem.type = null
        },
        setArgTypeSelect() {
            if (this.isEditingArgType == true) { 
                if (this.editArgItem.type != null && this.editArgItem.type.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editArgItem.type.uuid, element: constant.Implementation_str} )
                    document.getElementById(this.editArgItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editArgItem.type.uuid)
                }
                this.setDataTypeList()
                this.isEditingArgType = false
            } else {
                this.isEditingArgType = true
            }
        },

        isCheckErrorSet() {
            if (this.isdeleteErrorSet == true) {
                this.isdeleteErrorSet = false
                this.selDeleteErrorSet = []
            } else {
                this.isdeleteErrorSet = true
            }
        },
        deleteErrorSet() {
            if (this.isdeleteErrorSet == true) {
                for(let i=0; i<this.element.methods[this.methodTab].errorSet.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+i+'-'+this.methodTab)
                    if(endLine != undefined) {
                        this.changeLineES.push({id:this.element.methods[this.methodTab].errorSet[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/methoderrors-'+i+'-'+this.methodTab)
                    }
                }

                this.element.methods[this.methodTab].errorSet = this.element.methods[this.methodTab].errorSet.filter(item => {
                        return this.selDeleteErrorSet.indexOf(item) < 0 })

                for(let n=0; n<this.element.methods[this.methodTab].errorSet.length; n++) {
                    for(let idx=0; idx<this.changeLineES.length; idx++) {
                        if (this.element.methods[this.methodTab].errorSet[n].id == this.changeLineES[idx].id) {
                            this.newLine(this.element.uuid+'/methoderrors-'+n+'-'+this.methodTab, this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, this.changeLineES[idx].endLine)
                        }
                    }
                }

                this.isdeleteErrorSet = false
                this.selDeleteErrorSet = []
                this.changeLineES = []
            } 
        },
        clearErrorSet() {
            this.isEditingErrorSet = true
            this.editErrorSetItem.error = null
        },
        setErrorSetSelect() {
            if (this.isEditingErrorSet == true) {
                if (this.editErrorSetItem.error != null && this.editErrorSetItem.error.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editErrorSetItem.error.uuid, element: constant.Errorset_str} )
                    document.getElementById(this.editErrorSetItem.error.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editErrorSetItem.error.uuid)
                }
                this.setErrorSetList()
                this.isEditingErrorSet = false
            } else {
                this.isEditingErrorSet = true
            }
        },
        setErrorSetList() {
            this.selErrorSet = this.$store.getters.getErrorSet
            this.setactiveUUID()
        },
        openErrorSet(idx) {
            this.selErrorSet = this.$store.getters.getErrorSet
            if ( this.element.methods[this.methodTab].errorSet[idx].error != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorSetPath(this.element.methods[this.methodTab].errorSet[idx].error)
                }
                this.editErrorSetItem.error = { name: this.element.methods[this.methodTab].errorSet[idx].error, uuid: endLine }
            }
        },
        editErrorSet(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+idx+'-'+this.methodTab)
            if (endLine != undefined && this.editErrorSetItem.error == null) {
                this.deleteLine(this.element.uuid+'/methoderrors-'+idx+'-'+this.methodTab)
                this.element.methods[this.methodTab].errorSet[idx].error = null
            } else if (endLine != undefined && endLine != this.editErrorSetItem.error.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/methoderrors-'+idx+'-'+this.methodTab)
                this.newLine(this.element.uuid+'/methoderrors-'+idx+'-'+this.methodTab, this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, this.editErrorSetItem.error.uuid)
                this.element.methods[this.methodTab].errorSet[idx].error = this.editErrorSetItem.error.name
            } else if (endLine == undefined && this.editErrorSetItem.error != null) {
                this.newLine(this.element.uuid+'/methoderrors-'+idx+'-'+this.methodTab, this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, this.editErrorSetItem.error.uuid)
                this.element.methods[this.methodTab].errorSet[idx].error = this.editErrorSetItem.error.name
            }
            
            this.cancelErrorSet()
        },
        cancelErrorSet() {
            this.editErrorSetItem.error = null
            this.setactiveUUID()
        },
        addErrorSet() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methods[this.methodTab].errorSet.some(item => item.id === n)
            }
            this.editErrorSetItem.id = n

            if( this.editErrorSetItem.error != null) {
                var datacount = this.element.methods[this.methodTab].errorSet.length
                this.newLine(this.element.uuid+'/methoderrors-'+datacount+'-'+this.methodTab, this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, this.editErrorSetItem.error.uuid)
                this.editErrorSetItem.error = this.editErrorSetItem.error.name
            }
            const addObj = Object.assign({}, this.editErrorSetItem)
            this.element.methods[this.methodTab].errorSet.push(addObj);

            this.cancelErrorSet()
        },
        newErrorSet() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementErrorSet', {
                name: this.$store.getters.getNameErrorSet, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                errorref: [],
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Errors_str)
            EventBus.$emit('add-element', constant.Errorset_str)
            this.$store.commit('editServiceInterface', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckError() {
            if (this.isdeleteError == true) {
                this.isdeleteError = false
                this.selDeleteError = []
            } else {
                this.isdeleteError = true
            }
        },
        deleteError() {
            if (this.isdeleteError == true) {
                for(let i=0; i<this.element.methods[this.methodTab].error.length; i++){
                    var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+i+'-'+this.methodTab)
                    if(endLine != undefined) {
                        this.changeLineE.push({id:this.element.methods[this.methodTab].error[i].id, endLine:endLine})
                        this.deleteLine(this.element.uuid+'/methoderror-'+i+'-'+this.methodTab)
                    }
                }

                this.element.methods[this.methodTab].error = this.element.methods[this.methodTab].error.filter(item => {
                        return this.selDeleteError.indexOf(item) < 0 })

                for(let n=0; n<this.element.methods[this.methodTab].error.length; n++) {
                    for(let idx=0; idx<this.changeLineE.length; idx++) {
                        if (this.element.methods[this.methodTab].error[n].id == this.changeLineE[idx].id) {
                            this.newLine(this.element.uuid+'/methoderror-'+n+'-'+this.methodTab, this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, this.changeLineE[idx].endLine)
                        }
                    }
                }

                this.isdeleteError = false
                this.selDeleteError = []
                this.changeLineE = []
            } 
        },
        clearErrorRef() {
            this.isEditingError = true
            this.editErrorItem.error = null
        },
        setErrorSelect() {
            if (this.isEditingError == true) {
                if (this.editErrorItem.error != null && this.editErrorItem.error.uuid != null) {
                    this.$store.commit('setDetailView', {uuid: this.editErrorItem.error.uuid, element: constant.Error_str} )
                    document.getElementById(this.editErrorItem.error.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', this.editErrorItem.error.uuid)
                }
                this.setErrorList()
                this.isEditingError = false
            } else {
                this.isEditingError = true
            }
        },
        setErrorList() {
            this.selError = this.$store.getters.getError
            this.setactiveUUID()
        },
        openError(idx) {
            this.selError = this.$store.getters.getError

            if ( this.element.methods[this.methodTab].error[idx].error != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+idx)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorPath(this.element.methods[this.methodTab].error[idx].error)
                }
                this.editErrorItem.error = { name: this.element.methods[this.methodTab].error[idx].error, uuid: endLine }
            }
        },
        editError(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+idx+'-'+this.methodTab)
            if (endLine != undefined && this.editErrorItem.error == null) {
                this.deleteLine(this.element.uuid+'/methoderror-'+idx+'-'+this.methodTab)
                this.element.methods[this.methodTab].error[idx].error = null
            } else if (endLine != undefined && endLine != this.editErrorItem.error.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/methoderror-'+idx+'-'+this.methodTab)
                this.newLine(this.element.uuid+'/methoderror-'+idx+'-'+this.methodTab, this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, this.editErrorItem.error.uuid)
                this.element.methods[this.methodTab].error[idx].error = this.editErrorItem.error.name
            } else if (endLine == undefined && this.editErrorItem.error != null) {
                this.newLine(this.element.uuid+'/methoderror-'+idx+'-'+this.methodTab, this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, this.editErrorItem.error.uuid)
                this.element.methods[this.methodTab].error[idx].error = this.editErrorItem.error.name
            }
            
            this.cancelError()
        },
        cancelError() {
            this.editErrorItem.error = null
            this.setactiveUUID()
        },
        addError() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methods[this.methodTab].error.some(item => item.id === n)
            }
            this.editErrorItem.id = n

            if( this.editErrorItem.error != null) {
                var datacount = this.element.methods[this.methodTab].error.length
                this.newLine(this.element.uuid+'/methoderror-'+datacount+'-'+this.methodTab, this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, this.editErrorItem.error.uuid)
                this.editErrorItem.error = this.editErrorItem.error.name
            }
            const addObj = Object.assign({}, this.editErrorItem)
            this.element.methods[this.methodTab].error.push(addObj);

            this.cancelError()
        },
        newError() {
            const elementX = Array.from({length:4}, () => Math.floor(Math.random() * 3000))
            const elementY = Array.from({length:4}, () => Math.floor(Math.random() * 3000))

            this.$store.commit('addElementError', {
                name: this.$store.getters.getNameError, input: false, path: '',
                top: elementY, left: elementX, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                desc: '', errorcode: '', errorDref: null
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Errors_str)
            EventBus.$emit('add-element', constant.Error_str)
            this.$store.commit('editServiceInterface', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editServiceInterface', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
        searchChangeName(isInArg) {
            console.log('=searchChangeName='+isInArg)
            if (isInArg) { //inArg일 경우
                for (let i = 0; i<this.inArgumentItem.length; i++) {
                    if (this.afterEditInArgLine[i].enduuid != null) {
                        var changeName = this.$store.getters.getImplementationName(this.afterEditInArgLine[i].enduuid)
                        if (changeName != this.inArgumentItem[i].type) {
                            this.inArgumentItem[i].type = changeName
                        }
                    }
                }
            } else { //outArg일 경우
                for (let i = 0; i<this.outArgumentItem.length; i++) {
                    if (this.afterEditOutArgLine[i].enduuid != null) {
                        var changeNameOut = this.$store.getters.getImplementationName(this.afterEditOutArgLine[i].enduuid)
                        if (this.afterEditOutArgLine[i].enduuid != null && changeNameOut != this.outArgumentItem[i].type) {
                            this.outArgumentItem[i].type = changeNameOut
                        }
                    }
                }
            }
        }

    }
}
</script>