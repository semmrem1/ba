<template>
  <v-footer color="green lighten-1" padless elevation="4">
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link" color="white" text  class="mt-2 mb-6" router :to="link.route">{{ link.name }}</v-btn>

        <v-card-text class="white--text pt-0 text-center">
        Text über Obst vom Baum
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
        { name: 'Login', route: "/login" },
        { name: 'Registrieren', route: "/registerPriv"},
        { name: 'Kontakt', route: "/contact"},
      ],
    }),
  }
</script>