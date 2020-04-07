<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-1" width="90%" max-width="600px" elevation="3">
                    <v-card-title class="pa-3 display-1 font-weight-bold">Passwort anfordern</v-card-title>
                    <v-card-text class="px-3">
                    Gib deine E-Mailaddresse an um ein neues Passwort anzufordern.
                        <v-form>
                            <v-text-field class="pt-8" label="E-Mail"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-0" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            :loading="loading"
                            :disabled="loading"
                            :elevation="5"
                            color="green"
                            @click="submit"
                            width="100%">
                            Passwort anfordern</v-btn>
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
    methods: {
        submit(){

        }
    } 
}
</script>