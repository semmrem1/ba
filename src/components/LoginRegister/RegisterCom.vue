<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-0" width="90%" max-width="600px" elevation="3">

                <!-- switch between register forms -->
                <v-btn color="grey lighten-4 grey--text" to="/RegisterPriv" width="50%" large tile depressed>Privat</v-btn>
                <v-btn color="white black--text" width="50%" large tile depressed>Kommerziell</v-btn>

                <v-card-title  class="pa-3 display-1 font-weight-bold">Registrieren</v-card-title>
                <v-text class="body-2 pl-3" color="grey"><v-icon medium>mdi-information-outline</v-icon> Deine Daten sind öffentlich nicht zugänglich!</v-text>    
                <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                    <div>
                        <v-select :items="items" label="Anrede" v-model="title"></v-select>
                        <!-- <v-text-field class="py-0" color="green" :rules="usernameRules" label="Benutzername" v-model="username" required :counter="0"></v-text-field> -->
                        <v-text-field class="py-0" color="green" :rules="firstnameRules" label="Firma/Hofname" v-model="firstname" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="firstnameRules" label="Vorname" v-model="firstname" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="lastnameRules" label="Nachname" v-model="lastname" required></v-text-field>
                    </div>
                    <div class="pt-7">  
                        <v-text-field class="py-0" color="green" label="Strasse" v-model="street"></v-text-field>
                    </div>

                    <v-row>
                        <v-col class="py-0" cols="3">
                            <v-text-field class="py-0" color="green" label="PLZ" v-model="PLZ"></v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="9">
                            <v-text-field class="py-0" color="green" label="Ort" v-model="city"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="pt-7" cols="12">
                            <v-text-field class="py-0" color="green" :rules="emailRules" label="E-Mail" v-model="email"></v-text-field>
                            <v-text-field class="py-0" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'" color="green" :rules="[passwordRules.required, passwordRules.min]" hint="Min. 8 Zeichen" label="Passwort" v-model="password"></v-text-field>
                            <!-- <v-text-field class="py-0" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show2 = !show2" :type="show2 ? 'text' : 'password'" color="green" :rules="[passwordRules.required, passwordRules.min, passwordRules.match]" hint="Min. 8 Zeichen" label="Passwort wiederholen" v-model="passwordrep"></v-text-field> -->
                        </v-col>
                    </v-row>
                    <v-checkbox
                    class="pa-0 pt-4 ma-0"
                    v-model="checkbox"
                    :rules="[v => !!v || 'Du musst 18 Jahre alt sein, um dich registrieren zu können!']"
                    label="Bist du 18 Jahre alt?"

                    required
                    ></v-checkbox>
                    <v-checkbox
                    class="pa-0 ma-0"
                    v-model="checkbox"
                    :rules="[v => !!v || 'Du musst die AGB bestätigen, um dich registrieren zu können!']"
                    label="Bist du mit den AGB einverstanden?"
                    required
                    ></v-checkbox>                   

                    <v-row class="pt-2">
                        <v-col class="pl-3 pr-1" cols="4">
                            <v-btn class="mx-auto" color="grey darken-1 white--text" outlined @click="reset" width="95%">
                                <v-icon>mdi-autorenew</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="pr-0 pl-0" cols="8">
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" raised @click="validate" width="95%">REGISTRIEREN</v-btn>
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
            title: null,
            items: [
            'Herr',
            'Frau',
            ],
            username: '',
            usernameRules: [
                v => !!v || 'Benutzername ist erforderlich',
            ],
            firstname: '',
            firstnameRules: [
                // v => !!v || 'Vorname ist erforderlich',
            ],
            lastname: '',
            lastnameRules: [
                // v => !!v || 'Nachname ist erforderlich',
            ],
            street: '',
            PLZ: '',
            city: '',
            phone: '',
            email: '',
            emailRules: [
                v => !!v || 'E-Mail ist erforderlich',
            ],
            password: '',
            passwordRules: {
                required: v => !!v || 'Passwort ist erforderlich',
                min: '',
                match: '',
            },

            show1: false,
            show2: false,
            
            checkbox: false,

    }),
    methods: {
        validate () {
        this.$refs.form.validate()
        console.log(this.title, this.username, this.firstname, this.lastname)
        },
        reset () {
        this.$refs.form.reset()
      },
    }
    
    
}
</script>