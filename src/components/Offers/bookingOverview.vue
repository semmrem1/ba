<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="centered-input mx-auto mb-2" color="green darken-1 white--text" raised @click="dialog = false; snackbar= true" width="95%">ERNTE BUCHEN</v-btn>
        </template>

        <v-card>
            Hier ihre Buchung Sie Apfelsüchtiger Kuchenbäcko
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    data() {
    return {

    }
  }
};

</script>

<style scoped>

</style>