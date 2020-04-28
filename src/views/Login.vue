
<template>
  <div id="app" class="login" height="100vh">
      <Login/>
      <div class="my-auto"></div>
    <Footer/>
  </div>
</template>

<script>
import Login from '@/components/LoginRegister/Login'
import Footer from '@/components/LandingPage/Footer'

export default {
Name: 'Login',
  components: {
    Login,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.login {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}
</style>
