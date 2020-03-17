<template>
  <div class="myCrops">
    <!-- <h1>meine Ernten</h1> -->
      <v-container class="pa-0">
        <myCrop/>
    </v-container>
  </div>
</template>

<script>
import myCrop from '@/components/myCrop'

export default {
  name: 'myCrops',
  components: {
    myCrop
  },
  data: () => ({
    //
  }),
};
</script>
