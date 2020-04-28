<template>
  <div class="pa-0 ma-0">
    <v-container fluid class="justify-center pa-0 ma-0">
      <LandingPage/>
      <Footer></Footer>
    </v-container>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage/LandingPage';
import Footer from '@/components/LandingPage/Footer'

export default {
  name: 'Home',
  components: {
    LandingPage,
    Footer
  },
  data: () => ({
    //
  }),
};

</script>
