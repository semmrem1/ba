<template>
    <v-container class="pt-4">
        <v-row class="justify-center">

            <!-- <v-skeleton-loader
            class="mx-auto"
            width="300"
            type="card"
            ></v-skeleton-loader> -->


            <!-- Card -->
            <v-card class="ma-0 pa-2" width="90%" max-width="600px" elevation="3">
                <v-row>
                    <v-col class="pl-6 pr-0" cols="6" sm="4">
                        <v-avatar size="150" tile>
                            <v-img src="https://images.unsplash.com/photo-1576673442511-7e39b6545c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=954&q=80"></v-img>
                        </v-avatar>
                    </v-col>
                </v-row>
                    <v-row class="pl-6">
                        <v-btn outlined small color="green">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*"/>
                    </v-row>
                <!-- Form -->
                <!-- v-model="valid" -->
                <v-form ref="form" lazy-validation class="px-3 pt-0">

                    <v-card-title class="pl-0 pb-2">Obstaum:</v-card-title>

                        <v-text-field class="py-0" color="green" :rules="treenameRules" label="Name" v-model="treename"></v-text-field>
                        <v-combobox color="green" label="Typ/Sorte" :items="types"></v-combobox>

                    <!-- ### ERNTE ### -->
                    <v-card-title class="pl-0 pt-0 pb-2">Ernte:</v-card-title>
                    
                    <v-div v-for="(line, index) in lines" :key="index">
                       <v-card class="my-4 pa-4">
                       <!-- Datum von -->
                       <!-- <v-card-title class="subtitle-2 pt-4 pa-0">Von:</v-card-title> -->
                       
                            <v-row class="py-0">
                                <v-col class="py-0" cols="6" sm="3">
                                    <v-menu
                                        v-model="menu"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        color="green"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="dateFormatted"
                                            label="Von"
                                            @blur="date = parseDate(dateFormatted)"
                                            color="green"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="dateFrom" :rules="dateRules" color="green" @input="menuFrom = true"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class="py-0" cols="6" sm="2">
                                    <v-text-field suffix="Uhr" color="green" v-model="time" :rules="timeRules" placeholder="12:00"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="0" sm="2">

                                </v-col>
                                <!-- Datum bis -->
                                <v-col class="py-0" cols="6" sm="3">
                                        <v-menu
                                            v-model="menu"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            color="green"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                v-model="dateFormatted"
                                                label="Bis"
                                                @blur="date = parseDate(dateFormatted)"
                                                color="green"
                                                v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="dateUntil" :rules="dateRules" color="green" @input="menuUntil = true"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col class="py-0" cols="6" sm="2">
                                        <v-text-field suffix="Uhr" color="green" v-model="time" :rules="timeRules" placeholder="12:00"></v-text-field>
                                    </v-col>
                            </v-row>

                            <!-- Menge -->
                            <v-row>
                                <v-col class="pt-0" cols="6" sm="3">
                                    <v-text-field  color="green" :rules="avQuantityRules" v-model="avQuantity" placeholder="10" label="Menge" suffix="kg"></v-text-field>
                                </v-col>
                                <v-col class="pt-0" cols="6" sm="4">
                                    <v-combobox v-model="line.repeat" :items="items" color="green" label="Wiederkehrend"></v-combobox>
                                </v-col>
                                <!-- <v-col class="pt-0" cols="0">
                                </v-col> -->
                                    <v-col class="pt-0" cols="6" sm="4">
                                        <v-radio-group v-model="radios">
                                            <v-radio color="green" value="abholen" label="zum abholen"></v-radio>
                                            <v-radio color="green" value="ernten" label="zum ernten"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                            </v-row>


                              <v-text class="font-weight-bold">Addresse:</v-text>
                                <v-row>
                                    <v-col cols="9">
                                        <v-text-field class="py-0" color="green" label="Strasse" :rules="streetRules" v-model="line.street"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field class="py-0" color="green" label="Nr." :rules="streetnumberRules" v-model="line.streetnumber"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="py-0" cols="3">
                                        <v-text-field class="py-0" color="green" label="PLZ" :rules="postcodeRules" v-model="line.postcode"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0" cols="9">
                                        <v-text-field class="py-0" color="green" label="Ort" :rules="cityRules" v-model="line.city"></v-text-field>
                                    </v-col>
                                </v-row>
                        </v-card>
                        </v-div>
                            
                            <!-- v-if="index + 1 === lines.length"                      -->
                            <v-btn class="px-2 pt-4 pb-8" @click="addLine" color="green" text small><v-icon>mdi-playlist-plus</v-icon>Ernte hinzufügen</v-btn>
                            <v-btn class="px-2 pt-4 pb-8" @click="removeLine(index)" color="grey" text small> <v-icon>mdi-playlist-minus</v-icon>Ernte entfernen</v-btn>

                            <!-- <v-row class="pt-6 pb-0">
                                <v-col>
                                    <v-checkbox v-model="takeCheckbox" color="green" label="zum Abholen"></v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="cropCheckbox" color="green" label="zum Ernten"></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-text-field class="py-0" v-show="takeCheckbox" color="green" label="Hofladen/Markt" v-model="place"></v-text-field>
                            <v-textarea class="pt-0" v-show="cropCheckbox" label="Gewünschte Kontaktaufnahme" color="green" :counter="0" rows="3" clearable v-model="description">Gewünschte Kontaktaufname</v-textarea>                           -->
                        
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
    data() {
        return {   
            index: 0,
            items: [
            'täglich',
            'wöchentlich',
            'monatlich',
            'jährlich',
            ],
            types: [
            'Äpfel',
            'Birnen',
            'Beeren',
            ],
            radios: '',
            treename: '',
            treenameRules: [
                v => !!v || 'Baumname ist erforderlich',
            ],
            dateFrom: new Date().toISOString().substr(0, 10),
            dateUntil: new Date().toISOString().substr(0, 10),
            dateRules: [
                v => !!v || 'Datum ist erforderlich',
            ],
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menuFrom: false,
            menuUntil: false,
            time: '',
            timeRules: [
                v => !!v || 'Zeit ist erforderlich',
            ],
            avQuantity: '',
            avQuantityRules: [
                v => !!v || 'Menge ist erforderlich',
            ],
            street: "",
            streetRules: [
                v => !!v || 'Strasse ist erforderlich',
            ],
            streetnumber: "",
            streetnumberRules: [
                v => !!v || 'Hausnummer ist erforderlich',
            ],
            postcode: "",
            postcodeRules: [
                v => !!v || 'PLZ ist erforderlich',
            ],
            city: "",
            cityRules: [
                v => !!v || 'Ort ist erforderlich',
            ],
            lines: [],
            cropCheckbox: false,
            takeCheckbox: false,
            place: "",
            description: '',

            blockRemoval: true,
            
            
        }
    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
        lines () {
         this.blockRemoval = this.lines.length <= 1
        },
  },

    methods: {
        validate () {
        this.$refs.form.validate()
        },
        reset () {
        this.$refs.form.reset()
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}.${month}.${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        addLine(){
            let checkEmptyLine = this.lines.filter(line => line.number === null)
            if(checkEmptyLine.length >= 1 && this.line.length > 0) {
                return
            }

            this.lines.push({
                street: null,
                streetnumber: null,
                postcode: null,
                city: null

            })
        },
        removeLine(lineId){
            if (!this.blockRemoval){
                this.lines.splice(lineId, 1)
            }
        }


    },
    mounted(){
        this.addLine()
    }
    
    
} 


</script>