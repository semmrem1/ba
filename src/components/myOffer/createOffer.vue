<template>
    <v-container class="pt-4">
        

            <!-- <v-skeleton-loader
            class="mx-auto"
            width="600"
            type="card"
            ></v-skeleton-loader> -->
        <v-row class="justify-center">
            <!-- Card -->
            <v-card class="ma-0" width="90%" max-width="600px" elevation="3">
                <div class="pa-0 ma-0 image-preview" v-if="imageData.length != 0">
                    <img class="preview" width="100%" :src="imageData">
                </div>
                <div class="mx-4 pt-2">
                    <v-btn width="100%" outlined color="green">
                        <label type="submit" value="submit">Bild auswählen
                            <input type="file" @change="previewImage" accept="image/*" style="display: none">
                        </label>
                    </v-btn>
                </div>
                <!-- <v-btn @click="uploadImage()" outlined >upload Image</v-btn> -->
                <!-- {{imageData}} -->

                <!-- <v-row>
                    <v-col class="pl-6 pr-0" cols="12" xs="12" sm="12" md="4">
                        <v-avatar size="150" tile>
                            <v-img :src="offerImage"></v-img>
                        </v-avatar>
                    </v-col>
                </v-row> -->

                    <!-- <v-row class="pl-6">
                        <v-btn outlined small color="green">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*"/>
                    </v-row> -->

                <!-- Form -->
                <v-form ref="form" lazy-validation class="pa-4 pt-0">
                    <v-alert v-show="successAlert" class="mt-4" type="success" elevation="2" outlined transition="fade-transition">
                                <p class="pa-0 ma-0 font-weight-bold">Speichern erfolgreich!</p></v-alert>
                                <!-- <v-snackbar class="subtitle-1 black-text font-weight-bold" v-model="successAlert" color="green lighten-1" multi-line vertical top>Speichern erfolgreich!
                                   <v-btn color="white" text @click="snackbar = false">OK</v-btn>
                                </v-snackbar> -->
                    <v-alert v-show="errorAlert" class="mt-4" type="error" elevation="2" outlined transition="fade-transition">Speichern fehlgeschlagen! :-( <p>{{alert}}</p> </v-alert>

                        <v-col class="pa-0 ma-0" cols="12">
                            <div>
                                <div class="file-upload-form">

                                    <!-- <v-file-input type="file" @change="previewImage" accept="image/*"></v-file-input> -->				
                                </div>
                            </div>

                            <!-- <v-file-input
                                accept="image/png, image/jpeg, image/bmp, image.jpg"
                                placeholder="Bild auswählen"
                                prepend-icon="mdi-camera"
                                label="Produktbild"
                                type="file"
                                color="green"
                                @change="onFileSelected"
                            ></v-file-input> -->
                            
                        </v-col> 
                                           
                    <v-card-title class="pl-0 pb-3">Obstaum:</v-card-title>
                    <v-card-subtitle class="pl-0 pb-0">Welchen Typ Obst möchtest du inserieren?</v-card-subtitle>

                        <!-- <v-text-field class="py-0" color="green" :rules="treenameRules" label="Name" v-model="treename"></v-text-field> -->
                        <v-select
                        :items="types"
                        name="type"
                        label="Typ*"
                        :rules="categoryRules"
                        v-model="product.category"
                        item-text="name"
                        item-value="uuid"
                        color="green"
                        >
                        </v-select>
                        <!-- {{product.category}} -->
                    <!-- ### ERNTE ### -->
                    
                    
                    <div v-for="(line, index) in lines" :key="index">
                       <v-card class="my-4 mx-0 pa-4">
                        <v-card-title class="pl-0 pt-0 pb-3">Ernte:</v-card-title>
                        <v-card-subtitle class="pl-0 pb-0">Wann und wo kann das Obst geerntet oder abgeholt werden?</v-card-subtitle>
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
                                    <v-text-field  color="green" :rules="avQuantityRules" data-type="decimal" v-model="product.amount" label="Menge*" suffix="kg"></v-text-field>
                                </v-col>
                                <v-col class="pt-0" cols="6" sm="4">
                                    <v-combobox v-model="product.repeat" :items="repeat" color="green" label="wiederkehrend"></v-combobox>
                                </v-col>

                                <!-- <v-col class="pt-0" cols="0">
                                </v-col> -->        
                            </v-row>
                            <v-row> 
                                <v-col class="py-0" cols="6" sm="4" >
                                    <v-checkbox color="green" v-model="product.tobecropped" :rules="checkboxRules" value="true" label="zum Ernten"></v-checkbox>
                                </v-col>
                                <v-col class="py-0" cols="6" sm="4">
                                    <v-checkbox color="green" v-model="product.tobecropped" :rules="checkboxRules" value="false" label="zum Abholen"></v-checkbox>
                                </v-col>
                            </v-row>
                            <!-- <p>{{this.line.amount}}</p> -->
                            

                            <!-- ### Addresse wählen ### -->
                              <!-- <v-text class="font-weight-bold">Addresse:</v-text> -->
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
                                        <span class="font-weight-bold">{{ item.title }}</span>
                                        <span> - </span>
                                         {{ item.street }} {{item.streetnumber}}, {{item.postcode}} {{item.city}}
                                    </template>
                                    <template slot="item" slot-scope='{item}'>
                                        <span class="font-weight-bold">{{item.title }}</span>
                                        <span> - </span>
                                        {{item.street }} {{item.streetnumber}}, {{item.postcode}} {{item.city}}
                                    </template>
                                </v-select>
                                <v-textarea label="Beschreibung" color="green" v-model="product.description" :counter="0"></v-textarea>
                        </v-card>
                        </div>
                                <v-dialog v-model="dialog" max-width="450">
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" class="px-2 mt-2 mb-8" @click="addLocation" color="green" text small><v-icon>mdi-plus</v-icon>Neue Addresse</v-btn>
                                    </template>
                                    <v-card>
                                        <v-toolbar :color="options.color" dark dense flat><v-icon class="pr-3" size="x-large">mdi-plus</v-icon>
                                         <v-card-title class="pl-0 white--text font-weight-bold">Addresse hinzufügen</v-card-title>
                                        </v-toolbar>
                                        <v-alert v-show="errorAlertDialog" class="mt-4 mx-4" type="error" elevation="2" outlined dense transition="fade-transition">Speichern fehlgeschlagen! Addresse möglicherweise ungültig.</v-alert>
                                        
                                            <v-row class="px-4">
                                                <v-row class="px-4">
                                                    <v-col cols="12">
                                                        <v-text-field class="py-0" color="green" label="Name" v-model="offerLocation.title"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="9">
                                                        <v-text-field class="py-0" color="green" label="Strasse*" :rules="streetRules" v-model="offerLocation.street"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="3">
                                                        <v-text-field class="py-0" color="green" label="Nr." v-model="offerLocation.streetnumber"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="px-4">
                                                    <v-col class="py-0" cols="3">
                                                        <v-text-field class="py-0" color="green" label="PLZ*" :rules="postcodeRules" v-model="offerLocation.postcode"></v-text-field>
                                                    </v-col>
                                                    <v-col class="py-0" cols="9">
                                                        <v-text-field class="py-0" color="green" label="Ort*" :rules="cityRules" v-model="offerLocation.city"></v-text-field>
                                                    </v-col>
                                                    <v-col>
                                                        <v-textarea label="Beschreibung" color="green" v-model="offerLocation.description" :counter="0"></v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </v-row>
                                        
                                        <v-card-actions class="pa-4">
                                            <v-btn @click="dialog=false" outlined width="40%" color="grey">Abbrechen</v-btn>
                                        <v-btn color="green darken-1 white--text" raised width="60%" :loading="loadingDialog" :disabled="!isComplete" @click="postLocation()">SPEICHERN</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            <!-- ### ERNTE HINZUFÜGEN ERNTE ENTFERNEN ### -->
                            <!-- <v-btn class="px-2 mt-2 mb-8" @click="addLine" color="green" text small><v-icon>mdi-playlist-plus</v-icon>Ernte hinzufügen</v-btn>
                            <v-btn class="px-2 mt-2 mb-8" @click="removeLine(index)" color="grey" text small> <v-icon>mdi-playlist-minus</v-icon>Ernte entfernen</v-btn> -->
                            

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
            // uuid: "5ead92e50a975a30d776c500",
            imageUuid: "",
            imageData: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
            loader: null,
            loading: false,
            loadingDialog: false,
            loadingImage: false,
            index: 0,
            snackbar: false,
            dialog: false,
            counter: 10,
            options: {
                color: "green",
                width: 290,
            },
            tobecropped: "",
            successAlert: false,
            errorAlert: false,
            errorAlertDialog: false,
            alert: "",
            repeat: [
            'täglich',
            'wöchentlich',
            'monatlich',
            'jährlich',
            ],
            types: [],
            lines: [],
            locations: [],
            location: '',
            radios: '',
            category: '',
            treename: '',
            categoryRules: [
                v => !!v || 'Kategorie ist erforderlich',
            ],
            dateFrom: "",
            dateUntil: "",
            dateRules: [
                v => !!v || 'Datum ist erforderlich',
            ],
            dateFormatted: "",
            menuFrom: false,
            menuUntil: false,
            timeFrom: '',
            timeUntil: '',
            timeRules: [
                v => !!v || 'Zeit ist erforderlich',
            ],
            checkboxRules: [
                v => !!v || 'Angabe ist erforderlich',
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
                repeat: "",
                description: "",
                category: {
                    uuid: ""
                },
                location: {
                    uuid: ""
                },
            },
            offerLocation: {
                street: '',
                streetnumber: '',
                postcode: '',
                city: '',
                description: ''
            },
            cropCheckbox: false,
            takeCheckbox: false,
            place: "",
            description: '',
            blockRemoval: true,
            
            
        }
    },
    mounted() {
        if (localStorage.getItem("token") != null) {
                const url = "/person/"+localStorage.getItem("userUuid")
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                this.$http.get(url, config)
                .then((response) => {
                    if (response.data.status != 401) {
                        this.$store.state.loggedIn.auth = true
                        this.getCategory()
                        this.getLocation()
                        this.addLine()
                        this.addLocation()
                        this.$refs.form.reset()  
                    } else {
                        this.$store.state.loggedIn.auth = false
                        this.$router.push('/login');
                    }
                })
            
        } else {
            this.$store.state.loggedIn.auth = false
            this.$router.push('/login');
        }
    },
    computed: {
    //   computedDateFormatted () {
    //     return this.formatDate(this.date)
    //   },
        isComplete(){
            return this.offerLocation.street && this.offerLocation.postcode && this.offerLocation.city
        },
        offerImage(){
            return `data:image/*;base64, ${this.$store.state.createOffer.image}`
        }
    },
    watch: {
        lines () {
            this.blockRemoval = this.lines.length <= 1
        },
        
  },
    methods: {
        getCategory(){
            const url = "/category";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.get(url, config)
        .then((response) => {
            console.log(response)
            this.types = response.data
        })
        .catch((error) => {
            this.loading = false
            console.log(error.response)
        })
        },
        getLocation(){
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            const locationUrl = "/person/"+localStorage.getItem("userUuid")+"/location"
            this.$http.get(locationUrl, config)
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
        uploadImage(){
            this.loadingImage = true
            const url = "/product/"+this.imageUuid+"/picture/add";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            const fd = new FormData();
            fd.append('image', this.picture, this.picture.name)
            console.log(url)
            console.log(fd)
            console.log(config)
            this.$http.post(url, fd, config)
            .then((response) => {
                console.log(response)
                this.loadingImage = false
                // window.location.reload()
            })
            .catch((response) => {
                console.log(response)
            })
        },
        previewImage(event) {
            var input = event.target;
            this.picture = event.target.files[0]
            console.log(this.picture)
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (event) => {
                    this.imageData = event.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            // var input = event.target
            // this.picture = event.target.files[0]
            // console.log(this.picture)
            // if (input.files && input.files[0]) {
            //     var reader = new FileReader();
            //     reader.onload = (event) => {
            //         this.imageData = event.target.files;
            //     }
            //     reader.readAsDataURL(input.files[0]);
            // }
        },
        reset () {
            this.$refs.form.reset()
        },
        // formatDate (date) {
        //     if (!date) return null
        //     const [year, month, day] = date.split('-')
        //     return `${day}.${month}.${year}`
        // },
        // parseDate (date) {
        //     if (!date) return null
        //     const [month, day, year] = date.split('/')
        //     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        // },
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
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            var data =
            {
                owner: {
                    uuid: this.uuid
                },
                category: {
                    uuid: this.product.category
                },
                offers: [{
                    location: {
                        uuid: this.product.location.uuid
                    },
                    amountInKgAvailable: this.product.amount,
                    toBeCropped: this.product.tobecropped,
                    from: this.product.dateFrom,
                    until: this.product.dateUntil,
                    description: this.product.description
                    }
                ]
            }
            this.loading = true
            this.$http.post(url, data, config)
            .then((response) => {
                console.log(response)
                if (response.data.code == "001") {
                    this.loading = false
                    this.$refs.form.reset()
                    this.imageUuid = response.data.uuid
                    this.successAlert = true
                    window.scrollTo(0,0);
                    console.log("SUCCESS postProduct")
                    this.hideAlert()
                    if (this.imageData != "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png") {
                        this.uploadImage()
                    }
                } else if (response.data.code == "002"){
                    console.log(response.data.description)
                    console.log("ERROR with E-Mail of User")
                    this.errorAlert = true
                    window.scrollTo(0,0);
                    this.alert = response.data.description
                } else {
                    console.log(response.data.description)
                    console.log("ERROR with Product")
                    this.errorAlert = true
                    window.scrollTo(0,0);
                    this.alert = response.data.description
                }
                this.loading = false
                this.hideAlert()
            })
            .catch((error) => {
                console.log(error)
                console.log("ERROR")
                this.alert = "Error"
                this.errorAlert = true
                this.loading = false
                this.hideAlert()
                
            })
          }
        },
        postLocation(){
                const url = "/person/"+localStorage.getItem("userUuid")+"/offer/location";
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                var data =
                {
                    title: this.offerLocation.title,
                    street: this.offerLocation.street,
                    streetnumber: this.offerLocation.streetnumber,
                    city: this.offerLocation.city,
                    postcode: this.offerLocation.postcode,
                    description: this.offerLocation.description,
                }
                console.log(data)
                this.loadingDialog = true
                this.$http.post(url, data, config)
                .then((response) => {
                    console.log(response)
                    console.log("SUCCESS")
                    this.successAlert = true
                    this.loadingDialog = false
                    this.dialog = false
                    this.getLocation()
                    this.hideAlert()
                })
                .catch((error) => {
                    console.log(error)
                    console.log("ERROR")
                    this.errorAlertDialog = true
                    this.loadingDialog = false
                    this.hideAlert()
                })
            },
            hideAlert(){
                setTimeout(() => {         
                    this.successAlert = false
                    this.errorAlert = false
            }, 4000);
        }
    },
} 
</script>