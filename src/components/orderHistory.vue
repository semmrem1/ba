<template>
  <v-container class="justify-center ma-0 pt-0 py-2 px-4" justify-center cols="12" sm="6" md="8">
            <!-- <v-btn @click="getBookings()">GET Booking</v-btn>
            <p>Bookings</p>
            <div v-for="(item, i) in bookings" :key="i">
                <p>
                    {{bookings[i].uuid}}
                </p>
                
                <p>
                    {{bookings[i].offer}}
                </p>
                
            </div> -->
            <!-- <p>{{bookings[0].uuid}}</p>
            <p>Requester: {{bookings[0].requester}}</p>
            <p>Requester Uuid: {{bookings[0].requester.uuid}}</p>
            <p>Offer 1: {{bookings[0].offer}}</p>
            <p>OfferUuid 1: {{bookings[0].offer.uuid}}</p>

            <p>Offer 2: {{bookings[1].offer}}</p>
            <p>Offer 2 Uuid: {{bookings[1].offer.uuid}}</p>
            <p>Offer 2 location: {{bookings[1].offer.location}}</p>
            <p>Offer 2 location: {{bookings[1].offer.from}}</p>
            <p>Offer 2 Menge: {{bookings[1].offer.amountInKg}}</p> -->

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
        <v-alert v-show="errorAlert" class="mt-4" type="warning" color="red" elevation="2" outlined prominent transition="fade-transition">{{ this.text }}</v-alert>
      <v-row>
        <v-col class="justify-center py-2" v-for="(item, i) in bookings" :key="i" cols="12"  sm="6" md="6" lg="4">
        <v-card class="justify-center ma-0 pa-0" max-height="275" elevation="3">
            <v-row class="pl-1">
                <v-col class="pa-0 pl-3 pb-0" cols="10">
                    <v-card-text class="title pb-0">Bestellnummer</v-card-text>
                    <v-card-text class="py-0">{{ bookings[i].uuid }}</v-card-text>
                </v-col>
                <v-col class="justify-end pt-2 pl-2 pb-0" cols="2">
                    <!-- <confirmDelete/> -->
                </v-col>
     
            </v-row>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0" cols="4">
                    <v-card-text class="py-0 pr-0 font-weight-bold">Bestellt am:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Verfügbar bis:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Art:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Menge:</v-card-text>
                    <!-- <v-card-text class="pt-3 pr-0 font-weight-bold">Anbieter:</v-card-text> -->
                    <v-card-text class="py-0 pt-4 pr-0 font-weight-bold">Adresse:</v-card-text>
                </v-col>
                <v-col class="pl-0" cols="8">
                    <v-card-text class="py-0">{{ moment(bookings[i].bookingDate).format('DD.MM.YYYY') }}</v-card-text>
                    <v-card-text class="py-0">{{ moment(bookings[i].offer.from).format('DD.MM.YYYY') }} bis {{ moment(bookings[i].offer.until).format('DD.MM.YYYY') }}</v-card-text>
                    <v-card-text class="py-0">zum abholen</v-card-text>
                    <v-card-text class="py-0">{{ bookings[i].offer.amountInKgAvailable }} kg</v-card-text>
                    <v-card-text class="py-0 pt-4">{{ bookings[i].offer.location.street }} {{ bookings[i].offer.location.streetnumber }}</v-card-text>
                    <v-card-text class="py-0">{{ bookings[i].offer.location.postcode }} {{ bookings[i].offer.location.city }}</v-card-text>
                </v-col>
            </v-row>
        </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import confirmDelete from "./confirmDelete"
export default {  
  components: {  },
    data() {
        return {
            uuid: "5e9ac90c0a975a3a277cc343",
            bookings: [],
            type: "",
            text: "",
            errorAlert: false,
            loaded: false,
        }
    },
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
                        this.getPerson()
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
        getPerson(){
            const url = "/person/"+localStorage.getItem("userUuid");
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            this.$http.get(url, config)
            .then((response) => {
                this.loading = false
                if (response.data != null) {
                    console.log(response.data)
                    this.getBookings()
                    this.person = response.data;
                    this.$store.state.user = response.data
                    if (response.data.personType == "PRIVATE") {
                        this.$store.state.user.personType = "Privatperson"
                    } else {
                        this.$store.state.user.personType = "Unternehmen"
                    }
                    this.$store.state.user.image = response.data.picture.image.data
                }
            })
            .catch((error) => {
                console.log(error)
                this.loaded = true
        })
        },
        getBookings(){
                const url = "/booking/supplier/"+localStorage.getItem("userUuid");
                var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
                this.$http.get(url, config)
                .then((response) => {
                    console.log(response)
                    if (response.data.code == "020") {
                        this.errorAlert = true
                        this.text = response.data.description
                    } else if (response.data.length == 0 || response.data.statusType == "error"){
                        console.log("empty array")
                        this.errorAlert = true
                        this.text = "Sie haben noch keine Bestellungen erhalten."
                    } else {
                        console.log("here will be bookings")
                        this.bookings = response.data
                    }
                    this.loaded = true
                })
                .catch((error) => {
                    this.loaded = true
                    console.log(error.response)
                    console.log("ERROR")
                    this.text = error.response.description
                }) 
        },
        toBeCropped(){
            if (this.bookings.offer.toBeCropped == true) {
                this.type = "zum Abholen"
            } else {
                this.type = "zum Ernten"
            }
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

