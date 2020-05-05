<template>
  <div id="app" class="contact" height="100vh">
    <AGB/>
    <div class="my-auto"></div>
    <Footer/>
  </div>
</template>

<script>
import AGB from '@/components/LoginRegister/AGB'
import Footer from '@/components/LandingPage/Footer'

export default {
Name: 'AGB',
  components: {
    AGB,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>

.contact {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}
</style>
