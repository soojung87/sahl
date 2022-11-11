<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView " :color=colorToolbar dark hide-on-scroll height="30px" class="drag-handle">
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
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Service Interface</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose"> <!-- edit -->
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputServiceInfName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-text-field v-model="element.namespace" label="Name Spaces" @input='inputNameSpace' @click="clickOtherFields()" placeholder="String/String/..." style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-row>
                                <v-col col="6">
                                    <v-text-field v-model="element.versionMaj" label="Major Version" @click="clickOtherFields()" placeholder="number.number" style="height: 25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col col="6">
                                    <v-text-field v-model="element.versionMin" label="Minor Version" @click="clickOtherFields()" placeholder="number.number" style="height: 25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-checkbox v-model="element.isservice" label="Is Service" value="element.isservice" :indeterminate="element.isservice==null? true:false" true-value="true" false-value="false" style="height: 33px;"></v-checkbox>
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
                                    <v-data-table v-model="selectDelectEventItem" :headers="headerEvents" :items="element.events" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteEventItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteEventItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refEvent === item.id ? 'red' : null " @click="rowEventClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openEventItem(idx)" @cancel="cancelEventItem" @save="editEventItem(idx)" large >
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelEventItem" @save="addEventItem()"> 
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
                                    <v-data-table v-model="selectDelectFieldItem" :headers="headerField" :items="element.fields" :items-per-page='$setNumTableList'
                                                :show-select="isdeleteFieldItem" item-key="id" height="140px" dense hide-default-footer>
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :ripple="false" :value="isSelected" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteFieldItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refField === item.id ? 'red' : null " @click="rowFieldClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openFieldItem(idx)" @cancel="cancelFieldItem" @save="editFieldItem(idx)" large >
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
                                                                        <v-checkbox v-model="editFieldsItem.getter" label="getter" value="editFieldsItem.getter" :indeterminate="editFieldsItem.getter==null? true:false" true-value="true" false-value="false" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.setter" label="setter" value="editFieldsItem.setter" :indeterminate="editFieldsItem.setter==null? true:false" true-value="true" false-value="false" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.notifier" label="notifier" value="editFieldsItem.notifier" :indeterminate="editFieldsItem.notifier==null? true:false" true-value="true" false-value="false" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                </v-row>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="5">
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelFieldItem" @save="addFieldItem()"> <!--lager 빼면 cancel save없어진다 근데 없으면 select하고나서 엔터 안치면 값이 안바뀜 -->
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
                                                                        <v-checkbox v-model="editFieldsItem.getter" label="getter" value="editFieldsItem.getter" :indeterminate="editFieldsItem.getter==null? true:false" true-value="true" false-value="false" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.setter" label="setter" value="editFieldsItem.setter" :indeterminate="editFieldsItem.setter==null? true:false" true-value="true" false-value="false" @click="setactiveUUID"></v-checkbox>
                                                                    </v-col>
                                                                    <v-col cols="4">
                                                                        <v-checkbox v-model="editFieldsItem.notifier" label="notifier" value="editFieldsItem.notifier" :indeterminate="editFieldsItem.notifier==null? true:false" true-value="true" false-value="false" @click="setactiveUUID"></v-checkbox>
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
                                                <v-text-field v-model="tab.name" :rules="rules.name" label="Name" @input="inputMethodName(tab.name)" @click="clickMethodName(tab.name)" placeholder="String" style="height: 25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                <v-checkbox v-model="tab.fireforget" label='Fire & Forget' value="tab.fireforget" :indeterminate="tab.fireforget==null? true:false" true-value="true" false-value="false" style="height: 35px;"></v-checkbox>
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
                                                        <v-data-table v-model="selDeleteArgItem" :headers="headerArg" :items="tab.argument" :items-per-page='$setNumTableList'
                                                                :show-select="isdeleteArg" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteArg" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,num) in items" :key="num" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refArgument === item.id ? 'red' : null " @click="rowArgumentClick(num)">mdi-pencil</v-icon>
                                                                            <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openArg(num)" @cancel="cancelArg" @save="editArg(num)" large >
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
                                                                            <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelArg" @save="addArg()"> 
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
                                                        <v-data-table v-model="selDeleteErrorSet" :headers="headerErrorSet" :items="tab.errorSet" :items-per-page='$setNumTableList'
                                                                :show-select="isdeleteErrorSet" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteErrorSet" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,num) in items" :key="num" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refErrorSet === item.id ? 'red' : null " @click="rowErrorSetClick(num)">mdi-pencil</v-icon>
                                                                            <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openErrorSet(num)" @cancel="cancelErrorSet" @save="editErrorSet(num)" large >
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
                                                                            <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelErrorSet" @save="addErrorSet()"> 
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
                                                        <v-data-table v-model="selDeleteError" :headers="headerError" :items="tab.error" :items-per-page='$setNumTableList'
                                                                :show-select="isdeleteError" item-key="id" height="140px" dense hide-default-footer >
                                                            <template v-slot:item.data-table-select="{ isSelected, select }">
                                                                <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                                            </template>
                                                            <template v-if="!isdeleteError" v-slot:body="{ items, headers }">
                                                                <tbody>
                                                                    <tr v-for="(item,num) in items" :key="num" >
                                                                        <td v-for="(header,key) in headers" :key="key">
                                                                            <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refError === item.id ? 'red' : null " @click="rowErrorClick(num)">mdi-pencil</v-icon>
                                                                            <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openError(num)" @cancel="cancelError" @save="editError(num)" large >
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
                                                                            <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelError" @save="addError()"> 
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
                                                <v-text-field v-model="tab.descrip" label="Description" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </v-card-text>
                        <v-card-text v-else>
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                    outlined dense readonly></v-text-field>
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
                            <label style="padding:10px;">&#60;NAMESPACES&#62;</label>
                            <v-text-field v-model="editARXML.namespace" placeholder="String/String/..."  class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;NAMESPACES&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;MAJOR-VERSION&#62;</label>
                            <v-text-field v-model="editARXML.versionMaj" placeholder="number.number" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MAJOR-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;MINOR-VERSION&#62;</label>
                            <v-text-field v-model="editARXML.versionMin" placeholder="number.number" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;MINOR-VERSION&#62;</label>
                        </v-row>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;IS-SERVICE&#62;</label>
                            <v-text-field v-model="editARXML.isservice" placeholder="true or false" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;IS-SERVICE&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;EVENTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextEvent()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.events" :key="i" style="height: 90px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextEvent(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;VARIABLE-DATA-PROTOTYPE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;TYPE-TREF&#62;</label>
                                        <v-text-field v-model="item.type" placeholder="Path" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TYPE-TREF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;VARIABLE-DATA-PROTOTYPE&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;EVENTS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;FIELDS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextField()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 250px;">
                            <v-row v-for="(item, i) in editARXML.fields" :key="i" style="height: 170px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextField(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;FIELD&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" style="width:400px" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;TYPE-TREF&#62;</label>
                                        <v-text-field v-model="item.type" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TYPE-TREF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;HAS-GETTER&#62;</label>
                                        <v-text-field v-model="item.getter" placeholder="true or false" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;HAS-GETTER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;HAS-NOTIFIER&#62;</label>
                                        <v-text-field v-model="item.notifier" placeholder="true or false" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;HAS-NOTIFIER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;HAS-SETTER&#62;</label>
                                        <v-text-field v-model="item.setter" placeholder="true or false" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;HAS-SETTER&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;FIELD&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;&#47;FIELDS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;METHODS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextMethod()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 650px;">
                            <v-row v-for="(item, i) in editARXML.methods" :key="i" style="height: 590px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextMethod(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;CLIENT-SERVER-OPERATION&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 10px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;DESC&#62;</label>
                                        <v-text-field v-model="item.descrip" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DESC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:80px;">&#60;ARGUMENTS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextArg(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 150px;">
                                        <v-row v-for="(arg, a) in item.argument" :key="a" style="height: 140px;">
                                            <div>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -70px 0px 70px" @click="deletTextArg(a,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;ARGUMENT-DATA-PROTOTYPE&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;SHORT-NAME&#62;</label>
                                                    <v-text-field v-model="arg.name" placeholder="Path" style="width:350px" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;TYPE-TREF&#62;</label>
                                                    <v-text-field v-model="arg.type" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;TYPE-TREF&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;DIRECTION&#62;</label>
                                                    <v-text-field v-model="arg.dir" placeholder="IN or OUT or INOUT" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;DIRECTION&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <label style="padding:10px;margin:2px 0px 2px 120px;">&#60;DESC&#62;</label>
                                                    <v-text-field v-model="arg.descrip" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;DESC&#62;</label>
                                                </v-row>
                                                <v-row style="height: 25px;margin:0px;">
                                                        <label style="padding:10px;margin-left:105px;">&#60;&#47;ARGUMENT-DATA-PROTOTYPE&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;ARGUMENTS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 10px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 70px;">&#60;FIRE-AND-FORGET&#62;</label>
                                        <v-text-field v-model="item.fireforget" placeholder="true or false" style="width: 350px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;FIRE-AND-FORGET&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:80px;">&#60;POSSIBLE-AP-ERROR-REFS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextError(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 100px;">
                                        <v-row v-for="(err, e) in item.error" :key="e" style="height: 25px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -70px 0px 70px" @click="deletTextError(e,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;POSSIBLE-AP-ERROR-REF&#62;</label>
                                                    <v-text-field v-model="err.error" style="width:220px" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;POSSIBLE-AP-ERROR-REF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 15px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;POSSIBLE-AP-ERROR-REFS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 50px;">
                                        <label style="padding:10px;margin-left:80px;">&#60;POSSIBLE-AP-ERROR-SET-REFS&#62;</label>
                                        <v-btn style="margin: 3px 0px 0px -10px" @click="newTextErrorSet(i)" icon color="teal darken" x-samll dark>
                                            <v-icon dense dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <div class="text-Inner-editDialog" style="height: 100px;">
                                        <v-row v-for="(errs, e) in item.errorSet" :key="e" style="height: 25px;">
                                            <div>
                                                <br>
                                                <v-row style="height: 25px;margin:0px;">
                                                    <v-btn style="margin: 15px -70px 0px 70px" @click="deletTextErrorSet(e,i)" text x-small color="indigo">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <label style="padding:10px;margin:2px 0px 2px 60px;">&#60;POSSIBLE-AP-ERROR-SET-REF&#62;</label>
                                                    <v-text-field v-model="errs.error" placeholder="Path" class="lable-placeholer-color" dense></v-text-field>
                                                    <label style="padding:10px;">&#60;&#47;POSSIBLE-AP-ERROR-SET-REF&#62;</label>
                                                </v-row>
                                            </div>
                                        </v-row>
                                    </div> 
                                    <v-row style="height: 30px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;&#47;POSSIBLE-AP-ERROR-SET-REFS&#62;</label>
                                    </v-row>
                                    <v-row style="height: 30px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;CLIENT-SERVER-OPERATION&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;METHODS&#62;</label>
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
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex() {
            return this.$store.state.openProjectIndex
        },
        activeUUID() {
            return this.$store.state.activeUUID
        },
        setting() {
            return this.$store.state.setting
        },
        openElement() {
            return this.$store.state.openElement
        }
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
                            if(this.element.methods.length > 0 && this.location == 1) {
                                if(this.isMethodsOpenClose) {
                                    EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.methodTab, this.element.methods[this.methodTab].id)
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
            editARXML: {name:'', versionMaj:'', versionMin:'', namespace:'', events:[], fields:[], methods:[], isservice: null},
            editTextEvent: {name: '', type: null, id: ''},
            editTextMethod: {name: '', fireforget: null, argument: [], errorSet: [], error: [], descrip: '', id:''},
            editTextField: { name: '', type: null, getter: null, setter: null, notifier: null, id: ''},
            editTextArg: {name: '', type: null, dir: null, descrip: '', id: ''},
            editTextError: {error: null, id: ''},
            editTextErrorS: {error: null, id: ''},
            isEventsOpenClose: true,
            isFieldOpenClose: true,
            isMethodsOpenClose: true,
            isEditingEventDataType: true,
            isEditingFieldDataType: true,
            headerEvents: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Data Type', sortable: false, value: 'type' },
            ],
            defaultEventsItem: { name: '', type: null, id: '' },
            editEventsItem: {name: '', type: null, id: '' },
            isdeleteEventItem: false,
            headerField: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
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
            seltype: this.$store.getters.getImplementationDataType(''),

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
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Data Type', sortable: false, value: 'type' },
                { text: 'Direction', sortable: false, value: 'dir' },
                { text: 'Description', sortable: false, value: 'descrip' },
            ],
            headerErrorSet: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Possible AP Error Set Ref', align: 'start', sortable: false, value: 'error' },
            ],
            headerError: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
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
            beforeName: '',

            refEvent: null,
            refField: null,
            refArgument: null,
            refErrorSet: null,
            refError: null,
        }
    },
    mounted() {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID, tabID) => {
            this.refEvent = null
            this.refField = null
            this.refArgument = null
            this.refErrorSet = null
            this.refError = null

            if (refNum == 1) {
                this.refEvent = idxID
            } else if (refNum == 2) {
                this.refField = idxID
            } else if (refNum == 3) {
                this.methodTab = tabID
                this.refArgument = idxID
            } else if (refNum == 4) {
                this.methodTab = tabID
                this.refErrorSet = idxID
            } else if (refNum == 5) {
                this.methodTab = tabID
                this.refError = idxID
            }
        })
        EventBus.$on('Element-open', (isopen, uuid) => {
            if (this.element.uuid == uuid) {
                this.iselementOpenClose = isopen
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
        showServiceInterface() {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            if (this.iselementOpenClose) { //SWComponent RClient에서 3개가 같이 뜰수있음 그때 하나만 펼치고 나머지 다 접으려고
                this.$store.commit('setOpenCloseServiceInterface', {
                                uuid: this.element.uuid, left: this.element.left, top: this.element.top,
                                beforElement: constant.SWComponents_str, nowElement: constant.ServiceInterface_str})
                this.$nextTick(() => {
                    document.getElementById(this.element.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
            EventBus.$emit('drawLine')

            /*this.$nextTick(() => {
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
            })*/
        },
        showEventItem() {
            this.clickOtherFields()
            this.isEventsOpenClose =  this.isEventsOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showFieldItem() {
            this.clickOtherFields()
            this.isFieldOpenClose = this.isFieldOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showMethodItem() { 
            this.clickOtherFields()
            this.isMethodsOpenClose = this.isMethodsOpenClose ? false : true
            /*if(this.element.methods.length > 0 && this.location == 1) {
                this.$nextTick(() => {
                    if(this.isMethodsOpenClose) {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.methodTab, this.element.methods[this.methodTab].id)
                    } else {
                        EventBus.$emit('changeLine-someipService', '', this.element.uuid, null)
                    }
                    EventBus.$emit('drawLine')
                })
            }*/
        },
        clickOtherFields() {
            if (this.refEvent != null || this.refField != null || this.refArgument != null || this.refErrorSet != null || this.refError != null) {
                this.deleteOpenElement()
                this.refEvent = null
                this.refField = null
                this.refArgument = null
                this.refErrorSet = null
                this.refError = null
            }
        },
        rowEventClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refEvent != this.element.events[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.events[idx].type)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/Eventtable', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/Eventtable', end:endLine, iscircle:false, refNum:1, idxID: this.element.events[idx].id})
                }
                this.refEvent = this.element.events[idx].id
            }
        },
        rowFieldClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refField != this.element.fields[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.fields[idx].type)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/Fieldtable', endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/Fieldtable', end:endLine, iscircle:false, refNum:2, idxID: this.element.fields[idx].id})
                }
                this.refField = this.element.fields[idx].id
            }
        },
        rowArgumentClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refArgument != this.element.methods[this.methodTab].argument[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id +'-'+ this.element.methods[this.methodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.methods[this.methodTab].argument[idx].type)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: endLine, top: this.element.top + 245, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, end:endLine, iscircle:false, refNum:3, idxID: this.element.methods[this.methodTab].argument[idx].id, tabID: this.methodTab})
                }
                this.refArgument = this.element.methods[this.methodTab].argument[idx].id
            }
        },
        rowErrorSetClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refErrorSet != this.element.methods[this.methodTab].errorSet[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorSetPath(this.element.methods[this.methodTab].errorSet[idx].error)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editErrorSet', {compo:"drag", uuid: endLine, top: this.element.top + 810, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Errorset_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, end:endLine, iscircle:false, refNum:4, idxID: this.element.methods[this.methodTab].errorSet[idx].id, tabID: this.methodTab})
                }
                this.refErrorSet = this.element.methods[this.methodTab].errorSet[idx].id
            }
        },
        rowErrorClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refError != this.element.methods[this.methodTab].error[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorPath(this.element.methods[this.methodTab].error[idx].error)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editError', {compo:"drag", uuid: endLine, top: this.element.top + 1025, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Error_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, endLine)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, end:endLine, iscircle:false, refNum:5, idxID: this.element.methods[this.methodTab].error[idx].id, tabID: this.methodTab})
                }
                this.refError = this.element.methods[this.methodTab].error[idx].id
            }
        },

        addEventItem() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.events.some(item => item.id === n)
            }
            this.editEventsItem.id = n
            var endLine = null
            if( this.editEventsItem.type != null) {
                endLine = this.editEventsItem.type.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editEventsItem.type.uuid) == -1) {
                    this.$store.commit('editImplementation', {compo:"drag", uuid: this.editEventsItem.type.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                }
                this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editEventsItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                
                this.editEventsItem.type = this.editEventsItem.type.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/Eventtable-'+n, this.element.uuid+'/Eventtable', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/Eventtable', end:endLine, iscircle:false, refNum:1, idxID: this.editEventsItem.id})
            }
            const addObj = Object.assign({}, this.editEventsItem);
            this.element.events.push(addObj);
            this.refEvent = n
            this.cancelEventItem()
        },
        addFieldItem() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.fields.some(item => item.id === n)
            }
            this.editFieldsItem.id = n
            var endLine = null
            if( this.editFieldsItem.type != null) {
                endLine = this.editFieldsItem.type.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editFieldsItem.type.uuid) == -1) {
                    this.$store.commit('editImplementation', {compo:"drag", uuid: this.editFieldsItem.type.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                }
                this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editFieldsItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                
                this.editFieldsItem.type = this.editFieldsItem.type.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/Fieldtable-'+n, this.element.uuid+'/Fieldtable', endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/Fieldtable', end:endLine, iscircle:false, refNum:2, idxID: this.editFieldsItem.id})
            }
            const addObj = Object.assign({}, this.editFieldsItem);
            this.element.fields.push(addObj);
            this.refField = n
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
            this.clickOtherFields()
            if (this.isdeleteEventItem == true) {
                this.selectDelectEventItem = []
                this.isdeleteEventItem = false
            } else {
                this.isdeleteEventItem = true
            }
        },
        deleteEventItem() {
            this.clickOtherFields()
            if (this.isdeleteEventItem == true) {
                this.selectDelectEventItem.forEach(item => {
                    for(let i=0; i<this.element.events.length; i++){
                        if (item.id == this.element.events[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+this.element.events[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/Eventtable-'+this.element.events[i].id)
                            }
                        }
                    }
                })

                this.$store.commit('deleteRefTable', {deleteName:'eventSI', deletItemList: this.selectDelectEventItem, path: this.element.path, name: this.element.name})
                this.element.events = this.element.events.filter(item => {
                         return this.selectDelectEventItem.indexOf(item) < 0 })

                this.isdeleteEventItem = false
                this.selectDelectEventItem = []
            } 
        },
        isFieldCheckbox() {
            this.clickOtherFields()
            if (this.isdeleteFieldItem == true) {
                this.selectDelectFieldItem = []
                this.isdeleteFieldItem = false
            } else {
                this.isdeleteFieldItem = true
            }
        },
        deleteFieldItem() {
            this.clickOtherFields()
            if (this.isdeleteFieldItem == true) {
                this.selectDelectFieldItem.forEach(item => {
                    for(let i=0; i<this.element.fields.length; i++){
                        if (item.id == this.element.fields[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+this.element.fields[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/Fieldtable-'+this.element.fields[i].id)
                            }
                        }
                    }
                })

                this.$store.commit('deleteRefTable', {deleteName:'fieldSI', deletItemList: this.selectDelectFieldItem, path: this.element.path, name: this.element.name})
                this.element.fields = this.element.fields.filter(item => {
                         return this.selectDelectFieldItem.indexOf(item) < 0 })

                this.isdeleteFieldItem = false
                this.selectDelectFieldItem = []
            } 
        },
        openEventItem(idx) {
            this.seltype = this.$store.getters.getImplementationDataType(''),
            this.editEventsItem.name = this.element.events[idx].name
            if ( this.element.events[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.events[idx].type)
                }
                this.editEventsItem.type = { name :this.element.events[idx].type, uuid: endLine }
            }

        },
        openFieldItem(idx) {
            this.seltype = this.$store.getters.getImplementationDataType(''),

            this.editFieldsItem.name = this.element.fields[idx].name
            if ( this.element.fields[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id)
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
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id)
            if (endLine != undefined && this.editEventsItem.type == null) {
                this.deleteLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id)
                this.element.events[idx].type = null
            } else if (endLine != undefined && endLine != this.editEventsItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id)
                this.newLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id, this.element.uuid+'/Eventtable', this.editEventsItem.type.uuid, false)
                this.element.events[idx].type = this.editEventsItem.type.name
            } else if (endLine == undefined && this.editEventsItem.type != null && this.editEventsItem.type.uuid != null) {
                this.newLine(this.element.uuid+'/Eventtable-'+this.element.events[idx].id, this.element.uuid+'/Eventtable', this.editEventsItem.type.uuid, false)
                this.element.events[idx].type = this.editEventsItem.type.name
            }

            if (this.element.events[idx].name != this.editEventsItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'serviceEventD', listname: this.editEventsItem.name, beforename:this.element.events[idx].name} )
            }

            if (this.refEvent == this.element.events[idx].id) {
                this.deleteOpenElement()
                if (this.editEventsItem.type != null && this.editEventsItem.type.uuid != null) {
                    var endLineChange = this.editEventsItem.type.uuid 
                    if (this.$store.getters.getDeleteOpenElement(this.editEventsItem.type.uuid) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: this.editEventsItem.type.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editEventsItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/Eventtable', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/Eventtable', end:endLineChange, iscircle:false, refNum:1, idxID: this.refEvent})
                }
            }
            this.element.events[idx].name = this.editEventsItem.name
            this.cancelEventItem()
        },
        editFieldItem(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id)
            if (endLine != undefined && this.editFieldsItem.type == null) {
                this.deleteLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id)
                this.element.fields[idx].type = null
            } else if (endLine != undefined && endLine != this.editFieldsItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id)
                this.newLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id, this.element.uuid+'/Fieldtable', this.editFieldsItem.type.uuid, false)
                this.element.fields[idx].type = this.editFieldsItem.type.name
            }else if (endLine == undefined && this.editFieldsItem.type != null && this.editFieldsItem.type.uuid != null) {
                this.newLine(this.element.uuid+'/Fieldtable-'+this.element.fields[idx].id, this.element.uuid+'/Fieldtable', this.editFieldsItem.type.uuid, false)
                this.element.fields[idx].type = this.editFieldsItem.type.name
            }

            if (this.element.fields[idx].name != this.editFieldsItem.name){
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                          changeName: 'field', listname: this.editFieldsItem.name, beforename: this.element.fields[idx].name} )
            }

            if (this.refField == this.element.fields[idx].id) {
                this.deleteOpenElement()
                if (this.editFieldsItem.type != null && this.editFieldsItem.type.uuid != null) {
                    var endLineChange = this.editFieldsItem.type.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editFieldsItem.type.uuid) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: this.editFieldsItem.type.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editFieldsItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/Fieldtable', endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/Fieldtable', end:endLineChange, iscircle:false, refNum:2, idxID: this.refField})
                }
            }

            this.element.fields[idx].name = this.editFieldsItem.name
            this.element.fields[idx].getter = this.editFieldsItem.getter
            this.element.fields[idx].setter = this.editFieldsItem.setter
            this.element.fields[idx].notifier = this.editFieldsItem.notifier
            this.cancelFieldItem()
        },

        setDataTypeList() {
            this.seltype = this.$store.getters.getImplementationDataType('')
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
            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft,  zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', traceName: '', trace: [],
                    typeref: null, templatetype:[], desc:'', ddpc:[], idtelement:[],
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
                    // document.getElementById(this.editEventsItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editEventsItem.type.uuid)
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
                    // document.getElementById(this.editFieldsItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editFieldsItem.type.uuid)
                }
                this.setDataTypeList()
                this.isEditingFieldDataType = false
            } else {
                this.isEditingFieldDataType = true
            }
        },

        showArgument() {
            this.clickOtherFields()
            this.isArgumentOpenClose = this.isArgumentOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showErrorSet() {
            this.clickOtherFields()
            this.isErrorSetOpenClose = this.isErrorSetOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showError() {
            this.clickOtherFields()
            this.isErrorOpenClose = this.isErrorOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },

        addMethod() {
            this.clickOtherFields()
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
            this.$store.commit('setOpenCloseServiceInterface', {
                                uuid: this.element.uuid, left: this.element.left, top: this.element.top,
                                beforElement: constant.SWComponents_str, nowElement: constant.ServiceInterface_str})
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
            if (this.refArgument != null || this.refErrorSet != null || this.refError != null) {
                this.deleteOpenElement()
                this.refArgument = null
                this.refErrorSet = null
                this.refError = null
            }
            /*if(this.element.methods.length > 0 && this.location == 1 && this.methodTab != undefined) {
                setTimeout(() => {EventBus.$emit('changeLine-someipService', '', this.element.uuid, this.methodTab, this.element.methods[this.methodTab].id)}, 300);
            }*/
        },
        deleteMethod(idx) {
            this.clickOtherFields()
            var endLine
            this.$store.commit('deleteRefTable', {deleteName:'methodSI', deleteTab:true, tabName: this.element.methods[idx].name, path: this.element.path, name: this.element.name})

            this.element.methods[idx].argument.forEach(item => {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+item.id+'-'+this.element.methods[idx].id)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/argtable-'+item.id+'-'+this.element.methods[idx].id)
                }
            })
            this.element.methods[idx].errorSet.forEach(item => {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+item.id+'-'+this.element.methods[idx].id)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/methoderrors-'+item.id+'-'+this.element.methods[idx].id)
                }
            })
            this.element.methods[idx].error.forEach(item => {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+item.id+'-'+this.element.methods[idx].id)
                if(endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/methoderror-'+item.id+'-'+this.element.methods[idx].id)
                }
            })
            this.element.methods.splice(idx, 1)
            this.$store.commit('setOpenCloseServiceInterface', {
                                uuid: this.element.uuid, left: this.element.left, top: this.element.top,
                                beforElement: constant.SWComponents_str, nowElement: constant.ServiceInterface_str})
        },
        clickMethodName(name) {
            this.clickOtherFields()
            this.beforeName = name
        },
        inputMethodName(name) {
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'serviceMethodD', listname: name, beforename:this.beforeName} )
            this.beforeName = name
        },

        isCheckArg() {
            this.clickOtherFields()
            if (this.isdeleteArg == true) {
                this.isdeleteArg = false
                this.selDeleteArgItem = []
            } else {
                this.isdeleteArg = true
            }
        },
        deleteArg() {
            this.clickOtherFields()
            if (this.isdeleteArg == true) {
                this.selDeleteArgItem.forEach(item => {
                    for(let i=0; i<this.element.methods[this.methodTab].argument.length; i++){
                        if (item.id == this.element.methods[this.methodTab].argument[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[i].id +'-'+ this.element.methods[this.methodTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[i].id +'-'+ this.element.methods[this.methodTab].id)
                            }
                        }
                    }
                })

                this.element.methods[this.methodTab].argument = this.element.methods[this.methodTab].argument.filter(item => {
                         return this.selDeleteArgItem.indexOf(item) < 0 })

                this.isdeleteArg = false
                this.selDeleteArgItem = []
            }
        },
        openArg(idx) {
            this.seltype = this.$store.getters.getImplementationDataType(''),
            this.editArgItem.name = this.element.methods[this.methodTab].argument[idx].name
            if ( this.element.methods[this.methodTab].argument[idx].type != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id+'-'+this.element.methods[this.methodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.methods[this.methodTab].argument[idx].type)
                }
                this.editArgItem.type = { name: this.element.methods[this.methodTab].argument[idx].type, uuid: endLine }
            }
            this.editArgItem.dir = this.element.methods[this.methodTab].argument[idx].dir
            this.editArgItem.descrip = this.element.methods[this.methodTab].argument[idx].descrip
        },
        editArg(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id+'-'+this.element.methods[this.methodTab].id)
            if (endLine != undefined && this.editArgItem.type == null) {
                this.deleteLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id+'-'+this.element.methods[this.methodTab].id)
                this.element.methods[this.methodTab].argument[idx].type = null
            } else if (endLine != undefined && endLine != this.editArgItem.type.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id+'-'+this.element.methods[this.methodTab].id)
                this.newLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id+'-'+this.element.methods[this.methodTab].id, 
                                this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, this.editArgItem.type.uuid, false)
                this.element.methods[this.methodTab].argument[idx].type = this.editArgItem.type.name
            }else if (endLine == undefined && this.editArgItem.type != null && this.editArgItem.type.uuid != null) {
                this.newLine(this.element.uuid+'/argtable-'+this.element.methods[this.methodTab].argument[idx].id+'-'+this.element.methods[this.methodTab].id, 
                                this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, this.editArgItem.type.uuid, false)
                this.element.methods[this.methodTab].argument[idx].type = this.editArgItem.type.name
            }

            if (this.refArgument == this.element.methods[this.methodTab].argument[idx].id) {
                this.deleteOpenElement()
                if (this.editArgItem.type != null && this.editArgItem.type.uuid != null) {
                    var endLineChange = this.editArgItem.type.uuid
                    if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: this.editArgItem.type.uuid, top: this.element.top + 245, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editArgItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, end:endLineChange, iscircle:false, refNum:3, idxID: this.refArgument, tabID: this.methodTab})
                }
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
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methods[this.methodTab].argument.some(item => item.id === n)
            }
            this.editArgItem.id = n
            var endLine = null
            if( this.editArgItem.type != null) {
                endLine = this.editArgItem.type.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editArgItem.type.uuid) == -1) {
                    this.$store.commit('editImplementation', {compo:"drag", uuid: this.editArgItem.type.uuid, top: this.element.top + 245, left: this.element.left + this.$setPositionLeft} )
                }
                this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editArgItem.type.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editArgItem.type = this.editArgItem.type.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/argtable-'+n+'-'+this.element.methods[this.methodTab].id, this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id,
                                 endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/argtable'+this.element.methods[this.methodTab].id, end:endLine, iscircle:false, refNum:3, idxID: this.editArgItem.id, tabID: this.methodTab})
            }
            const addObj = Object.assign({}, this.editArgItem);
            this.element.methods[this.methodTab].argument.push(addObj);
            this.refArgument = n
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
                    // document.getElementById(this.editArgItem.type.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editArgItem.type.uuid)
                }
                this.setDataTypeList()
                this.isEditingArgType = false
            } else {
                this.isEditingArgType = true
            }
        },

        isCheckErrorSet() {
            this.clickOtherFields()
            if (this.isdeleteErrorSet == true) {
                this.isdeleteErrorSet = false
                this.selDeleteErrorSet = []
            } else {
                this.isdeleteErrorSet = true
            }
        },
        deleteErrorSet() {
            this.clickOtherFields()
            if (this.isdeleteErrorSet == true) {
                this.selDeleteErrorSet.forEach(item => {
                    for(let i=0; i<this.element.methods[this.methodTab].errorSet.length; i++){
                        if (item.id == this.element.methods[this.methodTab].errorSet[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[i].id+'-'+this.element.methods[this.methodTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[i].id+'-'+this.element.methods[this.methodTab].id)
                            }
                        }
                    }
                })

                this.element.methods[this.methodTab].errorSet = this.element.methods[this.methodTab].errorSet.filter(item => {
                        return this.selDeleteErrorSet.indexOf(item) < 0 })

                this.isdeleteErrorSet = false
                this.selDeleteErrorSet = []
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
                    // document.getElementById(this.editErrorSetItem.error.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editErrorSetItem.error.uuid)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorSetPath(this.element.methods[this.methodTab].errorSet[idx].error)
                }
                this.editErrorSetItem.error = { name: this.element.methods[this.methodTab].errorSet[idx].error, uuid: endLine }
            }
        },
        editErrorSet(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id)
            if (endLine != undefined && this.editErrorSetItem.error == null) {
                this.deleteLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id)
                this.element.methods[this.methodTab].errorSet[idx].error = null
            } else if (endLine != undefined && endLine != this.editErrorSetItem.error.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id)
                this.newLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id, 
                                this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, this.editErrorSetItem.error.uuid, false)
                this.element.methods[this.methodTab].errorSet[idx].error = this.editErrorSetItem.error.name
            } else if (endLine == undefined && this.editErrorSetItem.error != null && this.editErrorSetItem.error.uuid != null) {
                this.newLine(this.element.uuid+'/methoderrors-'+this.element.methods[this.methodTab].errorSet[idx].id+'-'+this.element.methods[this.methodTab].id,
                                 this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, this.editErrorSetItem.error.uuid, false)
                this.element.methods[this.methodTab].errorSet[idx].error = this.editErrorSetItem.error.name
            }

            if (this.refErrorSet == this.element.methods[this.methodTab].errorSet[idx].id) {
                this.deleteOpenElement()
                if (this.editErrorSetItem.error != null && this.editErrorSetItem.error.uuid != null) {
                    var endLineChange = this.editErrorSetItem.error.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editErrorSetItem.error.uuid) == -1) {
                        this.$store.commit('editErrorSet', {compo:"drag", uuid: this.editErrorSetItem.error.uuid, top: this.element.top + 810, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Errorset_str, uuid: this.editErrorSetItem.error.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, end:endLineChange, iscircle:false, refNum:4, idxID: this.refErrorSet, tabID: this.methodTab})
                }
            }
            
            this.cancelErrorSet()
        },
        cancelErrorSet() {
            this.editErrorSetItem.error = null
            this.setactiveUUID()
        },
        addErrorSet() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methods[this.methodTab].errorSet.some(item => item.id === n)
            }
            this.editErrorSetItem.id = n
            var endLine = null
            if( this.editErrorSetItem.error != null) {
                endLine = this.editErrorSetItem.error.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editErrorSetItem.error.uuid) == -1) {
                    this.$store.commit('editErrorSet', {compo:"drag", uuid: this.editErrorSetItem.error.uuid, top: this.element.top + 810, left: this.element.left + this.$setPositionLeft} )
                }
                this.$store.commit('setzIndexVisible', {parent:constant.Errorset_str, uuid: this.editErrorSetItem.error.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editErrorSetItem.error = this.editErrorSetItem.error.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/methoderrors-'+n+'-'+this.element.methods[this.methodTab].id, this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id,
                                 endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/methoderrors'+this.element.methods[this.methodTab].id, end:endLine, iscircle:false, refNum:4, idxID: this.editErrorSetItem.id, tabID: this.methodTab})
            }
            const addObj = Object.assign({}, this.editErrorSetItem)
            this.element.methods[this.methodTab].errorSet.push(addObj);
            this.refErrorSet = n
            this.cancelErrorSet()
        },
        newErrorSet() {
            this.$store.commit('addElementErrorSet', {
                name: this.$store.getters.getNameErrorSet, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                errorref: [],
            })
            EventBus.$emit('add-element', constant.Service_str)
            EventBus.$emit('add-element', constant.Errorset_str)
            this.$store.commit('editServiceInterface', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },

        isCheckError() {
            this.clickOtherFields()
            if (this.isdeleteError == true) {
                this.isdeleteError = false
                this.selDeleteError = []
            } else {
                this.isdeleteError = true
            }
        },
        deleteError() {
            this.clickOtherFields()
            if (this.isdeleteError == true) {
                this.selDeleteError.forEach(item => {
                    for(let i=0; i<this.element.methods[this.methodTab].error.length; i++){
                        if (item.id == this.element.methods[this.methodTab].error[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[i].id+'-'+this.element.methods[this.methodTab].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[i].id+'-'+this.element.methods[this.methodTab].id)
                            }
                        }
                    }
                })

                this.element.methods[this.methodTab].error = this.element.methods[this.methodTab].error.filter(item => {
                        return this.selDeleteError.indexOf(item) < 0 })

                this.isdeleteError = false
                this.selDeleteError = []
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
                    // document.getElementById(this.editErrorItem.error.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // EventBus.$emit('active-element', this.editErrorItem.error.uuid)
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
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getErrorPath(this.element.methods[this.methodTab].error[idx].error)
                }
                this.editErrorItem.error = { name: this.element.methods[this.methodTab].error[idx].error, uuid: endLine }
            }
        },
        editError(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id)
            if (endLine != undefined && this.editErrorItem.error == null) {
                this.deleteLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id)
                this.element.methods[this.methodTab].error[idx].error = null
            } else if (endLine != undefined && endLine != this.editErrorItem.error.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id)
                this.newLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id, 
                                this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, this.editErrorItem.error.uuid, false)
                this.element.methods[this.methodTab].error[idx].error = this.editErrorItem.error.name
            } else if (endLine == undefined && this.editErrorItem.error != null && this.editErrorItem.error.uuid != null) {
                this.newLine(this.element.uuid+'/methoderror-'+this.element.methods[this.methodTab].error[idx].id+'-'+this.element.methods[this.methodTab].id,
                                 this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, this.editErrorItem.error.uuid, false)
                this.element.methods[this.methodTab].error[idx].error = this.editErrorItem.error.name
            }

            if (this.refError == this.element.methods[this.methodTab].error[idx].id) {
                this.deleteOpenElement()
                if (this.editErrorItem.error != null && this.editErrorItem.error.uuid != null) {
                    var endLineChange = this.editErrorItem.error.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editErrorItem.error.uuid) == -1) {
                        this.$store.commit('editError', {compo:"drag", uuid: this.editErrorItem.error.uuid, top: this.element.top + 1025, left: this.element.left + this.$setPositionLeft} )
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Error_str, uuid: this.editErrorItem.error.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$nextTick(() => { 
                        EventBus.$emit('new-line', this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, endLineChange)
                        document.getElementById(endLineChange+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, end:endLineChange, iscircle:false, refNum:5, idxID: this.refError, tabID: this.methodTab})
                }
            }
            
            this.cancelError()
        },
        cancelError() {
            this.editErrorItem.error = null
            this.setactiveUUID()
        },
        addError() {
            this.clickOtherFields()
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.methods[this.methodTab].error.some(item => item.id === n)
            }
            this.editErrorItem.id = n
            var endLine = null
            if( this.editErrorItem.error != null) {
                endLine = this.editErrorItem.error.uuid
                if (this.$store.getters.getDeleteOpenElement(this.editErrorItem.error.uuid) == -1) {
                    this.$store.commit('editError', {compo:"drag", uuid: this.editErrorItem.error.uuid, top: this.element.top + 1025, left: this.element.left + this.$setPositionLeft} )
                }
                this.$store.commit('setzIndexVisible', {parent:constant.Error_str, uuid: this.editErrorItem.error.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editErrorItem.error = this.editErrorItem.error.name
                this.$nextTick(() => { 
                    this.newLine(this.element.uuid+'/methoderror-'+n+'-'+this.element.methods[this.methodTab].id, this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, 
                                endLine, true)
                    document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/methoderror'+this.element.methods[this.methodTab].id, end:endLine, iscircle:false, refNum:5, idxID: this.editErrorItem.id, tabID: this.methodTab})
            }
            const addObj = Object.assign({}, this.editErrorItem)
            this.element.methods[this.methodTab].error.push(addObj);
            this.refError = n
            this.cancelError()
        },
        newError() {
            this.$store.commit('addElementError', {
                name: this.$store.getters.getNameError, path: '', input: false,
                top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                desc: '', errorcode: '', errorDref: null
            })
            EventBus.$emit('add-element', constant.Service_str)
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
            this.editARXML.versionMaj = this.element.versionMaj
            this.editARXML.versionMin = this.element.versionMin
            this.editARXML.namespace = this.element.namespace
            this.editARXML.isservice = this.element.isservice
            this.editARXML.events = JSON.parse(JSON.stringify(this.element.events))
            this.editARXML.fields = JSON.parse(JSON.stringify(this.element.fields))
            this.editARXML.methods = JSON.parse(JSON.stringify(this.element.methods))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editServiceInterface', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.versionMaj = this.editARXML.versionMaj
            this.element.versionMin = this.editARXML.versionMin
            this.element.namespace = this.editARXML.namespace
            this.element.isservice = this.editARXML.isservice

            this.editTableList()
            var endLine = null, changEndLine = null

            if (this.editARXML.events.length > 0) {
                this.editARXML.events.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.events.length; n++){
                        if (this.element.events[n].id == item.id &&
                            this.element.events[n].type == item.type ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/Eventtable-'+item.id)
                        }
                        changEndLine = this.$store.getters.getImplementationPath(item.type)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/Eventtable-'+item.id, this.element.uuid+'/Eventtable', changEndLine, false)
                        }
                    }
                })
                this.element.events.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.events.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/Eventtable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.events.length > 0) {
                    this.element.events.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Eventtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/Eventtable-'+item.id)
                        }
                    })
                }
            }
            this.element.events = JSON.parse(JSON.stringify(this.editARXML.events))

            if (this.editARXML.fields.length > 0) {
                this.editARXML.fields.forEach(item => {
                    var isHaveTable = false
                    for(let n=0; n<this.element.fields.length; n++){
                        if (this.element.fields[n].id == item.id &&
                            this.element.fields[n].type == item.type ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/Fieldtable-'+item.id)
                        }
                        changEndLine = this.$store.getters.getImplementationPath(item.type)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/Fieldtable-'+item.id, this.element.uuid+'/Fieldtable', changEndLine, false)
                        }
                    }
                })
                this.element.fields.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.fields.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/Fieldtable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.fields.length > 0) {
                    this.element.fields.forEach(item => {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/Fieldtable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/Fieldtable-'+item.id)
                        }
                    })
                }
            }
            this.element.fields = JSON.parse(JSON.stringify(this.editARXML.fields))

            if (this.editARXML.methods.length > 0) {
                this.editARXML.methods.forEach(item => {
                    item.argument.forEach(arr => {
                        var isHaveTableArg = false
                        this.element.methods.forEach(met => {
                            met.argument.forEach(arg => {
                                if (arg.id == arr.id && arg.type == arr.type) {
                                    isHaveTableArg = true
                                }
                            })
                        })
                        if (!isHaveTableArg) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+arr.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/argtable-'+arr.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getImplementationPath(arr.type)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/argtable-'+arr.id+'-'+item.id, this.element.uuid+'/methods', changEndLine, false)
                            }
                        }

                        if (arr.dir != null) {
                            arr.dir = arr.dir.toUpperCase()
                            if(!(arr.dir == 'IN' || arr.dir == 'OUT' || arr.dir == 'INOUT')) {
                                arr.dir = null
                            }
                        }
                    })
                    item.error.forEach(err => {
                        var isHaveTableErr = false
                        this.element.methods.forEach(met => {
                            met.error.forEach(er => {
                                if (er.id == err.id && er.error == err.error) {
                                    isHaveTableErr = true
                                }
                            })
                        })
                        if (!isHaveTableErr) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getErrorPath(err.error)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id, this.element.uuid+'/methods', changEndLine, false)
                            }
                        }
                    })
                    item.errorSet.forEach(errs => {
                        var isHaveTableErrS = false
                        this.element.methods.forEach(met => {
                            met.errorSet.forEach(err => {
                                if (err.id == errs.id && err.error == errs.error) {
                                    isHaveTableErrS = true
                                }
                            })
                        })
                        if (!isHaveTableErrS) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+errs.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/methoderrors-'+errs.id+'-'+item.id)
                            }
                            changEndLine = this.$store.getters.getErrorSetPath(errs.error)
                            if (changEndLine != null) {
                                this.newLine(this.element.uuid+'/methoderrors-'+errs.id+'-'+item.id, this.element.uuid+'/methods', changEndLine, false)
                            }
                        }
                    })
                })
                this.element.methods.forEach(item => {
                    item.argument.forEach(arg => {
                        var isHaveTableArg = false
                        this.editARXML.methods.forEach(edit => {
                            edit.argument.forEach(editA => {
                                if (editA.id == arg.id) {
                                    isHaveTableArg = true
                                }
                            })
                        })
                        if (!isHaveTableArg) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+arg.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/argtable-'+arg.id+'-'+item.id)
                            }
                        }
                    })
                    item.error.forEach(err => {
                        var isHaveTableErr = false
                        this.editARXML.methods.forEach(edit => {
                            edit.error.forEach(editE => {
                                if (editE.id == err.id) {
                                    isHaveTableErr = true
                                }
                            })
                        })
                        if (!isHaveTableErr) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id)
                            }
                        }
                    })
                    item.errorSet.forEach(err => {
                        var isHaveTableErrS = false
                        this.editARXML.methods.forEach(edit => {
                            edit.errorSet.forEach(editES => {
                                if (editES.id == err.id) {
                                    isHaveTableErrS = true
                                }
                            })
                        })
                        if (!isHaveTableErrS) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+err.id+'-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/methoderrors-'+err.id+'-'+item.id)
                            }
                        }
                    })
                })
            } else {
                if (this.element.methods.length > 0) {
                    this.element.methods.forEach(item => {
                        item.argument.forEach(arg => {
                            if (arg.type != null) {
                                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/argtable-'+arg.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/argtable-'+arg.id+'-'+item.id)
                                }
                            }
                        })
                        item.error.forEach(err => {
                            if (err.error != null) {
                                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/methoderror-'+err.id+'-'+item.id)
                                }
                            }
                        })
                        item.errorSet.forEach(err => {
                            if (err.error != null) {
                                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/methoderrors-'+err.id+'-'+item.id)
                                if (endLine != undefined) {
                                    this.deleteLine(this.element.uuid+'/methoderrors-'+err.id+'-'+item.id)
                                }
                            }
                        })
                    })
                }
            }
            this.element.methods = JSON.parse(JSON.stringify(this.editARXML.methods))
            this.cancelARXML()
        },
        editTableList() {
            var deleteItem = []
            if (this.editARXML.events.length > 0) {
                deleteItem = []
                this.element.events.forEach(item => {
                    var isExistence = false
                    this.editARXML.events.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'serviceEventD', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'eventSI', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.events.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'eventSI', deletItemList: this.element.events, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.fields.length > 0) {
                deleteItem = []
                this.element.fields.forEach(item => {
                    var isExistence = false
                    this.editARXML.fields.forEach(data => {
                        if (data.id == item.id) {
                            isExistence = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'field', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isExistence) {
                        deleteItem.push(item)
                    }
                })
                if (deleteItem.length > 0)
                {
                    this.$store.commit('deleteRefTable', {deleteName:'fieldSI', deletItemList: deleteItem, path: this.element.path, name: this.element.name})
                }
            } else {
                if (this.element.fields.length > 0) {
                    this.$store.commit('deleteRefTable', {deleteName:'fieldSI', deletItemList: this.element.fields, path: this.element.path, name: this.element.name})
                }
            }

            if (this.editARXML.methods.length > 0) {
                this.element.methods.forEach(item => {
                    var isHaveTable = false
                    this.editARXML.methods.forEach(data => {
                        if (data.id == item.id) {
                            isHaveTable = true
                            if (data.name != item.name) {
                                this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name,
                                                        changeName: 'serviceMethodD', listname: data.name, beforename: item.name} )
                            }
                        }
                    })
                    if (!isHaveTable) {
                        this.$store.commit('deleteRefTable', {deleteName:'methodSI', deleteTab:true, tabName: item.name, path: this.element.path, name: this.element.name})
                    }
                })
            } else {
                if (this.element.methods.length > 0) {
                    this.element.methods.forEach(item => {
                        this.$store.commit('deleteRefTable', {deleteName:'methodSI', deleteTab:true, tabName: item.name, path: this.element.path, name: this.element.name})
                    })
                }
            }
        },
        cancelARXML() {
            this.editARXML = {name:'', versionMaj:'', versionMin:'', namespace:'', events:[], fields:[], methods:[], isservice: null}
            this.editTextEvent = {name: '', type: null, id: ''}
            this.editTextMethod = {name: '', fireforget: null, argument: [], errorSet: [], error: [], descrip: '', id:''}
            this.editTextField = {name: '', type: null, getter: null, setter: null, notifier: null, id: ''}
            this.editTextArg = {name: '', type: null, dir: null, descrip: '', id: ''}
            this.editTextError = { error: null, id: ''}
            this.editTextErrorS = {error: null, id: ''}
            this.dialogText = false
        },
        newTextMethod() {
            this.editTextMethod = {name: '', fireforget: null, argument: [], errorSet: [], error: [], descrip: '', id:''}
            let res = true, n = 0
            while (res) {
                this.editTextMethod.name = 'Method_' + n++;
                res = this.editARXML.methods.some(item => item.id === n)
            }
            this.editTextMethod.id = n

            const addObj = Object.assign({}, this.editTextMethod)
            this.editARXML.methods.push(addObj);
        },
        deletTextMethod(idx) {
            this.editARXML.methods.splice(idx,1)
        },
        newTextEvent() {
            this.editTextEvent = {name: '', type: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.events.some(item => item.id === n)
            }
            this.editTextEvent.id = n

            const addObj = Object.assign({}, this.editTextEvent)
            this.editARXML.events.push(addObj);
        },
        deletTextEvent(idx) {
            this.editARXML.events.splice(idx,1)
        },
        newTextField() {
            this.editTextField = { name: '', type: null, getter: null, setter: null, notifier: null, id: ''}
            let res = true, n = 0
            while (res) {
                 n++;
                res = this.editARXML.fields.some(item => item.id === n)
            }
            this.editTextField.id = n

            const addObj = Object.assign({}, this.editTextField)
            this.editARXML.fields.push(addObj);
        },
        deletTextField(idx) {
            this.editARXML.fields.splice(idx,1)
        },
        newTextArg(idxMethod) {
            this.editTextArg = { name: '', type: null, dir: null, descrip: '', id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.methods[idxMethod].argument.some(item => item.id === n)
            }
            this.editTextArg.id = n

            const addObj = Object.assign({}, this.editTextArg)
            this.editARXML.methods[idxMethod].argument.push(addObj);
        },
        deletTextArg(idx, idxMethod) {
            this.editARXML.methods[idxMethod].argument.splice(idx,1)
        },
        newTextError(idxMethod) {
            this.editTextError = {error: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.methods[idxMethod].error.some(item => item.id === n)
            }
            this.editTextError.id = n

            const addObj = Object.assign({}, this.editTextError)
            this.editARXML.methods[idxMethod].error.push(addObj);
        },
        deletTextError(idx, idxMethod) {
            this.editARXML.methods[idxMethod].error.splice(idx,1)
        },
        newTextErrorSet(idxMethod) {
            this.editTextErrorS = {error: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++;
                res = this.editARXML.methods[idxMethod].errorSet.some(item => item.id === n)
            }
            this.editTextErrorS.id = n

            const addObj = Object.assign({}, this.editTextErrorS)
            this.editARXML.methods[idxMethod].errorSet.push(addObj);
        },
        deletTextErrorSet(idx, idxMethod) {
            this.editARXML.methods[idxMethod].errorSet.splice(idx,1)
        },
    }
}
</script>