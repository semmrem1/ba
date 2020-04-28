<template>
  <div id="app" class="register" height="100vh">
    <RegisterPrivate/>
    <div class="my-auto"></div>
    <Footer/>
  </div>
</template>

<script>
import RegisterPrivate from '@/components/LoginRegister/RegisterPrivate'
import Footer from '@/components/LandingPage/Footer'

export default {
Name: 'RegisterPrivate',
  components: {
    RegisterPrivate,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.register {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}
</style>
