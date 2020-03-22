<template>
  <div class="pa-0 ma-0">
    <v-container class="justify-center pa-0">
      <LandingPage/>
      <Footer></Footer>
    </v-container>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage';
import Footer from '@/components/Footer'

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
