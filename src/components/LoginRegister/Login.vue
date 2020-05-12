<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row class="justify-center">    
            <!-- CARD -->
            <v-card class="ma-0 mt-4 pa-1" width="90%" max-width="600px" elevation="3">

                <v-form ref="form" lazy-validation>
                    <v-card-title class="pa-3 display-1 font-weight-bold">Login</v-card-title>
                    <!-- <v-alert v-show="successAlert" class="mt-4" type="success" elevation="2" outlined transition="fade-transition">Login erfolgreich!</v-alert> -->
                    <v-alert v-show="errorAlert" class="mt-4 mx-2" type="error" elevation="2" outlined transition="fade-transition" dense>Email oder Password ist fehlerhaft.</v-alert>
                    <v-card-text class="pa-2">
                        
                            <!-- E-MAIL -->
                            <v-text-field label="E-Mail" color="green" :rules="usernameRules" v-model="user.username" required prepend-icon="mdi-account"/>
   
                            <!-- PASSWORD -->
                            <v-text-field type="password" color="green" label="Passwort" :rules="passwordRules" v-model="user.password" required prepend-icon="mdi-lock"/>
                            <v-btn class="ml-6" to="/passwordReset" type="submit" text small>Passwort vergessen?</v-btn>
                        <!-- <p>{{person.email}}</p>
                        <p>{{person.password}}</p> -->
                    </v-card-text>
                    <!-- SUBMIT -->
                    <v-card-actions class="pa-0 pt-4" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            @click="login()"
                            :loading="loading"
                            :elevation="5"
                            color="green"
                            width="100%">
                            Login</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    data () {
      return {
        user: {
            username: "",
            password: "",
        },
        usernameRules: [
            v => !!v || 'E-Mail ist erforderlich',
        ],
        passwordRules: [
            v => !!v || 'Passwort ist erforderlich',
        ],
        person: "",
        loginResponse: "",
        token: "",
        errorAlert: false,
        loader: null,
        loading: false,
        message: '',
      };    
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },

    //     created() {
    //         if (this.loggedIn) {
    //             this.$router.push('/offers')
    //         }
    // },
    methods: {
        login(){
            this.loading = true;
            if (this.$refs.form.validate()) {
                const url = "/auth/signin";
                var data = {
                    email: this.user.username,
                    password: this.user.password
                }
                this.$http.post(url, data)
                .then((response) => {
                    if (response.data.accessToken && response.data.username) {
                        localStorage.setItem("token", response.data.accessToken)
                        localStorage.setItem("userUuid", response.data.username)
                        this.$store.state.loggedIn.auth = true
                        console.log(localStorage.getItem("token"))
                        console.log(localStorage.getItem("userUuid"))
                        this.getPerson()
                    }
                    this.$router.push('/offers');
                    this.loading = false;
                    this.hideAlert()
                })
                .catch((error) => {
                    console.log(error)
                    console.log("Error Login")
                    this.errorAlert = true
                    this.hideAlert()
                    this.loading = false;
                })
            } else {
                this.loading = false;
            }

        },
        getPerson(){
            const url = "/person/"+localStorage.getItem("userUuid")
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.get(url, config)
            .then((response) => {
                if (response.data != null) {
                    console.log(response.data)
                    this.$store.state.user.first = response.data.first
                    this.$store.state.user.last = response.data.last
                    if (response.data.personType == "PRIVATE") {
                        this.$store.state.user.personType = "Privatperson"
                    } else {
                        this.$store.state.user.personType = "Unternehmen"
                    }
                    this.$store.state.user.image = response.data.picture.image.data
                }
            })
            .catch((error) => {
                console.log(error)
        })
        },
        validate () {
            this.$refs.form.validate()
            console.log(this.$refs.form)
        },
        hideAlert(){
            setTimeout(() => {         
                this.successAlert = false
                this.errorAlert = false
        }, 3000);
    },
   
    }
}
</script>