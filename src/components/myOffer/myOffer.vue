<template>
  <v-container class="justify-center ma-0 py-2 px-4" cols="12" sm="6" md="8">
    <v-col class="pa-0 mr-0" cols="12">
      <v-row>
        <v-col class="justify-center py-2" v-for="(item, i) in items" :key="i" cols="12"  sm="6" md="6" lg="4">
      
        <v-card class="ma-0 pa-0" max-height="225" elevation="3">

          <v-row>
            <v-col cols="10">
                <v-card-title class="py-0 pl-4">Angebot:<span class="font-weight-light pl-1"> {{item.title}}</span></v-card-title>
            </v-col>
            <v-col class="justify-end pt-2 pl-2 pb-0" cols="2">
                 <deleteOffer/>
            </v-col>
          </v-row>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0  pb-0" cols="4">
                    <v-card-text class="py-0 pr-0 font-weight-bold">Menge:</v-card-text>
                    <v-card-text class="py-0 pr-0 font-weight-bold">Datum:</v-card-text>
                    <v-card-text class="py-3 pr-0 font-weight-bold">Adresse:</v-card-text>
                </v-col>
                <v-col class="pl-0 pb-0" cols="8">
                    <v-card-text class="py-0">{{ item.quantity }}</v-card-text>
                    <v-card-text class="py-0" prefix="bis">bis {{ item.date }}</v-card-text>
                    <v-card-text class="py-3 pr-0">{{ item.plz }} {{ item.location }}</v-card-text>
                </v-col>
                <v-col class="pt-0 pb-2 pr-7" cols="12">
                <!-- Edit Offer Button -->
                  <v-row class="align-end">
                    <v-spacer/>
                    <span><editOffer/></span>
                  </v-row> 
                </v-col>
            </v-row>
        </v-card>

        </v-col>
      </v-row>
              <v-fab-transition class="fab-container">
            <v-btn color="green px-" fixed="true" to="/createOffer" large bottom right fab ><v-icon color="white">mdi-plus</v-icon></v-btn>
        </v-fab-transition>
    </v-col>
  </v-container>
</template>

<script>
import editOffer from "./editOffer"
import deleteOffer from "./deleteOffer"

export default {  
  components: { editOffer, deleteOffer },

    data: () => ({
      select: ['Äpfel'],
      fruits: [
          'Äpfel',
          'Birnen',
          'Beeren',
          'Honig',
        ],
      items: [
        {
          src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          title: 'Bio Gala',
          plz: '8405',
          location: 'Seen',
          quantity: '25kg',
          date: '11.09.2020',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          plz: '8450',
          location: 'Hettingen',
          quantity: '15kg',
          date: '23.09.2020',
        },
        {
          src: 'https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          plz: '8450',
          location: 'Hettingen',
          quantity: '20kg',
          date: '12.0.02020',
        },
        {
          src: 'https://images.unsplash.com/photo-1545160995-4c0f38b9b3e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          title: 'Boskoop',
          plz: '8450',
          location: 'Hettingen',
          quantity: '20kg',
          date: '12.0.02020',
        },
      ],
    }),
}
</script>