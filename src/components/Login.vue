<template>
    <v-container fluid class="ma-0 pa-0">
        <!-- <v-img class="elevation-5" justify="center" src="https://images.unsplash.com/photo-1576179636333-f13b174b3c9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"> -->
            <v-row class="justify-center">
                <v-card class="ma-0 mt-8 pa-4" width="90%" max-width="600px" elevation="3">
                    <v-card-title class="pa-3">Login</v-card-title>
                    <v-card-text class="pa-2">
                        <v-form>
                            <v-text-field label="Benutzername" prepend-icon="mdi-account"/>
                            <v-text-field type="password" label="Passwort" prepend-icon="mdi-lock"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-0" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            to="/Offers"
                            :loading="loading"
                            :disabled="loading"
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
        loader: null,
        loading: false,
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