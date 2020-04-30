<template>
  <v-container class="justify-center ma-0 pt-0 px-4" cols="12" sm="6" md="8">

        <v-row class="justify-center">

            <v-progress-linear
                :active="!loaded"
                indeterminate
                absolute
                height="2px"
                color="blue"
                background-opacity = 0.0
            ></v-progress-linear>

        </v-row>

    
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

              <!-- <p>$store offer: {{this.$store.state.offer}}</p> -->


              <!-- <p>base64 pictures {{pictureCode}}</p> -->
   
      </v-col>

      <v-col>
        <v-row class="px-0">
          <v-col class="pa-0 pl-1" cols="12">
            <v-combobox
              v-model="filterCategory"
              :items="types"
              color="green"
              label="Obstsorte"
              item-text="name"
              item-value="uuid"
              multiplew
              clearable
              chips
            ></v-combobox>
          </v-col>

          <!-- <v-col cols="2" xs="3">
            <v-spacer></v-spacer>
            <v-btn color="green" outlined large @click="getOffers()">Suchen</v-btn>
          </v-col> -->
        </v-row>

        <!-- <v-row>
          <v-col class="pa-0 pl-1">
            <v-slider
              v-model="slider"
              class="align-center pa-0"
              color="green"
              track-color="grey"
              :max="max"
              :min="min"
              hide-details
            >
              <template v-slot:append>
                <v-text-field
                  v-model="slider"
                  class="mt-0 pa-0 mr-3"
                  suffix="kg"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row> -->

      </v-col>

      <v-alert v-show="emptyAlert" class="mt-4 mx-0" type="warning" color="red" elevation="2" outlined prominent transition="fade-transition">Leider sind aktuell keine Angebote verfügbar. Bitte versuchen Sie ez zu einem späteren Zeitpunkt nocheinmal.</v-alert>
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

                  <!-- <v-row>
                    <v-card-subtitle class="font-weight-bold pa-0 pt-1">Picture Uuid: {{ offers.offersReturn[i].productPictureUuid }}</v-card-subtitle>
                  </v-row> -->

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
    <div class="py-12"></div>
    <!-- <v-row class="justify-center">
      <v-btn color="green" outlined @click="getOffers()">MEHR</v-btn>
    </v-row>    -->
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
        counter: 0,
        skeletonLoader: true,
        loaded: false,
        successAlert: false,
        errorAlert: false,
        emptyAlert: false,
        min: 0,
        max: 40,
        slider: 10,
        range: [-20, 70],
        select: ['Äpfel'],
        offers: [],
        offerUuids: [],
        pictureUuids: [],
        pictureCode: [],
        loading: false,
        type: "",
        types: [],
        dialog: false,
        options: {
            color: "green",
        },  
        currentDialog: null,
        amountInKg: 10,
        filterAmount: 50,
        filterCategory: "",
    }
    },
    mounted:function(){
        this.getCategory()
        this.getOffers()
    },
    computed: {
        offerImage(){
          return `data:image/png;base64, ${this.pictureCode[0]}`
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
      getCategory(){
            var uuid = this.uuid
            const url = "/category";
            var config = {headers: {"userid": uuid}};
            this.$http.get(url, config)
        .then((response) => {
            this.types = response.data
        })
        .catch((error) => {
            console.log(error.response)
        })
      },
      getOffers(){
        const url = "/searchresult/person/"+this.$store.state.user.uuid;
        var config = {headers: {"userid": this.$store.state.user.uuid}};
        // var params = {
        //   filerAmount: this.filterAmount,
        //   filterCategory: this.filterCategory.uuid
        // };
        this.$http.get(url, config)
        .then((response) => {
          console.log("SUCCESS getOffers")
          if (response.data[0].length != 0) {
            console.log(response.data[0])
            this.offers = response.data[0]
            this.loaded = true
            // console.log(response.data[0].offersReturn[0].uuid)
            response.data[0].offersReturn.forEach(element => {
              this.offerUuids.push(element.uuid)
              this.$store.state.offer.uuid = this.offerUuids.slice()
              this.pictureUuids.push(element.productPictureUuid)
              this.$store.state.offer.image = this.pictureUuids.slice()
              // console.log(this.$store.state.offer.uuid)
              this.getImages()
          });
          }

        })
        .catch((response) => {
          this.emptyAlert = true
          this.hideAlert()
          console.log(response)
          console.log("ERROR getOffers")
        })
      },
      getImages(){
        this.pictureUuids.forEach(element => {
        const url = "/picture/"+element;
        var config = {headers: {"userid": this.$store.state.user.uuid}};
        this.$http.get(url, config)
        .then((response) => {
          if (response.data.length != 0) {
          console.log(response.data)
          console.log("SUCCESS getImage")
          console.log(element)
          this.pictureCode.push(response.data.image.data)
          }
        })
        .catch((response) => {
          console.log(response)
          console.log("ERROR")
        })
        });
      },
      postBooking(){
        const url = "/booking";
        var config = {headers: {"userid": this.$store.state.user.uuid}};
        var data = 
        {
            offer: {
                uuid: "5e9acbaf0a975a3a277cc349"
            },
            requester: {
                uuid: this.$store.state.user.uuid
            },
            amountInKg: this.amountInKg,
        }    
        this.loading = true
        this.$http.post(url, data, config)
        .then((response) => {
            console.log(response)
            console.log("SUCCESS postBooking")
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
                this.loaded = true
            }, 2000);
        }
    },
}

</script>


