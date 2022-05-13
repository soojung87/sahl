<template>
    <div :id="'main-view'+location"  v-dragscroll="drag" v-on:dragscrollmove="dragBackground()" v-bind:class="[{'grab-bing':'true'},{'main-view':minimaptoolbar},{'minimap-view':!minimaptoolbar}]"
        @mousewheel="onmouseWheel" @mousedown="onmouseDown" @scroll="onScroll">
        <v-main id="sea" v-bind:style="{ transform: 'scale(' + zoom.value + ')' }" ><!--<v-app>에서 바꿈 : v-app으로 하면 뭔가 안에 창이 하나 더생겨서 화면이 늘어나 scroll이 생긴다.-->
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form" 
                v-for="element in SAHLProject[openProjectIndex].DataTypes.CompuMethod"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Compu Method')"
                @resizing="changeElementSize()">
                <CompuMethod :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable> <!-- 화면 분할하면 창마다 scroll이 움직이지 않기 때문에 id값을 바꿔줘야한다-->
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].DataTypes.DataConstr"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Data Constr')"
                @resizing="changeElementSize()">
                <DataConstr :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/>
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].DataTypes.ApplicationArrayDataType"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Application Array')"
                @resizing="changeElementSize()">
                <ApplicationArrayDate :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form" 
                v-for="element in SAHLProject[openProjectIndex].DataTypes.ImplementationDataType"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Implementation')"
                @resizing="changeElementSize()">
                <ImplementationDataType :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>

            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form" 
                v-for="element in SAHLProject[openProjectIndex].Machine.Machine"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Machine')"
                @resizing="changeElementSize()">
                <Machine :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Machine.HWElement"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'HW Element')"
                @resizing="changeElementSize()">
                <HWElement :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Machine.MachineDesign"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Machine Designs')"
                @resizing="changeElementSize()">
                <MachineDesign :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Machine.ModeDeclarationGroup"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Mode Declaration Group')"
                @resizing="changeElementSize()">
                <ModeDeclarationGroup :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Machine.EthernetCluster"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Ethernet Cluster')"
                @resizing="changeElementSize()">
                <EthernetCluster :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>

            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.ProtoMachineMapping"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Process to Machine Mapping Set')"
                @resizing="changeElementSize()">
                <ProcessToMachine :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.SWComponents"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SW Components')"
                @resizing="changeElementSize()">
                <SWComponents :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.Process"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Process')"
                @resizing="changeElementSize()">
                <Process :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.ProcessDesign"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Process Design')"
                @resizing="changeElementSize()">
                <ProcessDesign :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.Executable"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Executable')"
                @resizing="changeElementSize()">
                <Executable :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.StartupConfig"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Startup Config')"
                @resizing="changeElementSize()">
                <StartupConfig :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].AdaptiveApplication.DeterministicClient"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Deterministic Client')"
                @resizing="changeElementSize()">
                <DeterministicClient :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>

            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServiceInterfaceDeployment"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP Service Interface Deployment')"
                @resizing="changeElementSize()">
                <SomeIPService :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/>  <!-- :drag-handle="'.drag-handle'" -->
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.ServiceInterface"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Service Interface')"
                @resizing="changeElementSize()">
                <ServiceInterface :element='element' :isDatailView="false" :minimaptoolbar='minimaptoolbar'/>  <!-- :drag-handle="'.drag-handle'" -->
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.SomeIPClientEvent"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Client')"
                @resizing="changeElementSize()">
                <Client :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServerEvent"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Server')"
                @resizing="changeElementSize()">
                <Server :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.SomeIPClientServiceInstance"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP Client')"
                @resizing="changeElementSize()">
                <SomeIPClient :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServerServiceInstance"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP Server')"
                @resizing="changeElementSize()">
                <SomeIPServer :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.SomeIPServiceInstanceToMachine"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'SomeIP To Machine Mapping')"
                @resizing="changeElementSize()">
                <SomeIPtoMachine :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.ServiceInstanceToPortPrototype"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'To Port Prototype Mapping')"
                @resizing="changeElementSize()">
                <ToPortPrototype :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.RequiredSomeIP"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Required SomeIP')"
                @resizing="changeElementSize()">
                <RequiredSomeIP :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.ProvidedSomeIP"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Provided SomeIP')"
                @resizing="changeElementSize()">
                <ProvidedSomeIP :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>

            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.ErrorDomain"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Error Domain')"
                @resizing="changeElementSize()">
                <APErrorDomain :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.ErrorSet"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Error Set')"
                @resizing="changeElementSize()">
                <APErrorSet :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
            <vue-draggable-resizable :id="element.uuid+location"
                class-name-active="my-active-class"
                class-name="basic-form"
                v-for="element in SAHLProject[openProjectIndex].Service.Error"
                :key="element.uuid" :scale="zoom.value"
                :x="element.left[location]" :y="element.top[location]" :w=400 :h=100 :z='element.zindex'
                :resizable="true" :draggable="true"
                :handles="['mr','ml']" :min-width="400"
                @activated="onActivated(element.uuid)" @deactivated="onDeactivated(element.uuid)"
                @dragging="(left, top) => onElementDrag(element.uuid, left, top, 'Error')"
                @resizing="changeElementSize()">
                <APError :element='element' :isDatailView="false" :viewInfo="null" :minimaptoolbar='minimaptoolbar'/> 
            </vue-draggable-resizable>
        </v-main>
        <div id="wrapper"></div>
    </div>
