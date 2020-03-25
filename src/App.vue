<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <!-- <v-container class="justify-center px-0 mx-0" width="100%" justify-center> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>
