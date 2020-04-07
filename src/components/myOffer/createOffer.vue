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
                    <v-col class="pl-6 pr-0">
                        <v-avatar size="150" tile>
                            <v-img src="https://images.unsplash.com/photo-1576673442511-7e39b6545c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=954&q=80"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col justify-center>
                        <v-btn outlined small color="green">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*"/>
                    </v-col>
                </v-row>
                <!-- Form -->
                <v-form ref="form" v-model="valid" lazy-validation class="px-3 pt-6">

                    <v-card-title class="pl-0 pb-2">Obstaum:</v-card-title>

                        <v-text-field class="py-0" color="green" :rules="treenameRules" label="Baumname" v-model="treename"></v-text-field>

                       <v-card-title class="pl-0 pb-2">Verfügbare Ernte:</v-card-title>
                       <v-row class="pt-4">
                                <v-col cols="3">
                                    <v-menu
                                        v-model="menu2"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        color="green"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="dateFormatted"
                                            label="Datum der Ernte"
                                            @blur="date = parseDate(dateFormatted)"
                                            color="green"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" color="green" @input="menu2 = true"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field suffix="Uhr" color="green" placeholder="12:00"></v-text-field>
                                </v-col>
                                <v-col cols="4">

                                </v-col>
                                <v-col cols="2">
                                    <v-text-field  color="green" :rules="avQuantityRules" v-model="avQuantity" label="Menge" suffix="kg"></v-text-field>
                                </v-col>
                            </v-row>


                        <v-text class="font-weight-bold">Abholort:</v-text>
                            <v-div v-for="(line, index) in lines" :key="index">
                                <v-row>
                                    <v-col cols="9">
                                        <v-text-field class="py-0" color="green" label="Strasse" v-model="line.street"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field class="py-0" color="green" label="Nr." v-model="line.streetnumber"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="py-0" cols="3">
                                        <v-text-field class="py-0" color="green" label="PLZ" v-model="line.plz"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0" cols="9">
                                        <v-text-field class="py-0" color="green" label="Ort" v-model="line.location"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-div>
                            <!-- v-if="index + 1 === lines.length"                      -->
                            <v-btn rounded class="pa-0" @click="addLine" color="green" text small><v-icon>mdi-playlist-plus</v-icon>Addresse hinzufügen</v-btn>
                            <v-btn rounded @click="removeLine(index)" color="grey" text small> <v-icon>mdi-playlist-minus</v-icon>Addresse entfernen</v-btn>

                            <v-row class="pt-6 pb-0">
                                <v-col>
                                    <v-checkbox v-model="this.takeCheckbox" color="green" label="zum Abholen"></v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="this.cropCheckbox" color="green" label="zum Ernten"></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-text-field class="py-0" color="green" label="Hofladen/Markt" v-model="place"></v-text-field>
                            <v-textarea class="pt-0" label="Gewünschte Kontaktaufnahme" color="green" :counter="0" rows="3" clearable>Gewünschte Kontaktaufname</v-textarea>                          

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
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,
            cropCheckbox: false,
            takeCheckbox: false,

        index: 0,
        lines: [],
        blockRemoval: true,

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
    }
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
                plz: null,
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