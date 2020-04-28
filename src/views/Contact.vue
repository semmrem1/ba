<template>
  <div id="app" class="contact" height="100vh">
    <Contact/>
    <div class="my-auto"></div>
    <Footer/>
  </div>
</template>

<script>
import Contact from '@/components/LandingPage/Contact'
import Footer from '@/components/LandingPage/Footer'

export default {
Name: 'Contact',
  components: {
    Contact,
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