</template>

<script>
import ServiceInterface from './serviceInterface.vue'
import CompuMethod from './compumethod.vue'
import DataConstr from './dataconstr.vue'
import ApplicationArrayDate from './applicationArrayData.vue'
import ImplementationDataType from './implementationData.vue'
import Machine from '../components/Machine.vue'
import HWElement from '../components/HWElement.vue'
import ModeDeclarationGroup from '../components/ModeDeclarationGroup.vue'
import MachineDesign from '../components/MachineDesign.vue'
import EthernetCluster from '../components/EthernetCluster.vue'
import DeterministicClient from '../components/DeterministicClient.vue'
import Executable from '../components/Executable.vue'
import Process from '../components/Process.vue'
import ProcessDesign from '../components/ProcessDesign.vue'
import ProcessToMachine from '../components/ProcessToMachine.vue'
import StartupConfig from '../components/StartupConfig.vue'
import SWComponents from '../components/SWComponents.vue'
import APErrorDomain from '../components/APErrorDomain.vue'
import APErrorSet from '../components/APErrorSet.vue'
import APError from '../components/APError.vue'
import Client from '../components/ClientEventG.vue'
import Server from '../components/Server.vue'
import SomeIPClient from '../components/SomeIPClient.vue'
import SomeIPServer from '../components/SomeIPServer.vue'
import SomeIPtoMachine from '../components/SomeIPtoMachineMapping.vue'
import SomeIPService from '../components/SomeIPService.vue'
import ToPortPrototype from '../components/ToPortPrototype.vue'
import RequiredSomeIP from '../components/RequiredSomeIP.vue'
import ProvidedSomeIP from '../components/ProvidedSomeIP.vue'

import { EventBus } from '../main'
import LeaderLine from 'leader-line-vue'
import constant from "../store/constants.js"

