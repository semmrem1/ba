<template>
    <v-container class="pt-0">
        <v-row class="justify-center">

            <v-progress-linear
                :active="!loaded"
                indeterminate
                absolute
                height="4px"
                color="blue"
                background-opacity = 0.0
            ></v-progress-linear>

        </v-row>
        <v-row class="justify-center pt-4">
            <!-- Card -->
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">
                    <!-- Avatar -->
                    <v-col class="pa-0 ma-0">
                        <div class="pa-0 ma-0 image-preview" v-if="this.$store.state.user.image == null">
                            <img class="preview" width="100%" :src="defaultProfileImage">
                        </div>
                        <div class="pa-0 ma-0 image-preview" v-if="this.$store.state.user.image != null">
                            <img class="preview" width="100%" :src="profileImage">
                        </div>
                    </v-col>
                <v-row>
                    <v-row class="pl-6">
                        <v-col cols="6" xs="6">
                            <v-file-input
                                accept="image/png, image/jpeg, image/bmp, image.jpg"
                                v-model="imageData"
                                placeholder="Bild auswählen"
                                prepend-icon="mdi-camera"
                                label="Profilbild"
                                type="file"
                                color="green"
                                @change="onFileSelected"
                            ></v-file-input>
                        </v-col>

                        <v-col class="pt-6" cols="4" xs="6">
                            <!-- <input type="file" @change="onFileSelected"> -->
                            <v-btn class="mx-auto" color="green darken-1 white--text" :loading="loadingImage" outlined @click="uploadImage">Hochladen</v-btn>
                        </v-col>
                    </v-row>

                 </v-row>

                <v-alert v-show="successAlert" class="mt-4 mx-4" type="success" elevation="2" outlined transition="fade-transition">Änderungen erfolgreich gespeichert!</v-alert>
                <v-alert v-show="successDelete" class="mt-4 mx-4" type="success" elevation="2" outlined transition="fade-transition">Löschen erfolgreich!</v-alert>
                <v-alert v-show="errorAlert" class="mt-4 mx-4" type="error" elevation="2" outlined  transition="fade-transition">Änderungen fehlgeschlagen!</v-alert>
                <v-alert v-show="errorDelete" class="mt-4 mx-4" type="error" elevation="2" outlined  transition="fade-transition">Löschen fehlgeschlagen!</v-alert>
                <v-alert v-show="addressDeleteError" class="mt-4 mx-4" type="error" elevation="2" outlined  transition="fade-transition">Die Heimadresse kann nicht gelöscht werden.</v-alert>
                <!-- Form -->
                <v-form class="px-3 pt-6">
                    <div>
                        <!-- <v-text-field class="py-0" color="green" label="Picture Uuid" disabled v-model="person.picture.uuid"></v-text-field> -->
                        <!-- <v-text-field class="py-0" color="green" label="Image Data" disabled v-model="person.picture.image.data"></v-text-field> -->
                        <!-- <v-text-field class="py-0" color="green" label="uuid" disabled v-model="person.uuid"></v-text-field> -->
                        <!-- <v-text-field class="py-0" color="green" label="personType" disabled v-model="person.personType"></v-text-field> -->
                        <v-text-field class="py-0" color="green" label="Vorname" :readonly="isReadonly" v-model="person.first"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Nachname" :readonly="isReadonly" v-model="person.last"></v-text-field>
                        <!-- <v-text-field class="py-0" color="green" label="E-Mail uuid" disabled v-model="this.person.email.uuid"></v-text-field> -->
                        <v-text-field class="py-0" color="green" label="E-Mail" :readonly="isReadonly" v-model="person.email.email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Optionale E-Mail" :readonly="isReadonly" v-model="person.sndEmail"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Telefon" :readonly="isReadonly" v-model="person.cell"></v-text-field>
                        

                    </div>
                    <div class="pt-7">
                        <!-- <v-row>
                            <v-col>
                                <v-text-field class="py-0" color="green" label="location uuid" disabled="" v-model="this.person.location.uuid"></v-text-field>
                            </v-col>
                        </v-row> -->


                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse" :readonly="isReadonly" v-model="person.location.street"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nr." :readonly="isReadonly" v-model="person.location.streetnumber"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="py-0" cols="3">
                                <v-text-field class="py-0" color="green" label="PLZ" :readonly="isReadonly" v-model="person.location.postcode"></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="9">
                                <v-text-field class="py-0" color="green" label="Ort" :readonly="isReadonly" v-model="person.location.city"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="pl-3 pr-1" cols="5">
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined  @click="makeReadable" width="95%">
                                    <!-- <v-icon left>mdi-pencil</v-icon> -->
                                    BEARBEITEN</v-btn>
                            </v-col>
                            <v-col class="pr-1 pl-0" cols="7">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="makeSaveable" @click="updatePerson" :loading="loadingSave" raised  width="95%">SPEICHERN</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-form>
                        <v-expansion-panels class="mx-0 px-0">
                            <v-expansion-panel>
                            <v-expansion-panel-header color="red--text">Einträge löschen</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            <v-select
                                :items="locations"
                                name="type"
                                label="Adresse wählen"
                                v-model="locationDelete"
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
                        <v-row class="px-4">
                            <v-dialog v-model="addressDialog" max-width="450">
                                <template v-slot:activator="{ on }">
                                    <v-col cols="4" xs="4">
                                        <v-row>
                                            <v-btn v-on="on" color="red" outlined small ><v-icon>mdi-delete</v-icon>Adresse LÖSCHEN</v-btn>
                                        </v-row>
                                    </v-col>
                                </template>
                                <!-- CARD -->
                                <v-card>
                                    <v-toolbar :color="options.color" dark dense flat>
                                        <v-toolbar-title class="white--text font-weight-bold"><v-icon class="pr-3" size="x-large">mdi-alert</v-icon>{{ address.title }}</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text v-show="address.message" class="pa-4">{{ address.message }}</v-card-text>
                                    <v-card-actions class="pa-4">
                                        <v-spacer></v-spacer>
                                        <v-btn @click="addressDialog=false" outlined color="grey">Abbrechen</v-btn>
                                        <v-btn class="white--text ml-4" @click="deleteAddress()" depressed :color="options.color">Ja</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <!-- Confirm Delete Profile-->
                            <v-dialog v-model="profileDialog" max-width="450">
                                <template v-slot:activator="{ on }">
                                    <v-col cols="8" xs="4">
                                        <v-row>
                                           <v-btn v-on="on" color="red" outlined small><v-icon>mdi-delete</v-icon>PROFIL LÖSCHEN</v-btn>
                                        </v-row>
                                    </v-col>
                                </template>
                                <!-- CARD -->
                                <v-card>
                                    <v-toolbar :color="options.color" dark dense flat>
                                        <v-toolbar-title class="white--text font-weight-bold"><v-icon class="pr-3" size="x-large">mdi-alert</v-icon>{{ profile.title }}</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text v-show="profile.message" class="pa-4">{{ profile.message }}</v-card-text>
                                    <v-card-actions class="pa-4">
                                        <v-spacer></v-spacer>
                                        <v-btn @click="profileDialog=false" outlined color="grey">Abbrechen</v-btn>
                                        <v-btn class="white--text ml-4" @click="deleteProfile()" depressed :color="options.color">Ja</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
            <v-snackbar v-model="snackbar" color="red lighten-1" top :timeout="timeout">{{ text }}
                <v-btn color="white" text @click="snackbar = false">OK</v-btn>
            </v-snackbar>
            </v-row>
    </v-container>   
