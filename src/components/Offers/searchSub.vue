<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-fab-transition class="fab-container">
                <v-btn v-on="on" color="green" fixed="true" bottom large right fab><v-icon color="white">mdi-bell-plus</v-icon></v-btn>
            </v-fab-transition>
        </template>
            
            <v-card>
            <v-toolbar :color="options.color" dark dense flat>
                <v-toolbar-title class="white--text font-weight-bold"><v-icon class="pr-3" size="x-large">mdi-bell-plus</v-icon>{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn @click="dialog=false" outlined color="grey">Abbrechen</v-btn>
                <v-btn class="white--text ml-4" @click="dialog=false" depressed :color="options.color">Erstellen</v-btn>
            </v-card-actions>
            </v-card>
    </v-dialog>

</template>

<script>
export default {
data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: "Mit einem Suchabo werden Sie stetig per Mail über die neusten Angebote informiert. Möchten Sie ein Suchabo erstellen?",
    title: "Suchabo erstellen",
    options: {
      color: "green",
      width: 290,
    }
  }),
};

</script>

<style scoped>

</style>