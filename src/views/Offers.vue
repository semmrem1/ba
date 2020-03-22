<template>
  <div class="offers">
    <!-- <h1 class="display-1 my-2">Angebote</h1> -->

    <v-container class="pa-0">
      <v-col class="py-0 mr-0 pr-0" cols="12">
        <v-col class="pa-0" cols="12">
          <v-combobox
            v-model="select"
            :items="items"
            color="green"
            label="Obstsorte"
            clearable
            required
            multiple
            chips
          ></v-combobox>
        </v-col>
        <v-card-text class="pa-0">
          <v-row>
            <v-col class="px-0 ">
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
          </v-row>
        </v-card-text>
      </v-col>
      <Card2/>
    </v-container>
  
  </div>
</template>

<script>
import Card2 from '@/components/Card2'

export default {
  name: 'Offers',
  components: {
    Card2
  },
  data () {
      return {
        select: [],
        items: [
          'Äpfel',
          'Birnen',
          'Erdbeeren',
          'Himbeeren',
        ],
        min: 0,
        max: 50,
        slider: 40,
        range: [-20, 70],
      }
  },
}  
 
</script>