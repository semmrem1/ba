<template>
  <div>
    <v-col v-for="(item, i) in items" :key="i">
      <v-container>
        <v-card max-width="444" elevation="3">
          <v-row>
            <v-col>
              <v-avatar class="ma-3" size="150" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </v-col>
          </v-row> 
        </v-card>
      </v-container>
    </v-col>
  </div>
</template>

<script>
export default {
    data: () => ({
      items: [
        {
          src: 'https://images.unsplash.com/photo-1538104308589-50ef22ba5d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          title: 'Gala',
          location: 'Seen',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
        },
        {
          src: 'https://images.unsplash.com/photo-1541600321016-ac52d598f563?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: 'Boskoop',
          location: 'Hettingen',
        },
      ],
    }),
}
</script>

<style scoped>

</style>