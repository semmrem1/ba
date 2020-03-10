<template>
  <div class="home">
    <h1>Home</h1>
    <v-container>
      <Card></Card>
    </v-container>
  </div>
  
</template>

<script>
import Card from '@/components/Card'

export default {
Name: 'Home',
  components: {
    Card
  },
  data: () => ({
    //
  }),
};
</script>
