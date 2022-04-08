<template>
       <v-dialog v-model='dialogPath' width="600" persistent>
            <v-card>
                <v-card-title class="text-h6 green accent-1"> Select Path  </v-card-title>
                <v-card-text>
                    <br>
                    <v-text-field v-model="editPath" label="New Path" placeholder="String/String/String......" style="height: 45px;" outlined dense class="lable-placeholer-color"></v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-purple" x-small @click="deletPathList" dark> delete </v-btn>
                    </v-card-actions>
                    <v-list shaped >
                        <v-list-item-group v-model="checkSavePath" class="savePath-list">
                            <v-list-item v-for="(item, i) in strSavePath" :key="i" :value="item" dense active-class="deep-purple--text text--accent-4">
                                <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-checkbox :input-value="active" color="deep-purple accent-4"></v-checkbox>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text  @click="savePath" >
                        Save
                    </v-btn>
                    <v-snackbar v-model="snackbar" :timeout="timeout" color="red accent-2">
                        {{ text }}
                         <template v-slot:action="{ attrs }">
                            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                                Close
                            </v-btn>
                        </template>
                    </v-snackbar>
                    <v-btn color="primary" text @click="cancelPath">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>

export default {
    computed: {
        strSavePath() {
            return this.$store.state.strSavePath
        },
        dialogPath: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        path:String
    },
    data() {
        return {
            checkSavePath: [],
            editPath: this.path,
            close: false,
            snackbar: false,
            text: 'Path를 입력 또는 선택해 주세요.',
            timeout: 2000,
        }
    },
    updated() {
        if(this.close) {
            console.log('activated')
            this.editPath = this.path
            this.close = false
        }
    },
    methods: {
        deletPathList() {
            if (this.checkSavePath != null) {
                this.$store.commit('deleteSavePath', {deletePath: this.checkSavePath} )
                this.checkSavePath = []
            }
        },
        savePath() {
            if (this.editPath == '' && this.checkSavePath[0] == null) {
                console.log('////////////////')
                this.snackbar = true
                // editpath 를 작성하거나 checkSavePath하라고 popup 띄어줘라
            } else {
                if (this.editPath != '') {
                    if (this.$store.getters.getSamePathList(this.editPath) < 0) {
                        console.log('~~~~~~')
                        this.$store.commit('setSavePath', {strPath: this.editPath} )
                    }
                    this.$emit("submit", this.editPath)
                } else if (this.checkSavePath != null) {
                    this.$emit("submit", this.checkSavePath)
                } 
                this.cancelPath()
            }
        },
        cancelPath() {
            this.editPath = ''
            this.checkSavePath = []
            this.dialogPath = false
            this.close = true
        },

    },
}
</script>
