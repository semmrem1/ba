<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="dark-grey" text>bearbeiten</v-btn>
        </template>
            <v-card>
                <v-card-title class="headline">Ernte bearbeiten</v-card-title>
                <!-- Bearbeiten -->
                <v-row class="py-0" justify="center">
                    <!-- Ort -->
                    <v-col class="pb-4 px-5" cols="3">
                        <v-card-text class="subtitle-1 font-weight-bold px-0">Ort:</v-card-text>
                    </v-col>
                    <v-col  cols="3">
                        <v-text-field class="py-0" color="green" label="PLZ" v-model="plz"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field class="py-0" color="green" label="Ort" v-model="location"></v-text-field>
                    </v-col>
                    
                    <!-- Menge -->
                    <v-col class="px-5" cols="8">
                        <v-card-text class="subtitle-1 font-weight-bold px-0">Menge:</v-card-text>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field  color="green" :rules="avQuantityRules" v-model="avQuantity" suffix="kg"></v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions class="pt-2 mt-2">
                   <v-btn class="centered-input mx-auto mb-2" color="green darken-1 white--text" raised @click="dialog = false" width="95%">SPEICHERN</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>

</template>

<script>
export default {
    data: () => ({
        snackbar: false,
        dialog: false,
        counter: 10,
        crops: [
        {
            bookingNumber: '#123456',
            plz: '8400',
            location: 'Winterthur',
            quantity: '25kg',
            date: '22.02.2020',
        },
        {
            bookingNumber: '#123456',
            plz: '8400',
            location: 'Winterthur',
            quantity: '25kg',
            date: '22.02.2020',
        },

        ],
    }),
    methods: {
      increase: function(){
          this.counter++;
      },
      decrease: function(){
          if(this.counter > 0){
            this.counter--;              
          }

      }
  }
};

</script>

<style scoped>
    /* .centered-input {
      text-align: center
    } */
</style>