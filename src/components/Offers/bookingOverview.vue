<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="centered-input mx-auto mb-2" color="green darken-1 white--text" raised width="95%">ERNTE BUCHEN</v-btn>
        </template>

        <v-card>
            <v-toolbar :color="options.color" dark dense flat><v-icon color="white">mdi-check</v-icon>
                <v-card-title class="headline">Ihre Buchung</v-card-title>
            </v-toolbar>
            <v-row class="pt-0 pl-1" >
                <v-col class="pr-0" cols="4">
                    <v-card-text class="py-3 pr-0 font-weight-bold">Bestellnummer:</v-card-text>
                    <v-card-text class="py-3 pr-0 font-weight-bold">Menge:</v-card-text>
                    <v-card-text class="py-3 pr-0 font-weight-bold">Datum:</v-card-text>
                </v-col>
                <v-col class="pl-0" cols="8">
                    <v-card-text class="py-0">{{ item.quantity }}</v-card-text>
                    <v-card-text class="py-0">{{ item.date }}</v-card-text>
                    <v-card-text class="pb-0 pt-3">{{ item.plz }}</v-card-text>
                    <v-card-text class="py-0">{{ item.location }}</v-card-text>
                </v-col>
                <v-col>
                    <v-checkbox v-model="agreement" required label="Ich bin einverstanden, dass mit der Buchung meine persönlichen Daten zur Kontaktaufnahme an den Anbieter übermittelt werden."></v-checkbox>
                </v-col>
            </v-row>
            <div class="py-12"></div>
            <v-card-actions class="pt-2 mt-2">
                   <v-btn class="centered-input mx-auto mb-2" color="green darken-1 white--text" :disabled="!isComplete" @click="dialog = false" raised width="95%">Bestätigen</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            agreement: false,
            dialog: false,
            options: {
                color: "green",
                width: 290,
            },  
            counter: 10,
            item: [
            {
                bookingNumber: '#8400001',
                quantity: '18kg',
                date: '11.10.2020',
                plz: '8400 Winterthur',
                location: 'Apfeltaschenstrasse 22 '
            },
            ]
        };
    },
        computed: {
        isComplete(){//button only visible if these fields are filled
            return this.agreement

        },
    }
};

</script>
