<template>
  <div class="cropHistory">
    <v-container class="pa-0">
      <cropHistory/>
    </v-container>
  </div>
</template>

<script>
import cropHistory from '@/components/cropHistory'

export default {
Name: 'cropHistory',
  components: {
    cropHistory
  },
  data: () => ({
    //
  }),
};
</script>
