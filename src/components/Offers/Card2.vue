<template>
    <v-container class="justify-center ma-0 pt-0 px-4" cols="12" sm="6" md="8">

        <v-row class="justify-center">
            <v-progress-linear
                    :active="!loaded"
                    indeterminate
                    absolute
                    height="3px"
                    color="blue"
                    background-opacity = 0.0
            ></v-progress-linear>
        </v-row>

        <v-col class="pa-0 mr-0" cols="12">
            <v-alert v-show="successAlert" class="mt-4 mx-0" type="success" elevation="2" outlined transition="fade-transition">Buchung erfolgreich gespeichert! Bitte überprüfen Sie ihren Posteingang.</v-alert>
            <v-alert v-show="errorAlert" class="mt-4 mx-0" type="error" elevation="2" outlined  transition="fade-transition">Buchung fehlgeschlagen!</v-alert>
            <v-alert v-show="authAlert" class="mt-4 mx-0" type="error" elevation="2" outlined  transition="fade-transition">Nicht authorisiert!!</v-alert>
            <!-- ### ROW FOR TESTING PURPOSES ### -->
            <!-- <v-row>
              <v-col cols="6">
                <v-btn @click="getOffers()">GET  Offers</v-btn>
                <p>Offers:</p>
                {{offers[0]}}

                {{offers[0].from}}
                {{this.offers.until}}
                {{offers[0].until}}


                <span>{{moment(offers[0].until).format('DD.MM')}}</span>
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

        <v-alert v-show="emptyAlert" class="mt-4 mx-0" type="warning" color="red" elevation="2" outlined prominent transition="fade-transition">Leider sind aktuell für Sie keine Angebote verfügbar. Bitte versuchen Sie es zu einem späteren Zeitpunkt nocheinmal.</v-alert>
        <v-row>
            <!-- ### TESTCARD ### -->
            <!-- todo: Delete Line -->
            <!-- v-col class="justify-center py-2" v-for="(offer, i) in offers" :key="i" cols="12"  sm="6" md="6" lg="4"-->
            <v-col class="justify-center py-2" v-for="(offer, i) in offers" :key="offer.uuid" cols="12"  sm="6" md="6" lg="4">
                <!-- Card -->
                <v-card class="ma-0 pa-0" max-height="175" elevation="3">
                    <v-row >
                        <!-- IMG -->
                        <v-col class="py-0" cols="6">
                            <v-avatar class="ma-0 pa-0" min-width="100%" height="175" tile>
                                <v-img max-height="175" v-if="offerImages[i] != 0" :src="`data:image/png;base64,${offerImages[i]}`"/>
                                <v-img max-height="175"  v-else :src="placeHolderImage"/>
                            </v-avatar>
                            <v-avatar class="ma-0 pa-0" min-width="100%" height="175" tile>
                                
                            </v-avatar>
                        </v-col>

                        <!-- Details -->
                        <v-col class="pa-1 pl-5" cols="6">
                            <v-row>
                                <!-- FIXME: Titel für Card -->
                                <!-- <v-card-subtitle class="font-weight-bold pa-0 pt-1">{{ offer.uuid }}</v-card-subtitle> -->
                                <v-card-subtitle class="font-weight-bold pa-0 pt-1">Gala Äpfel</v-card-subtitle>
                            </v-row>

                            <!-- <v-row>
                              <v-card-subtitle class="font-weight-bold pa-0 pt-1">Picture Uuid: {{ offers[i].productPictureUuid }}</v-card-subtitle>
                            </v-row> -->

                            <v-row>
                                <v-card-subtitle class="pa-0">{{ offer.location.street }} {{offer.location.streetnumber}}</v-card-subtitle>
                            </v-row>

                            <v-row>
                                <v-card-subtitle class="pa-0">{{offer.location.postcode}} {{ offer.location.city }}</v-card-subtitle>
                            </v-row>

                            <v-row>
                                <v-card-subtitle class="pa-0 pt-2">{{moment(offer.from).format('DD.MM')}} bis {{moment(offer.until).format('DD.MM.YYYY')}}</v-card-subtitle>
                            </v-row>

                            <v-row>
                                <v-card-subtitle class="pa-0">Menge: {{ offer.amountInKgAvailable }} Kg</v-card-subtitle>
                            </v-row>

                            <v-row class="pr-6 pt-1 justify-end align-end">
                                <v-spacer></v-spacer>
                                <!-- <span class="pr-5"><confirmBooking/></span> -->

                                <v-dialog v-model="dialog" width="450">
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" color="green" text @click="currentOfferId = offer.uuid">Buchen</v-btn>
                                    </template>

                                    <!-- TODO end of Iteration -->

                                    <v-card>
                                        <v-toolbar :color="options.color" dark dense flat><v-icon color="white">mdi-check</v-icon>
                                            <v-card-title class="headline">Ernte buchen</v-card-title>
                                        </v-toolbar>

                                        <!-- {{this.$store.state.offer.uuid}} -->
                                        <v-card-text class="body-2 pt-4">Bitte gib deine gewünschte Menge an Obst an, welche du ernten möchtest.</v-card-text>
                                        <v-card-text class="subtitle-1 font-weight-bold">Menge:</v-card-text>
                                        <v-row class="mt-2">
                                            <v-col>
                                                <v-btn class="ml-6" fab dark color="green darken-1">
                                                    <v-icon @click="increase" dark>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>

                                            <v-col cols="5">
                                                <v-text-field class="justify-center" color="green" outlined readonly :value="amountInKgAvailable" suffix="KG">{{ amountInKgAvailable }}</v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-btn class="ml-2" fab dark color="green darken-1">
                                                    <v-icon @click="decrease" dark>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>

                                        </v-row>

                                        <v-card-actions class="pt-2 mt-2">
                                            <!-- <v-btn class="centered-input mx-auto mb-2" color="green darken-1 white--text" raised @click="showBooking()" width="95%">ERNTE BUCHEN</v-btn> -->
                                            <v-btn @click="postBooking(currentOfferId)" class="centered-input mx-auto mb-2" color="green darken-1 white--text" :loading="loading" raised width="95%">ERNTE BUCHEN</v-btn>
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
    import Vue from 'vue';

    export default {
        components: { searchSub },

        data() {
            return {
                offerImages: [],
                counter: 0,
                placeHolderImage: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
                skeletonLoader: true,
                loaded: false,
                successAlert: false,
                errorAlert: false,
                authAlert: false,
                emptyAlert: false,
                min: 0,
                max: 40,
                slider: 10,
                range: [-20, 70],
                select: ['Äpfel'],
                offers: [],
                currentOfferId: "",
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
                amountInKgAvailable: 10,
                filterAmount: 50,
                filterCategory: "",

                // fixme: Delete Test
                testVarableBase: "",
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
                  this.$store.state.user = response.data
                  this.$store.state.user.image = response.data.picture.image.data
                    this.getCategory()
                    this.getOffers()
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
        computed: {
            offerImage(){
                return `data:image/png;base64, ${this.placeHolderImage}`
            }
        },
        methods: {
            increase: function(){
                this.amountInKgAvailable++;
            },
            decrease: function(){
                if(this.amountInKgAvailable > 0){
                    this.amountInKgAvailable--;
                }
            },
            getCategory(){
                const url = "/category";
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                this.$http.get(url, config)
                    .then((response) => {
                        this.types = response.data
                    })
                    .catch((error) => {
                        console.log(error.response)
                    })
            },
            getOffers(){
                this.loaded = false;
                const url = "/searchresult/person/"+localStorage.getItem("userUuid");
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                this.$http.get(url, config)
                    .then((response) => {
                        // Get Offers
                        if(response.data.length > 0){
                            this.offers = response.data[0].offersReturn;
                            this.loaded = true;

                            // Add Base64 Strings to offerImages
                            for(let i = 0; i < this.offers.length; i++){
                                this.addBase64StringToOffer(i);
                            }
                        } else {
                            this.loaded = true;
                            this.emptyAlert = true;
                        }
                    })
                    .catch((response) => {
                        this.emptyAlert = true;
                        this.hideAlert();
                        console.log(response);
                        console.log("ERROR getOffers");
                    })
            },
            addBase64StringToOffer(i){
                if (this.offers[i].productPictureUuid != null) {
                    const url = "/picture/"+this.offers[i].productPictureUuid
                    var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                    this.$http.get(url, config)
                        .then((response) =>{
                            console.log(response.data)
                            Vue.set(this.offerImages, i, response.data.image.data);
                            // console.log(this.offerImages)
                        })
                } else{
                    console.log("no image for this offer")
                }

            },
            postBooking(uuid){
                const url = "/booking";
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                var data =
                    {
                        offer: {
                            uuid: uuid,
                        },
                        requester: {
                            uuid: this.$store.state.user.uuid
                        },
                        amountInKgAvailable: this.amountInKgAvailable,
                    };
                this.loading = true
                console.log(data)
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


