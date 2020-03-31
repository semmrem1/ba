<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">
                
                <!-- switch between register forms -->
                <v-btn color="white black--text" width="50%" large tile depressed>Privat</v-btn>
                <v-btn color="grey lighten-4 grey--text" to="/RegisterCom" width="50%" large tile depressed>Kommerziell</v-btn>

                <v-card-title  class="pa-3 display-1 font-weight-bold">Registrieren</v-card-title>
                <v-text class="body-2 pl-3"><v-icon medium>mdi-information-outline</v-icon> Deine Daten sind öffentlich nicht zugänglich!</v-text>    
                <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                    
                    <div>
                        <v-select :items="items" label="Anrede" v-model="person.title"></v-select>
                        <!-- <v-text-field class="py-0" color="green" :rules="usernameRules" label="Benutzername" v-model="username" required :counter="0"></v-text-field> -->
                        <v-text-field class="py-0" color="green" :rules="firstnameRules" label="Vorname" v-model="person.first" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="lastnameRules" label="Nachname" v-model="person.last" required></v-text-field>
                    </div>
                    <div class="pt-7">  
                        <v-row>
                            <v-col cols="9">
                                <v-text-field class="py-0" color="green" label="Strasse" v-model="person.street"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field class="py-0" color="green" label="Nummer" v-model="person.streetnumber"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <v-row>
                        <v-col class="py-0" cols="3">
                            <v-text-field class="py-0" color="green" label="PLZ" v-model="person.PLZ"></v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="9">
                            <v-text-field class="py-0" color="green" label="Ort" v-model="person.city"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="pt-7" cols="12">
                            <v-text-field class="py-0" color="green" :rules="emailRules" label="E-Mail*" v-model="person.email"></v-text-field>
                            <v-text-field class="py-0" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" :type="show ? 'text' : 'password'" color="green" :rules="[passwordRules.required, passwordRules.min]" hint="Min. 8 Zeichen" label="Passwort*" v-model="person.password"></v-text-field>
                            <!-- <v-text-field class="py-0" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show2 = !show2" :type="show2 ? 'text' : 'password'" color="green" :rules="[passwordRules.required, passwordRules.min, passwordRules.match]" hint="Min. 8 Zeichen" label="Passwort wiederholen" v-model="passwordrep"></v-text-field> -->
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
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" type="submit" :disabled="!isComplete" raised @click="validate()" width="95%">REGISTRIEREN</v-btn>
                        </v-col>
                    </v-row>
                    
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
            valid: true,
            person: {
                title: null,
                first: '',
                last: '',
                street: '',
                streetnumber: '',
                plz: '',
                city: '',
                cell: '',
                email: '',
                password: '',
                age: false,
                agb: false
            },
            
            items: [
            'Herr',
            'Frau',
            ],
            firstnameRules: [
                // v => !!v || 'Vorname ist erforderlich',
            ],
            lastnameRules: [
                // v => !!v || 'Nachname ist erforderlich',
            ],
            emailRules: [
                v => !!v || 'E-Mail ist erforderlich',
            ],
            passwordRules: {
                required: v => !!v || 'Passwort ist erforderlich',
                // min: '',
                // match: '',
            },

            show: false,
            age: false,
            agb: false,

    }),
    mounted() {
        this.$validator.validate();
    },
    computed: {
        isComplete(){
            return this.person.email && this.person.password && this.person.age && this.person.agb
        }
    },
    methods: {
        registerPerson(){
            const formData = new FormData();
            formData.append('title', this.title)
            formData.append('title', this.first)
            formData.append('title', this.last)
            formData.append('title', this.street)
            formData.append('title', this.streetnumber)
            formData.append('title', this.plz)
            formData.append('title', this.city)
            formData.append('title', this.cell)
            formData.append('title', this.email)
            formData.append('title', this.password)

            const url = "/registerperson/5cb8d10725839944c26ff1f5";
            this.$http.post(url, formData)
            .then((response) => {
                console.log(response)
            })
        },
        validate () {
            this.$refs.form.validate()
            console.log(this.$refs.form)
            // console.log(this.title, this.username, this.firstname, this.lastname)
        },
        reset () {
           this.$refs.form.reset()
      },
    }
    
    
}
</script>