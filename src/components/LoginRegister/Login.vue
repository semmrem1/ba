<template>
    <v-container fluid class="ma-0 pa-0">
        <!-- <v-img class="bg" :cover="true" height="80vh" contain src="https://images.unsplash.com/photo-1539756250244-b39c3a836b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80"> -->
        <v-row class="justify-center">
            
            <!-- CARD -->
            <v-card class="ma-0 mt-4 pa-1" width="90%" max-width="600px" elevation="3">

                <v-form name="form" type="submit">
                    <v-card-title class="pa-3 display-1 font-weight-bold">Login</v-card-title>
                    <v-alert v-show="errorAlert" class="mt-4 mx-2" type="error" elevation="2" outlined transition="fade-transition" dense>Email oder Password falsch!</v-alert>
                    <v-card-text class="pa-2">
                        
                            <!-- E-MAIL -->
                            <!-- v-validate="'required'" -->
                            <v-text-field label="E-Mail" color="green" v-model="person.email"  prepend-icon="mdi-account"/>
   
                            <!-- PASSWORD -->
                            <v-text-field type="password" color="green" label="Passwort" v-model="person.password" prepend-icon="mdi-lock"/>
                            <v-btn class="ml-6" to="/passwordReset" text small>Passwort vergessen?</v-btn>
                        <!-- <p>{{person.email}}</p>
                        <p>{{person.password}}</p> -->
                    </v-card-text>
                    <!-- SUBMIT -->
                    <v-card-actions class="pa-0 pt-4" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            
                            @click="login"
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
import Person from '@/models/Person';

export default {
    name: 'Login',
    data () {
      return {
        errorAlert: '',
        person: new Person ('', ''),
        loader: null,
        loading: false,
        message: '',
      };    
    },
    computed: {
        // isComplete(){
        //     return this.person.email && this.person.password;
        // },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
        created() {
            if (this.loggedIn) {
                this.$router.push('/profile')
            }
    },
    methods: {
        login(){
            this.loading = true
            var data = {
                username: this.person.email,
                password: this.person.password
            }
            this.$http.post("http://localhost:3000/login", data)
            .then((response) => {
                console.log(response)
                this.person = response.data
                this.token = response.data.token
                localStorage.setItem("token", response.data.token)
                this.$router.push('/profile');
                this.loading = false
                
            })
            .catch((error) => {
                this.errorAlert = true
                console.log(error);
                console.log("login() run into error")
                this.loading = false
            })
        }

        // login(){
        //     this.loadig = true;
        //     if (this.person.email && this.person.password) {
        //         this.$store.dispatch('/login', this.person).then(
        //             () => {
        //               this.$router.push('/profile');
        //             },
        //             error => {
        //                this.loading = false;
        //                this.message =
        //                 (error.response && error.response.data) ||
        //                 error.message ||
        //                 error.toString();
        //             }
        //         );
        // }

        // }

    }
   
}
</script>
