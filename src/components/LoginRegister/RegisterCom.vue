<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">

                <!-- switch between register forms -->
                <v-btn color="grey lighten-4 grey--text" to="/registerPriv" width="50%" large tile depressed>Privat</v-btn>
                <v-btn color="white black--text" width="50%" large tile depressed>Kommerziell</v-btn>

                <v-card-title  class="pa-3 display-1 font-weight-bold">Registrieren</v-card-title>

                <div class="body-2 pl-3" color="grey"><v-icon medium>mdi-information-outline</v-icon> Deine Daten sind öffentlich nicht zugänglich!</div>
                <v-form ref="form" lazy-validation class="pa-3">
                    <div>
                        <v-select :items="items" color="green" label="Anrede" autocomplete  v-model="person.title"></v-select>
                        <v-text-field class="py-0" color="green" :rules="nameRules" label="Hofname*" v-model="person.companyName" autocomplete required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="firstnameRules" label="Vorname*" v-model="person.first" autocomplete required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="lastnameRules" label="Nachname*" v-model="person.last" autocomplete required></v-text-field>
                    </div>
                    <div class="pt-7">  
                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse*" :rules="streetRules" v-model="person.location.street" autocomplete></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nr." v-model="person.location.streetnumber" autocomplete></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <v-row>
                        <v-col class="py-0" cols="3">
                            <v-text-field class="py-0" color="green" label="PLZ*" :rules="postcodeRules" v-model="person.location.postcode" autocomplete></v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="9">
                            <v-text-field class="py-0" color="green" label="Ort*" :rules="cityRules" v-model="person.location.city" autocomplete></v-text-field>
                        </v-col>
                        <v-col>
                        <!-- <p class="caption red--text" v-show="addressAlert">Adresse ist ungültig oder unvollständig</p> -->
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="pt-7" cols="12">
                            <v-text-field class="py-0" color="green" :rules="cellRules" label="Telefon*" v-model="person.cell" autocomplete></v-text-field>
                            <!-- <p class="caption red--text" v-show="phoneAlert">Telefonnummer ist ungültig oder unvollständig</p> -->
                            <v-text-field class="py-0" color="green" :rules="emailRules" label="E-Mail*" v-model="person.email.email" autocomplete></v-text-field>
                            <!-- <p class="caption red--text" v-show="emailAlert">E-Mail Adresse ist ungültig</p>
                            <p class="caption red--text" v-show="email2Alert">E-Mail Adresse bereits vorhanden</p> -->
                            <v-text-field class="py-0" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'" color="green" :rules="[passwordRules.required, passwordRules.min]" label="Passwort*" autocomplete v-model="person.password"></v-text-field>
                            <v-alert v-show="successAlert" class="mt-4" type="success" elevation="2" outlined transition="fade-transition">
                                <p class="pa-0 ma-0 font-weight-bold">Registrierung erfolgreich!</p>
                                Ihre Anmeldung wird geprüft. Sie erhalten in den nächsten Tagen Bescheid.</v-alert>
                            <v-alert v-show="errorAlert" class="mt-4" type="error" elevation="2" outlined transition="fade-transition">
                                Registrierung fehlgeschlagen! Bite versuchen Sie es nocheinmal oder wenden Sie sich an den Administrator</v-alert>
                        </v-col>
                    </v-row>
                    <v-checkbox
                    class="pa-0 pt-4 ma-0"
                    color="green"
                    v-model="person.age"
                    :rules="[v => !!v || 'Du musst 18 Jahre alt sein, um dich registrieren zu können!']"
                    label="Ich bin 18 Jahre alt."

                    required
                    ></v-checkbox>
                    <v-checkbox
                    class="pa-0 ma-0"
                    color="green"
                    v-model="person.agb"
                    :rules="[v => !!v || 'Du musst die AGB bestätigen, um dich registrieren zu können!']"
                    required
                    >
                        <template v-slot:label>
                            <div>Ich erkläre mich mit den <v-btn class="ma-0 pa-0" color="blue darken-3" small text to="/agb">AGB</v-btn>von Obst vom Baum einverstanden.</div>
                        </template>
                    </v-checkbox>

                    <v-row class="pt-2">
                        <v-col class="pl-3 pr-1" cols="4">
                            <v-btn class="mx-auto" color="grey darken-1 white--text" outlined @click="reset" width="95%">
                                <v-icon>mdi-autorenew</v-icon>
                            </v-btn>
                        </v-col>
                        
                        <v-col class="pr-0 pl-0" cols="8">
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" :disabled="!isComplete" @click="registerPerson()" :loading="loading" raised  width="95%">REGISTRIEREN</v-btn>
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
    data() {
        return {
            loader: null,
            loading: false,
            snackbar2: false,
            snackbar: false,
            text: '',
            timeout: 5000,
            successAlert: false,
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
                companyName: "",
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
            nameRules: [
                v => !!v || 'Hofname ist erforderlich',
            ],
            streetRules: [
                v => !!v || 'Strasse ist erforderlich',
            ],
            cellRules: [
                v => !!v || 'Telefon ist erforderlich',
            ],
            postcodeRules: [
                v => !!v || 'PLZ ist erforderlich',
            ],
            cityRules: [
                v => !!v || 'Ort ist erforderlich',
            ],
            firstnameRules: [
                v => !!v || 'Vorname ist erforderlich',
            ],
            lastnameRules: [
                v => !!v || 'Nachname ist erforderlich',
            ],
            emailRules: [
                v => !!v || 'E-Mail ist erforderlich',
                v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein',
            ],
            passwordRules: {
                required: v => !!v || 'Passwort ist erforderlich',
                min: v => v.length >= 8 || 'Min. 8 Zeichen',
            },
            show: false,
            age: false,
            agb: false,
        }
    },
    mounted() {
        this.setTimeout
        this.hideAlert
    },
    computed: {
        isComplete(){//button only visible if these fields are filled
            return this.person.age && this.person.agb
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        registerPerson(){
            if (this.$refs.form.validate()) {
            const url = "/auth/signup/commercial";
            // var config = {headers: {"userid": "5cb8d10725839944c26ff1f5"}};
            var data = 
            {
                title: this.person.title,
                companyName: this.person.companyName,
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
                },
                password: this.person.password
            }
            this.loading = true    
            this.$http.post(url, data)
                .then((response) => {
                    console.log(response)
                    this.loading = false
                    if (response.data.code == "001") {
                        // this.snackbar2 = true
                        this.successAlert = true
                    } else if(response.data.code == "002"){
                        this.snackbar = true
                        this.text = "Anrede ist ungültig oder unvollständig."
                    } else if(response.data.code == "003"){
                        this.snackbar = true
                        this.text = "Name ist ungültig oder unvollständig."
                    } else if (response.data.code == "004") {
                        this.snackbar = true
                        this.text = "Telefonnummer ist ungültig oder unvollständig."
                    } else if(response.data.code == "005"){
                        this.snackbar = true
                        this.text = "Angaben ensprechen keiner existierenden Adresse."
                    } else if(response.data.code == "006"){
                        this.snackbar = true
                        this.text = "E-MailAdresse ist ungültig oder unvollständig."
                    } else if (response.data.code == "007") {
                        this.snackbar = true
                        this.text = "E-MailAdresse bereits vorhanden."
                    } else if (response.data.code == "099") {
                        this.snackbar = true
                        this.errorAlert = true
                        this.text = "Nicht berechtigt."
                    }
                    this.hideAlert()
                    this.reset()
                })
                .catch((error) => {
                    console.log(error);
                    this.correct = false
                    this.loading = false
                    this.hideAlert()
                })
            }
        },
        validate () {
            this.$refs.form.validate()
        },
        reset () {
           this.$refs.form.reset()
        },
        hideAlert(){
            setTimeout(() => {                
                this.successAlert = false
                this.errorAlert = false
            }, 2000);
        },

    }
}
</script>