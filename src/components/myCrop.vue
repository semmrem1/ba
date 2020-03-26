<template>
  <v-container class="justify-center ma-0 pt-2 px-2">
      <v-col class="px-0" v-for="(item, i) in items" :key="i" cols="12" sm="4">
        <v-card class="justify-center ma-0 pa-0" height="175" elevation="3">

            <v-row class="pl-1">
                <v-col class="pa-0 pl-3 pb-0" cols="10">
                    <v-card-text class="title pb-0">Bestellnummer {{ item.bookingNumber }}</v-card-text>
                </v-col>
                <v-col class="pt-2 pl-2 pb-0" cols="2">
                    <confirmDelete/>
                </v-col>
     
            </v-row>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0" cols="3">
                    <v-card-text class="py-0 pr-0 font-weight-bold">Menge:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Datum:</v-card-text>
                    <v-card-text class="py-3 pr-0 font-weight-bold">Adresse:</v-card-text>
                </v-col>
                <v-col class="pl-0" cols="6">
                    <v-card-text class="py-0">{{ item.quantity }}</v-card-text>
                    <v-card-text class="py-0">{{ item.date }}</v-card-text>
                    <v-card-text class="py-3">{{ item.address }}</v-card-text>
                </v-col>
                <v-col cols="2">

                </v-col>
            </v-row>
        </v-card>
    </v-col>
  </v-container>
</template>

<script>
import confirmDelete from "./confirmDelete"
export default {  
  components: { confirmDelete },
    data: () => ({
    items: [
    {
        bookingNumber: '#8400001',
        quantity: '18kg',
        date: '11.10.2020',
        address: 'Apfeltaschenstrasse 22 8400 Winterthur'
    },
    {
        bookingNumber: '#8400011',
        quantity: '10kg',
        date: '11.10.2020',
        address: 'Im Apfelkompott 12 8400 Winterthur'
    },
    {
        bookingNumber: '#9500001',
        quantity: '28kg',
        date: '11.10.2020',
        address: 'Im Obstbaumland 92 9500 Wil SG'
    },
    {
        bookingNumber: '#8000001',
        quantity: '18kg',
        date: '11.10.2020',
        address: 'Zum Booskopbaum 101 8000 Zürich'
    },
    ],
    }),
}
</script>