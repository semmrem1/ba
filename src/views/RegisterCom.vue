<template>
  <div id="app" class="register" height="100vh">
      <RegisterCom/>
      <div class="my-auto"></div>
      <Footer/>
  </div>
</template>

<script>
import RegisterCom from '@/components/LoginRegister/RegisterCom'
import Footer from '@/components/LandingPage/Footer'

export default {
Name: 'RegisterCom',
  components: {
    RegisterCom,
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