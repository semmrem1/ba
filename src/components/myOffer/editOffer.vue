<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="dark-grey" text>
                <!-- <v-icon left>mdi-pencil</v-icon> -->
                bearbeiten</v-btn>
        </template>
            <v-card>
                <v-toolbar :color="options.color" dark dense flat><v-icon class="pr-3" size="x-large">mdi-pencil</v-icon>
                    <v-card-title class="white--text font-weight-bold">Ernte bearbeiten</v-card-title>
                </v-toolbar>
                <!-- Bearbeiten -->
                <v-row class="px-4" justify="center">
                <v-card-text class="body-2 pt-4">Falls sich die verfügbare Menge geändert hat.</v-card-text>
                    <v-row class="px-4 pt-2" justify="center">
                        <v-col class="py-0" cols="8">
                            <v-card-text class="subtitle-1 font-weight-bold px-0">Menge:</v-card-text>
                        </v-col>
                        <v-col class="py-0" cols="4">
                            <v-text-field  color="green" suffix="kg"></v-text-field>
                        </v-col>
                    </v-row>
                </v-row>
                <v-card-actions class="pa-4">
                    <v-btn @click="cancel" outlined width="40%" color="grey">Abbrechen</v-btn>
                   <v-btn color="green darken-1 white--text" raised width="60%" @click="dialog = false">SPEICHERN</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>

</template>

<script>
export default {
    data () {
    return {
        snackbar: false,
        dialog: false,
        counter: 10,
        options: {
            color: "green",
            width: 290,
        },
        // crops: [
        // {
        //     bookingNumber: '#123456',
        //     plz: '8400',
        //     location: 'Winterthur',
        //     quantity: '25kg',
        //     date: '22.02.2020',
        // },
        // {
        //     bookingNumber: '#123456',
        //     plz: '8400',
        //     location: 'Winterthur',
        //     quantity: '25kg',
        //     date: '22.02.2020',
        // },
        // ],
        }
    },
    methods: {
        increase: function(){
          this.counter++;
      },
        decrease: function(){
          if(this.counter > 0){
            this.counter--;              
          }

      },
        cancel() {
            this.dialog = false
    }
  }
};

</script>

<style scoped>
    /* .centered-input {
      text-align: center
    } */
</style>