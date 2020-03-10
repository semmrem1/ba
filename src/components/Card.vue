<template>
<v-container class="ma-0 pa-0">
        <v-col class="px-0 py-2" v-for="(item, i) in items" :key="i" cols="12" md="6" lg="3">
          <v-card class="mx-auto py-0" max-width="444" elevation="3">
            
            <!-- Image -->
            <v-col class="ma-0 pa-0" cols="4">
              <v-avatar size="150" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </v-col>

            <!-- Title -->
            <v-col cols="8" class="text-center pl-2">
              <v-row class="flex-column ma-0" justify="center">
                <v-card-title class="headline" v-text="item.title" cols="5"></v-card-title>
              </v-row> 
              <v-row class="flex-column ma-0" justify="center">
                <v-card-subtitle v-text="item.location"></v-card-subtitle>
              </v-row>

            <!-- Buttons -->
              <v-card-actions>
                <v-spacer></v-spacer>
                
                  <!-- Google Maps -->
                  <v-btn @click="showLocation" color="grey" text>Standort</v-btn>

                  <!-- Booking Dialog -->
                  <confirmBooking />
              </v-card-actions>
            </v-col>
          </v-card>
        </v-col>

        
    </v-container>
</template>

<script>
import confirmBooking from "./confirmBooking"

export default {  
  components: { confirmBooking },

    data: () => 
    ({
      items: [
        {
          src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          title: 'Gala',
          location: 'Seen',
          lat: "28.052593",
          long: "87.073487",
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
          lat: "28.052593",
          long: "87.073487",
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
          lat: "28.052593",
          long: "87.073487",
        },
      ],
    }),
    methods: {
      bookOffer(){
        // dialog = true;
        // return dialog = false;
      },
      showLocation: function(){
        var url = "https://dunkindonuts.ch"
        open(url)
      },
    }
}    
</script>

<style scoped>

</style>