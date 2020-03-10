<template>
    <v-dialog v-model="dialog" max-width="85%">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="green" text>Buchen</v-btn>
        </template>
            <v-card>
                <v-card-title class="headline">Ernte buchen</v-card-title>
                <v-card-text class="body-2">Bitte gib uns deine gewüschte Menge und ein Datum zur Ernte an.</v-card-text>
                <v-card-text class="subtitle-1 font-weight-bold">Menge:</v-card-text>
                <v-row class="mt-2">
                    <v-col>
                        <v-btn class="ml-6" fab dark color="green darken-1">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    
                    <v-col cols="5">
                        <v-text-field outlined readonly value="10.00" suffix="KG"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn class="ml-2" fab dark color="green darken-1">
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-col>

                </v-row>

                <v-card-actions class="pt-2 mt-2">
                   <v-btn class="mx-auto mb-2" color="green darken-1 white--text" raised @click="dialog = false" width="95%">ERNTE BUCHEN</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
    return {
      dialog: false
    };
  }
};
</script>