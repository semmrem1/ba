<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">

                <!-- switch between register forms -->
                <v-btn color="grey lighten-4 grey--text" to="/RegisterPriv" width="50%" large tile depressed>Privat</v-btn>
                <v-btn color="white black--text" width="50%" large tile depressed>Kommerziell</v-btn>

                <v-card-title  class="pa-3 display-1 font-weight-bold">Registrieren</v-card-title>
                <!-- <v-alert v-show="successAlert" class="mx-2 mt-4 py-1" type="success">Registrierung erfolgreich!</v-alert>
                <v-alert v-show="errorAlert" class="mx-2 mt-4 py-1" type="error">Registrierung fehlgeschlagen!</v-alert> -->
                <v-text class="body-2 pl-3" color="grey"><v-icon medium>mdi-information-outline</v-icon> Deine Daten sind öffentlich nicht zugänglich!</v-text>
                <!-- <v-alert class="mx-2 mt-4 py-1" type="info" outlined dense>Deine Daten sind öffentlich nicht zugänglich!</v-alert> -->
                <!-- <p class="title red--text">{{this.errorAlert}}</p> -->
                <!-- <p class="title green--text">{{this.successAlert}}</p>     -->
                <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                    <div>
                        <v-select :items="items" label="Anrede*" v-model="person.title"></v-select>
                        <!-- <v-text-field class="py-0" color="green" :rules="usernameRules" label="Benutzername" v-model="username" required :counter="0"></v-text-field> -->
                        <v-text-field class="py-0" color="green" label="Firma/Hofname*" v-model="person.companyname" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="firstnameRules" label="Vorname*" v-model="person.first" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="lastnameRules" label="Nachname*" v-model="person.last" required></v-text-field>
                    </div>
                    <div class="pt-7">  
                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse*" v-model="person.location.street"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nummer*" v-model="person.location.streetnumber"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <v-row>
                        <v-col class="py-0" cols="3">
                            <v-text-field class="py-0" color="green" label="PLZ*" v-model="person.location.postcode"></v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="9">
                            <v-text-field class="py-0" color="green" label="Ort*" v-model="person.location.city"></v-text-field>
                        </v-col>
                        <v-col>
                        <!-- <p class="caption red--text" v-show="addressAlert">Adresse ist ungültig oder unvollständig</p> -->
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="pt-7" cols="12">
                            <v-text-field class="py-0" color="green" label="Telefon" v-model="person.cell"></v-text-field>
                            <!-- <p class="caption red--text" v-show="phoneAlert">Telefonnummer ist ungültig oder unvollständig</p> -->
                            <v-text-field class="py-0" color="green" :rules="emailRules" label="E-Mail*" v-model="person.email.email"></v-text-field>
                            <!-- <p class="caption red--text" v-show="emailAlert">E-Mail Adresse ist ungültig</p>
                            <p class="caption red--text" v-show="email2Alert">E-Mail Adresse bereits vorhanden</p> -->
                            <!-- <v-alert type="warning" dense>{{this.emailAlert}}</v-alert> -->
                            <v-text-field class="py-0" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'" color="green" :rules="[passwordRules.required, passwordRules.min]" label="Passwort*" v-model="person.password"></v-text-field>
                            <v-alert v-show="successAlert" class="mt-4" type="success" elevation="2" outlined transition="fade-transition">Registrierung erfolgreich!</v-alert>
                            <v-alert v-show="errorAlert" class="mt-4" type="error" elevation="2" outlined transition="fade-transition">Registrierung fehlgeschlagen!</v-alert>
                        </v-col>
                    </v-row>
                    <v-checkbox
                    class="pa-0 pt-4 ma-0"
                    v-model="person.age"
                    :rules="[v => !!v || 'Du musst 18 Jahre alt sein, um dich registrieren zu können!']"
                    label="Ich bin 18 Jahre alt."

                    required
                    ></v-checkbox>
                    <v-checkbox
                    class="pa-0 ma-0"
                    v-model="person.agb"
                    :rules="[v => !!v || 'Du musst die AGB bestätigen, um dich registrieren zu können!']"
                    label="Ich erkläre mich mit den AGB von Obst vom Baum einverstanden."
                    required
                    ></v-checkbox>

                    <v-row class="pt-2">
                        <v-col class="pl-3 pr-1" cols="4">
                            <v-btn class="mx-auto" color="grey darken-1 white--text" outlined @click="reset" width="95%">
                                <v-icon>mdi-autorenew</v-icon>
                            </v-btn>
                        </v-col>
                        
                        <v-col class="pr-0 pl-0" cols="8">
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="!isComplete" @click="registerPerson()" raised  width="95%">REGISTRIEREN</v-btn>
                        </v-col>
                    </v-row>
                    
                </v-form>
            </v-card>
            <v-snackbar v-model="snackbar" color="red lighten-1" top :timeout="timeout">{{ text }}
                <v-btn color="white" text @click="snackbar = false">OK</v-btn>
            </v-snackbar>
            <v-snackbar class="subtitle-1 black-text" v-model="snackbar2" color="green lighten-1" multi-line vertical top>{{ text }}
                <v-btn color="white" text @click="snackbar = false">OK</v-btn>
            </v-snackbar>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'Register',
    data: () => ({
            snackbar2: false,
            snackbar: false,
            text: '',
            timeout: 5000,

            hideAlert: true,
            successAlert: '',
            errorAlert: '',
            emailAlert: '',
            email2Alert: '',
            phoneAlert: '',
            addressAlert: '',
            nameAlert: '',
            titleAlert: '',
            valid: true,
            person: {
                title: "",
                companyname: "",
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
            submitted: false,
            successful: false,
            message: '',
            items: [
            'Herr',
            'Frau',
            ],
            firstnameRules: [
                v => !!v || 'Vorname ist erforderlich',
            ],
            lastnameRules: [
                v => !!v || 'Nachname ist erforderlich',
            ],
            emailRules: [
                v => !!v || 'E-Mail ist erforderlich',
            ],
            passwordRules: {
                required: v => !!v || 'Passwort ist erforderlich',
                min: v => v.length >= 8 || 'Min. 8 Zeichen',
            },
            show: false,
            age: false,
            agb: false,

    }),
    mounted: {
        // alertTimeout: function(){
        //     this.alert = true;
        //     setTimeout(() => {
        //         this.alert = false;
        //     }, 2000);
        // }

    },
    
    computed: {
        isComplete(){//button only visible if these fields are filled
            return this.person.age && this.person.agb
            // this.person.companyname &&
            // this.person.first &&
            // this.person.last &&
            // this.person.street &&
            // this.person.streetnumber &&
            // this.person.plz &&
            // this.person.city &&
            // this.person.email &&
            // this.person.password &&

        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        registerPerson(){
            const url = "/registerperson";
            var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
            var data = 
            {
                title: this.person.title,
                companyname: this.person.companyname,
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
            this.$http.post(url, data, config)
                .then((response) => {
                    console.log(response)
                    if (response.data.code == "001") {
                        this.snackbar2 = true
                        this.successAlert = true
                        this.text = "Registrierung erfolgreich!"
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
                })
                .catch((error) => {
                    console.log(error);
                    this.correct = false
                })
        },
        // handleRegister() {
        //     this.message = '';
        //     this.submitted = true;
        //     this.$validator.validate().then(isValid => {
        //         if (isValid) {
        //         this.$store.dispatch('auth/register', this.person).then(
        //             data => {
        //             this.message = data.message;
        //             this.successful = true;
        //             },
        //             error => {
        //             this.message =
        //                 (error.response && error.response.data) ||
        //                 error.message ||
        //                 error.toString();
        //             this.successful = false;
        //             }
        //         );
        //         }
        //     });
        // },
        validate () {
            this.$refs.form.validate()
            console.log(this.$refs.form)
        },
        reset () {
           this.$refs.form.reset()
      },
    }
    
    
}


</script>