<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <!-- CARD -->
            <v-card class="ma-0 pa-1" width="90%" max-width="600px" elevation="3">

                <v-form name="form">
                    <v-card-title class="pa-3 display-1 font-weight-bold">Login</v-card-title>
                    <v-card-text class="pa-2">
                        
                            <!-- E-MAIL -->
                            <!-- v-validate="'required'" -->
                            <v-text-field label="E-Mail" v-model="person.email"  prepend-icon="mdi-account"/>
   
                            <!-- PASSWORD -->
                            <v-text-field type="password" label="Passwort" v-model="person.password" prepend-icon="mdi-lock"/>
                            <v-btn class="pl-8" to="/passwordReset" text small>Passwort vergessen?</v-btn>
                        
                    </v-card-text>
                    <!-- SUBMIT -->
                    <v-card-actions class="pa-0 pt-4" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
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
        <div class="py-12"></div>
        <div class="py-12"></div>
    </v-container>
</template>

<script>
import Person from '@/models/Person';

export default {
    name: 'Login',
    data () {
      return {
        person: new Person ('', ''),
        loading: false,
        message: '',
      };    
    },
    computed: {
        isComplete(){
            return this.person.email && this.person.password;
        },
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
            this.loadig = true;

        }
    // handleLogin() {
    //   this.loading = true;
    //   this.$validator.validateAll().then(isValid => {
    //     if (!isValid) {
    //       this.loading = false;
    //       return;
    //     }

    //     if (this.person.email && this.person.password) {
    //       this.$store.dispatch('/login', this.person).then(
    //         () => {
    //           this.$router.push('/profile');
    //         },
    //         error => {
    //           this.loading = false;
    //           this.message =
    //             (error.response && error.response.data) ||
    //             error.message ||
    //             error.toString();
    //         }
    //       );
    //     }
    //   });
    // }
    }
   
}
</script>