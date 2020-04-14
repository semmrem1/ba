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
                        <v-text-field v-model="amountInKg" class="justify-center" color="green" outlined readonly :value="amountInKg" suffix="KG">{{ amountInKg }}</v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn class="ml-2" fab dark color="green darken-1">
                            <v-icon @click="decrease" dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-col>

                </v-row>

                <v-card-actions class="pt-2 mt-2">
                   <!-- <v-btn class="centered-input mx-auto mb-2" color="green darken-1 white--text" raised @click="showBooking()" width="95%">ERNTE BUCHEN</v-btn> -->
                   <v-btn @click="postBooking()" class="centered-input mx-auto mb-2" color="green darken-1 white--text" :loading="loading" raised width="95%">ERNTE BUCHEN</v-btn>
                   <!-- <bookingOverview @click="postBooking()"></bookingOverview> -->
                </v-card-actions>
            </v-card>
            
    </v-dialog>

</template>

<script>
// import bookingOverview from "../Offers/bookingOverview"

export default {
    // components: { bookingOverview },
    data() {
    return {
        uuid: "5e8b8cf50a975a541edfda68",
        snackbar: false,
        loading: false,
        dialog: false,
        options: {
            color: "green",
            width: 290,
        },  
        currentDialog: null,
        amountInKg: 10,
    };

  },
    methods: {
      increase: function(){
          this.amountInKg++;
      },
      decrease: function(){
          if(this.amountInKg > 0){
            this.amountInKg--;              
          }

      },
      showBooking(){
        //   this.currentDialog = components
      },
      postBooking(){
            const url = "/booking";
            var config = {headers: {"userid": this.uuid}};
            var data = 
            {
                offer: {
                    uuid: "5e8cd9a40a975a1d15edb39d"
                },
                requester: {
                    uuid: this.uuid
                },
                amountInKg: this.amountInKg,
            }    
            this.loading = true
            this.$http.post(url, data, config)
            .then((response) => {
                console.log(response)
                console.log("SUCCESS")
                this.successAlert = true
                this.loading = false
                this.dialog = false
            })
            .catch((error) => {
                console.log(error)
                console.log("ERROR")
                this.loading = false
                this.dialog = false
            })
      }
  }
    
};

</script>

<style scoped>
    /* .centered-input {
      text-align: center
    } */
</style>