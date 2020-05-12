<template>
  <v-container class="justify-center ma-0 pt-0 px-4" cols="12" sm="6" md="8">

        <v-row class="justify-center">
            <v-progress-linear
                :active="!loaded"
                indeterminate
                absolute
                height="4px"
                color="blue"
                background-opacity = 0.0
            ></v-progress-linear>
        </v-row>
    <v-col class="pa-0 mr-0" cols="12">
      <v-alert v-show="errorAlert" class="mt-4 mx-2" type="warning" color="red" elevation="2" outlined prominent transition="fade-transition">{{ this.text }}</v-alert>

      <v-row>
          <v-col class="justify-center py-2" v-for="(item, index) in productName" :key="item.name" cols="12"  sm="6" md="6" lg="4">
            <v-row>
              <h1 class="pl-4">{{ item.name }}</h1>
            </v-row> 
              <v-col class="px-0" v-for="item in productOffer[index]" :key="item">
                <v-card class="ma-0 pa-0" max-height="350" elevation="3">
                  <v-row>
                    <v-col class="pb-0" cols="12">
                        <v-card-title class="py-0 pl-2 mb-0"><span class="font-weight-bold pl-1">Bestellnummer:<p>{{ item.uuid }}</p></span></v-card-title>
                    </v-col>
                  </v-row>
                    <v-row class="pt-0 pl-1">
                        <v-col class="pr-0 pl-2 pb-0" cols="4">
                            <v-card-text class="py-0 pr-0 font-weight-bold">zum Ernten:</v-card-text>
                            <v-card-text class="py-0 pr-0 font-weight-bold">Menge:</v-card-text>
                            <v-card-text class="py-0 pr-0 font-weight-bold">Datum:</v-card-text>
                            <v-card-text class="py-3 pr-0 font-weight-bold">Adresse:</v-card-text>
                            <v-card-text class="py-3 pr-0 font-weight-bold">Beschreibung:</v-card-text>
                        </v-col>
                        <v-col class="pl-0 pb-0" cols="8">
                            <v-card-text class="py-0">{{ item.toBeCropped }}</v-card-text>
                            <v-card-text class="py-0">{{ item.amountInKgAvailable }} kg</v-card-text>
                            <v-card-text class="py-0" prefix="bis">bis {{ moment(item.until).format('DD.MM.YYYY') }}</v-card-text>
                            <v-card-text class="py-3 pr-0">{{ item.location.street }} {{ item.location.streetnumber }}, {{ item.location.postcode }} {{ item.location.city }}</v-card-text>
                            <v-card-text class="py-3">{{ item.description }}</v-card-text>
                        </v-col>
                        <v-col class="pt-0 pb-2 pr-7" cols="12">
                        <!-- Edit Offer Button -->
                          <v-row class="align-end">
                            <v-spacer/>
                                <v-dialog v-model="dialog" max-width="450">
                                  <template v-slot:activator="{ on }">
                                      <v-btn v-on="on" color="dark-grey" text @click="currentOfferId = item.uuid; offerAmount = item.amountInKgAvailable">bearbeiten</v-btn>
                                  </template>
                                      <v-card>
                                          <v-toolbar :color="options.color" dark dense flat><v-icon class="pr-3" size="x-large">mdi-pencil</v-icon>
                                              <v-card-title class="white--text font-weight-bold">Ernte bearbeiten</v-card-title>
                                          </v-toolbar>
                                          <!-- Bearbeiten -->
                                          <v-row class="px-4" justify="center">
                                          <v-card-text class="body-2 pt-4">Falls sich die verfügbare Menge geändert.</v-card-text>
                                              <v-row class="px-4 pt-2" justify="center">
                                                  <v-col class="py-0" cols="8">
                                                      <v-card-text class="subtitle-1 font-weight-bold px-0" label="Menge">Menge:</v-card-text>
                                                  </v-col>
                                                  <v-col class="py-0" cols="4">
                                                      <v-text-field  color="green" suffix="kg" v-model="offerAmount"></v-text-field>
                                                  </v-col>
                                              </v-row>
                                          </v-row>
                                          <v-card-actions class="pa-4">
                                              <v-btn @click="cancel" outlined width="40%" color="grey">Abbrechen</v-btn>
                                            <v-btn color="green darken-1 white--text" raised width="60%" @click="updateOffer(currentOfferId)">SPEICHERN</v-btn>
                                          </v-card-actions>
                                      </v-card>
                              </v-dialog>
                            <!-- <span><editOffer/></span> -->
                          </v-row> 
                        </v-col>
                    </v-row>
                </v-card>
              </v-col>
          </v-col>
      </v-row>
        <v-fab-transition class="fab-container">
            <v-btn color="green" fixed to="/createOffer" large bottom right fab><v-icon color="white">mdi-plus</v-icon></v-btn>
        </v-fab-transition>
    </v-col>

  </v-container>
