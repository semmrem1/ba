<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-1" width="90%" max-width="600px" elevation="3">
                <v-card-title class="pa-3 display-1 font-weight-bold">Kontakt</v-card-title>
                <v-alert v-show="successAlert" class="mt-4 mx-3" type="success" elevation="2" outlined transition="fade-transition">
                <p class="pa-0 ma-0 font-weight-bold">Nachricht erfolgreich gesendet!</p></v-alert>
                <!-- Form -->
                <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                    <div>
                        <v-text-field class="py-0" color="green" label="Name" v-model="message.name"></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="emailRules" label="E-Mail" v-model="message.email" required></v-text-field>
                        <v-text-field class="py-0" color="green" label="Betreff" v-model="message.topic"></v-text-field>
                        <v-textarea label="Ihre Nachricht" v-model="message.message" :rules="messageRules" required :counter="0"></v-textarea>
                    </div>
                    <v-row class="pt-6">
                        <v-col class="pl-3 pr-1" cols="4">
                            <v-btn class="mx-auto" color="grey darken-1 white--text" outlined @click="reset" width="95%">
                                <v-icon>mdi-autorenew</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="pr-0 pl-0" cols="8">
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" raised :loading="loading" @click="postMessage()" width="95%">SENDEN</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
        uuid: "5e9ac90c0a975a3a277cc343",
        loading: false,
        successAlert: false,
        message: {
            name: "",
            email: "",
            topic: "", 
            message: "",
        },
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name ist erforderlich',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-Mail ist erforderlich',
            v => /.+@.+\..+/.test(v) || 'E-mail muss gültig sein'
        ],
        topic: '',
        topicRules: [
            v => !!v || 'Betreff ist erforderlich',
        ],
        messageRules: [
            v => !!v || 'Nachricht ist erforderlich',
        ]
        }
    },
    methods: {
        validate () {
        this.$refs.form.validate()
        },
        reset () {
        this.$refs.form.reset()
      },
      postMessage(){
          if (this.$refs.form.validate()) {
            this.loading = true
            const url = "/contactform";
            var config = {headers: {"userid": this.uuid}};
            var data = {
                name: this.message.name,
                email: this.message.email,
                topic: this.message.topic,
                message: this.message.message
            }
            this.$http.post(url, data, config)
            .then((response) => {
                console.log(response)
                console.log("SUCCESS")
                this.successAlert = true
                this.loading = false
                this.hideAlert()
                this.$refs.form.reset()
            })
            .catch((error) => {
                console.log(error)
                console.log("ERROR")
                this.loading = false
            })
            }
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