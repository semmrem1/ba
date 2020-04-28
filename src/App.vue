<template>
  <v-app class="pa-0 ma-0">
    <!-- <Navbar/> -->
    <NavbarLP/>
      <v-content>
        <!-- Routing -->
        <router-view></router-view>
      </v-content>
    <!-- Footer -->
    <Footer></Footer>
  </v-app>
</template>

<script>
// import Navbar from '@/components/LandingPage/Navbar'
import NavbarLP from '@/components/LandingPage/NavbarLP'
import Footer from '@/components/LandingPage/Footer'

export default {
  name: 'App',
  components: {
    // Navbar,
    NavbarLP,
    Footer
  },
  data: () => ({
      
  }),
  mounted() {
      // AXIOS REQUEST LOGGER
      this.$http.interceptors.request.use(
      config => {
          console.log(
          `${config.method.toUpperCase()} request sent to ${
              config.url
          } at ${new Date().toLocaleString()}`
          );
          return config;
      },
      error => {
          return Promise.reject(error);
      });
    },
};
</script>