</template>

<script>
// import editOffer from "./editOffer"
// import deleteOffer from "./deleteOffer"

export default {  
  components: {   },

    data: () => ({
      select: ['Äpfel'],
      currentOfferId: "",
      offerAmount: "",
      snackbar: false,
      loaded: true,
      errorAlert: false,
      text: "",
      dialog: false,
      counter: 10,
      options: {
          color: "green",
          width: 290,
      },
      amount: "",
      productName: [],
      productOffer: [],
      allOffers: [],
      myProducts: [],
      myOffers: [],
      newArray: [],
    }),
    created: {
        loader(){
            this.loaded = false
        }
    },
    mounted() {
       if (localStorage.getItem("token") != null) {
            const url = "/person/"+localStorage.getItem("userUuid")
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            console.log("token available")
            this.$http.get(url, config)
            .then((response) => {
                this.loaded = true
                this.loading = false
                console.log("authorized")
                console.log(response.data)
                if (response.data.status != 401) {
                  this.$store.state.loggedIn.auth = true
                  this.getMyOffers()
                  if (response.data.personType == "PRIVATE") {
                      this.$store.state.user.personType = "Privatperson"
                  } else {
                      this.$store.state.user.personType = "Unternehmen"
                  }
              } else {
                  this.$store.state.loggedIn.auth = false
                  this.$router.push('/login');
              }

            })
            .catch((error) => {
                console.log("unauthorized")
                this.$store.state.loggedIn.auth = false
                this.$router.push('/');
                this.loading = false
                this.loaded = true
                console.log(error)
                this.hideAlert()
            })
        } else {
            console.log("no token available")
            this.$store.state.loggedIn.auth = false
            this.$router.push('/');
        }
    },
    methods: {
        getMyOffers(){
            this.loaded = false
            const url = "/person/"+localStorage.getItem("userUuid")+"/product";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.get(url, config)
            .then((response) => {
                this.loaded = true
                  if (response.data.statusType == "error") {
                    this.errorAlert = true
                    this.text = "Sie haben noch keine Angebote erfasst."
                  } else {
                    this.myOffers = response.data
                    this.myOffers.forEach(element => {
                      this.productName.push(element.category)
                      this.productOffer.push(element.offers)
                      console.log(this.productOffer)
                    });
                this.hideAlert() 
                }
            })
            .catch((error) => {
                console.log(error)
                this.hideAlert()
            })
        },
        textchange(){
          if (this.productOffer.tobecropped == "true") {
                return this.productOffer.toBeCropped = "Ja"
              } else {
                return this.productOffer.toBeCropped = "Nein"
              }
        },
        updateOffer(){
            const url = "/product";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            var data =
            {
                owner: {
                    uuid: localStorage.getItem("userUuid")
                },
                category: {
                    uuid: this.product.category
                },
                offers: [{
                    location: {
                        uuid: this.product.location.uuid
                    },
                    amountInKgAvailable: this.amount,
                    toBeCropped: this.product.tobecropped,
                    from: this.product.dateFrom,
                    until: this.product.dateUntil,
                    description: this.product.description
                    }
                ]
            }
            this.$http.post(url, data, config)
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.log(error)
            })
        },
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
        },
        hideAlert(){
            setTimeout(() => {                
                this.successAlert = false
                this.errorAlert = false
                this.loaded = true
            }, 2000);
        }
    }
}
</script>