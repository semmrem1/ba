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
                    <!-- <v-alert v-show="successAlert" class="mt-4" type="success" elevation="2" outlined transition="fade-transition">
                                <p class="pa-0 ma-0 font-weight-bold">Angebot erfolgreich erstellt!</p></v-alert> -->
                                <v-snackbar class="subtitle-1 black-text font-weight-bold" v-model="successAlert" color="green lighten-1" multi-line vertical top>Angebot erfolgreich erstellt!
                                   <v-btn color="white" text @click="snackbar = false">OK</v-btn>
                                </v-snackbar>
                    <v-alert v-show="errorAlert" class="mt-4" type="error" elevation="2" outlined transition="fade-transition">Speichern fehlgeschlagen! :-(</v-alert>
                    <v-card-title class="pl-0 pb-3">Obstaum:</v-card-title>
                    <v-card-subtitle class="pl-0 pb-0">Was für Obst möchtest du inserieren?</v-card-subtitle>

                        <!-- <v-text-field class="py-0" color="green" :rules="treenameRules" label="Name" v-model="treename"></v-text-field> -->
                        <v-select
                        :items="types"
                        name="type"
                        label="Kategorie*"
                        :rules="categoryRules"
                        v-model="product.category"
                        item-text="name"
                        item-value="uuid"
                        color="green"
                        >
                        </v-select>
                        {{product.category}}
                    <!-- ### ERNTE ### -->
                    <v-card-title class="pl-0 pt-0 pb-3">Ernte:</v-card-title>
                    <v-card-subtitle class="pl-0 pb-0">Wann und wo kann das Obst geerntet oder abgeholt werden?</v-card-subtitle>
                    
                    <v-div v-for="(line, index) in lines" :key="index">
                       <v-card class="my-4 pa-4">
                       <!-- Datum von -->
                       <!-- <v-card-title class="subtitle-2 pt-4 pa-0">Von:</v-card-title> -->
                       
                            <v-row class="py-0">
                                <v-col class="py-0" cols="6" sm="3">
                                    <v-menu
                                        v-model="menuFrom"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        color="green"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="product.dateFrom"
                                            label="Von"
                                            color="green"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="product.dateFrom" :rules="dateRules" color="green" @input="menuFrom = true"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class="py-0" cols="6" sm="2">
                                    <v-text-field suffix="Uhr" color="green" v-model="product.timeFrom" placeholder="12:00"></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="0" sm="2">

                                </v-col>
                                <!-- Datum bis -->
                                <v-col class="py-0" cols="6" sm="3">
                                        <v-menu
                                            v-model="menuUntil"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            color="green"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                v-model="product.dateUntil"
                                                label="Bis*"
                                                :rules="dateRules"
                                                color="green"
                                                v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="product.dateUntil" :rules="dateRules" color="green" @input="menuUntil = true"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col class="py-0" cols="6" sm="2">
                                        <v-text-field suffix="Uhr" color="green" v-model="product.timeUntil" placeholder="12:00"></v-text-field>
                                        
                                    </v-col>
                            </v-row>

                            <!-- Menge -->
                            <v-row>
                                <v-col class="pt-0" cols="6" sm="3">
                                    <v-text-field  color="green" :rules="avQuantityRules" v-model="product.amount" placeholder="10" label="Menge*" suffix="kg"></v-text-field>
                                </v-col>
                                <v-col class="pt-0" cols="6" sm="4">
                                    <v-combobox v-model="line.repeat" :items="repeat" color="green" label="Wiederkehrend"></v-combobox>
                                </v-col>
                                <!-- <v-col class="pt-0" cols="0">
                                </v-col> -->        
                            </v-row>
                            <v-row> 
                                <v-col class="pt-0" cols="6" sm="4">
                                    <v-checkbox color="green" v-model="product.tobecropped" value="true" label="zum ernten"></v-checkbox>
                                </v-col>
                                <v-col class="pt-0" cols="6" sm="4">
                                    <v-checkbox color="green" v-model="product.tobecropped" value="false" label="zum abholen"></v-checkbox>
                                </v-col>
                            </v-row>
                            <!-- <p>{{this.line.amount}}</p> -->
                            

                            <!-- ### Addresse wählen ### -->
                              <v-text class="font-weight-bold">Addresse:</v-text>
                                 <v-select
                                :items="locations"
                                name="type"
                                label="Addresse*"
                                :rules="addressRules"
                                v-model="product.location"
                                item-text="location"
                                item-value="uuid"
                                color="green"
                                return-object
                                >
                                    <template slot="selection" slot-scope='{item}'>
                                        {{item.street }} {{item.streetnumber}}, {{item.postcode}} {{item.city}}
                                    </template>
                                    <template slot="item" slot-scope='{item}'>
                                        {{item.street }} {{item.streetnumber}}, {{item.postcode}} {{item.city}}
                                    </template>
                                </v-select>
                                {{product.location}}
                                {{product.location.uuid}}
                                <!-- ### neue Addresse erstellen ### -->
                                <v-btn class="px-2 pt-4 pb-8" @click="addLocation" color="green" text small><v-icon>mdi-playlist-plus</v-icon>Addresse erstellen</v-btn>

                                <v-row>
                                    <v-col cols="9">
                                        <v-text-field class="py-0" color="green" label="Strasse*" :rules="streetRules" v-model="product.location.street"></v-text-field>

                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field class="py-0" color="green" label="Nr." v-model="product.location.streetnumber"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="py-0" cols="3">
                                        <v-text-field class="py-0" color="green" label="PLZ*" :rules="postcodeRules" v-model="product.location.postcode"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0" cols="9">
                                        <v-text-field class="py-0" color="green" label="Ort*" :rules="cityRules" v-model="product.location.city"></v-text-field>
                                    </v-col>
                                </v-row>
                        </v-card>
                        </v-div>
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
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" raised @click="postProduct()" :loading="loading" width="95%">SPEICHERN</v-btn>
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
            loader: null,
            loading: false,
            index: 0,
            tobecropped: true,
            successAlert: '',
            errorAlert: '',
            repeat: [
            'täglich',
            'wöchentlich',
            'monatlich',
            'jährlich',
            ],
            types: [],
            lines: [],
            location: '',
            offerLocation: '',
            locations: [],
            radios: '',
            category: '',
            treename: '',
            categoryRules: [
                v => !!v || 'Kategorie ist erforderlich',
            ],
            dateFrom: new Date().toISOString().substr(0, 10),
            dateUntil: new Date().toISOString().substr(0, 10),
            dateRules: [
                v => !!v || 'Datum ist erforderlich',
            ],
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menuFrom: false,
            menuUntil: false,
            timeFrom: '',
            timeUntil: '',
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
            addressRules: [
                v => !!v || 'Addresse ist erforderlich',
            ],
            product: {
                dateFrom: "",
                timeFrom: "00:00",
                dateUntil: "",
                timeUntil: "23:59",
                amount: "",
                tobecropped: true,
                category: {
                    uuid: ""
                },
                location: {
                    uuid: ""
                },
            },
            cropCheckbox: false,
            takeCheckbox: false,
            place: "",
            description: '',

            blockRemoval: true,
            
            
        }
    },
    mounted(){
        this.addLine()
        this.addLocation()
        // ### GET Categoryies for Select ###
        const categoryUrl = "/category";
        var config = {headers: {"userid": "5e8c0e8e0a975a541edfda6b"}};
        this.$http.get(categoryUrl, config)
        .then((response) => {
            console.log(response)
            this.types = response.data
        })
        .catch((error) => {
            this.loading = false
            console.log(error.response)
        })
        // ### GET Locations of User for Select ###
        // const locationUrl = "/person/"+ this.person.uuid +"/locationforoffer"
        const locationUrl2 = "/person/5e904f9a0a975a3e6842e63a/location"
        this.$http.get(locationUrl2, config)
        .then((response) => {
            console.log(response)
            this.locations = response.data
            if (response.data.type == "OFFER") {
                this.locations = response.data
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
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
        getCategory(){
            const url = "/category";
        var config = {headers: {"userid": "5e8c0e8e0a975a541edfda6b"}};
        this.$http.get(url, config)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            this.types = response.data
        })
        .catch((error) => {
            this.loading = false
            console.log(error.response)
        })
        

        },
        
        reset () {
            this.$refs.form.reset()
        },
        validate () {
            this.$refs.form.validate()
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
        },
        addLocation(){
            let checkEmptyLine = this.locations.filter(location => location.number === null)
            if(checkEmptyLine.length >= 1 && this.location.length > 0) {
                return
            }

            this.locations.push({
                street: null,
                streetnumber: null,
                postcode: null,
                city: null

            })
        },
        postProduct(){
            if (this.$refs.form.validate()) {
            const url = "/product";
            var config = {headers: {"userid":"5e8c0e8e0a975a541edfda6b"}};
            var data =
            {
                owner: {
                    uuid: "5e8c0e8e0a975a541edfda6b"
                },
                category: {
                    uuid: this.product.category
                },
                offers: [{
                    location: {
                        uuid: this.product.location.uuid
                    },
                    amountInKg: this.product.amount,
                    toBeCropped: this.product.tobecropped,
                    from: this.product.dateFrom,
                    until: this.product.dateUntil 
                    
                    }
                ]

            }
            console.log(data)
            this.loading = true
            this.$http.post(url, data, config)
            .then((response) => {
                console.log(response)
                this.successAlert = true
                this.alert = response.data.description
                this.loading = false
                console.log("run into success")
                this.$refs.form.reset()
            })
            .catch((error) => {
                console.log(error)
                console.log("run into error")
                this.errorAlert = true
                this.loading = false
                
            })
        }
        }


    },
    
    
    
} 


</script>