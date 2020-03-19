<template>
  <div class="pa-0 ma-0">
    <v-container class="justify-center pa-0">
      <LandingPage/>
    </v-container>
  </div>
  
</template>

<script>
import LandingPage from '@/components/LandingPage'

export default {
  name: 'Home',
  components: {
    LandingPage
  },
  data: () => ({
    //
  }),
};

</script>
