<template>
    <v-container class="pt-0">
        <v-row class="justify-center">

            <v-progress-linear
                :active="!loaded"
                indeterminate
                absolute
                height="2px"
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
                        <v-col cols="6">
                            <v-file-input
                                accept="image/png, image/jpeg, image/bmp, image.jpg"
                                placeholder="Bild auswählen"
                                prepend-icon="mdi-camera"
                                label="Profilbild"
                                type="file"
                                color="green"
                                @change="onFileSelected"
                            ></v-file-input>
                        </v-col>

                        <v-col class="pt-6" cols="4">
                            <!-- <input type="file" @change="onFileSelected"> -->
                            <v-btn class="mx-auto" color="green darken-1 white--text" :loading="loadingImage" outlined @click="uploadImage">Hochladen</v-btn>
                        </v-col>
                    </v-row>

                 </v-row>

                <v-alert v-show="successAlert" class="mt-4 mx-4" type="success" elevation="2" outlined transition="fade-transition">Änderungen erfolgreich gespeichert!</v-alert>
                <v-alert v-show="errorAlert" class="mt-4 mx-4" type="error" elevation="2" outlined  transition="fade-transition">Änderungen fehlgeschlagen!</v-alert>
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


                        <v-row class="pt-9">
                            <v-col class="pl-3 pr-1" cols="5">
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined  @click="makeReadable" width="95%">
                                    <!-- <v-icon left>mdi-pencil</v-icon> -->
                                    BEARBEITEN</v-btn>
                            </v-col>
                            <v-col class="pr-1 pl-0" cols="7">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="makeSaveable" @click="updatePerson" :loading="loadingSave" raised  width="95%">SPEICHERN</v-btn>
                                <!-- <v-btn @click="getPerson" color="grey" text small>get /person</v-btn> -->
                            </v-col>
                        </v-row>
                    </div>
                </v-form>
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
            loaded: false,
            loader: null,
            loading: true,
            loadingSave: false,
            loadingImage: false,
            isReadonly: true,
            snackbar: false,
            successAlert: false,
            errorAlert: false,
            timeout: 5000,
            info: null,

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

        }
    },
    created() {
            this.loaded = false
    },

    // watch: {
    //   loader () {
    //     const l = this.loader
    //     this[l] = !this[l]
    //     this.loader = null
    //   },
    // },


    mounted() {
        this.getPerson()
    
    },

    computed: {
        makeSaveable(){
            return this.isReadonly
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
        profileImage(){
            return `data:image/png;base64, ${this.$store.state.user.image}`
        },
    },

    methods: {
        getPerson(){
            const url = "/person/"+this.$store.state.user.uuid;
            var config = {headers: {"userid": this.$store.state.user.uuid}};
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
        makeReadable(){
            this.isReadonly = false
        },
        onFileSelected(event){
            console.log(event)
            this.selectedFile = event
        },
        uploadImage(){
            this.loadingImage = true
            const url = "/person/"+this.$store.state.user.uuid+"/picture/add";
            var config = {headers: {"userid": this.$store.state.user.uuid}};
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)
            this.$http.post(url, fd, config)
            .then((response) => {
                console.log(response)
                this.loadingImage = false
                window.location.reload()
            })
        },
        updatePerson(){
            const url = "/person/update";
            var config = {headers: {"userid": this.$store.state.user.uuid}};
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
                        this.text = "E-Mail addresse ist ungültig oder unvollständig."
                    } else if (response.data.code == "007") {
                        this.snackbar = true
                        this.text = "E-Mail addresse bereits vorhanden."
                    } else if (response.data.code == "099") {
                        this.snackbar = true
                        this.errorAlert = true
                        this.text = "Nicht berechtigt."
                    }
                    this.hideAlert()
                this.isReadonly = true
            })
            .catch((error) => {
                this.loading = false
                this.errorAlert = true
                console.log(error.response)
                this.hideAlert()
        })
        },
        postProfileImage(){
            const url = "/person/"+this.$store.state.user.uuid+"/picture/add";
            var config = {headers: {"userid": this.$store.state.user.uuid}};
            var data =
            {

            }
            this.loading = true
            this.$http.post(url, data, config)
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