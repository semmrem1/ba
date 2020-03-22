<template>
  <v-container class="justify-center ma-0 pa-0" cols="12" sm="6" md="8">
    <v-col class="px-0" v-for="(item, i) in items" :key="i">
      
        <v-card class="ma-0 pa-0" max-width="374" max height="175" elevation="3">
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
                <v-card-title class="pa-0 pt-1" v-text="item.title">Angebotsname</v-card-title>
              </v-row>

              <v-row>
                <v-card-subtitle class="pa-0" v-text="item.location">Standort</v-card-subtitle>
              </v-row>

              <v-row>
                <v-card-subtitle class="pa-0" v-text="item.quantity">Menge</v-card-subtitle>
              </v-row>

              <v-row>
                <v-card-subtitle class="pa-0" v-text="item.date">Datum</v-card-subtitle>
              </v-row>

              <v-row>
                <v-spacer></v-spacer>
                <span class="justify-end mr-3 mt-7 pt-0 pr-3"><confirmBooking /></span>
              </v-row>

            </v-col>
          </v-row> 
        </v-card>
    </v-col>
  </v-container>
</template>

<script>
import confirmBooking from "./confirmBooking"

export default {  
  components: { confirmBooking },

    data: () => ({
      items: [
        {
          src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          title: 'Bio Gala',
          location: 'Seen',
          quantity: '25kg',
          date: '11.09.2020',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
          quantity: '15kg',
          date: '23.09.2020',
        },
        {
          src: 'https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
          quantity: '20kg',
          date: '12.0.02020',
        },
        {
          src: 'https://images.unsplash.com/photo-1545160995-4c0f38b9b3e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
          quantity: '20kg',
          date: '12.0.02020',
        },
      ],
    }),
}
</script>

<style scoped>

</style>