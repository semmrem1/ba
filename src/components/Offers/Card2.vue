<template>
  <v-container class="justify-center ma-0 py-2 px-4" cols="12" sm="6" md="8">

    
    <v-col class="pa-0 mr-0" cols="12">
          <v-alert v-show="successAlert" class="mt-4 mx-4" type="success" elevation="2" outlined transition="fade-transition">Änderungen erfolgreich gespeichert!</v-alert>
          <v-alert v-show="errorAlert" class="mt-4 mx-4" type="error" elevation="2" outlined  transition="fade-transition">Änderungen fehlgeschlagen!</v-alert>

          <!-- ### ROW FOR TESTING PURPOSES ### -->
          <v-row>
            <v-col cols="6">
                <v-btn @click="getOfferUuids()">GET Offer Uuids</v-btn>
                <p>offerUuids:</p>
                <!-- <div v-for="(item, i) in offerUuids" :key="i">
                  <span>{{offerUuids[i]}}</span>
                </div> -->
                <span>{{offerUuids}}</span>
            </v-col>
            <v-col cols="6">
              <v-btn @click="getOffersbyUuid()">GET  Offers By Uuid</v-btn>
              <p>Offer:</p>
              <!-- <p>{{offer}}</p>
              <p>asdf</p> -->
              <!-- <div v-for="(item, i) in offer" :key="i">
                <p>{{offer[i]}}</p>
              </div> -->
              <p>{{this.offer}}</p>
              <!-- <p>{{offer[0].uuid}}</p> -->

              <!-- <p>{{offer[0].uuid}}</p>
              <p>{{offer[0].location.city}}</p>
              <p>{{offer[0].location.postcode}}</p>
              <p>{{offer[0].amountInKg}}</p>
              <p>{{offer[0].until}}</p>
              <p>{{offer[0].from}}</p> -->
            </v-col>
          </v-row>


      </v-col>

      <v-row>
        <!-- ### TESTCARD ### --> 
          <v-col class="justify-center py-2" v-for="(item, i) in offer" :key="i" cols="12"  sm="6" md="6" lg="4">
            <!-- Card -->
            <v-card class="ma-0 pa-0" max-height="175" elevation="3">
              <v-row >
                <!-- IMG -->
                <v-col class="py-0" cols="6">
                  <v-avatar class="ma-0 pa-0" min-width="100%" height="200" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </v-col>

                <!-- Details -->
                <v-col class="pa-1 pl-5" cols="6">
                  <v-row>
                    <v-card-title class="pa-0 pt-1">Title</v-card-title>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">{{ offer.location.street }} {{ offer.location.streetnumber }}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">{{ offer.location.postcode }} {{ offer.location.city }}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0 pt-2">{{ offer.from }} bis {{ offer.until }}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">Menge: {{ offer.amountInKg }} Kg</v-card-subtitle>
                  </v-row>

                  <v-row class="justify-end align-end">
                    <v-spacer></v-spacer>
                    <span class="pr-5"><confirmBooking/></span>
                  </v-row>
                </v-col>
              </v-row> 
            </v-card>
        </v-col>


        <v-col class="justify-center py-2" v-for="(item, i) in items" :key="i" cols="12"  sm="6" md="6" lg="4">
          <!-- Card -->
          <v-card class="ma-0 pa-0" max-height="175" elevation="3">
            <v-row >
              <!-- IMG -->
              <v-col class="py-0" cols="6">
                <v-avatar class="ma-0 pa-0" min-width="100%" height="175" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </v-col>

              <!-- Details -->
              <v-col class="pa-1 pl-5" cols="6">
                <v-row>
                  <v-card-title class="pa-0 pt-1" v-text="item.title"></v-card-title>
                </v-row>

                <v-row>
                  <v-card-subtitle class="pa-0">{{ item.postcode }} {{ item.location }}</v-card-subtitle>
                </v-row>

                <v-row>
                  <v-card-subtitle class="pa-0">Max. {{ item.quantity }}</v-card-subtitle>
                </v-row>

                <v-row>
                  <v-card-subtitle class="pa-0">{{ item.date }} bis {{ item.date }}</v-card-subtitle>
                </v-row>

                <v-row class="justify-end align-end">
                  <v-spacer></v-spacer>
                  <span class="pr-6"><confirmBooking/></span>
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
import confirmBooking from "../Offers/confirmBooking"
import searchSub from "./searchSub"

export default {  
  components: { confirmBooking, searchSub },

    data() {
      return {
        uuid: "5e8b8cf50a975a541edfda68",
        counter: 0,
        skeletonLoader: true,
        successAlert: false,
        errorAlert: false,
        min: 0,
        max: 40,
        slider: 10,
        range: [-20, 70],
        select: ['Äpfel'],
        // fruit: null, 
        offer: [
        ],
        offerUuids: [],
        items: [
        {
          src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          title: 'Bio Gala',
          postcode: '8450',
          location: 'Hettingen',
          quantity: '15kg',
          date: '23.09.2020',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          postcode: '8450',
          location: 'Hettingen',
          quantity: '15kg',
          date: '23.09.2020',
        },
      ],
    }
    },
    mounted(){
        // this.getCategory()
        this.getOfferUuids()
    },
    methods: {
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
        getOfferUuids(){
          // ### Counter is for multiple arrays later in this project ###
            const url = "/searchresult/person/"+this.uuid;
            var config = {headers: {"userid": this.uuid}};
            this.$http.get(url, config)
            .then((response) => {
                console.log(response)
                console.log("SUCCESS")
                this.offerUuids = response.data[0].offerUuids
                // this.getOffersbyUuid()
            })
            .catch((error) => {
                console.log(error.response)
                console.log("ERROR")
            })
        },
        getOffersbyUuid(){
          for (let i = 0; i < 2; i++) {
            const offerID = this.offerUuids[i];
            const url = "/offer/"+offerID;
            var config = {headers: {"userid": this.uuid}};
            this.$http.get(url, config)
            .then((response) => {
                console.log(response.data)
                console.log(offerID)
                this.offer = response.data
                this.dateFormatted()
            })
            .catch((error) => {
                console.log(error.response)
                console.log("ERROR")
            })
          }
                      // const url = "/offer/"+this.offerUuids[0];
            // var config = {headers: {"userid": this.uuid}};
            // this.$http.get(url, config)
            // .then((response) => {
            //     console.log(response)
            //     this.offer.push(response.data)
            //     this.dateFormatted()
            //     })
            // .catch((error) => {
            //     console.log(error.response)
            //     console.log("ERROR")
            // })
      },

      dateFormatted(){
        var dateUntilString = this.offer.until
        var dateFromString = this.offer.from
        var dU = new Date(dateUntilString);
        var dF = new Date(dateFromString);
        var dateUntil = (dU.getDate()) + "." + dU.getMonth() + "." + dU.getFullYear();
        var dateFrom = (dF.getDate()) + "." + dF.getMonth() + ".";
        this.offer.until =  dateUntil
        this.offer.from = dateFrom
      }
    },


}
</script>
