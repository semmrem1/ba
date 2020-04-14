<template>
    <div id="hello-world-app">
      <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    new Vue({
        el: "#hello-world-app",
        data() {
          return {
            msg: "Hello World!"
          }
        }
      });
</script>

<style>
#hello-world-app{
    color: red;
}
</style>  
