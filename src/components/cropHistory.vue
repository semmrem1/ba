<template>
  <v-container class="justify-center ma-0 py-2 px-4" justify-center cols="12" sm="6" md="8">
      <p>Booking IDs</p>
      <p>{{this.bookingIds}}</p>
      <v-row>
        <v-col class="justify-center py-2" v-for="(item, i) in items" :key="i" cols="12"  sm="6" md="6" lg="4">
        <v-card class="justify-center ma-0 pa-0" max-height="275" elevation="3">

            <v-row class="pl-1">
                <v-col class="pa-0 pl-3 pb-0" cols="10">
                    <v-card-text class="title pb-0">Bestellung {{ item.bookingNumber }}</v-card-text>
                </v-col>
                <v-col class="justify-end pt-2 pl-2 pb-0" cols="2">
                    <confirmDelete/>
                </v-col>
     
            </v-row>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0" cols="3">
                    <v-card-text class="py-0 pr-0 font-weight-bold">Typ:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Art:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Menge:</v-card-text>
                    <v-card-text class="pt-3 pr-0 font-weight-bold">Anbieter:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Addresse:</v-card-text>
                </v-col>
                <v-col class="pl-0" cols="8">
                    <v-card-text class="py-0">Apfel</v-card-text>
                    <v-card-text class="py-0">zum abholen</v-card-text>
                    <v-card-text class="py-0">{{ item.quantity }}</v-card-text>
                    <v-card-text class="py-0 pt-3">Bauernhof 33</v-card-text>
                    <v-card-text class="py-0 pt-4">{{ item.location }}</v-card-text>
                    <v-card-text class="py-0">{{ item.plz }}</v-card-text>
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
            uuid: "5e8b8cf50a975a541edfda68",
            bookingIds: [],
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
        this.getBookingIds()
    },
    methods: {
        getBookingIds() {
            const url = "/booking/requester/"+this.uuid
            var config = {headers: {"userid": this.uuid}};
            this.$http.get(url, config)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                console.log("SUCCESS")
                this.bookingIds = response.data
            })
            .catch((error) => {
                console.log(error.response)
                console.log("ERROR")
            })
        }
    }
}
</script>

