<template>
  <div class="offers">
    <h1 class="display-1 my-2">Angebote</h1>

    <v-container>
      <Card2></Card2>
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
  data: () => ({
    //
  }),
};
</script>
