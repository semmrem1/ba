<template>
    <v-dialog v-model="dialog" max-width="450">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
            <v-card>
            <v-toolbar :color="options.color" dark dense flat>
                <v-toolbar-title class="white--text font-weight-bold"><v-icon class="pr-3" size="x-large">mdi-alert</v-icon>{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn @click="cancel" outlined color="grey">Abbrechen</v-btn>
                <v-btn class="white--text ml-4" @click="agree" depressed :color="options.color">Ja</v-btn>
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
    message: "Wollen Sie diese Bestellung wirklich storneren? Ihr Anspruch auf die Ernte entfällt damit. Dies kann nicht rückgängig gemacht werden.",
    title: "Bestellung stornieren",
    options: {
      color: "red",
      width: 290,
    }
  }),
  computed: {
    show: {
      get() {
        return this.dialog
      },
      set(value) {
        this.dialog = value
        if (value === false) {
          this.cancel()
        }
      }
    }
  },
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
    //   this.resolve(true)
      this.dialog = false
    },
    cancel() {
    //   this.resolve(false)
      this.dialog = false
    }
  }
}
</script>
