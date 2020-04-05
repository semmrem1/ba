<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="green" text>Buchen</v-btn>
        </template>
            <v-card>
                <v-toolbar :color="options.color" dark dense flat><v-icon color="white">mdi-check</v-icon>
                    <v-card-title class="headline">Ernte buchen</v-card-title>
                </v-toolbar>
                <v-card-text class="body-2 pt-4">Bitte gib deine gewünschte Menge an Obst an, welche du ernten möchtest.</v-card-text>
                <v-card-text class="subtitle-1 font-weight-bold">Menge:</v-card-text>
                <v-row class="mt-2">
                    <v-col>
                        <v-btn class="ml-6" fab dark color="green darken-1">
                            <v-icon @click="increase" dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    
                    <v-col cols="5">
                        <v-text-field class="justify-center" color="green" outlined readonly :value="counter" suffix="KG">{{ counter }}</v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn class="ml-2" fab dark color="green darken-1">
                            <v-icon @click="decrease" dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-col>

                </v-row>

                <v-card-actions class="pt-2 mt-2">
                   <v-btn class="centered-input mx-auto mb-2" color="green darken-1 white--text" raised @click="dialog = false; snackbar= true" width="95%">ERNTE BUCHEN</v-btn>
                </v-card-actions>
            </v-card>
            
    </v-dialog>

</template>

<script>
export default {
    data() {
    return {
        snackbar: false,
        dialog: false,
        options: {
            color: "green",
            width: 290,
        },  
        counter: 10
    };

  },
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