<template>
  <v-footer color="green lighten-1" padless elevation="4">
    <v-row justify="center" no-gutters>
      <v-btn v-for="(link, idx) in links" :key="idx" color="white" text  class="mt-2 mb-6" router :to="link.route" @click="scrollToTop()">{{ link.name }}</v-btn>

        <v-card-text class="white--text pt-0 text-center">
       
        </v-card-text>

      <v-divider></v-divider>
      <v-col class="green lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <span>OBST VOM BAUM</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { name: 'Home', route: "/" },
        { name: 'Login', route: "/login" },
        { name: 'Registrieren', route: "/registerPriv"},
        { name: 'Kontakt', route: "/contact"},
      ],
    }),
    methods:{
        scrollToTop(){
            window.scrollTo(0,0);
        },
    },
  }

</script>