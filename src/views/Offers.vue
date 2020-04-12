<template>
  <div class="offers">
    <!-- <h1 class="display-1 my-2">Angebote</h1> -->
    <v-container class="pa-0">
      <v-col class="px-3">
        <v-col class="pa-0 pl-1" cols="12">
          <v-combobox
            v-model="type"
            :items="types"
            color="green"
            label="Obstsorte"
            item-text="name"
            item-value="uuid"
            multiple
            clearable
            chips
          ></v-combobox>
        </v-col>
          <v-row>
            <v-col class="pl-2 pr-2">
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
                    class="mt-0 pa-0 mr-2"
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
          <p>Sortieren</p>
          </v-col>
              <!-- <v-skeleton-loader
            class="mx-auto"
            v-show="skeletonLoader"
            width="600"
            type="card"
            ></v-skeleton-loader> -->
      <Card2/>
    </v-container>
  </div>
</template>

<script>
import Card2 from '@/components/Offers/Card2'

export default {
  name: 'Offers',
  components: {
    Card2
  },
  data () {
      return {
        min: 0,
        max: 50,
        slider: 40,
        range: [-20, 70],
        type: "",
        types: [],
        // skeletonLoader: true,
      }
  },
  mounted(){
    this.getCategory()
  },
  methods: {
      getCategory(){
        var uuid = this.uuid
        const url = "/category";
        var config = {headers: {"userid": uuid}};
        this.$http.get(url, config)
      .then((response) => {
          console.log(response)
          this.types = response.data
      })
      .catch((error) => {
          this.loading = false
          console.log(error.response)
      })
    },
  }
}  
 
</script>

<style>

</style>