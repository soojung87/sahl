<template>
    <div :id="element.uuid">
        <v-container>
            <v-tooltip bottom color="success" :disabled="isTooltip" z-index="10">
                <template v-slot:activator="{ on, attrs }">
                    <v-card outlined :color="minimaptoolbar ? null : colorToolbar" v-bind="attrs" v-on="on">
                        <v-toolbar v-if="!isDatailView" :color="colorToolbar" dark hide-on-scroll height="30px" class="drag-handle">
                            <v-hover v-if="minimaptoolbar" v-slot="{ hover }">
                                <v-btn icon @click="showImplementationData">
                                    <v-icon >{{ iselementOpenClose ? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                </v-btn>
                            </v-hover>
                            <v-btn v-if="minimaptoolbar" icon @click.stop="dialogPath=true">
                                <v-icon> mdi-routes</v-icon>
                            </v-btn>
                            <dialogPathSetting v-model="dialogPath" :path="element.path" @submit="submitDialog"/>
                            <v-toolbar-title>Implementation Data Type</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn v-if="minimaptoolbar" icon @click="viewARXML">
                                <v-icon> mdi-format-text</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-toolbar v-else hide-on-scroll dense flat>
                            <v-toolbar-title>Implementation Data Type</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text v-if="iselementOpenClose">
                            <v-text-field v-model="element.name" :label="'name  <'+element.path +'>'" :rules="rules.name" placeholder="String" style="height: 45px;" class="lable-placeholer-color"
                                        @input='inputImplementationName' @click="clickOtherFields()" outlined dense></v-text-field>
                            <v-text-field v-model="element.category" label="Category" placeholder="String" @click="clickOtherFields()" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.namespace" label="Name space" @click="clickOtherFields()" @input='inputNameSpace' placeholder="String/String/,String/String/,..." style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.arraysize" label="Array Size" @click="clickOtherFields()" placeholder="Int" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-text-field v-model="element.typeemitter" label="Type Emitter" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-row style="height: 70px">
                                <v-col cols="10">
                                    <v-text-field v-model="element.typeref" readonly @click="setTypeRefSelect()" :style="refType ? 'height: 43px;border:solid red 2px' : ''"
                                                 clearable @click:clear='clearTypeRef()' label="Type Reference" style="height:25px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="deep-purple accent-4" :id="element.uuid+'/typeref'" dark icon v-bind="attrs" v-on="on" @click="setTemplateTypeList()">
                                                <v-icon>mdi-menu-down-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item v-for="(item, i) in selTemplateType" :key="i" link @click="setTypeRef(item)">
                                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                                            </v-list-item>
                                            <v-btn outlined color="indigo" dense text small block @click="newTemplateType" >
                                                <v-icon >mdi-plus</v-icon>New Item
                                            </v-btn>
                                        </v-list>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="element.desc" label="Desc" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                            <v-card outlined class="mx-auto">
                                <div class="subtitle-2" :id="element.uuid+'/templateType'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showTemplateType" x-small color="indigo">
                                            <v-icon>{{ isTemplateTypeOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Template Arguments
                                    <v-btn @click="isCheckTemplateType" text x-small color="indigo" v-if="isTemplateTypeOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isTemplateTypeOpenClose && isdeleteTemplateTypeItem" @click="deleteTemplateType" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isTemplateTypeOpenClose">  
                                    <v-data-table v-model="selectDelectTemplateTypeItem" :headers="headerTemplateType" :items="element.templatetype" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteTemplateTypeItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteTemplateTypeItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refTemplate === item.id ? 'red' : null " @click="rowTemplateTypeClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openTemplateType(idx)" @cancel="cancelTemplateType" @save="editTemplateType(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-select v-model="editTemplateTypeItem.category" :items="selectCategory" clearable @click:clear='editTemplateTypeItem.category = null' label="Category" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                <v-autocomplete v-model='editTemplateTypeItem.typeref' label='Template Type Reference' :items='selTemplateType' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingTemplateType" @click="setTemplateTypeSelect()" @blur="isEditingTemplateType=true" outlined dense style="height: 25px;"
                                                                        clearable @click:clear='clearTemplateType'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newTemplateType">
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelTemplateType" @save="addTemplateType()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-select v-model="editTemplateTypeItem.category" :items="selectCategory" clearable @click:clear='editTemplateTypeItem.category = null' label="Category" @click="setactiveUUID" outlined dense style="height: 45px;"></v-select>
                                                                <v-autocomplete v-model='editTemplateTypeItem.typeref' label='Template Type Reference' :items='selTemplateType' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingTemplateType" @click="setTemplateTypeSelect()" @blur="isEditingTemplateType=true" outlined dense style="height: 25px;"
                                                                        clearable @click:clear='clearTemplateType'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newTemplateType">
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
                                <div class="subtitle-2" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showIntroduction" x-small color="indigo">
                                            <v-icon>{{ isIntroductionOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Introduction
                                    <v-btn @click="isCheckIntroduction" text x-small color="indigo" v-if="isIntroductionOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isIntroductionOpenClose && isdeleteIntroductionItem" @click="deleteIntroduction" text x-small color="indigo" >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-if="isIntroductionOpenClose"> 
                                    <v-text-field v-model="element.traceName" label="Trace Name" @click="clickOtherFields()" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                    <v-data-table v-model="selectDelectIntroductionItem" :headers="headerIntroduction" :items="element.trace"  :items-per-page='$setNumTableList'
                                            :show-select="isdeleteIntroductionItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteIntroductionItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-edit-dialog persistent @open="openIntroduction(idx)" @cancel="cancelIntroduction" @save="editIntroduction(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editIntroductionItem.traceref" label="Trace Ref" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelIntroduction" @save="addIntroduction()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editIntroductionItem.traceref" label="Trace Ref" @click="setactiveUUID" placeholder="String" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                                <div class="subtitle-2" :id="element.uuid+'/DDPC'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showDDPCItem" x-small color="indigo">
                                            <v-icon>{{ isDDPCOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Data Def Props Conditional
                                    <v-btn @click="isCheckDDPC" text x-small color="indigo" v-if="isDDPCOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn  v-if="isDDPCOpenClose && isdeleteDDPCItem" @click="deleteDDPC" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isDDPCOpenClose">  
                                    <v-data-table v-model="selectDelectDDPCItem" :headers="headerDDPC" :items="element.ddpc" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteDDPCItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteDDPCItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx" >
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refData === item.id ? 'red' : null " @click="rowDataClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openDDPC(idx)" @cancel="cancelDDPC" @save="editDDPC(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editDDPCItem.compumethod' label='Compu Method' :items='selCompuMethod' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingCompuMethod" @click="setCompuMethodSelect()" @blur="isEditingCompuMethod=true" 
                                                                        clearable @click:clear='clearCompuMethodRef'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newCompuMethod">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-autocomplete v-model='editDDPCItem.dataconstr' label='Data Constr' :items='selDataConstr' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingDataConstr"  @click="setDataConstrSelect()" @blur="isEditingDataConstr=true" 
                                                                        clearable @click:clear='clearDataConstrRef'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newDataConstr">
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
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelDDPC" @save="addDDPC()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-autocomplete v-model='editDDPCItem.compumethod' label='Compu Method' :items='selCompuMethod' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingCompuMethod" @click="setCompuMethodSelect()" @blur="isEditingCompuMethod=true"
                                                                        clearable @click:clear='clearCompuMethodRef'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newCompuMethod">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-autocomplete v-model='editDDPCItem.dataconstr' label='Data Constr' :items='selDataConstr' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingDataConstr" @click="setDataConstrSelect()" @blur="isEditingDataConstr=true"
                                                                        clearable @click:clear='clearDataConstrRef'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newDataConstr">
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
                                <div class="subtitle-2" :id="element.uuid+'/idtetable'" style="height:20px">
                                    <v-hover v-slot="{ hover }">
                                        <v-btn text @click="showIDTElementItem" x-small color="indigo">
                                            <v-icon>{{ isIDTElementOpenClose? (hover? 'mdi-chevron-double-left' :'mdi-chevron-double-right') : (hover? 'mdi-chevron-double-right' :'mdi-chevron-double-left')}}</v-icon>
                                        </v-btn>
                                    </v-hover>
                                    Implementation Data Type
                                    <v-btn @click="isCheckIDTElement" text x-small color="indigo" v-if="isIDTElementOpenClose">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn v-if="isIDTElementOpenClose && isdeleteIDTElementItem" @click="deleteIDTElement" text x-small color="indigo">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </div>
                                <v-card-text v-show="isIDTElementOpenClose">  
                                    <v-data-table v-model="selectDelectIDTElementItem" :headers="headerIDTElement" :items="element.idtelement" :items-per-page='$setNumTableList'
                                            :show-select="isdeleteIDTElementItem" item-key="id" height="140px" dense hide-default-footer >
                                        <template v-slot:item.data-table-select="{ isSelected, select }">
                                            <v-simple-checkbox color="green" :value="isSelected" :ripple="false" @input="select($event)"></v-simple-checkbox>
                                        </template>
                                        <template v-if="!isdeleteIDTElementItem" v-slot:body="{ items, headers }">
                                            <tbody>
                                                <tr v-for="(item,idx) in items" :key="idx">
                                                    <td v-for="(header,key) in headers" :key="key">
                                                        <v-icon v-if="header.value == 'refView'" class="refView-tableItem" :color="refImplement === item.id ? 'red' : null " @click="rowImplementClick(idx)">mdi-pencil</v-icon>
                                                        <v-edit-dialog v-if="header.value != 'refView'" persistent @open="openIDTElement(idx)" @cancel="cancelIDTElement" @save="editIDTElement(idx)" large >
                                                            {{item[header.value]}}
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editIDTElementItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editIDTElementItem.typeref' label='Type Reference' :items='selTemplateType' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingIDTETypeRef" @click="setIDTElementSelect()" @blur="isEditingIDTETypeRef=true" outlined dense style="height: 25px;"
                                                                        clearable @click:clear='clearIDTETypeRef'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newTemplateType">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-checkbox v-model="editIDTElementItem.inplace" label="Inplace" value="editIDTElementItem.inplace" :indeterminate="editIDTElementItem.inplace==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()" style="height: 35px;"></v-checkbox>
                                                                <v-text-field v-model="editIDTElementItem.desc" label="Desc" @click="setactiveUUID" style="height: 35px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colspan="3">
                                                        <v-edit-dialog  large persistent @open="clickOtherFields()" @cancel="cancelIDTElement" @save="addIDTElement()"> 
                                                            <v-btn outlined color="indigo" dense text small block width="270px" >
                                                                <v-icon >mdi-plus</v-icon>New Item
                                                            </v-btn>
                                                            <template v-slot:input>
                                                                <br>
                                                                <v-text-field v-model="editIDTElementItem.name" :rules="rules.name" label="Name" placeholder="String" @click="setactiveUUID" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                                                                <v-autocomplete v-model='editIDTElementItem.typeref' label='Type Reference' :items='selTemplateType' item-text='name' item-value="uuid" class="lable-placeholer-color"
                                                                        return-object :readonly="!isEditingIDTETypeRef" @click="setIDTElementSelect()" @blur="isEditingIDTETypeRef=true" outlined dense style="height: 25px;"
                                                                        clearable @click:clear='clearIDTETypeRef'>
                                                                    <template v-slot:append-item>
                                                                        <v-btn outlined color="indigo" dense text small block @click="newTemplateType">
                                                                            <v-icon >mdi-plus</v-icon>New Item
                                                                        </v-btn>
                                                                    </template>
                                                                </v-autocomplete>
                                                                <v-checkbox v-model="editIDTElementItem.inplace" label="Inplace" value="editIDTElementItem.inplace" :indeterminate="editIDTElementItem.inplace==null? true:false" true-value="true" false-value="false" @click="setactiveUUID()" style="height: 35px;"></v-checkbox>
                                                                <v-text-field v-model="editIDTElementItem.desc" label="Desc" @click="setactiveUUID" style="height: 35px;" outlined dense class="lable-placeholer-color"></v-text-field>
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
                            <label style="padding:10px;">&#60;CATEGORY&#62;</label>
                            <v-text-field v-model="editARXML.category" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;CATEGORY&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;ARRAY-SIZE&#62;</label>
                            <v-text-field v-model="editARXML.arraysize" placeholder="Int" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;ARRAY-SIZE&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;NAMESPACES&#62;</label>
                            <v-text-field v-model="editARXML.namespace" placeholder="String/String/,String/String/,..." style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;NAMESPACES&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;TYPE-EMITTER&#62;</label>
                            <v-text-field v-model="editARXML.typeemitter" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;TYPE-EMITTER&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;TYPE-REFERENCE-REF&#62;</label>
                            <v-text-field v-model="editARXML.typeref" placeholder="Path" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;TYPE-REFERENCE-REF&#62;</label>
                        </v-row>
                        <v-row style="height: 30px;">
                            <label style="padding:10px;">&#60;DESC&#62;</label>
                            <v-text-field v-model="editARXML.desc" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;DESC&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;TEMPLATE-ARGUMENTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextTemplateArg()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.templatetype" :key="i" style="height: 95px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextTemplateArg(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;CPP-TEMPLATE-ARGUMENT&#62; </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;CATEGORY&#62;</label>
                                        <v-text-field v-model="item.category" placeholder="'ASSOC_MAP_KEY' or 'ASSOC_MAP_VALUE'" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;CATEGORY&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;TEMPLATE-TYPE-REF&#62;</label>
                                        <v-text-field v-model="item.typeref" placeholder="Path" style="width:250px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TEMPLATE-TYPE-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;CPP-TEMPLATE-ARGUMENT&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;INTRODUCTION&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;margin-left:20px;">&#60;TRACE&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;margin-left:40px;">&#60;SHORT-NAME&#62;</label>
                            <v-text-field v-model="editARXML.traceName" placeholder="String" style="height: 15px;" class="lable-placeholer-color" dense></v-text-field>
                            <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;margin-left:40px;">&#60;TRACE-REFS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextTrace()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 130px;">
                            <v-row v-for="(item, i) in editARXML.trace" :key="i" style="height: 30px;">
                                <div>
                                    <br>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 13px -25px 0px 25px" @click="deletTextTrace(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 20px;">&#60;TRACE-REF&#62;</label>
                                        <v-text-field v-model="item.traceref" placeholder="String" style="width:300px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TRACE-REF&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;margin-left:40px;">&#60;&#47;TRACE-REFS&#62;</label>
                        </v-row>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;margin-left:20px;">&#60;&#47;TRACE&#62;</label>
                        </v-row>
                        <v-row style="height: 25px;">
                            <label style="padding:10px;">&#60;&#47;INTRODUCTION&#62;</label>
                        </v-row>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;">&#60;SW-DATA-DEF-PROPS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;margin-left:20px;">&#60;SW-DATA-DEF-PROPS-VARIANTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextDDPC()" icon color="teal darken" x-samll dark>
                                <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 200px;">
                            <v-row v-for="(item, i) in editARXML.ddpc" :key="i" style="height: 100px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextDDPC(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;SW-DATA-DEF-PROPS-CONDITIONAL&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;COMPU-METHOD-REF&#62;</label>
                                        <v-text-field v-model="item.compumethod" placeholder="Path" style="width:300px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;COMPU-METHOD-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DATA-CONSTR-REF&#62;</label>
                                        <v-text-field v-model="item.dataconstr" placeholder="Path"  class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DATA-CONSTR-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:57px;">&#60;&#47;SW-DATA-DEF-PROPS-CONDITIONAL&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row style="height: 15px;">
                            <label style="padding:10px;margin-left:20px;">&#60;&#47;SW-DATA-DEF-PROPS-VARIANTS&#62;</label>
                        </v-row>
                        <v-row style="height: 20px;">
                            <label style="padding:10px;">&#60;&#47;SW-DATA-DEF-PROPS&#62;</label>
                        </v-row>
                        <v-row style="height: 50px;">
                            <label style="padding:10px;">&#60;SUB-ELEMENTS&#62;</label>
                            <v-btn style="margin: 3px 0px 0px -10px" @click="newTextIDTE()" icon color="teal darken" x-samll dark>
                                    <v-icon dense dark>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                        <div class="text-editDialog" style="height: 250px;">
                            <v-row v-for="(item, i) in editARXML.idtelement" :key="i" style="height: 200px;">
                                <div>
                                    <v-row style="height: 25px;margin:0px;">
                                        <v-btn style="margin: 15px -20px 0px 20px" @click="deletTextIDTE(i)" text x-small color="indigo">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <label style="padding:10px;margin:2px 0px 2px 10px;">&#60;CPP-IMPLEMENTATION-DATA-TYPE-ELEMENT&#62; </label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;SHORT-NAME&#62;</label>
                                        <v-text-field v-model="item.name" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;SHORT-NAME&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 80px;">&#60;DESC&#62;</label>
                                        <v-text-field v-model="item.desc" placeholder="String" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;DESC&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin-left:80px;">&#60;TYPE-REFERENCE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;INPLACE&#62;</label>
                                        <v-text-field v-model="item.inplace" placeholder="true or false" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;INPLACE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                        <label style="padding:10px;margin:2px 0px 2px 100px;">&#60;TYPE-REFERENCE-REF&#62;</label>
                                        <v-text-field v-model="item.typeref" placeholder="Path" style="width:250px;" class="lable-placeholer-color" dense></v-text-field>
                                        <label style="padding:10px;">&#60;&#47;TYPE-REFERENCE-REF&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:80px;">&#60;&#47;TYPE-REFERENCE&#62;</label>
                                    </v-row>
                                    <v-row style="height: 25px;margin:0px;">
                                            <label style="padding:10px;margin-left:55px;">&#60;&#47;CPP-IMPLEMENTATION-DATA-TYPE-ELEMENT&#62;</label>
                                    </v-row>
                                </div>
                            </v-row>
                        </div>
                        <v-row>
                            <label style="padding:10px;">&#60;&#47;SUB-ELEMENTS&#62;</label>
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
            editARXML: {name:'', category:'', namespace:'', arraysize:'', typeemitter:'', 
                    typeref: null, templatetype:[], desc:'', traceName: '', trace: [], ddpc:[], idtelement:[]},
            editTextTrace: { traceref: '', id: ''},
            editTextTemplateArg: { category: null, typeref:null, id: ''},
            editTextDDPC: { compumethod: null, dataconstr: null, id: ''},
            editTextIDTE: { name: '', typeref: null, inplace: null, desc: '', id: '' },
            isEditingCompuMethod: true,
            isEditingDataConstr: true,
            isDDPCOpenClose: true,

            isIntroductionOpenClose: true,
            isdeleteIntroductionItem: false,
            headerIntroduction: [
                { text: 'Trace Ref', align: 'start', sortable: false, value: 'traceref' },
            ],
            selectDelectIntroductionItem: [],
            editIntroductionItem: {traceref: '', id: '' },

            isdeleteDDPCItem: false,
            headerDDPC: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Compu Method', align: 'start', sortable: false, value: 'compumethod', width: '180px' },
                { text: 'Data Constr', sortable: false, value: 'dataconstr', width:'180px' },
            ],
            selectDelectDDPCItem: [],
            defaultDDPCItem: { compumethod: null, dataconstr: null, id: '' },
            editDDPCItem: { compumethod: null, dataconstr: null, id: '' },
            selCompuMethod: this.$store.getters.getCompuMethod,
            selDataConstr: this.$store.getters.getDataConstr,
            selTemplateType: this.$store.getters.getImplementationDataType(this.element.uuid),

            isIDTElementOpenClose: true,
            isdeleteIDTElementItem: false,
            isEditingIDTETypeRef: true,
            headerIDTElement: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Name', align: 'start', sortable: false, value: 'name' },
                { text: 'Type Reference​', sortable: false, value: 'typeref' },
                { text: 'Inplace', sortable: false, value: 'inplace' },
                { text: 'Desc', sortable: false, value: 'desc' }
            ],
            selectDelectIDTElementItem: [],
            defaultIDTElementItem: { name: '', typeref: null, inplace: null, desc: '', id: '' },
            editIDTElementItem: { name: '', typeref: null, inplace: null, desc: '', id: '' },

            isTemplateTypeOpenClose: true,
            isdeleteTemplateTypeItem: false,
            isEditingTemplateType: true,
            headerTemplateType: [
                { text: '', sortable: false, value: 'refView', width: '5px' },
                { text: 'Category', align: 'start', sortable: false, value: 'category' },
                { text: 'Type Reference​', sortable: false, value: 'typeref' },
            ],
            selectCategory: ['ASSOC_MAP_KEY', 'ASSOC_MAP_VALUE'],
            selectDelectTemplateTypeItem: [],
            defaultITemplateTypeItem: { category: null, typeref: null, id: '' },
            editTemplateTypeItem: { category: null, typeref: null, id: '' },

            refType : false,
            refTemplate: null,
            refData: null,
            refImplement: null,
        }
    },
    mounted () {
        if (this.minimaptoolbar && this.zoomvalue < this.$setZoominElement) {
            this.isTooltip = false
        }
        EventBus.$on(this.element.uuid, (refNum, idxID) => {
            this.refType = false
            this.refTemplate = null
            this.refData = null
            this.refImplement = null
            
            if (refNum == 1) {
                this.refType = true
            } else if (refNum == 2) {
                this.refTemplate = idxID
            } else if (refNum == 3) {
                this.refData = idxID
            } else if (refNum == 4) {
                this.refImplement = idxID
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
        showImplementationData() {
            this.clickOtherFields()
            this.iselementOpenClose = this.iselementOpenClose ? false : true
            this.$nextTick(() => {
                EventBus.$emit('drawLine')
            })
        },
        showIntroduction () {
            this.clickOtherFields()
            this.isIntroductionOpenClose = this.isIntroductionOpenClose ? false : true
            //EventBus.$emit('drawLine')
        },
        showTemplateType() {
            this.clickOtherFields()
            this.isTemplateTypeOpenClose = this.isTemplateTypeOpenClose ? false : true
        },
        showDDPCItem() {
            this.clickOtherFields()
            this.isDDPCOpenClose = this.isDDPCOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        showIDTElementItem() {
            this.clickOtherFields()
            this.isIDTElementOpenClose = this.isIDTElementOpenClose ? false : true
            // 선을 다시 그려줘야 하기 때문에
            //EventBus.$emit('drawLine')
        },
        inputImplementationName() {
            this.$store.commit('editImplementation', {compo:"Name", uuid:this.element.uuid, name:this.element.name} )
            this.$store.commit('changePathElement', {uuid:this.element.uuid, path: this.element.path, name: this.element.name} )
            if (this.element.name != '') {
                this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.element.name, path:this.element.path})
            }
        },
        inputNameSpace() {
            this.$store.commit('isintoErrorList', {uuid:this.element.uuid, namespace:this.element.namespace, path:this.element.path})
        },
        clickOtherFields() {
            if (this.refType || this.refTemplate != null || this.refData != null || this.refImplement != null) {
                this.deleteOpenElement()
                this.refType = false
                this.refTemplate = null
                this.refData = null
                this.refImplement = null
            }
        },
        rowTemplateTypeClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refTemplate != this.element.templatetype[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.templatetype[idx].typeref)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    var isExist = true
                    if (endLine != this.element.uuid) {
                        if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                            this.$store.commit('editImplementation', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/templateType', end:endLine, iscircle:isExist, refNum:2, idxID: this.element.templatetype[idx].id})
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/templateType', endLine, isExist)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                    }
                }
                this.refTemplate = this.element.templatetype[idx].id
            }
        },
        rowDataClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refData != this.element.ddpc[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLineC = null, endLineD = null
                if (this.element.ddpc[idx].compumethod != null ) {
                    endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id)
                    if (endLineC == undefined) {
                        endLineC = this.$store.getters.getCompuMethodPath(this.element.ddpc[idx].compumethod)
                    }
                    if (endLineC != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editCompuMethod', {compo:"drag", uuid: endLineC, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.CompuMethod_str, uuid: endLineC, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/DDPC', end:endLineC, iscircle:false, refNum:3, idxID: this.element.ddpc[idx].id})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineC)
                            EventBus.$emit('new-line', this.element.uuid+'/DDPC', endLineC)
                        })
                    }
                    this.editDDPCItem.compumethod = { name :this.element.ddpc[idx].compumethod, uuid: endLineC }
                }
                if (this.element.ddpc[idx].dataconstr != null) {
                    endLineD = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id)
                    if (endLineD == undefined) {
                        endLineD = this.$store.getters.getDataConstrPath(this.element.ddpc[idx].dataconstr)
                    }
                    if (endLineD != null) {
                        // 기존에 있던거 좌표 바꿔줘야함.
                        this.$store.commit('editDataConstr', {compo:"drag", uuid: endLineD, top: this.element.top + 700, left: this.element.left + this.$setPositionLeft} )
                        this.$store.commit('setzIndexVisible', {parent:constant.DataConstr_str, uuid: endLineD, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/DDPC', end:endLineD, iscircle:false, refNum:3, idxID: this.element.ddpc[idx].id})
                        this.$nextTick(() => { 
                            EventBus.$emit('Element-open', false, endLineD)
                            EventBus.$emit('new-line', this.element.uuid+'/DDPC', endLineD)
                        })
                    }
                }

                this.$nextTick(() => { 
                    if (endLineC != null && endLineD == null) {
                        EventBus.$emit('Element-open', true, endLineC)
                    } else if (endLineC == null && endLineD != null) {
                        EventBus.$emit('Element-open', true, endLineD)
                    }
                })
                this.refData = this.element.ddpc[idx].id
            }
        },
        rowImplementClick(idx) {
            console.log('rowClick ' + idx)
            if (this.refImplement != this.element.idtelement[idx].id) { // 같은거 계속 누르면 안됨
                //기존것 delete하고 
                this.clickOtherFields()
                // 새로들어온 idx line draw
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.idtelement[idx].typeref)
                }
                if (endLine != null) {
                    // 기존에 있던거 좌표 바꿔줘야함.
                    var isExist = true
                    if (endLine != this.element.uuid) {
                        if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                            this.$store.commit('editImplementation', {compo:"drag", uuid: endLine, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/idtetable', end:endLine, iscircle:isExist, refNum:4, idxID: this.element.idtelement[idx].id})
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/idtetable', endLine, isExist)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                    }
                }
                this.refImplement = this.element.idtelement[idx].id
            }
        },


        clearTypeRef() {
            this.element.typeref = null
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
            console.log(endLine)
            if (endLine != undefined) {
                this.deleteLine(this.element.uuid+'/typeref')
            }
            this.clickOtherFields()
        },
        isCheckIntroduction() {
            this.clickOtherFields()
            if (this.isdeleteIntroductionItem == true) {
                this.isdeleteIntroductionItem = false
                this.selectDelectIntroductionItem = []
            } else {
                this.isdeleteIntroductionItem = true
            }
        },
        deleteIntroduction () {
            this.clickOtherFields()
            if (this.isdeleteIntroductionItem == true) {
                this.element.trace = this.element.trace.filter(item => {
                         return this.selectDelectIntroductionItem.indexOf(item) < 0 })
                this.isdeleteIntroductionItem = false
                this.selectDelectIntroductionItem = []
            }
        },
        openIntroduction (idx) {
            this.editIntroductionItem.traceref = this.element.trace[idx].traceref
        },
        addIntroduction () {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.trace.some(item => item.id === n)
            }
            this.editIntroductionItem.id = n
            const addObj = Object.assign({}, this.editIntroductionItem);
            this.element.trace.push(addObj);
            this.cancelIntroduction()
        },
        editIntroduction (idx) {
            this.element.trace[idx].traceref = this.editIntroductionItem.traceref
            this.cancelIntroduction()
        },
        cancelIntroduction () {
            this.editIntroductionItem.traceref = ''
            this.setactiveUUID()
        },

        isCheckDDPC() {
            this.clickOtherFields()
            if (this.isdeleteDDPCItem == true) {
                this.isdeleteDDPCItem = false
                this.selectDelectDDPCItem = []
            } else {
                this.isdeleteDDPCItem = true
            }
        },
        deleteDDPC() {
            this.clickOtherFields()
            if (this.isdeleteDDPCItem == true) {
                var endLine
                this.selectDelectDDPCItem.forEach(item => {
                    for(let i=0; i<this.element.ddpc.length; i++){
                        if (item.id == this.element.ddpc[i].id) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[i].id)
                            }
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[i].id)
                            }
                        }
                    }
                })

                this.element.ddpc = this.element.ddpc.filter(item => {
                         return this.selectDelectDDPCItem.indexOf(item) < 0 })

                this.isdeleteDDPCItem = false
                this.selectDelectDDPCItem = []
            } 
        },
        openDDPC(idx) {
            this.selCompuMethod = this.$store.getters.getCompuMethod
            this.selDataConstr =  this.$store.getters.getDataConstr

            if (this.element.ddpc[idx].compumethod != null ) {
                var endLineC = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id)
                if (endLineC == undefined) {
                    endLineC = this.$store.getters.getCompuMethodPath(this.element.ddpc[idx].compumethod)
                }
                this.editDDPCItem.compumethod = { name :this.element.ddpc[idx].compumethod, uuid: endLineC }
            }
            if (this.element.ddpc[idx].dataconstr != null) {
                var endLineD = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id)
                if (endLineD == undefined) {
                    endLineD = this.$store.getters.getDataConstrPath(this.element.ddpc[idx].dataconstr)
                }
                this.editDDPCItem.dataconstr = { name :this.element.ddpc[idx].dataconstr, uuid: endLineD }
            }
        },
        addDDPC() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.ddpc.some(item => item.id === n)
            }
            this.editDDPCItem.id = n
            var endLineCompu = null, endLineDataconstr = null
            if( this.editDDPCItem.compumethod != null) {
                endLineCompu = this.editDDPCItem.compumethod.uuid
                this.$store.commit('editCompuMethod', {compo:"drag", uuid: endLineCompu, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.CompuMethod_str, uuid: endLineCompu, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editDDPCItem.compumethod = this.editDDPCItem.compumethod.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/DDPC', end:endLineCompu, iscircle:false, refNum:3, idxID: this.editDDPCItem.id})
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, endLineCompu)
                    this.newLine(this.element.uuid+'/ddpccompu-'+n, this.element.uuid+'/DDPC', endLineCompu, true)
                })
            }
            if( this.editDDPCItem.dataconstr != null) {
                endLineDataconstr = this.editDDPCItem.dataconstr.uuid
                this.$store.commit('editDataConstr', {compo:"drag", uuid: endLineDataconstr, top: this.element.top + 700, left: this.element.left + this.$setPositionLeft} )
                this.$store.commit('setzIndexVisible', {parent:constant.DataConstr_str, uuid: endLineDataconstr, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                this.editDDPCItem.dataconstr = this.editDDPCItem.dataconstr.name
                this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/DDPC', end:endLineDataconstr, iscircle:false, refNum:3, idxID: this.editDDPCItem.id})
                this.$nextTick(() => { 
                    EventBus.$emit('Element-open', false, endLineDataconstr)
                    this.newLine(this.element.uuid+'/ddpcdata-'+n, this.element.uuid+'/DDPC', endLineDataconstr, true)
                })
            }

            this.$nextTick(() => { 
                if (endLineCompu != null && endLineDataconstr == null) {
                    EventBus.$emit('Element-open', true, endLineCompu)
                } else if (endLineCompu == null && endLineDataconstr != null) {
                    EventBus.$emit('Element-open', true, endLineDataconstr)
                }
            })
            const addObj = Object.assign({}, this.editDDPCItem)
            this.element.ddpc.push(addObj)
            this.refData = n
            this.cancelDDPC()
        },
        editDDPC(idx) {
            var endcompuLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id)
            if (endcompuLine != undefined && this.editDDPCItem.compumethod == null) {
                this.deleteLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id)
                this.element.ddpc[idx].compumethod = null
            } else if (endcompuLine != undefined && endcompuLine != this.editDDPCItem.compumethod.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id)
                this.newLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id, this.element.uuid+'/DDPC', this.editDDPCItem.compumethod.uuid,false)
                this.element.ddpc[idx].compumethod = this.editDDPCItem.compumethod.name
            } else if(endcompuLine == undefined && this.editDDPCItem.compumethod != null && this.editDDPCItem.compumethod.uuid != undefined) {
                this.newLine(this.element.uuid+'/ddpccompu-'+this.element.ddpc[idx].id, this.element.uuid+'/DDPC', this.editDDPCItem.compumethod.uuid,false)
                this.element.ddpc[idx].compumethod = this.editDDPCItem.compumethod.name
            }

            var enddataLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id)
            if (enddataLine != undefined && this.editDDPCItem.dataconstr == null) {
                this.deleteLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id)
                this.element.ddpc[idx].dataconstr = null
            } else if (enddataLine != undefined && enddataLine != this.editDDPCItem.dataconstr.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id)
                this.newLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id, this.element.uuid+'/DDPC', this.editDDPCItem.dataconstr.uuid,false)
                this.element.ddpc[idx].dataconstr = this.editDDPCItem.dataconstr.name
            } else if (enddataLine == undefined && this.editDDPCItem.dataconstr != undefined && this.editDDPCItem.dataconstr.uuid != undefined) {
                this.newLine(this.element.uuid+'/ddpcdata-'+this.element.ddpc[idx].id, this.element.uuid+'/DDPC', this.editDDPCItem.dataconstr.uuid,false)
                this.element.ddpc[idx].dataconstr = this.editDDPCItem.dataconstr.name
            }
            
            var endLineCompu = null, endLineDataconstr = null
            if (this.refData == this.element.ddpc[idx].id) {
                this.deleteOpenElement()
                if (this.editDDPCItem.compumethod != null && this.editDDPCItem.compumethod.uuid != null) {
                    endLineCompu = this.editDDPCItem.compumethod.uuid
                    this.$store.commit('editCompuMethod', {compo:"drag", uuid: this.editDDPCItem.compumethod.uuid, top: this.element.top + 200, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.CompuMethod_str, uuid: this.editDDPCItem.compumethod.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/DDPC', end:endLineCompu, iscircle:false, refNum:3, idxID: this.refData})
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', false, endLineCompu)
                        EventBus.$emit('new-line', this.element.uuid+'/DDPC', endLineCompu)
                    })
                }
                if (this.editDDPCItem.dataconstr != null && this.editDDPCItem.dataconstr.uuid != null) {
                    endLineDataconstr = this.editDDPCItem.dataconstr.uuid
                    this.$store.commit('editDataConstr', {compo:"drag", uuid: this.editDDPCItem.dataconstr.uuid, top: this.element.top + 700, left: this.element.left + this.$setPositionLeft} )
                    this.$store.commit('setzIndexVisible', {parent:constant.DataConstr_str, uuid: this.editDDPCItem.dataconstr.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/DDPC', end:endLineDataconstr, iscircle:false, refNum:3, idxID: this.refData})
                    this.$nextTick(() => { 
                        EventBus.$emit('Element-open', false, endLineDataconstr)
                        EventBus.$emit('new-line', this.element.uuid+'/DDPC', endLineDataconstr)
                    })
                }
            }
            this.$nextTick(() => { 
                if (endLineCompu != null && endLineDataconstr == null) {
                    EventBus.$emit('Element-open', true, endLineCompu)
                } else if (endLineCompu == null && endLineDataconstr != null) {
                    EventBus.$emit('Element-open', true, endLineDataconstr)
                }
            })
            this.cancelDDPC()
        },
        cancelDDPC() {
            this.editDDPCItem = Object.assign({}, this.defaultDDPCItem)
            this.setactiveUUID()
        },
        setCompuMethodList() {
            this.selCompuMethod = this.$store.getters.getCompuMethod
            this.setactiveUUID()
        },
        setDataConstrList() {
            this.selDataConstr =  this.$store.getters.getDataConstr
            this.setactiveUUID()
        },
        newCompuMethod() {
            this.$store.commit('addElementCompuMehtod', {
                    name: this.$store.getters.getNameCompuMethod, path: '', input: false,
                    top: this.element.top + 200, left: this.element.left + this.$setPositionLeft, zindex: 10, category:null, attributeName:'', scales:[], icon:"mdi-clipboard-outline", validation: false
                })
            EventBus.$emit('add-element', constant.CompuMethod_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        newDataConstr() {
            this.$store.commit('addElementDataConstr', {
                    name: this.$store.getters.getNameDataConstr, path: '', input: false,
                    top: this.element.top + 700, left: this.element.left + this.$setPositionLeft, zindex: 10, lowerlimit:null, upperlimit:null, icon:"mdi-clipboard-outline", validation: false })
            EventBus.$emit('add-element', constant.DataConstr_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        setCompuMethodSelect() {
            if (this.isEditingCompuMethod == true) { 
                // new에서 들어왔을 때 이게 뭔지 보고싶을때 이건 연결한 상태가 아니기 때문에 enduuid로 찾을수가없다. 
                // edit할때랑 new할때랑 생각해봐야함
                if (this.editDDPCItem.compumethod != null) {
                    if (this.editDDPCItem.compumethod.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editDDPCItem.compumethod.uuid, element: constant.CompuMethod_str} )
                        /*document.getElementById(this.editDDPCItem.compumethod.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        EventBus.$emit('active-element', this.editDDPCItem.compumethod.uuid)*/
                    }
                }
                this.setCompuMethodList()
                this.isEditingCompuMethod = false
            } else {
                this.isEditingCompuMethod = true
            }
        },
        setDataConstrSelect() {
            if (this.isEditingDataConstr == true) {
                if (this.editDDPCItem.dataconstr != null) {
                    if (this.editDDPCItem.dataconstr.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editDDPCItem.dataconstr.uuid, element: constant.DataConstr_str} )
                        /*document.getElementById(this.editDDPCItem.dataconstr.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        EventBus.$emit('active-element', this.editDDPCItem.dataconstr.uuid)*/
                    }
                }
                this.setDataConstrList()
                this.isEditingDataConstr = false
            } else {
                this.isEditingDataConstr = true
            }
        },
        clearCompuMethodRef() {
            this.isEditingCompuMethod = true
            this.editDDPCItem.compumethod = null
        },
        clearDataConstrRef() {
            this.isEditingDataConstr = true
            this.editDDPCItem.dataconstr = null
        },

        isCheckIDTElement() {
            this.clickOtherFields()
            if (this.isdeleteIDTElementItem == true) {
                this.isdeleteIDTElementItem = false
                this.selectDelectIDTElementItem = []
            } else {
                this.isdeleteIDTElementItem = true
            }
        },
        deleteIDTElement() {
            this.clickOtherFields()
            if (this.isdeleteIDTElementItem == true) {
                this.selectDelectIDTElementItem.forEach(item => {
                    for(let i=0; i<this.element.idtelement.length; i++){
                        if (item.id == this.element.idtelement[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+this.element.idtelement[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/idtetable-'+this.element.idtelement[i].id)
                            }
                        }
                    }
                })

                this.element.idtelement = this.element.idtelement.filter(item => {
                         return this.selectDelectIDTElementItem.indexOf(item) < 0 })

                this.isdeleteIDTElementItem = false
                this.selectDelectIDTElementItem = []
            }
        },
        openIDTElement(idx) {
            this.selTemplateType = this.$store.getters.getImplementationDataType(this.element.uuid)
            this.editIDTElementItem.name = this.element.idtelement[idx].name
            if ( this.element.idtelement[idx].typeref != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.idtelement[idx].typeref)
                }
                this.editIDTElementItem.typeref = { name: this.element.idtelement[idx].typeref, uuid: endLine }
            }
            this.editIDTElementItem.inplace = this.element.idtelement[idx].inplace
            this.editIDTElementItem.desc = this.element.idtelement[idx].desc
        },
        addIDTElement() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.idtelement.some(item => item.id === n)
            }
            this.editIDTElementItem.id = n
            var endLine = null
            if( this.editIDTElementItem.typeref != null) {
                if (this.editIDTElementItem.typeref.uuid != this.element.uuid) {
                    endLine = this.editIDTElementItem.typeref.uuid
                    var isExist = true
                    if (this.$store.getters.getDeleteOpenElement(this.editIDTElementItem.typeref.uuid) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: this.editIDTElementItem.typeref.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editIDTElementItem.typeref.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/idtetable', end:endLine, iscircle:isExist, refNum:4, idxID: this.editIDTElementItem.id})
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/idtetable-'+n, this.element.uuid+'/idtetable', endLine, true, isExist)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                }
                this.editIDTElementItem.typeref = this.editIDTElementItem.typeref.name
            }
            const addObj = Object.assign({}, this.editIDTElementItem);
            this.element.idtelement.push(addObj);
            this.refImplement = n
            this.cancelIDTElement()
        },
        editIDTElement(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id)
            if (endLine != undefined && this.editIDTElementItem.typeref == null) {
                this.deleteLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id)
                this.element.idtelement[idx].typeref = null
            } else if (endLine != undefined && endLine != this.editIDTElementItem.typeref.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id)
                this.newLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id, this.element.uuid+'/idtetable', this.editIDTElementItem.typeref.uuid,false)
                this.element.idtelement[idx].typeref = this.editIDTElementItem.typeref.name
            }else if (endLine == undefined && this.editIDTElementItem.typeref != null && this.editIDTElementItem.typeref.uuid != null) {
                this.newLine(this.element.uuid+'/idtetable-'+this.element.idtelement[idx].id, this.element.uuid+'/idtetable', this.editIDTElementItem.typeref.uuid,false)
                this.element.idtelement[idx].typeref = this.editIDTElementItem.typeref.name
            }

            if (this.refImplement == this.element.idtelement[idx].id) {
                this.deleteOpenElement()
                if (this.editIDTElementItem.typeref != null && this.editIDTElementItem.typeref.uuid != null) {
                    var isExist = true, endLineChang = this.editIDTElementItem.typeref.uuid
                    if (this.editIDTElementItem.typeref.uuid != this.element.uuid) {
                        if (this.$store.getters.getDeleteOpenElement(this.editIDTElementItem.typeref.uuid) == -1) {
                            this.$store.commit('editImplementation', {compo:"drag", uuid: this.editIDTElementItem.typeref.uuid, top: this.element.top + 100, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLineChang, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/idtetable', end:endLineChang, iscircle:isExist, refNum:4, idxID:this.refImplement})
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/idtetable', endLineChang, isExist)
                            document.getElementById(endLineChang+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                    }
                }
            }

            this.element.idtelement[idx].name = this.editIDTElementItem.name
            this.element.idtelement[idx].inplace = this.editIDTElementItem.inplace
            this.element.idtelement[idx].desc = this.editIDTElementItem.desc
            this.cancelIDTElement()
        },
        cancelIDTElement() {
            this.editIDTElementItem = Object.assign({}, this.defaultIDTElementItem)
            this.setactiveUUID()
        },
        setIDTElementSelect() {
            //console.log('setIDTElementSelect   ' + this.isEditingIDTETypeRef)
            if (this.isEditingIDTETypeRef == true) {
                 if (this.editIDTElementItem.typeref != null) {
                    if (this.editIDTElementItem.typeref.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editIDTElementItem.typeref.uuid, element: constant.Implementation_str} )
                        /*document.getElementById(this.editIDTElementItem.typeref.uuid+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        EventBus.$emit('active-element', this.editIDTElementItem.typeref.uuid)*/
                    }
                }
                this.setTemplateTypeList()
                this.isEditingIDTETypeRef = false
            } else {
                this.isEditingIDTETypeRef = true
            }
        },
        clearIDTETypeRef() {
            this.isEditingIDTETypeRef = true
            this.editIDTElementItem.typeref = null
        },

        isCheckTemplateType() {
            this.clickOtherFields()
            if (this.isdeleteTemplateTypeItem == true) {
                this.isdeleteTemplateTypeItem = false
                this.selectDelectTemplateTypeItem = []
            } else {
                this.isdeleteTemplateTypeItem = true
            }
        },
        deleteTemplateType() {
            this.clickOtherFields()
            if (this.isdeleteTemplateTypeItem == true) {
                this.selectDelectTemplateTypeItem.forEach(item => {
                    for(let i=0; i<this.element.templatetype.length; i++){
                        if (item.id == this.element.templatetype[i].id) {
                            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+this.element.templatetype[i].id)
                            if(endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/templateType-'+this.element.templatetype[i].id)
                            }
                        }
                    }
                })

                this.element.templatetype = this.element.templatetype.filter(item => {
                         return this.selectDelectTemplateTypeItem.indexOf(item) < 0 })

                this.isdeleteTemplateTypeItem = false
                this.selectDelectTemplateTypeItem = []
            }
        },
        openTemplateType(idx) {
            this.selTemplateType = this.$store.getters.getImplementationDataType(this.element.uuid)
            if ( this.element.templatetype[idx].typeref != null) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id)
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.templatetype[idx].typeref)
                }
                this.editTemplateTypeItem.typeref = { name: this.element.templatetype[idx].typeref, uuid: endLine }
            }
            this.editTemplateTypeItem.category = this.element.templatetype[idx].category
        },
        addTemplateType() {
            let res = true, n = 0
            while (res) {
                n++
                res = this.element.templatetype.some(item => item.id === n)
            }
            this.editTemplateTypeItem.id = n
            var endLine = null
            if( this.editTemplateTypeItem.typeref != null) {
                if (this.editTemplateTypeItem.typeref.uuid != this.element.uuid) {
                    var isExist = true
                    endLine = this.editTemplateTypeItem.typeref.uuid
                    if (this.$store.getters.getDeleteOpenElement(this.editTemplateTypeItem.typeref.uuid) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: this.editTemplateTypeItem.typeref.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: this.editTemplateTypeItem.typeref.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/templateType', end:endLine, iscircle:isExist, refNum:2, idxID: this.editTemplateTypeItem.id})
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuid+'/templateType-'+n, this.element.uuid+'/templateType', endLine, true, isExist)
                        document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                }
                this.editTemplateTypeItem.typeref = this.editTemplateTypeItem.typeref.name
            }
            const addObj = Object.assign({}, this.editTemplateTypeItem);
            this.element.templatetype.push(addObj);
            this.refTemplate = n
            this.cancelTemplateType()
        },
        editTemplateType(idx) {
            var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id)
            if (endLine != undefined && this.editTemplateTypeItem.typeref == null) {
                this.deleteLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id)
                this.element.templatetype[idx].typeref = null
            } else if (endLine != undefined && endLine != this.editTemplateTypeItem.typeref.uuid) {
                //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                this.deleteLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id)
                this.newLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id, this.element.uuid+'/templateType', this.editTemplateTypeItem.typeref.uuid,false)
                this.element.templatetype[idx].typeref = this.editTemplateTypeItem.typeref.name
            }else if (endLine == undefined && this.editTemplateTypeItem.typeref != null && this.editTemplateTypeItem.typeref.uuid != null) {
                this.newLine(this.element.uuid+'/templateType-'+this.element.templatetype[idx].id, this.element.uuid+'/templateType', this.editTemplateTypeItem.typeref.uuid,false)
                this.element.templatetype[idx].typeref = this.editTemplateTypeItem.typeref.name
            }

            if (this.refTemplate == this.element.templatetype[idx].id) {
                this.deleteOpenElement()
                if (this.editTemplateTypeItem.typeref != null && this.editTemplateTypeItem.typeref.uuid != null) {
                    var isExist = true, endLineChang = this.editTemplateTypeItem.typeref.uuid
                    if (this.editTemplateTypeItem.typeref.uuid != this.element.uuid) {
                        if (this.$store.getters.getDeleteOpenElement(this.editTemplateTypeItem.typeref.uuid) == -1) {
                            this.$store.commit('editImplementation', {compo:"drag", uuid: this.editTemplateTypeItem.typeref.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLineChang, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/templateType', end:endLineChang, iscircle:isExist, refNum:2, idxID:this.refTemplate})
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/templateType', endLineChang, isExist)
                            document.getElementById(endLineChang+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                    }
                }
            }

            this.element.templatetype[idx].category = this.editTemplateTypeItem.category
            this.cancelTemplateType()
        },
        cancelTemplateType() {
            this.editTemplateTypeItem = Object.assign({}, this.defaultTemplateTypeItem)
            this.setactiveUUID()
        },
        setTemplateTypeSelect() {
            if (this.isEditingTemplateType == true) {
                 if (this.editTemplateTypeItem.typeref != null) {
                    if (this.editTemplateTypeItem.typeref.uuid != null) {
                        this.$store.commit('setDetailView', {uuid: this.editTemplateTypeItem.typeref.uuid, element: constant.Implementation_str} )
                    }
                }
                this.setTemplateTypeList()
                this.isEditingTemplateType = false
            } else {
                this.isEditingTemplateType = true
            }
        },
        clearTemplateType() {
            this.isEditingTemplateType = true
            this.editTemplateTypeItem.typeref = null
        },

        setTypeRefSelect() {
            this.clickOtherFields()
            if (this.element.typeref != null) {this.refType = true}
            //if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
                if (endLine == undefined) {
                    endLine = this.$store.getters.getImplementationPath(this.element.typeref)
                }
                if (endLine != null) {
                    if (endLine != this.element.uuid) {
                        var isExist = true
                        if (this.$store.getters.getDeleteOpenElement(endLine) == -1) {
                            this.$store.commit('editImplementation', {compo:"drag", uuid: endLine, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: endLine, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/typeref', end:endLine, iscircle:isExist, refNum:1})
                        this.$nextTick(() => { 
                            EventBus.$emit('new-line', this.element.uuid+'/typeref', endLine, isExist)
                            document.getElementById(endLine+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                    }
                    //this.$store.commit('setDetailView', {uuid: endLine, element: constant.Implementation_str} )
                    /*document.getElementById(endLine+this.location).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    EventBus.$emit('active-element', endLine)*/
                }
            //}
        },
        setTemplateTypeList() {
            this.selTemplateType = this.$store.getters.getImplementationDataType(this.element.uuid)
            this.setactiveUUID()
        },
        setTypeRef(item){
            //console.log(item)
            this.clickOtherFields()
            var isExist = true
            if( this.element.typeref != item.name) {
                var endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
                if (endLine != undefined && endLine != item.uuid) {
                    //기존꺼 삭제해야한다 vuex에서도 삭제하고 mainview에서도 삭제하고 
                    this.deleteLine(this.element.uuid+'/typeref')
                }
                //새로 추가해준다
                this.refType = true
                if (endLine != this.element.uuid) {
                    if (this.$store.getters.getDeleteOpenElement(item.uuid) == -1) {
                        this.$store.commit('editImplementation', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                        isExist = false
                    }
                    this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                    this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/typeref', end:item.uuid, iscircle:isExist, refNum:1})
                    this.$nextTick(() => { 
                        this.newLine(this.element.uuisetViewLineInfod+'/typeref', this.element.uuid+'/typeref', item.uuid, true, isExist)
                        document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                }
                this.element.typeref = item.name
            } else {
                //if (this.$store.getters.getDeleteOpenElement(this.element.uuid)+1 == this.$store.state.openElement.length) {
                    this.refType = true
                    if (item.uuid != this.element.uuid) {
                        if (this.$store.getters.getDeleteOpenElement(item.uuid) == -1) {
                            this.$store.commit('editImplementation', {compo:"drag", uuid: item.uuid, top: this.element.top, left: this.element.left + this.$setPositionLeft} )
                            isExist = false
                        }
                        this.$store.commit('setzIndexVisible', {parent:constant.Implementation_str, uuid: item.uuid, isVisible: true, compo: 'visible', startUUID: this.element.uuid} )
                        this.$store.commit('setViewLineInfo', {start:this.element.uuid+'/typeref', end:item.uuid, iscircle:isExist, refNum:1})
                        this.$nextTick(() => { 
                            this.newLine(this.element.uuid+'/typeref', this.element.uuid+'/typeref', item.uuid, true, isExist)
                            document.getElementById(item.uuid+1).scrollIntoView({ behavior: 'smooth', block: 'start' })
                        })
                    }
                //}
            }
            this.setactiveUUID()
        },
        newTemplateType() {
            this.$store.commit('addElementImplementation', {
                    name: this.$store.getters.getNameImplementation, path: '', input: false,
                    top: this.element.top, left: this.element.left + this.$setPositionLeft, zindex: 10, icon:"mdi-clipboard-outline", validation: false,
                    category:'', namespace:'', arraysize:'', typeemitter:'', traceName: '', trace: [],
                    typeref: null, templatetype:[], desc:'', ddpc:[], idtelement:[],
                })
            EventBus.$emit('add-element', constant.Implementation_str)
            EventBus.$emit('add-element', constant.DateType_str)
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:2} )
        },
        
        setactiveUUID() {
            this.$store.commit('setuuid', {uuid: this.element.uuid} )
            this.$store.commit('editImplementation', {compo:"z", uuid:this.element.uuid, zindex:10} )
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
            this.editARXML.category = this.element.category
            this.editARXML.namespace = this.element.namespace
            this.editARXML.arraysize = this.element.arraysize
            this.editARXML.typeemitter = this.element.typeemitter
            this.editARXML.typeref = this.element.typeref
            this.editARXML.desc = this.element.desc
            this.editARXML.traceName = this.element.traceName
            this.editARXML.templatetype = JSON.parse(JSON.stringify(this.element.templatetype))
            this.editARXML.trace = JSON.parse(JSON.stringify(this.element.trace))
            this.editARXML.ddpc = JSON.parse(JSON.stringify(this.element.ddpc))
            this.editARXML.idtelement = JSON.parse(JSON.stringify(this.element.idtelement))
            this.dialogText= true
        },
        saveARXML() {
            if (this.element.name != this.editARXML.name) {
                this.$store.commit('editImplementation', {compo:"Name", uuid:this.element.uuid, name:this.editARXML.name} )
                if (this.editARXML.name != '') {
                    this.$store.commit('isintoErrorList', {uuid:this.element.uuid, name:this.editARXML.name, path:this.element.path})
                }
            }
            this.element.name = this.editARXML.name
            this.element.category = this.editARXML.category
            this.element.namespace = this.editARXML.namespace
            this.element.arraysize = this.editARXML.arraysize
            this.element.typeemitter = this.editARXML.typeemitter

            var endLine = null, changEndLine = null, isHaveTable = false
            if (this.element.typeref != this.editARXML.typeref) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/typeref')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/typeref')
                }
                changEndLine = this.$store.getters.getImplementationPath(this.editARXML.typeref)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/typeref', this.element.uuid+'/typeref', changEndLine,false)
                }
            }
            this.element.typeref = this.editARXML.typeref
            /*if (this.element.templatetype != this.editARXML.templatetype) {
                endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType')
                if (endLine != undefined) {
                    this.deleteLine(this.element.uuid+'/templateType')
                }
                changEndLine = this.$store.getters.getImplementationPath(this.editARXML.typeref)
                if (changEndLine != null) {
                    this.newLine(this.element.uuid+'/templateType', this.element.uuid+'/templateType', changEndLine,false)
                }
            }
            this.element.templatetype = this.editARXML.templatetype
            */
            this.element.desc = this.editARXML.desc
            this.element.traceName = this.editARXML.traceName

            if (this.editARXML.templatetype.length > 0) {
                this.editARXML.templatetype.forEach(item => {
                    isHaveTable = false
                    for(let n=0; n<this.element.templatetype.length; n++){
                        if (this.element.templatetype[n].id == item.id &&
                            this.element.templatetype[n].typeref == item.typeref ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/templateType-'+item.id)
                        }
                        changEndLine = this.$store.getters.getImplementationPath(item.typeref)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/templateType-'+item.id, this.element.uuid+'/templateType', changEndLine,false)
                        }
                    }
                })
                this.element.templatetype.forEach(item => {
                    isHaveTable = false
                    this.editARXML.templatetype.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/templateType-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.templatetype.length > 0) {
                    this.element.templatetype.forEach(item => {
                    if (item.typeref != null) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/templateType-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/templateType-'+item.id)
                        }
                    }
                })
                }
            }

            if (this.editARXML.ddpc.length > 0) {
                this.editARXML.ddpc.forEach(item => {
                    var isHaveTableC = false, isHaveTableD = false
                    for(let n=0; n<this.element.ddpc.length; n++){
                        if (this.element.ddpc[n].id == item.id) {
                            if (this.element.ddpc[n].compumethod == item.compumethod) {
                                isHaveTableC = true
                            }
                            if (this.element.ddpc[n].dataconstr == item.dataconstr) {
                                isHaveTableD = true
                            }
                        }
                    }
                    if (!isHaveTableC) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/ddpccompu-'+item.id)
                        }
                        changEndLine = this.$store.getters.getCompuMethodPath(item.compumethod)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/ddpccompu-'+item.id, this.element.uuid+'/DDPC', changEndLine,false)
                        }
                    }
                    if (!isHaveTableD) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/ddpcdata-'+item.id)
                        }
                        changEndLine = this.$store.getters.getDataConstrPath(item.dataconstr)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/ddpcdata-'+item.id, this.element.uuid+'/DDPC', changEndLine,false)
                        }
                    }
                })
                this.element.ddpc.forEach(item => {
                    isHaveTable = false
                    this.editARXML.ddpc.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        if (item.compumethod != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/ddpccompu-'+item.id)
                            }
                        }
                        if (item.dataconstr != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/ddpcdata-'+item.id)
                            }
                        }
                    }
                })
            } else {
                if (this.element.ddpc.length > 0) {
                    this.element.ddpc.forEach(item => {
                        if (item.compumethod != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpccompu-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/ddpccompu-'+item.id)
                            }
                        }
                        if (item.dataconstr != null) {
                            endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/ddpcdata-'+item.id)
                            if (endLine != undefined) {
                                this.deleteLine(this.element.uuid+'/ddpcdata-'+item.id)
                            }
                        }
                    })
                }
            }

            if (this.editARXML.idtelement.length > 0) {
                this.editARXML.idtelement.forEach(item => {
                    isHaveTable = false
                    for(let n=0; n<this.element.idtelement.length; n++){
                        if (this.element.idtelement[n].id == item.id &&
                            this.element.idtelement[n].typeref == item.typeref ) {
                            isHaveTable = true
                        }
                    }
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/idtetable-'+item.id)
                        }
                        changEndLine = this.$store.getters.getImplementationPath(item.typeref)
                        if (changEndLine != null) {
                            this.newLine(this.element.uuid+'/idtetable-'+item.id, this.element.uuid+'/idtetable', changEndLine,false)
                        }
                    }
                })
                this.element.idtelement.forEach(item => {
                    isHaveTable = false
                    this.editARXML.idtelement.forEach(edit => {
                        if (edit.id == item.id) {
                            isHaveTable = true
                        }
                    })
                    if (!isHaveTable) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/idtetable-'+item.id)
                        }
                    }
                })
            } else {
                if (this.element.idtelement.length > 0) {
                    this.element.idtelement.forEach(item => {
                    if (item.typeref != null) {
                        endLine = this.$store.getters.getChangeEndLine(this.element.uuid+'/idtetable-'+item.id)
                        if (endLine != undefined) {
                            this.deleteLine(this.element.uuid+'/idtetable-'+item.id)
                        }
                    }
                })
                }
            }

            this.element.templatetype = JSON.parse(JSON.stringify(this.editARXML.templatetype))
            this.element.trace = JSON.parse(JSON.stringify(this.editARXML.trace))
            this.element.ddpc = JSON.parse(JSON.stringify(this.editARXML.ddpc))
            this.element.idtelement = JSON.parse(JSON.stringify(this.editARXML.idtelement))
            this.cancelARXML()
        },
        cancelARXML() {
            this.editARXML = {name:'', category:'', namespace:'', arraysize:'', typeemitter:'', 
                    typeref: null, templatetype:null, desc:'', traceName: '', trace: [], ddpc:[], idtelement:[]}
            this.editTextTemplateArg = { category: null, typeref:null, id: ''}
            this.editTextTrace = { traceref: '', id: ''}
            this.editTextDDPC = { compumethod: null, dataconstr: null, id: ''}
            this.editTextIDTE = { name: '', typeref: null, inplace: null, desc: '', id: '' }
            this.dialogText = false
        },
        newTextTemplateArg() {
            this.editTextTemplateArg = {category: null, typeref:null, id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.templatetype.some(item => item.id === n)
            }
            this.editTextTemplateArg.id = n

            const addObj = Object.assign({}, this.editTextTemplateArg)
            this.editARXML.templatetype.push(addObj);
        },
        deletTextTemplateArg(idx) {
            this.editARXML.templatetype.splice(idx,1)
        },
        newTextTrace() {
            this.editTextTrace = { traceref: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.trace.some(item => item.id === n)
            }
            this.editTextTrace.id = n

            const addObj = Object.assign({}, this.editTextTrace)
            this.editARXML.trace.push(addObj);
        },
        deletTextTrace(idx) {
            this.editARXML.trace.splice(idx,1)
        },
        newTextDDPC() {
            this.editTextDDPC = { compumethod: null, dataconstr: null, id: ''}
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.ddpc.some(item => item.id === n)
            }
            this.editTextDDPC.id = n

            const addObj = Object.assign({}, this.editTextDDPC)
            this.editARXML.ddpc.push(addObj);
        },
        deletTextDDPC(idx) {
            this.editARXML.ddpc.splice(idx,1)
        },
        newTextIDTE() {
            this.editTextIDTE = { name: '', typeref: null, inplace: null, desc: '', id: '' }
            let res = true, n = 0
            while (res) {
                n++
                res = this.editARXML.idtelement.some(item => item.id === n)
            }
            this.editTextIDTE.id = n

            const addObj = Object.assign({}, this.editTextIDTE)
            this.editARXML.idtelement.push(addObj);
        },
        deletTextIDTE(idx) {
            this.editARXML.idtelement.splice(idx,1)
        },

    },
}
</script>