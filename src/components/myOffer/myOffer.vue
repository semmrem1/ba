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
      <v-alert v-show="errorAlert" class="mt-4 mx-2" type="warning" color="red" elevation="2" outlined prominent transition="fade-transition">{{ this.text }}</v-alert>
      <v-row>
        <v-col class="justify-center py-2" v-for="(item, i) in allOffers[0]" :key="i" cols="12"  sm="6" md="6" lg="4">
        <v-card class="ma-0 pa-0" max-height="325" elevation="3">
          
          <!-- <v-col v-for="(item, i) in myProducts" :key="i">
            {{item.category.name}}
          </v-col> -->
          

          <v-row>
            <v-col class="pb-0" cols="12">
                <v-card-title class="py-0 pl-4 mb-0"><span class="font-weight-light pl-1"> {{ item.uuid }}</span></v-card-title>
            </v-col>
            <v-col class="justify-end pt-2 pl-2 pb-0" cols="2">
                 <!-- <deleteOffer/> -->
            </v-col>
          </v-row>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0  pb-0" cols="4">
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
                                  <v-card-text class="body-2 pt-4">Falls sich die verfügbare Menge geändert.</v-card-text>
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
                    <!-- <span><editOffer/></span> -->
                  </v-row> 
                </v-col>
            </v-row>
        </v-card>

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
      snackbar: false,
      loaded: false,
      errorAlert: false,
      text: "",
      dialog: false,
      counter: 10,
      options: {
          color: "green",
          width: 290,
      },
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
                this.$http.get(url, config)
                .then((response) => {
                    if (response.data.status != 401) {
                        this.$store.state.loggedIn.auth = true
                        this.getMyOffers()
                    } else {
                        this.$store.state.loggedIn.auth = false
                        this.$router.push('/login');
                    }
                })
            
        } else {
            this.$store.state.loggedIn.auth = false
            this.$router.push('/login');
        }
    },
    methods: {
        getMyOffers(){
            this.loaded = false
            const url = "/person/"+this.$store.state.user.uuid+"/product";
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.get(url, config)
            .then((response) => {
                this.loaded = true
                console.log(response)
                  if (response.data.statusType == "error") {
                    this.errorAlert = true
                    this.text = "Sie haben noch keine Angebote erfasst."
                  } else {
                    console.log(response.data[0].uuid)
                    this.myProducts = response.data
                    console.log("myProducts")
                    console.log(this.myProducts[0].category.name)
                    this.myProducts.forEach(element => {
                      if (element.offers.length != 0) {
                        this.myOffers.push(element)
                        console.log("myOffers")
                        console.log(this.myOffers)
                        this.myOffers.forEach(element2 => {
                          this.newArray.push(element2.offers)
                        });
                        this.allOffers = this.newArray
                        this.myOffers.push(element)
                      }
                });
                this.hideAlert() 
                }
            })
            .catch((error) => {
                console.log(error)
                this.hideAlert()
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