</template>
<script>

export default {
    data() {
        return {
            // uuid: "5e9ac90c0a975a3a277cc343",
            text: '',
            selectedFile: null,
            defaultProfileImage: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
            imageData: "",
            loaded: false,
            loader: null,
            loading: true,
            loadingSave: false,
            loadingImage: false,
            isReadonly: true,
            snackbar: false,
            successAlert: false,
            errorAlert: false,
            successDelete: false,
            addressDialog: false,
            profileDialog: false,
            errorDelete: false,
            addressDeleteError: false, 
            locationDelete: "",
            timeout: 5000,
            info: null,
            dialog: false,
            resolve: null,
            reject: null,
            address: {
                message: "Wollen Sie diese Adresse wirklich löschen? Dies kann nicht rückgängig gemacht werden.",
                title: "Adresse löschen",
            },
            profile: {
                message: "Wollen Sie ihr Profil wirklich löschen? Dies kann nicht rückgängig gemacht werden.",
                title: "Profil löschen",
            },           
            options: {
                color: "red",
                width: 290,
            },
            person: {
                uuid: "",
                title: "",
                first: "",
                last: "",
                cell: "",
                sndEmail: "",
                email: {
                    uuid: "",
                    email: ""
                },
                location: {
                    uuid: "",
                    street: "",
                    streetnumber: "",
                    city: "",
                    postcode: "",
                },
                
                password: ""
                },
            image: null,
            locations: [],

        }
    },
    created() {
        this.loaded = false
    },
    mounted() {
        if (localStorage.getItem("token") != null) {
                const url = "/person/"+localStorage.getItem("userUuid")
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                this.$http.get(url, config)
                .then((response) => {
                    if (response.data.status != 401) {
                        this.$store.state.loggedIn.auth = true
                        this.getPerson()
                        this.getLocation()
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
        makeSaveable(){
            return this.isReadonly
        },
        currentUser() {
            return this.$store.state.loggedIn.auth;
        },
        profileImage(){
            return `data:image/png;base64, ${this.$store.state.user.image}`
        },
    },
    methods: {
        getPerson(){
            const url = "/person/"+localStorage.getItem("userUuid")
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            console.log(config)
            this.$http.get(url, config)
            .then((response) => {
                this.loaded = true
                this.loading = false
                if (response.data != null) {
                    console.log(response.data)
                    this.person = response.data;
                    this.$store.state.user = response.data
                    if (response.data.personType == "PRIVATE") {
                        this.$store.state.user.personType = "Privatperson"
                    } else {
                        this.$store.state.user.personType = "Unternehmen"
                    }
                    this.$store.state.user.image = response.data.picture.image.data
                }
            })
            .catch((error) => {
                this.loading = false
                this.loaded = true
                console.log(error)
                this.hideAlert()
        })
        },
        getLocation(){
            const locationUrl = "/person/"+localStorage.getItem("userUuid")+"/location"
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
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
        makeReadable(){
            this.isReadonly = false
        },
        onFileSelected(event){
            console.log(event)
            this.selectedFile = event
            this.$store.state.user.image = event
        },
        uploadImage(){
            if (this.imageData.name) {
            this.loadingImage = true
            const url = "/person/"+localStorage.getItem("userUuid")+"/picture/add";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)
            this.$http.post(url, fd, config)
            .then((response) => {
                console.log(response)
                this.loadingImage = false
                window.location.reload()
            })
            }
        },
        updatePerson(){
            const url = "/person/update";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            var data = 
            {
                uuid: this.person.uuid,
                title: this.person.title,
                first: this.person.first,
                last: this.person.last,
                cell: this.person.cell,
                sndEmail: this.person.sndEmail,
                email: 
                {
                    uuid: this.person.email.uuid,
                    email: this.person.email.email,
                },
                location:
                {
                    uuid: this.person.location.uuid,
                    street: this.person.location.street,
                    streetnumber: this.person.location.streetnumber,
                    city: this.person.location.city,
                    postcode: this.person.location.postcode
                }
            }    
            this.loadingSave = true
            this.$http.post(url, data, config)
            .then((response) => {
                console.log(response)
                this.loadingSave = false
                    if (response.data.code == "001") {
                        this.successAlert = true
                    } else if(response.data.code == "002"){
                        this.snackbar = true
                        this.text = "Anrede ungültig oder unvollständig."
                    } else if(response.data.code == "003"){
                        this.snackbar = true
                        this.text = "Name ungültig oder unvollständig."
                    } else if (response.data.code == "004") {
                        this.snackbar = true
                        this.text = "Telefonnummer ist ungültig oder unvollständig."
                    } else if(response.data.code == "005"){
                        this.snackbar = true
                        this.text = "Adresse ungültig (nicht auf local.ch gefunden)."
                    } else if(response.data.code == "006"){
                        this.snackbar = true
                        this.text = "E-Mail Adresse ist ungültig oder unvollständig."
                    } else if (response.data.code == "007") {
                        this.snackbar = true
                        this.text = "E-Mail Adresse bereits vorhanden."
                    } else if (response.data.code == "099") {
                        this.snackbar = true
                        this.errorAlert = true
                        this.text = "Nicht berechtigt."
                    }
                    this.hideAlert()
                this.isReadonly = true
            })
            .catch((error) => {
                this.loadingSave = false
                this.errorAlert = true
                console.log(error.response)
                this.hideAlert()
        })
        },
        deleteProfile(){
            const url = "/person/"+localStorage.getItem("userUuid");
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.delete(url, config)
            .then((response) => {
                console.log(response)
                this.successDelete = true
                window.scrollTo(0,0);
                this.hideAlert()
            })
            .catch((error) =>{
                console.log(error)
                this.errorDelete = true
                window.scrollTo(0,0);
                this.hideAlert()
            })
        },
        deleteAddress(){
            if (this.locationDelete.type == "OFFER") {
            const url = "/location/"+this.locationDelete.uuid;
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.delete(url, config)
            .then((response) => {
                console.log(response)
                this.successDelete = true
                window.scrollTo(0,0);
                this.getLocation()
                this.hideAlert()
            })
            .catch((error) =>{
                console.log(error)
                this.errorDelete = true
                window.scrollTo(0,0);
                this.hideAlert()
            })   
            } else {
                this.addressDeleteError = true
                window.scrollTo(0,0);
                this.hideAlert()
            }
        },
        hideAlert(){
            setTimeout(() => {                
                this.successAlert = false
                this.errorAlert = false
                this.loaded = true
            }, 2000);
        }

  },
    
}
</script>