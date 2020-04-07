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
                            <v-img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="d-flex align-center pl-0 px-3">
                        <v-btn outlined small color="green" class="d-flex align-center">Bild hochladen</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*"/>
                    </v-col>
                </v-row>
                <v-dialog v-show="successAlert" class="mt-4 mx-4" type="success" elevation="3" outlined dense transition="fade-transition">Änderungen erfolgreich gespeichert!</v-dialog>
                <!-- Form -->
                <v-form class="px-3 pt-6">
                    <div>
                        <v-text-field class="py-0" color="green" label="Vorname" :readonly="isReadonly" v-model="this.person.first"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Nachname" :readonly="isReadonly" v-model="this.person.last"></v-text-field>
                        <v-text-field class="py-0" color="green" label="E-Mail" :readonly="isReadonly" v-model="this.person.email.email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Optionale E-Mail" :readonly="isReadonly" v-model="this.person.email.email"></v-text-field>
                        <v-text-field class="py-0" color="green" label="Telefon" :readonly="isReadonly" v-model="this.person.cell"></v-text-field>

                    </div>
                    <div class="pt-7">
                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse" :readonly="isReadonly" v-model="this.person.location.street"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nr." :readonly="isReadonly" v-model="this.person.location.streetnumber"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="py-0" cols="3">
                                <v-text-field class="py-0" color="green" label="PLZ" :readonly="isReadonly" v-model="this.person.location.postcode"></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="9">
                                <v-text-field class="py-0" color="green" label="Ort" :readonly="isReadonly" v-model="this.person.location.city"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="pt-9">
                            <v-col class="pl-3 pr-1" cols="5">
                                <v-btn class="mx-auto" color="green darken-1 white--text" outlined  @click="makeReadable" width="95%"><v-icon left>mdi-pencil</v-icon>BEARBEITEN</v-btn>
                            </v-col>
                            <v-col class="pr-1 pl-0" cols="7">
                                <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="makeSaveable" @click="updatePerson" :loading="loading" raised  width="95%">SPEICHERN</v-btn>
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
            info: null,
            person: {
                title: "",
                first: "",
                last: "",
                cell: "",
                email: {
                    email: ""
                },
                location: {
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

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },


    mounted(){
    // ### COMMENTED OUT TO NOT REROUT PROFILE DURING DEVELOPMENT ###
    //     if (!this.currentUser) {
    //         this.$router.push('/login');
    //     }
        this.loading = true
        const url = "/person/5e8b8cf50a975a541edfda68";
        var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
        this.$http.get(url, config)
        .then((response) => {
            this.loading = false
            this.person = response.data;
            if (response.data.code == "001") {
                        // this.snackbar2 = true
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
                        this.text = "addresse ungültig (nicht auf local.ch gefunden)."
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
        makeReadable(){
            this.isReadonly = false
        },
        updatePerson(){
            const url = "/registerperson";
            var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
            var data = 
            {
                title: this.person.title,
                first: this.person.first,
                last: this.person.last,
                cell: this.person.cell,
                email: 
                {
                    email: this.person.email.email
                },
                location:
                {
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
                this.successAlert = true
                this.loading = false
                // this.snackbar = true
                this.isReadonly = true
            })
            .catch(err => console.error(err));
                this.loading = false
        },

        // editPerson: function(person) {
        //     this._originalPerson = Object.assign({}, person);
        //     person.edit = true;
        // },
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