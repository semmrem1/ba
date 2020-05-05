<template>
  <div class="orderHistory">
    <v-container class="pa-0">
      <orderHistory/>
    </v-container>
  </div>
</template>

<script>
import orderHistory from '@/components/orderHistory'

export default {
Name: 'orderHistory',
  components: {
    orderHistory
  },
  data: () => ({
    //
  }),
};
</script>
