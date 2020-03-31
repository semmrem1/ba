<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-1" width="90%" max-width="600px" elevation="3">
                    <v-card-title class="pa-3 display-1 font-weight-bold">Login</v-card-title>
                    <v-card-text class="pa-2">
                        <v-form>
                            <v-text-field label="E-Mail" v-model="person.email" prepend-icon="mdi-account"/>
                            <v-text-field type="password" label="Passwort" v-model="person.password" prepend-icon="mdi-lock"/>
                            <v-btn class="pl-8" to="/passwordReset" text small>Passwort vergessen?</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-0 pt-4" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            to="/Offers"
                            :loading="loading"
                            :disabled="!isComplete"
                            :elevation="5"
                            color="green"
                            @click="loader = 'loading'"
                            width="100%">
                            Login</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-row>
        <div class="py-12"></div>
        <div class="py-12"></div>
    </v-container>
</template>

<script>
export default {
    data () {
      return {
        person: {
            email: '',
            password: ''
        },
        loader: null,
        loading: false,
      }    
    },
    computed: {
        isComplete(){
            return this.person.email && this.person.password
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
}
</script>