export default{
    props: ['minimaptoolbar', 'location'],
    components:{CompuMethod, DataConstr, ApplicationArrayDate, ImplementationDataType, 
                SomeIPService, ServiceInterface, Client, Server,
                SomeIPClient, SomeIPServer, SomeIPtoMachine, ToPortPrototype, RequiredSomeIP, ProvidedSomeIP,
                APErrorDomain, APErrorSet, APError,
                Machine, HWElement, ModeDeclarationGroup, MachineDesign, EthernetCluster,
                DeterministicClient, Executable, Process, ProcessDesign, ProcessToMachine, StartupConfig, SWComponents},
    computed: {
        SAHLProject() {
            return this.$store.state.SAHLProject
        },
        openProjectIndex() {
            return this.$store.state.openProjectIndex
        },
        navigatorList() {
            return this.$store.state.navigatorList
        },
        connectionLine() {
            return this.$store.state.connectionLine
        },
        activeUUID() {
            return this.$store.state.activeUUID
        },
        setting() {
            return this.$store.state.setting
        },
        isInputFileComplate() {
            return this.$store.state.isInputFileComplate
        },
        visibleDetailView() {
            return this.$store.state.visibleDetailView
        },
        visibleLine() {
            return this.$store.state.visibleLine
        },
        numPanes() {
            return this.$store.state.numPanes
        },
        selectScreen() {
            return this.$store.state.selectScreen
        }
    },
    data() {
        return {
            zoom: {
                min: 0.3,
                max: 2,
                value: this.$store.state.setting.zoomMain,
                step: 0.05,
            },
            drag: true, //true: 배경 움직임, false: diagram움직임
            connections: [],
            appendLine: [],
        }
    },
    watch: {
        setting(value) {
            //console.log('// '+value.zoomMain)
            this.zoom.value = value.zoomMain
            this.$nextTick(() => {
                this.changeMinimapView()
                //console.log('wheel')
                setTimeout(() => {this.moveline()}, 200) //선이 똑바로 그려지지가 않아서 한타이밍 늦게 느려주게 구현
            })
        },
        isInputFileComplate(value) {
            //Input file한뒤에 그림이 그려지기 전에 선을 그리려고 하니 에러 
            //console.log(this.connections)
            //console.log(value)
            if (value) {
                this.$nextTick(() => {
                    console.log('updata')
                    this.$store.commit('checkLineInputXml')
                    this.$store.commit('setInputFileComplate')
                })
            }
        },
        visibleLine(val) {
            //console.log('visibleLine   '+val)
            if(this.minimaptoolbar && this.location == '1') {
                if (val) {
                    this.connections.forEach( item => {
                        item.show()
                    })
                } else {
                    this.connections.forEach( item => {
                        item.hide()
                    })
                }
            }
        },
        numPanes() {
            //console.log(val)
            this.changeMinimapView()
            this.$nextTick(() => {
                this.moveline()
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.changeMinimapView()
        })
        EventBus.$on('new-element', (uuid) => {
            this.$nextTick(() => {
                //console.log('new-element')
                document.getElementById(uuid+'1').scrollIntoView(true)
            })
        })
        EventBus.$on('new-line', (startdiagram, enddiagram) => {
            console.log('new-line '+ startdiagram + '  //  '+ enddiagram)
            this.addLine(startdiagram, enddiagram)
            this.$nextTick(() => { // 다 그려진뒤에 move해줘야지 그려지기전에 하게되면 선이 이상한 곳에 가서 그려져있음
                this.setanimationLine(this.$store.state.activeUUID, true)
                this.moveline()
            })
        });
        EventBus.$on('delete-line', (numLine) => {
            console.log('delete-line'+ numLine)
            if(this.minimaptoolbar && this.location == '1') {
                if (numLine == 'all') {
                    this.connections.forEach( item => {
                        item.remove()
                    })
                    this.connections = []
                } else {
                    document.body.appendChild(this.appendLine[numLine])
                    this.connections[numLine].remove()
                    this.connections.splice(numLine, 1)
                    this.appendLine.splice(numLine, 1)
                    console.log(this.appendLine)
                }
            }
        });
        EventBus.$on('copy-line', (uuid, endLine, index, tab, tabId) => {
            if(this.minimaptoolbar && this.location == '1') {
                var startLine
                console.log(this.connections[index].start.id)
                if(this.connections[index].start.id.indexOf('/') !== -1) {
                    if(tab != null) {
                        console.log('/////////////////////')
                            startLine = uuid+'/'+tabId
                    } else {
                        var copyId = this.connections[index].start.id.split('/')
                        startLine = uuid+'/'+copyId[1]
                    }
                } else { //titlabar 접혀있을때 copy하면 startLine이 uuid값만 가지고 있기때문에 다 그렇게 복사됨 접었다 열면 제자리 찾아감
                    startLine = uuid
                }
                this.$nextTick(() => { // 다 그려진뒤에 move해줘야지 그려지기전에 하게되면 선이 이상한 곳에 가서 그려져있음
                    this.addLine(startLine, endLine)
                    this.moveline()
                })
            }
        })
        EventBus.$on('setLineActive', (uuid, isactive) => {
            //console.log(uuid+'   / '+ isactive)
            this.setanimationLine(uuid, isactive)
        })
        EventBus.$on('drawLine', () => { //v-hover 일때 쓰임
            this.$nextTick(() => {  // 접혔던것들 다 그리고나서 그려줘야지 안그러면 선이 이동안한것 처럼 보인다
                this.moveline()
            })
        })
        EventBus.$on('drawLineTitleBar', (uuid, isopen) => { //title bar 일때 쓰임
            if (!isopen) {
                this.drawLineCloseTitlebar(uuid)
            } else {
                this.drawLineOpenTitlebar(uuid)
            }
            this.$nextTick(() => {  // 접혔던것들 다 그리고나서 그려줘야지 안그러면 선이 이동안한것 처럼 보인다
                this.setanimationLine(uuid, true)
                this.moveline()
            })
        })
        EventBus.$on('changeLine-someipService', (item,uuid, idx,tabname, str1, str2) => {  //하나의 element에 tab이 2개가 있을 경우 item으로 구분해줘야한다.
            this.$nextTick(() => { 
                this.drawLinTabMoveSomeIPServeice(item,uuid, idx,tabname, str1, str2) //ethernet Cluster에서 conditional name와 channel name이 필요해 str1 str2로 나뉨
            })
        })
        EventBus.$off('goElement'); //중복호출되어 같이 정의해줘야 1번 들어온다. 
        EventBus.$on('goElement', (id) => {
            console.log('goElement  '+ this.$store.state.selectScreen)
            document.getElementById(id+this.$store.state.selectScreen).scrollIntoView(true);
            EventBus.$emit('active-element', id)
            this.$store.commit( 'setSelectScreen', {num: 1})
        })
    },
    methods: {
        onActivated(uuid) {
            //console.log('onActivated'+uuid)
            if(!this.minimaptoolbar && this.location == '1') {
                document.getElementById(uuid+this.location).scrollIntoView(true)
            }
            this.isMouseDiagram = true
            EventBus.$emit('active-element', uuid)
            this.drag = false
            this.setanimationLine(uuid, true)
        },
        onDeactivated(uuid) {
            console.log('onDeactivated'+ uuid)
            this.setanimationLine(uuid, false)
            this.isMouseDiagram = false
            EventBus.$emit('active-element', null)
            this.drag = true
        },
        onElementDrag(uuid, left, top, ele) {
            var editStr = null
            if (ele == constant.CompuMethod_str){
                editStr = 'editCompuMehtod'
            } else if (ele == constant.DataConstr_str) {
                editStr = 'editDataConstr'
            } else if (ele == constant.ApplicationArray_str) {
                editStr = 'editApplicationArray'
            } else if (ele == constant.Implementation_str) {
                editStr = 'editImplementation'
            } else if (ele == constant.Machine_str) {
                editStr = 'editMachine'
            } else if (ele == constant.MachineDesigne_str) {
                editStr = 'editMachineDesign'
            } else if (ele == constant.EthernetCluster_str) {
                editStr = 'editEthernetCluster'
            } else if (ele == constant.ModeDeclarationGroup_str) {
                editStr = 'editModeDeclarationGroup'
            } else if (ele == constant.HWElement_str) {
                editStr = 'editHWElement'
            } else if (ele == constant.ProcesstoMachineMapping_str) {
                editStr = 'editProtoMachineMapping'
            } else if (ele == constant.SWComponents_str) {
                editStr = 'editSWComponents'
            } else if (ele == constant.Process_str) {
                editStr = 'editProcess'
            } else if (ele == constant.ProcessDesign_str) {
                editStr = 'editProcessDesign'
            } else if (ele == constant.Executable_str) {
                editStr = 'editExecutable'
            } else if (ele == constant.StartupConfig_str) {
                editStr = 'editStartupConfig'
            } else if (ele == constant.DeterministicClient_str) {
                editStr = 'editDeterministicClien'
            } else if (ele == constant.SomeIPServiceInterfaceDeployment_str) {
                editStr = 'editSomeIPService'
            } else if (ele == constant.ServiceInterface_str) {
                editStr = 'editServiceInterface'
            } else if (ele == constant.Client_str) {
                editStr = 'editClient'
            } else if (ele == constant.Server_str) {
                editStr = 'editServer'
            } else if (ele == constant.SomeIPClient_str) {
                editStr = 'editSomeIPClient'
            } else if (ele == constant.SomeIPServer_str) {
                editStr = 'editSomeIPServer'
            } else if (ele == constant.SomeIPToMachineMapping_str) {
                editStr = 'editSomeIPtoMachine'
            } else if (ele == constant.ToPortPrototypeMapping_str) {
                editStr = 'editToPortPrototype'
            } else if (ele == constant.RequiredSomeIP_str) {
                editStr = 'editRequiredSomeIP'
            } else if (ele == constant.ProvidedSomeIP_str) {
                editStr = 'editProvidedSomeIP'
            }  else if (ele == constant.Error_str) {
                editStr = 'editError'
            }  else if (ele == constant.Errorset_str) {
                editStr = 'editErrorSet'
            }  else if (ele == constant.ErrorDomain_str) {
                editStr = 'editErrorDomain'
            }
            document.getElementById(uuid+this.location).scrollIntoView(true)
            this.$store.commit(editStr, {compo:"drag", uuid: uuid, top: top, left: left, location: this.location} )
            this.moveline()
        },
        changeElementSize() {
            console.log('changeElementSize')
            this.moveline()
        },
        moveline() {
            //console.log('moveline')
            if(this.minimaptoolbar && this.location == '1') {
                document.getElementById('wrapper').style.transform = 'none';
                var rectWrapper = document.getElementById('wrapper').getBoundingClientRect();
                document.getElementById('wrapper').style.transform = 'translate(' +
                                (-(rectWrapper.left + document.documentElement.scrollLeft)) + 'px, ' +
                                (-(rectWrapper.top + document.documentElement.scrollTop)) + 'px)';
                this.connections.forEach((connection) => connection.position())
            }
         },
        addLine(start, end) {
            if(this.minimaptoolbar && this.location == '1') {
                this.connections.push (
                    LeaderLine.setLine(document.getElementById(start),  document.getElementById(end), {
                                startPlug: 'disc',
                                endPlug: 'arrow1',
                                startSocket: 'auto',
                                endSocket: 'auto',
                                endPlugSize: 2,
                                color: 'rgba(253, 105, 68, 0.4)',
                                size: 1,
                                hide: !this.$store.state.visibleLine
                }))
                this.appendLine.push(document.querySelector('body>.leader-line:last-of-type'))
                document.getElementById('wrapper').appendChild(this.appendLine[this.appendLine.length-1]);
            }
        },
        setanimationLine(uuid, isactive) {
            if(this.minimaptoolbar && this.location == '1') {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                for (let i=0; i< activeLine.length;i++) {
                    if (isactive && this.zoom.value < 0.6) { 
                        this.connections[activeLine[i]].size = 1
                        this.connections[activeLine[i]].color = 'rgba(253, 105, 68, 0.7)'
                    } else if (isactive) {
                        //this.connections[activeLine[i]].dash = {animation: isactive, len: 8, gap: 13}
                        this.connections[activeLine[i]].size = 2
                        this.connections[activeLine[i]].color = 'rgba(253, 105, 68, 1)'
                    } else {
                        //this.connections[activeLine[i]].dash = false
                        this.connections[activeLine[i]].size = 1
                        this.connections[activeLine[i]].color = 'rgba(253, 105, 68, 0.4)'
                    }
                }
            }
        },
        dragBackground() {
            //console.log('dragBackground')
            //this.moveline()
        },
        onmouseDown() { //edit dialog했을경우 임의로 activeuuid 값을 넣어줬기 때문에 배경을 누르면 toolbar색이 변하지 않는 이슈
            //console.log('onmouseDown')
            if ((this.isMouseDiagram == false || this.isMouseDiagram == undefined) && this.drag == true) {
                if (this.$store.state.activeUUID != null) {
                    var treeitem = Object.values(this.$store.getters.gettreeviewitems)
                    var arrelement = treeitem.find(data =>  data.uuid === this.$store.state.activeUUID)
                    // 기존에 setuuid에 가지고 있던 값 z값 낮춰줘야한다.
                    this.setanimationLine(this.$store.state.activeUUID, false)
                    this.$store.commit('setzIndex', {parent:arrelement.parent, uuid: this.$store.state.activeUUID, zindex: 2} )
                    this.$store.commit('setuuid', {uuid: null} )
                }
            }
        },
        onScroll() { //wheel을 빠르게 움직이면 line이 제대로 안그려지는데 여기에 moveline 넣으면 잘작동함
            //console.log('onScroll')
            this.changeMinimapView()
            this.moveline()
        },
        changeMinimapView() {
            //console.log('changeMinimapView')
            if (this.location == '1') {
                var bodyWidth = document.getElementById('main-view1').scrollWidth+200 //+200해주면 minimap에서 우측으로 갈때 element가 작게 보이는게 좀 나아짐
                var bodyHeight
                if(this.zoom.value < 0.75) {
                    bodyHeight = document.getElementById('main-view1').scrollHeight +100
                } else {
                    bodyHeight = document.getElementById('main-view1').scrollHeight
                }
                var realScaleX = document.getElementsByClassName('mini-map')[0].clientWidth /bodyWidth
                var realScaleY = document.getElementsByClassName('mini-map')[0].clientHeight /bodyHeight

                document.getElementsByClassName('minimap-view')[0].style.transform = `scale(${realScaleX}, ${realScaleY})`
                if(this.zoom.value < 0.75) { // minimap안에서 보여질때, 화면에서 왼쪽으로 이동시 minimap에 다 나타나지 않아서 설정해줌
                    document.getElementsByClassName('minimap-view')[0].style.width = (100 * (realScaleX+0.9-this.zoom.value)) + '%'
                } else {
                    document.getElementsByClassName('minimap-view')[0].style.width = (100 * realScaleX) + '%'
                }
                document.getElementsByClassName('minimap-view')[0].style.height = (100 * realScaleY) + '%'
            }
        },
        onmouseWheel(e) {
            //console.log('onmouseWheel   '+ e.shiftKey)
            //this.moveline()
            if (!e.shiftKey) {
                return
            }
            e.preventDefault()
            var scale 
            if (e.deltaY < 0) {
                scale = this.zoom.value >= this.zoom.max ? this.zoom.max : this.zoom.value + this.zoom.step;
            } else  if (e.deltaY > 0) {
                scale = this.zoom.value <= this.zoom.min ? this.zoom.min : this.zoom.value - this.zoom.step;
            }
            this.$store.commit('setZoomInOut', {valueMain: scale, valueDetail: null})
            // this.$nextTick(() => {
            //     this.changeMinimapView()
            //     //console.log('wheel')
            //     setTimeout(() => {this.moveline()}, 200) //선이 똑바로 그려지지가 않아서 한타이밍 늦게 느려주게 구현
            // })
            /*if (e.deltaY < 0) {
                this.zoom.value = this.zoom.value >= this.zoom.max ? this.zoom.max : this.zoom.value + this.zoom.step;
            } else  if (e.deltaY > 0) {
                this.zoom.value = this.zoom.value <= this.zoom.min ? this.zoom.min : this.zoom.value - this.zoom.step;
            }
            */
            /*
            console.log(e.pageX +'  /  '+ e.pageY +'  /  '+e.clientX +'  /  '+e.clientY)
            var delta = e.delta || e.wheelDelta;
            var mainviewE = document.getElementById("main-view")
            if (delta === undefined) {
                delta = e.originalEvent.detail;
            }
            delta = Math.max(-1,Math.min(1,delta))
            var offset = {x: mainviewE.scrollLeft, y: mainviewE.scrollTop};
            var ele_loc = {x: e.pageX + offset.x-200, y: e.pageY + offset.y-72}
            var scale = this.zoom.value
            var zoom_point = {x:ele_loc.x/scale, y: ele_loc.y/scale}
            scale += delta*this.zoom.step * scale
            scale = Math.max(this.zoom.min,Math.min(this.zoom.max,scale))

            var zoom_point_new = {x:zoom_point.x * scale, y: zoom_point.y * scale}
            var newScroll = {x: zoom_point_new.x - e.pageX+200, y: zoom_point_new.y - e.pageY+72}
            //document.getElementById('sea').style.transform = `scale(${scale}, ${scale})`  
            mainviewE.scrollLeft = newScroll.x
            mainviewE.scrollTop = newScroll.y
            this.zoom.value = scale
            this.$store.commit('setZoomInOut', {valueMain: this.zoom.value, valueDetail: null})
            this.$nextTick(() => {
                this.changeMinimapView()
                console.log('wheel')
                setTimeout(() => {this.moveline()}, 200) //선이 똑바로 그려지지가 않아서 한타이밍 늦게 느려주게 구현
            })
            */
        },
        changeLineAppendChild(idx) {
            this.appendLine.splice(idx, 1, document.querySelector('body>.leader-line:last-of-type'))
            document.getElementById('wrapper').appendChild(this.appendLine[idx])
        },
        changeConnectionLineSplic(idx, start) {
            this.connections.splice(idx, 1, LeaderLine.setLine(document.getElementById(start),  document.getElementById( this.$store.getters.getEndLineInfo(idx)), {
                                        startPlug: 'disc',
                                        endPlug: 'arrow1',
                                        startSocket: 'auto',
                                        endSocket: 'auto',
                                        endPlugSize: 2,
                                        color: 'rgba(253, 105, 68, 0.4)',
                                        size: 1,
                                        hide: !this.$store.state.visibleLine
            }))
        },
        drawLineCloseTitlebar(uuid) {
            if(this.minimaptoolbar && this.location == '1') {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                for (let i=0; i< activeLine.length;i++) {
                    console.log(activeLine)
                    document.body.appendChild(this.appendLine[activeLine[i]])
                    this.connections[activeLine[i]].remove()
                    this.changeConnectionLineSplic(activeLine[i], uuid)
                    this.changeLineAppendChild(activeLine[i])         
                }
            }
        },
        drawLineOpenTitlebar(uuid) {
            if(this.minimaptoolbar && this.location == '1') {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                var startLine
                for (let i=0; i< activeLine.length;i++) {
                    startLine = this.$store.getters.getStartLineInfo(activeLine[i]) 
                    var startUUID = startLine.split('/')
                    var tableLine = startUUID[1].split('-')
                    //tab이 아닌 애들만 선그리기
                    if (!(tableLine[0] == 'field' || tableLine[0] == 'event' || tableLine[0] == 'argtable' || tableLine[0] == 'methoderrors' || tableLine[0] == 'methoderror' ||
                        tableLine[0] == 'requiredEventG' || tableLine[0] == 'requiredClient' || tableLine[0] == 'providEventG' || tableLine[0] == 'providServer' ||
                        tableLine[0] == 'fgcontext' || tableLine[0] == 'fgtarget' || tableLine[0] == 'processresorce' || tableLine[0] == 'processstartup' ||
                        tableLine[0] == 'comconet')) {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tableLine[0] == 'ddpccompu' || tableLine[0] == 'ddpcdata'){ //implementation에서 table에 ref가 두개라..
                            tableLine[0] = 'DDPC'
                        } 
                        this.changeConnectionLineSplic(activeLine[i], uuid+'/'+tableLine[0])
                        this.changeLineAppendChild(activeLine[i]) 
                    }
                }
            }
        },
        drawLinTabMoveSomeIPServeice(item, uuid, idx, tabname, str1, str2) {
            //console.log('drawLinTabMoveSomeIPServeice')
            if(this.minimaptoolbar && this.location == '1') {
                var activeLine = this.$store.getters.getactiveLine(uuid)
                var startLine
                for (let i=0; i< activeLine.length;i++) {
                    startLine = this.$store.getters.getStartLineInfo(activeLine[i]) 
                    var startUUID = startLine.split('/')
                    var tableLine = startUUID[1].split('-')
                    if (tableLine[0] == 'field' && item == 'field') {
                        //console.log('/field')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]){
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/fieldtab'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/field')
                        }
                        this.changeLineAppendChild(activeLine[i])
                    } else if (tableLine[0] == 'event' && item == 'event') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        //console.log('/event')
                        if(idx == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/eventtab'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/event')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'argtable' ) {
                        //console.log('/argtable')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/argtable'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methods')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'methoderrors') {
                        //console.log('/methoderrors')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methoderrors'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methods')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'methoderror') {
                        //console.log('/methoderror')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methoderror'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/methods')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'requiredEventG') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredEventG'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'requiredClient') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredClient'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/requiredE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'providEventG') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providEventG'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'providServer') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providServer'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/providE')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'fgcontext') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/fgtable'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'fgtarget') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/fgtable'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'processresorce') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processresorce'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'processstartup') {
                        //console.log('processstartup')
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[1]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processstartup'+tabname)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/processStarupC')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'comconet' && item == 'connector') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(idx == tableLine[2] && tabname == tableLine[3]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/comconet-'+str1+'-'+str2)
                        } else if (idx != tableLine[2] && tabname == tableLine[3]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/channel'+str2)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/conditional')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'comconet' && item == 'channel') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        if(tabname == tableLine[3]) {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/channel'+str1)
                        } else {
                            this.changeConnectionLineSplic(activeLine[i], uuid+'/conditional')
                        }
                        this.changeLineAppendChild(activeLine[i]) 
                    } else if (tableLine[0] == 'comconet' && item == 'conditional') {
                        document.body.appendChild(this.appendLine[activeLine[i]])
                        this.connections[activeLine[i]].remove()
                        this.changeConnectionLineSplic(activeLine[i], uuid+'/conditional')
                        this.changeLineAppendChild(activeLine[i]) 
                    }
                }
                console.log(this.appendLine)
                this.$nextTick(() => {
                    this.setanimationLine(uuid, true)
                    this.moveline()
                })
            }
        },
    },
}
</script>

<style>
.main-view {
    width: 100%;
    height: 100%;
    white-space: nowrap; /* 줄바꿈을 하지 않아서 가로 스크롤이 생기게 해준다. */
    overflow: auto;
}

.basic-form {
    cursor: pointer;
    position: absolute; /* 이게 없으면 z값이 이상해짐 나중에 생긴게 z값이 가장 크게됨 */
}

.main-view::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.main-view::-webkit-scrollbar-track {
  background-color: transparent;
}
.main-view::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: gray;
}
.main-view::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

div /* 텍스트를 마우스로 드래그하는 것을 방지하는 CSS */
{
  -ms-user-select: none;  /*익스플로러 */
  -moz-user-select: none; /*파이어폭스 */
  -khtml-user-select: none; /**/
  -webkit-user-select: none; /*크롬, 사파리 */
  user-select: none;
} 
</style>