<template>
    <v-container fluid class="ma-0 px-0">
        <v-row class="justify-center">
            <v-card class="ma-0 pa-1" width="90%" max-width="600px" elevation="3">
                <v-card-title class="pa-3 display-1 font-weight-bold">Kontakt</v-card-title>
                <!-- Form -->
                <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
                    <div>
                        <v-text-field class="py-0" color="green" :rules="nameRules" label="Name" v-model="name" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="emailRules" label="E-Mail" v-model="email" required></v-text-field>
                        <v-text-field class="py-0" color="green" :rules="topicRules" label="Betreff" v-model="topic" required></v-text-field>
                        <v-textarea label="Ihre Nachricht" :counter="0"></v-textarea>
                    </div>
                    <v-row class="pt-6">
                        <v-col class="pl-3 pr-1" cols="4">
                            <v-btn class="mx-auto" color="grey darken-1 white--text" outlined @click="reset" width="95%">
                                <v-icon>mdi-autorenew</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="pr-0 pl-0" cols="8">
                            <v-btn class="mx-auto mb-1" color="green darken-1 white--text" raised @click="validate" width="95%">SENDEN</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
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

    }),
    methods: {
        validate () {
        this.$refs.form.validate()
        console.log(this.name, this.email, this.betreff)
        },
        reset () {
        this.$refs.form.reset()
      },
    }
    
    
}
</script>