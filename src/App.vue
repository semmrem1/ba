<template>
  <v-app>
    <Navbar></Navbar>
    <v-content class="justify-center">
      <v-container class="justify-center px-4">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
};
</script>
