<template>
    <v-container class="pt-0">
        <v-row class="justify-center">

            <v-progress-linear
                :active="!loaded"
                indeterminate
                absolute
                height="3px"
                color="blue"
                background-opacity = 0.0
            ></v-progress-linear>

        </v-row>
        <v-row class="justify-center pt-4">
            <!-- Card -->
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">
                    <!-- Avatar -->
                    <div class="pa-0 ma-0 image-preview" v-if="this.$store.state.user.image == null">
                        <img class="preview" width="100%" :src="imageData">
                    </div>
                    <div class="pa-0 ma-0 image-preview" v-if="this.$store.state.user.image != null">
                        <img class="preview" width="100%" :src="profileImage">
                    </div>
                    <!-- <v-col class="pa-0 ma-0">
                        <div class="pa-0 ma-0 image-preview" v-if="this.$store.state.user.image == null">
                            <img class="preview" width="100%" :src="defaultProfileImage">
                        </div>
                        <div class="pa-0 ma-0 image-preview" v-if="this.$store.state.user.image != null">
                            <img class="preview" width="100%" :src="profileImage">
                        </div>
                    </v-col> -->
                    
                <v-row>
                    <!-- <v-row class="pl-6">
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
                            <v-btn class="mx-auto" color="green darken-1 white--text" :loading="loadingImage" outlined @click="uploadImage">Hochladen</v-btn>
                        </v-col>
                    </v-row> -->

                 </v-row>
                <div class="mx-4 pt-2">
                    <v-btn width="100%" outlined color="green">
                        <label type="submit" value="submit">Bild auswählen
                            <input type="file" @change="previewImage" accept="image/*" style="display: none">
                        </label>
                    </v-btn>
                </div>

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
                        
                        <v-text-field class="py-0" color="green" label="Vorname" v-model="person.first"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Nachname" v-model="person.last"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Profiltyp" disabled v-model="person.personType"></v-text-field>
                        <!-- <v-text-field class="py-0" color="green" label="E-Mail uuid" disabled v-model="this.person.email.uuid"></v-text-field> -->
                        <v-text-field class="py-0" color="green" label="E-Mail" v-model="person.email.email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Optionale E-Mail" v-model="person.sndEmail"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Telefon" v-model="person.cell"></v-text-field>
                        

                    </div>
                    <div class="pt-7">
                        <!-- <v-row>
                            <v-col>
                                <v-text-field class="py-0" color="green" label="location uuid" disabled="" v-model="this.person.location.uuid"></v-text-field>
                            </v-col>
                        </v-row> -->


                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse" disabled v-model="person.location.street"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nr." disabled v-model="person.location.streetnumber"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="py-0" cols="3">
                                <v-text-field class="py-0" color="green" label="PLZ" disabled v-model="person.location.postcode"></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="9">
                                <v-text-field class="py-0" color="green" label="Ort" disabled v-model="person.location.city"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <!-- <v-col class="pl-3 pr-1" cols="5">
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined  @click="makeReadable" width="95%">
                                    BEARBEITEN</v-btn>
                            </v-col> -->
                            <v-col class="px-4">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" @click="updatePerson()" :loading="loadingSave" raised  width="100%">SPEICHERN</v-btn>
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
                                label="Addresse wählen"
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
                        
                        <!-- Confirm Delete Address-->        
                        <v-row>
                            <v-col class="py-0">
                                <v-dialog v-model="addressDialog" max-width="450">
                                    <template v-slot:activator="{ on }">
                                        <v-col cols="12">
                                            <v-row>
                                                <v-btn v-on="on" color="red" outlined small width="100%"><v-icon>mdi-delete</v-icon>Adresse LÖSCHEN</v-btn>
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
                                            <v-btn class="white--text" @click="deleteAddress()" depressed :color="options.color">Ja</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-col>

                            <!-- Confirm Delete Profile-->
                            <v-col class="py-0">
                                <!-- <div class="body-2 pb-0" color="red"><v-icon medium>mdi-information-outline</v-icon> Das Profil wird vollständig gelöscht!</div> -->
                                <v-dialog v-model="profileDialog" max-width="450">
                                    <template v-slot:activator="{ on }">
                                        <v-col cols="12">
                                            <v-row>
                                                <v-btn v-on="on" color="red" outlined small width="100%"><v-icon>mdi-delete</v-icon>PROFIL LÖSCHEN</v-btn>
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
                                            <v-btn class="white--text" @click="deleteProfile(); searchSubDialog=false" depressed :color="options.color">Ja</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-col>

                            <!-- Confirm Delete SearchSub-->
                            <v-col class="py-0">
                                <!-- <div class="body-2 pb-0" color="red"><v-icon medium>mdi-information-outline</v-icon> Das Profil wird vollständig gelöscht!</div> -->
                                <v-dialog v-model="searchSubDialog" max-width="450">
                                    <template v-slot:activator="{ on }">
                                        <v-col cols="12">
                                            <v-row>
                                                <v-btn v-on="on" color="red" outlined small width="100%"><v-icon>mdi-delete</v-icon>Suchabo LÖSCHEN</v-btn>
                                            </v-row>
                                        </v-col>
                                    </template>
                                    <!-- CARD -->
                                    <v-card>
                                        <v-toolbar :color="options.color" dark dense flat>
                                            <v-toolbar-title class="white--text font-weight-bold"><v-icon class="pr-3" size="x-large">mdi-alert</v-icon>{{ searchSub.title }}</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text v-show="searchSub.message" class="pa-4">{{ searchSub.message }}</v-card-text>
                                        <v-card-actions class="pa-4">
                                            <v-spacer></v-spacer>
                                            <v-btn @click="searchSubDialog=false" outlined color="grey">Abbrechen</v-btn>
                                            <v-btn class="white--text" @click="deleteSearchSub(); searchSubDialog=false" depressed :color="options.color">Ja</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-col>
                            
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
            imageData: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
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
            searchSubDialog: false,
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
            searchSub: {
                message: "Wollen Sie ihr Suchabo wirklich löschen?",
                title: "Suchabo löschen",
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
            console.log("token available")
            this.$http.get(url, config)
            .then((response) => {
                this.loaded = true
                this.loading = false
                console.log(response.data)
                if (response.data.status != 401) {
                    console.log("authorized")
                    this.$store.state.loggedIn.auth = true
                    this.$store.state.user = response.data
                    if (response.data.picture != null) {
                        this.$store.state.user.image = response.data.picture.image.data
                    }
                    this.getPerson()
                    this.getLocation()
                  if (response.data.personType == "PRIVATE") {
                      this.$store.state.user.personType = "Privatperson"
                  } else {
                      this.$store.state.user.personType = "Bauer"
                  }
              } else {
                  this.$store.state.loggedIn.auth = false
                  this.$router.push('/login');
              }
            })
            .catch((error) => {
                console.log("unauthorized")
                this.$store.state.loggedIn.auth = false
                this.$router.push('/');
                this.loading = false
                this.loaded = true
                console.log(error)
                this.hideAlert()
            })
        } else {
            console.log("no token available")
            this.$store.state.loggedIn.auth = false
            this.$router.push('/');
        }
    },
    computed: {
        // makeSaveable(){
        //     return this.isReadonly
        // },
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
                        this.$store.state.user.personType = "Bauer"
                    }
                    this.$store.state.user.image = response.data.picture.image.data
                    console.log(response.data.picture)
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
        uploadImage(){
            this.loadingImage = true
            const url = "/person/"+localStorage.getItem("userUuid")+"/picture";
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
                this.uploadImage()
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
                        this.text = "Addresse ungültig (nicht auf local.ch gefunden)."
                    } else if(response.data.code == "006"){
                        this.snackbar = true
                        this.text = "E-Mailaddresse ist ungültig oder unvollständig."
                    } else if (response.data.code == "007") {
                        this.snackbar = true
                        this.text = "E-Mailaddresse bereits vorhanden."
                    } else if (response.data.code == "008") {
                        this.snackbar = true
                        this.text = "E-Mail ungültig."
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
            this.profileDialog = false
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
        deleteSearchSub(){
            this.searchSubDialog = false
            const url = "/search/"+localStorage.getItem("userUuid");
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
            this.addressDialog = false
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
                this.successDelete = false
                this.addressDeleteError = false
                this.errorDelete = false
                this.loaded = true
            }, 2000);
        }
  },
    
}
</script>