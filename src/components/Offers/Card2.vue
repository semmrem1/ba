<template>
  <v-container class="justify-center ma-0 py-2 px-4" cols="12" sm="6" md="8">

    
    <v-col class="pa-0 mr-0" cols="12">
          <v-alert v-show="successAlert" class="mt-4 mx-4" type="success" elevation="2" outlined transition="fade-transition">Änderungen erfolgreich gespeichert!</v-alert>
          <v-alert v-show="errorAlert" class="mt-4 mx-4" type="error" elevation="2" outlined  transition="fade-transition">Änderungen fehlgeschlagen!</v-alert>

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


      </v-col>

      <v-row>
        <!-- ### TESTCARD ### --> 
          <v-col class="justify-center py-2" v-for="(item, i) in offers.offersReturn" :key="i" cols="12"  sm="6" md="6" lg="4">
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
                    <v-card-title class="pa-0 pt-1">Gala Äpfel</v-card-title>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">{{ offers.offersReturn[i].location.street }} {{offers.offersReturn[i].location.streetnumber}}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">{{offers.offersReturn[i].location.postcode}} {{ offers.offersReturn[i].location.city }}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0 pt-2">{{moment(offers.offersReturn[i].until).format('DD.MM')}} bis {{moment(offers.offersReturn[i].until).format('DD.MM.YYYY')}}</v-card-subtitle>
                  </v-row>

                  <v-row>
                    <v-card-subtitle class="pa-0">Menge: {{ offers.offersReturn[i].amountInKg }} Kg</v-card-subtitle>
                  </v-row>

                  <v-row class="justify-end align-end">
                    <v-spacer></v-spacer>
                    <span class="pr-5"><confirmBooking/></span>
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
        uuid: "5e9ac90c0a975a3a277cc343",
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
        offers: [],
        offerUuids: [],
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
      getOffers(){
        const url = "/searchresult/person/"+this.uuid;
        var config = {headers: {"userid": this.uuid}};
        this.$http.get(url, config)
        .then((response) => {
          console.log(response)
          console.log("SUCCESS")
          this.offers = response.data[0]
          // this.dateFormatted()
        })
        .catch((response) => {
          console.log(response.error)
          console.log("ERROR")
        })
      },
      // dateFormatted(){
      //   var dateUntilString = this.offers.offersReturn.until
      //   var dateFromString = this.offers.offersReturn.from
      //   var dU = new Date(dateUntilString);
      //   var dF = new Date(dateFromString);
      //   var dateUntil = (dU.getDate()) + "." + dU.getMonth() + "." + dU.getFullYear();
      //   var dateFrom = (dF.getDate()) + "." + dF.getMonth() + ".";
      //   console.log("dateFormatting")
      //   console.log(dateUntil)
      //   this.offers.offersReturn.until =  dateUntil
      //   this.offers.offersReturn.from = dateFrom
      // }
    },
}

</script>


