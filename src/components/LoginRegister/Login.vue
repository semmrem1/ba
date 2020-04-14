<template>
    <v-container fluid class="ma-0 pa-0">
        <!-- <v-img class="bg" :cover="true" height="80vh" contain src="https://images.unsplash.com/photo-1539756250244-b39c3a836b85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80"> -->
        <v-row class="justify-center">
            
            <!-- CARD -->
            <v-card class="ma-0 mt-4 pa-1" width="90%" max-width="600px" elevation="3">

                <v-form name="form" type="submit" @submit.prevent="login">
                    <v-card-title class="pa-3 display-1 font-weight-bold">Login</v-card-title>
                    <v-alert v-show="errorAlert" class="mt-4 mx-2" type="error" elevation="2" outlined transition="fade-transition" dense>Email oder Password ist nicht korrekt!</v-alert>
                    <v-card-text class="pa-2">
                        
                            <!-- E-MAIL -->
                            <v-text-field label="E-Mail" color="green" v-model="user.username"  prepend-icon="mdi-account"/>
   
                            <!-- PASSWORD -->
                            <v-text-field type="password" color="green" label="Passwort" v-model="user.password" prepend-icon="mdi-lock"/>
                            <v-btn class="ml-6" to="/passwordReset" type="submit" text small>Passwort vergessen?</v-btn>
                        <!-- <p>{{person.email}}</p>
                        <p>{{person.password}}</p> -->
                    </v-card-text>
                    <!-- SUBMIT -->
                    <v-card-actions class="pa-0 pt-4" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            
                            @click="handleLogin"
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
        errorAlert: '',
        person: "",
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
        created() {
            if (this.loggedIn) {
                this.$router.push('/profile')
            }
    },
    methods: {
        handleLogin() {
            this.loading = true;
                if (this.user.username && this.user.password) {
                this.$store.dispatch('auth/login', this.user).then(
                    () => {
                    this.$router.push('/profile');
                    },
                    error => {
                    this.loading = false;
                    this.message =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    }
                );
            }
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
