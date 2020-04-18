<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-1" width="90%" max-width="600px" elevation="3">
                    <v-card-title class="pa-3 display-1 font-weight-bold">E-Mail bestätigen</v-card-title>
                    <v-card-text class="px-3">
                    Bitte bestätige deine E-Mailadresse, damit wir deinen Account erstellen können.
                    </v-card-text>
                    <v-card-actions class="pa-0" justify-center>
                        <v-col class="px-2" justify-center cols="12">
                            <v-btn class="btn white--text"
                            :loading="loading"
                            :disabled="loading"
                            :elevation="5"
                            color="green"
                            @click="verifyEmail()"
                            width="100%">
                            Bestätigen</v-btn>
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
        uuid: "5e9ac90c0a975a3a277cc343",
        loader: null,
        loading: false,
      }    
    },
    methods: {
      verifyEmail(){
            this.loading = true
            const url = "/validateEmail/"+this.uuid;
            var config = {headers: {"userid": this.uuid}};
            this.$http.post(url, config)
            .then((response) => {
                console.log(response)
                console.log("SUCCESS")
                this.$router.push('/login');
                this.loading = false
            })
            .catch((error) => {
                console.log(error)
                console.log("ERROR")
                this.loading = false
            })
        },
        hideAlert(){
            setTimeout(() => {         
                this.successAlert = false
                this.errorAlert = false
        }, 2000);
        }
    } 
}
</script>