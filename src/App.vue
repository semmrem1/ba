<template>
  <v-app class="pa-0 ma-0">
    <!-- <Navbar/> -->
    <NavbarLP/>
      <v-content>
        <!-- Routing -->
        <router-view></router-view>
      </v-content>
    <!-- Footer -->
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script>
// import Navbar from '@/components/LandingPage/Navbar'
import NavbarLP from '@/components/LandingPage/NavbarLP'
// import Footer from '@/components/LandingPage/Footer'

export default {
  name: 'App',
  components: {
    // Navbar,
    NavbarLP,
    // Footer
  },
  data: () => ({
      
  }),
  mounted() {
        if (localStorage.getItem("token") != null) {
            const url = "/person/"+localStorage.getItem("userUuid")
            var config = {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}};
            console.log(config)
            this.$http.get(url, config)
            .then((response) => {
                this.loaded = true
                this.loading = false
                if (response.data.status != 401) {
                    console.log(response.data)
                    this.$store.state.loggedIn.auth = true
                    this.person = response.data;
                    this.$store.state.user = response.data
                    if (response.data.personType == "PRIVATE") {
                        this.$store.state.user.personType = "Privatperson"
                    } else {
                        this.$store.state.user.personType = "Unternehmen"
                    }
                    this.$store.state.user.image = response.data.picture.image.data
                } else {
                  this.$store.state.loggedIn.auth = false
                  this.$router.push('/login');
                }
            })
            .catch((error) => {
                this.loading = false
                this.loaded = true
                console.log(error)
                this.hideAlert()
            })
        } else {
            this.$store.state.loggedIn.auth = false
            this.$router.push('/login');
        }

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
