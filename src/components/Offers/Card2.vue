<template>
  <v-container class="justify-center ma-0 py-2 px-4" cols="12" sm="6" md="8">

    
    <v-col class="pa-0 mr-0" cols="12">
          <v-alert v-show="successAlert" class="mt-4 mx-0" type="success" elevation="2" outlined transition="fade-transition">Buchung erfolgreich gespeichert! Bitte überprüfen Sie ihren Posteingang.</v-alert>
          <v-alert v-show="errorAlert" class="mt-4 mx-0" type="error" elevation="2" outlined  transition="fade-transition">Buchung fehlgeschlagen!</v-alert>

          <!-- ### ROW FOR TESTING PURPOSES ### -->
          <!-- <v-row>
            <v-col cols="6">
              <v-btn @click="getOffers()">GET  Offers</v-btn>
              <p>Offers:</p>
              {{offers.offersReturn[0]}}

              {{offers.offersReturn[0].from}}
              {{this.offers.offersReturn.until}}
              {{offers.offersReturn[0].until}}

              
              <span>{{moment(offers.offersReturn[0].until).format('DD.MM')}}</span>
            </v-col>
          </v-row> -->
               <!-- {{this.$store.state.offer.uuid}} -->

               <!-- pictureUuids:
               {{pictureUuids}}
               {{this.$store.state.offer.image}} -->


          <!-- <v-row>
            <v-btn @click="getImages()">getImages</v-btn>
          </v-row> -->

   
      </v-col>

      <v-row>
        <!-- ### TESTCARD ### --> 
          <v-col class="justify-center py-2" v-for="(item, i) in offers.offersReturn" :key="i" cols="12"  sm="6" md="6" lg="4">
            <!-- Card -->
            <v-card class="ma-0 pa-0" max-height="175" elevation="3">
              <v-row >
                <!-- IMG -->
                <v-col class="py-0" cols="6">
                  <v-avatar class="ma-0 pa-0" min-width="100%" height="175" tile>
                    <v-img max-height="175" :src="offerImage"></v-img>
                  </v-avatar>
                </v-col>

                <!-- Details -->
                <v-col class="pa-1 pl-5" cols="6">
                  <v-row>
                    <v-card-subtitle class="font-weight-bold pa-0 pt-1">{{ offers.offersReturn[i].uuid }}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">{{ offers.offersReturn[i].location.street }} {{offers.offersReturn[i].location.streetnumber}}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">{{offers.offersReturn[i].location.postcode}} {{ offers.offersReturn[i].location.city }}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0 pt-2">{{moment(offers.offersReturn[i].from).format('DD.MM')}} bis {{moment(offers.offersReturn[i].until).format('DD.MM.YYYY')}}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">Menge: {{ offers.offersReturn[i].amountInKg }} Kg</v-card-subtitle>
                  </v-row>

                  <v-row class="pr-6 pt-1 justify-end align-end">
                    <v-spacer></v-spacer>
                    <!-- <span class="pr-5"><confirmBooking/></span> -->

                        <v-dialog v-model="dialog" max-width="450">
                          <template v-slot:activator="{ on }">
                              <v-btn v-on="on" color="green" text>Buchen</v-btn>
                          </template>
                              <v-card>
                                  <v-toolbar :color="options.color" dark dense flat><v-icon color="white">mdi-check</v-icon>
                                      <v-card-title class="headline">Ernte buchen</v-card-title>
                                  </v-toolbar>

                                  <!-- {{this.$store.state.offer.uuid}} -->
                                  {{offers.offersReturn[i].uuid}}
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

                  </v-row>
                </v-col>
              </v-row> 
            </v-card>
        </v-col>

      </v-row>
    <searchSub/>   
  </v-container>
</template>

<script>
// import confirmBooking from "../Offers/confirmBooking"
import searchSub from "./searchSub"

export default {  
  components: { searchSub },

    data() {
      return {
        uuid: "5e9ac90c0a975a3a277cc343",
        pictureUuids: [
          "5e9c4fab0a975a6f0d9a839b",
          "5e9c560b0a975a12bb2d0677",
          "5e9c564c0a975a12bb2d0678"
        ],
        counter: 0,
        skeletonLoader: true,
        successAlert: false,
        errorAlert: false,
        min: 0,
        max: 40,
        slider: 10,
        range: [-20, 70],
        select: ['Äpfel'],
        offers: [],
        offerUuids: [],
        loading: false,
        dialog: false,
        options: {
            color: "green",
        },  
        currentDialog: null,
        amountInKg: 10,
      //   items: [
      //   {
      //     src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
      //     title: 'Bio Gala',
      //     postcode: '8450',
      //     location: 'Hettingen',
      //     quantity: '15kg',
      //     date: '23.09.2020',
      //   },
      //   {
      //     src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      //     title: 'Boskoop',
      //     postcode: '8450',
      //     location: 'Hettingen',
      //     quantity: '15kg',
      //     date: '23.09.2020',
      //   },
      // ],
    }
    },
    mounted(){
        // this.getCategory()
        this.getOffers()
    },
    computed: {
        offerImage(){
          return `data:image/png;base64, ${this.$store.state.offer.image}`
        }
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
      //   getCategory(){
      //       var uuid = this.uuid
      //       const url = "/category";
      //       var config = {headers: {"userid": uuid}};
      //       this.$http.get(url, config)
      //   .then((response) => {
      //       console.log(response)
      //       this.types = response.data
      //   })
      //   .catch((error) => {
      //       this.loading = false
      //       console.log(error.response)
      //   })
      // },
      getOffers(){
        const url = "/searchresult/person/"+this.$store.state.user.uuid;
        var config = {headers: {"userid": this.$store.state.user.uuid}};
        this.$http.get(url, config)
        .then((response) => {
          console.log(response)
          console.log("SUCCESS")
          this.offers = response.data[0]
          // console.log(response.data[0].offersReturn[0].uuid)
          response.data[0].offersReturn.forEach(element => {
            this.offerUuids.push(element.uuid)
            this.$store.state.offer.uuid = this.offerUuids.slice()
            console.log(this.$store.state.offer.uuid)
            this.getImages()
          });
        })
        .catch((response) => {
          console.log(response)
          console.log("ERROR")
        })
      },
      getImages(){
        const url = "/picture/"+this.pictureUuids[2];
        var config = {headers: {"userid": this.$store.state.user.uuid}};
        this.$http.get(url, config)
        .then((response) => {
          // console.log(response.data)
          // console.log(response.data.image.data)
          console.log("SUCCESS")
          this.$store.state.offer.image = response.data.image.data
        })
        .catch((response) => {
          console.log(response)
          console.log("ERROR")
        })
      },
      postBooking(){
        const url = "/booking";
        var config = {headers: {"userid": this.uuid}};
        var data = 
        {
            offer: {
                uuid: "5e9add3d0a975a62e51beade"
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
            this.hideAlert()
        })
        .catch((error) => {
            console.log(error)
            console.log("ERROR")
            this.loading = false
            this.dialog = false
            this.hideAlert()
        })
    },
        hideAlert(){
            setTimeout(() => {                
                this.successAlert = false
                this.errorAlert = false
            }, 2000);
        }
    },
}

</script>


