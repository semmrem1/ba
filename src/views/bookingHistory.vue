<template>
  <div class="bookingHistory">
    <v-container class="pa-0">
      <bookingHistory/>
    </v-container>
  </div>
</template>

<script>
import bookingHistory from '@/components/bookingHistory'

export default {
Name: 'bookingHistory',
  components: {
    bookingHistory
  },
  data: () => ({
    //
  }),
};
</script>
