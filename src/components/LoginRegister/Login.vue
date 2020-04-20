<template>
    <v-container fluid class="ma-0 pa-0">
        <!-- <v-img class="bg" :cover="true" height="80vh" contain src="https://images.unsplash.com/photo-1539756250244-b39c3a836b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80"> -->
        <div class="pa-4">
            {{ token }}
        </div>
        <div class="pa-4">
            {
            "username": "remo",
            "password": "7LaTS32wHv86"
            }
        </div>

        <v-row class="justify-center">    
            <!-- CARD -->
            <v-card class="ma-0 mt-4 pa-1" width="90%" max-width="600px" elevation="3">

                <v-form name="form" lazy-validation>
                    <v-card-title class="pa-3 display-1 font-weight-bold">Login</v-card-title>
                    <v-alert v-show="errorAlert" class="mt-4 mx-2" type="error" elevation="2" outlined transition="fade-transition" dense>Email oder Password ist nicht korrekt!</v-alert>
                    <v-card-text class="pa-2">
                        
                            <!-- E-MAIL -->
                            <v-text-field label="E-Mail" color="green" :rules="usernameRules" v-model="user.username"  prepend-icon="mdi-account"/>
   
                            <!-- PASSWORD -->
                            <v-text-field type="password" color="green" label="Passwort" :rules="passwordRules" v-model="user.password" prepend-icon="mdi-lock"/>
                            <v-btn class="ml-6" to="/passwordReset" type="submit" text small>Passwort vergessen?</v-btn>
                        <!-- <p>{{person.email}}</p>
                        <p>{{person.password}}</p> -->
                    </v-card-text>
                    <!-- SUBMIT -->
                    <v-card-actions class="pa-0 pt-4" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            @click="handleLogin()"
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
        <!-- </v-img> -->
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
        handleLogin() {
            if (!this.user.username) {
                this.errorAlert = true
                this.hideAlert()
            } else {
            this.loading = true;
                if (this.user.username && this.user.password) {
                this.$store.dispatch('auth/login', this.user)
                .then(() => {
                    // this.$router.push('/offers');
                    this.loginResponse = localStorage.getItem("user")
                    this.token = localStorage.getItem("token")
                    this.loading = false;
                    },
                    // error => {
                    // this.loading = false;
                    // this.message =
                    //     (error.response && error.response.data) ||
                    //     error.message ||
                    //     error.toString();
                    // }
                )
                .catch(() => {
                    console.log("hello")
                    this.loading = false;
                });
            }
            }
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