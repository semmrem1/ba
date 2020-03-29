<template>
    <v-container class="pt-4">
        <v-row class="justify-center">
            <!-- Card -->
            <v-card class="ma-0 pa-2" width="90%" max-width="600px" elevation="3">
                <v-row>
                    <v-col class="pl-6 pr-0">
                        <v-avatar size="150" tile>
                            <v-img src="https://images.unsplash.com/photo-1576673442511-7e39b6545c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=954&q=80"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col justify-center>
                        <v-btn outlined small color="green">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
                    </v-col>
                </v-row>
                <!-- Form -->
                <v-form class="px-3 pt-6">
                    <v-card-title class="pl-0 pb-2">Obstaum:</v-card-title>
                    <div>
                        <v-text-field class="py-0" color="green" :rules="treenameRules" label="Baumname" v-model="treeame"></v-text-field>
                        <v-row>
                            <v-col class="py-0" cols="3">
                                <v-text-field class="py-0" color="green" :rules="plzRules" label="PLZ" v-model="plz"></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="9">
                                <v-text-field class="py-0" color="green" :rules="locationRules" label="Ort" v-model="location"></v-text-field>
                            </v-col>
                        <v-card-title class="pt-6 pb-2">Verfügbare Ernte:</v-card-title>
                       </v-row>
                            <v-row>
                                <v-col cols="8">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            :rules="dateRules"
                                            v-model="date"
                                            label="Datum der Ernte"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="green" @click="menu = false">Abbrechen</v-btn>
                                            <v-btn text color="green" @click="$refs.menu.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field  color="green" :rules="avQuantityRules" v-model="avQuantity" suffix="kg"></v-text-field>
                                </v-col>
                            </v-row>
                    </div>
                    <v-row class="pt-2">
                        <v-col class="pl-3 pr-1" cols="4">
                            <v-btn class="mx-auto" color="grey darken-1 white--text" outlined @click="reset" width="95%">
                                <v-icon>mdi-autorenew</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="pr-0 pl-0" cols="8">
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" raised @click="validate" width="95%">SPEICHERN</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
        valid: true,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,

        treename: '',
        treenameRules: [
            v => !!v || 'Baumname ist erforderlich',
        ],
        plz: '',
        plzRules: [
            v => !!v || 'PLZ ist erforderlich',
        ],
        location: '',
        locationRules: [
            v => !!v || 'Ort ist erforderlich',
        ],
        dateRules: [
            v => !!v || 'Datum ist erforderlich',
        ],
        avQuantity: '',
        avQuantityRules: [
            v => !!v || 'Menge ist erforderlich',
        ],
        


    }),
    methods: {
        validate () {
        this.$refs.form.validate()
        },
        reset () {
        this.$refs.form.reset()
      },
    }
    
    
} 
</script>