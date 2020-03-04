<template>
  <div class="offers">
    <h1 class="display-1 my-2">Angebote</h1>

    <v-container>
      <Card></Card>
    </v-container>
  
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Offers',
  components: {
    Card
  },
  data: () => ({
    //
  }),
};
</script>
