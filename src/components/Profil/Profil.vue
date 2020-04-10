<template>
    <v-container class="pt-4">
        <!-- <v-progress-circular indeterminate></v-progress-circular> -->
        <v-row class="justify-center">
            <!-- Card -->
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">
                <v-row>
                    <!-- Avatar -->
                    <v-col class="pl-6 pr-0">
                        <v-avatar size="150">
                            <v-img src="https://www.la-nt.de/img/dummy.jpg"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="d-flex align-center pl-0 px-3">
                        <v-btn outlined small color="green" class="d-flex align-center">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*"/>
                    </v-col>
                </v-row>
                <v-alert v-show="successAlert" class="mt-4 mx-4" type="success" elevation="2" outlined transition="fade-transition">Änderungen erfolgreich gespeichert!</v-alert>
                <v-alert v-show="errorAlert" class="mt-4 mx-4" type="error" elevation="2" outlined transition="fade-transition">Änderungen fehlgeschlagen!</v-alert>
                <!-- Form -->
                <v-form class="px-3 pt-6">
                    <div>
                        <v-text-field class="py-0" color="green" label="uuid" disabled v-model="person.uuid"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Vorname" :readonly="isReadonly" v-model="person.first"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Nachname" :readonly="isReadonly" v-model="person.last"></v-text-field>
                        <!-- <v-text-field class="py-0" color="green" label="E-Mail uuid" disabled v-model="this.person.email.uuid"></v-text-field> -->
                        <v-text-field class="py-0" color="green" label="E-Mail" :readonly="isReadonly" v-model="person.email.email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Optionale E-Mail" :readonly="isReadonly" v-model="person.email.sndEmail"></v-text-field>
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
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined  @click="makeReadable" width="95%"><v-icon left>mdi-pencil</v-icon>BEARBEITEN</v-btn>
                            </v-col>
                            <v-col class="pr-1 pl-0" cols="7">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="makeSaveable" @click="updatePerson" :loading="loading" raised  width="95%">SPEICHERN</v-btn>
                                <!-- <v-btn @click="getPerson" color="grey" text small>get /person</v-btn> -->
                            </v-col>
                        </v-row>
                    </div>
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
            isReadonly: true,
            snackbar: false,
            successAlert: false,
            errorAlert: false,
            info: null,

            person: {
                uuid: "",
                title: "",
                first: "",
                last: "",
                cell: "",
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
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        // setTimeout(this.successAlert = false, 1000)
        // setTimeout(function() {this.successAlert = true }.bind(this), 1000)
        setTimeout(() => {
            this.successAlert()
        }, 1000);

        this.loader = null
      },
    },


    mounted(){
    // ### COMMENTED OUT TO NOT REROUT PROFILE DURING DEVELOPMENT ###
    //     if (!this.currentUser) {
    //         this.$router.push('/login');
    //     }
        const url = "/person/5e8c0e8e0a975a541edfda6b";
        var config = {headers: {"userid": "5e8c0e8e0a975a541edfda6b"}};
        this.$http.get(url, config)
        .then((response) => {
            console.log(response)
            this.loading = false
            this.person = response.data;
        })
        .catch((error) => {
            this.loading = false
            console.log(error.response)
        })
    },

    computed: {
        makeSaveable(){
            return this.isReadonly
        },
        currentUser() {
            return this.$store.state.auth.user;
    }
    },

    methods: {
        getPerson(){
            const url = "/person/5e8c0e8e0a975a541edfda6b";
            var config = {headers: {"userid": "5e8c0e8e0a975a541edfda6b"}};
            this.$http.get(url, config)
            .then((response) => {
                console.log(response)
                this.loading = false
                this.person = response.data;
            })
            .catch((error) => {
                this.loading = false
                console.log(error.response)
        })
        },
        makeReadable(){
            this.isReadonly = false
        },
        updatePerson(){
            const url = "/registerperson";
            var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
            var data = 
            {
                uuid: this.person.uuid,
                title: this.person.title,
                first: this.person.first,
                last: this.person.last,
                cell: this.person.cell,
                email: 
                {
                    uuid: this.person.email.uuid,
                    email: this.person.email.email,
                    sndEmail: this.person.email.sndEmail
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
            this.loading = true
            this.$http.post(url, data, config)
            .then((response) => {
                console.log(response)
                this.loading = false
                this.successAlert = true
                this.isReadonly = true
            })
            .catch((error) => {
                this.loading = false
                this.errorAlert = true
                console.log(error.response)
        })
        }
        // getUser(){
        //     const url = "/person/5cb8d10725839944c26ff1f5";
        //     var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
        //     this.$http.get(url, config)
        //     .then((response) => {
        //         console.log(response)
        //         console.log(response.data)
        //         this.user = response.data;
        //               })
        //     .catch((error) => {
        //         console.log(error.response)
        //     })
        // }, 

  },
    
}
</script>