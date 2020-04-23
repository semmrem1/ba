<template>
  <v-container class="justify-center ma-0 py-2 px-4" justify-center cols="12" sm="6" md="8">
    <v-row>
        <v-col cols="12">
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


        </v-col>  
    </v-row>
      <v-row>
        <v-col class="justify-center py-2" v-for="(item, i) in bookings" :key="i" cols="12"  sm="6" md="6" lg="4">
        <v-card class="justify-center ma-0 pa-0" max-height="275" elevation="3">

            <v-row class="pl-1">
                <v-col class="pa-0 pl-3 pb-0" cols="10">
                    <v-card-text class="title pb-0">Bestellnummer</v-card-text>
                    <v-card-text class="py-0">{{ bookings[i].uuid }}</v-card-text>
                </v-col>
                <v-col class="justify-end pt-2 pl-2 pb-0" cols="2">
                    <confirmDelete/>
                </v-col>
     
            </v-row>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0" cols="4">
                    <v-card-text class="py-0 pr-0 font-weight-bold">Bestellt am:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Verfügbar bis:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Art:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Menge:</v-card-text>
                    <!-- <v-card-text class="pt-3 pr-0 font-weight-bold">Anbieter:</v-card-text> -->
                    <v-card-text class="py-0 pt-4 pr-0 font-weight-bold">Addresse:</v-card-text>
                </v-col>
                <v-col class="pl-0" cols="8">
                    <v-card-text class="py-0">{{ moment(bookings[i].bookingDate).format('DD.MM.YYYY') }}</v-card-text>
                    <v-card-text class="py-0">{{ moment(bookings[i].offer.from).format('DD.MM.YYYY') }} bis {{ moment(bookings[i].offer.until).format('DD.MM.YYYY') }}</v-card-text>
                    <v-card-text class="py-0">zum abholen</v-card-text>
                    <v-card-text class="py-0">{{ bookings[i].offer.amountInKg }} kg</v-card-text>
                    <!-- <v-card-text class="py-0 pt-3">Bauernhof 33</v-card-text> -->
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
import confirmDelete from "./confirmDelete"
export default {  
  components: { confirmDelete },
    data() {
        return {
            uuid: "5e9ac90c0a975a3a277cc343",
            bookings: [],
            type: "",
            items: [
            {
                bookingNumber: '#8400001',
                quantity: '18kg',
                date: '11.10.2020',
                plz: '8400 Winterthur',
                location: 'Apfeltaschenstrasse 22 '
            },
            {
                bookingNumber: '#8400011',
                quantity: '10kg',
                date: '11.10.2020',
                plz: '8400 Winterthur',
                location: 'Apfeltaschenstrasse 22 '
            },
            {
                bookingNumber: '#9500001',
                quantity: '28kg',
                date: '11.10.2020',
                plz: '8400 Winterthur',
                location: 'Apfeltaschenstrasse 22 '
            },
            {
                bookingNumber: '#8000001',
                quantity: '18kg',
                date: '11.10.2020',
                plz: '8400 Winterthur',
                location: 'Apfeltaschenstrasse 22 '
            },
        ],
    }
    },
    mounted(){
        this.getBookings()
    },
    methods: {
        getBookings(){
            // const urlSupplier = "/booking/supplier/"+this.$store.state.user.uuid;
            const urlRequester = "/booking/requester/"+this.$store.state.user.uuid;
            var config = {headers: {"userid": this.$store.state.user.uuid}};
            this.$http.get(urlRequester, config)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                console.log("SUCCESS")
                this.bookings = response.data
            })
            .catch((error) => {
                console.log(error.response)
                console.log("ERROR")
            })
        },
        toBeCropped(){
            if (this.bookings.offer.toBeCropped == true) {
                this.type = "zum abholen"
            } else {
                this.type = "zum ernten"
            }
        },
    }
}
</script>

