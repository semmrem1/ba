<template>
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col class="px-0 py-2" v-for="(item, i) in items" :key="i" cols="12" md="6" lg="3">
          <v-card class="mx-auto" max-width="444" elevation="3">
            <v-avatar size="150" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
            <span class="my-span">
              <v-card-title class="headline" v-text="item.title" cols="5"></v-card-title>
              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
            </span>
              <v-card-actions cols="6">
                <v-spacer></v-spacer>
                  <v-btn color="grey" text>Standort</v-btn>
                  <v-btn color="green" text>Buchen</v-btn>
              </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
      items: [
        {
          src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          title: 'Gala',
          artist: 'Seen',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          artist: 'Hettingen',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          artist: 'Hettingen',
        },
      ],
    }),
}
</script>

<style scoped>
.my-span{
  float: center
}
</style>