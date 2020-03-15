<template>
  <v-container class="ma-0 pa-0">
    <v-col class="px-0" v-for="(item, i) in items" :key="i">
      
        <v-card class="ma-0 pa-0" max-width="444" max height="150" elevation="3">
          <v-row >
            <v-col class="py-0 pr-0">
              <v-avatar class="ma-0 pa-0" size="150" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="pa-1">
              <v-row>
                <v-card-title class="pa-0" v-text="item.title">Angebotsname</v-card-title>
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
                <span class="justify-end mr-2 mt-0 pt-2 pr-4"><confirmBooking /></span>
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
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
          quantity: '20kg',
          date: '12.0.02020',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
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